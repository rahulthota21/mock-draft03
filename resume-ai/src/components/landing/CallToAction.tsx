'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';

export default function CallToActionSection() {
  const theme = useTheme();
  const bgColor = '#0e0e0e';
  const cardBg = 'rgba(255,255,255,0.04)';
  const borderColor = 'rgba(255,255,255,0.1)';
  const textColor = '#fff';

  return (
    <Box
      sx={{
        py: 12,
        backgroundColor: bgColor,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Orbital Glow Background Layer */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '800px',
          height: '800px',
          background: 'radial-gradient(circle, #8883 0%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          animation: 'orbitalSpin 18s linear infinite',
          zIndex: 0,
        }}
      />

      {/* CTA Card */}
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box
            sx={{
              px: { xs: 4, sm: 6 },
              py: { xs: 6, sm: 8 },
              borderRadius: 4,
              backgroundColor: cardBg,
              backdropFilter: 'blur(24px)',
              border: `1px solid ${borderColor}`,
              textAlign: 'center',
              boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
            }}
          >
            <Typography
              variant="h4"
              fontWeight={700}
              sx={{
                mb: 4,
                color: textColor,
                fontFamily: '"Playfair Display", serif',
              }}
            >
              Want to explore?
            </Typography>

            <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
              <Button
                variant="contained"
                href="/login"
                size="large"
                sx={{
                  px: 5,
                  py: 1.6,
                  borderRadius: 8,
                  fontWeight: 600,
                  backgroundColor: '#1a1a1a',
                  color: '#fff',
                  boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
                  '&:hover': {
                    backgroundColor: '#222',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 10px 28px rgba(0,0,0,0.5)',
                  },
                }}
              >
                Login
              </Button>

              <Button
                variant="outlined"
                href="/signup"
                size="large"
                sx={{
                  px: 5,
                  py: 1.6,
                  borderRadius: 8,
                  fontWeight: 600,
                  borderColor: '#666',
                  color: '#ccc',
                  '&:hover': {
                    borderColor: '#aaa',
                    color: '#fff',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Container>

      {/* Keyframes */}
      <style jsx global>{`
        @keyframes orbitalSpin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </Box>
  );
}
