# Guide Déploiement - Flow Up

## 📱 App Store Preparation

### **iOS (TestFlight → App Store)**

```bash
# Build release
cd ios
xcodebuild -workspace FlowUpMVP.xcworkspace -scheme FlowUpMVP -configuration Release archive

# Upload TestFlight
# Via Xcode Organizer ou Transporter

# Build release bundle
cd android
./gradlew bundleRelease

# Upload Play Console
# Via Play Console ou API
```

📋 Pre-Launch Checklist
Code Quality

TypeScript 0 errors
ESLint 0 warnings
Performance profiling OK
Memory leaks check
Bundle size < 50MB

Content & Legal

App Store descriptions
Screenshots 6.5" + 5.5"
Privacy Policy
Terms of Service
Age rating approprié

Functionality

All core features working
Critical user flows tested
Error handling graceful
Offline functionality
Data persistence

🔧 Environment Variables

# .env.production

NODE_ENV=production
API_URL=https://api.flowup.app
ANALYTICS_KEY=xxxxx
SENTRY_DSN=xxxxx

📊 Monitoring Setup
Crash Reporting

Sentry integration
React Native error boundaries
Native crash collection

Analytics

Mixpanel/Amplitude events
User journey tracking
Performance metrics
Retention cohorts
