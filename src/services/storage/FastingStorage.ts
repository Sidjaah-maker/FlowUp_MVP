/**
 * Service de stockage pour les sessions de jeûne
 * Gère la persistence locale avec AsyncStorage et validation des données
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FastingSession, FastingStats, FastingPreferences, FastingProtocol } from '../../types/fasting';
import { isValidDate, isValidId } from '../../types/common';

// Clés de stockage organisées
const STORAGE_KEYS = {
  SESSIONS: '@flow_up/fasting_sessions',
  CURRENT_SESSION: '@flow_up/current_fasting_session',
  STATS: '@flow_up/fasting_stats',
  PREFERENCES: '@flow_up/fasting_preferences',
} as const;

// Préférences par défaut
const DEFAULT_PREFERENCES: FastingPreferences = {
  defaultProtocol: FastingProtocol.SIXTEEN_EIGHT,
  enableNotifications: true,
  notificationTimes: [12, 16, 20], // 12h, 16h, 20h
  enablePhaseEducation: true,
  enableStreakCounter: true,
  fastingGoal: 4, // 4 sessions par semaine
};

export class FastingStorage {
  /**
   * Sauvegarde une session de jeûne
   */
  static async saveSession(session: FastingSession): Promise<void> {
    try {
      // Validation des données
      if (!isValidId(session.id)) {
        throw new Error('Session ID invalide');
      }
      if (!isValidDate(session.startTime)) {
        throw new Error('StartTime invalide');
      }

      // Récupération des sessions existantes
      const existingSessions = await this.getAllSessions();
      
      // Mise à jour ou ajout
      const sessionIndex = existingSessions.findIndex(s => s.id === session.id);
      if (sessionIndex >= 0) {
        existingSessions[sessionIndex] = {
          ...session,
          updatedAt: new Date(),
        };
      } else {
        existingSessions.push(session);
      }

      // Sauvegarde
      await AsyncStorage.setItem(
        STORAGE_KEYS.SESSIONS,
        JSON.stringify(existingSessions)
      );

      // Mise à jour des statistiques
      await this.updateStats();
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de session:', error);
      throw new Error('Impossible de sauvegarder la session');
    }
  }

  /**
   * Récupère toutes les sessions de jeûne
   */
  static async getAllSessions(): Promise<FastingSession[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.SESSIONS);
      if (!data) return [];

      const sessions = JSON.parse(data);
      
      // Conversion des dates string en objets Date
      return sessions.map((session: any) => ({
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined,
        pausedAt: session.pausedAt ? new Date(session.pausedAt) : undefined,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
      }));
    } catch (error) {
      console.error('Erreur lors du chargement des sessions:', error);
      return [];
    }
  }

  /**
   * Récupère une session spécifique par ID
   */
  static async getSession(sessionId: string): Promise<FastingSession | null> {
    try {
      const sessions = await this.getAllSessions();
      return sessions.find(session => session.id === sessionId) || null;
    } catch (error) {
      console.error('Erreur lors du chargement de la session:', error);
      return null;
    }
  }

  /**
   * Sauvegarde la session active actuelle
   */
  static async setCurrentSession(session: FastingSession | null): Promise<void> {
    try {
      if (session) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.CURRENT_SESSION,
          JSON.stringify(session)
        );
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION);
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde de la session courante:', error);
      throw new Error('Impossible de sauvegarder la session courante');
    }
  }

  /**
   * Récupère la session active actuelle
   */
  static async getCurrentSession(): Promise<FastingSession | null> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_SESSION);
      if (!data) return null;

      const session = JSON.parse(data);
      return {
        ...session,
        startTime: new Date(session.startTime),
        endTime: session.endTime ? new Date(session.endTime) : undefined,
        pausedAt: session.pausedAt ? new Date(session.pausedAt) : undefined,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
      };
    } catch (error) {
      console.error('Erreur lors du chargement de la session courante:', error);
      return null;
    }
  }

  /**
   * Supprime une session
   */
  static async deleteSession(sessionId: string): Promise<void> {
    try {
      const sessions = await this.getAllSessions();
      const filteredSessions = sessions.filter(session => session.id !== sessionId);
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.SESSIONS,
        JSON.stringify(filteredSessions)
      );

      // Mise à jour des statistiques
      await this.updateStats();
    } catch (error) {
      console.error('Erreur lors de la suppression de session:', error);
      throw new Error('Impossible de supprimer la session');
    }
  }

  /**
   * Récupère les statistiques de jeûne
   */
  static async getStats(): Promise<FastingStats> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.STATS);
      if (!data) {
        // Calcul initial des stats si pas encore créées
        return await this.calculateStats();
      }

      const stats = JSON.parse(data);
      return {
        ...stats,
        lastSession: stats.lastSession ? {
          ...stats.lastSession,
          startTime: new Date(stats.lastSession.startTime),
          endTime: stats.lastSession.endTime ? new Date(stats.lastSession.endTime) : undefined,
          pausedAt: stats.lastSession.pausedAt ? new Date(stats.lastSession.pausedAt) : undefined,
          createdAt: new Date(stats.lastSession.createdAt),
          updatedAt: new Date(stats.lastSession.updatedAt),
        } : undefined,
      };
    } catch (error) {
      console.error('Erreur lors du chargement des stats:', error);
      return await this.calculateStats();
    }
  }

  /**
   * Calcule et met à jour les statistiques
   */
  private static async updateStats(): Promise<void> {
    try {
      const stats = await this.calculateStats();
      await AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
    } catch (error) {
      console.error('Erreur lors de la mise à jour des stats:', error);
    }
  }

  /**
   * Calcule les statistiques à partir des sessions
   */
  private static async calculateStats(): Promise<FastingStats> {
    const sessions = await this.getAllSessions();
    const completedSessions = sessions.filter(s => s.endTime);
    
    if (completedSessions.length === 0) {
      return {
        totalSessions: 0,
        totalDuration: 0,
        averageDuration: 0,
        longestStreak: 0,
        currentStreak: 0,
        completionRate: 0,
        favoriteProtocol: FastingProtocol.SIXTEEN_EIGHT,
      };
    }

    const totalDuration = completedSessions.reduce((sum, session) => 
      sum + (session.actualDuration || 0), 0
    );

    const averageDuration = totalDuration / completedSessions.length;

    // Calcul du protocole favori
    const protocolCounts = completedSessions.reduce((counts, session) => {
      counts[session.protocol] = (counts[session.protocol] || 0) + 1;
      return counts;
    }, {} as Record<FastingProtocol, number>);

    const favoriteProtocol = Object.entries(protocolCounts)
      .reduce((a, b) => protocolCounts[a[0] as FastingProtocol] > protocolCounts[b[0] as FastingProtocol] ? a : b)[0] as FastingProtocol;

    // Calcul des streaks (simplifié pour MVP)
    const currentStreak = this.calculateCurrentStreak(completedSessions);
    const longestStreak = this.calculateLongestStreak(completedSessions);

    return {
      totalSessions: completedSessions.length,
      totalDuration,
      averageDuration,
      longestStreak,
      currentStreak,
      completionRate: completedSessions.length / sessions.length,
      favoriteProtocol,
      lastSession: completedSessions[completedSessions.length - 1],
    };
  }

  /**
   * Calcule le streak actuel (jours consécutifs)
   */
  private static calculateCurrentStreak(sessions: FastingSession[]): number {
    if (sessions.length === 0) return 0;
    
    // Trie par date décroissante
    const sortedSessions = sessions
      .sort((a, b) => b.startTime.getTime() - a.startTime.getTime());

    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    for (const session of sortedSessions) {
      const sessionDate = new Date(session.startTime);
      sessionDate.setHours(0, 0, 0, 0);

      const daysDiff = Math.floor((currentDate.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));

      if (daysDiff === streak) {
        streak++;
      } else if (daysDiff > streak) {
        break;
      }
    }

    return streak;
  }

  /**
   * Calcule le plus long streak
   */
  private static calculateLongestStreak(sessions: FastingSession[]): number {
    if (sessions.length === 0) return 0;

    // Simplifié pour MVP - retourne le nombre de jours uniques avec sessions
    const uniqueDays = new Set(
      sessions.map(session => {
        const date = new Date(session.startTime);
        return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      })
    );

    return uniqueDays.size;
  }

  /**
   * Récupère les préférences utilisateur
   */
  static async getPreferences(): Promise<FastingPreferences> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.PREFERENCES);
      if (!data) return DEFAULT_PREFERENCES;

      return { ...DEFAULT_PREFERENCES, ...JSON.parse(data) };
    } catch (error) {
      console.error('Erreur lors du chargement des préférences:', error);
      return DEFAULT_PREFERENCES;
    }
  }

  /**
   * Sauvegarde les préférences utilisateur
   */
  static async savePreferences(preferences: Partial<FastingPreferences>): Promise<void> {
    try {
      const currentPreferences = await this.getPreferences();
      const updatedPreferences = { ...currentPreferences, ...preferences };
      
      await AsyncStorage.setItem(
        STORAGE_KEYS.PREFERENCES,
        JSON.stringify(updatedPreferences)
      );
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error);
      throw new Error('Impossible de sauvegarder les préférences');
    }
  }

  /**
   * Efface toutes les données de jeûne (pour reset ou debug)
   */
  static async clearAllData(): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.SESSIONS),
        AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_SESSION),
        AsyncStorage.removeItem(STORAGE_KEYS.STATS),
        // Garde les préférences lors du reset
      ]);
    } catch (error) {
      console.error('Erreur lors de la suppression des données:', error);
      throw new Error('Impossible de supprimer les données');
    }
  }
}