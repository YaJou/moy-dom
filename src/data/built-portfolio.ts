/**
 * Временные иллюстрации для /built/.
 * Не являются реальными объектами Кров-Сервис.
 * Заменяйте файлы в public/images/built-portfolio/ на фото с объектов.
 */

export type PortfolioImageKind = "illustration" | "photo";

export type PortfolioImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  imageKind: PortfolioImageKind;
  caption?: string;
};

const ILLUSTRATION_CAPTION = "Временная иллюстрация";

function ill(
  file: string,
  alt: string,
  width = 1600,
  height = 1067
): PortfolioImage {
  return {
    src: `/images/built-portfolio/${file}`,
    alt,
    width,
    height,
    imageKind: "illustration",
    caption: ILLUSTRATION_CAPTION,
  };
}

/** Соответствие файлов блокам страницы — менять здесь при замене на реальные фото. */
export const builtPortfolioAssets = {
  hero: ill(
    "01-hero-house.jpg",
    "Иллюстрация одноэтажного частного дома с участком"
  ),
  galleryFacades: [
    ill("02-house-light-brick.jpg", "Иллюстрация фасада со светлым кирпичом"),
    ill("03-house-red-brick.jpg", "Иллюстрация фасада с красным кирпичом"),
    ill("04-house-graphite-brick.jpg", "Иллюстрация фасада с тёмным кирпичом"),
    ill("05-house-terrace.jpg", "Иллюстрация дома с террасой"),
  ],
  storyCover: ill(
    "05-house-terrace.jpg",
    "Иллюстрация готового дома с террасой для блока о строительстве"
  ),
  details: [
    {
      id: "foundation",
      title: "Фундамент",
      text: "На объектах — монолитная лента с армированием. На фото — иллюстрация типичного этапа, не конкретный адрес.",
      image: ill(
        "06-foundation-overview.jpg",
        "Иллюстрация ленточного фундамента"
      ),
    },
    {
      id: "rebar",
      title: "Армирование",
      text: "Каркас из арматуры перед заливкой бетона — на что смотреть при приёмке основания.",
      image: ill(
        "07-foundation-rebar.jpg",
        "Иллюстрация армирования фундамента"
      ),
    },
    {
      id: "brickwork",
      title: "Кладка",
      text: "Стены из газоблока с облицовочным кирпичом — так выглядит кладка до чистовой отделки фасада.",
      image: ill("08-brickwork.jpg", "Иллюстрация кирпичной кладки"),
    },
    {
      id: "roof",
      title: "Кровля",
      text: "Стропильная система под гибкую черепицу. Конструкция и материалы уточняйте в карточке дома.",
      image: ill("09-roof-frame.jpg", "Иллюстрация стропильной конструкции"),
    },
    {
      id: "heating",
      title: "Инженерные системы",
      text: "Тёплый пол и подготовка под отопление — типичный этап до чистовой отделки.",
      image: ill(
        "10-underfloor-heating.jpg",
        "Иллюстрация монтажа тёплого пола"
      ),
    },
    {
      id: "utility",
      title: "Котельная",
      text: "Место под оборудование и вводы коммуникаций. Состав зависит от объекта.",
      image: ill("11-utility-room.jpg", "Иллюстрация технического помещения"),
    },
    {
      id: "electrical",
      title: "Электрика",
      text: "Разводка под розетки и щит — этап, который удобно проверить на просмотре.",
      image: ill(
        "12-electrical-installation.jpg",
        "Иллюстрация электромонтажа"
      ),
    },
    {
      id: "prefinish",
      title: "Отделка",
      text: "Предчистовое состояние: стены, пол, окна. Чистовую отделку покупатель делает сам.",
      image: ill(
        "13-pre-finish-room.jpg",
        "Иллюстрация помещения в предчистовой отделке"
      ),
    },
  ],
  stages: [
    {
      id: "start",
      tab: "Начало работ",
      title: "Подготовка и фундамент",
      text: "Иллюстрация типичного старта: котлован и основание. Не хронология одного адреса.",
      image: ill(
        "06-foundation-overview.jpg",
        "Иллюстрация начала работ — фундамент"
      ),
    },
    {
      id: "walls",
      tab: "Стены",
      title: "Кладка стен",
      text: "Газоблок и облицовочный кирпич — так выглядит коробка до кровли.",
      image: ill("08-brickwork.jpg", "Иллюстрация кладки стен"),
    },
    {
      id: "roof",
      tab: "Кровля",
      title: "Стропила и кровля",
      text: "Каркас под гибкую черепицу Технониколь на наших объектах.",
      image: ill("09-roof-frame.jpg", "Иллюстрация кровельного каркаса"),
    },
    {
      id: "finish",
      tab: "Готовый дом",
      title: "Результат для просмотра",
      text: "Фасад и участок в состоянии «под вашу отделку» / черновая — смотрите актуальный объект в каталоге.",
      image: ill(
        "01-hero-house.jpg",
        "Иллюстрация готового частного дома"
      ),
    },
  ],
  viewing: ill(
    "14-viewing-house.jpg",
    "Иллюстрация дома для блока записи на просмотр"
  ),
} as const;

export const builtPortfolioStats = [
  { value: "320+", label: "домов построено" },
  { value: "15", label: "лет на рынке" },
  { value: "Энгельс · Саратов · Балаково", label: "география" },
];

/** Дом для подробного рассказа — реальные фото из каталога. */
export const builtStoryHouseId = 2;
