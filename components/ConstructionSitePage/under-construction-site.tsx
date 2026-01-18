"use client";
import React, { Dispatch, SetStateAction, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import "./_under-construction-site.css";

interface UnderConstructionSiteProps {
  setIsSiteUnderConstruction?: Dispatch<SetStateAction<boolean>>;
}
const UnderConstructionSite = ({
  setIsSiteUnderConstruction,
}: UnderConstructionSiteProps) => {
  const router = useRouter();

  useLayoutEffect(() => {
    const body = document.body;
    body.classList.add("underconstruction");

    return () => {
      body.classList.remove("underconstruction");
    };
  }, []);

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }} // fade out on navigation
      transition={{ duration: 5 }}
    >
      <div className="overlay"></div>
      <div className="stars" aria-hidden="true"></div>
      <div className="starts2" aria-hidden="true"></div>
      <div className="stars3" aria-hidden="true"></div>
      <main className="main">
        <section className="contact">
          <h1 className="title">Site Under Construction</h1>
          <h2 className="sub-title">
            Still want to see? Click below to visit site
          </h2>
          <button
            onClick={() => {
              if (setIsSiteUnderConstruction) {
                setIsSiteUnderConstruction((prev) => !prev);
              }

              router.push("/?home=true");
            }}
            className="relative group border-none bg-transparent p-0 outline-none cursor-pointer font-mono font-light uppercase !text-base"
          >
            <span className="absolute top-0 left-0 !w-full !h-full bg-black bg-opacity-25 rounded-lg transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px" />
            <span className="absolute top-0 left-0 !w-full !h-full rounded-lg bg-gradient-to-l from-[hsl(217,33%,16%)] via-[hsl(217,33%,32%)] to-[hsl(217,33%,16%)]" />
            <div className="relative flex items-center justify-between py-3 px-6 text-lg text-white rounded-lg transform -translate-y-1 bg-gradient-to-r from-[#f27121] via-[#e94057] to-[#8a2387] gap-3 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
              <span className="select-none">NOVAREO</span>
              <svg
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 ml-2 -mr-1 transition duration-250 group-hover:translate-x-1"
              >
                <path
                  clipRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  fillRule="evenodd"
                />
              </svg>
            </div>
          </button>
        </section>
      </main>
    </motion.div>
  );
};

export default UnderConstructionSite;
