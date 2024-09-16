import React from "react";
import { Variants } from "framer-motion";

/* Custom Animated Components types */
export type AnimatedTAGProps = {
  variants: Variants;
  className?: string;
  children: React.ReactNode;
  infinity?: boolean;
};

/* Spotify Track  */
export type SpotifyTrack = {
  id: number;
  title: string;
  url: string;
  coverImage: {
    url: string;
  };
  artist: string;
};

/* Spotify Artist  */
export type SpotifyArtist = {
  id: number;
  name: string;
  url: string;
  coverImage: {
    url: string;
  };
  followers: {
    total: number;
  }
  popularity: number;
};

export type Song = {
  album: string;
  artist: string;
  albumImageUrl: string;
  isPlaying: boolean;
  songUrl: string;
  title: string;
};

export type SpotifyAccessToken = {
  access_token: string;
};

export type PageData = {
  title: string;
  description: string;
  image: string;
  keywords: string;
};

export type PageMeta = {
  home: PageData;
  top_streams: PageData;
  now_playing: PageData;
  suffix: string;
};
