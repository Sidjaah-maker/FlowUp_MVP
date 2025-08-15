# API Specifications - Flow Up Phase 2

## 🔗 Endpoints Prévus

### **Authentication**

POST /auth/register
POST /auth/login
POST /auth/refresh
DELETE /auth/logout

### **Fasting Sessions**

GET /fasting/sessions
POST /fasting/sessions
PUT /fasting/sessions/:id
DELETE /fasting/sessions/:id
GET /fasting/insights

### **Workouts**

GET /workouts
POST /workouts
PUT /workouts/:id
DELETE /workouts/:id
GET /workouts/exercises

### **Analytics**

GET /analytics/correlations
GET /analytics/trends
GET /analytics/achievements

## 📊 Data Models

### **FastingSession**

```json
{
  "id": "uuid",
  "userId": "uuid",
  "startTime": "ISO8601",
  "targetDuration": "number (minutes)",
  "protocol": "16:8|18:6|20:4|OMAD",
  "completedAt": "ISO8601?",
  "phases": [
    {
      "name": "string",
      "startTime": "ISO8601",
      "endTime": "ISO8601?"
    }
  ]
}

Note: Préparation pour migration AsyncStorage → API
```
