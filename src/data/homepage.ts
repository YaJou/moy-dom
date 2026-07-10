export const catalogStats = {
  totalHouses: 38,
  cityCounts: { Саратов: 18, Энгельс: 12, Балаково: 4 } as Record<string, number>,
};

export const heroBenefits = [
  "Газ подключен",
  "Участок входит в стоимость",
  "Тёплый пол",
  "Ипотека",
  "Более 320 построенных домов",
];

export const houseAmenityBadges = [
  "Газ",
  "Тёплый пол",
  "Предчистовая",
  "Участок",
  "Ипотека",
];

export const seoIntroData = {
  title: "Готовые дома в Саратове, Энгельсе и Балаково от застройщика",
  paragraphs: [
    "Мы строим и продаём одноэтажные и двухэтажные частные дома с подключённым газом, электричеством, тёплыми полами и предчистовой отделкой. Большинство объектов продаются вместе с земельным участком — после покупки не нужно искать землю и подключать коммуникации.",
    "В каталоге — дома от 87 до 210 м²: от компактных для молодой семьи до просторных коттеджей с террасой. Каждый объект с фотографиями, планировкой, характеристиками и информацией о комплектации.",
  ],
  image: "/images/seo-intro.jpg",
};

export const aboutCompanyData = {
  title: "О компании",
  points: [
    "Строим дома более 15 лет",
    "Работаем только в Саратовской области",
    "Построили более 320 домов",
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
    "Газ",
    "Электрика",
    "Вода",
    "Канализация",
    "Тёплый пол",
    "Стяжка",
    "Штукатурка",
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
  { label: "Саратов", href: "/catalog?city=Саратов" },
  { label: "Энгельс", href: "/catalog?city=Энгельс" },
  { label: "Балаково", href: "/catalog/balakovo" },
];

export const footerCategories = [
  { label: "Одноэтажные", href: "/catalog/one-story" },
  { label: "Двухэтажные", href: "/catalog/two-story" },
  { label: "До 8 млн", href: "/catalog?price=5+000+000+–+7+000+000+₽" },
  { label: "С гаражом", href: "/catalog/garage" },
  { label: "С террасой", href: "/catalog/terrace" },
  { label: "Готовые к заселению", href: "/catalog?readiness=Готов+к+заселению" },
];

export const companyRequisites = {
  name: 'ООО "Кров-Сервис"',
  inn: "6449XXXXXX",
  ogrn: "1126449XXXXX",
};
