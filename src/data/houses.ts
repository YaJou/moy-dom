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
  repair: "Требует ремонта",
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
      "Газ по границе участка",
      "Скважина и канализация включены",
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
      "Газ по границе участка",
    ],
    specs: {
      ...baseSpecs,
      terrace: "Терраса 15 м²",
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
