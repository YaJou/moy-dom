import { siteConfig } from "@/data/site";
import Image from "next/image";
import Link from "next/link";

export function HouseQuestionsCTA() {
  return (
    <section className="mt-10 rounded-card border border-border bg-background p-5 sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
          <Image
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80"
            alt="Менеджер"
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-dark sm:text-xl">
            Остались вопросы?
          </h2>
          <p className="mt-1 text-sm text-gray">
            Ответим в течение 10 минут — без навязчивых звонков
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={`tel:${siteConfig.phone.replace(/\D/g, "")}`}
              className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-xl border border-[#25D366] px-4 text-sm font-semibold text-[#25D366] hover:bg-[#25D366]/5"
            >
              WhatsApp
            </a>
            <a
              href={siteConfig.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-xl border border-[#0088cc] px-4 text-sm font-semibold text-[#0088cc] hover:bg-[#0088cc]/5"
            >
              Telegram
            </a>
          </div>
        </div>
        <Link
          href="/#consultation"
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          Или оставьте заявку →
        </Link>
      </div>
    </section>
  );
}
