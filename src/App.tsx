
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Portfolio from "./pages/Portfolio";
import TokenPurchase from "./pages/TokenPurchase";
import RoomSelection from "./pages/RoomSelection";
import DesignGeneration from "./pages/DesignGeneration";
import DesignComparison from "./pages/DesignComparison";
import BOQGeneration from "./pages/BOQGeneration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/tokens" element={<TokenPurchase />} />
            <Route path="/room-selection" element={<RoomSelection />} />
            <Route path="/design-generation/:roomId" element={<DesignGeneration />} />
            <Route path="/design-comparison/:roomId" element={<DesignComparison />} />
            <Route path="/boq-generation/:roomId/:designId" element={<BOQGeneration />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
