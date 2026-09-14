import { includedItems } from "@/data/home-nav";
import { realHouses } from "@/data/houses";
import Image from "next/image";
import Link from "next/link";
import { IconArrow, IconHouse } from "./icons";

const includedIcons: Record<string, React.ReactNode> = {
  house: <IconHouse className="h-6 w-6 text-forest" />,
  plug: (
    <svg className="h-6 w-6 text-forest" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2V8M8 5H16M6 10H18V14C18 17.3137 15.3137 20 12 20C8.68629 20 6 17.3137 6 14V10Z" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  ),
  paint: (
    <svg className="h-6 w-6 text-forest" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 20H20M6 16L14 4L20 10L12 20H6V16Z" stroke="currentColor" strokeWidth="1.75" strokeLinejoin="round" />
    </svg>
  ),
  key: (
    <svg className="h-6 w-6 text-forest" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15.5 7.5C16.8807 8.88071 16.8807 11.1193 15.5 12.5L9 19H6V16L12.5 9.5C13.8807 8.11929 16.1193 8.11929 17.5 9.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  ),
};

export function HomeIncluded() {
  const sampleHouse = realHouses.find((h) => h.slug === "balakovo-novonatalino-100") ?? realHouses[0];
  const photo =
    sampleHouse.images.find((img) => /0[7-9]|10/.test(img.split("/").pop() ?? "")) ??
    sampleHouse.images[0];

  return (
    <section className="bg-surface py-12">
      <div className="container-main">
        <p className="section-eyebrow">Комплектация дома</p>
        <h2 className="h2-desktop mt-3 text-text">
          Что вы получаете вместе с домом
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="relative h-[240px] overflow-hidden rounded-image sm:h-[320px]">
            <Image
              src={photo}
              alt="Инженерные работы и предчистовая отделка"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 588px"
            />
          </div>
          <div>
            {includedItems.map((item) => (
              <div
                key={item.title}
                className="flex min-h-[72px] gap-3 border-b border-border py-4 first:pt-0"
              >
                <div className="mt-0.5 shrink-0">{includedIcons[item.icon]}</div>
                <div>
                  <p className="text-base font-semibold leading-6 text-text">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm text-muted">{item.description}</p>
                </div>
              </div>
            ))}
            <Link
              href={`/catalog/${sampleHouse.id}#included`}
              className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-text hover:text-orange"
            >
              Посмотреть комплектацию
              <IconArrow className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
