"use client";

import { useState } from "react";
import Link from "next/link";
import {
  viewingChecklistIntro,
  viewingChecklistSections,
} from "@/data/blog/viewing-checklist";
import { cn } from "@/lib/utils";

export function ViewingChecklistInteractive() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggle = (key: string) =>
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));

  const printPage = () => window.print();

  return (
    <div className="blog-check-page">
      <header className="blog-check-page-head">
        <h1>{viewingChecklistIntro.title}</h1>
        <p>{viewingChecklistIntro.description}</p>
        <div className="blog-check-page-actions">
          <a
            href={viewingChecklistIntro.pdfHref}
            className="btn-primary"
            download
          >
            Скачать PDF
          </a>
          <button type="button" className="btn-secondary" onClick={printPage}>
            Распечатать
          </button>
          <Link href="/blog/" className="blog-check-back">
            ← К статьям
          </Link>
        </div>
      </header>

      <div className="blog-check-sections">
        {viewingChecklistSections.map((section) => (
          <section key={section.id} className="blog-check-section" id={section.id}>
            <h2>{section.title}</h2>
            <ul>
              {section.items.map((item, index) => {
                const key = `${section.id}-${index}`;
                return (
                  <li key={key}>
                    <label className={cn(checked[key] && "is-done")}>
                      <input
                        type="checkbox"
                        checked={Boolean(checked[key])}
                        onChange={() => toggle(key)}
                      />
                      <span>{item}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      <p className="blog-check-note">
        Список для самостоятельной подготовки к просмотру. Он не заменяет
        техническую экспертизу и проверку документов.
      </p>
    </div>
  );
}
