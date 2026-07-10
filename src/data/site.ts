export { realHouses as housesData } from "@/data/houses";

export const siteConfig = {
  name: "МОЙ ДОМ",
  tagline: "Готовые частные дома",
  description:
    "Готовые частные дома в Саратове, Энгельсе и Балаково. С участком, газом и предчистовой отделкой. Заселяйтесь сразу после покупки.",
  url: "https://moy-dom.ru",
  phone: "+7 (8452) 55-55-55",
  phoneHours: "Ежедневно с 9:00 до 20:00",
  whatsapp: "https://wa.me/78452555555",
  telegram: "https://t.me/moydom",
  email: "info@moy-dom.ru",
  address: "г. Саратов, ул. Московская, д. 15",
  workingHours: "Пн–Вс: 9:00 – 20:00",
};

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  shortLabel?: string;
  href: string;
  children?: NavChild[];
}

export const navigation: NavItem[] = [
  {
    label: "Каталог домов",
    shortLabel: "Каталог",
    href: "/catalog",
    children: [
      { label: "Все дома", href: "/catalog" },
      { label: "Одноэтажные", href: "/catalog/one-story" },
      { label: "Двухэтажные", href: "/catalog/two-story" },
      { label: "С гаражом", href: "/catalog/garage" },
      { label: "С террасой", href: "/catalog/terrace" },
    ],
  },
  {
    label: "Проекты",
    href: "/projects",
    children: [
      { label: "Все проекты", href: "/projects" },
      { label: "До 100 м²", href: "/projects/small" },
      { label: "100–150 м²", href: "/projects/medium" },
      { label: "От 150 м²", href: "/projects/large" },
    ],
  },
  { label: "Построенные дома", shortLabel: "Построенные", href: "/built" },
  {
    label: "Блог",
    href: "/blog",
    children: [
      { label: "Все статьи", href: "/blog" },
      { label: "Выбор участка", href: "/blog/uchastok" },
      { label: "Ипотека", href: "/blog/ipoteka" },
      { label: "Отделка", href: "/blog/otdelka" },
    ],
  },
  {
    label: "О компании",
    shortLabel: "О нас",
    href: "/about",
    children: [
      { label: "О нас", href: "/about" },
      { label: "Наши работы", href: "/works" },
      { label: "Документы", href: "/documents" },
      { label: "Партнёры", href: "/partners" },
    ],
  },
  { label: "Контакты", href: "/contacts" },
];

export const heroData = {
  title: "Готовые частные дома",
  titleCities: "в Саратове, Энгельсе и Балаково",
  priceFrom: "От 6 490 000 ₽",
  subtitle:
    "с участком, газом и предчистовой отделкой",
  primaryButton: "Смотреть дома",
  secondaryButton: "Получить консультацию",
  image: "/images/hero-house.jpg",
  imageAlt: "Современный частный дом с предчистовой отделкой",
};

export const searchFilters = {
  cities: ["Любой", "Саратов", "Энгельс", "Балаково"],
  priceRanges: [
    "Любая",
    "до 5 000 000 ₽",
    "5 000 000 – 7 000 000 ₽",
    "7 000 000 – 10 000 000 ₽",
    "от 10 000 000 ₽",
  ],
  areaRanges: [
    "Любая",
    "до 100 м²",
    "100 – 150 м²",
    "150 – 200 м²",
    "от 200 м²",
  ],
  rooms: ["Любое", "1", "2", "3", "4", "5+"],
  readiness: ["Любая", "Готов к заселению", "На стадии строительства"],
  floors: ["Любая", "1 этаж", "2 этажа"],
  gas: ["Любой", "Подключен", "По границе участка"],
  prefinish: ["Любая", "Есть", "Нет"],
};


export const featuresData = [
  { id: 1, icon: "flame", title: "Газ", description: "Газовое отопление и горячая вода" },
  { id: 2, icon: "thermometer", title: "Тёплый пол", description: "Во всех жилых комнатах" },
  { id: 3, icon: "paintbrush", title: "Предчистовая отделка", description: "Штукатурка, стяжка, разводка" },
  { id: 4, icon: "map", title: "Участок в стоимости", description: "Земля уже оформлена" },
  { id: 5, icon: "landmark", title: "Подходит под ипотеку", description: "Семейная и стандартная" },
  { id: 6, icon: "building", title: "Собственная компания", description: "Строим сами, без посредников" },
  { id: 7, icon: "shield", title: "Гарантия 5 лет", description: "На конструктив здания" },
  { id: 8, icon: "filecheck", title: "Сопровождение сделки", description: "Юридическое и ипотечное" },
];

export const citiesData = [
  {
    id: 1,
    name: "Саратов",
    housesCount: 18,
    projectsCount: 24,
    priceFrom: 6_500_000,
    image: "/images/cities/saratov.jpg",
    href: "/catalog?city=Саратов",
  },
  {
    id: 2,
    name: "Энгельс",
    housesCount: 12,
    projectsCount: 16,
    priceFrom: 6_500_000,
    image: "/images/cities/engels.jpg",
    href: "/catalog?city=Энгельс",
  },
  {
    id: 3,
    name: "Балаково",
    housesCount: 4,
    projectsCount: 8,
    priceFrom: 6_490_000,
    image: "/images/cities/balakovo.jpg",
    href: "/catalog/balakovo",
  },
];

export const statsData = [
  { id: 1, value: "320+", label: "домов построено" },
  { id: 2, value: "15", label: "лет на рынке" },
  { id: 3, value: "250+", label: "довольных семей" },
  { id: 4, value: "98%", label: "рекомендуют нас" },
];

export const galleryData = [
  {
    id: 1,
    image: "/images/gallery/gallery-1.jpg",
    alt: "Построенный дом в Саратове",
  },
  {
    id: 2,
    image: "/images/gallery/gallery-2.jpg",
    alt: "Современный коттедж в Энгельсе",
  },
  {
    id: 3,
    image: "/images/gallery/gallery-3.jpg",
    alt: "Частный дом в Балаково",
  },
  {
    id: 4,
    image: "/images/gallery/gallery-4.jpg",
    alt: "Дом с террасой",
  },
  {
    id: 5,
    image: "/images/gallery/gallery-5.jpg",
    alt: "Загородный дом",
  },
];

export const reviewsData = [
  {
    id: 1,
    name: "Александр Петров",
    city: "Саратов",
    houseBought: "Дом 120 м², ул. Садовая",
    date: "Март 2025",
    text: "Отличная компания! Дом построили в срок, качество на высоте. Участок ровный, газ подведён. Заселились через месяц после покупки.",
    rating: 5,
    avatar: "/images/reviews/avatar-1.jpg",
    houseImage: "/images/reviews/house-1.jpg",
  },
  {
    id: 2,
    name: "Елена Смирнова",
    city: "Энгельс",
    houseBought: "Дом 145 м², пос. Пригородный",
    date: "Январь 2025",
    text: "Помогли с ипотекой, всё оформили быстро. Дом просторный, тёплый пол работает отлично. Рекомендую всем, кто ищет готовое решение.",
    rating: 5,
    avatar: "/images/reviews/avatar-2.jpg",
    houseImage: "/images/reviews/house-2.jpg",
  },
  {
    id: 3,
    name: "Дмитрий Козлов",
    city: "Балаково",
    houseBought: "Дом 105 м², с. Натальино",
    date: "Ноябрь 2024",
    text: "Третий год живём в доме от Кров-Сервис. Никаких проблем с коммуникациями. Предчистовая отделка позволила сделать ремонт по своему вкусу.",
    rating: 5,
    avatar: "/images/reviews/avatar-3.jpg",
    houseImage: "/images/reviews/house-3.jpg",
  },
];

export const blogData = [
  {
    id: 1,
    title: "Как выбрать идеальный участок для строительства дома",
    date: "12 мая 2024",
    image: "/images/blog/blog-1.jpg",
    href: "/blog/uchastok",
    category: "construction",
    popular: true,
  },
  {
    id: 2,
    title: "Ипотека на готовый дом: пошаговая инструкция",
    date: "28 апреля 2024",
    image: "/images/blog/blog-2.jpg",
    href: "/blog/ipoteka",
    category: "mortgage",
    popular: true,
  },
  {
    id: 3,
    title: "Предчистовая отделка: что входит и зачем нужна",
    date: "15 апреля 2024",
    image: "/images/blog/blog-3.jpg",
    href: "/blog/otdelka",
    category: "construction",
    popular: false,
  },
  {
    id: 4,
    title: "5 причин выбрать готовый дом вместо строительства",
    date: "3 апреля 2024",
    image: "/images/blog/blog-4.jpg",
    href: "/blog/prichiny",
    category: "construction",
    popular: true,
  },
];

export const faqData = [
  {
    id: 1,
    question: "Что входит в стоимость готового дома?",
    answer:
      "В стоимость входит сам дом с предчистовой отделкой, земельный участок, подведённые коммуникации (газ, электричество, вода, канализация), а также оформление всех документов.",
  },
  {
    id: 2,
    question: "Можно ли оформить ипотеку на готовый дом?",
    answer:
      "Да, мы сотрудничаем с ведущими банками и помогаем с одобрением ипотеки. Наши специалисты подберут оптимальную программу и сопроводят на всех этапах.",
  },
  {
    id: 3,
    question: "Сколько времени занимает оформление сделки?",
    answer:
      "При наличии всех документов сделка может быть оформлена в течение 2–3 недель. Мы берём на себя всю юридическую работу.",
  },
  {
    id: 4,
    question: "Какая гарантия предоставляется на дом?",
    answer:
      "Мы предоставляем гарантию 5 лет на конструктив здания и 2 года на инженерные системы. Все условия прописаны в договоре.",
  },
  {
    id: 5,
    question: "Можно ли внести изменения в проект дома?",
    answer:
      "Да, мы предлагаем возможность адаптации типовых проектов под ваши пожелания: планировка, материалы отделки, дополнительные опции.",
  },
  {
    id: 6,
    question: "Как происходит заселение?",
    answer:
      "После подписания договора и оплаты вы получаете ключи и все документы. Дом готов к заселению — остаётся только сделать чистовой ремонт по желанию.",
  },
  {
    id: 7,
    question: "Какой первоначальный взнос по ипотеке?",
    answer:
      "Минимальный взнос от 15% при госпрограммах и от 20% по стандартным программам. Поможем подобрать лучшие условия.",
  },
  {
    id: 8,
    question: "Сколько одобряется ипотека?",
    answer:
      "Предварительное одобрение — за 1 рабочий день. Полное одобрение после оценки объекта — 3–5 дней.",
  },
  {
    id: 9,
    question: "Участок уже оформлен в собственность?",
    answer:
      "Да, все участки юридически чистые, с подведёнными коммуникациями и готовы к оформлению сделки.",
  },
  {
    id: 10,
    question: "Подходит ли дом под семейную ипотеку?",
    answer:
      "Да, большинство наших объектов подходят под семейную ипотеку. Поможем с одобрением в банках-партнёрах.",
  },
  {
    id: 11,
    question: "Можно ли выбрать другой участок?",
    answer:
      "Да, у нас есть каталог участков в разных районах. Поможем подобрать оптимальный вариант под ваш дом.",
  },
  {
    id: 12,
    question: "Какие коммуникации уже подключены?",
    answer:
      "Газ (или по границе участка), скважина, выгребная яма, электричество. Тёплый пол и предчистовая отделка включены.",
  },
];

export const footerLinks = {
  catalog: [
    { label: "Все дома", href: "/catalog" },
    { label: "Одноэтажные", href: "/catalog/one-story" },
    { label: "Двухэтажные", href: "/catalog/two-story" },
    { label: "С гаражом", href: "/catalog/garage" },
    { label: "С террасой", href: "/catalog/terrace" },
  ],
  info: [
    { label: "Проекты домов", href: "/projects" },
    { label: "Участки", href: "/plots" },
    { label: "Построенные дома", href: "/built" },
    { label: "Блог", href: "/blog" },
    { label: "Отзывы", href: "/reviews" },
  ],
  company: [
    { label: "О компании", href: "/about" },
    { label: "Наши работы", href: "/works" },
    { label: "Документы", href: "/documents" },
    { label: "Партнёры", href: "/partners" },
    { label: "Контакты", href: "/contacts" },
  ],
};

export const socialLinks = [
  { name: "VK", href: "https://vk.com/dom_krovservice64", icon: "vk" },
  { name: "Telegram", href: "https://t.me/moydom", icon: "telegram" },
  { name: "WhatsApp", href: "https://wa.me/78452555555", icon: "whatsapp" },
];

export const quickFilters = [
  { label: "До 6 млн", href: "/catalog?price=до+5+000+000+₽" },
  { label: "3 комнаты", href: "/catalog?rooms=3" },
  { label: "Саратов", href: "/catalog?city=Саратов" },
  { label: "Энгельс", href: "/catalog?city=Энгельс" },
  { label: "Готов к заселению", href: "/catalog?readiness=Готов+к+заселению" },
  { label: "От 150 м²", href: "/catalog?area=150+–+200+м²" },
];

export const purchaseSteps = [
  {
    id: 1,
    step: "01",
    title: "Выбор дома",
    description: "Подберите дом в каталоге или с помощью менеджера",
  },
  {
    id: 2,
    step: "02",
    title: "Просмотр объекта",
    description: "Организуем показ дома и участка в удобное время",
  },
  {
    id: 3,
    step: "03",
    title: "Ипотека или оплата",
    description: "Поможем с одобрением ипотеки или оформим прямую покупку",
  },
  {
    id: 4,
    step: "04",
    title: "Оформление сделки",
    description: "Подготовим документы и проведём сделку за 2–3 недели",
  },
  {
    id: 5,
    step: "05",
    title: "Заселение",
    description: "Получите ключи и въезжайте в готовый дом",
  },
];

export const projectsData = [
  {
    id: 1,
    title: "Скандинавский 98",
    area: 98,
    rooms: 3,
    price: 5200000,
    image: "/images/projects/project-1.jpg",
    href: "/projects/skandinavskiy-98",
    popular: true,
    floors: 1,
    hasGarage: false,
  },
  {
    id: 2,
    title: "Классик 135",
    area: 135,
    rooms: 4,
    price: 7100000,
    image: "/images/projects/project-2.jpg",
    href: "/projects/klassik-135",
    popular: true,
    floors: 1,
    hasGarage: false,
  },
  {
    id: 3,
    title: "Модерн 160",
    area: 160,
    rooms: 4,
    price: 8900000,
    image: "/images/projects/project-3.jpg",
    href: "/projects/modern-160",
    popular: true,
    floors: 2,
    hasGarage: true,
  },
  {
    id: 4,
    title: "Комфорт 110",
    area: 110,
    rooms: 3,
    price: 6400000,
    image: "/images/projects/project-4.jpg",
    href: "/projects/komfort-110",
    popular: true,
    floors: 1,
    hasGarage: false,
  },
];

export const partnersData = [
  { id: 1, name: "Сбербанк", type: "Ипотечный партнёр" },
  { id: 2, name: "ВТБ", type: "Ипотечный партнёр" },
  { id: 3, name: "Газпромбанк", type: "Ипотечный партнёр" },
  { id: 4, name: "Альфа-Банк", type: "Ипотечный партнёр" },
  { id: 5, name: "Россельхозбанк", type: "Ипотечный партнёр" },
  { id: 6, name: "Дом.РФ", type: "Госпрограммы" },
];

export const certificatesData = [
  {
    id: 1,
    title: "СРО строителей",
    description: "Членство в саморегулируемой организации",
  },
  {
    id: 2,
    title: "ISO 9001",
    description: "Система менеджмента качества",
  },
  {
    id: 3,
    title: "Лицензия застройщика",
    description: "Официальное разрешение на строительство",
  },
  {
    id: 4,
    title: "Гарантия 5 лет",
    description: "На конструктив здания по договору",
  },
];

export const miniFaqData = [
  {
    id: 1,
    question: "Какой первоначальный взнос по ипотеке?",
    answer:
      "Минимальный взнос от 15% при госпрограммах и от 20% по стандартным программам. Поможем подобрать лучшие условия.",
    category: "mortgage",
  },
  {
    id: 2,
    question: "Сколько одобряется ипотека?",
    answer:
      "Предварительное одобрение — за 1 рабочий день. Полное одобрение после оценки объекта — 3–5 дней.",
    category: "mortgage",
  },
  {
    id: 3,
    question: "Участок уже оформлен в собственность?",
    answer:
      "Да, все участки юридически чистые, с подведёнными коммуникациями и готовы к оформлению сделки.",
    category: "plot",
  },
  {
    id: 4,
    question: "Можно ли выбрать другой участок?",
    answer:
      "Да, у нас есть каталог участков в разных районах. Поможем подобрать оптимальный вариант под ваш дом.",
    category: "plot",
  },
];

export const localSeoData = [
  {
    id: 1,
    city: "Саратов",
    title: "Готовые дома в Саратове",
    description:
      "Более 45 готовых домов с участком в Саратове и области. Газ, предчистовая отделка, ипотека от 15%. Заселение сразу после покупки.",
    href: "/catalog?city=Саратов",
    housesCount: 45,
  },
  {
    id: 2,
    city: "Энгельс",
    title: "Готовые дома в Энгельсе",
    description:
      "28 домов в Энгельсе — тихие районы, развитая инфраструктура, 15 минут до Саратова. Участок и коммуникации включены.",
    href: "/catalog?city=Энгельс",
    housesCount: 28,
  },
  {
    id: 3,
    city: "Балаково",
    title: "Готовые дома в Балаково",
    description:
      "4 готовых дома в с. Натальино — 10 соток, газ по границе, семейная ипотека. Асфальтированный подъезд, школа рядом.",
    href: "/catalog/balakovo",
    housesCount: 4,
  },
];

export const videoData = {
  title: "Видео о наших домах",
  subtitle: "Посмотрите, как выглядят наши дома изнутри и снаружи",
  thumbnail: "/images/video-thumbnail.jpg",
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  duration: "3:42",
};

export const mapData = {
  center: { lat: 52.048, lng: 47.918 },
  zoom: 14,
};

export const alertsData = {
  title: "Уведомления о новых домах",
  subtitle:
    "Только объекты в выбранном городе. Без спама, звонков и лишних рассылок.",
  vkGroupUrl: "https://vk.com/dom_krovservice64",
  vkGroupName: "dom_krovservice64",
  cities: ["Саратов", "Энгельс", "Балаково"],
  channels: [
    { id: "sms", label: "SMS" },
    { id: "whatsapp", label: "WhatsApp" },
    { id: "telegram", label: "Telegram" },
    { id: "vk", label: "ВКонтакте" },
  ] as const,
  notifyAbout: [
    "Новый объект начат",
    "Дом выставлен в продажу",
    "Скидка на дом",
  ],
};
