// resume-ai/src/components/Student/dashboard/onboarding-modal.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/Student/ui/dialog";
import { Button } from "@/components/Student/ui/button";
import { Input } from "@/components/Student/ui/input";
import { Label } from "@/components/Student/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Student/ui/select";
import { Checkbox } from "@/components/Student/ui/checkbox";

interface OnboardingModalProps {
  onComplete: () => void;
}

export function OnboardingModal({ onComplete }: OnboardingModalProps) {
  const [open, setOpen] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    goals: "",
    industry: "",
    experienceLevel: "",
    interests: [] as string[],
    referralSource: "",
  });

  // Options for checkboxes
  const interestOptions = [
    { id: "technical", label: "Technical Interviews" },
    { id: "behavioral", label: "Behavioral Interviews" },
    { id: "leadership", label: "Leadership Questions" },
    { id: "problem-solving", label: "Problem-Solving" },
    { id: "presentation", label: "Presentation Skills" },
  ];

  const handleComplete = () => {
    // In a real app, we'd save this to the user's profile
    localStorage.setItem("onboardingCompleted", "true");
    localStorage.setItem("onboardingData", JSON.stringify(formData));
    setOpen(false);
    onComplete();
  };

  const handleClose = () => {
    setOpen(false);
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Welcome to Mock'n-Hire</DialogTitle>
          <DialogDescription>
            Let's personalize your experience in a few quick steps
          </DialogDescription>
        </DialogHeader>

        <div className="relative overflow-hidden py-4">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label htmlFor="goals">What are your interview goals?</Label>
                  <Input
                    id="goals"
                    placeholder="e.g., Landing a tech job, improving confidence..."
                    value={formData.goals}
                    onChange={(e) =>
                      setFormData({ ...formData, goals: e.target.value })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Target Industry</Label>
                  <Select
                    value={formData.industry}
                    onValueChange={(value) =>
                      setFormData({ ...formData, industry: value })
                    }
                  >
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level</Label>
                  <Select
                    value={formData.experienceLevel}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        experienceLevel: value,
                      })
                    }
                  >
                    <SelectTrigger id="experienceLevel">
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (6+ years)</SelectItem>
                        <SelectItem value="executive">Executive Level</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Label>What interview aspects are you interested in?</Label>
                  <div className="grid grid-cols-1 gap-3 pt-1">
                    {interestOptions.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={option.id}
                          checked={formData.interests.includes(option.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setFormData({
                                ...formData,
                                interests: [...formData.interests, option.id],
                              });
                            } else {
                              setFormData({
                                ...formData,
                                interests: formData.interests.filter(
                                  (id) => id !== option.id
                                ),
                              });
                            }
                          }}
                        />
                        <label
                          htmlFor={option.id}
                          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="referralSource">How did you hear about us?</Label>
                  <Select
                    value={formData.referralSource}
                    onValueChange={(value) =>
                      setFormData({ ...formData, referralSource: value })
                    }
                  >
                    <SelectTrigger id="referralSource">
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="search">Search Engine</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                        <SelectItem value="friend">Friend/Colleague</SelectItem>
                        <SelectItem value="ad">Advertisement</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter className="flex sm:justify-between">
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Skip
              </Button>
              <Button onClick={() => setStep(2)}>Next</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button onClick={handleComplete}>Complete</Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
