import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, X, MapPin, Send, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { categoryLabels } from '@/data/mockData';
import Navigation from '@/components/Navigation';

const Suggest = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    address: '',
    description: '',
    phone: '',
    website: '',
    lgbtqOwned: false,
    safetyRating: 'safe' as 'safe' | 'neutral' | 'unsafe',
    tags: [] as string[],
    publicVisible: true
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange('tags', [...formData.tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    handleInputChange('tags', formData.tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.address) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: "Sugestão enviada com sucesso! 🎉",
      description: "Obrigado por contribuir com nossa comunidade. Sua sugestão será analisada em breve.",
    });

    setIsSubmitting(false);
    navigate('/');
  };

  const popularTags = [
    'pet-friendly', 'wifi', 'estacionamento', 'acessível', 'eventos',
    'karaoke', 'drag-show', 'musica-ao-vivo', 'comida-vegana', 'bebidas-especiais',
    'arte', 'workshops', 'terapia', 'grupo-apoio', 'consultoria'
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-4 bg-rainbow-gradient bg-clip-text text-transparent animate-rainbow-shift bg-[length:200%_200%]">
            Sugerir Local Seguro
          </h1>
          <p className="text-lg text-muted-foreground">
            Ajude a construir uma rede de espaços seguros e acolhedores para nossa comunidade.
          </p>
        </div>

        <Card className="shadow-soft animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5 text-primary" />
              <span>Informações do Local</span>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Local *</Label>
                  <Input
                    id="name"
                    placeholder="Ex: Café Acolhedor"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Categoria *</Label>
                  <Select 
                    value={formData.category} 
                    onValueChange={(value) => handleInputChange('category', value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(categoryLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço *</Label>
                <Input
                  id="address"
                  placeholder="Rua, número, bairro - cidade"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o local, ambiente, serviços oferecidos..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Contact Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    placeholder="(11) 9999-9999"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    placeholder="https://exemplo.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                  />
                </div>
              </div>

              {/* Characteristics */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lgbtq-owned"
                    checked={formData.lgbtqOwned}
                    onCheckedChange={(checked) => handleInputChange('lgbtqOwned', checked)}
                  />
                  <label htmlFor="lgbtq-owned" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    🏳️‍🌈 Negócio LGBTQIA+ Owned
                  </label>
                </div>

                <div className="space-y-2">
                  <Label>Nível de Segurança</Label>
                  <Select 
                    value={formData.safetyRating} 
                    onValueChange={(value) => handleInputChange('safetyRating', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="safe">🛡️ Espaço Seguro</SelectItem>
                      <SelectItem value="neutral">⚡ Neutro</SelectItem>
                      <SelectItem value="unsafe">⚠️ Requer Atenção</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="public-visible"
                    checked={formData.publicVisible}
                    onCheckedChange={(checked) => handleInputChange('publicVisible', checked)}
                  />
                  <label htmlFor="public-visible" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                    Tornar visível publicamente após aprovação
                  </label>
                </div>
              </div>

              {/* Tags */}
              <div className="space-y-4">
                <Label>Tags (características do local)</Label>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicionar tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <Button type="button" size="sm" onClick={addTag}>
                    <Plus size={16} />
                  </Button>
                </div>

                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="cursor-pointer hover:bg-muted">
                        {tag}
                        <X 
                          size={12} 
                          className="ml-1" 
                          onClick={() => removeTag(tag)}
                        />
                      </Badge>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Sugestões de tags:</Label>
                  <div className="flex flex-wrap gap-1">
                    {popularTags.filter(tag => !formData.tags.includes(tag)).slice(0, 8).map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                        onClick={() => handleInputChange('tags', [...formData.tags, tag])}
                      >
                        <Plus size={12} className="mr-1" />
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Voltar ao Mapa
                </Button>
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 hover:shadow-glow transition-all duration-200"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Sugestão
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-accent/50 border-accent animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex items-start space-x-3">
              <Sparkles className="h-5 w-5 text-primary mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium mb-1">Sua contribuição é valiosa!</p>
                <p>Todas as sugestões são revisadas por nossa equipe para garantir a qualidade e segurança das informações. Agradecemos por ajudar a construir uma comunidade mais inclusiva.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Suggest;