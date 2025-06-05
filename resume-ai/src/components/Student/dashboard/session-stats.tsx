import { DashboardCard } from "@/components/Student/dashboard/dashboard-card";
import { Check, Clock, Target } from "lucide-react";

export function SessionStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <DashboardCard title="Total Sessions">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-primary/10 rounded-full">
            <Check className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-3xl font-bold">12</p>
            <p className="text-sm text-muted-foreground">Completed Interviews</p>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Average Stress Level">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-chart-1/10 rounded-full">
            <Target className="h-6 w-6 text-chart-1" />
          </div>
          <div>
            <p className="text-3xl font-bold">56%</p>
            <p className="text-sm text-muted-foreground">Across all interviews</p>
          </div>
        </div>
      </DashboardCard>
      
      <DashboardCard title="Last Session">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-chart-2/10 rounded-full">
            <Clock className="h-6 w-6 text-chart-2" />
          </div>
          <div>
            <p className="text-3xl font-bold">2d</p>
            <p className="text-sm text-muted-foreground">Frontend Developer</p>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}