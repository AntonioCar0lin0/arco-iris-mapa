import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, MapPin, Calendar, Plus, Info } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Mapa', icon: MapPin },
    { path: '/eventos', label: 'Eventos', icon: Calendar },
    { path: '/sugerir', label: 'Sugerir Local', icon: Plus },
    { path: '/sobre', label: 'Sobre', icon: Info },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 rounded-full bg-rainbow-gradient animate-rainbow-shift bg-[length:200%_200%]" />
            <span className="text-xl font-bold bg-rainbow-gradient bg-clip-text text-transparent animate-rainbow-shift bg-[length:200%_200%]">
              Arco-Íris Mapa
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                asChild
                variant={isActive(path) ? "default" : "ghost"}
                className={`
                  transition-all duration-200 hover:shadow-glow
                  ${isActive(path) ? 'bg-primary text-primary-foreground shadow-glow' : ''}
                `}
              >
                <Link to={path} className="flex items-center space-x-2">
                  <Icon size={18} />
                  <span>{label}</span>
                </Link>
              </Button>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="transition-all duration-200"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-sm border-t border-border animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Button
                  key={path}
                  asChild
                  variant={isActive(path) ? "default" : "ghost"}
                  className={`
                    w-full justify-start transition-all duration-200
                    ${isActive(path) ? 'bg-primary text-primary-foreground' : ''}
                  `}
                  onClick={() => setIsOpen(false)}
                >
                  <Link to={path} className="flex items-center space-x-2">
                    <Icon size={18} />
                    <span>{label}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;