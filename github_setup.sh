#!/bin/bash

echo "🔗 Connexion du repository local à GitHub"
echo "=========================================="

# Navigation vers le projet
cd "/Users/h_im/PROJETS/FlowUp_MVP" || exit

echo "📂 Dossier: $(pwd)"
echo ""

# Vérification des remotes existants
echo "🔍 Vérification des remotes actuels:"
git remote -v
echo ""

# Ajout du remote GitHub
echo "🔗 Ajout du remote GitHub:"
git remote add origin https://github.com/Sidjaah-maker/FlowUp_MVP.git
echo "✅ Remote 'origin' ajouté"
echo ""

# Vérification du statut
echo "📊 Statut Git:"
git status
echo ""

# Ajout des fichiers si nécessaire
echo "📦 Ajout des fichiers:"
git add .
echo "✅ Fichiers ajoutés"
echo ""

# Commit si des changements
echo "💾 Commit des modifications:"
git commit -m "Initial commit: Flow Up MVP foundation - React Native CLI

- Structure React Native CLI (sans Expo)
- Configuration TypeScript strict
- Dependencies: Navigation, AsyncStorage, SVG
- Architecture feature-based préparée
- Configuration iOS/Android native
- Documentation complète"
echo ""

# Push vers GitHub
echo "🚀 Push vers GitHub:"
git push -u origin main
echo "✅ Code poussé vers GitHub!"
echo ""

# Vérification finale
echo "🏁 Vérification finale:"
git remote -v
echo ""

echo "🎉 Repository maintenant visible sur GitHub:"
echo "   https://github.com/Sidjaah-maker/FlowUp_MVP"
