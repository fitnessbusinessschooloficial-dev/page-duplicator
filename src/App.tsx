import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pagina1 from "./pages/Pagina1";
import Pagina2 from "./pages/Pagina2";
import Pagina3 from "./pages/Pagina3";
import Pagina4 from "./pages/Pagina4";
import Pagina5 from "./pages/Pagina5";
import Pagina6 from "./pages/Pagina6";
import Pagina7 from "./pages/Pagina7";
import Pagina8 from "./pages/Pagina8";
import Pagina9 from "./pages/Pagina9";
import Pagina10 from "./pages/Pagina10";
import Pagina11 from "./pages/Pagina11";
import Pagina12 from "./pages/Pagina12";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pagina1 />} />
          <Route path="/pagina2" element={<Pagina2 />} />
          <Route path="/pagina3" element={<Pagina3 />} />
          <Route path="/pagina4" element={<Pagina4 />} />
          <Route path="/pagina5" element={<Pagina5 />} />
          <Route path="/pagina6" element={<Pagina6 />} />
          <Route path="/pagina7" element={<Pagina7 />} />
          <Route path="/pagina8" element={<Pagina8 />} />
          <Route path="/pagina9" element={<Pagina9 />} />
          <Route path="/pagina10" element={<Pagina10 />} />
          <Route path="/pagina11" element={<Pagina11 />} />
          <Route path="/pagina12" element={<Pagina12 />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
