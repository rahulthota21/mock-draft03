import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: string;
  questionNumber: number;
  totalQuestions: number;
  questionType: string;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  questionType,
}: QuestionCardProps) {
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
  
  const getTypeName = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
        <CardTitle className="text-base">Interview Question</CardTitle>
        <Badge variant="outline" className={cn(getBadgeColor(questionType))}>
          {getTypeName(questionType)}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1 flex items-center p-6">
        <motion.div 
          key={questionNumber}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="text-sm font-medium text-muted-foreground">
            Question {questionNumber} of {totalQuestions}
          </div>
          <h2 className="text-2xl font-semibold">{question}</h2>
          
          <div className="p-4 bg-primary/5 rounded-lg border border-primary/10 mt-4">
            <h4 className="text-sm font-medium mb-1">Interviewer's Tip</h4>
            <p className="text-sm text-muted-foreground">
              Take a moment to structure your thoughts before answering. Remember to provide specific examples from your experience when possible.
            </p>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}