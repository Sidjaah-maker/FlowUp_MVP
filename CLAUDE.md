# Flow Up MVP - Configuration Claude Code

## 🎯 Contexte Projet

**Flow Up** est une application fitness minimaliste qui résout le "manque de visibilité des progrès" pour les pratiquants de jeûne intermittent + musculation/callisthénie.

**Vision Design :** Épuré, intuitif, fonctionnel. Chaque élément UI doit avoir une raison d'être.

**MVP Cible :** Communauté OMAD + sportifs cherchant une solution intégrée simple.

## 🏗️ Architecture Technique

### Stack Principal

- **Frontend :** React Native 0.72+ avec TypeScript
- **Navigation :** React Navigation v6
- **State Management :** React Context API + Hooks (MVP), Redux si nécessaire
- **Storage :** AsyncStorage (local-first) → PostgreSQL (Phase 2)
- **UI Components :** Custom (design system propre)
- **Charts :** react-native-chart-kit + react-native-svg
- **Icons :** react-native-vector-icons (Feather set)

### Principe Architecture

- **Feature-Based Structure :** Organisation par fonctionnalité métier
- **Separation of Concerns :** UI / Logique / Données distinctes
- **TypeScript Strict :** Types explicites partout
- **Component Composition :** Préférer composition à héritage
- **Local-First :** Fonctionnel offline, sync plus tard

## 📱 Spécifications MVP v1.0

### Fonctionnalités Core

1. **Timer Jeûne Éducatif** : Minuteur avec phases biologiques
2. **Workout Logger Express** : Saisie rapide musculation/callisthénie
3. **Dashboard Insights** : Corrélations jeûne/performance visuelles

### Exclusions MVP

- ❌ Intégrations wearables (Phase 2)
- ❌ Suggestions IA adaptatives (Phase 2)
- ❌ Scanner codes-barres nutrition (Phase 2)
- ❌ Fonctionnalités sociales (Phase 2)

## 🎨 Standards Code & Design

### TypeScript

```typescript
// ✅ Types explicites obligatoires
interface FastingSession {
  id: string;
  startTime: Date;
  targetDuration: number; // minutes
  protocol: FastingProtocol;
  isActive: boolean;
}

// ✅ Énumérations pour constantes
enum FastingProtocol {
  SIXTEEN_EIGHT = '16:8',
  EIGHTEEN_SIX = '18:6',
  TWENTY_FOUR = '20:4',
  OMAD = 'OMAD',
}

// ❌ Types any interdits
const data: any = {}; // INTERDIT
```

### Conventions Nommage

```typescript
// Composants : PascalCase
const FastingTimer: React.FC = () => {};

// Hooks : camelCase avec préfixe "use"
const useFastingTimer = () => {};

// Constants : SCREAMING_SNAKE_CASE
const MAX_FASTING_DURATION = 1440; // 24h en minutes

// Files : kebab-case pour utils, PascalCase pour composants
// ✅ fasting-calculations.ts
// ✅ FastingTimer.tsx
```

### Styles & Design System

```typescript
// ✅ Utiliser le theme centralisé
import { colors, typography, spacing } from '@/constants/theme';

const styles = {
  container: {
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  title: {
    ...typography.heading1,
    color: colors.textPrimary,
  },
};

// ❌ Pas de styles hardcodés
const badStyle = {
  color: '#000000', // INTERDIT
  fontSize: 18, // INTERDIT
};
```

## 🔧 Commandes Essentielles

### Développement

```bash
# Démarrage Metro
npm start

# iOS (si Mac)
npm run ios

# Android
npm run android

# Type checking
npm run tsc

# Linting
npm run lint

# Tests
npm run test
```

### Structure Features

```bash
# Créer nouvelle feature
mkdir -p src/components/NewFeature
mkdir -p src/hooks/useNewFeature
touch src/types/newFeature.ts
```

## 📋 Workflow de Développement

### 1. Avant de Coder

- ✅ Définir les types TypeScript de la feature
- ✅ Créer les composants UI mockés (sans logique)
- ✅ Implémenter la logique dans les hooks
- ✅ Connecter UI + logique
- ✅ Tester manuellement le flow complet

### 2. Standards Qualité

- ✅ Chaque composant doit être fonctionnel dès sa création
- ✅ Props typées avec interface dédiée
- ✅ Gestion d'erreur explicite (loading, error states)
- ✅ Accessibilité de base (testID, accessibilityLabel)
- ✅ Performance (React.memo si nécessaire)

### 3. Organisation Code

```typescript
// ✅ Structure composant type
interface FastingTimerProps {
  session: FastingSession;
  onPause: () => void;
  onStop: () => void;
}

export const FastingTimer: React.FC<FastingTimerProps> = ({
  session,
  onPause,
  onStop,
}) => {
  // 1. Hooks
  const { currentPhase, timeRemaining } = useFastingTimer(session);

  // 2. Handlers
  const handlePause = () => {
    // Logique pause
    onPause();
  };

  // 3. Render
  return <View style={styles.container}>{/* UI */}</View>;
};

// 4. Styles en bas
const styles = StyleSheet.create({
  container: {
    // styles
  },
});
```

## 🎯 Priorités MVP

### Sprint 1 (Timer Jeûne)

1. Types FastingSession + FastingPhase
2. Composant CircularProgress générique
3. Hook useFastingTimer avec phases
4. Screen FastingScreen fonctionnel
5. AsyncStorage pour persistence

### Sprint 2 (Workout Logger)

1. Types Workout + Exercise + Set
2. Base données exercises.json (50 essentiels)
3. Composants ExerciseSearch + SetInput
4. Hook useWorkoutLogger avec calculs
5. Screen WorkoutScreen complet

### Sprint 3 (Dashboard)

1. Types ProgressInsight + CorrelationData
2. Composant ProgressChart simple
3. Service CorrelationEngine
4. Screen ProgressScreen avec insights
5. Navigation finale + polish

## 🚫 Anti-Patterns à Éviter

### Code

- ❌ Composants > 200 lignes (découper)
- ❌ Hooks > 100 lignes (extraire logique)
- ❌ Props drilling > 2 niveaux (Context API)
- ❌ useEffect sans dependencies array
- ❌ Mutations directes d'état

### UX/UI

- ❌ Plus de 3 taps pour action principale
- ❌ Écrans surchargés (> 7 éléments focus)
- ❌ Animations > 300ms
- ❌ Textes > 2 lignes sans raison
- ❌ Couleurs hors design system

## 💡 Notes Spéciales

### Performance

- Utiliser React.memo pour composants lourds (charts)
- Lazy loading pour screens non-critiques
- Limitation datasets : max 100 sessions jeûne, 50 workouts en mémoire

### Accessibilité

- testID sur tous les éléments interactifs
- accessibilityLabel descriptifs
- Support navigation clavier (Android TV future)

### Données

- Toujours valider inputs utilisateur
- Sauvegardes automatiques toutes les 30s
- Backup local avant modifications critiques

---

**Rappel Vision :** Chaque ligne de code doit servir l'objectif de simplicité et d'intuitivité. Si une feature complexifie l'usage, c'est qu'elle n'est pas prête pour ce MVP.
