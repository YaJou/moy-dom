type AnalyticsParams = Record<string, string | number | boolean | undefined>;

export function trackEvent(
  eventName: string,
  params?: AnalyticsParams
): void {
  if (typeof window === "undefined") return;

  const payload = { event: eventName, ...params };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);

  if (typeof window.ym === "function") {
    window.ym(111093512, "reachGoal", eventName, params);
  }
}

export const analytics = {
  viewItem: (id: number, name: string) =>
    trackEvent("view_item", { item_id: id, item_name: name }),
  selectItem: (id: number, name: string) =>
    trackEvent("select_item", { item_id: id, item_name: name }),
  filterApply: (filters: string) =>
    trackEvent("filter_apply", { filters }),
  planOpen: (houseId: number) =>
    trackEvent("plan_open", { house_id: houseId }),
  compareAdd: (houseId: number) =>
    trackEvent("compare_add", { house_id: houseId }),
  contactClick: (channel: string) =>
    trackEvent("contact_click", { channel }),
  viewingFormOpen: (source: string) =>
    trackEvent("viewing_form_open", { source }),
  leadSuccess: (formType: string) =>
    trackEvent("lead_success", { form_type: formType }),
  leadError: (formType: string, reason: string) =>
    trackEvent("lead_error", { form_type: formType, reason }),
};
