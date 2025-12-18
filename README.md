https://github.com/user-attachments/assets/4f29b887-e23c-4462-995d-15165e536a03

# LingoQuest - AI-Powered Language Learning Platform

**LingoQuest** is a modern, web-based language learning platform that combines interactive lessons, gamification, peer-to-peer collaboration, and an AI-powered chatbot tutor to make language learning engaging, accessible, and effective.

## Features
### **Interactive Learning**
- **Short, engaging lessons** with videos, quizzes, and flashcards
- **Multi-language support** (English, Spanish, French, German and so on)
- **Progress tracking** with visual dashboards
- **Personalized learning paths** based on proficiency

### **LingoAI - Intelligent Language Tutor**
- **24/7 AI-powered conversation practice**
- **Real-time grammar and pronunciation corrections**
- **Adaptive difficulty** based on user level
- **Voice responses** with text-to-speech integration
- **Context-aware teaching** with cultural insights

### **Gamification**
- **Points & Rewards** system for completing lessons
- **Learning streaks** to encourage daily practice
- **Leaderboards** for competitive motivation
- **Achievements & Badges** for milestones

### **Modern Interface**
- **Responsive design** for all devices
- **Intuitive dashboard** with progress visualization
- **Clean, engaging UI/UX**
- **Real-time notifications**

## Team

- **Abu-safyan yusuf** - Frontend Developer
- **Sean Moses Okonofua** - Backend Engineer 
- **Onome Oshevire** - Generative AI Developer
- **Hajara Muhammad** - Web Design
- **Abubakar Abdulsalam** - Web Design
- **Hajara Muhammad** - Web Design
- **Onazi Precious** - UI/UX
- **Salma Alademerin** - UI/UX


## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- MongoDB (Local or Atlas)
- Groq API Key (for AI features)
- Deepgram API Key (for voice features)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sufyan-codes/EdTech2-LingoQuest.git
cd EdTech2-LingoQuest
```

2. **Set up the Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys
npm run seed
npm run dev
```

3. **Set up the Frontend**
```bash
cd frontend
npm install
npm run dev
```

4. **Set up Python Chatbot**
```bash
cd frontend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

5. **Access the Application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Python Chatbot: http://localhost:5003

## Project Structure

```
lingoquest/
├── backend/                    # Node.js Backend (Main API)
│   ├── config/                # Database configuration
│   ├── controllers/           # Request handlers
│   ├── middleware/            # Authentication middleware
│   ├── models/                # MongoDB schemas
│   ├── routes/                # API routes
│   ├── utils/                 # Utility functions
│   ├── server.js              # Main server file
│   └── package.json
├── frontend/                  # React Frontend
   ├── public/               # Static assets
   │   src/
   ├── Pages/
   │    ├── Auth/
   │    ├── Onboarding/
   │    ├── Dashboard/
   │    ├── Tutors/
   │    └── LingoAIDemo.jsx
   │
   ├── components/
   │    ├── Layout.jsx
   │    └── ProtectedRoute.jsx
   │
   ├── context/
   │    ├── AuthContext.jsx
   │    └── OnboardingContext.jsx
   │
   ├── services/
   │    ├── api.js
   │    ├── authService.js
   │    ├── contentService.js
   │    ├── tutorApi.js
   │    └── userService.js
   │
   ├── utils/
   │    └── axiosInstance.js
   │
   ├── assets/
   ├── main.jsx
   └── index.css
│   
│   
│   
│   
│   
│   
│   
│   
├── docs/                     # Documentation
├── scripts/                  # Deployment scripts
└── README.md                # This file
```

## Technology Stack

### **Frontend**
- **React 19** - UI Library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **React Query** - Data fetching
- **Framer Motion** - Animations
- **Vite** - Build tool

### **Backend**
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **BCrypt** - Password hashing

### **AI Features**
- **Groq API** - LLM integration (llama-3.1-8b-instant)
- **Deepgram API** - Text-to-speech
- **LangChain** - AI orchestration
- **Python/Flask** - AI chatbot backend

### **Key AI Features**
- **Intelligent Corrections**: Identifies and explains errors
- **Context Awareness**: Maintains conversation context
- **Adaptive Teaching**: Adjusts difficulty based on user
- **Multi-language Support**: Specialized models for each language

### **Project Links**

Design (Figma): https://www.figma.com/design/9yX9CpjtUQVKh09wBiQUNI/Ui-designs?node-id=1-2&t=Fm5Q7kyp26lmZ6GI-1

LiveLink: https://edtech2-lingoquest-mvp.netlify.app, https://lingoquest-pf28.onrender.com

Demo / Pitch Deck: https://youtu.be/0hsqIC9BR5A

<div align="center">
