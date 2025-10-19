import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box } from '@mui/material';
import Header from './components/Header';
import LanguageCardsView from './views/LanguageCardsView';
import UploadView from './views/UploadView';
import { LanguageCard } from './types';
import { theme } from './theme';

const STORAGE_KEY = 'language_cards';

function App() {
  const [cards, setCards] = useState<LanguageCard[]>([]);

  // Load cards from localStorage on mount
  useEffect(() => {
    const storedCards = localStorage.getItem(STORAGE_KEY);
    if (storedCards) {
      try {
        const parsed = JSON.parse(storedCards);
        setCards(parsed);
      } catch (err) {
        console.error('Error loading cards from localStorage:', err);
      }
    }
  }, []);

  // Save cards to localStorage whenever they change
  const handleCardsLoaded = (loadedCards: LanguageCard[]) => {
    setCards(loadedCards);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(loadedCards));
  };

  // Clear cards and return to upload view
  const handleClearCards = () => {
    setCards([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'background.default',
          overflow: 'hidden',
        }}
      >
        {/* Header - only show when cards are loaded */}
        {cards.length > 0 && <Header onUploadClick={handleClearCards} />}

        {/* Main Content */}
        {cards.length > 0 ? (
          <LanguageCardsView cards={cards} />
        ) : (
          <UploadView onCardsLoaded={handleCardsLoaded} />
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;

