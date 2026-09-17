export type FormSuccessPayload = {
  title?: string;
  description?: string;
};

type Listener = (payload: FormSuccessPayload) => void;

const listeners = new Set<Listener>();

/** Показать глобальное уведомление об успешной отправке формы. */
export function notifyFormSuccess(payload: FormSuccessPayload = {}) {
  if (typeof window === "undefined") return;
  listeners.forEach((fn) => fn(payload));
}

export function subscribeFormSuccess(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function messageForLeadType(type?: string): FormSuccessPayload {
  switch (type) {
    case "callback":
      return {
        title: "Заявка отправлена",
        description: "Мы перезвоним и ответим на ваш вопрос.",
      };
    case "waitlist":
      return {
        title: "Заявку приняли",
        description: "Напишем, когда появится дом под ваши параметры.",
      };
    case "viewing":
      return {
        title: "Заявка отправлена",
        description: "Свяжемся с вами, чтобы согласовать просмотр.",
      };
    default:
      return {
        title: "Форма отправлена",
        description: "Мы свяжемся с вами в ближайшее время.",
      };
  }
}
