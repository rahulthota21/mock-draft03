"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { MessageSquare, CheckCircle, AlertTriangle } from "lucide-react";

interface Question {
  id: string;
  question: string;
  stressLevel: number;
  feedback: string;
  type: string;
}

interface QuestionResponsesProps {
  questions: Question[];
}

export function QuestionResponses({ questions }: QuestionResponsesProps) {
  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <QuestionResponseCard 
          key={question.id}
          question={question}
          questionNumber={index + 1}
        />
      ))}
    </div>
  );
}

interface QuestionResponseCardProps {
  question: Question;
  questionNumber: number;
}

function QuestionResponseCard({ question, questionNumber }: QuestionResponseCardProps) {
  const getStressLevelColor = (level: number) => {
    if (level < 40) return "text-emerald-500";
    if (level < 70) return "text-amber-500";
    return "text-red-500";
  };
  
  const getStressLevelText = (level: number) => {
    if (level < 40) return "Low";
    if (level < 70) return "Moderate";
    return "High";
  };
  
  const getStressLevelIcon = (level: number) => {
    if (level < 40) return <CheckCircle className="h-4 w-4 text-emerald-500" />;
    if (level < 70) return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    return <AlertTriangle className="h-4 w-4 text-red-500" />;
  };
  
  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'introduction':
        return 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20';
      case 'behavioral':
        return 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-purple-500/20';
      case 'technical':
        return 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20';
      case 'motivation':
        return 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20';
      case 'career':
        return 'bg-indigo-500/10 text-indigo-500 hover:bg-indigo-500/20 border-indigo-500/20';
      case 'closing':
        return 'bg-teal-500/10 text-teal-500 hover:bg-teal-500/20 border-teal-500/20';
      default:
        return '';
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <CardTitle className="text-base">Question {questionNumber}</CardTitle>
          </div>
          <Badge variant="outline" className={cn(getBadgeColor(question.type))}>
            {question.type.charAt(0).toUpperCase() + question.type.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">Question</div>
          <p className="text-lg font-medium">{question.question}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-card/60 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            {getStressLevelIcon(question.stressLevel)}
            <span className="text-sm font-medium">Stress Level:</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <div className="w-full h-2 rounded-full bg-card overflow-hidden">
              <div 
                className={`h-full rounded-full ${
                  question.stressLevel < 40 ? 'bg-emerald-500' : 
                  question.stressLevel < 70 ? 'bg-amber-500' : 
                  'bg-red-500'
                }`}
                style={{ width: `${question.stressLevel}%` }}
              ></div>
            </div>
            <span className={`text-sm font-medium ${getStressLevelColor(question.stressLevel)}`}>
              {question.stressLevel}% ({getStressLevelText(question.stressLevel)})
            </span>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="text-sm font-medium text-muted-foreground">AI Feedback</div>
          <p>{question.feedback}</p>
        </div>
      </CardContent>
    </Card>
  );
}