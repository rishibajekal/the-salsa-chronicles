import {
  asText,
  ImageField,
  KeyTextField,
  RichTextField,
} from "@prismicio/client";
import { ReviewDocument } from "../../prismicio-types";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

const TRUNCATED_REVIEW_TEXT_LENGTH = 150;

interface ReviewPreviewProps {
  uid: string;
  productName: KeyTextField;
  spiciness: number;
  rating: number;
  image: ImageField;
  review: RichTextField;
}

export function reviewDocumentToReviewPreviewProps(
  document: ReviewDocument
): ReviewPreviewProps {
  return {
    uid: document.uid,
    productName: document.data.product_name,
    spiciness: Number.parseInt(document.data.spiciness?.toString() ?? "0"),
    rating: Number.parseInt(document.data.rating?.toString() ?? "0"),
    image: document.data.product_image,
    review: document.data.review_text,
  };
}

export const ReviewPreview = (props: ReviewPreviewProps) => {
  const truncatedRawReviewText =
    asText(props.review).slice(0, TRUNCATED_REVIEW_TEXT_LENGTH) + "...";

  return (
    <PrismicNextLink
      href={`/reviews/${props.uid}`}
      className="group transform transition duration-450 hover:scale-101"
    >
      <div className="max-w-[85rem] mx-auto py-8 border-y-2 border-gray-300">
        <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 lg:items-center">
          <div className="lg:col-span-3">
            <h1 className="block text-2xl font-bold text-gray-800 sm:text-2xl md:text-4xl lg:text-5xl dark:text-white">
              {props.productName}
            </h1>
            <ul className="mt-3 text-lg text-gray-800 dark:text-neutral-400">
              <li>
                <span className="bold">Spiciness:</span>{" "}
                {"🌶️".repeat(props.spiciness)}
              </li>
              <li>
                <span className="bold">Rating:</span> {"★".repeat(props.rating)}
                {props.rating < 5 && "☆".repeat(5 - props.rating)}
              </li>
            </ul>

            <div className="mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
              {truncatedRawReviewText}
            </div>
            <div className="font-bold mt-5 lg:mt-8 flex flex-col items-center gap-2 sm:gap-3">
              <span className="text-red-900 group-hover:text-red-600">
                Read full review →
              </span>
            </div>
          </div>
          <div className="lg:col-span-4 mt-10 lg:mt-0">
            <PrismicNextImage field={props.image} />
          </div>
        </div>
      </div>
    </PrismicNextLink>
  );
};
