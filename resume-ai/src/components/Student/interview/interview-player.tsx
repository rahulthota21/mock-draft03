"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { AlertCircle, Loader2, Play, Send, StopCircle } from "lucide-react";

interface InterviewPlayerProps {
  isRecording: boolean;
  isSubmitting: boolean;
  questionDuration: number;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSubmit: () => void;
}

export function InterviewPlayer({
  isRecording,
  isSubmitting,
  questionDuration,
  onStartRecording,
  onStopRecording,
  onSubmit
}: InterviewPlayerProps) {
  const [timeLeft, setTimeLeft] = useState(questionDuration);
  const [hasRecorded, setHasRecorded] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle camera setup and permissions
  useEffect(() => {
    const setupCamera = async () => {
      try {
        setCameraError(null);
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        streamRef.current = stream;
      } catch (error) {
        console.error("Camera access error:", error);
        setCameraError("Unable to access camera and microphone. Please check your permissions.");
      }
    };
    
    setupCamera();
    
    // Cleanup function
    return () => {
      if (streamRef.current) {
        const tracks = streamRef.current.getTracks();
        tracks.forEach(track => track.stop());
      }
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Handle timer
  useEffect(() => {
    if (isRecording && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            onStopRecording();
            setHasRecorded(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isRecording && timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, timeLeft, onStopRecording]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };
  
  const handleStartRecording = () => {
    setTimeLeft(questionDuration);
    onStartRecording();
  };
  
  const handleStopRecording = () => {
    onStopRecording();
    setHasRecorded(true);
  };
  
  const handleSubmit = () => {
    onSubmit();
    setHasRecorded(false);
    setTimeLeft(questionDuration);
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isRecording ? (
              <>
                <span className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></span>
                <span className="font-medium text-sm">Recording</span>
              </>
            ) : (
              <span className="text-sm font-medium">Your Response</span>
            )}
          </div>
          <div className="text-sm font-mono">
            {isRecording && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-primary/10 text-primary px-2 py-1 rounded-md"
              >
                {formatTime(timeLeft)}
              </motion.span>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-0 flex-1 relative">
        {cameraError ? (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 p-6">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-6 w-6 text-destructive" />
            </div>
            <div>
              <p className="font-medium text-lg">Camera Access Required</p>
              <p className="text-sm text-muted-foreground mt-1">
                {cameraError}
              </p>
              <Button 
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </div>
        ) : (
          <div className="relative h-full rounded-lg overflow-hidden bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="h-full w-full object-cover"
            />
            
            {/* Recording indicator */}
            {isRecording && (
              <div className="absolute top-4 right-4">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="h-3 w-3 rounded-full bg-red-500 ring-2 ring-red-500/20"
                />
              </div>
            )}
            
            {/* Overlay when not recording */}
            {!isRecording && !hasRecorded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm">
                <Button 
                  size="lg" 
                  onClick={handleStartRecording}
                  className="rounded-full"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Recording
                </Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Max duration: {formatTime(questionDuration)}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 border-t">
        <div className="w-full flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {isRecording ? "Recording in progress..." : 
             hasRecorded ? "Ready to submit" : 
             "Click to start recording"}
          </div>
          
          <div className="flex gap-2">
            {isRecording ? (
              <Button
                variant="destructive"
                onClick={handleStopRecording}
                className="gap-2"
              >
                <StopCircle className="h-4 w-4" />
                Stop
              </Button>
            ) : hasRecorded ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Answer
                  </>
                )}
              </Button>
            ) : null}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}