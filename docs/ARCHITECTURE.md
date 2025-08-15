# Architecture Flow Up MVP

## 🏗️ Vue d'Ensemble

Flow Up suit une architecture **Feature-Based** avec séparation claire :

- **UI Layer** : Composants React Native + Design System
- **Logic Layer** : Hooks personnalisés + Utilities
- **Data Layer** : AsyncStorage + Services

## 📁 Structure Détaillée

src/
├── components/ # Composants réutilisables
│ ├── UI/ # Design system (Button, Input, etc.)
│ ├── Fasting/ # Composants spécifiques jeûne
│ ├── Workout/ # Composants spécifiques entraînement
│ └── Progress/ # Composants analytics
├── screens/ # Écrans principaux
├── hooks/ # Logique métier réutilisable
├── services/ # Couche données (Storage, Analytics)
├── utils/ # Fonctions utilitaires pures
├── types/ # Définitions TypeScript
├── constants/ # Configuration (theme, data)
└── navigation/ # Configuration navigation

## 🔄 Data Flow

1. **User Action** → Component (écran ou composant)
2. **Component** → Hook (logique métier)
3. **Hook** → Service (storage/calculs)
4. **Service** → Storage/Utils
5. **Result** ← Hook ← Service
6. **UI Update** ← Component ← Hook

## 🎯 Principes de Design

### **Single Responsibility**

- Chaque composant a 1 responsabilité claire
- Hooks encapsulent 1 domaine métier
- Services gèrent 1 type de données

### **Composition over Inheritance**

- Préférer props + children vs héritage
- HOCs uniquement si nécessaire
- Custom hooks pour partage logique

### **Immutability**

- Pas de mutation directe d'état
- useState avec objets/arrays → spread operator
- Props read-only

## 📊 Performance Guidelines

### **React Native Optimizations**

- React.memo pour composants lourds (charts)
- useCallback pour fonctions passées en props
- useMemo pour calculs coûteux
- FlatList pour listes > 10 items

### **Storage Performance**

- AsyncStorage operations toujours async/await
- Batch operations quand possible
- Cache fréquemment utilisées données
- Cleanup old data périodiquement

### **Memory Management**

- clearInterval/clearTimeout dans cleanup
- Unsubscribe event listeners
- Avoid memory leaks dans useEffect

## 🔧 Development Patterns

### **Hook Pattern Standard**

```typescript
export const useFeatureName = (initialParams?) => {
  // 1. State declarations
  const [state, setState] = useState();

  // 2. Effects
  useEffect(() => {
    // logic
    return () => cleanup;
  }, [dependencies]);

  // 3. Handlers
  const handleAction = useCallback(() => {
    // logic
  }, [dependencies]);

  // 4. Return interface
  return {
    // data
    state,
    // actions
    handleAction,
    // computed
    derivedValue
  };
};

Component Pattern Standard

interface ComponentProps {
  // Explicit prop types
}

export const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2
}) => {
  // 1. Hooks
  const { data, actions } = useHook();

  // 2. Handlers
  const handlePress = () => {
    // logic
  };

  // 3. Render
  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
};

// 4. Styles at bottom
const styles = StyleSheet.create({
  container: {
    // styles using design system
  }
});

🚨 Common Pitfalls
❌ À Éviter

Logique métier dans composants
Props drilling > 2 niveaux
Styles hardcodés
useEffect sans dependencies
Types any

✅ Best Practices

Extraire logique dans hooks
Context API pour état global
Design system pour tous styles
Dependencies explicites
Types stricts partout
```
