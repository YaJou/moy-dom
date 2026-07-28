export const catalogStats = {
  totalHouses: 40,
  cityCounts: { Саратов: 18, Энгельс: 14, Балаково: 4 } as Record<string, number>,
};

export const heroBenefits = [
  "Газ подключен",
  "Участок входит в стоимость",
  "Тёплый пол",
  "Ипотека",
  "Более 200 построенных домов",
];

export const houseAmenityBadges = [
  "Участок",
  "Ипотека",
  "Скважина",
  "Окна",
];

export const seoIntroData = {
  title: "Готовые дома в Саратове, Энгельсе и Балаково от застройщика",
  paragraphs: [
    "Мы строим и продаём одноэтажные и двухэтажные частные дома с подключённым газом, электричеством, тёплыми полами и предчистовой отделкой. Большинство объектов продаются вместе с земельным участком — после покупки не нужно искать землю и подключать коммуникации.",
    "В каталоге — дома от 87 до 231 м²: от компактных для молодой семьи до просторных коттеджей с террасой и гаражом. Каждый объект с фотографиями, планировкой, характеристиками и информацией о комплектации.",
  ],
  image: "/images/seo-intro.jpg",
};

export const aboutCompanyData = {
  title: "О компании",
  points: [
    "Строим дома более 15 лет",
    "Работаем только в Саратовской области",
    "Построили более 200 домов",
    "Все коммуникации уже подключены",
    "Работаем официально",
  ],
  text: "Кров-Сервис — собственная строительная компания с полным циклом: проектирование, строительство, подключение коммуникаций и сопровождение сделки. Аккредитованы в ведущих банках для ипотеки.",
  image: "/images/about-company.jpg",
  href: "/about",
};

export const houseVsApartmentData = {
  title: "Почему дом лучше квартиры",
  rows: [
    { apartment: "Нет участка", house: "Есть участок" },
    { apartment: "Соседи сверху и снизу", house: "Нет соседей" },
    { apartment: "Парковка не гарантирована", house: "Свой гараж / место" },
    { apartment: "Шум города", house: "Тишина и природа" },
    { apartment: "Нет террасы", house: "Терраса и двор" },
  ],
};

export const includedPriceData = {
  title: "Что входит в стоимость",
  items: [
    "Дом",
    "Участок",
    "Вода",
    "Канализация",
    "Окна",
    "Дверь",
  ],
};

export const popularHouseTabs = [
  { id: "all", label: "Все" },
  { id: "one-story", label: "Одноэтажные" },
  { id: "two-story", label: "Двухэтажные" },
  { id: "under8m", label: "До 8 млн" },
  { id: "under120", label: "До 120 м²" },
  { id: "garage", label: "С гаражом" },
];

export const blogTabs = [
  { id: "latest", label: "Последние" },
  { id: "popular", label: "Популярные" },
  { id: "mortgage", label: "По ипотеке" },
  { id: "construction", label: "По строительству" },
];

export const footerCities = [
  { label: "Саратов", href: "/catalog/saratov/" },
  { label: "Энгельс", href: "/catalog/engels/" },
  { label: "Балаково", href: "/catalog/balakovo/" },
];

export const footerCategories = [
  { label: "Одноэтажные", href: "/catalog/?floors=1%20%D1%8D%D1%82%D0%B0%D0%B6" },
  { label: "Двухэтажные", href: "/catalog/?floors=2%20%D1%8D%D1%82%D0%B0%D0%B6%D0%B0" },
  { label: "Саратов", href: "/catalog/saratov/" },
  { label: "Энгельс", href: "/catalog/engels/" },
  { label: "Балаково", href: "/catalog/balakovo/" },
  { label: "Все дома", href: "/catalog/" },
];

export const companyRequisites = {
  /** Правовая форма: индивидуальный предприниматель */
  form: "ip" as const,
  /** Полное наименование для договоров и 152-ФЗ */
  name: "ИП Амрахова Елена Ивановна",
  fullName: "Амрахова Елена Ивановна",
  brandName: "Кров-Сервис",
  inn: "644916802700",
  /** ОГРНИП (для ИП вместо ОГРН) */
  ogrn: "323645700057334",
  ogrnLabel: "ОГРНИП",
  registeredAt: "2023-06-23",
  registeredAtRu: "23 июня 2023 г.",
  /** Адрес регистрации по ЕГРИП */
  legalAddress: "Саратовская область, город Энгельс",
  citizenship: "РФ",
};

