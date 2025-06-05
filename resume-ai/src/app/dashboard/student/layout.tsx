// resume-ai/src/app/dashboard/student/layout.tsx
"use client";

import React from "react";
import DashboardLayout from "@/components/Student/layouts/dashboard-layout";
import { ThemeProvider as StudentThemeProvider } from "@/components/Student/theme-provider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <StudentThemeProvider>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    </StudentThemeProvider>
  );
}
