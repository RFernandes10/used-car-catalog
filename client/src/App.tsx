import { lazy, Suspense, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CarProvider } from "./contexts/CarContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { ComparisonProvider } from "./contexts/ComparisonContext";
import { initImageManifest } from "./lib/imageUtils";
import { WhatsAppFloat } from "./components/WhatsAppFloat";
import { ScrollToTop } from "./components/ScrollToTop";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SpinnerGap } from "@phosphor-icons/react";

const Home = lazy(() => import("./pages/Home"));
const Catalog = lazy(() => import("./pages/Catalog"));
const CarDetail = lazy(() => import("./pages/CarDetail"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Favorites = lazy(() => import("./pages/Favorites"));
const Comparison = lazy(() => import("./pages/Comparison"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <div className="relative">
        <SpinnerGap className="w-10 h-10 text-primary animate-spin" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-xl animate-pulse-soft" />
      </div>
      <p className="text-sm text-muted-foreground animate-pulse-soft">Carregando...</p>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/catalogo" component={Catalog} />
      <Route path="/favoritos" component={Favorites} />
      <Route path="/comparar" component={Comparison} />
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
      <ThemeProvider defaultTheme="dark" switchable>
        <CarProvider>
          <WishlistProvider>
            <ComparisonProvider>
              <TooltipProvider>
                <Toaster />
                <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:shadow-lg">
                  Pular para o conteúdo
                </a>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main id="main-content" className="flex-1">
                    <Suspense fallback={<PageLoader />}>
                      <Router />
                    </Suspense>
                  </main>
                  <WhatsAppFloat />
                  <ScrollToTop />
                  <Footer />
                </div>
              </TooltipProvider>
            </ComparisonProvider>
          </WishlistProvider>
        </CarProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
