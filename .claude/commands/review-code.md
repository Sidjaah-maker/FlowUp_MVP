# Review code Flow Up

Avant de committer du code, vérifier :

## ✅ Standards Qualité

- Types TypeScript explicites partout
- Imports organisés (externes → internes → relatifs)
- Nommage cohérent avec conventions
- Pas de console.log en production
- Gestion d'erreur appropriée

## ✅ Architecture Flow Up

- Respect separation UI / Logique / Data
- Composants < 200 lignes
- Hooks < 100 lignes
- Réutilisation design system

## ✅ UX/Performance

- Animations fluides (< 300ms)
- Feedback utilisateur immédiat
- Accessibilité (testID, labels)
- États loading/error gérés

## ✅ Tests Manuels

- Flow utilisateur complet
- Edge cases (empty states, errors)
- Performance acceptable
- Cohérence visuelle
