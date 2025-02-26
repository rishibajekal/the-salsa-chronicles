import { type Metadata } from "next";

import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";

import {
  reviewDocumentToReviewPreviewProps,
  ReviewPreview,
} from "@/components/ReviewPreview";

export default async function Home() {
  const client = createClient();

  const reviewPage = await client.getByUID("page", "reviews");

  const reviews = await client.getAllByType("review", {
    orderings: [{ field: "my.review.review_date", direction: "desc" }],
  });

  return (
    <>
      <h1 className="text-4xl font-bold">{reviewPage.data.title}</h1>

      <div className="grid grid-cols-1 gap-8 max-w-3xl w-full">
        <SliceZone slices={reviewPage.data.slices} components={components} />

        <section className="flex flex-col">
          {!reviews.length ? (
            <p className="font-semibold self-center">No reviews yet!</p>
          ) : (
            reviews.map((review) => (
              <ReviewPreview
                key={review.uid}
                {...reviewDocumentToReviewPreviewProps(review)}
              />
            ))
          )}
        </section>
      </div>
    </>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const home = await client.getByUID("page", "reviews");

  return {
    title: home.data.title,
    description: home.data.meta_description,
    openGraph: {
      title: home.data.meta_title ?? undefined,
      images: [{ url: home.data.meta_image.url ?? "" }],
    },
  };
}
