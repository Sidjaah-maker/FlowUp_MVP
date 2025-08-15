/**
 * Export centralisé du design system Flow Up
 * Point d'entrée unique pour tous les tokens de design
 */

// Export de tous les tokens de design
export * from './colors';
export * from './typography';
export * from './spacing';

// Import pour ré-export groupé
import { colors, darkColors, fastingPhaseColors, gradients, transparentColors } from './colors';
import { typography, timerTypography, phaseTypography, fontWeights, fontSizes } from './typography';
import { spacing, layoutSpacing, navigationSpacing, timerSpacing, formSpacing, borderRadius, shadows } from './spacing';

// Theme principal unifié
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  
  // Configurations spécialisées
  layout: layoutSpacing,
  navigation: navigationSpacing,
  timer: timerSpacing,
  form: formSpacing,
  
  // Typographies spécialisées
  timerText: timerTypography,
  phaseText: phaseTypography,
  
  // Couleurs spécialisées
  fastingColors: fastingPhaseColors,
  gradients,
  alpha: transparentColors,
  
  // Méta-données du theme
  meta: {
    name: 'Flow Up Light',
    version: '1.0.0',
    baseUnit: 8,
    colorPrimary: colors.primary,
    fontScale: 1.25,
  },
} as const;

// Theme sombre (pour Phase 2)
export const darkTheme = {
  ...theme,
  colors: darkColors,
  meta: {
    ...theme.meta,
    name: 'Flow Up Dark',
  },
} as const;

// Type pour le theme complet
export type Theme = typeof theme;
export type ThemeColors = typeof colors;
export type ThemeTypography = typeof typography;
export type ThemeSpacing = typeof spacing;

// Hook helper pour utilisation dans les composants (sera créé dans la Phase 2)
export const createUseTheme = () => {
  // Placeholder pour le hook useTheme qui sera implémenté avec Context
  return theme;
};

// Utilitaires pour validation du theme
export const validateTheme = (themeToValidate: any): themeToValidate is Theme => {
  return Boolean(
    themeToValidate?.colors &&
    themeToValidate?.typography &&
    themeToValidate?.spacing &&
    themeToValidate?.meta?.version
  );
};

// Export du theme par défaut
export default theme;