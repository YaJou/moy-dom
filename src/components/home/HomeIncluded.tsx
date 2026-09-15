import { includedItems } from "@/data/home-nav";
import { realHouses } from "@/data/houses";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  Icon,
  IconChevronDown,
  IconClipboard,
  IconFaucet,
  IconHouse,
} from "./icons";

const includedIcons: Record<string, ReactNode> = {
  house: <IconHouse className="h-6 w-6" />,
  plug: <IconFaucet className="h-6 w-6" />,
  paint: <Icon name="brick-wall" className="h-6 w-6" />,
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
              src="/images/design-kit/07-pre-finish-interior.jpg"
              alt="Предчистовая отделка дома"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 588px"
            />
          </div>

          <div className="included-list">
            {includedItems.map((item) => (
              <details key={item.title} className="included-item group">
                <summary className="included-row">
                  <span className="included-row-icon">
                    {includedIcons[item.icon]}
                  </span>
                  <p className="included-row-title">{item.title}</p>
                  <p className="included-row-desc">{item.description}</p>
                  <span className="included-row-chevron" aria-hidden>
                    <IconChevronDown className="h-4 w-4" />
                  </span>
                </summary>
                <div className="included-row-body">
                  <ul>
                    {item.details.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              </details>
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
