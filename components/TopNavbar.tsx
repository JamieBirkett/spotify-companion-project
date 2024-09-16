import React, { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { navigationRoutes } from "@utils/utils";
import Link from "next/link";
import { hamFastFadeContainer, mobileNavItemSideways, popUp } from "@content/FramerMotionVariants";


export default function TopNavbar() {
    const navRef = useRef<HTMLDivElement>(null);
  
    const control = useAnimation();
    const [navOpen, setNavOpen] = useState(false);
    
    const addShadowToNavbar = useCallback(() => {
      if (window.scrollY > 10) {
        navRef.current!.classList.add(
          ...[
            "shadow",
            "backdrop-blur-xl",
            "bg-white/70",
            "dark:bg-darkSecondary",
          ]
        );
  
        control.start("visible");
      } else {
        navRef.current!.classList.remove(
          ...[
            "shadow",
            "backdrop-blur-xl",
            "bg-white/70",
            "dark:bg-darkSecondary",
          ]
        );
        control.start("hidden");
      }
    }, [control]);
  
    useEffect(() => {
      window.addEventListener("scroll", addShadowToNavbar);
      return () => {
        window.removeEventListener("scroll", addShadowToNavbar);
      };
    }, [addShadowToNavbar]);
    
     // to lock the scroll when mobile is open
     function lockScroll() {
      const root = document.getElementsByTagName("html")[0];
      root.classList.toggle("lock-scroll"); // class is define in the global.css
    }
  
    /* To Lock  the Scroll when user visit the mobile nav page */
    function handleClick() {
      lockScroll();
      setNavOpen(!navOpen);
    }
        
    return (
      <div
        className="fixed w-full dark:text-white top-0 flex items-center justify-between px-4 py-[10px] sm:px-6 z-50 print:hidden"
        ref={navRef}
      >
        {/* Mobile Navigation Hamburger and MobileMenu */}
        <HamBurger open={navOpen} handleClick={handleClick} />
        <AnimatePresence>
          {navOpen && (
            <MobileMenu links={navigationRoutes} handleClick={handleClick} />
          )}
        </AnimatePresence>

        {/* Top Nav list */}
        <motion.nav className="z-10 hidden sm:flex md:inset-0 md:justify-center">
          <motion.div
            initial="hidden"
            animate="visible"
            //variants={FadeContainer}
            className="flex items-center md:gap-2"
          >
            {navigationRoutes.slice(0, 7).map((link, index) => {
              return <NavItem key={index} href={`/${link}`} text={link} />;
            })}
          </motion.div>
        </motion.nav>
  
      </div>
    );
  }
  
  // NavItem Container
  function NavItem({ href, text } : {href: string, text: string}) {
    const formattedText = text.replace("_", " ");
    const router = useRouter();
    const isActive = router.asPath === (href === "/home" ? "/" : href);
    return (
      <Link
        className={`${
          isActive
            ? "font-bold text-gray-800 dark:text-gray-100"
            : " text-gray-600 dark:text-gray-300"
        } sm:inline-block transition-all text-[17px] hidden px-2 md:px-3 py-[3px] hover:bg-black/10  dark:hover:bg-neutral-700/50 rounded-md`}
        href={href === "/home" ? "/" : href}
      >
        <motion.p className="capitalize" >
          {formattedText.toUpperCase()}
        </motion.p>
      </Link>
    );
  };

  function HamBurger({
    open,
    handleClick,
  }: {
    open: boolean;
    handleClick: () => void;
  }) {
    return (
      <motion.div
        style={{ zIndex: 1000 }}
        initial="hidden"
        animate="visible"
        variants={popUp}
        className="sm:hidden"
      >
        {!open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer select-none transform duration-300 rounded-md active:scale-50"
            onClick={handleClick}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 cursor-pointer select-none transform duration-300  rounded-md active:scale-50"
            onClick={handleClick}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </motion.div>
    );
  }

// Mobile navigation menu
const MobileMenu = ({
  links,
  handleClick,
}: {
  links: string[];
  handleClick: () => void;
}) => {
  return (
    <motion.div
      className="absolute font-normal bg-white dark:bg-darkPrimary w-screen h-screen top-0 left-0 z-10 sm:hidden"
      variants={hamFastFadeContainer}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.nav className="mt-28 mx-8 flex flex-col">
        {links.map((link, index) => {
          const formattedText = link.replace("_", " ");
          const navlink =
            link.toLowerCase() === "home" ? "/" : `/${link.toLowerCase()}`;
          return (
            <Link href={navlink} key={`mobileNav-${index}`} passHref>
              <motion.a
                href={navlink}
                className="border-b border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold flex w-auto py-4 capitalize text-base cursor-pointer"
                variants={mobileNavItemSideways}
                onClick={handleClick}
              >
                {formattedText.toUpperCase()}
              </motion.a>
            </Link>
          );
        })}
      </motion.nav>
    </motion.div>
  );
};