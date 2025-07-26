import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Location, categoryLabels } from '@/data/mockData';
import { MapPin, Heart, Shield, AlertTriangle } from 'lucide-react';

// Fix for default markers in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapProps {
  locations: Location[];
  selectedCategories: string[];
  onLocationSelect?: (location: Location) => void;
}

const Map: React.FC<MapProps> = ({ locations, selectedCategories, onLocationSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<L.LayerGroup>(new L.LayerGroup());

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current).setView([-23.5505, -46.6333], 12);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.current);

    // Add markers layer
    markersRef.current.addTo(map.current);

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.clearLayers();

    // Filter locations based on selected categories
    const filteredLocations = locations.filter(location => 
      selectedCategories.length === 0 || selectedCategories.includes(location.category)
    );

    // Add markers for filtered locations
    filteredLocations.forEach(location => {
      const icon = createCustomIcon(location.category, location.safetyRating, location.lgbtqOwned);
      
      const marker = L.marker([location.latitude, location.longitude], { icon })
        .bindPopup(createPopupContent(location))
        .on('click', () => {
          if (onLocationSelect) {
            onLocationSelect(location);
          }
        });

      markersRef.current.addLayer(marker);
    });
  }, [locations, selectedCategories, onLocationSelect]);

  const createCustomIcon = (category: string, safetyRating: string, lgbtqOwned: boolean) => {
    const color = getSafetyColor(safetyRating);
    const size = lgbtqOwned ? [30, 40] : [25, 35];
    
    return L.divIcon({
      html: `
        <div style="
          background-color: ${color};
          width: ${size[0]}px;
          height: ${size[1]}px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid ${lgbtqOwned ? '#a855f7' : '#ffffff'};
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
        ">
          <div style="
            transform: rotate(45deg);
            color: white;
            font-size: 12px;
            font-weight: bold;
          ">
            ${getCategoryIcon(category)}
          </div>
        </div>
      `,
      className: 'custom-marker',
      iconSize: [size[0], size[1]] as [number, number],
      iconAnchor: [size[0] / 2, size[1]] as [number, number],
      popupAnchor: [0, -size[1]] as [number, number]
    });
  };

  const getSafetyColor = (rating: string) => {
    switch (rating) {
      case 'safe': return '#22c55e';
      case 'unsafe': return '#ef4444';
      default: return '#f59e0b';
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: { [key: string]: string } = {
      bar: '🍻',
      cafe: '☕',
      salon: '💇',
      ong: '🤝',
      culture: '🎭',
      health: '🏥',
      business: '🏪'
    };
    return icons[category] || '📍';
  };

  const createPopupContent = (location: Location) => {
    const safetyIcon = location.safetyRating === 'safe' ? '🛡️' : 
                      location.safetyRating === 'unsafe' ? '⚠️' : '⚡';
    
    return `
      <div style="min-width: 200px; font-family: system-ui;">
        <h3 style="margin: 0 0 8px 0; color: #7c3aed; font-weight: bold;">
          ${location.name}
          ${location.lgbtqOwned ? ' 🏳️‍🌈' : ''}
        </h3>
        <p style="margin: 4px 0; font-size: 14px; color: #6b7280;">
          <strong>${categoryLabels[location.category]}</strong>
        </p>
        <p style="margin: 4px 0; font-size: 13px;">
          ${safetyIcon} ${location.safetyRating === 'safe' ? 'Espaço Seguro' : 
                         location.safetyRating === 'unsafe' ? 'Atenção' : 'Neutro'}
        </p>
        <p style="margin: 4px 0; font-size: 12px; color: #6b7280;">
          📍 ${location.address}
        </p>
        <p style="margin: 8px 0 4px 0; font-size: 13px;">
          ${location.description}
        </p>
        ${location.phone ? `<p style="margin: 4px 0; font-size: 12px;">📞 ${location.phone}</p>` : ''}
        ${location.website ? `<p style="margin: 4px 0; font-size: 12px;"><a href="${location.website}" target="_blank" style="color: #7c3aed;">🌐 Website</a></p>` : ''}
        <div style="margin-top: 8px;">
          ${location.tags.map(tag => `<span style="
            background: #e0e7ff; 
            color: #5b21b6; 
            padding: 2px 6px; 
            border-radius: 12px; 
            font-size: 11px; 
            margin-right: 4px;
          ">${tag}</span>`).join('')}
        </div>
      </div>
    `;
  };

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapContainer} 
        className="absolute inset-0 rounded-lg shadow-soft"
        style={{ minHeight: '400px' }}
      />
      <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-3 shadow-soft">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-safe-green rounded-full"></div>
            <span>Seguro</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-warning-amber rounded-full"></div>
            <span>Neutro</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-destructive rounded-full"></div>
            <span>Atenção</span>
          </div>
        </div>
        <div className="mt-2 flex items-center space-x-1 text-sm text-muted-foreground">
          <div className="w-3 h-3 border-2 border-pride-purple rounded-full"></div>
          <span>LGBTQIA+ Owned</span>
        </div>
      </div>
    </div>
  );
};

export default Map;