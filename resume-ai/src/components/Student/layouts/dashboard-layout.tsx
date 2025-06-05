"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { 
  ChevronDown, 
  BarChart3, 
  Settings, 
  History, 
  LogOut, 
  Menu, 
  X,
  Sparkles,
  User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "History",
      href: "/dashboard/history",
      icon: <History size={20} />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings size={20} />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <div className="hidden md:flex w-64 flex-col bg-card border-r border-border">
        <div className="flex items-center gap-2 h-16 px-6 border-b border-border">
          <Sparkles size={24} className="text-primary" />
          <span className="font-bold text-xl">Mock&apos;n-Hire</span>
        </div>
        
        <div className="flex flex-col gap-1 p-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-muted-foreground rounded-lg hover:bg-primary/5 transition-colors",
                pathname === item.href && "bg-primary/10 text-primary font-medium"
              )}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 p-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="" />
              <AvatarFallback><User size={16} /></AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">John Doe</span>
              <span className="text-xs text-muted-foreground">john@example.com</span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <ChevronDown size={18} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/settings">Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  <LogOut size={16} className="mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Mobile Header */}
      <div className="flex flex-col flex-1">
        <header className="md:hidden flex items-center justify-between h-16 px-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-primary" />
            <span className="font-bold">Mock&apos;n-Hire</span>
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
              <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 h-16 px-6 border-b border-border">
                  <Sparkles size={24} className="text-primary" />
                  <span className="font-bold text-xl">Mock&apos;n-Hire</span>
                </div>
                
                <div className="flex flex-col gap-1 p-2 flex-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 text-muted-foreground rounded-lg hover:bg-primary/5 transition-colors",
                        pathname === item.href && "bg-primary/10 text-primary font-medium"
                      )}
                    >
                      {item.icon}
                      {item.name}
                    </Link>
                  ))}
                </div>
                
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-3 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback><User size={16} /></AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">John Doe</span>
                      <span className="text-xs text-muted-foreground">john@example.com</span>
                    </div>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <LogOut size={18} />
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 p-0 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}