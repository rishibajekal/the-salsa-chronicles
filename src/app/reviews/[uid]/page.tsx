import { Metadata } from "next";
import { notFound } from "next/navigation";

import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { asDate, isFilled } from "@prismicio/client";
import { RichText } from "@/components/RichText";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { formatDate } from "date-fns";

type Params = { uid: string };

export default async function Review({ params }: { params: Promise<Params> }) {
  const { uid } = await params;
  const client = createClient();
  const review = await client.getByUID("review", uid).catch(() => notFound());

  return (
    <>
      <div className="w-full md:w-5/6 lg:w-8/12]">
        <PrismicNextLink href="/" className="italic underline">
          ← Back to all reviews
        </PrismicNextLink>
        <div className="flex flex-col mt-8">
          <div className="flex flex-col items-center">
            <h1 className="font-bold text-2xl text-gray-800 sm:text-2xl md:text-4xl lg:text-5xl">
              {review.data.product_name}
            </h1>
            <div className="max-w-10/12 lg:col-span-4 mt-10">
              <PrismicNextImage field={review.data.product_image} />
            </div>
          </div>

          <ul className="mt-8 text-l text-gray-800 sm:text-l md:text-xl lg:text-2xl">
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

          {review.data.review_date &&
            isFilled.date(review.data.review_date) && (
              <ul className="mt-8 text-m text-gray-800 sm:text-m md:text-l lg:text-xl">
                <li>
                  <span className="italic font-light">
                    {formatDate(
                      asDate(review.data.review_date),
                      "MMMM dd, yyyy"
                    )}
                  </span>
                </li>
              </ul>
            )}

          <div className="mt-8 gap-2 sm:flex-row sm:gap-3">
            {isFilled.richText(review.data.review_text) && (
              <RichText field={review.data.review_text} />
            )}
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
