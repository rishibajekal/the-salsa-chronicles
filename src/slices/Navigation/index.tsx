import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Navigation`.
 */
export type NavigationProps = SliceComponentProps<Content.NavigationSlice>;

/**
 * Component for "Navigation" Slices.
 */
const Navigation: FC<NavigationProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for navigation (variation: {slice.variation}) Slices
    </section>
  );
};

export default Navigation;
