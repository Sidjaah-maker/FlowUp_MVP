# Flow Up MVP - Product Requirements Document (PRD)

## 📊 Executive Summary

### **Vision Produit**

Flow Up révolutionne le suivi de santé et performance en résolvant le **"manque de visibilité des progrès"** pour les pratiquants de jeûne intermittent combiné à la musculation/callisthénie. Notre application minimaliste transforme l'anxiété liée au jeûne en curiosité motivante et connecte intelligemment les données de jeûne aux performances sportives.

### **Positionnement Stratégique**

**"L'unique application qui unit jeûne intermittent et entraînement dans une expérience épurée et éducative"**

### **Objectifs MVP**

- **Validation Product-Market Fit** : 100+ utilisateurs actifs, rétention J7 > 40%
- **Différenciation concurrentielle** : Intégration jeûne + sport + design minimaliste
- **Foundation scalable** : Architecture prête pour fonctionnalités IA Phase 2

---

## 🎯 Problem Statement & Market Opportunity

### **Problème Principal**

> _"Quand je pratique le jeûne intermittent + musculation/callisthénie, je suis frustré par le manque de visibilité de mes performances parce que j'ai l'impression de stagner physiquement, ce qui m'empêche de tenir sur le long terme."_

### **Pain Points Identifiés**

1. **App Juggling** : Jongler entre 3-4 apps (Zero, Strong, MyFitnessPal)
2. **Complexity Overwhelm** : Interfaces surchargées qui cassent la motivation
3. **Data Disconnect** : Aucune corrélation jeûne/performance disponible
4. **Education Gap** : Méconnaissance des phases biologiques du jeûne

### **Market Size & Opportunity**

- **Marché français** : 82,2M€ (2023), +13,3% CAGR
- **Cible primaire** : Communauté OMAD (niche engagée, ~50K utilisateurs France)
- **Cible secondaire** : Pratiquants 16:8 + sport (500K+ potentiel)
- **Concurrents** : Solutions partielles sans intégration (Zero, MyFitnessPal, Strong)

---

## 👥 User Personas & Target Audience

### **Persona Primaire : "Alex l'OMAD Performer"**

- **Démographique** : 28-35 ans, cadre actif, urbain
- **Expérience** : Pratique OMAD depuis 6+ mois, musculation 3x/semaine
- **Frustrations** :
  - Utilise 3 apps différentes pour tracker
  - Ne voit pas si jeûne impacte ses performances
  - Démotivé par plateaux apparents
- **Objectifs** : Optimiser timing entraînement vs jeûne, progresser constamment
- **Citations** : _"Je ne sais jamais si mes bad days de training sont liés à mon jeûne ou pas"_

### **Persona Secondaire : "Marie la Débutante Curieuse"**

- **Démographique** : 25-32 ans, active, recherche d'équilibre
- **Expérience** : Découvre jeûne 16:8, fait du fitness 2x/semaine
- **Frustrations** :
  - Apps jeûne trop basiques (juste timer)
  - Ne comprend pas ce qui se passe dans son corps
  - Peur de mal faire, besoin de guidance
- **Objectifs** : Apprendre le jeûne sainement, voir progrès tangibles
- **Citations** : _"J'aimerais comprendre pourquoi j'ai plus d'énergie certains jours"_

### **Persona Tertiaire : "Tom l'Athlète Optimiseur"**

- **Démographique** : 22-28 ans, sportif sérieux, callisthénie
- **Expérience** : Jeûne 18:6, entraînement quotidien, orienté performance
- **Frustrations** :
  - Apps fitness ignorent l'impact du jeûne
  - Pas d'insights pour optimiser ses cycles
  - Veut des données précises et actionnables
- **Objectifs** : Performance maximale, récupération optimisée
- **Citations** : _"Je track tout mais je n'arrive pas à voir les patterns"_

---

## 🏗️ Product Architecture & Core Features

### **MVP v1.0 Scope (3 Fonctionnalités Core)**

#### **🥇 Feature 1 : Timer de Jeûne Éducatif**

**Job-to-be-Done** : _"Transformer l'anxiété du jeûne en curiosité et accomplissement"_

**User Story** :

> En tant que pratiquant de jeûne intermittent, je veux voir les phases biologiques que traverse mon corps afin de comprendre et apprécier ce qui se passe pendant mon jeûne.

**Spécifications Détaillées** :

- **Minuteur circulaire** avec progression visuelle fluide
- **5 phases biologiques** : Digestion (0h) → Réserves (4h) → Cétose (12h) → Autophagie (16h) → Régénération (20h+)
- **Protocoles prédéfinis** : 16:8, 18:6, 20:4, OMAD avec personnalisation
- **Notifications éducatives** : Alertes discrètes aux transitions de phases
- **Pause/reprendre** : Gestion interruptions avec calcul temps réel
- **Persistence** : Sauvegarde automatique, reprise après fermeture app

**Critères d'Acceptation** :

- ✅ Démarrage nouveau jeûne < 2 minutes (onboarding inclus)
- ✅ Précision timer ±30 secondes
- ✅ Affichage phase biologique correcte selon durée écoulée
- ✅ Notifications timing exact aux transitions (12h, 16h, 20h)
- ✅ Session persiste après fermeture/réouverture app

**Métriques de Succès** :

- Taux de complétion jeûne > 80%
- Temps d'engagement moyen > 3 minutes/session
- 90% utilisateurs comprennent les phases biologiques

#### **🥈 Feature 2 : Journal d'Entraînement Express**

**Job-to-be-Done** : _"Enregistrer mes performances rapidement sans perdre ma motivation post-workout"_

**User Story** :

> En tant que sportif, je veux logger ma séance en moins de 5 minutes avec calcul automatique de ma progression afin de maintenir ma motivation et suivre mes gains.

**Spécifications Détaillées** :

- **Base exercices** : 50 exercices essentiels (30 musculation + 20 callisthénie)
- **Saisie unifiée** : Mode switcher "Fonte" ↔ "Poids du corps"
- **Autocomplete intelligent** : Recherche exercice < 3 caractères
- **Input rapide** : Séries/Reps/Poids en 2 taps maximum
- **Calculs temps réel** :
  - Volume total séance (sets × reps × poids)
  - Progression vs dernière fois (+/- % volume)
  - Estimation 1RM (formule Brzycki)
- **Historique contextuel** : Affichage performance précédente pendant saisie

**Critères d'Acceptation** :

- ✅ Enregistrement séance complète < 5 minutes
- ✅ Autocomplete fonctionne avec noms partiels
- ✅ Calcul volume instantané (< 1 seconde)
- ✅ Progression affichée immédiatement vs session précédente
- ✅ Support musculation ET callisthénie fluide

**Métriques de Succès** :

- 80% séances enregistrées en < 5 minutes
- Utilisation régulière (3+ sessions/semaine) par 60% utilisateurs
- Taux d'abandon saisie < 10%

#### **🥉 Feature 3 : Dashboard Insights Corrélatifs**

**Job-to-be-Done** : _"Découvrir des patterns entre mon jeûne et mes performances pour optimiser mes résultats"_

**User Story** :

> En tant qu'utilisateur régulier avec 2+ semaines de données, je veux visualiser des corrélations entre mes heures de jeûne et mes performances afin d'optimiser mon timing d'entraînement.

**Spécifications Détaillées** :

- **Vue temporelle** : Sélecteur 7/30 jours avec graphiques simples
- **Métriques clés** :
  - Heures de jeûne cumulées par semaine
  - Volume d'entraînement moyen
  - Courbes superposées jeûne + performance
- **Insights automatiques** :
  - Détection patterns via corrélation statistique (seuil r > 0.3)
  - Messages en langage naturel : _"Vos meilleures perfs arrivent 16h+ après début jeûne"_
  - Suggestions actionnables : _"Programmer workout demain à 17h ?"_
- **Célébrations** : Achievements automatiques ("50h de jeûne cette semaine !")

**Critères d'Acceptation** :

- ✅ Dashboard se charge < 2 secondes
- ✅ Au moins 1 insight détecté par semaine (avec 14+ jours données)
- ✅ Corrélations statistiquement significatives (p < 0.05)
- ✅ Messages insights compréhensibles par utilisateur lambda
- ✅ Actions suggérées cliquables et utiles

**Métriques de Succès** :

- 70% utilisateurs consultent dashboard 2+ fois/semaine
- 60% cliquent sur suggestions d'actions
- NPS > 30 sur utilité des insights

### **🚫 Exclusions MVP v1.0**

- ❌ **Suggestions IA adaptatives** : Trop complexe (Phase 2)
- ❌ **Intégrations wearables** : Thryve reporté Phase 2
- ❌ **Scanner codes-barres nutrition** : Feature nice-to-have
- ❌ **Fonctionnalités sociales** : Partage, défis, communauté
- ❌ **Notifications push avancées** : Seulement transitions phases
- ❌ **Export de données** : CSV, PDF reports
- ❌ **Multi-langues** : Français uniquement MVP

---

## 🎨 Design & User Experience

### **Principes Design**

1. **Minimalisme Fonctionnel** : Chaque élément a une raison d'être
2. **Clarté Immédiate** : Compréhension instantanée sans formation
3. **Feedback Constant** : Progression visible et célébration des victoires
4. **Accessibilité** : Contraste, tailles de police, navigation claire

### **Design System**

```
Couleurs Primaires :
- Principal : #2563EB (Bleu confiance)
- Succès : #10B981 (Vert progression)
- Attention : #F59E0B (Orange insights)

Typography :
- Headers : Inter Bold 24-32px
- Body : Inter Regular 16px
- Captions : Inter Medium 12px
- Timer : Inter Bold 48px

Spacing :
- Unité base : 8px
- Padding écrans : 20px
- Espacement composants : 16px
```

### **User Flows Critiques**

#### **Flow 1 : Premier Jeûne (Onboarding)**

```
[Launch App] → [Welcome: "Commencer un jeûne"]
    ↓
[Protocole: 16:8 | 18:6 | 20:4 | OMAD]
    ↓
[Confirmation: "Jeûne 16h commence maintenant"]
    ↓
[Timer Actif avec Phase: "Digestion 0h15/16h"]
```

**Temps cible : < 2 minutes**

#### **Flow 2 : Log Workout Express**

```
[Dashboard] → [+ Workout]
    ↓
[Exercice: "Squat" autocomplete]
    ↓
[Saisie: 3 sets × 12 reps × 80kg]
    ↓
[Feedback: "Volume +15% vs dernière fois"]
    ↓
[Terminer ou + Exercice]
```

**Temps cible : < 5 minutes séance complète**

#### **Flow 3 : Découverte Insight**

```
[Dashboard] → [Onglet "Progrès 30 jours"]
    ↓
[Graphique: Jeûne + Performance corrélés]
    ↓
[Insight: "Meilleures perfs après 16h+ jeûne"]
    ↓
[Action: "Programmer workout demain 17h ?"]
```

**Temps cible : < 30 secondes pour comprendre pattern**

---

## 🛠️ Technical Specifications

### **Architecture Technique**

- **Frontend** : React Native 0.72+ avec TypeScript strict
- **Navigation** : React Navigation v6 (Tab + Stack)
- **State Management** : React Context API + Hooks (MVP), Redux si nécessaire
- **Storage** : AsyncStorage local-first → PostgreSQL Phase 2
- **Charts** : react-native-chart-kit + react-native-svg
- **Performance** : React.memo, lazy loading, 60fps animations

### **Contraintes Performance**

- **Démarrage app** : < 3 secondes
- **Navigation écrans** : < 500ms transitions
- **Calculs temps réel** : < 1 seconde (volume, corrélations)
- **Chargement dashboard** : < 2 secondes
- **Taille bundle** : < 50MB final

### **Compatibilité**

- **iOS** : 13.0+ (iPhone 8+)
- **Android** : API 23+ (Android 6.0+)
- **Offline** : Fonctionnalité complète sans internet
- **Orientation** : Portrait uniquement MVP

### **Sécurité & Privacy**

- **Données locales** : Chiffrement AsyncStorage
- **RGPD** : Consentement explicite, droit à l'oubli
- **Analytics** : Anonymisées, opt-in uniquement
- **Pas de tracking** : Aucune donnée partagée tiers MVP

---

## 📊 Success Metrics & KPIs

### **Métriques d'Adoption (30 premiers jours)**

- **Downloads** : 500+ installations organiques
- **Activation** : 80% complètent premier jeûne
- **Rétention J1** : 60%
- **Rétention J7** : 40%
- **Sessions quotidiennes** : 1.5 moyenne par utilisateur actif

### **Métriques d'Engagement (60 jours)**

- **Usage jeûne** : 70% loggent 3+ jeûnes/semaine
- **Usage workout** : 50% loggent 1+ workout/semaine
- **Usage dashboard** : 60% consultent 2+ fois/semaine
- **Durée session** : > 3 minutes moyenne
- **Complétion features** : 80% utilisent les 3 fonctionnalités

### **Métriques de Validation Produit**

- **NPS Score** : > 30 (satisfied users)
- **App Store Rating** : 4.5+ étoiles
- **Support tickets** : < 5% utilisateurs contactent support
- **Crash rate** : < 1%
- **Churn mensuel** : < 20%

### **Métriques Business (Phase 2 prep)**

- **LTV estimation** : Basée sur rétention 90 jours
- **Conversion freemium** : Préparation model premium
- **Viral coefficient** : Mesure partage organique
- **Feature adoption** : Utilisation relative des 3 piliers

---

## 🗓️ Development Roadmap

### **Phase 0 : Foundation (Semaine 0)**

- ✅ PRD validation & architecture technique
- ✅ Setup projet React Native + TypeScript
- ✅ Design system & composants UI de base
- ✅ Structure dossiers & conventions code

### **Phase 1 : MVP Development (Semaines 1-3)**

#### **Sprint 1 : Timer de Jeûne (Semaine 1)**

- Types TypeScript (fasting, phases)
- Hook useFastingTimer avec logique métier
- Composant CircularProgress + PhaseIndicator
- Screen FastingScreen complet
- Storage AsyncStorage + persistence
- Tests manuels + debugging

#### **Sprint 2 : Workout Logger (Semaine 2)**

- Types workout + base exercices JSON
- Hook useWorkoutLogger + calculs
- Composants ExerciseSearch + SetInput
- Screen WorkoutScreen + saisie rapide
- Intégration storage workouts
- Tests performance saisie

#### **Sprint 3 : Dashboard Insights (Semaine 3)**

- Service CorrelationEngine + insights
- Composants ProgressChart + InsightCard
- Screen ProgressScreen + visualisations
- Navigation finale + polish UX
- Tests end-to-end complets
- Préparation beta testing

### **Phase 2 : Beta Testing (Semaine 4)**

- **Recrutement** : 20-30 beta testeurs cible OMAD
- **Distribution** : TestFlight iOS + Internal Android
- **Feedback collection** : Interviews + analytics
- **Itérations** : Bugfixes + UX improvements
- **Métriques** : Validation hypothèses produit

### **Phase 3 : Launch Preparation (Semaine 5)**

- **App Store assets** : Screenshots, descriptions, metadata
- **Marketing prep** : Landing page, réseaux sociaux
- **Analytics setup** : Mixpanel/Amplitude intégration
- **Support setup** : Documentation, FAQ, feedback channel
- **Legal** : Terms of Service, Privacy Policy

### **Phase 4 : Public Launch (Semaine 6+)**

- **Soft launch** : France, iOS puis Android
- **Growth tactics** : Communautés OMAD, bouche-à-oreille
- **Monitoring** : Métriques temps réel, crash tracking
- **Itérations** : Updates basées feedback utilisateurs
- **Scale prep** : Infrastructure Phase 2 planning

---

## 💰 Business Model & Monetization

### **MVP Strategy : Freemium Foundation**

- **Version gratuite** : Toutes fonctionnalités MVP sans limitation
- **Objectif** : Maximiser adoption et validation product-market fit
- **Pas de publicité** : Respect vision minimaliste
- **Revenue** : Phase 2 avec fonctionnalités premium

### **Phase 2 Premium Features (Roadmap)**

- **Insights IA avancés** : Suggestions personnalisées, prédictions
- **Intégrations wearables** : Thryve API, données biométriques
- **Analytics avancés** : Rapports détaillés, export données
- **Coaching virtuel** : Plans personnalisés, guidance nutrition
- **Prix cible** : 4.99€/mois ou 39.99€/an (competitive vs MyFitnessPal)

### **Revenue Projections (Hypothèses)**

- **Year 1** : 0€ (gratuit complet, focus adoption)
- **Year 2** : 50K€ ARR (1000 premium users × 4.99€/mois)
- **Year 3** : 200K€ ARR (scale + nouvelles features)

---

## 🚨 Risks & Mitigation Strategies

### **Risques Techniques**

- **Performance mobile** : Tests continus, profiling
- **Compatibilité OS** : Tests multi-devices, beta diverse
- **Complexité corrélations** : Algorithmes simples MVP, sophistication Phase 2
- **Storage limitations** : Migration AsyncStorage → Cloud preparée

### **Risques Produit**

- **Adoption lente** : Marketing communautés nichées, product hunt
- **Concurrence** : Focus différenciation unique (jeûne + sport + minimalisme)
- **Rétention faible** : Gamification subtile, celebrating small wins
- **Feature creep** : Discipline MVP scope, feedback-driven roadmap

### **Risques Business**

- **Monétisation tardive** : Stratégie freemium validée, premium path claire
- **Regulatory health** : Disclaimers médicaux, focus bien-être vs santé
- **Market saturation** : Positionnement premium, quality over quantity

---

## ✅ Success Criteria & Go/No-Go Decision

### **MVP Success Threshold (3 mois post-launch)**

**🟢 GO (Development Phase 2) si :**

- Rétention J30 > 25%
- NPS > 20
- 70%+ utilisent les 3 fonctionnalités core
- Feedback qualitatif positif sur value prop
- Croissance organique mensuelle > 20%

**🟡 PIVOT si :**

- Rétention J30 : 15-25%
- Une des 3 fonctionnalités sous-utilisée
- Feedback mixte avec insights clairs amélioration
- → Itérations ciblées, re-test 6 semaines

**🔴 NO-GO si :**

- Rétention J30 < 15%
- NPS < 0
- Pas d'adoption organique
- → Retour analyse fondamentale problème utilisateur

### **Validation Metrics Dashboard**

**Suivi hebdomadaire :**

- Nouveaux utilisateurs (objectif : +20% semaine)
- Rétention cohorte (J1, J7, J30)
- Feature adoption rate (3 core features)
- Crash rate & performance
- Feedback qualitatif themes

---

## 📞 Stakeholders & Communication

### **Équipe Core**

- **Product Owner** : Vision produit, priorités, roadmap
- **Tech Lead** : Architecture, quality, performance
- **Designer** : UX/UI, design system, user testing
- **Growth** : Marketing, analytics, user acquisition

### **Communication Cadence**

- **Daily standups** : Progrès, blocages, priorités jour
- **Weekly reviews** : Metrics, user feedback, roadmap ajustements
- **Sprint demos** : Validation features, stakeholder alignment
- **Monthly board** : Business metrics, strategic decisions

---

**Document Version** : 1.0  
**Dernière mise à jour** : 14/08/25  
**Prochaine review** : Post-Sprint 1 (Semaine 2)

---

_Ce PRD est un document vivant, mis à jour selon les learnings utilisateur et l'évolution du marché. Chaque décision produit doit être validée par des données utilisateur et alignée avec la vision de simplicité et d'utilité de Flow Up._
