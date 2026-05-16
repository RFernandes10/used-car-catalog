import { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CarProvider } from "./contexts/CarContext";
import { initImageManifest } from "./lib/imageUtils";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Catalog from "./pages/Catalog";
import CarDetail from "./pages/CarDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Catalog} />
      <Route path="/sobre" component={About} />
      <Route path="/contato" component={Contact} />
      <Route path="/car/:id" component={CarDetail} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  useEffect(() => { initImageManifest(); }, []);

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CarProvider>
          <TooltipProvider>
            <Toaster />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </CarProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
