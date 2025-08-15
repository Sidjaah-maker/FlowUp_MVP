#### **3.2 - docs/USER_STORIES.md**

```markdown
# User Stories Détaillées - Flow Up MVP

## 🎯 Epic 1: Timer de Jeûne Éducatif

### **US-001: Démarrer Premier Jeûne**

**En tant que** nouveau utilisateur  
**Je veux** choisir un protocole de jeûne et le démarrer immédiatement  
**Afin de** commencer mon parcours sans friction

**Critères d'acceptation:**

- [ ] Liste protocoles (16:8, 18:6, 20:4, OMAD) visible
- [ ] Selection protocole lance timer immédiatement
- [ ] Temps écoulé affiché en temps réel
- [ ] Phase biologique actuelle expliquée
- [ ] Onboarding total < 2 minutes

**Notes d'implémentation:**

- Utiliser FastingScreen avec sélecteur protocoles
- Hook useFastingTimer gère logique timer
- PhaseIndicator affiche phase + bénéfices

### **US-002: Comprendre Phases Biologiques**

**En tant que** pratiquant débutant  
**Je veux** voir ce qui se passe dans mon corps pendant le jeûne  
**Afin de** transformer l'anxiété en curiosité

**Critères d'acceptation:**

- [ ] Phase actuelle mise en évidence visuellement
- [ ] Description simple et motivante
- [ ] Bénéfices santé listés (max 2-3)
- [ ] Transition phases notifiée
- [ ] Prochaine étape indiquée avec timing

### **US-003: Gérer Interruptions**

**En tant que** utilisateur quotidien  
**Je veux** pouvoir pauser/reprendre mon jeûne  
**Afin de** m'adapter aux imprévus de la vie

**Critères d'acceptation:**

- [ ] Bouton pause/reprendre accessible
- [ ] Temps de pause calculé et soustrait
- [ ] État pause persisté entre sessions app
- [ ] Reprise seamless avec phases correctes
- [ ] Historique temps pause visible

## 🎯 Epic 2: Journal d'Entraînement Express

### **US-004: Saisie Rapide Exercice**

**En tant que** sportif post-workout  
**Je veux** enregistrer mes exercices en moins de 5 minutes  
**Afin de** maintenir ma motivation et ne pas oublier

**Critères d'acceptation:**

- [ ] Autocomplete exercice < 3 caractères
- [ ] Saisie série: reps + poids en 2 taps
- [ ] Mode musculation/callisthénie switchable
- [ ] Duplication série précédente possible
- [ ] Sauvegarde automatique continue

### **US-005: Feedback Progression Immédiat**

**En tant que** pratiquant régulier  
**Je veux** voir ma progression vs dernière fois  
**Afin de** rester motivé et ajuster ma charge

**Critères d'acceptation:**

- [ ] Volume total calculé temps réel
- [ ] Comparaison % vs session précédente
- [ ] Suggestion charge pour série suivante
- [ ] Historique exercice accessible pendant saisie
- [ ] Célébration progrès automatique

### **US-006: Support Callisthénie Fluide**

**En tant que** pratiquant poids du corps  
**Je veux** tracker mes exercices sans confusion  
**Afin de** ne pas être forcé d'utiliser une app séparée

**Critères d'acceptation:**

- [ ] Mode "poids du corps" désactive champ poids
- [ ] Support assistance/lest (ex: -20kg, +10kg)
- [ ] Exercices callisthénie dans autocomplete
- [ ] Calculs progression adaptés (reps focus)
- [ ] Interface cohérente avec musculation

## 🎯 Epic 3: Dashboard Insights Corrélatifs

### **US-007: Visualiser Progrès Global**

**En tant que** utilisateur 2+ semaines  
**Je veux** voir une vue d'ensemble de mes données  
**Afin de** comprendre si mes efforts portent leurs fruits

**Critères d'acceptation:**

- [ ] Métriques semaine: heures jeûne + volume
- [ ] Graphique évolution sur 7/30 jours
- [ ] Achievements automatiques détectés
- [ ] Trends visuels (hausse/baisse/stable)
- [ ] Chargement dashboard < 2 secondes

### **US-008: Découvrir Corrélations**

**En tant que** optimiseur de performance  
**Je veux** voir des patterns entre jeûne et sport  
**Afin de** optimiser mon timing d'entraînement

**Critères d'acceptation:**

- [ ] Corrélation statistique détectée (r > 0.3)
- [ ] Message insight en langage naturel
- [ ] Suggestion action concrète
- [ ] Confiance insight indiquée
- [ ] Minimum 2 semaines données requises

### **US-009: Agir sur Insights**

**En tant que** utilisateur engagé  
**Je veux** pouvoir suivre les suggestions  
**Afin de** améliorer concrètement mes résultats

**Critères d'acceptation:**

- [ ] Suggestions cliquables
- [ ] Actions dirigent vers écran approprié
- [ ] Pré-remplissage basé sur recommendation
- [ ] Tracking si suggestion suivie
- [ ] Feedback qualité suggestion

## 🎯 Technical Stories

### **TS-001: Architecture Scalable**

**En tant que** développeur  
**Je veux** une architecture propre et extensible  
**Afin de** faciliter l'ajout de fonctionnalités Phase 2

### **TS-002: Performance Mobile**

**En tant qu'** utilisateur mobile  
**Je veux** une app fluide et responsive  
**Afin de** ne pas être frustré par la lenteur

### **TS-003: Offline-First**

**En tant qu'** utilisateur nomade  
**Je veux** que l'app fonctionne sans internet  
**Afin de** pouvoir tracker partout
```
