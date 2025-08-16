#!/bin/bash

# Script d'initialisation Git pour FlowUp_MVP
echo "🚀 Initialisation Git pour FlowUp_MVP"
echo "==========================================="

# Navigation vers le dossier projet
cd "/Users/h_im/PROJETS/FlowUp_MVP" || exit

echo "📂 Dossier actuel: $(pwd)"
echo ""

# Vérification du statut Git
echo "🔍 Statut Git actuel:"
git status
echo ""

# Ajout des fichiers
echo "📦 Ajout des fichiers au staging:"
git add .
echo "✅ git add . - Terminé"
echo ""

# Commit initial
echo "💾 Création du commit initial:"
git commit -m "Initial commit: Flow Up MVP foundation

- Structure React Native CLI générée
- Configuration TypeScript et dependencies
- Navigation et AsyncStorage configurés
- Architecture de base pour app de jeûne intermittent
- Fichiers de configuration iOS/Android
- Documentation et guides de développement"

echo ""

# Vérification finale
echo "🏁 Statut final:"
git status
echo ""

echo "🎉 Initialisation Git complétée avec succès!"
