"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { InterviewPlayer } from "@/components/interview/interview-player";
import { QuestionCard } from "@/components/interview/question-card";
import { StressLoader } from "@/components/interview/stress-loader";
import { Pause } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Mock interview questions
const mockQuestions = [
  {
    id: "q1",
    question: "Tell me about yourself and your experience relevant to this role.",
    type: "introduction",
    duration: 120 // seconds
  },
  {
    id: "q2",
    question: "What interests you about this position and our company?",
    type: "motivation",
    duration: 120
  },
  {
    id: "q3",
    question: "Describe a challenging project you've worked on and how you overcame obstacles.",
    type: "behavioral",
    duration: 120
  },
  {
    id: "q4",
    question: "How do you handle working under pressure or with tight deadlines?",
    type: "behavioral",
    duration: 120
  },
  {
    id: "q5",
    question: "What would you consider your greatest professional achievement?",
    type: "behavioral",
    duration: 120
  },
  {
    id: "q6",
    question: "How do you stay updated with the latest technologies and trends in your field?",
    type: "technical",
    duration: 120
  },
  {
    id: "q7",
    question: "Where do you see yourself professionally in five years?",
    type: "career",
    duration: 120
  },
  {
    id: "q8",
    question: "Do you have any questions for me about the role or company?",
    type: "closing",
    duration: 120
  }
];

export default function InterviewPage({ params }: { params: { sessionId: string } }) {
  const router = useRouter();
  const { sessionId } = params;
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showQuitDialog, setShowQuitDialog] = useState(false);
  
  const currentQuestion = mockQuestions[currentQuestionIndex];
  const totalQuestions = mockQuestions.length;
  const progress = ((currentQuestionIndex) / totalQuestions) * 100;
  
  const handleStartRecording = () => {
    setIsRecording(true);
  };
  
  const handleStopRecording = () => {
    setIsRecording(false);
  };
  
  const handleSubmitAnswer = async () => {
    setIsSubmitting(true);
    
    // Simulate API call to submit the answer and analyze stress
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    
    // Move to the next question or finish
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsFinished(true);
      
      // Redirect to report page after a delay
      setTimeout(() => {
        router.push(`/dashboard/report/${sessionId}`);
      }, 3000);
    }
  };
  
  const handleQuit = () => {
    setShowQuitDialog(true);
  };
  
  const confirmQuit = () => {
    // Save session as "Quit" in history
    const sessionData = {
      id: sessionId,
      status: "Quit",
      date: new Date().toISOString(),
      questionsAnswered: currentQuestionIndex
    };
    
    // In a real app, we would save this to a database
    localStorage.setItem(`interview_${sessionId}`, JSON.stringify(sessionData));
    
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal Header */}
      <motion.div 
        className="border-b border-border"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-bold">Interview Session</h1>
              <div className="text-sm px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                {currentQuestionIndex + 1} of {totalQuestions}
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleQuit} className="gap-2">
              <Pause className="h-4 w-4" />
              Quit Interview
            </Button>
          </div>
          <Progress value={progress} className="h-1 mt-4" />
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 container mx-auto p-4 md:p-6 overflow-hidden">
        {isFinished ? (
          <StressLoader sessionId={sessionId} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <QuestionCard 
                question={currentQuestion.question}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={totalQuestions}
                questionType={currentQuestion.type}
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <InterviewPlayer
                isRecording={isRecording}
                isSubmitting={isSubmitting}
                questionDuration={currentQuestion.duration}
                onStartRecording={handleStartRecording}
                onStopRecording={handleStopRecording}
                onSubmit={handleSubmitAnswer}
              />
            </motion.div>
          </div>
        )}
      </div>
      
      {/* Quit Dialog */}
      <AlertDialog open={showQuitDialog} onOpenChange={setShowQuitDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to quit?</AlertDialogTitle>
            <AlertDialogDescription>
              Your interview progress will be saved as "Quit" in your history.
              You can always start a new interview from the dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Interview</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmQuit}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Quit Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}