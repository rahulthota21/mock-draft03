'use client';

import { Box } from '@mui/material';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import HeroDivider from '@/components/landing/HeroDivider';
import HowItWorksSection from '@/components/landing/HowItWorksSection';
import WhyUsSection from '@/components/landing/WhyUsSection';
import CallToAction from '@/components/landing/CallToAction';
import Footer from '@/components/landing/Footer';

export default function LandingPage() {
  return (
    <Box sx={{ overflowX: 'hidden' }}>
      <NavBar />
      <HeroSection />
      <FeaturesSection />
      <HeroDivider />
      <HowItWorksSection />
      <WhyUsSection />
      <CallToAction />
      <Footer />
    </Box>
  );
}
