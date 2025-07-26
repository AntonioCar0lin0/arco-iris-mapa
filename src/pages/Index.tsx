import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Shield, Users, MapPin, Calendar, Building, Star, Plus, CheckCircle, Globe, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-purple-600" />,
      title: "Mapeamento Colaborativo",
      description: "Descubra e compartilhe locais seguros e acolhedores para a comunidade LGBTQIA+."
    },
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Avaliações Confiáveis",
      description: "Sistema de avaliações feito pela própria comunidade, garantindo informações precisas."
    },
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Comunidade Unida",
      description: "Conecte-se com pessoas que compartilham dos mesmos valores de diversidade e inclusão."
    },
    {
      icon: <Calendar className="h-8 w-8 text-pink-600" />,
      title: "Eventos Inclusivos",
      description: "Encontre e organize eventos que celebrem a diversidade e promovam a inclusão."
    }
  ];

  const values = [
    {
      icon: <Heart className="h-6 w-6 text-pink-600" />,
      title: "Acolhimento",
      description: "Criamos espaços onde cada pessoa pode ser autêntica."
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Segurança",
      description: "Priorizamos a segurança física e emocional de nossa comunidade."
    },
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Comunidade",
      description: "Fortalecemos os laços entre pessoas diversas."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={heroImage} 
          alt="Arco-íris Mapa Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-pink-600/60" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Arco-Íris Mapa
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md">
              Descubra espaços seguros e acolhedores para a comunidade LGBTQIA+
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-white/90">
                <Link to="/mapa">
                  <MapPin className="mr-2 h-5 w-5" />
                  Explorar Mapa
                </Link>
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

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Nossa Missão</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Construir uma rede de espaços seguros e acolhedores onde a comunidade LGBTQIA+ 
            possa existir livremente, conectar-se e prosperar em um ambiente de respeito e diversidade.
          </p>
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Como Funciona
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Nossos Valores
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    {value.icon}
                  </div>
                  <h4 className="font-semibold text-lg mb-2">{value.title}</h4>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4 text-purple-600">
            Construindo Juntes uma Comunidade Mais Segura
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Cada local mapeado e cada avaliação compartilhada fortalece nossa rede de apoio e segurança.
          </p>
          
          <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold mb-2">Acolhimento</h3>
                <p className="text-sm text-gray-600">
                  Espaços onde você pode ser autêntico e se sentir em casa.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold mb-2">Segurança</h3>
                <p className="text-sm text-gray-600">
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
                <p className="text-sm text-gray-600">
                  Conexões reais entre pessoas que compartilham valores.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Faça Parte da Mudança
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Sua contribuição faz a diferença. Ajude-nos a mapear mais espaços seguros e a construir uma comunidade mais forte.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/mapa">
                <MapPin className="mr-2 h-5 w-5" />
                Explorar Mapa
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/sugerir">
                <Plus className="mr-2 h-5 w-5" />
                Sugerir Local
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
