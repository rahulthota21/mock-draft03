"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FinalSummary } from "@/components/report/final-summary";
import { QuestionResponses } from "@/components/report/question-responses";
import { StressAnalysis } from "@/components/report/stress-analysis";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft,
  Download,
  Share2,
  Printer,
  BarChart3,
  MessageSquare,
  Activity
} from "lucide-react";

// Generate random mock data for the report
const generateMockReportData = (sessionId: string) => {
  // Questions with random stress levels and feedback
  const questions = [
    {
      id: "q1",
      question: "Tell me about yourself and your experience relevant to this role.",
      stressLevel: Math.floor(Math.random() * 40) + 30, // 30-70%
      feedback: "Good introduction, but try to be more specific about how your experience relates to the role. Focus on relevant achievements rather than a chronological history.",
      type: "introduction"
    },
    {
      id: "q2",
      question: "What interests you about this position and our company?",
      stressLevel: Math.floor(Math.random() * 30) + 20, // 20-50%
      feedback: "Strong answer showing genuine interest in the company. Consider researching more specific details about company culture and recent achievements to demonstrate deeper knowledge.",
      type: "motivation"
    },
    {
      id: "q3",
      question: "Describe a challenging project you've worked on and how you overcame obstacles.",
      stressLevel: Math.floor(Math.random() * 40) + 40, // 40-80%
      feedback: "You provided a clear example, but your stress level increased noticeably. Try using the STAR method more explicitly to structure your response. Quantify the results when possible.",
      type: "behavioral"
    },
    {
      id: "q4",
      question: "How do you handle working under pressure or with tight deadlines?",
      stressLevel: Math.floor(Math.random() * 30) + 50, // 50-80%
      feedback: "Your answer was authentic but showed heightened stress. Consider preparing specific examples of pressure situations in advance. Mention both your strategies and the successful outcomes.",
      type: "behavioral"
    },
    {
      id: "q5",
      question: "What would you consider your greatest professional achievement?",
      stressLevel: Math.floor(Math.random() * 25) + 25, // 25-50%
      feedback: "Good job highlighting your achievement, but make sure to emphasize your specific contributions rather than team efforts. Quantify the impact when possible.",
      type: "behavioral"
    },
    {
      id: "q6",
      question: "How do you stay updated with the latest technologies and trends in your field?",
      stressLevel: Math.floor(Math.random() * 20) + 40, // 40-60%
      feedback: "Solid answer mentioning various learning resources. To strengthen this response, give specific examples of how you've applied new knowledge in practical situations.",
      type: "technical"
    },
    {
      id: "q7",
      question: "Where do you see yourself professionally in five years?",
      stressLevel: Math.floor(Math.random() * 35) + 35, // 35-70%
      feedback: "Your answer showed ambition, which is good, but be careful about being too vague. Try to align your career goals with realistic progression within the company you're interviewing with.",
      type: "career"
    },
    {
      id: "q8",
      question: "Do you have any questions for me about the role or company?",
      stressLevel: Math.floor(Math.random() * 15) + 25, // 25-40%
      feedback: "Good questions that show interest in the role. For even stronger impact, ask questions that demonstrate your understanding of the company's challenges or goals.",
      type: "closing"
    }
  ];

  // Summary stats
  const averageStress = Math.round(
    questions.reduce((sum, q) => sum + q.stressLevel, 0) / questions.length
  );
  
  // Generate summary feedback based on average stress
  let overallPerformance, stressManagement, contentQuality;
  
  if (averageStress < 40) {
    overallPerformance = "Strong";
    stressManagement = "Excellent";
    contentQuality = "Good";
  } else if (averageStress < 60) {
    overallPerformance = "Good";
    stressManagement = "Good";
    contentQuality = "Good";
  } else {
    overallPerformance = "Average";
    stressManagement = "Needs Improvement";
    contentQuality = "Average";
  }

  return {
    sessionId,
    jobRole: "Frontend Developer",
    company: "Tech Innovations Inc.",
    date: new Date().toLocaleDateString(),
    questions,
    summary: {
      overallPerformance,
      stressManagement,
      contentQuality,
      averageStress,
      strengths: [
        "Clear communication style",
        "Good technical knowledge",
        "Thoughtful responses to behavioral questions"
      ],
      areasForImprovement: [
        "Manage stress during complex technical questions",
        "Provide more quantifiable achievements",
        "Improve specificity when discussing past experiences"
      ],
      keyTakeaways: "You demonstrated good technical knowledge and communication skills. Focus on reducing stress during challenging questions by preparing more structured responses using the STAR method. Practice quantifying your achievements to make your answers more impactful."
    }
  };
};

export default function ReportPage({ params }: { params: { sessionId: string } }) {
  const router = useRouter();
  const { sessionId } = params;
  const [reportData, setReportData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API fetch
    const fetchReportData = async () => {
      try {
        // In a real app, we would fetch from an API
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data = generateMockReportData(sessionId);
        setReportData(data);
      } catch (error) {
        console.error("Failed to fetch report data", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchReportData();
  }, [sessionId]);
  
  if (loading || !reportData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-10 w-10 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => router.push("/dashboard")}
              className="mb-2 -ml-3 text-muted-foreground"
            >
              <ChevronLeft size={16} className="mr-1" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold">Interview Report</h1>
            <p className="text-muted-foreground">
              {reportData.jobRole} • {reportData.date}
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Printer size={16} />
              <span className="hidden sm:inline">Print</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button size="sm" className="gap-2">
              <Download size={16} />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </div>
        
        {/* Report Content */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <motion.div 
              className="md:col-span-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Performance Summary</CardTitle>
                  <CardDescription>
                    Overall assessment of your interview performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-3xl font-bold mb-1">{reportData.summary.overallPerformance}</div>
                      <div className="text-sm text-muted-foreground">Overall Rating</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-3xl font-bold mb-1">{reportData.summary.stressManagement}</div>
                      <div className="text-sm text-muted-foreground">Stress Management</div>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 bg-primary/5 rounded-lg">
                      <div className="text-3xl font-bold mb-1">{reportData.summary.contentQuality}</div>
                      <div className="text-sm text-muted-foreground">Response Quality</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          <Tabs defaultValue="summary" className="space-y-4">
            <TabsList className="grid grid-cols-3 w-full sm:w-auto">
              <TabsTrigger value="summary" className="flex items-center gap-2">
                <MessageSquare size={16} />
                <span className="hidden sm:inline">Summary</span>
              </TabsTrigger>
              <TabsTrigger value="questions" className="flex items-center gap-2">
                <MessageSquare size={16} />
                <span className="hidden sm:inline">Questions</span>
              </TabsTrigger>
              <TabsTrigger value="stress" className="flex items-center gap-2">
                <Activity size={16} />
                <span className="hidden sm:inline">Stress Analysis</span>
              </TabsTrigger>
            </TabsList>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <TabsContent value="summary" className="mt-0">
                <FinalSummary data={reportData.summary} />
              </TabsContent>
              
              <TabsContent value="questions" className="mt-0">
                <QuestionResponses questions={reportData.questions} />
              </TabsContent>
              
              <TabsContent value="stress" className="mt-0">
                <StressAnalysis 
                  questions={reportData.questions}
                  averageStress={reportData.summary.averageStress}
                />
              </TabsContent>
            </motion.div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}