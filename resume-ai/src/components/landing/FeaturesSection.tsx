'use client';

import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Briefcase, Bot } from 'lucide-react';

const features = [
  {
    title: 'AI Resume Screening',
    description:
      'Upload resumes, apply weights (like CGPA, skills, exp), and let AI rank them instantly — faster, smarter, and stress-free.',
    icon: Briefcase,
  },
  {
    title: 'Mock Interview Intelligence',
    description:
      'AI generates role-based interview simulations with follow-up questions, real-time scoring, and instant feedback.',
    icon: Bot,
  },
];

export default function FeaturesSection() {
  const theme = useTheme();
  const backgroundColor = theme.palette.mode === 'dark' ? '#0e0e0e' : '#fefefe';

  return (
    <Box
      id="features"
      sx={{
        py: { xs: 8, md: 10 },
        backgroundColor,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{
            mb: 6,
            color: theme.palette.mode === 'dark' ? '#fff' : '#111',
          }}
        >
          Core Features
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
          gap={6}
        >
          {features.map((feature, index) => (
            <Box
              key={feature.title}
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              sx={{
                p: 4,
                borderRadius: '16px',
                backdropFilter: 'blur(12px)',
                background:
                  theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.03)'
                    : 'rgba(255, 255, 255, 0.6)',
                border:
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(255,255,255,0.08)'
                    : '1px solid rgba(0,0,0,0.05)',
                boxShadow:
                  theme.palette.mode === 'dark'
                    ? '0 8px 32px rgba(0,0,0,0.3)'
                    : '0 6px 24px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow:
                    theme.palette.mode === 'dark'
                      ? '0 10px 40px rgba(0,0,0,0.5)'
                      : '0 8px 32px rgba(0,0,0,0.08)',
                },
                color: theme.palette.mode === 'dark' ? '#fff' : '#111',
              }}
            >
              <Box mb={2}>
                <feature.icon size={42} color={theme.palette.primary.main} />
              </Box>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                {feature.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
