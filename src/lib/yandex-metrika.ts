export const YANDEX_METRIKA_ID = 111093512;

type YmFn = ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };

declare global {
  interface Window {
    ym?: YmFn;
    __ymBooted?: boolean;
    dataLayer?: unknown[];
  }
}

/** Inline boot for <head>: runs only after cookie consent = accepted. */
export const yandexMetrikaEarlyScript = `
(function(){
  try {
    var raw = localStorage.getItem("cookie-consent-v1");
    if (!raw) return;
    var c = JSON.parse(raw);
    if (!c || c.value !== "accepted") return;
  } catch (e) { return; }
  if (window.__ymBooted) return;
  window.__ymBooted = true;
  (function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
  })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}', 'ym');
  ym(${YANDEX_METRIKA_ID}, 'init', {ssr:true, webvisor:false, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
})();
`.trim();

export function bootYandexMetrika(): void {
  if (typeof window === "undefined" || window.__ymBooted) return;
  window.__ymBooted = true;

  const src = `https://mc.yandex.ru/metrika/tag.js?id=${YANDEX_METRIKA_ID}`;

  if (!window.ym) {
    const queue: unknown[] = [];
    const stub = ((...args: unknown[]) => {
      queue.push(args);
    }) as YmFn;
    stub.a = queue;
    stub.l = Date.now();
    window.ym = stub;
  } else {
    window.ym.l = Date.now();
  }

  const already = Array.from(document.scripts).some((s) => s.src === src);
  if (!already) {
    const k = document.createElement("script");
    const a = document.getElementsByTagName("script")[0];
    k.async = true;
    k.src = src;
    a?.parentNode?.insertBefore(k, a);
  }

  window.ym(YANDEX_METRIKA_ID, "init", {
    ssr: true,
    webvisor: false,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}
