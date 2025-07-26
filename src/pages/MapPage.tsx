import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, MapPin, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import FilterPanel from "@/components/FilterPanel";
import Map from "@/components/Map";
import { mockLocations } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";

const MapPage = () => {
  const [locations, setLocations] = useState<any[]>(mockLocations);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showLgbtqOnly, setShowLgbtqOnly] = useState(false);
  const [showSafeOnly, setShowSafeOnly] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('locations')
        .select('*');
      
      if (error) {
        console.error('Error fetching locations:', error);
        return;
      }
      
      if (data && data.length > 0) {
        setLocations(data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredLocations = locations.filter((location: any) => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(location.category);
    const lgbtqiaMatch = !showLgbtqOnly || location.lgbtqOwned || location.lgbtqia_owned;
    const safetyMatch = !showSafeOnly || (location.safetyRating === 'safe') || (location.safety_rating && location.safety_rating >= 4);
    
    return categoryMatch && lgbtqiaMatch && safetyMatch;
  });

  const categories = ["Restaurantes", "Bares", "Hospedagem", "Saúde", "Educação", "Entretenimento", "Serviços"];
  const categoryStats = categories.reduce((acc, category) => {
    acc[category] = filteredLocations.filter(loc => loc.category === category).length;
    return acc;
  }, {} as Record<string, number>);

  const handleLocationSelect = (location: any) => {
    setSelectedLocation(location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <MapPin className="h-8 w-8 text-purple-600" />
          <h1 className="text-4xl font-bold text-gray-900">Mapa de Locais Seguros</h1>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar with filters and results */}
          <div className="lg:col-span-1 space-y-6">
            <FilterPanel
              selectedCategories={selectedCategories}
              onCategoryChange={setSelectedCategories}
              showLgbtqOnly={showLgbtqOnly}
              onLgbtqOnlyChange={setShowLgbtqOnly}
              showSafeOnly={showSafeOnly}
              onSafeOnlyChange={setShowSafeOnly}
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resultados da Busca</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold text-purple-600">
                  {filteredLocations.length} locais encontrados
                </div>
                
                <div className="space-y-2">
                  {Object.entries(categoryStats).map(([category, count]) => (
                    count > 0 && (
                      <div key={category} className="flex justify-between text-sm">
                        <span>{category}</span>
                        <span className="font-semibold">{count}</span>
                      </div>
                    )
                  ))}
                </div>

                <div className="space-y-2 pt-4">
                  <Link to="/sugerir">
                    <Button className="w-full" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Sugerir Local
                    </Button>
                  </Link>
                  
                  <Link to="/sugerir-evento">
                    <Button variant="outline" className="w-full" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Sugerir Evento
                    </Button>
                  </Link>
                  
                  <Link to="/eventos">
                    <Button variant="outline" className="w-full" size="sm">
                      <Users className="h-4 w-4 mr-2" />
                      Ver Eventos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="h-[600px]">
              <CardContent className="p-0 h-full">
                <Map
                  locations={filteredLocations}
                  selectedCategories={selectedCategories}
                  onLocationSelect={handleLocationSelect}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Location Details Modal */}
        {selectedLocation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle>{selectedLocation.name}</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedLocation(null)}
                  >
                    ×
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.tags?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">Avaliações</h4>
                  <div className="text-sm text-gray-600">
                    Avaliação de segurança: {selectedLocation.safety_rating}/5
                  </div>
                  <div className="text-sm text-gray-600 mt-2">
                    {selectedLocation.description}
                  </div>
                </div>

                {selectedLocation.lgbtqia_owned && (
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <div className="text-sm text-purple-800">
                      🏳️‍🌈 Estabelecimento LGBTQIA+ friendly
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;