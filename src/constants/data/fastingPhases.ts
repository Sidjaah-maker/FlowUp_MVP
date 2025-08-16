/**
 * Configuration des phases biologiques du jeûne intermittent
 * Données éducatives basées sur la recherche scientifique
 */

import { FastingPhase, FastingPhaseConfig } from '../../types/fasting';
import { getFastingPhaseColor } from '../theme/colors';

// Configuration détaillée des phases biologiques
export const FASTING_PHASES: FastingPhaseConfig[] = [
  {
    phase: FastingPhase.DIGESTION,
    startHour: 0,
    endHour: 4,
    title: 'Digestion',
    description: 'Votre corps digère encore le dernier repas et utilise le glucose comme source d\'énergie principale.',
    benefits: [
      'Digestion des nutriments en cours',
      'Glycémie qui commence à se stabiliser',
      'Préparation du système digestif au repos'
    ],
    color: getFastingPhaseColor('digestion'),
    icon: 'clock',
  },
  {
    phase: FastingPhase.GLYCOGEN_DEPLETION,
    startHour: 4,
    endHour: 12,
    title: 'Épuisement du Glycogène',
    description: 'Les réserves de glucose s\'épuisent. Le corps commence à puiser dans ses réserves de glycogène.',
    benefits: [
      'Stabilisation de la glycémie',
      'Début de la mobilisation des réserves',
      'Amélioration de la sensibilité à l\'insuline'
    ],
    color: getFastingPhaseColor('glycogen_depletion'),
    icon: 'trending-down',
  },
  {
    phase: FastingPhase.FAT_BURNING,
    startHour: 12,
    endHour: 18,
    title: 'Combustion des Graisses',
    description: 'Phase optimale ! Votre corps utilise maintenant les graisses comme source d\'énergie principale.',
    benefits: [
      'Combustion active des graisses',
      'Production de cétones énergétiques',
      'Clarté mentale accrue',
      'Stabilité énergétique'
    ],
    color: getFastingPhaseColor('fat_burning'),
    icon: 'zap',
  },
  {
    phase: FastingPhase.KETOSIS,
    startHour: 18,
    endHour: 24,
    title: 'Cétose Légère',
    description: 'Production optimisée de cétones. Votre cerveau utilise ces molécules comme carburant premium.',
    benefits: [
      'Production maximale de cétones',
      'Performance cognitive optimale',
      'Réduction de l\'inflammation',
      'Stabilité de l\'humeur'
    ],
    color: getFastingPhaseColor('ketosis'),
    icon: 'brain',
  },
  {
    phase: FastingPhase.AUTOPHAGY,
    startHour: 24,
    endHour: 72, // Jusqu'à 72h pour jeûnes prolongés
    title: 'Autophagie',
    description: 'Processus de nettoyage cellulaire activé. Votre corps recycle les cellules endommagées.',
    benefits: [
      'Nettoyage cellulaire profond',
      'Régénération des tissus',
      'Renforcement du système immunitaire',
      'Anti-âge naturel',
      'Réduction du stress oxydatif'
    ],
    color: getFastingPhaseColor('autophagy'),
    icon: 'refresh-cw',
  },
];

/**
 * Détermine la phase actuelle basée sur la durée écoulée
 */
export const getCurrentPhase = (hoursElapsed: number): FastingPhaseConfig => {
  // Trouve la phase correspondante
  const phase = FASTING_PHASES.find(phase => 
    hoursElapsed >= phase.startHour && hoursElapsed < phase.endHour
  );

  // Si aucune phase trouvée (cas des jeûnes très longs), retourne autophagie
  return phase || FASTING_PHASES[FASTING_PHASES.length - 1];
};

/**
 * Détermine la prochaine phase
 */
export const getNextPhase = (hoursElapsed: number): FastingPhaseConfig | null => {
  const currentPhaseIndex = FASTING_PHASES.findIndex(phase => 
    hoursElapsed >= phase.startHour && hoursElapsed < phase.endHour
  );

  if (currentPhaseIndex >= 0 && currentPhaseIndex < FASTING_PHASES.length - 1) {
    return FASTING_PHASES[currentPhaseIndex + 1];
  }

  return null; // Pas de phase suivante (déjà à la dernière)
};

/**
 * Calcule le progrès dans la phase actuelle (0-1)
 */
export const getPhaseProgress = (hoursElapsed: number): number => {
  const currentPhase = getCurrentPhase(hoursElapsed);
  const phaseDuration = currentPhase.endHour - currentPhase.startHour;
  const phaseElapsed = hoursElapsed - currentPhase.startHour;
  
  return Math.min(Math.max(phaseElapsed / phaseDuration, 0), 1);
};

/**
 * Obtient les heures clés pour les notifications
 */
export const getNotificationHours = (): number[] => {
  return [
    4,  // Fin de digestion
    12, // Début fat burning
    16, // Milieu fat burning  
    18, // Début cétose
    24, // Début autophagie
  ];
};

/**
 * Calcule le temps restant jusqu'à la prochaine phase
 */
export const getTimeToNextPhase = (hoursElapsed: number): number => {
  const nextPhase = getNextPhase(hoursElapsed);
  if (!nextPhase) return 0;
  
  return Math.max(nextPhase.startHour - hoursElapsed, 0);
};

/**
 * Obtient un message motivationnel basé sur la phase
 */
export const getMotivationalMessage = (phase: FastingPhase): string => {
  const messages = {
    [FastingPhase.DIGESTION]: 'C\'est parti ! Votre voyage commence. 🌟',
    [FastingPhase.GLYCOGEN_DEPLETION]: 'Votre corps s\'adapte parfaitement ! 💪',
    [FastingPhase.FAT_BURNING]: 'Excellent ! Vous brûlez maintenant vos graisses ! 🔥',
    [FastingPhase.KETOSIS]: 'Incroyable ! Votre cerveau carbure aux cétones ! 🧠✨',
    [FastingPhase.AUTOPHAGY]: 'Extraordinaire ! Régénération cellulaire activée ! 🔄',
  };

  return messages[phase] || 'Continuez, vous faites du super travail ! 💪';
};

// Export des phases par défaut pour tests et utilities
export default FASTING_PHASES;