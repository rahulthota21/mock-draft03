'use client';

import { Box, Button, Container, Typography, useTheme } from '@mui/material';

export default function PaperDividerSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const bgColor = isDark ? '#0e0e0e' : '#ffffff';
  const textColor = isDark ? '#fff' : '#111';
  const cutColor = isDark ? '#1a1a1a' : '#f2f2f2';

  return (
    <Box
      id="cta"
      sx={{ position: 'relative', backgroundColor: bgColor, zIndex: 1 }}
    >
      {/* Top Cut SVG */}
      <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '80px' }}
        >
          <path
            fill={cutColor}
            d="M0,96L80,106.7C160,117,320,139,480,144C640,149,800,139,960,112C1120,85,1280,43,1360,21.3L1440,0L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
          />
        </svg>
      </Box>

      {/* Main CTA Content */}
      <Container
        maxWidth="md"
        sx={{
          py: { xs: 8, md: 12 },
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: textColor, mb: 2 }}
        >
          Don’t have an account yet?
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            mb: 4,
            maxWidth: 580,
            mx: 'auto',
          }}
        >
          Get started with AI-based resume screening and mock interviews today.
        </Typography>

        <Button
          variant="contained"
          size="large"
          href="/login"
          sx={{
            px: 4,
            py: 1.4,
            fontWeight: 600,
            borderRadius: 2,
            backgroundColor: isDark ? '#2f2f2f' : '#111',
            color: '#fff',
            boxShadow: isDark
              ? '0 4px 14px rgba(0,0,0,0.4)'
              : '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: isDark ? '#444' : '#222',
              transform: 'translateY(-2px)',
              boxShadow: '0 6px 24px rgba(0,0,0,0.35)',
            },
          }}
        >
          Get Started Now
        </Button>
      </Container>

      {/* Bottom Cut SVG */}
      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0 }}>
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          style={{ display: 'block', width: '100%', height: '80px' }}
        >
          <path
            fill={cutColor}
            d="M0,64L80,74.7C160,85,320,107,480,112C640,117,800,107,960,80C1120,53,1280,11,1360,-10.7L1440,-32V160H1360C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160H0Z"
          />
        </svg>
      </Box>
    </Box>
  );
}
