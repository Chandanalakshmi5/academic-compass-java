
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentProvider } from "./context/StudentContext";

import Index from "./pages/Index";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Grades from "./pages/Grades";
import NotFound from "./pages/NotFound";

import "chart.js/auto";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <StudentProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/students" element={<Students />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StudentProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
