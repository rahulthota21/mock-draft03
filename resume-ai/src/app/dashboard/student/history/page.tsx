"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  HistoryCard 
} from "@/components/history/history-card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowUpDown, 
  Filter, 
  MoreHorizontal, 
  Plus, 
  Search,
  Grid3X3,
  List
} from "lucide-react";

// Mock data
const mockSessions = [
  {
    id: "1",
    position: "Frontend Developer",
    company: "Tech Solutions Inc.",
    date: "Mar 20, 2025",
    stressLevel: 45,
    performance: "Good",
    questionCount: 8
  },
  {
    id: "2",
    position: "UX Designer",
    company: "Creative Digital",
    date: "Mar 15, 2025",
    stressLevel: 62,
    performance: "Average",
    questionCount: 8
  },
  {
    id: "3",
    position: "Product Manager",
    company: "Innovate Co.",
    date: "Mar 5, 2025",
    stressLevel: 73,
    performance: "Needs Improvement",
    questionCount: 10
  },
  {
    id: "4",
    position: "Frontend Developer",
    company: "WebTech Solutions",
    date: "Feb 28, 2025",
    stressLevel: 39,
    performance: "Excellent",
    questionCount: 8
  },
  {
    id: "5",
    position: "React Developer",
    company: "AppWorks Inc.",
    date: "Feb 15, 2025",
    stressLevel: 55,
    performance: "Good",
    questionCount: 12
  },
  {
    id: "6",
    position: "Full Stack Developer",
    company: "Digital Creations",
    date: "Feb 5, 2025",
    stressLevel: 48,
    performance: "Good",
    questionCount: 10
  },
  {
    id: "7",
    position: "UI Developer",
    company: "DesignHub",
    date: "Jan 25, 2025",
    stressLevel: 67,
    performance: "Average",
    questionCount: 8
  },
  {
    id: "8",
    position: "JavaScript Developer",
    company: "CodeMasters",
    date: "Jan 10, 2025",
    stressLevel: 42,
    performance: "Good",
    questionCount: 9
  }
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

export default function HistoryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [sortBy, setSortBy] = useState<"date" | "position" | "stress">("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [filterPerformance, setFilterPerformance] = useState<string>("all");
  
  // Filter and sort sessions
  const filteredSessions = mockSessions
    .filter((session) => {
      // Search filter
      const matchesSearch = 
        session.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        session.company.toLowerCase().includes(searchQuery.toLowerCase());
        
      // Performance filter
      const matchesPerformance = 
        filterPerformance === "all" || 
        session.performance.toLowerCase() === filterPerformance.toLowerCase();
        
      return matchesSearch && matchesPerformance;
    })
    .sort((a, b) => {
      // Sort logic
      if (sortBy === "date") {
        return sortOrder === "asc" 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "position") {
        return sortOrder === "asc"
          ? a.position.localeCompare(b.position)
          : b.position.localeCompare(a.position);
      } else {
        return sortOrder === "asc"
          ? a.stressLevel - b.stressLevel
          : b.stressLevel - a.stressLevel;
      }
    });

  return (
    <div className="p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold">Interview History</h1>
          <p className="text-muted-foreground">
            View and analyze all your previous interview sessions
          </p>
        </div>
        
        <Button onClick={() => router.push("/dashboard")}>
          <Plus className="h-4 w-4 mr-2" />
          New Interview
        </Button>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by position or company..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setFilterPerformance("all")}>
                All Performance Levels
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPerformance("excellent")}>
                Excellent Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPerformance("good")}>
                Good Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPerformance("average")}>
                Average Only
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterPerformance("needs improvement")}>
                Needs Improvement Only
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <span className="hidden sm:inline">Sort</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("desc"); }}>
                Newest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSortBy("date"); setSortOrder("asc"); }}>
                Oldest First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSortBy("position"); setSortOrder("asc"); }}>
                Position (A-Z)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSortBy("stress"); setSortOrder("desc"); }}>
                Highest Stress First
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => { setSortBy("stress"); setSortOrder("asc"); }}>
                Lowest Stress First
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="flex border rounded-md overflow-hidden">
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="rounded-none border-0"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="rounded-none border-0"
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
      
      {filteredSessions.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {viewMode === "list" ? (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Stress Level</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSessions.map((session) => (
                      <TableRow 
                        key={session.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => router.push(`/dashboard/report/${session.id}`)}
                      >
                        <TableCell className="font-medium">
                          {session.position}
                        </TableCell>
                        <TableCell>{session.company}</TableCell>
                        <TableCell>{session.date}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
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
                        </TableCell>
                        <TableCell>
                          {getPerformanceBadge(session.performance)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" onClick={(e) => e.stopPropagation()}>
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/dashboard/report/${session.id}`);
                              }}>
                                View Report
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-destructive" onClick={(e) => e.stopPropagation()}>
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSessions.map((session) => (
                <HistoryCard 
                  key={session.id}
                  session={session}
                  onViewReport={() => router.push(`/dashboard/report/${session.id}`)}
                />
              ))}
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center justify-center py-12 text-center"
        >
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-primary/70" />
          </div>
          <h3 className="text-xl font-medium mb-2">No sessions found</h3>
          <p className="text-muted-foreground max-w-md">
            We couldn't find any interview sessions matching your search criteria. Try adjusting your filters or start a new interview.
          </p>
          <Button className="mt-6" onClick={() => router.push("/dashboard")}>
            <Plus className="h-4 w-4 mr-2" />
            Start New Interview
          </Button>
        </motion.div>
      )}
    </div>
  );
}