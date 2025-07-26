import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center animate-fade-in">
        <h1 className="text-6xl font-bold mb-4 bg-rainbow-gradient bg-clip-text text-transparent animate-rainbow-shift bg-[length:200%_200%]">
          404
        </h1>
        <p className="text-xl text-muted-foreground mb-8">Ops! Página não encontrada</p>
        <p className="text-muted-foreground mb-8">
          A página que você está procurando não existe ou foi movida.
        </p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:shadow-glow transition-all duration-200"
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
