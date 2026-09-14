export function IconHouse({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3 8.5L10 2.5L17 8.5V16.5C17 17.0523 16.5523 17.5 16 17.5H12.5V12.5H7.5V17.5H4C3.44772 17.5 3 17.0523 3 16.5V8.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconArrow({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M4 10H16M16 10L11 5M16 10L11 15"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconMapPin({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 1.5C5.51472 1.5 3.5 3.51472 3.5 6C3.5 9.5 8 14.5 8 14.5C8 14.5 12.5 9.5 12.5 6C12.5 3.51472 10.4853 1.5 8 1.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function IconLeaf({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M17 3C11 3 6 6 3 11C6 9 9 8.5 12 9C11 12 8 15 3 17C8 14 13 11 17 3Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCamera({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M3 6.5H5.5L7 4.5H13L14.5 6.5H17C17.5523 6.5 18 6.94772 18 7.5V15.5C18 16.0523 17.5523 16.5 17 16.5H3C2.44772 16.5 2 16.0523 2 15.5V7.5C2 6.94772 2.44772 6.5 3 6.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="10" cy="11" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function IconEye({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M2 10C2 10 5 4 10 4C15 4 18 10 18 10C18 10 15 16 10 16C5 16 2 10 2 10Z"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  );
}

export function IconPlus({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M10 4V16M4 10H16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function IconCompare({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path d="M6 4V16M14 4V16M3 10H17" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function IconHeart({ className = "h-5 w-5", filled = false }: { className?: string; filled?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill={filled ? "currentColor" : "none"} aria-hidden>
      <path
        d="M10 16.5L8.55 15.15C4.4 11.36 2 9.08 2 6.25C2 4.17893 3.67893 2.5 5.75 2.5C6.98 2.5 8.16 3.115 9 4.02C9.84 3.115 11.02 2.5 12.25 2.5C14.3211 2.5 16 4.17893 16 6.25C16 9.08 13.6 11.36 9.45 15.15L10 16.5Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTelegram({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm4.635 6.801c-.16 1.697-.858 5.835-1.212 7.745-.15.802-.446 1.07-.732 1.097-.624.058-1.098-.412-1.702-.807-.946-.621-1.482-1.006-2.397-1.611-1.06-.699-.373-1.084.231-1.712.158-.165 2.909-2.665 2.962-2.891.007-.028.013-.134-.05-.19-.064-.055-.158-.036-.226-.021-.097.022-1.639 1.042-4.628 3.058-.438.3-.834.446-1.19.44-.392-.008-1.146-.221-1.706-.403-.688-.223-1.234-.341-1.186-.72.024-.198.297-.4.818-.607 3.203-1.395 5.338-2.317 6.407-2.766 3.05-1.268 3.682-1.489 4.095-1.497.091-.002.295.021.427.128.111.092.142.216.157.303.014.087.032.286.018.441z" />
    </svg>
  );
}
