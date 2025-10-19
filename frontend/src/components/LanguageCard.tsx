import React from 'react';
import { Box, Paper, Typography, Chip } from '@mui/material';
import { LanguageCard as LanguageCardType } from '../types';
import { commonStyles } from '../theme';

interface LanguageCardProps {
  card: LanguageCardType;
  showTranslation: boolean;
}

const LanguageCard: React.FC<LanguageCardProps> = ({ card, showTranslation }) => {
    const capitalize = (str: string) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
  return (
    <Paper
      elevation={3}
      sx={{
        ...commonStyles.card,
        backgroundColor: 'background.paper',
        position: 'relative',
        height: '60vh',
      }}
    >
      {/* Difficulty Badge */}
      <Chip
        label={card.difficulty}
        color="primary"
        size="small"
        sx={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          fontWeight: 600,
        }}
      />

      {/* Term */}
      <Typography
        variant="h4"
        component="div"
        sx={{
          textAlign: 'center',
          color: 'text.primary',
          marginBottom: '1rem',
          fontWeight: 600,
        }}
      >
        {capitalize(card.term)}
      </Typography>

      {/* Language indicator */}
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          marginBottom: '2rem',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          fontSize: '0.75rem',
        }}
      >
        {card.lang_primary}
      </Typography>

      {/* Translation (revealed when showTranslation is true) */}
      {showTranslation && (
        <Box
          sx={{
            marginTop: '2rem',
            paddingTop: '2rem',
            borderTop: '2px solid',
            borderColor: 'primary.main',
            width: '100%',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: 'primary.main',
              fontWeight: 500,
            }}
          >
            {capitalize(card.translation)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              marginTop: '0.5rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              fontSize: '0.75rem',
            }}
          >
            {card.lang_secondary}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default LanguageCard;

