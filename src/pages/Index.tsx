import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Filter, Heart, Users, Calendar, Plus } from 'lucide-react';
import { mockLocations, categoryLabels } from '@/data/mockData';
import Navigation from '@/components/Navigation';
import Map from '@/components/Map';
import FilterPanel from '@/components/FilterPanel';
import heroImage from '@/assets/hero-image.jpg';
import { Link } from 'react-router-dom';

const Index = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showLgbtqOnly, setShowLgbtqOnly] = useState(false);
  const [showSafeOnly, setShowSafeOnly] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  const filteredLocations = mockLocations.filter(location => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(location.category);
    const lgbtqMatch = !showLgbtqOnly || location.lgbtqOwned;
    const safetyMatch = !showSafeOnly || location.safetyRating === 'safe';
    return categoryMatch && lgbtqMatch && safetyMatch;
  });

  const stats = {
    total: mockLocations.length,
    lgbtqOwned: mockLocations.filter(l => l.lgbtqOwned).length,
    safe: mockLocations.filter(l => l.safetyRating === 'safe').length,
    categories: Object.keys(categoryLabels).length
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Arco-íris Mapa Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Arco-Íris Mapa
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              Descubra espaços seguros e acolhedores para a comunidade LGBTQIA+
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                <MapPin className="mr-2 h-5 w-5" />
                Explorar Mapa
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 border-white text-white hover:bg-white/20">
                <Link to="/eventos">
                  <Calendar className="mr-2 h-5 w-5" />
                  Ver Eventos
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-card/95 backdrop-blur-sm border-b border-border py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{stats.total}</div>
              <div className="text-sm text-muted-foreground">Locais Mapeados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{stats.lgbtqOwned}</div>
              <div className="text-sm text-muted-foreground">LGBTQIA+ Owned</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">{stats.safe}</div>
              <div className="text-sm text-muted-foreground">Espaços Seguros</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">{stats.categories}</div>
              <div className="text-sm text-muted-foreground">Categorias</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-80 space-y-6">
            <FilterPanel
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              showLgbtqOnly={showLgbtqOnly}
              onLgbtqOnlyChange={setShowLgbtqOnly}
              showSafeOnly={showSafeOnly}
              onSafeOnlyChange={setShowSafeOnly}
            />

            {/* Results Summary */}
            <Card className="bg-card/95 backdrop-blur-sm shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="mr-2 h-5 w-5 text-primary" />
                  Resultados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {filteredLocations.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {filteredLocations.length === 1 ? 'local encontrado' : 'locais encontrados'}
                  </div>
                </div>
                
                {filteredLocations.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <div className="text-xs text-muted-foreground">Por categoria:</div>
                    {Object.entries(
                      filteredLocations.reduce((acc: { [key: string]: number }, location) => {
                        acc[location.category] = (acc[location.category] || 0) + 1;
                        return acc;
                      }, {})
                    ).map(([category, count]) => (
                      <div key={category} className="flex justify-between items-center text-sm">
                        <span>{categoryLabels[category as keyof typeof categoryLabels]}</span>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Contribua</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full" size="sm">
                  <Link to="/sugerir">
                    <Plus className="mr-2 h-4 w-4" />
                    Sugerir Local
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full" size="sm">
                  <Link to="/eventos">
                    <Calendar className="mr-2 h-4 w-4" />
                    Ver Eventos
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="flex-1">
            <Card className="overflow-hidden shadow-lg">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5 text-primary" />
                    Mapa de Locais Seguros
                  </span>
                  <Badge variant="secondary">
                    {filteredLocations.length} {filteredLocations.length === 1 ? 'local' : 'locais'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-96 lg:h-[600px]">
                  <Map 
                    locations={filteredLocations}
                    selectedCategories={selectedCategories}
                    onLocationSelect={setSelectedLocation}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Community Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary">
            Construindo Juntes uma Comunidade Mais Segura
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Cada local mapeado e cada avaliação compartilhada fortalece nossa rede de apoio e segurança.
          </p>
          
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold mb-2">Acolhimento</h3>
                <p className="text-sm text-muted-foreground">
                  Espaços onde você pode ser autêntico e se sentir em casa.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Segurança</h3>
                <p className="text-sm text-muted-foreground">
                  Locais verificados e avaliados pela própria comunidade.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold mb-2">Comunidade</h3>
                <p className="text-sm text-muted-foreground">
                  Conexões reais entre pessoas que compartilham valores.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
