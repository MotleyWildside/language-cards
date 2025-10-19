import React, { useRef, useState } from 'react';
import { Box, Button, Typography, Paper, Alert } from '@mui/material';
import { LanguageCard } from '../types';

interface UploadViewProps {
  onCardsLoaded: (cards: LanguageCard[]) => void;
}

const UploadView: React.FC<UploadViewProps> = ({ onCardsLoaded }) => {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateCards = (data: any): data is LanguageCard[] => {
    if (!Array.isArray(data)) {
      setError('JSON must contain an array of cards');
      return false;
    }

    if (data.length === 0) {
      setError('The file contains no cards');
      return false;
    }

    // Validate each card has required fields
    for (let i = 0; i < data.length; i++) {
      const card = data[i];
      if (!card.id || !card.term || !card.translation) {
        setError(`Card at index ${i} is missing required fields (id, term, translation)`);
        return false;
      }
    }

    return true;
  };

  const handleFileRead = (file: File) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);

        if (validateCards(parsed)) {
          setError(null);
          onCardsLoaded(parsed);
        }
      } catch (err) {
        setError('Invalid JSON file. Please check the file format.');
      }
    };

    reader.onerror = () => {
      setError('Error reading file. Please try again.');
    };

    reader.readAsText(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        handleFileRead(file);
      } else {
        setError('Please upload a JSON file');
      }
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0];
    if (file) {
      if (file.type === 'application/json' || file.name.endsWith('.json')) {
        handleFileRead(file);
      } else {
        setError('Please upload a JSON file');
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: 'background.default',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '500px' }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: 'center',
            marginBottom: '2rem',
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          Upload Language Cards
        </Typography>

        <Paper
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          sx={{
            padding: '3rem 2rem',
            textAlign: 'center',
            border: '2px dashed',
            borderColor: isDragging ? 'primary.main' : 'divider',
            backgroundColor: isDragging ? 'action.hover' : 'background.paper',
            borderRadius: '16px',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          onClick={handleButtonClick}
        >
          <Box
            sx={{
              fontSize: '4rem',
              color: isDragging ? 'primary.main' : 'text.secondary',
              marginBottom: '1rem',
              fontWeight: 'bold',
            }}
          >
            📁
          </Box>

          <Typography variant="h6" sx={{ marginBottom: '1rem', color: 'text.primary' }}>
            {isDragging ? 'Drop your file here' : 'Drag & drop your JSON file'}
          </Typography>

          <Typography variant="body2" sx={{ marginBottom: '2rem', color: 'text.secondary' }}>
            or
          </Typography>

          <Button
            variant="contained"
            color="primary"
            sx={{
              padding: '12px 32px',
              fontSize: '1rem',
              fontWeight: 600,
              textTransform: 'none',
              borderRadius: '12px',
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleButtonClick();
            }}
          >
            Browse Files
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </Paper>

        {error && (
          <Alert severity="error" sx={{ marginTop: '1.5rem', borderRadius: '12px' }}>
            {error}
          </Alert>
        )}

        <Box sx={{ marginTop: '2rem', padding: '1rem' }}>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: '0.5rem' }}>
            Expected JSON structure:
          </Typography>
          <Paper
            sx={{
              padding: '1rem',
              backgroundColor: 'grey.100',
              borderRadius: '8px',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              overflow: 'auto',
            }}
          >
            <pre style={{ margin: 0 }}>
              {`[
  {
    "id": "1",
    "term": "Hello",
    "translation": "Привет",
    "lang_primary": "en",
    "lang_secondary": "ru",
    "category": ["greetings"],
    "difficulty": "A1",
    "status": "neutral",
    "created_at": "2025-01-01T00:00:00.000Z"
  }
]`}
            </pre>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default UploadView;

