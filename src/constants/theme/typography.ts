/**
 * Système typographique Flow Up
 * Basé sur une échelle modulaire pour cohérence et lisibilité
 */

import { TypographyVariant } from '../../types/common';

// Échelle typographique modulaire (ratio 1.25)
const scale = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 30,
  '3xl': 36,
  '4xl': 48,
} as const;

// Poids de police standardisés
export const fontWeights = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

// Hauteurs de ligne optimisées pour lisibilité
const lineHeights = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.6,
  loose: 1.8,
} as const;

// Styles typographiques complets
export const typography: Record<TypographyVariant, {
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
  letterSpacing?: number;
}> = {
  heading1: {
    fontSize: scale['3xl'],
    lineHeight: scale['3xl'] * lineHeights.tight,
    fontWeight: fontWeights.bold,
    letterSpacing: -0.5,
  },
  heading2: {
    fontSize: scale['2xl'],
    lineHeight: scale['2xl'] * lineHeights.tight,
    fontWeight: fontWeights.bold,
    letterSpacing: -0.25,
  },
  heading3: {
    fontSize: scale.xl,
    lineHeight: scale.xl * lineHeights.normal,
    fontWeight: fontWeights.semibold,
  },
  body1: {
    fontSize: scale.base,
    lineHeight: scale.base * lineHeights.normal,
    fontWeight: fontWeights.normal,
  },
  body2: {
    fontSize: scale.sm,
    lineHeight: scale.sm * lineHeights.normal,
    fontWeight: fontWeights.normal,
  },
  caption: {
    fontSize: scale.xs,
    lineHeight: scale.xs * lineHeights.normal,
    fontWeight: fontWeights.normal,
    letterSpacing: 0.25,
  },
  button: {
    fontSize: scale.base,
    lineHeight: scale.base * lineHeights.tight,
    fontWeight: fontWeights.medium,
    letterSpacing: 0.25,
  },
};

// Police système optimisée par plateforme
export const fontFamily = {
  ios: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  android: {
    regular: 'Roboto',
    medium: 'Roboto',
    bold: 'Roboto',
  },
  // Fallback pour le web (développement)
  web: {
    regular: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    medium: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    bold: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
} as const;

// Helper functions pour utilisation pratique
export const getTypographyStyle = (variant: TypographyVariant) => {
  return typography[variant];
};

export const createTextStyle = (
  variant: TypographyVariant,
  color?: string,
  additionalProps?: Record<string, any>
) => {
  return {
    ...typography[variant],
    color,
    ...additionalProps,
  };
};

// Styles spécialisés pour les timers et métriques
export const timerTypography = {
  large: {
    fontSize: scale['4xl'],
    lineHeight: scale['4xl'] * lineHeights.tight,
    fontWeight: fontWeights.bold,
    letterSpacing: -1,
  },
  medium: {
    fontSize: scale['2xl'],
    lineHeight: scale['2xl'] * lineHeights.tight,
    fontWeight: fontWeights.semibold,
    letterSpacing: -0.5,
  },
  small: {
    fontSize: scale.lg,
    lineHeight: scale.lg * lineHeights.normal,
    fontWeight: fontWeights.medium,
  },
} as const;

// Styles pour les phases de jeûne
export const phaseTypography = {
  title: {
    fontSize: scale.lg,
    lineHeight: scale.lg * lineHeights.normal,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.15,
  },
  description: {
    fontSize: scale.sm,
    lineHeight: scale.sm * lineHeights.relaxed,
    fontWeight: fontWeights.normal,
  },
  benefit: {
    fontSize: scale.xs,
    lineHeight: scale.xs * lineHeights.relaxed,
    fontWeight: fontWeights.normal,
    letterSpacing: 0.1,
  },
} as const;

// Export des tailles pour usage direct
export { scale as fontSizes };
export { lineHeights };

// Export type-safe des variants
export type FontWeight = keyof typeof fontWeights;
export type FontSize = keyof typeof scale;