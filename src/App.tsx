
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import RoomSelection from "./pages/RoomSelection";
import DesignGeneration from "./pages/DesignGeneration";
import DesignComparison from "./pages/DesignComparison";
import BOQGeneration from "./pages/BOQGeneration";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/room-selection" element={<RoomSelection />} />
          <Route path="/design-generation/:roomId" element={<DesignGeneration />} />
          <Route path="/design-comparison/:roomId" element={<DesignComparison />} />
          <Route path="/boq-generation/:roomId/:designId" element={<BOQGeneration />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
