"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileUploader } from "@/components/Student/shared/file-uploader";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/Student/ui/dialog";
import { Label } from "@/components/Student/ui/label";
import { Input } from "@/components/Student/ui/input";
import { Textarea } from "@/components/Student/ui/textarea";
import { Play, ArrowRight } from "lucide-react";

export function StartInterviewModal() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobRole: "",
    jobDescription: "",
    resumeFile: null as File | null,
  });

  const handleStartInterview = async () => {
    setLoading(true);
    
    try {
      // Simulate API call to create interview session
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate a random session ID for demo
      const sessionId = Math.random().toString(36).substring(2, 10);
      
      // Redirect to interview page
      router.push(`/dashboard/interview/${sessionId}`);
    } catch (error) {
      console.error("Failed to start interview", error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 rounded-full px-6">
          <Play className="h-4 w-4" />
          Start Interview
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Start New Interview</DialogTitle>
          <DialogDescription>
            Provide details to personalize your interview experience
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative overflow-hidden py-4">
          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="jobRole">Target Job Role</Label>
                  <Input
                    id="jobRole"
                    placeholder="e.g., Frontend Developer"
                    value={formData.jobRole}
                    onChange={(e) => setFormData({ ...formData, jobRole: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobDescription">Job Description (Optional)</Label>
                  <Textarea
                    id="jobDescription"
                    placeholder="Paste the job description here for more targeted questions"
                    className="min-h-[120px] resize-none"
                    value={formData.jobDescription}
                    onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>Upload Your Resume (Optional)</Label>
                  <FileUploader
                    accept="application/pdf"
                    maxSize={5}
                    onFileChange={(file) => setFormData({ ...formData, resumeFile: file })}
                  />
                  <p className="text-xs text-muted-foreground">
                    PDF only, max 5MB. Will help tailor questions to your experience.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          {step === 1 ? (
            <>
              <Button variant="outline\" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setStep(2)} className="gap-2">
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep(1)} disabled={loading}>
                Back
              </Button>
              <Button onClick={handleStartInterview} disabled={loading}>
                {loading ? (
                  <>
                    <div className="h-4 w-4 mr-2 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Preparing...
                  </>
                ) : (
                  "Start Interview"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}