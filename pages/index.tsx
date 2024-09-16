import {
  FadeContainer,
  opacityVariant,
  popUp,
} from "@content/FramerMotionVariants";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import pageMeta from "@/content/meta";
import MetaData from "@/components/MetaData";

export default function Home() {
  return (
    <>
      <MetaData
        title={pageMeta.home.title}
        description={pageMeta.home.description}
        previewImage={pageMeta.home.image}
        keywords={pageMeta.home.keywords}
      />

      <div className="relative max-w-4xl mx-auto dark:bg-darkPrimary dark:text-gray-100 2xl:max-w-5xl 3xl:max-w-7xl">
        <motion.section
          initial="hidden"
          whileInView="visible"
          variants={FadeContainer}
          viewport={{ once: true }}
          className="grid min-h-screen py-20 place-content-center"
        >
          <div className="relative flex flex-col items-center w-full gap-10 mx-auto">
            <motion.div
              variants={popUp}
              className="relative flex items-center justify-center p-3 rounded-full w-44 h-44 xs:w-52 xs:h-52 before:absolute before:inset-0 before:border-4 before:border-black before:dark:border-white before:rounded-full "
            >
              <Image
                src={"https://i.imgur.com/qvdqtsc.png"} // Add Spotify profile image here
                className="rounded-full shadow filter motion-safe:animate-photo-spin"
                width={933}
                height={933}
                alt="Spotify logo"
                quality={75}
                priority
              />
          
            </motion.div>

            <div className="flex flex-col w-full gap-3 p-5 text-center select-none ">
              <div className="flex flex-col gap-1">
                <motion.h1
                  variants={opacityVariant}
                  className="text-5xl font-bold lg:text-6xl"
                >
                  Spotify Companion
                </motion.h1>
                <motion.p
                  variants={opacityVariant}
                  className="font-medium text-xs text-right md:text-sm lg:text-lg text-[#383838] dark:text-gray-200"
                >
                 <a className="font-semibold hover:underline" href="https://jamiebirkett.co.uk"> 
                  by Jamie Birkett
                 </a>
                </motion.p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </>
  );
}