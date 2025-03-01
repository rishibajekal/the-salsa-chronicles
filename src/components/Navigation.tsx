import { Client, Content, isFilled } from "@prismicio/client";
import { PrismicNextLink } from "@prismicio/next";
import { PrismicLink } from "@prismicio/react";
import { JSX } from "react";

export const Navigation = async ({
  client,
}: {
  client: Client<Content.AllDocumentTypes>;
}): Promise<JSX.Element> => {
  const navigation = await client.getSingle("navigation");

  return (
    <div className="flex justify-between items-center w-full">
      <PrismicNextLink href="/" className="w-full">
        {isFilled.keyText(navigation.data.website_name) &&
          `🌶 ${navigation.data.website_name}`}
      </PrismicNextLink>
      <nav className="flex justify-end items-center w-full">
        <ul className="flex justify-end">
          {isFilled.group(navigation.data.menu_items) &&
            navigation.data.menu_items.map((item) => {
              return (
                <li key={item.label} className="m-2">
                  <PrismicLink className="underline" field={item.link}>
                    {item.label}
                  </PrismicLink>
                </li>
              );
            })}
        </ul>
      </nav>
    </div>
  );
};
