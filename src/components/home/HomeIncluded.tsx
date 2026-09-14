import { includedItems } from "@/data/home-nav";
import { realHouses } from "@/data/houses";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function IconFaucet({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M8 4V8M12 4V8M5 8H16C17.6569 8 19 9.34315 19 11V13H17.5C16.6716 13 16 13.6716 16 14.5V16.5C16 18.433 14.433 20 12.5 20H12C10.3431 20 9 18.6569 9 17V14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 8C5 8 4 9.5 4 11.5C4 13 5 14 5 14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconRoller({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="5"
        y="3"
        width="12"
        height="5"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M17 5.5H19C19.5523 5.5 20 5.94772 20 6.5V9C20 9.55228 19.5523 10 19 10H12C11.4477 10 11 10.4477 11 11V14"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 14V20"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconClipboard({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 4H8C6.89543 4 6 4.89543 6 6V19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19V6C18 4.89543 17.1046 4 16 4H15"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <rect
        x="9"
        y="2.5"
        width="6"
        height="3"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M9 11H15M9 15H13"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconHouseThin({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4L20 10.5V19C20 19.5523 19.5523 20 19 20H14V14H10V20H5C4.44772 20 4 19.5523 4 19V10.5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const includedIcons: Record<string, ReactNode> = {
  house: <IconHouseThin className="h-6 w-6" />,
  plug: <IconFaucet className="h-6 w-6" />,
  paint: <IconRoller className="h-6 w-6" />,
  key: <IconClipboard className="h-6 w-6" />,
};

export function HomeIncluded() {
  const sampleHouse =
    realHouses.find((h) => h.slug === "balakovo-novonatalino-100") ??
    realHouses[0];

  return (
    <section className="included-section">
      <div className="container-main">
        <p className="section-eyebrow">Без непонятных формулировок</p>
        <h2 className="h2-desktop mt-3 font-extrabold text-text">
          Что вы получаете вместе с домом
        </h2>

        <div className="included-grid mt-8">
          <div className="included-photo relative overflow-hidden">
            <Image
              src="/images/design-kit/07-pre-finish-interior.png"
              alt="Предчистовая отделка дома"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 588px"
            />
          </div>

          <div className="included-list">
            {includedItems.map((item) => (
              <div key={item.title} className="included-row">
                <span className="included-row-icon">
                  {includedIcons[item.icon]}
                </span>
                <p className="included-row-title">{item.title}</p>
                <p className="included-row-desc">{item.description}</p>
              </div>
            ))}
            <Link
              href={`/catalog/${sampleHouse.id}#included`}
              className="included-link"
            >
              Посмотреть комплектацию →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
