export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  textEn: string;
  roleEn: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Magdalena Stokrocka',
    role: 'Project Leader',
    company: 'Boston Scientific',
    text: 'Szkolenie z Excela to było bardzo miłe doświadczenie pełne przydatnej wiedzy. Kurs pozwolił lepiej zrozumieć podejście do arkuszy i możliwości tabel przestawnych. Polecam Pana Radosława jako niezwykle cierpliwego trenera z talentem do prostego wyjaśniania trudnych zagadnień.',
    textEn: 'The Excel training was a very pleasant experience, full of useful knowledge. The course helped me better understand how to approach spreadsheets and what pivot tables can do. I recommend Mr Radosław as an exceptionally patient trainer with a talent for explaining difficult topics simply.',
    roleEn: 'Project Leader',
    avatar: '/magdalena stokrocka.jpg',
  },
  {
    name: 'Grażyna Goławska',
    role: 'Managing Director',
    company: 'SWEGON Sp. z o.o.',
    text: 'Uczestniczyłam w szkoleniu z PowerPivot i PowerQuery. Wszystko przebiegało sprawnie, z dużą wiedzą i zaangażowaniem prowadzącego. Trener wyłapywał też braki w posługiwaniu się innymi funkcjami Excela i podpowiadał jak działać efektywniej.',
    textEn: 'I attended the Power Pivot and Power Query training. Everything ran smoothly, with great knowledge and commitment from the trainer. He also spotted gaps in how we used other Excel functions and showed us how to work more efficiently.',
    roleEn: 'Managing Director',
    avatar: '/Grażyna Goławska.jpg',
  },
  {
    name: 'Justyna Milczarek',
    role: 'Specjalista ds. serwisu',
    company: 'Toyota Material Handling Polska',
    text: 'Szkolenie Power BI – bardzo konkretne. Wiedza przekazana w przejrzysty i zrozumiały sposób, atmosfera przyjazna. Na pewno wrócę po więcej szkoleń z tym Trenerem.',
    textEn: 'Power BI training, very concrete. Knowledge delivered in a clear and understandable way, in a friendly atmosphere. I will definitely come back for more training with this trainer.',
    roleEn: 'Service Specialist',
    avatar: '/Justyna milczarek.jpg',
  },
  {
    name: 'Błażej Jurewicz',
    role: 'CEO',
    company: 'AoV',
    text: 'Radek to profesjonalista, który sprawnie wprowadził nas w podstawy Power BI. Zajęcia były konkretne: cel, przykład, zadanie. Odpowiadał na wszystkie pytania i stworzył konstruktywną atmosferę.',
    textEn: 'Radek is a professional who smoothly introduced us to the basics of Power BI. The sessions were concrete: goal, example, exercise. He answered every question and created a constructive atmosphere.',
    roleEn: 'CEO',
    avatar: '/Błażej Jurewicz.jpg',
  },
  {
    name: 'Agnieszka Matuszak',
    role: 'Accounting & Controlling Specialist',
    company: 'Jit Team',
    text: 'Zdecydowanie polecam Radka jako instruktora Power BI. Profesjonalizm, pasja i zaangażowanie – szkolenie to inspirujące doświadczenie dla każdego uczestnika.',
    textEn: 'I strongly recommend Radek as a Power BI instructor. Professionalism, passion and commitment; the training is an inspiring experience for every participant.',
    roleEn: 'Accounting & Controlling Specialist',
    avatar: '/agnieszka matuszak.jpg',
  },
  {
    name: 'Julia Stasiewicz',
    role: 'Accounts Payable Accountant',
    company: 'ROCKWOOL Group',
    text: 'Po trzech dniach szkolenia z Excela wiedza znacznie się poszerzyła. Masa przydatnych trików, które na pewno wykorzystam. Widać ogromną chęć przekazania wiedzy i otwartość do każdego z uczestników.',
    textEn: 'After three days of Excel training my knowledge grew considerably. Loads of useful tricks I will definitely use. You can see a real willingness to share knowledge and openness towards every participant.',
    roleEn: 'Accounts Payable Accountant',
    avatar: '/Julita stasiewicz.jpg',
  },
  {
    name: 'Hubert Klikowicz',
    role: 'Specjalista',
    company: 'NRW Water',
    text: 'Z czystym sumieniem polecam. Wiedza z Excela przedstawiona w bardzo przyjazny sposób. Radek jest dynamiczny, szybko nawiązuje kontakt z uczestnikami, a zakres szkolenia był odpowiednio dopasowany do poziomu grupy.',
    textEn: 'I can recommend it with a clear conscience. Excel knowledge presented in a very friendly way. Radek is dynamic, builds rapport with participants quickly, and the scope of the training was well matched to the group’s level.',
    roleEn: 'Specialist',
    avatar: '/Hubert Klikowicz.jpg',
  },
];
