export interface Location {
  id: string;
  name: string;
  category: 'bar' | 'cafe' | 'salon' | 'ong' | 'culture' | 'health' | 'business';
  address: string;
  latitude: number;
  longitude: number;
  lgbtqOwned: boolean;
  safetyRating: 'safe' | 'neutral' | 'unsafe';
  description: string;
  phone?: string;
  website?: string;
  tags: string[];
  verified: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  address: string;
  category: 'social' | 'cultural' | 'political' | 'educational' | 'party';
  price: number;
  organizer: string;
  lgbtqFriendly: boolean;
  tags: string[];
  image?: string;
}

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Café Orgulho',
    category: 'cafe',
    address: 'Rua da Diversidade, 123 - Centro',
    latitude: -23.5505,
    longitude: -46.6333,
    lgbtqOwned: true,
    safetyRating: 'safe',
    description: 'Café acolhedor com ambiente inclusivo e eventos culturais mensais.',
    phone: '(11) 1234-5678',
    website: 'https://cafeorgulho.com.br',
    tags: ['pet-friendly', 'wifi', 'eventos'],
    verified: true
  },
  {
    id: '2',
    name: 'Bar Resistência',
    category: 'bar',
    address: 'Av. Paulista, 1000 - Bela Vista',
    latitude: -23.5629,
    longitude: -46.6544,
    lgbtqOwned: true,
    safetyRating: 'safe',
    description: 'Bar com karaokê e drag shows toda sexta-feira.',
    phone: '(11) 9876-5432',
    tags: ['karaoke', 'drag-show', 'musica-ao-vivo'],
    verified: true
  },
  {
    id: '3',
    name: 'Salão Beleza Livre',
    category: 'salon',
    address: 'Rua Augusta, 500 - Consolação',
    latitude: -23.5558,
    longitude: -46.6396,
    lgbtqOwned: true,
    safetyRating: 'safe',
    description: 'Salão especializado em cortes afirmativos e transformações.',
    phone: '(11) 1111-2222',
    tags: ['cortes-afirmativos', 'coloracao', 'trans-friendly'],
    verified: true
  },
  {
    id: '4',
    name: 'ONG Diversidade Ativa',
    category: 'ong',
    address: 'Rua dos Direitos, 50 - Vila Madalena',
    latitude: -23.5507,
    longitude: -46.6875,
    lgbtqOwned: false,
    safetyRating: 'safe',
    description: 'Organização que oferece apoio jurídico e psicológico gratuito.',
    phone: '(11) 3333-4444',
    website: 'https://diversidadeativa.org',
    tags: ['apoio-juridico', 'apoio-psicologico', 'voluntariado'],
    verified: true
  },
  {
    id: '5',
    name: 'Centro Cultural Arco-Íris',
    category: 'culture',
    address: 'Rua das Artes, 200 - Liberdade',
    latitude: -23.5584,
    longitude: -46.6265,
    lgbtqOwned: false,
    safetyRating: 'safe',
    description: 'Espaço cultural com exposições, teatro e workshops.',
    phone: '(11) 5555-6666',
    tags: ['exposicoes', 'teatro', 'workshops'],
    verified: true
  },
  {
    id: '6',
    name: 'Clínica Saúde Integral',
    category: 'health',
    address: 'Av. São João, 800 - República',
    latitude: -23.5431,
    longitude: -46.6291,
    lgbtqOwned: false,
    safetyRating: 'safe',
    description: 'Clínica com atendimento especializado para pessoas trans.',
    phone: '(11) 7777-8888',
    tags: ['hormonizacao', 'psicologia', 'endocrinologia'],
    verified: true
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Noite do Orgulho',
    description: 'Festa celebrando a diversidade com DJs locais e performances.',
    date: '2024-08-15',
    startTime: '20:00',
    endTime: '02:00',
    location: 'Bar Resistência',
    address: 'Av. Paulista, 1000 - Bela Vista',
    category: 'party',
    price: 25,
    organizer: 'Coletivo Resistência',
    lgbtqFriendly: true,
    tags: ['festa', 'musica', 'drag']
  },
  {
    id: '2',
    title: 'Workshop: Maquiagem Afirmativa',
    description: 'Aprenda técnicas de maquiagem para expressão de gênero.',
    date: '2024-08-20',
    startTime: '14:00',
    endTime: '17:00',
    location: 'Centro Cultural Arco-Íris',
    address: 'Rua das Artes, 200 - Liberdade',
    category: 'educational',
    price: 0,
    organizer: 'Beleza Livre',
    lgbtqFriendly: true,
    tags: ['workshop', 'maquiagem', 'gratuito']
  },
  {
    id: '3',
    title: 'Roda de Conversa: Direitos Trans',
    description: 'Discussão sobre direitos e políticas públicas para pessoas trans.',
    date: '2024-08-25',
    startTime: '19:00',
    endTime: '21:00',
    location: 'ONG Diversidade Ativa',
    address: 'Rua dos Direitos, 50 - Vila Madalena',
    category: 'political',
    price: 0,
    organizer: 'Diversidade Ativa',
    lgbtqFriendly: true,
    tags: ['direitos', 'trans', 'debate']
  },
  {
    id: '4',
    title: 'Sarau LGBTQIA+',
    description: 'Noite de poesia, música e arte da comunidade.',
    date: '2024-08-30',
    startTime: '18:00',
    endTime: '22:00',
    location: 'Café Orgulho',
    address: 'Rua da Diversidade, 123 - Centro',
    category: 'cultural',
    price: 15,
    organizer: 'Café Orgulho',
    lgbtqFriendly: true,
    tags: ['arte', 'poesia', 'musica']
  }
];

export const categoryLabels = {
  bar: 'Bar/Pub',
  cafe: 'Café/Restaurante',
  salon: 'Salão/Estética',
  ong: 'ONG/Associação',
  culture: 'Espaço Cultural',
  health: 'Saúde',
  business: 'Comércio'
};

export const eventCategoryLabels = {
  social: 'Social',
  cultural: 'Cultural',
  political: 'Político',
  educational: 'Educativo',
  party: 'Festa'
};