import { ViewingChecklistInteractive } from "@/components/blog/ViewingChecklistInteractive";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { viewingChecklistIntro } from "@/data/blog/viewing-checklist";
import { buildPageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = buildPageMetadata({
  title: viewingChecklistIntro.title,
  description: viewingChecklistIntro.description,
  path: "/blog/checklist/",
});

export default function ViewingChecklistPage() {
  return (
    <>
      <Breadcrumb
        items={[
          { label: "Главная", href: "/" },
          { label: "Статьи", href: "/blog/" },
          { label: "Чек-лист просмотра" },
        ]}
      />
      <section className="section-padding bg-white">
        <div className="container-main max-w-3xl">
          <ViewingChecklistInteractive />
        </div>
      </section>
    </>
  );
}
