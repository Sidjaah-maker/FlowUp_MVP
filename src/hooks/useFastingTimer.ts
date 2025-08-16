/**
 * Hook principal pour la gestion du timer de jeûne
 * Centralise toute la logique métier et l'état du timer
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { 
  FastingSession, 
  FastingProtocol, 
  FastingStatus, 
  FastingTimerState, 
  FastingTimerActions,
  FastingPhase
} from '../types/fasting';
import { FastingStorage } from '../services/storage/FastingStorage';
import { 
  getCurrentPhase, 
  getNextPhase, 
  getPhaseProgress,
  getTimeToNextPhase,
  getMotivationalMessage 
} from '../constants/data/fastingPhases';

// Configuration des durées par protocole (en minutes)
const PROTOCOL_DURATIONS = {
  [FastingProtocol.SIXTEEN_EIGHT]: 16 * 60,      // 16 heures
  [FastingProtocol.EIGHTEEN_SIX]: 18 * 60,       // 18 heures
  [FastingProtocol.TWENTY_FOUR]: 20 * 60,        // 20 heures (20:4)
  [FastingProtocol.OMAD]: 23 * 60,               // 23 heures (OMAD)
} as const;

/**
 * Hook principal pour la gestion du timer de jeûne
 */
export const useFastingTimer = () => {
  // État du timer
  const [timerState, setTimerState] = useState<FastingTimerState>({
    session: null,
    isActive: false,
    isPaused: false,
    timeElapsed: 0,
    timeRemaining: 0,
    currentPhase: null,
    nextPhase: null,
    phaseProgress: 0,
    overallProgress: 0,
  });

  // État de chargement
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Références pour les timers
  const intervalRef = useRef<number | null>(null);
  const appStateRef = useRef<AppStateStatus>('active');

  /**
   * Génère un ID unique pour les sessions
   */
  const generateSessionId = useCallback((): string => {
    return `fasting_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  /**
   * Calcule l'état du timer basé sur la session actuelle
   */
  const calculateTimerState = useCallback((session: FastingSession | null): FastingTimerState => {
    if (!session) {
      return {
        session: null,
        isActive: false,
        isPaused: false,
        timeElapsed: 0,
        timeRemaining: 0,
        currentPhase: null,
        nextPhase: null,
        phaseProgress: 0,
        overallProgress: 0,
      };
    }

    const now = new Date();
    let timeElapsed = 0;

    if (session.status === FastingStatus.ACTIVE) {
      // Calcul du temps écoulé en tenant compte des pauses
      timeElapsed = Math.floor((now.getTime() - session.startTime.getTime()) / 1000) - (session.pausedDuration * 60);
    } else if (session.status === FastingStatus.PAUSED && session.pausedAt) {
      // Si en pause, le temps s'arrête au moment de la pause
      timeElapsed = Math.floor((session.pausedAt.getTime() - session.startTime.getTime()) / 1000) - (session.pausedDuration * 60);
    } else if (session.status === FastingStatus.COMPLETED && session.actualDuration) {
      timeElapsed = session.actualDuration * 60; // Conversion minutes vers secondes
    }

    // Conversion en heures pour les calculs de phases
    const hoursElapsed = timeElapsed / 3600;

    // Calcul des phases
    const currentPhase = getCurrentPhase(hoursElapsed);
    const nextPhase = getNextPhase(hoursElapsed);
    const phaseProgress = getPhaseProgress(hoursElapsed);

    // Calcul du progrès global
    const targetDurationSeconds = session.targetDuration * 60;
    const overallProgress = Math.min(timeElapsed / targetDurationSeconds, 1);

    // Temps restant
    const timeRemaining = Math.max(targetDurationSeconds - timeElapsed, 0);

    return {
      session,
      isActive: session.status === FastingStatus.ACTIVE,
      isPaused: session.status === FastingStatus.PAUSED,
      timeElapsed,
      timeRemaining,
      currentPhase,
      nextPhase,
      phaseProgress,
      overallProgress,
    };
  }, []);

  /**
   * Met à jour l'état du timer
   */
  const updateTimerState = useCallback(async () => {
    try {
      const currentSession = await FastingStorage.getCurrentSession();
      const newState = calculateTimerState(currentSession);
      setTimerState(newState);

      // Si session terminée automatiquement
      if (newState.session && newState.timeRemaining <= 0 && newState.session.status === FastingStatus.ACTIVE) {
        await completeSession();
      }
    } catch (err) {
      console.error('Erreur lors de la mise à jour du timer:', err);
      setError('Erreur lors de la mise à jour du timer');
    }
  }, [calculateTimerState]);

  /**
   * Démarre une nouvelle session de jeûne
   */
  const startSession = useCallback(async (protocol: FastingProtocol): Promise<void> => {
    try {
      setError(null);

      // Arrêt de toute session existante
      if (timerState.session) {
        await stopSession();
      }

      // Création de la nouvelle session
      const now = new Date();
      const targetDuration = PROTOCOL_DURATIONS[protocol];
      
      const newSession: FastingSession = {
        id: generateSessionId(),
        startTime: now,
        targetDuration,
        protocol,
        currentPhase: FastingPhase.DIGESTION,
        status: FastingStatus.ACTIVE,
        pausedDuration: 0,
        createdAt: now,
        updatedAt: now,
      };

      // Sauvegarde
      await FastingStorage.saveSession(newSession);
      await FastingStorage.setCurrentSession(newSession);

      // Mise à jour de l'état
      await updateTimerState();
    } catch (err) {
      console.error('Erreur lors du démarrage de session:', err);
      setError('Impossible de démarrer la session');
      throw err;
    }
  }, [timerState.session, generateSessionId, updateTimerState]);

  /**
   * Met en pause la session active
   */
  const pauseSession = useCallback(async (): Promise<void> => {
    try {
      if (!timerState.session || !timerState.isActive) {
        throw new Error('Aucune session active à mettre en pause');
      }

      const now = new Date();
      const updatedSession: FastingSession = {
        ...timerState.session,
        status: FastingStatus.PAUSED,
        pausedAt: now,
        updatedAt: now,
      };

      await FastingStorage.saveSession(updatedSession);
      await FastingStorage.setCurrentSession(updatedSession);
      await updateTimerState();
    } catch (err) {
      console.error('Erreur lors de la pause:', err);
      setError('Impossible de mettre en pause');
      throw err;
    }
  }, [timerState.session, timerState.isActive, updateTimerState]);

  /**
   * Reprend la session en pause
   */
  const resumeSession = useCallback(async (): Promise<void> => {
    try {
      if (!timerState.session || !timerState.isPaused || !timerState.session.pausedAt) {
        throw new Error('Aucune session en pause à reprendre');
      }

      const now = new Date();
      const pauseDuration = Math.floor((now.getTime() - timerState.session.pausedAt.getTime()) / (1000 * 60));
      
      const updatedSession: FastingSession = {
        ...timerState.session,
        status: FastingStatus.ACTIVE,
        pausedAt: undefined,
        pausedDuration: timerState.session.pausedDuration + pauseDuration,
        updatedAt: now,
      };

      await FastingStorage.saveSession(updatedSession);
      await FastingStorage.setCurrentSession(updatedSession);
      await updateTimerState();
    } catch (err) {
      console.error('Erreur lors de la reprise:', err);
      setError('Impossible de reprendre');
      throw err;
    }
  }, [timerState.session, timerState.isPaused, updateTimerState]);

  /**
   * Termine la session manuellement ou automatiquement
   */
  const completeSession = useCallback(async (): Promise<void> => {
    try {
      if (!timerState.session) {
        throw new Error('Aucune session à terminer');
      }

      const now = new Date();
      const actualDuration = Math.floor(timerState.timeElapsed / 60); // Conversion en minutes

      const completedSession: FastingSession = {
        ...timerState.session,
        status: FastingStatus.COMPLETED,
        endTime: now,
        actualDuration,
        updatedAt: now,
      };

      await FastingStorage.saveSession(completedSession);
      await FastingStorage.setCurrentSession(null);
      await updateTimerState();
    } catch (err) {
      console.error('Erreur lors de la complétion:', err);
      setError('Impossible de terminer la session');
      throw err;
    }
  }, [timerState.session, timerState.timeElapsed, updateTimerState]);

  /**
   * Arrête la session en cours
   */
  const stopSession = useCallback(async (): Promise<void> => {
    try {
      if (!timerState.session) {
        throw new Error('Aucune session à arrêter');
      }

      const now = new Date();
      const actualDuration = Math.floor(timerState.timeElapsed / 60);

      const stoppedSession: FastingSession = {
        ...timerState.session,
        status: FastingStatus.CANCELLED,
        endTime: now,
        actualDuration,
        updatedAt: now,
      };

      await FastingStorage.saveSession(stoppedSession);
      await FastingStorage.setCurrentSession(null);
      await updateTimerState();
    } catch (err) {
      console.error('Erreur lors de l\'arrêt:', err);
      setError('Impossible d\'arrêter la session');
      throw err;
    }
  }, [timerState.session, timerState.timeElapsed, updateTimerState]);

  /**
   * Annule la session (supprime complètement)
   */
  const cancelSession = useCallback(async (): Promise<void> => {
    try {
      if (!timerState.session) {
        throw new Error('Aucune session à annuler');
      }

      await FastingStorage.deleteSession(timerState.session.id);
      await FastingStorage.setCurrentSession(null);
      await updateTimerState();
    } catch (err) {
      console.error('Erreur lors de l\'annulation:', err);
      setError('Impossible d\'annuler la session');
      throw err;
    }
  }, [timerState.session, updateTimerState]);

  /**
   * Met à jour les notes de la session
   */
  const updateNotes = useCallback(async (notes: string): Promise<void> => {
    try {
      if (!timerState.session) {
        throw new Error('Aucune session active');
      }

      const updatedSession: FastingSession = {
        ...timerState.session,
        notes,
        updatedAt: new Date(),
      };

      await FastingStorage.saveSession(updatedSession);
      if (timerState.isActive || timerState.isPaused) {
        await FastingStorage.setCurrentSession(updatedSession);
      }
      await updateTimerState();
    } catch (err) {
      console.error('Erreur lors de la mise à jour des notes:', err);
      setError('Impossible de mettre à jour les notes');
      throw err;
    }
  }, [timerState.session, timerState.isActive, timerState.isPaused, updateTimerState]);

  /**
   * Étend la durée de la session
   */
  const extendSession = useCallback(async (additionalMinutes: number): Promise<void> => {
    try {
      if (!timerState.session) {
        throw new Error('Aucune session active');
      }

      const updatedSession: FastingSession = {
        ...timerState.session,
        targetDuration: timerState.session.targetDuration + additionalMinutes,
        updatedAt: new Date(),
      };

      await FastingStorage.saveSession(updatedSession);
      if (timerState.isActive || timerState.isPaused) {
        await FastingStorage.setCurrentSession(updatedSession);
      }
      await updateTimerState();
    } catch (err) {
      console.error('Erreur lors de l\'extension:', err);
      setError('Impossible d\'étendre la session');
      throw err;
    }
  }, [timerState.session, timerState.isActive, timerState.isPaused, updateTimerState]);

  /**
   * Obtient un message motivationnel basé sur la phase actuelle
   */
  const getMotivationalText = useCallback((): string => {
    if (!timerState.currentPhase) return '';
    return getMotivationalMessage(timerState.currentPhase.phase);
  }, [timerState.currentPhase]);

  // Actions disponibles
  const actions: FastingTimerActions = {
    startSession,
    pauseSession,
    resumeSession,
    stopSession,
    cancelSession,
    updateNotes,
    extendSession,
  };

  // Configuration du timer automatique
  useEffect(() => {
    if (timerState.isActive) {
      intervalRef.current = setInterval(updateTimerState, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [timerState.isActive, updateTimerState]);

  // Gestion des changements d'état de l'app (background/foreground)
  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appStateRef.current === 'background' && nextAppState === 'active') {
        // App revient en premier plan, mise à jour du timer
        updateTimerState();
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => subscription?.remove();
  }, [updateTimerState]);

  // Chargement initial
  useEffect(() => {
    const loadInitialState = async () => {
      try {
        setIsLoading(true);
        await updateTimerState();
      } catch (err) {
        console.error('Erreur lors du chargement initial:', err);
        setError('Erreur lors du chargement');
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialState();
  }, [updateTimerState]);

  return {
    // État
    ...timerState,
    isLoading,
    error,
    
    // Actions
    ...actions,
    
    // Utilitaires
    getMotivationalText,
    
    // Données calculées
    hoursElapsed: timerState.timeElapsed / 3600,
    minutesRemaining: Math.ceil(timerState.timeRemaining / 60),
    timeToNextPhase: timerState.currentPhase ? getTimeToNextPhase(timerState.timeElapsed / 3600) : 0,
  };
};

export default useFastingTimer;