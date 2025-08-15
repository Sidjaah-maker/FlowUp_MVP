/**
 * Syst�me de couleurs Flow Up
 * Palette optimis�e pour lisibilit� et accessibilit�
 */

import { ColorName } from '../../types/common';

// Palette principale Flow Up
export const colors: Record<ColorName, string> = {
  // Couleurs primaires - Gradient bleu �nergisant
  primary: '#2563EB',      // Bleu Flow Up principal
  secondary: '#7C3AED',    // Violet accent pour contraste
  accent: '#06B6D4',       // Cyan pour highlights
  
  // Couleurs s�mantiques
  success: '#10B981',      // Vert pour accomplissements
  warning: '#F59E0B',      // Orange pour alertes
  error: '#EF4444',        // Rouge pour erreurs
  
  // Couleurs de fond
  background: '#FFFFFF',   // Blanc principal
  surface: '#F8FAFC',      // Gris tr�s clair pour cards
  
  // Couleurs de texte
  textPrimary: '#1F2937',  // Gris fonc� principal
  textSecondary: '#6B7280', // Gris moyen pour d�tails
  
  // Couleurs utilitaires
  border: '#E5E7EB',       // Gris clair pour bordures
};

// Mode sombre (pour Phase 2)
export const darkColors: Record<ColorName, string> = {
  primary: '#3B82F6',
  secondary: '#8B5CF6', 
  accent: '#22D3EE',
  
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
  
  background: '#111827',
  surface: '#1F2937',
  
  textPrimary: '#F9FAFB',
  textSecondary: '#D1D5DB',
  
  border: '#374151',
};

// Couleurs sp�cifiques aux phases de je�ne
export const fastingPhaseColors = {
  digestion: '#F59E0B',        // Orange - Digestion
  glycogen_depletion: '#3B82F6', // Bleu - Transition
  fat_burning: '#10B981',      // Vert - Fat burning 
  ketosis: '#8B5CF6',         // Violet - Ketosis
  autophagy: '#EF4444',       // Rouge - Autophagy
} as const;

// Gradients pour les �l�ments visuels
export const gradients = {
  primary: ['#2563EB', '#7C3AED'],
  success: ['#10B981', '#059669'],
  fasting: ['#3B82F6', '#8B5CF6'],
  achievement: ['#F59E0B', '#EF4444'],
} as const;

// Couleurs avec transparence
export const transparentColors = {
  primaryAlpha10: 'rgba(37, 99, 235, 0.1)',
  primaryAlpha20: 'rgba(37, 99, 235, 0.2)',
  primaryAlpha30: 'rgba(37, 99, 235, 0.3)',
  successAlpha10: 'rgba(16, 185, 129, 0.1)',
  successAlpha20: 'rgba(16, 185, 129, 0.2)',
  errorAlpha10: 'rgba(239, 68, 68, 0.1)',
  errorAlpha20: 'rgba(239, 68, 68, 0.2)',
  overlay: 'rgba(0, 0, 0, 0.5)',
  backdrop: 'rgba(0, 0, 0, 0.3)',
} as const;

// Helper functions pour manipulation couleurs
export const getColorByName = (name: ColorName): string => {
  return colors[name];
};

export const getFastingPhaseColor = (phase: string): string => {
  return fastingPhaseColors[phase as keyof typeof fastingPhaseColors] || colors.primary;
};

export const getGradient = (name: keyof typeof gradients): readonly string[] => {
  return gradients[name];
};