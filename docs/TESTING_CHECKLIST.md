# Checklist Tests Manuels - Flow Up

## 🧪 Tests par Feature

### **Timer de Jeûne**

- [ ] Sélection protocole lance timer correct
- [ ] Progression circulaire fluide
- [ ] Phases biologiques changent aux bons moments
- [ ] Pause/reprendre calcul correct
- [ ] Persistence après fermeture app
- [ ] Notification fin de jeûne

### **Workout Logger**

- [ ] Autocomplete fonctionne < 3 caractères
- [ ] Saisie série rapide et intuitive
- [ ] Calcul volume temps réel
- [ ] Progression vs dernière fois correcte
- [ ] Mode callisthénie vs musculation
- [ ] Sauvegarde automatique

### **Dashboard Insights**

- [ ] Chargement < 2 secondes
- [ ] Graphiques corrects et lisibles
- [ ] Insights générés avec assez de données
- [ ] Messages en français naturel
- [ ] Actions suggestions fonctionnelles

## 📱 Tests Devices

### **iPhone**

- [ ] iPhone 8+ (écran small)
- [ ] iPhone 12+ (écran standard)
- [ ] iPhone 14 Pro Max (écran large)
- [ ] Safe area respectée
- [ ] Navigation smooth

### **Android**

- [ ] Samsung Galaxy S20+
- [ ] Google Pixel 6
- [ ] Device budget (Android 6.0+)
- [ ] Back button handling
- [ ] Permission requests

## ⚡ Tests Performance

### **Timing Critical**

- [ ] App launch < 3 secondes
- [ ] Screen transitions < 500ms
- [ ] Timer update < 100ms
- [ ] Dashboard load < 2 secondes
- [ ] Workout save < 1 seconde

### **Memory & Battery**

- [ ] Pas de memory leaks
- [ ] Timer background efficient
- [ ] CPU usage raisonnable
- [ ] Battery drain acceptable

## 🎯 Tests Edge Cases

### **Data States**

- [ ] Aucune donnée (first time user)
- [ ] Peu de données (< 1 semaine)
- [ ] Beaucoup de données (3+ mois)
- [ ] Données corrompues recovery
- [ ] Storage plein

### **Network States**

- [ ] Complètement offline
- [ ] Connection intermittente
- [ ] Passage offline → online
- [ ] Sync conflicts (Phase 2)

### **User Behaviors**

- [ ] Jeûne très court (< 1h)
- [ ] Jeûne très long (> 24h)
- [ ] Workout sans exercices
- [ ] Saisie données incorrectes
- [ ] Fermeture brutale app
