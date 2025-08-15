### **7. Templates & Boilerplates**

#### **7.1 - templates/component-template.tsx**
```typescript
// Template pour nouveaux composants Flow Up
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing } from '../constants/theme';

interface ComponentNameProps {
  // Props avec types explicites
  title: string;
  onPress?: () => void;
}

export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onPress
}) => {
  // 1. Hooks
  
  // 2. Handlers
  const handlePress = () => {
    onPress?.();
  };
  
  // 3. Render
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

// 4. Styles avec design system
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8,
  },
  title: {
    ...typography.heading3,
    color: colors.textPrimary,
  },
});