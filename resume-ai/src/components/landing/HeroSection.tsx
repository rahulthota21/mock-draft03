'use client';

import {
  Box,
  Button,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0e0e0e',
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection={{ xs: 'column-reverse', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          gap={6}
        >
          {/* TEXT */}
          <Box
            flex={{ xs: 1, md: 0.95 }}
            component={motion.div}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            textAlign={{ xs: 'center', md: 'left' }}
          >
            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                fontSize: { xs: '2rem', sm: '2.6rem', md: '3rem' },
                lineHeight: 1.3,
                color: '#ffffff',
              }}
            >
              Your intelligent gateway to faster hiring and better interviews.
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 2,
                mb: 4,
                maxWidth: { xs: '100%', md: 520 },
                mx: { xs: 'auto', md: 'unset' },
                color: '#bbbbbb',
              }}
            >
              Empowering recruiters and students with AI-driven resume screening and mock interviews — beautifully simple, brutally smart.
            </Typography>

            <Box display="flex" justifyContent={{ xs: 'center', md: 'flex-start' }}>
              <Link href="/login" prefetch>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 4,
                    py: 1.6,
                    fontWeight: 600,
                    borderRadius: 2,
                    backgroundColor: '#1a1a1a',
                    color: '#fff',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: '#222',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 10px 28px rgba(0,0,0,0.4)',
                    },
                  }}
                >
                  Get Started
                </Button>
              </Link>
            </Box>
          </Box>

          {/* IMAGE */}
          <Box
            flex={{ xs: 1, md: 1.1 }}
            component={motion.div}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              maxWidth: 800,
              mx: 'auto',
            }}
          >
            <img
              src="/images/main.png"
              alt="Hero Visual"
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                filter: 'drop-shadow(0 12px 48px rgba(0,0,0,0.4))',
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
