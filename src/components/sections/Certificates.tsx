import { certificatesData } from "@/data/site";
import { Award, CheckCircle2 } from "lucide-react";

export function Certificates() {
  return (
    <section className="section-padding bg-background">
      <div className="container-main">
        <div className="mb-8 flex items-center gap-3 sm:mb-10">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-light">
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="section-title">Сертификаты и документы</h2>
            <p className="mt-1 text-sm text-gray">
              Работаем официально, все документы в порядке
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              className="rounded-card border border-border bg-white p-5 shadow-card sm:p-6"
            >
              <CheckCircle2 className="mb-3 h-8 w-8 text-primary" />
              <h3 className="font-semibold text-dark">{cert.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray">
                {cert.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
