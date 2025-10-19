import React, { useMemo, useState, useEffect } from 'react';
import { Box, Button, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { LanguageCard as LanguageCardType, DifficultyLevel } from '../types';
import LanguageCard from '../components/LanguageCard';
import { commonStyles } from '../theme';
import { shuffle } from '../utils/shuffle';

interface LanguageCardViewProps {
  cards: LanguageCardType[];
}

const LanguageCardsView: React.FC<LanguageCardViewProps> = ({ cards }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Extract unique categories from all cards
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    cards.forEach(card => {
      card.category.forEach(cat => categorySet.add(cat));
    });
    return Array.from(categorySet).sort();
  }, [cards]);

  // Filter and shuffle cards
  const filteredAndShuffledCards = useMemo(() => {
    let filtered = cards;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(card => card.category.includes(selectedCategory));
    }
    
    // Filter by difficulty
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(card => card.difficulty === selectedDifficulty);
    }
    
    return shuffle(filtered);
  }, [cards, selectedCategory, selectedDifficulty]);

  // Reset card index when filters change
  useEffect(() => {
    setCurrentCardIndex(0);
    setShowTranslation(false);
  }, [selectedCategory, selectedDifficulty]);

  const handleShowTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  const handleNext = () => {
    setShowTranslation(false);
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % filteredAndShuffledCards.length);
  };

  const handlePrevious = () => {
    setShowTranslation(false);
    setCurrentCardIndex((prevIndex) => (prevIndex - 1 + filteredAndShuffledCards.length) % filteredAndShuffledCards.length);
  };

  const EmptyState = () => {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'background.default',
        }}
      >
        <Typography variant="h5" color="text.secondary">
          No cards available
        </Typography>
      </Box>
    );
  };
  const isCardsEmpty = filteredAndShuffledCards && filteredAndShuffledCards.length === 0;

  const currentCard = filteredAndShuffledCards[currentCardIndex];

  const difficulties: DifficultyLevel[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];


  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
      }}
    >
        <Box sx={{ width: '100%', maxWidth: '400px' }}>
          {/* Filters */}
          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
            }}
          >
            <FormControl sx={{ minWidth: 150, flex: 1 }} size="small">
              <InputLabel id="category-filter-label">Category</InputLabel>
              <Select
                labelId="category-filter-label"
                id="category-filter"
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
                sx={{
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category.split('_').join(' ').charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150, flex: 1 }} size="small">
              <InputLabel id="difficulty-filter-label">Difficulty</InputLabel>
              <Select
                labelId="difficulty-filter-label"
                id="difficulty-filter"
                value={selectedDifficulty}
                label="Difficulty"
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                sx={{
                  borderRadius: '8px',
                }}
              >
                <MenuItem value="all">All Levels</MenuItem>
                {difficulties.map((difficulty) => (
                  <MenuItem key={difficulty} value={difficulty}>
                    {difficulty}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Card Component */}
          {isCardsEmpty ? (
            <EmptyState />  
          ) : (
            <LanguageCard card={currentCard} showTranslation={showTranslation} />
          )}

        {/* Action Buttons */}
        <Box sx={{...commonStyles.buttonContainer, opacity: isCardsEmpty ? 0 : 1, transition: 'opacity 0.3s ease',}}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handlePrevious}
            sx={commonStyles.button}
          >
            Previous Card
          </Button>
          <Button
            variant={showTranslation ? 'outlined' : 'contained'}
            color="primary"
            onClick={handleShowTranslation}
            sx={commonStyles.button}
          >
            {showTranslation ? 'Hide' : 'Show'} Translation
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleNext}
            sx={commonStyles.button}
          >
            Next Card
          </Button>
        </Box>
        {/* Card Counter */}
          <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            marginTop: '1rem',
            color: 'text.secondary',
            opacity: isCardsEmpty ? 0 : 1,
            transition: 'opacity 0.3s ease',
          }}
        >
          {currentCardIndex + 1} / {filteredAndShuffledCards.length}
        </Typography>
      </Box>
    </Box>
  );
};

export default LanguageCardsView;

