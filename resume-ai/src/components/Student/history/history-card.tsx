import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Calendar, BarChart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Session {
  id: string;
  position: string;
  company: string;
  date: string;
  stressLevel: number;
  performance: string;
  questionCount: number;
}

interface HistoryCardProps {
  session: Session;
  onViewReport: () => void;
}

export function HistoryCard({ session, onViewReport }: HistoryCardProps) {
  function getPerformanceBadge(performance: string) {
    switch (performance) {
      case 'Excellent':
        return <Badge className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-emerald-500/20">Excellent</Badge>;
      case 'Good':
        return <Badge className="bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-blue-500/20">Good</Badge>;
      case 'Average':
        return <Badge className="bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 border-amber-500/20">Average</Badge>;
      case 'Needs Improvement':
        return <Badge className="bg-red-500/10 text-red-500 hover:bg-red-500/20 border-red-500/20">Needs Improvement</Badge>;
      default:
        return <Badge>{performance}</Badge>;
    }
  }

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-colors cursor-pointer" onClick={onViewReport}>
      <CardHeader className="p-4 pb-2 flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base line-clamp-1">{session.position}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-1">{session.company}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation();
              onViewReport();
            }}>
              View Report
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive" onClick={(e) => e.stopPropagation()}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex flex-col space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{session.date}</span>
          </div>
          
          <div className="flex items-center text-sm">
            <BarChart className="h-4 w-4 mr-2 text-muted-foreground" />
            <div className="flex items-center gap-2 flex-1">
              <span>Stress:</span>
              <div className="flex-1 h-1.5 rounded-full bg-card overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    session.stressLevel < 50 ? 'bg-emerald-500' : 
                    session.stressLevel < 70 ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${session.stressLevel}%` }}
                ></div>
              </div>
              <span>{session.stressLevel}%</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm">Performance:</span>
            {getPerformanceBadge(session.performance)}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">{session.questionCount} questions</span>
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
}