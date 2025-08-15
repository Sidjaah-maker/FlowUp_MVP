/**
 * Système d'espacement Flow Up
 * Basé sur une unité de base 8px pour cohérence et alignement sur grille
 */

import { SpacingSize } from '../../types/common';

// Unité de base 8px (standard design systems)
const baseUnit = 8;

// Échelle d'espacement cohérente
export const spacing: Record<SpacingSize, number> = {
  xs: baseUnit * 0.5,    // 4px
  sm: baseUnit * 1,      // 8px
  md: baseUnit * 2,      // 16px
  lg: baseUnit * 3,      // 24px
  xl: baseUnit * 4,      // 32px
  xxl: baseUnit * 6,     // 48px
};

// Espacements spécialisés pour différents contextes
export const layoutSpacing = {
  screenPadding: spacing.lg,     // 24px - padding des screens
  cardPadding: spacing.md,       // 16px - padding des cards
  sectionGap: spacing.xl,        // 32px - gap entre sections
  componentGap: spacing.md,      // 16px - gap entre composants
  elementGap: spacing.sm,        // 8px - gap entre éléments
  microGap: spacing.xs,          // 4px - gap minimal
} as const;

// Espacements pour les composants de navigation
export const navigationSpacing = {
  tabBarHeight: 80,
  tabBarPadding: spacing.md,
  headerHeight: 60,
  headerPadding: spacing.md,
  safeAreaTop: 44,    // iPhone safe area estimation
  safeAreaBottom: 34, // iPhone safe area estimation
} as const;

// Espacements pour les timers et éléments circulaires
export const timerSpacing = {
  circularProgressSize: 240,
  circularProgressStroke: 12,
  timerMargin: spacing.xl,
  phaseIndicatorGap: spacing.lg,
  controlsGap: spacing.md,
} as const;

// Espacements pour les formulaires et inputs
export const formSpacing = {
  inputHeight: 48,
  inputPadding: spacing.md,
  labelMargin: spacing.sm,
  fieldGap: spacing.lg,
  buttonHeight: 48,
  buttonPadding: spacing.md,
} as const;

// Espacements pour les listes et grilles
export const listSpacing = {
  itemHeight: 64,
  itemPadding: spacing.md,
  itemGap: spacing.sm,
  sectionHeaderHeight: 40,
  sectionHeaderPadding: spacing.md,
} as const;

// Rayons de bordure cohérents
export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

// Ombres standardisées
export const shadows = {
  none: {
    shadowOpacity: 0,
  },
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1, // Android
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5, // Android
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8, // Android
  },
} as const;

// Helper functions pour utilisation pratique
export const getSpacing = (size: SpacingSize): number => {
  return spacing[size];
};

export const createSpacingStyle = (
  top?: SpacingSize,
  right?: SpacingSize,
  bottom?: SpacingSize,
  left?: SpacingSize
) => {
  return {
    paddingTop: top ? spacing[top] : undefined,
    paddingRight: right ? spacing[right] : undefined,
    paddingBottom: bottom ? spacing[bottom] : undefined,
    paddingLeft: left ? spacing[left] : undefined,
  };
};

export const createMarginStyle = (
  top?: SpacingSize,
  right?: SpacingSize,
  bottom?: SpacingSize,
  left?: SpacingSize
) => {
  return {
    marginTop: top ? spacing[top] : undefined,
    marginRight: right ? spacing[right] : undefined,
    marginBottom: bottom ? spacing[bottom] : undefined,
    marginLeft: left ? spacing[left] : undefined,
  };
};

// Styles utilitaires fréquemment utilisés
export const commonSpacingStyles = {
  screenContainer: {
    padding: layoutSpacing.screenPadding,
    flex: 1,
  },
  card: {
    padding: layoutSpacing.cardPadding,
    borderRadius: borderRadius.lg,
    ...shadows.md,
  },
  section: {
    marginBottom: layoutSpacing.sectionGap,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
} as const;

// Export des valeurs numériques directes
export { baseUnit };
export type BorderRadiusSize = keyof typeof borderRadius;
export type ShadowSize = keyof typeof shadows;