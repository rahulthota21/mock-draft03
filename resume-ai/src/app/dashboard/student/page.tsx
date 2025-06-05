"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { StressChart } from "@/components/Student/dashboard/stress-chart";
import { SessionStats } from "@/components/Student/dashboard/session-stats";
import { RecentSessions } from "@/components/Student/dashboard/recent-sessions";
import { StartInterviewModal } from "@/components/Student/dashboard/start-interview-modal";
import { DashboardCard } from "@/components/Student/dashboard/dashboard-card";
import { Button } from "@/components/ui/button";
import { OnboardingModal } from "@/components/Student/dashboard/onboarding-modal";

export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if user is new (would connect to real auth in production)
  useEffect(() => {
    // Simulate API loading
    setTimeout(() => {
      // Check if user has completed onboarding (localStorage is just for demo)
      const hasCompletedOnboarding = localStorage.getItem('onboardingCompleted');
      setShowOnboarding(!hasCompletedOnboarding);
      setIsLoading(false);
    }, 1000);
  }, []);
  
  // Hide any loading indicators when component unmounts
  useEffect(() => {
    return () => setIsLoading(false);
  }, []);
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <>
      {showOnboarding && <OnboardingModal onComplete={() => setShowOnboarding(false)} />}
      
      <div className="flex flex-col p-6 gap-6">
        {/* Header with welcome message and start interview button */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-2"
        >
          <div>
            <h1 className="text-3xl font-bold">Welcome back, John</h1>
            <p className="text-muted-foreground">Ready for your next interview practice?</p>
          </div>
          <StartInterviewModal />
        </motion.div>
        
        {/* Stats cards */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SessionStats />
        </motion.div>
        
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <StressChart />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <DashboardCard title="Practice Tips">
              <div className="space-y-4">
                <div className="rounded-lg bg-primary/5 p-3 border border-primary/10">
                  <h4 className="font-medium mb-1">Manage Your Stress</h4>
                  <p className="text-sm text-muted-foreground">
                    Try deep breathing exercises before your next interview to lower stress levels.
                  </p>
                </div>
                <div className="rounded-lg bg-primary/5 p-3 border border-primary/10">
                  <h4 className="font-medium mb-1">Improve Your Answers</h4>
                  <p className="text-sm text-muted-foreground">
                    Use the STAR method (Situation, Task, Action, Result) for behavioral questions.
                  </p>
                </div>
                <div className="text-center mt-2">
                  <Button variant="link" className="text-xs">View all tips</Button>
                </div>
              </div>
            </DashboardCard>
          </motion.div>
        </div>
        
        {/* Recent sessions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <RecentSessions />
        </motion.div>
      </div>
    </>
  );
}