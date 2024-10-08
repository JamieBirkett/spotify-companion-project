import { useEffect, useState } from "react";
import { NextSeo } from "next-seo";
import useWindowLocation from "@hooks/useWindowLocation";

type Props = {
  title: string;
  description: string;
  previewImage?: string;
  keywords?: string;
  suffix?: string;
};

const getFaviconPath = (isDarkMode: boolean = true): string => {
  return `assets/icons/favicon-${isDarkMode ? "dark" : "light"}.ico`;
};

export default function MetaData({
  title,
  description,
  previewImage,
  keywords,
  suffix,
}: Props) {
  const { currentURL } = useWindowLocation();
  const [faviconHref, setFaviconHref] = useState("assets/icons/favicon-dark.ico");

  useEffect(() => {
    // Get current color scheme.
    const matcher = window.matchMedia("(prefers-color-scheme: dark)");
    // Set favicon initially.
    setFaviconHref(getFaviconPath(matcher.matches));
    // Change favicon if the color scheme changes.
    matcher.onchange = () => setFaviconHref(getFaviconPath(matcher.matches));
  }, [faviconHref]);

  return (
    <NextSeo
      title={title + (suffix ? ` - ${suffix}` : "")}
      description={description || "Jamie Birkett - Spotify API Project"}
      canonical={currentURL}
      additionalLinkTags={[
        {
          rel: "icon",
          href: faviconHref,
        },
        {
          rel: "manifest",
          href: "/manifest.json",
        },
        {
          rel: "apple-touch-icon",
          href: "assets/icons/icon-192x192.png",
          sizes: "192x192",
        },
      ]}
      openGraph={{
        type: "website",
        url: currentURL,
        title: title + (suffix ? ` - ${suffix}` : ""),
        description: description || "Jamie Birkett",
        profile: {
          firstName: "Jamie",
          lastName: "Birkett",
          gender: "Male",
          username: "jamiebirkett",
        },
        article: {
          tags: keywords?.split(","),
          authors: ["https://linkedin.com/in/jamiebirkett"],
        },
        images: [
          {
            url: previewImage ?? "",
            width: 1200,
            height: 630,
            alt: title,
            type: "image/jpeg",
          },
        ],
        siteName: "spotify-companion.vercel.app",
      }}
    />
  );
}