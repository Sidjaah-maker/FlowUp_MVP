/**
 * Composant CircularProgress réutilisable
 * Affichage de progression circulaire avec animations fluides
 */

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import { colors, getGradient } from '../../constants/theme/colors';
import { ComponentProps } from '../../types/common';

// Composant Circle animé
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularProgressProps extends ComponentProps {
  /** Progression de 0 à 1 */
  progress: number;
  /** Taille du composant en pixels */
  size?: number;
  /** Épaisseur du trait en pixels */
  strokeWidth?: number;
  /** Couleur de la progression */
  color?: string;
  /** Couleur de fond du cercle */
  backgroundColor?: string;
  /** Affichage d'un gradient */
  useGradient?: boolean;
  /** Type de gradient à utiliser */
  gradientType?: 'primary' | 'success' | 'fasting' | 'achievement';
  /** Animation activée */
  animated?: boolean;
  /** Durée de l'animation en ms */
  animationDuration?: number;
  /** Rotation du point de départ (en degrés) */
  rotation?: number;
  /** Sens de la progression */
  clockwise?: boolean;
  /** Arrondi des extrémités */
  lineCap?: 'round' | 'square';
}

export const CircularProgress: React.FC<CircularProgressProps> = React.memo(({
  progress,
  size = 240,
  strokeWidth = 12,
  color = colors.primary,
  backgroundColor = colors.border,
  useGradient = false,
  gradientType = 'primary',
  animated = true,
  animationDuration = 500,
  rotation = -90, // Commence en haut
  clockwise = true,
  lineCap = 'round',
  style,
  testID,
  accessibilityLabel,
}) => {
  // Animation de la progression
  const animatedProgress = useRef(new Animated.Value(0)).current;

  // Calculs géométriques
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  // Normalisation de la progression
  const normalizedProgress = Math.min(Math.max(progress, 0), 1);

  // Animation de la progression
  useEffect(() => {
    if (animated) {
      Animated.timing(animatedProgress, {
        toValue: normalizedProgress,
        duration: animationDuration,
        useNativeDriver: true,
      }).start();
    } else {
      animatedProgress.setValue(normalizedProgress);
    }
  }, [normalizedProgress, animated, animationDuration, animatedProgress]);

  // Calcul du stroke-dasharray pour la progression
  const strokeDasharray = `${circumference}`;
  
  // Animation du stroke-dashoffset
  const strokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  // Couleur avec gradient si activé
  const progressColor = useGradient ? getGradient(gradientType)[0] : color;

  // Transform pour la rotation
  const transform = [
    { rotate: `${rotation}deg` },
    { scaleY: clockwise ? 1 : -1 }
  ];

  return (
    <View 
      style={[styles.container, { width: size, height: size }, style]}
      testID={testID}
      accessibilityLabel={accessibilityLabel || `Progression: ${Math.round(normalizedProgress * 100)}%`}
    >
      <Svg width={size} height={size} style={styles.svg}>
        <G style={{ transform }}>
          {/* Cercle de fond */}
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeLinecap={lineCap}
          />
          
          {/* Cercle de progression */}
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap={lineCap}
            opacity={animated ? animatedProgress : normalizedProgress}
          />
        </G>
      </Svg>
      
      {/* Effet de brillance pour les gradients */}
      {useGradient && (
        <View style={[styles.shineOverlay, { width: size, height: size }]}>
          <Animated.View
            style={[
              styles.shine,
              {
                opacity: animatedProgress.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.3, 0],
                }),
              }
            ]}
          />
        </View>
      )}
    </View>
  );
});

// Composant avec indicateur de pourcentage intégré
interface CircularProgressWithTextProps extends CircularProgressProps {
  /** Texte à afficher au centre */
  centerText?: string;
  /** Style du texte central */
  textStyle?: any;
  /** Composant personnalisé pour le centre */
  centerComponent?: React.ReactNode;
}

export const CircularProgressWithText: React.FC<CircularProgressWithTextProps> = React.memo(({
  centerText,
  textStyle,
  centerComponent,
  size = 240,
  ...progressProps
}) => {
  return (
    <View style={styles.progressWithTextContainer}>
      <CircularProgress size={size} {...progressProps} />
      
      {/* Contenu central */}
      <View style={[styles.centerContent, { width: size, height: size }]}>
        {centerComponent || (
          centerText && (
            <Animated.Text style={[styles.centerText, textStyle]}>
              {centerText}
            </Animated.Text>
          )
        )}
      </View>
    </View>
  );
});

// Composant spécialisé pour le timer de jeûne
interface FastingProgressProps extends Omit<CircularProgressProps, 'color' | 'useGradient'> {
  /** Phase actuelle du jeûne */
  currentPhase?: string;
  /** Affichage du temps */
  timeDisplay?: string;
  /** Texte de la phase */
  phaseText?: string;
}

export const FastingProgress: React.FC<FastingProgressProps> = React.memo(({
  currentPhase,
  timeDisplay,
  phaseText,
  progress,
  ...props
}) => {
  // Couleur basée sur la phase
  const phaseColor = currentPhase ? colors.primary : colors.primary; // Utilise getFastingPhaseColor si importé

  return (
    <CircularProgressWithText
      progress={progress}
      color={phaseColor}
      useGradient={true}
      gradientType="fasting"
      centerComponent={
        <View style={styles.fastingCenter}>
          {timeDisplay && (
            <Animated.Text style={styles.timerText}>
              {timeDisplay}
            </Animated.Text>
          )}
          {phaseText && (
            <Animated.Text style={styles.phaseText}>
              {phaseText}
            </Animated.Text>
          )}
        </View>
      }
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    position: 'absolute',
  },
  shineOverlay: {
    position: 'absolute',
    borderRadius: 9999,
    overflow: 'hidden',
  },
  shine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 9999,
  },
  progressWithTextContainer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  fastingCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 8,
  },
  phaseText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

// Export par défaut du composant principal
export default CircularProgress;