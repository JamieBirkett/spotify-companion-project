import { FadeContainer, opacityVariant, popUpFromBottomForText } from "@/content/FramerMotionVariants";
import { SpotifyArtist, SpotifyTrack } from "@/lib/types";
import AnimatedHeading from "@/components/FramerMotion/AnimatedHeading";
import AnimatedText from "@/components/FramerMotion/AnimatedText";
import Artist from "@/components/Stats/Artist";
import Track from "@/components/Stats/Track";
import PageTop from "@/components/PageTop";
import React from "react";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import { motion } from "framer-motion";
import MetaData from "@/components/MetaData";
import pageMeta from "@/content/meta";

export default function Stats() {
    const { data: topTracks } = useSWR("/api/stats/tracks", fetcher);
    const { data: artists } = useSWR("/api/stats/artists", fetcher);
  
  
    return (
      <>
      <MetaData
        title={pageMeta.top_streams.title}
        description={pageMeta.top_streams.description}
        previewImage={pageMeta.top_streams.image}
        keywords={pageMeta.top_streams.keywords}
        
      />
        <section className="pageTop font-inter">
          <PageTop pageTitle="Top Streams">
          Welcome to a snapshot of my recent listening on Spotify, inspired by Spotify Wrapped and created using the <a className="font-semibold" href="https://developer.spotify.com/documentation/web-api"> Spotify Web API</a>. 
          <br/><br/>
          This month my most listened to artist is 
          <span>
                {artists ? (
                  <>
                    {" "}
                    <span className="font-semibold">{artists?.[0]?.name}</span>
                  </>
                ) : (
                  <span className="w-20 h-6 bg-white dark:bg-darkSecondary"></span>
                )}
              </span>{" and my most listened to song is "}
              <span>
                {topTracks ? (
                  <>
                    <span className="font-semibold">{topTracks?.[0]?.title}</span>
                    
                    {" by "}
                    <span className="font-semibold">{topTracks?.[0]?.artist}</span>
                    {"."}
                  </>
                ) : (
                  <span className="w-20 h-6 bg-white dark:bg-darkSecondary"></span>
                )}
              </span>{" "}
          </PageTop>
  
  
          {/* Spotify top songs */}
          <div className="font-barlow">
            <AnimatedHeading
              variants={opacityVariant}
              className="text-3xl font-bold capitalize sm:text-4xl text-neutral-900 dark:text-neutral-200"
            >
              Top streamed songs
            </AnimatedHeading>
  
            <AnimatedText
              variants={popUpFromBottomForText}
              className="mt-4 text-gray-700 dark:text-gray-300"
            >
              My Top 10 most played tracks from Spotify this month:
            </AnimatedText>
            <motion.div
            variants={FadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col my-10 gap-0 font-barlow"
            >  
              {topTracks ? (
                topTracks?.map((track: SpotifyTrack, index: number) => (
                  <Track
                    key={index}
                    id={index}
                    url={track.url}
                    title={track.title}
                    coverImage={track.coverImage.url}
                    artist={track.artist}
                  />
                ))
              ) : (
                <LoadingSongs />
              )}
            </motion.div>
          </div>
              
          {/* Spotify top Artists */}
  
          <div className="font-barlow">
            <AnimatedHeading
              variants={opacityVariant}
              className="text-3xl font-bold capitalize sm:text-4xl text-neutral-900 dark:text-neutral-200"
            >
              Top Artists
            </AnimatedHeading>
            <AnimatedText
              variants={popUpFromBottomForText}
              className="mt-4 text-gray-700 dark:text-gray-300"
            >
              My top 10 most listened to artist this month.
            </AnimatedText>
  
            <motion.div
            variants={FadeContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-col my-10 gap-0 font-barlow"
            >
              {artists ? (
                artists?.length === 0 ? (
                  <div className="text-sm">Not Enough Data to Show</div>
                ) : (
                  artists?.map((artist: SpotifyArtist, index: number) => (
                    <Artist
                      key={index}
                      id={index}
                      name={artist.name!}
                      url={artist.url}
                      coverImage={artist.coverImage.url}
                      popularity={artist.popularity!}
                      followers={artist.followers.total!}
                    />
                  ))
                )
              ) : (
                <LoadingArtists />
              )}
            </motion.div>
          </div>
        </section>
      </>
    );
  }
  
  // Loading Components
  function LoadingSongs() {
    return (
      <>
        {Array.from(Array(10).keys()).map((item) => (
          <div
            key={item}
            className="bg-gray-100 h-[80.8px] first:h-[81.6px] first:md:h-[85.6px] md:h-[84.8px]  dark:bg-darkPrimary  border-l first:border-t border-r border-b  border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden relative xs:pl-16 md:!pl-20 "
          >
            <div className="absolute hidden tracking-wider origin-center transform left-4 md:left-6 font-inter xs:inline-flex">
              #{item + 1}
            </div>
  
            <div className="relative w-12 h-12 origin-center transform bg-gray-300 dark:bg-darkSecondary animate-pulse"></div>
            <div className="flex flex-col gap-1">
              <p className="animate-pulse w-40 h-6 md:h-[28px] bg-gray-300 dark:bg-darkSecondary"></p>
              <p className="h-4 bg-gray-300 animate-pulse w-28 md:h-6 dark:bg-darkSecondary delay-125"></p>
            </div>
          </div>
        ))}
      </>
    );
  }
  
  function LoadingArtists() {
    return (
      <>
        {Array.from(Array(5).keys()).map((item) => (
          <div
            key={item}
            className="h-[80.8px] first:h-[81.6px] first:md:h-[129.6px] md:h-[128.8px]  bg-gray-100  dark:bg-darkPrimary  border-l first:border-t border-r border-b border-gray-300 dark:border-neutral-600 p-4 font-barlow flex items-center gap-5 overflow-hidden"
          >
            <>
              <div className="hidden tracking-wider origin-center transform font-inter xs:inline-flex">
                #{item + 1}
              </div>
              <div
                aria-label="image"
                className="relative w-12 h-12 bg-gray-300 rounded-full animate-pulse dark:bg-darkSecondary md:w-24 md:h-24"
              ></div>
              <div className="flex flex-col gap-1">
                <h2
                  aria-label="artist-name"
                  className="animate-pulse h-6 md:h-[28px] w-40 bg-gray-300 dark:bg-darkSecondary"
                ></h2>
                <p
                  aria-label="followers"
                  className="w-20 h-4 bg-gray-300 animate-pulse md:h-6 dark:bg-darkSecondary"
                ></p>
              </div>
            </>
          </div>
        ))}
      </>
    );
  }
  