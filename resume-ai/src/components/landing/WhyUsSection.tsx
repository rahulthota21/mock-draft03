'use client';

import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import {
  Rocket,
  SlidersHorizontal,
  BrainCircuit,
} from 'lucide-react';

const features = [
  {
    icon: Rocket,
    title: 'Boost Decision Speed',
    description:
      'Shortlist with lightning-fast AI logic. From resumes to rankings in seconds.',
  },
  {
    icon: SlidersHorizontal,
    title: 'Smarter Filters',
    description:
      'Assign weights to CGPA, skills, must-haves. No more manual filtering.',
  },
  {
    icon: BrainCircuit,
    title: 'LLM-Powered Logic',
    description:
      'Uses real language models — not just keyword matching. More human, less robotic.',
  },
];

export default function WhyUsSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const bgColor = isDark ? '#0e0e0e' : '#fefefe';
  const glassBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.7)';
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  const textColor = isDark ? '#fff' : '#111';
  const descColor = isDark ? '#ccc' : '#444';

  return (
    <Box sx={{ py: { xs: 10, md: 12 }, backgroundColor: bgColor }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{ mb: 6, color: textColor }}
        >
          Why ResumeAI?
        </Typography>

        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          gap={4}
          justifyContent="center"
        >
          {features.map((feature, index) => (
            <Box
              key={feature.title}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              sx={{
                flex: 1,
                minWidth: 260,
                px: 4,
                py: 5,
                borderRadius: 4,
                backgroundColor: glassBg,
                backdropFilter: 'blur(18px)',
                border: `1px solid ${border}`,
                boxShadow: isDark
                  ? '0 8px 28px rgba(0,0,0,0.35)'
                  : '0 4px 16px rgba(0,0,0,0.1)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: 1.5,
                '&:hover': {
                  transform: 'translateY(-4px)',
                  transition: 'all 0.3s ease',
                  boxShadow: isDark
                    ? '0 12px 40px rgba(0,0,0,0.45)'
                    : '0 8px 28px rgba(0,0,0,0.15)',
                },
              }}
            >
              <feature.icon
                size={32}
                color={theme.palette.primary.main}
              />
              <Typography
                variant="subtitle1"
                fontWeight={600}
                sx={{ color: textColor }}
              >
                {feature.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: descColor }}
              >
                {feature.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
