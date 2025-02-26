import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import Head from "next/head";
import "./styles.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" type="image/png" sizes="any" href="./icon.png" />
      </Head>

      <body className="flex flex-col items-center bg-stone-50">
        <div className="bg-white max-w-7xl min-h-screen border-x border-solid border-gray-200 p-12 w-full flex flex-col gap-20 items-center text-slate-700">
          {children}
          <PrismicPreview repositoryName={repositoryName} />
        </div>
      </body>
    </html>
  );
}
