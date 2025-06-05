'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie-player';
import animationData from './ai-loader.json';
import { Box, Typography, Button, Chip, Stack } from '@mui/material';
import { toast } from 'react-toastify';
import { supabase } from '@/lib/supabaseClient';
import { motion } from 'framer-motion';

const statusMessages = [
  'Uploading Resumes...',
  'Parsing Resumes...',
  'Extracting Skills...',
  'Ranking Candidates...',
  'Finalizing Results...',
];

export default function AnimationPage() {
  const router = useRouter();
  const params = useSearchParams();
  const jobId = params.get('job');
  const [token, setToken] = useState<string | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  // 1. Fetch Supabase session token
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setToken(data.session?.access_token ?? null);
    });
  }, []);

  // 2. Poll backend every 2s
  useEffect(() => {
    if (!jobId || !token) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`http://localhost:8000/status?job_id=${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Network response not OK');
        const json = await res.json();
        if (json.status === 'complete') {
          clearInterval(interval);
          router.push(`/dashboard/recruiter/results/${jobId}`);
        }
      } catch (err) {
        console.error('Polling error:', err);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [jobId, token, router]);

  // 3. Track elapsed time, status messages, and show coffee toast after 15s
  useEffect(() => {
    if (!jobId) return;
    const timer = setInterval(() => {
      setSecondsElapsed((sec) => sec + 2);
    }, 2000);

    if (secondsElapsed >= 15 && secondsElapsed % 30 === 0) {
      toast.info('Still processing... you can grab a coffee ☕');
    }

    const statusTimer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, 6000); // Change message every 6s

    return () => {
      clearInterval(timer);
      clearInterval(statusTimer);
    };
  }, [secondsElapsed, jobId]);

  // 4. Cancel button handler
  const handleCancel = () => {
    router.push('/dashboard/recruiter');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        backgroundColor: '#111111',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Soft Blur Background */}
      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          filter: 'blur(120px)',
          zIndex: 0,
        }}
      />

      {/* Lottie Animation */}
      <Box sx={{ zIndex: 1 }}>
        <Lottie loop animationData={animationData} play style={{ width: 200, height: 200 }} />
      </Box>

      {/* Dynamic Animated Status */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        key={statusIndex}
      >
        <Typography variant="h6" color="common.white" mt={3} sx={{ zIndex: 1, textAlign: 'center' }}>
          {statusMessages[statusIndex]}
        </Typography>
      </motion.div>

      {/* Elapsed Time + Estimated Time Chip */}
      <Stack direction="row" spacing={2} mt={2} sx={{ zIndex: 1 }}>
        <Chip
          label={`Elapsed: ${secondsElapsed}s`}
          sx={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            backdropFilter: 'blur(8px)',
          }}
        />
        <Chip
          label="Estimated: 5–10 min"
          sx={{
            backgroundColor: 'rgba(255,255,255,0.1)',
            color: 'white',
            backdropFilter: 'blur(8px)',
          }}
        />
      </Stack>

      {/* Cancel Button */}
      <Button
        variant="outlined"
        onClick={handleCancel}
        sx={{
          mt: 4,
          borderColor: 'grey.700',
          color: 'grey.300',
          backgroundColor: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(6px)',
          zIndex: 1,
        }}
      >
        Cancel and Go Back
      </Button>
    </Box>
  );
}
