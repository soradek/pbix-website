export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Magdalena Stokrocka',
    role: 'Project Leader',
    company: 'Boston Scientific',
    text: 'Szkolenie z Excela to było bardzo miłe doświadczenie pełne przydatnej wiedzy. Kurs pozwolił lepiej zrozumieć podejście do arkuszy i możliwości tabel przestawnych. Polecam Pana Radosława jako niezwykle cierpliwego trenera z talentem do prostego wyjaśniania trudnych zagadnień.',
    avatar: '/magdalena stokrocka.jpg',
  },
  {
    name: 'Grażyna Goławska',
    role: 'Managing Director',
    company: 'SWEGON Sp. z o.o.',
    text: 'Uczestniczyłam w szkoleniu z PowerPivot i PowerQuery. Wszystko przebiegało sprawnie, z dużą wiedzą i zaangażowaniem prowadzącego. Trener wyłapywał też braki w posługiwaniu się innymi funkcjami Excela i podpowiadał jak działać efektywniej.',
    avatar: '/Grażyna Goławska.jpg',
  },
  {
    name: 'Justyna Milczarek',
    role: 'Specjalista ds. serwisu',
    company: 'Toyota Material Handling Polska',
    text: 'Szkolenie Power BI – bardzo konkretne. Wiedza przekazana w przejrzysty i zrozumiały sposób, atmosfera przyjazna. Na pewno wrócę po więcej szkoleń z tym Trenerem.',
    avatar: '/Justyna milczarek.jpg',
  },
  {
    name: 'Błażej Jurewicz',
    role: 'CEO',
    company: 'AoV',
    text: 'Radek to profesjonalista, który sprawnie wprowadził nas w podstawy Power BI. Zajęcia były konkretne: cel, przykład, zadanie. Odpowiadał na wszystkie pytania i stworzył konstruktywną atmosferę.',
    avatar: '/Błażej Jurewicz.jpg',
  },
  {
    name: 'Agnieszka Matuszak',
    role: 'Accounting & Controlling Specialist',
    company: 'Jit Team',
    text: 'Zdecydowanie polecam Radka jako instruktora Power BI. Profesjonalizm, pasja i zaangażowanie – szkolenie to inspirujące doświadczenie dla każdego uczestnika.',
    avatar: '/agnieszka matuszak.jpg',
  },
  {
    name: 'Julia Stasiewicz',
    role: 'Accounts Payable Accountant',
    company: 'ROCKWOOL Group',
    text: 'Po trzech dniach szkolenia z Excela wiedza znacznie się poszerzyła. Masa przydatnych trików, które na pewno wykorzystam. Widać ogromną chęć przekazania wiedzy i otwartość do każdego z uczestników.',
    avatar: '/Julita stasiewicz.jpg',
  },
  {
    name: 'Hubert Klikowicz',
    role: 'Specjalista',
    company: 'NRW Water',
    text: 'Z czystym sumieniem polecam. Wiedza z Excela przedstawiona w bardzo przyjazny sposób. Radek jest dynamiczny, szybko nawiązuje kontakt z uczestnikami, a zakres szkolenia był odpowiednio dopasowany do poziomu grupy.',
    avatar: '/Hubert Klikowicz.jpg',
  },
];
