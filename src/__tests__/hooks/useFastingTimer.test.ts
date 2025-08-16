/**
 * Tests unitaires pour le hook useFastingTimer
 * Validation de la logique métier critique
 */

import { renderHook, act } from '@testing-library/react-hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFastingTimer } from '../../hooks/useFastingTimer';
import { FastingProtocol, FastingStatus } from '../../types/fasting';
import { FastingStorage } from '../../services/storage/FastingStorage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock du service de stockage
jest.mock('../../services/storage/FastingStorage');

// Mock des timers
jest.useFakeTimers();

describe('useFastingTimer', () => {
  // Setup avant chaque test
  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
    
    // Mock des méthodes de FastingStorage
    (FastingStorage.getCurrentSession as jest.Mock).mockResolvedValue(null);
    (FastingStorage.saveSession as jest.Mock).mockResolvedValue(undefined);
    (FastingStorage.setCurrentSession as jest.Mock).mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('État initial', () => {
    it('should initialize with empty state', async () => {
      const { result } = renderHook(() => useFastingTimer());

      // État initial pendant le chargement
      expect(result.current.isLoading).toBe(true);
      expect(result.current.session).toBe(null);
      expect(result.current.isActive).toBe(false);
      expect(result.current.isPaused).toBe(false);

      // Attendre la fin du chargement
      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current.isLoading).toBe(false);
      expect(result.current.session).toBe(null);
    });

    it('should load existing active session', async () => {
      const mockSession = {
        id: 'test-session',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
        targetDuration: 16 * 60, // 16h
        protocol: FastingProtocol.SIXTEEN_EIGHT,
        status: FastingStatus.ACTIVE,
        currentPhase: 'fat_burning',
        pausedDuration: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (FastingStorage.getCurrentSession as jest.Mock).mockResolvedValue(mockSession);

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current.session).toEqual(mockSession);
      expect(result.current.isActive).toBe(true);
      expect(result.current.timeElapsed).toBeGreaterThan(0);
    });
  });

  describe('Démarrage de session', () => {
    it('should start new fasting session', async () => {
      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve(); // Chargement initial
      });

      await act(async () => {
        await result.current.startSession(FastingProtocol.SIXTEEN_EIGHT);
      });

      // Vérification des appels au storage
      expect(FastingStorage.saveSession).toHaveBeenCalled();
      expect(FastingStorage.setCurrentSession).toHaveBeenCalled();

      // Vérification des arguments
      const saveCall = (FastingStorage.saveSession as jest.Mock).mock.calls[0][0];
      expect(saveCall.protocol).toBe(FastingProtocol.SIXTEEN_EIGHT);
      expect(saveCall.targetDuration).toBe(16 * 60); // 16h en minutes
      expect(saveCall.status).toBe(FastingStatus.ACTIVE);
    });

    it('should stop existing session before starting new one', async () => {
      const existingSession = {
        id: 'existing-session',
        startTime: new Date(),
        targetDuration: 16 * 60,
        protocol: FastingProtocol.SIXTEEN_EIGHT,
        status: FastingStatus.ACTIVE,
        currentPhase: 'digestion',
        pausedDuration: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (FastingStorage.getCurrentSession as jest.Mock).mockResolvedValue(existingSession);

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      await act(async () => {
        await result.current.startSession(FastingProtocol.OMAD);
      });

      // Devrait sauvegarder l'ancienne session comme arrêtée ET créer la nouvelle
      expect(FastingStorage.saveSession).toHaveBeenCalledTimes(2);
    });
  });

  describe('Gestion pause/reprise', () => {
    it('should pause active session', async () => {
      const activeSession = {
        id: 'active-session',
        startTime: new Date(Date.now() - 60 * 60 * 1000), // 1h ago
        targetDuration: 16 * 60,
        protocol: FastingProtocol.SIXTEEN_EIGHT,
        status: FastingStatus.ACTIVE,
        currentPhase: 'digestion',
        pausedDuration: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (FastingStorage.getCurrentSession as jest.Mock).mockResolvedValue(activeSession);

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      await act(async () => {
        await result.current.pauseSession();
      });

      const saveCall = (FastingStorage.saveSession as jest.Mock).mock.calls[0][0];
      expect(saveCall.status).toBe(FastingStatus.PAUSED);
      expect(saveCall.pausedAt).toBeInstanceOf(Date);
    });

    it('should resume paused session', async () => {
      const pausedSession = {
        id: 'paused-session',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2h ago
        targetDuration: 16 * 60,
        protocol: FastingProtocol.SIXTEEN_EIGHT,
        status: FastingStatus.PAUSED,
        pausedAt: new Date(Date.now() - 30 * 60 * 1000), // Paused 30min ago
        currentPhase: 'digestion',
        pausedDuration: 15, // 15min de pause précédente
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (FastingStorage.getCurrentSession as jest.Mock).mockResolvedValue(pausedSession);

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      await act(async () => {
        await result.current.resumeSession();
      });

      const saveCall = (FastingStorage.saveSession as jest.Mock).mock.calls[0][0];
      expect(saveCall.status).toBe(FastingStatus.ACTIVE);
      expect(saveCall.pausedAt).toBeUndefined();
      expect(saveCall.pausedDuration).toBeGreaterThan(15); // Inclut les 30min de pause
    });

    it('should throw error when pausing non-active session', async () => {
      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      await expect(
        act(async () => {
          await result.current.pauseSession();
        })
      ).rejects.toThrow('Aucune session active à mettre en pause');
    });
  });

  describe('Calculs temporels', () => {
    it('should calculate time elapsed correctly', async () => {
      const startTime = new Date(Date.now() - 3 * 60 * 60 * 1000); // 3h ago
      const activeSession = {
        id: 'timing-session',
        startTime,
        targetDuration: 16 * 60,
        protocol: FastingProtocol.SIXTEEN_EIGHT,
        status: FastingStatus.ACTIVE,
        currentPhase: 'glycogen_depletion',
        pausedDuration: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (FastingStorage.getCurrentSession as jest.Mock).mockResolvedValue(activeSession);

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current.timeElapsed).toBeCloseTo(3 * 60 * 60, -2); // ~3h en secondes
      expect(result.current.hoursElapsed).toBeCloseTo(3, 1);
      expect(result.current.overallProgress).toBeCloseTo(3 / 16, 2); // 3h sur 16h
    });

    it('should calculate time remaining correctly', async () => {
      const activeSession = {
        id: 'remaining-session',
        startTime: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4h ago
        targetDuration: 16 * 60, // 16h total
        protocol: FastingProtocol.SIXTEEN_EIGHT,
        status: FastingStatus.ACTIVE,
        currentPhase: 'glycogen_depletion',
        pausedDuration: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (FastingStorage.getCurrentSession as jest.Mock).mockResolvedValue(activeSession);

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      const expectedRemaining = (16 - 4) * 60 * 60; // 12h restantes en secondes
      expect(result.current.timeRemaining).toBeCloseTo(expectedRemaining, -2);
      expect(result.current.minutesRemaining).toBeCloseTo(12 * 60, -1); // 12h en minutes
    });

    it('should handle paused duration in calculations', async () => {
      const pausedSession = {
        id: 'paused-calc-session',
        startTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // Started 5h ago
        targetDuration: 16 * 60,
        protocol: FastingProtocol.SIXTEEN_EIGHT,
        status: FastingStatus.PAUSED,
        pausedAt: new Date(Date.now() - 1 * 60 * 60 * 1000), // Paused 1h ago
        currentPhase: 'glycogen_depletion',
        pausedDuration: 60, // 1h previous pause
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (FastingStorage.getCurrentSession as jest.Mock).mockResolvedValue(pausedSession);

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      // Time elapsed = (pausedAt - startTime) - pausedDuration
      // = 4h - 1h = 3h effective fasting
      const expectedElapsed = 3 * 60 * 60; // 3h en secondes
      expect(result.current.timeElapsed).toBeCloseTo(expectedElapsed, -2);
    });
  });

  describe('Phases biologiques', () => {
    it('should determine current phase correctly', async () => {
      const sessionIn14thHour = {
        id: 'phase-session',
        startTime: new Date(Date.now() - 14 * 60 * 60 * 1000), // 14h ago
        targetDuration: 16 * 60,
        protocol: FastingProtocol.SIXTEEN_EIGHT,
        status: FastingStatus.ACTIVE,
        currentPhase: 'fat_burning',
        pausedDuration: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (FastingStorage.getCurrentSession as jest.Mock).mockResolvedValue(sessionIn14thHour);

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current.currentPhase).toBeDefined();
      expect(result.current.currentPhase?.phase).toBe('fat_burning'); // 14h = fat burning phase
      expect(result.current.phaseProgress).toBeGreaterThan(0);
      expect(result.current.phaseProgress).toBeLessThanOrEqual(1);
    });
  });

  describe('Gestion d\'erreur', () => {
    it('should handle storage errors gracefully', async () => {
      (FastingStorage.getCurrentSession as jest.Mock).mockRejectedValue(new Error('Storage error'));

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      expect(result.current.error).toContain('Erreur lors du chargement');
      expect(result.current.isLoading).toBe(false);
    });

    it('should handle session start errors', async () => {
      (FastingStorage.saveSession as jest.Mock).mockRejectedValue(new Error('Save failed'));

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      await expect(
        act(async () => {
          await result.current.startSession(FastingProtocol.SIXTEEN_EIGHT);
        })
      ).rejects.toThrow();

      expect(result.current.error).toContain('Impossible de démarrer la session');
    });
  });

  describe('Completion automatique', () => {
    it('should complete session automatically when time expires', async () => {
      const nearCompletionSession = {
        id: 'completion-session',
        startTime: new Date(Date.now() - 16 * 60 * 60 * 1000 + 1000), // Almost 16h ago
        targetDuration: 16 * 60,
        protocol: FastingProtocol.SIXTEEN_EIGHT,
        status: FastingStatus.ACTIVE,
        currentPhase: 'ketosis',
        pausedDuration: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      (FastingStorage.getCurrentSession as jest.Mock).mockResolvedValue(nearCompletionSession);

      const { result } = renderHook(() => useFastingTimer());

      await act(async () => {
        await Promise.resolve();
      });

      // Le timer devrait détecter l'expiration et terminer automatiquement
      expect(result.current.timeRemaining).toBeLessThanOrEqual(0);
      
      // Simule une mise à jour du timer
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      // Vérifie que la session est marquée comme complétée
      const completionCall = (FastingStorage.saveSession as jest.Mock).mock.calls.find(
        call => call[0].status === FastingStatus.COMPLETED
      );
      expect(completionCall).toBeDefined();
    });
  });
});