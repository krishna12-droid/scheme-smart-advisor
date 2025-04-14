
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./AppRoutes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProfileProvider } from "@/contexts/ProfileContext";

const queryClient = new QueryClient();

const App = () => (
  <Router>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ProfileProvider>
          <Toaster />
          <Sonner />
          <AppRoutes />
        </ProfileProvider>
      </AuthProvider>
    </QueryClientProvider>
  </Router>
);

export default App;
