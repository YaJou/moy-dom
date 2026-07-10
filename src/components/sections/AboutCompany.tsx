import { aboutCompanyData } from "@/data/homepage";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const aboutImage =
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80";

export function AboutCompany() {
  return (
    <section className="section-padding bg-white">
      <div className="container-main">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[16/10] overflow-hidden rounded-card shadow-card lg:aspect-[4/3]">
            <Image
              src={aboutImage}
              alt={aboutCompanyData.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2 className="section-title">{aboutCompanyData.title}</h2>
            <ul className="mt-6 space-y-3">
              {aboutCompanyData.points.map((point) => (
                <li key={point} className="flex items-start gap-2.5 text-sm text-dark sm:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-gray sm:text-base">
              {aboutCompanyData.text}
            </p>
            <Button asChild className="mt-6 rounded-xl">
              <Link href={aboutCompanyData.href}>
                Подробнее о компании
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
