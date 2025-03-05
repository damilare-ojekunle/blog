import { notFound } from "next/navigation";
import { getNewsItem } from "@/lib/news";

import ModalBackup from "@/components/modal-backup";

export default async function InterceptedImagePage({ params }) {
  const newsSlug = params.slug;
  const newsItem = await getNewsItem(newsSlug);
  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackup />
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </div>
      </dialog>
    </>
  );
}
