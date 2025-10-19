import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

interface HeaderProps {
  onUploadClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onUploadClick }) => {
  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
          }}
        >
          Language Cards
        </Typography>
        <Button
          variant="outlined"
          color="primary"
          onClick={onUploadClick}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '8px',
          }}
        >
          Upload +
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;

