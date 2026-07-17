import { getHousesByCity, getMinHousePrice } from "@/data/houses";

export type CitySlug = "saratov" | "engels" | "balakovo";

export interface CityLandingContent {
  slug: CitySlug;
  city: string;
  title: string;
  titleCities: string;
  subtitle: string;
  seoTitle: string;
  seoDescription: string;
  seoIntroTitle: string;
  seoIntroParagraphs: string[];
  heroImage: string;
  heroImageAlt: string;
  catalogHref: string;
  districtsNote: string;
}

export const cityLandings: Record<CitySlug, CityLandingContent> = {
  saratov: {
    slug: "saratov",
    city: "Саратов",
    title: "Готовые частные дома",
    titleCities: "в Саратове",
    subtitle: "с участком, газом и предчистовой отделкой",
    seoTitle: "Купить дом в Саратове от застройщика | Кров-Сервис",
    seoDescription:
      "Готовые частные дома в Саратове и области. Участок, коммуникации, ипотека и рассрочка. Просмотр и консультация — Кров-Сервис, Энгельс.",
    seoIntroTitle: "Готовые дома в Саратове от застройщика",
    seoIntroParagraphs: [
      "Строим и продаём частные дома в Саратове и ближайших посёлках: с участком, инженерией и понятной комплектацией. Помогаем с ипотекой и рассрочкой, организуем просмотр в удобное время.",
      "В каталоге — одноэтажные и двухэтажные дома под семейную ипотеку. Каждый объект с планировкой, характеристиками и сопровождением сделки от «Кров-Сервис».",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    heroImageAlt: "Частный дом в Саратове от Кров-Сервис",
    catalogHref: "/catalog/saratov",
    districtsNote: "Саратов и пригороды",
  },
  engels: {
    slug: "engels",
    city: "Энгельс",
    title: "Готовые частные дома",
    titleCities: "в Энгельсе",
    subtitle: "СНТ «Новое», «Малинки» — участок и коммуникации в цене",
    seoTitle: "Купить дом в Энгельсе от застройщика | Кров-Сервис",
    seoDescription:
      "Готовые дома в Энгельсе: СНТ «Новое» и «Малинки». Участок 10 соток, гараж, ипотека и рассрочка. Кров-Сервис, Пристанская 70.",
    seoIntroTitle: "Готовые дома в Энгельсе от застройщика",
    seoIntroParagraphs: [
      "Продаём дома в развивающихся посёлках Энгельса — СНТ «Новое» и СНТ «Малинки». Участок входит в стоимость, есть варианты с гаражом и мансардой. До города — несколько минут на авто.",
      "Рассрочка через эскроу, семейная ипотека, аккредитация в крупных банках. Офис «Кров-Сервис» — г. Энгельс, Пристанская, 70. Покажем объект и рассчитаем платёж на месте.",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    heroImageAlt: "Частный дом в Энгельсе от Кров-Сервис",
    catalogHref: "/catalog/engels",
    districtsNote: "СНТ «Новое», СНТ «Малинки»",
  },
  balakovo: {
    slug: "balakovo",
    city: "Балаково",
    title: "Готовые частные дома",
    titleCities: "в Балаково",
    subtitle: "с. Натальино — участок 10 соток, газ по границе, ипотека",
    seoTitle: "Купить дом в Балаково от застройщика | Кров-Сервис",
    seoDescription:
      "Готовые дома в Балаково и с. Натальино. Участок 10 соток, газ по границе, семейная ипотека. Кров-Сервис.",
    seoIntroTitle: "Готовые дома в Балаково и с. Натальино",
    seoIntroParagraphs: [
      "Одноэтажные дома в активно развивающемся посёлке Натальино — около 10 км от Балаково. Участки 10 соток, асфальтированный подъезд, школа и магазины рядом.",
      "Газ по границе участка, скважина и канализация в цене. Подходит под семейную ипотеку. Организуем просмотр и поможем с одобрением в банке.",
    ],
    heroImage:
      "https://images.unsplash.com/photo-1600047509807-ba8b3c1d5f0b?w=1920&q=80",
    heroImageAlt: "Частный дом в Балаково, с. Натальино",
    catalogHref: "/catalog/balakovo",
    districtsNote: "с. Натальино",
  },
};

export function getCityLanding(slug: CitySlug): CityLandingContent {
  return cityLandings[slug];
}

export function getCityMinPrice(city: string): number {
  const houses = getHousesByCity(city);
  if (houses.length === 0) return getMinHousePrice();
  return Math.min(...houses.map((h) => h.price));
}

export function getCityLandingByName(city: string): CityLandingContent | undefined {
  return Object.values(cityLandings).find((c) => c.city === city);
}
