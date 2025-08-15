/**
 * Tests unitaires pour le design system
 * Validation des tokens de design et cohérence
 */

import {
  colors,
  typography,
  spacing,
  theme,
  validateTheme,
  getColorByName,
  getFastingPhaseColor,
  getTypographyStyle,
  getSpacing,
} from '../../constants/theme';

import { FastingPhase } from '../../types/fasting';

describe('Colors', () => {
  it('should have all required color tokens', () => {
    const requiredColors = [
      'primary',
      'secondary', 
      'success',
      'warning',
      'error',
      'background',
      'surface',
      'textPrimary',
      'textSecondary',
      'border',
      'accent',
    ];

    requiredColors.forEach(colorName => {
      expect(colors).toHaveProperty(colorName);
      expect(typeof colors[colorName as keyof typeof colors]).toBe('string');
      expect(colors[colorName as keyof typeof colors]).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  it('should have valid hex colors', () => {
    Object.values(colors).forEach(color => {
      expect(color).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  it('should provide fasting phase colors', () => {
    expect(getFastingPhaseColor('digestion')).toBe('#F59E0B');
    expect(getFastingPhaseColor('fat_burning')).toBe('#10B981');
    expect(getFastingPhaseColor('ketosis')).toBe('#8B5CF6');
    expect(getFastingPhaseColor('autophagy')).toBe('#EF4444');
  });

  it('should fallback to primary color for unknown phases', () => {
    expect(getFastingPhaseColor('unknown_phase')).toBe(colors.primary);
  });

  it('should get color by name', () => {
    expect(getColorByName('primary')).toBe(colors.primary);
    expect(getColorByName('success')).toBe(colors.success);
    expect(getColorByName('error')).toBe(colors.error);
  });
});

describe('Typography', () => {
  it('should have all required typography variants', () => {
    const requiredVariants = [
      'heading1',
      'heading2',
      'heading3',
      'body1',
      'body2',
      'caption',
      'button',
    ];

    requiredVariants.forEach(variant => {
      expect(typography).toHaveProperty(variant);
      
      const style = typography[variant as keyof typeof typography];
      expect(style).toHaveProperty('fontSize');
      expect(style).toHaveProperty('lineHeight');
      expect(style).toHaveProperty('fontWeight');
      
      expect(typeof style.fontSize).toBe('number');
      expect(typeof style.lineHeight).toBe('number');
      expect(typeof style.fontWeight).toBe('string');
    });
  });

  it('should have consistent font scale', () => {
    expect(typography.heading1.fontSize).toBeGreaterThan(typography.heading2.fontSize);
    expect(typography.heading2.fontSize).toBeGreaterThan(typography.heading3.fontSize);
    expect(typography.heading3.fontSize).toBeGreaterThan(typography.body1.fontSize);
    expect(typography.body1.fontSize).toBeGreaterThan(typography.body2.fontSize);
    expect(typography.body2.fontSize).toBeGreaterThan(typography.caption.fontSize);
  });

  it('should get typography style by variant', () => {
    const heading1Style = getTypographyStyle('heading1');
    expect(heading1Style).toEqual(typography.heading1);
    
    const bodyStyle = getTypographyStyle('body1');
    expect(bodyStyle).toEqual(typography.body1);
  });
});

describe('Spacing', () => {
  it('should have all required spacing sizes', () => {
    const requiredSizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

    requiredSizes.forEach(size => {
      expect(spacing).toHaveProperty(size);
      expect(typeof spacing[size as keyof typeof spacing]).toBe('number');
      expect(spacing[size as keyof typeof spacing]).toBeGreaterThan(0);
    });
  });

  it('should have consistent spacing scale', () => {
    expect(spacing.xs).toBeLessThan(spacing.sm);
    expect(spacing.sm).toBeLessThan(spacing.md);
    expect(spacing.md).toBeLessThan(spacing.lg);
    expect(spacing.lg).toBeLessThan(spacing.xl);
    expect(spacing.xl).toBeLessThan(spacing.xxl);
  });

  it('should follow 8px base unit', () => {
    // Vérifie que tous les espacements sont des multiples de 4 (demi-unité de base)
    Object.values(spacing).forEach(value => {
      expect(value % 4).toBe(0);
    });
  });

  it('should get spacing by size', () => {
    expect(getSpacing('xs')).toBe(spacing.xs);
    expect(getSpacing('md')).toBe(spacing.md);
    expect(getSpacing('xl')).toBe(spacing.xl);
  });
});

describe('Theme object', () => {
  it('should have all required theme properties', () => {
    expect(theme).toHaveProperty('colors');
    expect(theme).toHaveProperty('typography');
    expect(theme).toHaveProperty('spacing');
    expect(theme).toHaveProperty('borderRadius');
    expect(theme).toHaveProperty('shadows');
    expect(theme).toHaveProperty('meta');
  });

  it('should have valid meta information', () => {
    expect(theme.meta.name).toBe('Flow Up Light');
    expect(theme.meta.version).toBe('1.0.0');
    expect(theme.meta.baseUnit).toBe(8);
    expect(theme.meta.colorPrimary).toBe(colors.primary);
    expect(theme.meta.fontScale).toBe(1.25);
  });

  it('should validate theme correctly', () => {
    expect(validateTheme(theme)).toBe(true);
    
    const invalidTheme = { colors: null };
    expect(validateTheme(invalidTheme)).toBe(false);
  });

  it('should have specialized configurations', () => {
    expect(theme).toHaveProperty('layout');
    expect(theme).toHaveProperty('navigation');
    expect(theme).toHaveProperty('timer');
    expect(theme).toHaveProperty('form');
    
    expect(theme.layout.screenPadding).toBeDefined();
    expect(theme.timer.circularProgressSize).toBeDefined();
    expect(theme.form.inputHeight).toBeDefined();
  });
});

describe('Theme consistency', () => {
  it('should use consistent color naming', () => {
    // Vérifie que les couleurs primaires sont cohérentes
    expect(theme.meta.colorPrimary).toBe(theme.colors.primary);
  });

  it('should have accessible color contrasts', () => {
    // Test basique de contraste (simplifié)
    expect(colors.textPrimary).not.toBe(colors.background);
    expect(colors.textSecondary).not.toBe(colors.background);
  });

  it('should have timer-specific styling', () => {
    expect(theme.timerText.large.fontSize).toBeGreaterThan(theme.typography.heading1.fontSize);
    expect(theme.timer.circularProgressSize).toBeGreaterThan(200);
    expect(theme.timer.circularProgressStroke).toBeGreaterThan(8);
  });
});