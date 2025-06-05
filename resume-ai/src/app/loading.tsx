// src/app/loading.tsx
'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { framerTransition } from '@/theme/ThemeProvider';

export default function GlobalLoading() {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.15 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1300,
        backdropFilter: 'blur(6px)',
        backgroundColor: 'rgba(13,13,13,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <Typography
        component={motion.span}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, transition: framerTransition }}
        variant="h2"
      >
        Mock’n-Hire
      </Typography>
    </Box>
  );
}
