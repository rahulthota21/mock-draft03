import { DashboardCard } from "@/components/Student/dashboard/dashboard-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

// Mock data
const recentSessions = [
  {
    id: '1',
    position: 'Frontend Developer',
    company: 'Tech Solutions Inc.',
    date: 'Mar 20, 2025',
    stressLevel: 45,
    performance: 'Good',
  },
  {
    id: '2',
    position: 'UX Designer',
    company: 'Creative Digital',
    date: 'Mar 15, 2025',
    stressLevel: 62,
    performance: 'Average',
  },
  {
    id: '3',
    position: 'Product Manager',
    company: 'Innovate Co.',
    date: 'Mar 5, 2025',
    stressLevel: 73,
    performance: 'Needs Improvement',
  },
];

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

export function RecentSessions() {
  return (
    <DashboardCard title="Recent Interview Sessions">
      <div className="space-y-4">
        {recentSessions.map((session) => (
          <div 
            key={session.id}
            className="p-4 rounded-xl bg-card/40 border border-border hover:bg-card/60 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{session.position}</h4>
                <p className="text-sm text-muted-foreground">{session.company}</p>
              </div>
              <Link href={`/dashboard/sessions/${session.id}`}>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowUpRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{session.date}</span>
                {getPerformanceBadge(session.performance)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Stress:</span>
                <div className="w-16 h-2 rounded-full bg-card overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      session.stressLevel < 50 ? 'bg-emerald-500' : 
                      session.stressLevel < 70 ? 'bg-amber-500' : 
                      'bg-red-500'
                    }`}
                    style={{ width: `${session.stressLevel}%` }}
                  ></div>
                </div>
                <span className="text-sm">{session.stressLevel}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}