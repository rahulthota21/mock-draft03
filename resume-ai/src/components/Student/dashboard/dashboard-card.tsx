// resume-ai/src/components/Student/dashboard/dashboard-card.tsx

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/Student/ui/card";
import { cn } from "@/lib/utils";

interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  isLoading?: boolean;
}

export function DashboardCard({
  title,
  children,
  footer,
  isLoading = false,
  className,
  ...props
}: DashboardCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)} {...props}>
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="h-8 w-8 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
          </div>
        ) : (
          children
        )}
      </CardContent>
      {footer && <CardFooter className="p-6 pt-0">{footer}</CardFooter>}
    </Card>
  );
}
