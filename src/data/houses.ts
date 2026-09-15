import type { House } from "@/types/house";
import { sortByCityPriority } from "@/lib/cities";

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

export const realHousesUnsorted: House[] = [
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
    slug: "balakovo-novonatalino-100",
    title: "Дом 100 м² на участке 7,5 сот.",
    city: "Балаково",
    district: "с. Натальино, Новонатальино",
    address:
      "Саратовская обл., Балаковский р-н, с. Натальино, Новонатальино",
    price: 7_190_000,
    area: 100,
    land: 7.5,
    rooms: 4,
    image: "/images/houses/balakovo-novonatalino-100/02.jpg",
    images: imgs("balakovo-novonatalino-100", 16),
    badge: "new",
    readiness: "building",
    lat: 52.048118,
    lng: 47.92124,
    mapUrl: "https://yandex.ru/maps/?ll=47.921240%2C52.048118&z=16",
    shortDescription:
      "Дом 100 м² в с. Натальино, Новонатальино: 3 спальни, 2 санузла, кухня-гостиная с террасой, участок 7,5 соток, скважина и выгребная яма.",
    description:
      "Продаётся одноэтажный дом 100 м² в посёлке Новонатальино (с. Натальино, Балаковский район). Планировка: 3 спальни, 2 санузла, кухня-гостиная с выходом на террасу. Участок 7,5 соток со скважиной и выгребной ямой. Стены — газоблок с облицовочным кирпичом, кровля из гибкой черепицы, пластиковые окна. Газ по границе участка, асфальтированный подъезд. Подходит под семейную ипотеку.",
    highlights: [
      "Новонатальино, ~10 км от Балаково",
      "3 спальни, 2 санузла",
      "Кухня-гостиная с террасой",
      "Участок 7,5 соток",
      "Скважина и выгребная яма",
    ],
    specs: {
      floors: 1,
      landCategory: "ЛПХ",
      buildYear: 2026,
      wallMaterial: "Газоблок + облицовочный кирпич",
      bathroom: "2 санузла",
      repair: "Под вашу отделку",
      electricity: "Подключено",
      water: "Скважина",
      gas: "По границе участка",
      sewage: "Выгребная яма",
      parking: "Парковочное место",
      road: "Асфальтированная дорога",
      infrastructure: ["Школа", "Магазин", "Аптека", "Остановка"],
      mortgage: true,
      familyMortgage: true,
      distanceToCenter: "10 км",
      terrace: "С выходом на террасу",
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
    slug: "engels-snt-novoe-veselaya-116",
    title: "Дом 116 м² на участке 8 сот.",
    city: "Энгельс",
    district: 'СНТ «Новое»',
    address:
      "Саратовская обл., г. Энгельс, СНТ «Новое», ул. Весёлая",
    price: 7_290_000,
    area: 116,
    land: 8,
    rooms: 4,
    image: "/images/houses/engels-snt-novoe-veselaya-116/02.jpg",
    images: imgs("engels-snt-novoe-veselaya-116", 7),
    badge: "new",
    readiness: "building",
    lat: 51.4509,
    lng: 46.1701,
    mapUrl: "https://yandex.ru/maps/?ll=46.170100%2C51.450900&z=16",
    shortDescription:
      "Дом 116 м² в СНТ «Новое», ул. Весёлая: 3 спальни, 2 санузла, участок 8 соток, скважина, выгребная яма, 3 мин до магазина и 6 мин до садика.",
    description:
      "Продаётся одноэтажный дом 116 м² в СНТ «Новое» (г. Энгельс), ул. Весёлая. Планировка: 3 спальни, кухня-гостиная с выходом на террасу, 2 санузла. Участок 8 соток со скважиной и выгребной ямой. До детского сада — 6 минут, до магазина — 3 минуты. На въезде на улицу — автоматические ворота, удобный проезд зимой и летом. Подходит под семейную ипотеку.",
    highlights: [
      "Ул. Весёлая, СНТ «Новое»",
      "3 мин до магазина, 6 мин до садика",
      "Автоматические ворота на въезде",
      "Участок 8 соток",
      "Скважина и выгребная яма",
    ],
    specs: {
      floors: 1,
      landCategory: "СНТ",
      buildYear: 2026,
      wallMaterial: "Газоблок + облицовочный кирпич",
      bathroom: "2 санузла",
      repair: "Под вашу отделку",
      electricity: "Подключено",
      water: "Скважина",
      gas: "Планируется",
      sewage: "Выгребная яма",
      parking: "Парковочное место",
      road: "Удобный проезд зимой и летом",
      infrastructure: ["Детский сад рядом", "Магазин рядом", "Автоматические ворота"],
      mortgage: true,
      familyMortgage: true,
      distanceToCenter: "10–15 мин на авто",
      terrace: "С выходом на террасу",
    },
    featured: true,
    builder: "Кров-Сервис",
  },
  {
    id: 7,
    slug: "engels-snt-malinki-pokrovskoye-87",
    title: "Дом 87 м² на участке 7,5 сот.",
    city: "Энгельс",
    district: 'СНТ «Малинки»',
    address:
      "Саратовская обл., г. Энгельс, СНТ «Малинки», ул. Покровское Заречье",
    price: 6_200_000,
    area: 87,
    land: 7.5,
    rooms: 3,
    image: "/images/houses/engels-snt-malinki-pokrovskoye-87/02.jpg",
    images: imgs("engels-snt-malinki-pokrovskoye-87", 16),
    badge: "new",
    readiness: "building",
    lat: 51.4621,
    lng: 46.1558,
    mapUrl: "https://yandex.ru/maps/?ll=46.155800%2C51.462100&z=16",
    shortDescription:
      "Дом 87 м² в СНТ «Малинки», ул. Покровское Заречье: 2 спальни по 16 м², кухня-гостиная 33 м² с выходом на террасу, с/у 7 м², участок 7,5 соток, скважина и выгребная яма.",
    description:
      "Продаётся одноэтажный дом 87 м² в СНТ «Малинки» (г. Энгельс), ул. Покровское Заречье. Планировка: 2 спальни по 16 м², кухня-гостиная 33 м² с выходом на террасу, санузел 7 м². Участок 7,5 соток: скважина и выгребная яма. Подходит под семейную ипотеку.",
    highlights: [
      "Кухня-гостиная 33 м² с выходом на террасу",
      "2 спальни по 16 м²",
      "Санузел 7 м²",
      "Участок 7,5 соток",
      "Скважина и выгребная яма",
    ],
    specs: {
      floors: 1,
      landCategory: "СНТ",
      buildYear: 2026,
      wallMaterial: "Газоблок + облицовочный кирпич",
      bathroom: "1 санузел 7 м²",
      repair: "Под вашу отделку",
      electricity: "Подключено",
      water: "Скважина",
      gas: "Планируется",
      sewage: "Выгребная яма",
      parking: "Парковочное место",
      road: "Новая дорога до города",
      infrastructure: ["Магнит", "Остановка", "Строительные магазины"],
      mortgage: true,
      familyMortgage: true,
      distanceToCenter: "5–7 мин на авто",
      terrace: "С выходом на террасу",
    },
    featured: true,
    builder: "Кров-Сервис",
  },
];

/** Дома: сначала Энгельс, затем Саратов и Балаково. */
export const realHouses: House[] = sortByCityPriority(realHousesUnsorted);

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
