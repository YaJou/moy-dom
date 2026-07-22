import type { House } from "@/types/house";

function imgs(folder: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return `/images/houses/${folder}/${num}.jpg`;
  });
}

const baseSpecs = {
  floors: 1,
  landCategory: "ЛПХ",
  buildYear: 2026,
  wallMaterial: "Газоблок + облицовочный кирпич",
  bathroom: "В доме",
  repair: "Под вашу отделку",
  electricity: "Нет",
  water: "Скважина",
  gas: "По границе участка",
  sewage: "Выгребная яма",
  parking: "Парковочное место",
  road: "Асфальтированная дорога",
  infrastructure: ["Магазин", "Аптека", "Детский сад", "Школа"],
  mortgage: true,
  familyMortgage: true,
  distanceToCenter: "10 км",
};

export const realHouses: House[] = [
  {
    id: 1,
    slug: "natalino-mehanizatorov-105",
    title: "Дом 105 м² на участке 10 сот.",
    city: "Балаково",
    district: "с. Натальино",
    address:
      "Саратовская обл., Балаковский р-н, с. Натальино, ул. Механизаторов",
    price: 7_250_000,
    area: 105,
    land: 10,
    rooms: 4,
    image: "/images/houses/natalino-mehanizatorov-105/02.jpg",
    images: imgs("natalino-mehanizatorov-105", 7),
    badge: "new",
    readiness: "building",
    lat: 52.048357,
    lng: 47.912611,
    mapUrl:
      "https://yandex.ru/maps/?ll=47.912611%2C52.048357&z=16",
    shortDescription:
      "Одноэтажный дом 105 м² с террасой 15 м² на участке 10 соток в с. Натальино. Газ по границе, скважина, семейная ипотека.",
    description:
      "Одноэтажный дом в активно развивающемся посёлке Натальино. Площадь 105 м² + терраса 15 м², участок 10 соток. Планировка: 3 спальни, кухня-гостиная с выходом на террасу, 2 санузла, котельная. Облицовка кирпичом, крыша — металлочерепица, пластиковые окна включены в стоимость. Скважина и выгребная яма (4,5 м) в цене. Газовая труба вдоль участка, асфальтированный подъезд.",
    highlights: [
      "Семейная ипотека",
      "Окна и дверь в стоимости",
      "Терраса 15 м²",
      "Скважина и канализация включены",
      "Участок 10 соток в цене",
    ],
    specs: {
      ...baseSpecs,
      terrace: "Терраса 15 м²",
    },
    featured: true,
    builder: "Кров-Сервис",
  },
  {
    id: 2,
    slug: "natalino-hleborobov-100",
    title: "Дом 100 м² на участке 10 сот.",
    city: "Балаково",
    district: "с. Натальино",
    address:
      "Саратовская обл., Балаковский р-н, с. Натальино, ул. Хлеборобов",
    price: 7_190_000,
    area: 100,
    land: 10,
    rooms: 4,
    image: "/images/houses/natalino-hleborobov-100/02.jpg",
    images: imgs("natalino-hleborobov-100", 12),
    badge: "new",
    readiness: "building",
    lat: 52.048118,
    lng: 47.92124,
    mapUrl:
      "https://yandex.ru/maps/?ll=47.921240%2C52.048118&z=16",
    shortDescription:
      "Дом 100 м² с террасой 12 м² в посёлке Натальино-2. Газоблок 300 мм + кирпич, 3 спальни, 2 санузла.",
    description:
      "Продаётся дом в активно развивающемся посёлке Натальино-2. Площадь 100 м² с террасой 12 м² и участком 10 соток. Стены — газоблок Gras 300 мм с облицовочным кирпичом. Планировка: 3 спальни, 2 санузла, кухня-гостиная с выходом на террасу. В стоимость входят скважина и выгребная яма. Школа в шаговой доступности.",
    highlights: [
      "Посёлок Натальино-2",
      "3 спальни, 2 санузла",
      "Терраса 12 м²",
      "Школа рядом",
      "Скважина и канализация в цене",
    ],
    specs: {
      ...baseSpecs,
      terrace: "Терраса 12 м²",
    },
    featured: true,
    builder: "Кров-Сервис",
  },
  {
    id: 3,
    slug: "natalino-stepnaya-87",
    title: "Дом 87 м² на участке 10 сот.",
    city: "Балаково",
    district: "с. Натальино",
    address:
      "Саратовская обл., Балаковский р-н, с. Натальино, Степная ул.",
    price: 6_490_000,
    area: 87,
    land: 10,
    rooms: 3,
    image: "/images/houses/natalino-stepnaya-87/02.jpg",
    images: imgs("natalino-stepnaya-87", 11),
    badge: "new",
    readiness: "building",
    lat: 52.046118,
    lng: 47.919969,
    mapUrl:
      "https://yandex.ru/maps/?ll=47.919969%2C52.046118&z=15",
    shortDescription:
      "Компактный дом 87 м² с террасой 15 м². 2 спальни по 16 м², кухня-гостиная, участок 10 соток в Натальино.",
    description:
      "Одноэтажный дом 87 м² + терраса 15 м² на участке 10 соток в с. Натальино. Планировка: 2 большие спальни по 16 м², кухня-гостиная с выходом на террасу, санузел, котельная. Кирпичная облицовка, металлочерепица, пластиковые окна и дверь в стоимости. Скважина, выгребная яма 4,5 м, газ по границе участка.",
    highlights: [
      "Выгодная цена",
      "Семейная ипотека",
      "Терраса 15 м²",
      "2 спальни по 16 м²",
      "Асфальтированный подъезд",
    ],
    specs: {
      ...baseSpecs,
      terrace: "Терраса 15 м²",
    },
    featured: true,
    builder: "Кров-Сервис",
  },
  {
    id: 4,
    slug: "natalino-hleborobov-116",
    title: "Дом 116 м² на участке 10 сот.",
    city: "Балаково",
    district: "с. Натальино",
    address:
      "Саратовская обл., Балаковский р-н, с. Натальино, ул. Хлеборобов",
    price: 7_290_000,
    area: 116,
    land: 10,
    rooms: 4,
    image: "/images/houses/natalino-hleborobov-116/02.jpg",
    images: imgs("natalino-hleborobov-116", 10),
    badge: "new",
    readiness: "building",
    lat: 52.047981,
    lng: 47.91989,
    mapUrl:
      "https://yandex.ru/maps/?ll=47.919890%2C52.047981&z=16",
    shortDescription:
      "Просторный дом 116 м² с террасой 15 м². 3 спальни, 2 санузла, участок 10 соток в Натальино.",
    description:
      "Одноэтажный дом 116 м² + терраса 15 м² на участке 10 соток. Планировка: 3 спальни, кухня-гостиная с выходом на террасу, 2 санузла, котельная. Кирпичная облицовка, металлочерепица, пластиковые окна в стоимости. Скважина, выгребная яма, газ по границе. Подходит под семейную ипотеку.",
    highlights: [
      "116 м² жилой площади",
      "3 спальни, 2 санузла",
      "Терраса 15 м²",
      "Семейная ипотека",
      "Скважина и канализация в цене",
    ],
    specs: {
      ...baseSpecs,
      terrace: "Терраса 15 м²",
    },
    featured: true,
    builder: "Кров-Сервис",
  },
  {
    id: 5,
    slug: "engels-snt-novoe-231",
    title: "Дом 231 м² на участке 10 сот.",
    city: "Энгельс",
    district: 'СНТ «Новое»',
    address: "Саратовская обл., г. Энгельс, СНТ «Новое»",
    price: 13_000_000,
    area: 231,
    land: 10,
    rooms: 5,
    image: "/images/houses/engels-snt-novoe-231/02.jpg",
    images: imgs("engels-snt-novoe-231", 8),
    badge: "new",
    readiness: "building",
    promoLabel: "Рассрочка",
    lat: 51.4498,
    lng: 46.1685,
    mapUrl: "https://yandex.ru/maps/?ll=46.168500%2C51.449800&z=16",
    shortDescription:
      "Просторный двухэтажный дом 231 м² с мансардой в СНТ «Новое», Энгельс. Участок 10 соток, скважина, рассрочка и ипотека.",
    description:
      "Продаётся просторный двухэтажный дом 231 м² с мансардным этажом в СНТ «Новое» на участке 10 соток. Ровный прямоугольный участок, кадастровый номер 64:38:050302:957. Скважина и канализация предусмотрены. Готовы каркас лестницы на второй этаж, окна ПВХ и входная металлическая дверь. В ближайшее время будет проведён газ. Цена — 52 тыс. ₽/м². Рассрочка от застройщика через эскроу-счёт, семейная ипотека. Аккредитованы в Сбербанке, Россельхозбанке, ДОМ.РФ, Альфа-Банке, Росбанке и Почта Банке.",
    highlights: [
      "231 м² с мансардой",
      "Рассрочка через эскроу",
      "Семейная ипотека",
      "Окна и дверь установлены",
      "Скважина и канализация",
    ],
    specs: {
      floors: 2,
      landCategory: "СНТ",
      buildYear: 2026,
      wallMaterial: "Газоблок + облицовочный кирпич",
      bathroom: "2 санузла",
      repair: "Под вашу отделку",
      electricity: "Подключено",
      water: "Скважина",
      gas: "Скоро будет проведён",
      sewage: "Канализация",
      parking: "Парковочное место",
      road: "Подъездная дорога",
      infrastructure: ["Магазин", "Строительные магазины", "Остановка"],
      mortgage: true,
      familyMortgage: true,
      distanceToCenter: "10–15 мин на авто",
      terrace: "Мансардный этаж",
    },
    featured: true,
    builder: "Кров-Сервис",
  },
  {
    id: 6,
    slug: "engels-snt-malinki-105-garage",
    title: "Дом 105 м² с гаражом 40 м²",
    city: "Энгельс",
    district: 'СНТ «Малинки»',
    address: "Саратовская обл., г. Энгельс, СНТ «Малинки»",
    price: 7_300_000,
    area: 105,
    land: 10,
    rooms: 3,
    image: "/images/houses/engels-snt-malinki-105-garage/02.jpg",
    images: imgs("engels-snt-malinki-105-garage", 8),
    badge: "new",
    readiness: "building",
    lat: 51.4612,
    lng: 46.1543,
    mapUrl: "https://yandex.ru/maps/?ll=46.154300%2C51.461200&z=16",
    shortDescription:
      "Дом 105 м² с гаражом 40 м² в СНТ «Малинки», Энгельс. 3 спальни, 2 санузла, скважина, ипотека и рассрочка от застройщика.",
    description:
      "Просторный дом с гаражом в живописном СНТ «Малинки» — идеальное место для жизни за городом. Жилая площадь 105 м² плюс гараж 40 м² на участке 10 соток. Стены — газоблок Gras 300 мм с кирпичной облицовкой, крыша из гибкой черепицы, пластиковые стеклопакеты. Своя скважина, электричество, выгребная яма 4,5 м. Планировка: 3 отдельные спальни, большая кухня-гостиная, 2 санузла. До города 5–7 минут по новой дороге, остановка в 200 м. Ипотека от ведущих банков и рассрочка от застройщика.",
    highlights: [
      "Гараж 40 м²",
      "3 спальни, 2 санузла",
      "5–7 мин до города",
      "Скважина и канализация",
      "Рассрочка и ипотека",
    ],
    specs: {
      floors: 1,
      landCategory: "СНТ",
      buildYear: 2026,
      wallMaterial: "Газоблок Gras 300 мм + кирпич",
      bathroom: "2 санузла",
      repair: "Под вашу отделку",
      electricity: "Подключено",
      water: "Скважина",
      gas: "Планируется",
      sewage: "Выгребная яма 4,5 м",
      parking: "Гараж 40 м²",
      road: "Новая дорога до города",
      infrastructure: ["Магнит", "Строительные магазины", "Остановка"],
      mortgage: true,
      familyMortgage: true,
      distanceToCenter: "5–7 мин на авто",
      terrace: "—",
    },
    featured: true,
    builder: "Кров-Сервис",
  },
];

export function getHouseById(id: number): House | undefined {
  return realHouses.find((h) => h.id === id);
}

export function getHousesByCity(city: string): House[] {
  return realHouses.filter((h) => h.city === city);
}

export function getFeaturedHouses(): House[] {
  return realHouses.filter((h) => h.featured);
}

export function getMinHousePrice(): number {
  if (realHouses.length === 0) return 0;
  return Math.min(...realHouses.map((h) => h.price));
}
