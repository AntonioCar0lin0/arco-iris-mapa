import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Filter, X } from 'lucide-react';
import { categoryLabels } from '@/data/mockData';

interface FilterPanelProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  showLgbtqOnly: boolean;
  onLgbtqOnlyChange: (value: boolean) => void;
  showSafeOnly: boolean;
  onSafeOnlyChange: (value: boolean) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  selectedCategories,
  onCategoryChange,
  showLgbtqOnly,
  onLgbtqOnlyChange,
  showSafeOnly,
  onSafeOnlyChange,
}) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const clearAllFilters = () => {
    onCategoryChange([]);
    onLgbtqOnlyChange(false);
    onSafeOnlyChange(false);
  };

  const activeFiltersCount = selectedCategories.length + 
    (showLgbtqOnly ? 1 : 0) + 
    (showSafeOnly ? 1 : 0);

  const categoryItems = Object.entries(categoryLabels);

  return (
    <Card className="w-full max-w-xs bg-card/95 backdrop-blur-sm shadow-soft border-border">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <CardTitle className="flex items-center justify-between text-lg">
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-primary" />
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <Badge variant="secondary" className="bg-primary text-primary-foreground">
                    {activeFiltersCount}
                  </Badge>
                )}
              </div>
              <ChevronDown 
                size={16} 
                className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </CardTitle>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Quick Actions */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Filtros Rápidos
              </h4>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lgbtq-only"
                  checked={showLgbtqOnly}
                  onCheckedChange={onLgbtqOnlyChange}
                />
                <label 
                  htmlFor="lgbtq-only" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  🏳️‍🌈 Apenas LGBTQIA+ Owned
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="safe-only"
                  checked={showSafeOnly}
                  onCheckedChange={onSafeOnlyChange}
                />
                <label 
                  htmlFor="safe-only" 
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  🛡️ Apenas Espaços Seguros
                </label>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                Categorias
              </h4>
              
              <div className="space-y-2">
                {categoryItems.map(([key, label]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={selectedCategories.includes(key)}
                      onCheckedChange={() => handleCategoryToggle(key)}
                    />
                    <label 
                      htmlFor={key} 
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      {label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            {activeFiltersCount > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="w-full"
              >
                <X size={16} className="mr-2" />
                Limpar Filtros
              </Button>
            )}

            {/* Selected Categories Display */}
            {selectedCategories.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-muted-foreground">
                  Categorias Ativas:
                </h4>
                <div className="flex flex-wrap gap-1">
                  {selectedCategories.map(category => (
                    <Badge 
                      key={category} 
                      variant="secondary"
                      className="text-xs cursor-pointer hover:bg-muted"
                      onClick={() => handleCategoryToggle(category)}
                    >
                      {categoryLabels[category as keyof typeof categoryLabels]}
                      <X size={12} className="ml-1" />
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};

export default FilterPanel;