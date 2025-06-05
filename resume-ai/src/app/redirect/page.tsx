'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, CircularProgress, Typography, Fade } from '@mui/material';

export default function RedirectPage() {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get('role');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (role === 'recruiter') {
        router.push('/dashboard/recruiter');
      } else {
        router.push('/dashboard/student');
      }
    }, 2000); // 2 seconds

    return () => clearTimeout(timer);
  }, [role, router]);

  return (
    <Fade in timeout={800}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
        px={2}
        sx={{
          backgroundColor: '#111111',
          fontFamily: 'Inter, sans-serif',
          color: 'white',
        }}
      >
        <CircularProgress size={70} thickness={4} sx={{ color: 'white', mb: 4 }} />
        <Typography variant="h4" fontWeight={600} mb={1}>
          Logging you in...
        </Typography>
        <Typography variant="body1" fontWeight={400} color="#ccc">
          Preparing your dashboard
        </Typography>
      </Box>
    </Fade>
  );
}
