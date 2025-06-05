'use client';

import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const router = useRouter();
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 8 });

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: trigger ? 'rgba(20,20,20,0.8)' : 'transparent',
        backdropFilter: trigger ? 'blur(10px)' : 'none',
        borderBottom: trigger ? '1px solid rgba(255,255,255,0.05)' : 'none',
        boxShadow: 'none',
        zIndex: 1200,
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            py: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Link href="/" passHref>
            <Typography
              variant="h5"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                letterSpacing: '-0.5px',
                color: '#fff',
                fontSize: '1.8rem',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                '&:hover': {
                  opacity: 0.9,
                },
              }}
            >
              Mock’n-Hire
            </Typography>
          </Link>

          {/* Auth Buttons */}
          <Box display="flex" gap={2}>
            <Button
              variant="text"
              onClick={() => router.push('/login')}
              sx={{
                fontWeight: 500,
                fontSize: '0.95rem',
                color: '#fff',
                textTransform: 'none',
                px: 3,
                py: 1.2,
                borderRadius: 2,
                backgroundColor: 'rgba(255,255,255,0.05)',
                boxShadow: '0 0 0 transparent',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  boxShadow: '0 2px 8px rgba(255,255,255,0.15)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={() => router.push('/signup')}
              sx={{
                fontWeight: 600,
                fontSize: '0.95rem',
                color: '#fff',
                borderColor: 'rgba(255,255,255,0.2)',
                px: 3,
                py: 1.2,
                borderRadius: 2,
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(255,255,255,0.4)',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  boxShadow: '0 2px 12px rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
