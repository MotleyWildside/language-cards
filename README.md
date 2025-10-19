# Language Learning Flashcards

An interactive flashcard application for learning languages with swipe gestures and progress tracking. Upload custom vocabulary sets and study effectively with an intuitive card-based interface.

## Features

- 📁 **JSON Import**: Upload custom language card sets via JSON files
- 🎴 **Interactive Cards**: Swipe-based flashcard interface with flip animations
- ✅ **Progress Tracking**: Mark cards as learned/not learned with visual status indicators
- 💾 **Persistent Storage**: Automatic localStorage persistence for your card collections
- 🎯 **Sample Data**: Includes English-Russian vocabulary cards for quick testing
- 🎨 **Modern UI**: Clean, responsive Material-UI design
- 🔀 **Shuffle Mode**: Randomize card order for better learning

## Setup

### Install dependencies
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend && npm install && cd ..

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### Run both services
```bash
npm run dev
```

This will start both the backend (http://localhost:3001) and frontend (http://localhost:3000) concurrently.

### Or run individually

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```

## Usage

1. Start the application and you'll see the upload screen
2. Upload a JSON file with your language cards (see `sample-cards.json` for format)
3. Study your cards by clicking to flip and swiping to navigate
4. Mark cards as learned (✓) or not learned (✗) to track your progress
5. Your progress is automatically saved to localStorage

## Card Format

Cards should be in JSON format with the following structure:

```json
[
  {
    "id": "1",
    "term": "Hello",
    "translation": "Привет",
    "lang_primary": "en",
    "lang_secondary": "ru",
    "category": ["greetings", "basics"],
    "difficulty": "A1",
    "status": "neutral",
    "created_at": "2025-10-19T00:00:00.000Z"
  }
]
```

## Tech Stack

**Frontend:**
- React with TypeScript
- Material-UI components
- SCSS modules for styling
- LocalStorage API for persistence

**Backend:**
- Node.js
- Express with TypeScript
- RESTful API architecture

**Development:**
- Monorepo structure
- Concurrent development scripts
- TypeScript throughout

