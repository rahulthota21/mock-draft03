"use client";

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  TooltipProps,
  Legend
} from 'recharts';
import { cn } from "@/lib/utils";
import { AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";

interface Question {
  id: string;
  question: string;
  stressLevel: number;
  type: string;
}

interface StressAnalysisProps {
  questions: Question[];
  averageStress: number;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const question = payload[0].payload.question;
    const stress = payload[0].payload.stressLevel;
    
    return (
      <div className="bg-card border border-border p-3 rounded-lg shadow-md max-w-xs">
        <p className="font-medium">Question {label}</p>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{question}</p>
        <p className="text-sm mt-1">
          Stress Level: <span className={cn(
            "font-medium",
            stress < 40 ? "text-emerald-500" :
            stress < 70 ? "text-amber-500" :
            "text-red-500"
          )}>{stress}%</span>
        </p>
      </div>
    );
  }

  return null;
};

export function StressAnalysis({ questions, averageStress }: StressAnalysisProps) {
  // Transform data for the chart
  const chartData = questions.map((q, index) => ({
    name: (index + 1).toString(),
    stressLevel: q.stressLevel,
    question: q.question,
    type: q.type
  }));
  
  // Find highest and lowest stress questions
  const highestStressQ = [...questions].sort((a, b) => b.stressLevel - a.stressLevel)[0];
  const lowestStressQ = [...questions].sort((a, b) => a.stressLevel - b.stressLevel)[0];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Stress Level by Question</CardTitle>
          <CardDescription>
            See how your stress levels fluctuated throughout the interview
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 30,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  label={{ 
                    value: 'Question Number', 
                    position: 'insideBottom', 
                    offset: -20,
                    style: { fill: 'hsl(var(--muted-foreground))' }
                  }}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  label={{ 
                    value: 'Stress Level (%)', 
                    angle: -90, 
                    position: 'insideLeft',
                    style: { fill: 'hsl(var(--muted-foreground))' }
                  }}
                  domain={[0, 100]}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  dataKey="stressLevel" 
                  name="Stress Level"
                  fill="hsl(var(--chart-1))" 
                  radius={[4, 4, 0, 0]}
                />
                {/* Horizontal line for average stress */}
                <ReferenceLine 
                  y={averageStress} 
                  stroke="hsl(var(--primary))" 
                  strokeDasharray="3 3" 
                  label={{ 
                    value: `Avg: ${averageStress}%`, 
                    position: 'right',
                    style: { fill: 'hsl(var(--primary))' }
                  }} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              <CardTitle className="text-base">Highest Stress Point</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-red-500/10 rounded-lg">
              <h4 className="font-medium text-sm mb-1">Question {questions.indexOf(highestStressQ) + 1}</h4>
              <p className="text-sm mb-3">{highestStressQ.question}</p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium">Stress Level:</span> 
                <span className="text-red-500 font-medium">{highestStressQ.stressLevel}%</span>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              <h4 className="font-medium text-sm mb-1">Why this might be happening:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>This question type may require more preparation</li>
                <li>The topic might be outside your comfort zone</li>
                <li>Consider practicing similar questions more</li>
              </ul>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center space-x-2">
              <TrendingDown className="h-5 w-5 text-emerald-500" />
              <CardTitle className="text-base">Lowest Stress Point</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <h4 className="font-medium text-sm mb-1">Question {questions.indexOf(lowestStressQ) + 1}</h4>
              <p className="text-sm mb-3">{lowestStressQ.question}</p>
              <div className="flex items-center space-x-2 text-sm">
                <span className="font-medium">Stress Level:</span> 
                <span className="text-emerald-500 font-medium">{lowestStressQ.stressLevel}%</span>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">
              <h4 className="font-medium text-sm mb-1">What's working well:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>You appear comfortable with this type of question</li>
                <li>Your preparation in this area is evident</li>
                <li>Use similar preparation techniques for other question types</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <CardTitle className="text-base">Stress Pattern Insights</CardTitle>
              <CardDescription>
                Patterns observed in your stress response across different question types
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 rounded-lg border border-border">
              <h4 className="font-medium mb-1">Behavioral Questions</h4>
              <p className="text-sm text-muted-foreground">
                Your stress levels tend to increase during behavioral questions. Consider preparing more STAR method responses for common scenarios. Practice with a friend to build confidence.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <h4 className="font-medium mb-1">Technical Questions</h4>
              <p className="text-sm text-muted-foreground">
                Your technical responses show moderate stress. Continue building practical examples of your skills that you can easily recall during interviews.
              </p>
            </div>
            <div className="p-3 rounded-lg border border-border">
              <h4 className="font-medium mb-1">Opening & Closing</h4>
              <p className="text-sm text-muted-foreground">
                You handle introduction and closing questions well with lower stress levels. Maintain this confidence by having a well-prepared elevator pitch and thoughtful questions for the interviewer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ReferenceLine({ y, stroke, strokeDasharray, label }: any) {
  return (
    <line
      y1={y}
      y2={y}
      x1={0}
      x2="100%"
      stroke={stroke}
      strokeDasharray={strokeDasharray}
      className="recharts-reference-line-line"
    >
      <text
        x="95%"
        y={y - 5}
        textAnchor="end"
        fill={stroke}
        fontSize={12}
      >
        {label.value}
      </text>
    </line>
  );
}