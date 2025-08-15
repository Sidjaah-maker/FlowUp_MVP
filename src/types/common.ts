/**
 * Types communs utilisés à travers l'application Flow Up
 * Base pour tous les services et composants
 */

// Base entity avec métadonnées communes
export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

// États de chargement pour l'UI
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
  lastUpdated?: Date;
}

// Erreurs standardisées de l'application
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

// Réponse API standardisée (pour Phase 2)
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: AppError;
  metadata?: {
    timestamp: Date;
    version: string;
    pagination?: PaginationInfo;
  };
}

// Pagination pour les listes
export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

// Préférences utilisateur globales
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'fr' | 'es';
  units: 'metric' | 'imperial';
  timezone: string;
  enableAnalytics: boolean;
  enableCrashReporting: boolean;
  lastSyncAt?: Date;
}

// Données de synchronisation
export interface SyncData {
  lastSyncAt: Date;
  pendingChanges: number;
  conflictCount: number;
  status: 'idle' | 'syncing' | 'error' | 'conflict';
}

// Configuration de notifications
export interface NotificationConfig {
  enabled: boolean;
  sound: boolean;
  vibration: boolean;
  badge: boolean;
  times: number[]; // heures 0-23
  types: NotificationType[];
}

export enum NotificationType {
  FASTING_PHASE = 'fasting_phase',
  FASTING_COMPLETE = 'fasting_complete',
  WORKOUT_REMINDER = 'workout_reminder',
  PROGRESS_UPDATE = 'progress_update',
  MILESTONE = 'milestone',
}

// Données d'analytics (anonymisées)
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  sessionId: string;
  timestamp: Date;
  userId?: string; // hash anonyme
}

// Performance metrics
export interface PerformanceMetrics {
  appStartTime: number; // ms
  screenLoadTimes: Record<string, number>; // ms par screen
  chartRenderTimes: Record<string, number>; // ms par chart
  storageOperationTimes: Record<string, number>; // ms par opération
  memoryUsage: number; // MB
  batteryImpact: 'low' | 'medium' | 'high';
}

// Données de debug pour développement
export interface DebugInfo {
  version: string;
  buildNumber: string;
  platform: 'ios' | 'android';
  device: {
    model: string;
    osVersion: string;
    screenSize: { width: number; height: number };
  };
  performance: PerformanceMetrics;
  storage: {
    used: number; // bytes
    available: number; // bytes
  };
  lastErrors: AppError[];
}

// Types utilitaires pour l'UI
export type ScreenName = 'Fasting' | 'Workout' | 'Progress' | 'Settings';

export interface NavigationRoute {
  name: ScreenName;
  params?: Record<string, any>;
}

export interface ComponentProps {
  testID?: string;
  accessibilityLabel?: string;
  style?: any;
}

// Types pour les couleurs du theme
export type ColorName = 
  | 'primary' 
  | 'secondary' 
  | 'success' 
  | 'warning' 
  | 'error' 
  | 'background' 
  | 'surface' 
  | 'textPrimary' 
  | 'textSecondary' 
  | 'border' 
  | 'accent';

// Types pour la typographie
export type TypographyVariant = 
  | 'heading1' 
  | 'heading2' 
  | 'heading3' 
  | 'body1' 
  | 'body2' 
  | 'caption' 
  | 'button';

// Types pour l'espacement
export type SpacingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

// Validateurs de types runtime
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidDate = (date: any): date is Date => {
  return date instanceof Date && !isNaN(date.getTime());
};

export const isValidId = (id: string): boolean => {
  return typeof id === 'string' && id.length > 0;
};