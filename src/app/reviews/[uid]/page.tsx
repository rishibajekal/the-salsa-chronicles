import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asText, isFilled } from "@prismicio/client";
import { RichText } from "@/components/RichText";
import { PrismicNextImage } from "@prismicio/next";

type Params = { uid: string };

export default async function Review({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const review = await client.getByUID("review", uid).catch(() => notFound());

  return (
    <>
      <div className="max-w-[85rem] mx-auto">
        <div className="self-center lg:gap-y-8 xl:gap-y-12 lg:items-center">
          <div className="lg:col-span-3">
            <h1 className="block justify-self-center text-2xl text-gray-800 sm:text-2xl md:text-4xl lg:text-5xl dark:text-white">
              <span className="font-bold">{review.data.product_name}</span>
            </h1>
            <div className="justify-self-center max-w-10/12 lg:col-span-4 mt-10">
              <PrismicNextImage field={review.data.product_image} />
            </div>
            <ul className="mt-8 text-l text-gray-800 dark:text-neutral-400 sm:text-l md:text-xl lg:text-2xl">
              <li>
                <span className="font-bold">Spiciness:</span>{" "}
                {isFilled.select(review.data.spiciness)
                  ? "🌶️".repeat(Number.parseInt(review.data.spiciness))
                  : "N/A"}
              </li>
              <li>
                <span className="font-bold">Rating:</span>{" "}
                {review.data.spiciness &&
                  isFilled.select(review.data.spiciness) &&
                  "★".repeat(Number.parseInt(review.data.rating!))}
                {review.data.spiciness &&
                  isFilled.select(review.data.spiciness) &&
                  Number.parseInt(review.data.rating!) < 5 &&
                  "☆".repeat(5 - Number.parseInt(review.data.rating!))}
              </li>
            </ul>

            <div className="mt-8 gap-2 sm:flex-row sm:gap-3">
              {isFilled.richText(review.data.review_text) && (
                <RichText field={review.data.review_text} />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 max-w-3xl w-full">
        <SliceZone slices={review.data.slices} components={components} />
      </div>
    </>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { uid } = await params;
  const client = createClient();
  const page = await client.getByUID("review", uid).catch(() => notFound());

  return {
    title: `${page.data.product_name} - Review`,
    description: page.data.meta_description,
    openGraph: {
      title: page.data.meta_title ?? undefined,
      images: [{ url: page.data.meta_image.url ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();

  const reviews = await client.getAllByType("review");

  return reviews.map((page) => ({ uid: page.uid }));
}
