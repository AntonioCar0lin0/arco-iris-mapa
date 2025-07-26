import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, User, Tag, Heart } from 'lucide-react';
import { mockEvents, eventCategoryLabels } from '@/data/mockData';
import Navigation from '@/components/Navigation';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredEvents = selectedCategory === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.category === selectedCategory);

  const upcomingEvents = filteredEvents.filter(event => new Date(event.date) >= new Date());
  const pastEvents = filteredEvents.filter(event => new Date(event.date) < new Date());

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const EventCard = ({ event }: { event: typeof mockEvents[0] }) => (
    <Card className="overflow-hidden hover:shadow-glow transition-all duration-300 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg leading-tight">
              {event.title}
              {event.lgbtqFriendly && (
                <span className="ml-2 text-love-pink">🏳️‍🌈</span>
              )}
            </CardTitle>
            <Badge variant="secondary" className="w-fit">
              {eventCategoryLabels[event.category]}
            </Badge>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            {event.price === 0 ? (
              <Badge variant="outline" className="bg-safe-green/10 text-safe-green border-safe-green/30">
                Gratuito
              </Badge>
            ) : (
              <span className="font-medium">R$ {event.price}</span>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {event.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="mr-2 h-4 w-4 text-primary" />
            <span>{formatDate(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4 text-primary" />
            <span>{event.startTime} - {event.endTime}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4 text-primary" />
            <div>
              <div className="font-medium">{event.location}</div>
              <div className="text-xs">{event.address}</div>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="mr-2 h-4 w-4 text-primary" />
            <span>Organizado por {event.organizer}</span>
          </div>
        </div>

        {event.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-2">
            {event.tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Tag className="mr-1 h-3 w-3" />
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button className="flex-1" size="sm">
            <Heart className="mr-1 h-4 w-4" />
            Interessado
          </Button>
          <Button variant="outline" size="sm">
            <MapPin className="mr-1 h-4 w-4" />
            Ver no Mapa
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-rainbow-gradient bg-clip-text text-transparent animate-rainbow-shift bg-[length:200%_200%]">
            Eventos LGBTQIA+
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra eventos inclusivos, celebrações da diversidade e encontros da comunidade.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-6 animate-fade-in">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="transition-all duration-200"
            >
              Todos os Eventos
            </Button>
            {Object.entries(eventCategoryLabels).map(([key, label]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className="transition-all duration-200"
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Tabs */}
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>Próximos ({upcomingEvents.length})</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <Clock size={16} />
              <span>Anteriores ({pastEvents.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            {upcomingEvents.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhum evento próximo</h3>
                  <p className="text-muted-foreground">
                    Não há eventos {selectedCategory !== 'all' ? `de ${eventCategoryLabels[selectedCategory as keyof typeof eventCategoryLabels].toLowerCase()}` : ''} programados no momento.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past">
            {pastEvents.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pastEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Nenhum evento anterior</h3>
                  <p className="text-muted-foreground">
                    Não há eventos anteriores {selectedCategory !== 'all' ? `de ${eventCategoryLabels[selectedCategory as keyof typeof eventCategoryLabels].toLowerCase()}` : ''} para exibir.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Events;