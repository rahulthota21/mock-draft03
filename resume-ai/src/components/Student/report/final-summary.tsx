"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CheckCircle, 
  AlertCircle, 
  Info, 
  ArrowRight,
  ThumbsUp, 
  Lightbulb,
  AlertTriangle
} from "lucide-react";

interface SummaryData {
  overallPerformance: string;
  stressManagement: string;
  contentQuality: string;
  averageStress: number;
  strengths: string[];
  areasForImprovement: string[];
  keyTakeaways: string;
}

interface FinalSummaryProps {
  data: SummaryData;
}

export function FinalSummary({ data }: FinalSummaryProps) {
  const [showFullTakeaways, setShowFullTakeaways] = useState(false);
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Strengths</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.strengths.map((strength, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <ThumbsUp size={18} className="text-emerald-500" />
                </div>
                <p>{strength}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Areas for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {data.areasForImprovement.map((area, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-0.5">
                  <AlertTriangle size={18} className="text-amber-500" />
                </div>
                <p>{area}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Key Takeaways & Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="mt-1">
              <Lightbulb size={20} className="text-primary" />
            </div>
            <div>
              <p className="whitespace-pre-line">{data.keyTakeaways}</p>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          <div className="space-y-3">
            <h4 className="font-medium">Personalized Recommendations</h4>
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
              <h5 className="font-medium mb-1">Practice STAR Method Responses</h5>
              <p className="text-sm text-muted-foreground">
                Prepare structured answers for common behavioral questions using the Situation, Task, Action, Result framework.
              </p>
              <Button variant="link" className="text-xs px-0 h-auto mt-1">
                Learn more <ArrowRight size={12} className="ml-1" />
              </Button>
            </div>
            
            <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
              <h5 className="font-medium mb-1">Stress Reduction Techniques</h5>
              <p className="text-sm text-muted-foreground">
                Try deep breathing exercises and power posing before interviews to reduce physical stress signals.
              </p>
              <Button variant="link" className="text-xs px-0 h-auto mt-1">
                Learn more <ArrowRight size={12} className="ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}