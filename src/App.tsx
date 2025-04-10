import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

import Layout from "@/components/Layout";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Energy from "@/pages/Energy";
import Security from "@/pages/Security";
import Material from "@/pages/Material";
import Users from "@/pages/Users";
import NotFound from "@/pages/NotFound";
import PrivateRoute from "@/components/PrivateRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                  element={
                    <PrivateRoute>
                      <Layout />
                    </PrivateRoute>
                  }
                >
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/energy" element={<Energy />} />
                  <Route path="/security" element={<Security />} />
                  <Route path="/material" element={<Material />} />
                  <Route path="/users" element={<Users />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
