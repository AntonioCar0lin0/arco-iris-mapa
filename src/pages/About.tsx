import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Users, MapPin, Calendar, Plus, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import { Link } from 'react-router-dom';

const About = () => {
  const features = [
    {
      icon: MapPin,
      title: 'Mapa Interativo',
      description: 'Explore locais seguros e acolhedores com nosso mapa detalhado, filtros personalizados e pins informativos.'
    },
    {
      icon: Shield,
      title: 'Espaços Seguros',
      description: 'Identifique facilmente estabelecimentos verificados como seguros e inclusivos para a comunidade LGBTQIA+.'
    },
    {
      icon: Calendar,
      title: 'Eventos Comunitários',
      description: 'Descubra eventos, celebrações e encontros organizados por e para nossa comunidade.'
    },
    {
      icon: Plus,
      title: 'Contribuição Colaborativa',
      description: 'Ajude a expandir nossa rede sugerindo novos locais e eventos para fortalecer a comunidade.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Amor e Acolhimento',
      description: 'Promovemos espaços onde cada pessoa pode ser autêntica e se sentir amada.'
    },
    {
      icon: Users,
      title: 'Comunidade',
      description: 'Fortalecemos os laços entre pessoas LGBTQIA+ através da conexão e colaboração.'
    },
    {
      icon: Shield,
      title: 'Segurança',
      description: 'Priorizamos a identificação e promoção de ambientes seguros e livres de discriminação.'
    },
    {
      icon: Sparkles,
      title: 'Diversidade',
      description: 'Celebramos e respeitamos todas as identidades e expressões dentro da nossa comunidade.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-rainbow-gradient bg-clip-text text-transparent animate-rainbow-shift bg-[length:200%_200%]">
            Sobre o Arco-Íris Mapa
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Uma plataforma inclusiva dedicada a conectar, proteger e fortalecer a comunidade LGBTQIA+ 
            através da identificação de espaços seguros e eventos acolhedores.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="mb-12 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 animate-fade-in">
          <CardContent className="pt-8 pb-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4 text-primary">Nossa Missão</h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                Criar uma rede colaborativa que promova a visibilidade de espaços seguros, 
                negócios LGBTQIA+ e eventos inclusivos, fortalecendo nossa comunidade através 
                da informação, conexão e apoio mútuo.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
            Como Funciona
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-glow transition-all duration-300 animate-fade-in">
                <CardHeader className="pb-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
            Nossos Valores
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-soft transition-all duration-300 animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <value.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span>{value.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How to Contribute */}
        <Card className="mb-12 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Como Você Pode Contribuir
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-safe-green/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-8 w-8 text-safe-green" />
                </div>
                <h3 className="font-semibold">Sugira Locais</h3>
                <p className="text-sm text-muted-foreground">
                  Conhece um lugar seguro e acolhedor? Compartilhe conosco!
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-love-pink/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-love-pink" />
                </div>
                <h3 className="font-semibold">Avalie Espaços</h3>
                <p className="text-sm text-muted-foreground">
                  Sua experiência ajuda outras pessoas a se sentirem seguras.
                </p>
              </div>
              
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-sky-blue/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-sky-blue" />
                </div>
                <h3 className="font-semibold">Divulgue</h3>
                <p className="text-sm text-muted-foreground">
                  Compartilhe a plataforma com amigos e comunidade.
                </p>
              </div>
            </div>
            
            <div className="flex justify-center pt-6">
              <Button asChild size="lg" className="hover:shadow-glow transition-all duration-200">
                <Link to="/sugerir">
                  <Plus className="mr-2 h-5 w-5" />
                  Contribuir Agora
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact & Community */}
        <Card className="bg-gradient-to-r from-pride-purple/5 to-love-pink/5 border-pride-purple/20 animate-fade-in">
          <CardContent className="pt-8 pb-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-bold">Junte-se à Nossa Comunidade</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Esta plataforma é construída com amor pela comunidade, para a comunidade. 
                Juntes, criamos espaços mais seguros e acolhedores para todes.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Button asChild variant="outline">
                  <Link to="/">
                    <MapPin className="mr-2 h-4 w-4" />
                    Explorar Mapa
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/eventos">
                    <Calendar className="mr-2 h-4 w-4" />
                    Ver Eventos
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;