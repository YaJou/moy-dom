export type LeadIntent = "viewing" | "callback";

export interface LeadTopic {
  id: string;
  label: string;
  /** Нужно выбрать дом */
  needsHouse: boolean;
}

/** Темы для «Обратный звонок» */
export const CALLBACK_TOPICS: LeadTopic[] = [
  {
    id: "house-questions",
    label: "Вопросы по конкретному дому",
    needsHouse: true,
  },
  {
    id: "book-viewing",
    label: "Хочу записаться на просмотр",
    needsHouse: true,
  },
  {
    id: "pick-budget",
    label: "Подбор дома под бюджет",
    needsHouse: false,
  },
  {
    id: "mortgage",
    label: "Ипотека и первоначальный взнос",
    needsHouse: false,
  },
  {
    id: "plot-comms",
    label: "Участок и коммуникации",
    needsHouse: false,
  },
  {
    id: "timeline",
    label: "Сроки сдачи и ход строительства",
    needsHouse: false,
  },
  {
    id: "other",
    label: "Другой вопрос",
    needsHouse: false,
  },
];

export function getCallbackTopic(id: string | undefined): LeadTopic | undefined {
  if (!id) return undefined;
  return CALLBACK_TOPICS.find((t) => t.id === id);
}

export function topicNeedsHouse(topicId: string | undefined): boolean {
  return Boolean(getCallbackTopic(topicId)?.needsHouse);
}
