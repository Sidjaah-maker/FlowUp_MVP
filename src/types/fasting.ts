/**
 * Types TypeScript pour les fonctionnalit�s de je�ne intermittent
 * Foundation critique pour Flow Up MVP
 */

// �num�rations pour les protocoles de je�ne
export enum FastingProtocol {
  SIXTEEN_EIGHT = '16:8',
  EIGHTEEN_SIX = '18:6', 
  TWENTY_FOUR = '20:4',
  OMAD = 'OMAD',
}

// Phases biologiques du je�ne avec timing
export enum FastingPhase {
  DIGESTION = 'digestion',
  GLYCOGEN_DEPLETION = 'glycogen_depletion',
  FAT_BURNING = 'fat_burning',
  KETOSIS = 'ketosis',
  AUTOPHAGY = 'autophagy',
}

// Statuts du timer de je�ne
export enum FastingStatus {
  NOT_STARTED = 'not_started',
  ACTIVE = 'active',
  PAUSED = 'paused',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

// Interface principale pour une session de je�ne
export interface FastingSession {
  id: string;
  startTime: Date;
  endTime?: Date;
  targetDuration: number; // en minutes
  actualDuration?: number; // en minutes  
  protocol: FastingProtocol;
  currentPhase: FastingPhase;
  status: FastingStatus;
  pausedAt?: Date;
  pausedDuration: number; // temps total en pause (minutes)
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Configuration des phases biologiques
export interface FastingPhaseConfig {
  phase: FastingPhase;
  startHour: number; // heures depuis d�but du je�ne
  endHour: number;
  title: string;
  description: string;
  benefits: string[];
  color: string; // couleur UI pour cette phase
  icon: string; // nom de l'ic�ne Feather
}

// Statistiques de progression du je�ne
export interface FastingStats {
  totalSessions: number;
  totalDuration: number; // minutes
  averageDuration: number; // minutes
  longestStreak: number; // jours cons�cutifs
  currentStreak: number; // jours cons�cutifs actuels
  completionRate: number; // pourcentage 0-1
  favoriteProtocol: FastingProtocol;
  lastSession?: FastingSession;
}

// Configuration utilisateur pour le je�ne
export interface FastingPreferences {
  defaultProtocol: FastingProtocol;
  enableNotifications: boolean;
  notificationTimes: number[]; // heures de notification (12, 16, 20, etc.)
  enablePhaseEducation: boolean;
  enableStreakCounter: boolean;
  fastingGoal: number; // sessions par semaine
}

// Donn�es pour les insights et corr�lations
export interface FastingInsight {
  id: string;
  type: 'trend' | 'achievement' | 'recommendation' | 'correlation';
  title: string;
  description: string;
  value?: number;
  trend?: 'up' | 'down' | 'stable';
  dateRange: {
    start: Date;
    end: Date;
  };
  metadata?: Record<string, any>;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

// Timer state pour le hook useFastingTimer
export interface FastingTimerState {
  session: FastingSession | null;
  isActive: boolean;
  isPaused: boolean;
  timeElapsed: number; // secondes
  timeRemaining: number; // secondes
  currentPhase: FastingPhaseConfig | null;
  nextPhase: FastingPhaseConfig | null;
  phaseProgress: number; // pourcentage 0-1
  overallProgress: number; // pourcentage 0-1
}

// Actions disponibles pour le timer
export interface FastingTimerActions {
  startSession: (protocol: FastingProtocol) => Promise<void>;
  pauseSession: () => Promise<void>;
  resumeSession: () => Promise<void>;
  stopSession: () => Promise<void>;
  cancelSession: () => Promise<void>;
  updateNotes: (notes: string) => Promise<void>;
  extendSession: (additionalMinutes: number) => Promise<void>;
}

// Type pour les erreurs sp�cifiques au je�ne
export interface FastingError {
  code: 'TIMER_NOT_ACTIVE' | 'SESSION_NOT_FOUND' | 'INVALID_PROTOCOL' | 'STORAGE_ERROR';
  message: string;
  details?: any;
}