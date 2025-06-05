"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, Activity } from "lucide-react";

interface StressLoaderProps {
  sessionId: string;
}

const generateRandomStressData = () => {
  // Generate random stress scores for each question (1-100)
  return Array.from({ length: 8 }, (_, i) => ({
    questionNum: i + 1,
    stressScore: Math.floor(Math.random() * 100)
  }));
};

export function StressLoader({ sessionId }: StressLoaderProps) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(1);
  const [stressData, setStressData] = useState<any[]>([]);
  
  useEffect(() => {
    // Stage 1: Uploading responses (0-33%)
    const timer1 = setTimeout(() => {
      setStage(2);
    }, 1000);
    
    // Stage 2: Analyzing stress (34-66%)
    const timer2 = setTimeout(() => {
      setStressData(generateRandomStressData());
      setStage(3);
    }, 2000);
    
    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearInterval(interval);
    };
  }, [sessionId]);

  const getCurrentStageText = () => {
    if (stage === 1) return "Uploading your responses...";
    if (stage === 2) return "Analyzing stress patterns...";
    return "Generating feedback report...";
  };
  
  return (
    <div className="h-full flex flex-col items-center justify-center max-w-lg mx-auto text-center p-6">
      <div className="mb-8">
        <motion.div 
          className="flex justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: 360,
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                rotate: { repeat: Infinity, duration: 3, ease: "linear" },
                scale: { repeat: Infinity, duration: 2 }
              }}
            >
              {stage < 3 ? (
                <Activity size={48} className="text-primary" />
              ) : (
                <Sparkles size={48} className="text-primary" />
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      <motion.h2 
        className="text-2xl font-bold mb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        Preparing Your Interview Report
      </motion.h2>
      
      <motion.p
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {getCurrentStageText()}
      </motion.p>
      
      <motion.div 
        className="w-full h-2 bg-primary/10 rounded-full overflow-hidden mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          className="h-full bg-primary"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            className={`py-2 px-3 rounded-lg ${
              stage >= item ? "bg-primary/10 text-primary" : "bg-card text-muted-foreground"
            } flex items-center`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 + item * 0.1 }}
          >
            {stage > item ? (
              <CheckCircle className="h-4 w-4 mr-2" />
            ) : stage === item ? (
              <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
            ) : (
              <div className="h-4 w-4 rounded-full border border-muted mr-2" />
            )}
            {item === 1 && "Responses"}
            {item === 2 && "Stress Analysis"}
            {item === 3 && "Final Report"}
          </motion.div>
        ))}
      </div>
    </div>
  );
}