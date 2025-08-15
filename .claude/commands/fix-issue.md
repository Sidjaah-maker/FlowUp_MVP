# Débugger un problème Flow Up

Pour résoudre un bug ou erreur :

1. **Identifier la cause** :

   - Erreur TypeScript → Vérifier types et imports
   - Erreur runtime → Examiner logs console
   - Bug UX → Tester user flow complet

2. **Diagnostiquer selon catégorie** :

   - **Timer/Hooks** : Vérifier useEffect dependencies
   - **Storage** : Confirmer AsyncStorage operations
   - **Navigation** : Valider screen params & types
   - **Performance** : Profiler renders et calculs

3. **Appliquer fix minimal** :

   - Modification la plus petite possible
   - Préserver fonctionnalités existantes
   - Maintenir cohérence architecture

4. **Valider fix** :
   - Test manuel du flow affecté
   - Vérification régression autres features
   - Performance check si applicable
