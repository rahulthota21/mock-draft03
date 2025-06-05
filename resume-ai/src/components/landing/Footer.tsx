'use client';

import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  useTheme,
} from '@mui/material';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why ResumeAI', href: '#why-resumeai' },
  { label: 'Login', href: '/login' },
];

export default function FooterSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const bgColor = '#0a0a0a';
  const headingColor = '#ffffff';
  const textColor = '#bbbbbb';
  const borderColor = '#1e1e1e';
  const hoverColor = '#ffffff';

  return (
    <Box sx={{ backgroundColor: bgColor, pt: 10, pb: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          {/* Brand Block */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: headingColor, mb: 1 }}
            >
              ResumeAI
            </Typography>
            <Typography variant="body2" sx={{ color: textColor, maxWidth: 420 }}>
              Where AI meets hiring — empowering smarter resume screening and intelligent mock interviews for recruiters and students alike.
            </Typography>
          </Grid>

          {/* Navigation */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              sx={{ color: headingColor, mb: 2 }}
            >
              Quick Links
            </Typography>
            <Box
              component="nav"
              display="flex"
              flexWrap="wrap"
              gap={2}
              alignItems="flex-start"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  underline="none"
                  sx={{
                    color: textColor,
                    fontSize: '0.95rem',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: hoverColor,
                      textDecoration: 'underline',
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 5, borderColor }} />

        {/* Bottom Bar */}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          gap={2}
        >
          <Typography variant="body2" sx={{ color: textColor }}>
            © {new Date().getFullYear()} ResumeAI. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: textColor,
              opacity: 0.6,
              fontSize: '0.875rem',
            }}
          >
            Designed to feel premium.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
