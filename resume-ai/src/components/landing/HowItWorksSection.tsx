'use client';

import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Upload, Sliders, Bot } from 'lucide-react';

const steps = [
  {
    title: 'Upload Resume or JD',
    description:
      'Drag and drop your resume or job description. No templates, no limits — just clean AI parsing.',
    icon: Upload,
  },
  {
    title: 'Set Filters or Domain',
    description:
      'Recruiters can choose filters and weights. Students select domain, difficulty, and preferences.',
    icon: Sliders,
  },
  {
    title: 'AI Does the Magic',
    description:
      'Resumes are ranked or mock interviews begin. AI evaluates, scores, and guides instantly.',
    icon: Bot,
  },
];

export default function HowItWorksSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const bgColor = isDark ? '#0e0e0e' : '#fefefe';
  const cardBg = isDark ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.6)';
  const borderColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)';
  const headingColor = isDark ? '#fff' : '#111';
  const textColor = isDark ? '#bbb' : '#333';

  return (
    <Box sx={{ py: { xs: 8, md: 10 }, backgroundColor: bgColor }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          fontWeight={700}
          textAlign="center"
          sx={{
            mb: 6,
            color: headingColor,
          }}
        >
          How It Works
        </Typography>

        <Box display="flex" flexDirection="column" gap={4}>
          {steps.map((step, index) => (
            <Box
              key={index}
              component={motion.div}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              sx={{
                px: 4,
                py: 3.5,
                borderRadius: 3,
                backgroundColor: cardBg,
                border: `1px solid ${borderColor}`,
                boxShadow: isDark
                  ? '0 6px 20px rgba(0,0,0,0.45)'
                  : '0 4px 16px rgba(0,0,0,0.05)',
                backdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: 3,
              }}
            >
              <Box
                sx={{
                  mt: 0.5,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 2,
                  p: 1.2,
                }}
              >
                <step.icon size={24} color="#fff" />
              </Box>

              <Box>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{ color: headingColor, mb: 0.5 }}
                >
                  {step.title}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: textColor }}
                >
                  {step.description}
                </Typography>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
