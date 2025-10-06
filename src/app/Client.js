"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion, useAnimation } from "framer-motion";
import SparkleBackgroundPortal from "@/components/common/Sparklingbg";
import { debounce } from "lodash"; // Requires lodash for debouncing
import Image from "next/image";

// Memoized LogoItem component to prevent unnecessary re-renders
const LogoItem = React.memo(({ logo, index, isVisible, top, bottom }) => (
  <div>
    {/* {top && (
      <motion.li key={logo.id + "logo"} className={`border_wrapper ${top ? 'vertical_top' : ''} flex justify-center items-center h-[250px]`}>
        <div className="border-bg-v"></div>
        <div className="border-bg-h"></div>
      </motion.li>
    )} */}
    
    <motion.li
      key={logo.id}
      custom={index}
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: (i) => ({
          opacity: 1,
          scale: 1,
          transition: {
            delay: i * 0.1,
            duration: 0.5, // Reduced duration for smoother performance
            ease: "easeOut",
          },
        }),
      }}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="border_wrapper flex justify-center items-center h-[250px]"
      style={{ willChange: "transform, opacity" }} // Optimize rendering
    >
      <div className={`border-bg-v ${index>1 && (index % 5) == 0 ? 'hidden' : ''}`}></div>
      <div className={`border-bg-h ${bottom ? 'hidden' : ''}`}></div>
      <Image
        src={logo.src}
        alt={`Client logo ${logo.id}`}
        className="h-full h-full  m-[auto] object-contain"
        loading="lazy" // Enable lazy loading
        width={150}
        height={200}
      />
    </motion.li>

    {/* {bottom && (
      <motion.li key={logo.id + "logo"} className={`border_wrapper ${bottom ? 'vertical_bottom' : ''} flex justify-center items-center h-[250px]`}>
        <div className="border-bg-v"></div>
        <div className="border-bg-h"></div>
      </motion.li>
    )} */}
  </div>
));

export default function Clients() {
  const containerRef = useRef(null);
  const logoGridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLogoGridVisible, setIsLogoGridVisible] = useState(false);
  const lineControls = useAnimation();

  // Memoized logo data
  const logoSets = useMemo(
    () => [
      { id: 1, src: "/assets/home/clients/ambience.png" },
      { id: 2, src: "/assets/home/clients/ats.png" },
      { id: 3, src: "/assets/home/clients/jindal-realty.png" },
      { id: 4, src: "/assets/home/clients/homekraft.png" },
      { id: 5, src: "/assets/home/clients/parx-laureate.png" },
      { id: 6, src: "/assets/home/clients/raheja.png" },
      { id: 7, src: "/assets/home/clients/tarc.png" },
      { id: 8, src: "/assets/home/clients/ska-orion.png" },
      { id: 9, src: "/assets/home/clients/aipl.png" },
      { id: 10, src: "/assets/home/clients/eldeco.png" },
    ],
    []
  );

  // Animation variants for lines
  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: "easeOut" }, // Reduced duration
    },
  };

  // Combined IntersectionObserver with debounce
  useEffect(() => {
    const handleIntersection = debounce((entries) => {
      entries.forEach((entry) => {
        if (entry.target === containerRef.current) {
          setIsVisible(entry.isIntersecting);
          if (entry.isIntersecting) {
            lineControls.start("visible");
          } else {
            lineControls.start("hidden");
          }
        }
        if (entry.target === logoGridRef.current && entry.isIntersecting) {
          setIsLogoGridVisible(true);
        }
      });
    }, 100); // Debounce for 100ms

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });

    if (containerRef.current) observer.observe(containerRef.current);
    if (logoGridRef.current) observer.observe(logoGridRef.current);

    return () => {
      observer.disconnect();
      handleIntersection.cancel(); // Clean up debounce
    };
  }, [lineControls]);

  return (
    <section>
      <div className=" w-full h-full pb-[100px] px-[100px]">
        {/* <div className="md:flex justify-start items-end md:mb-[0] mb-[30px] md:text-start">
          <h3 className="uppercase relative md:leading-[70px] md:text-start text-center max-h-fit leading-[normal] md:mb-[0] mb-[15px]">
            <span className="bartino-outline tracking-[2px] 2xl:text-[72px] lg:text-[62px] md:text-[50px] text-[32px] block">
              Amazing brands,
            </span>
            <span className="md:pl-[7.5rem] block font-medium 2xl:text-[65px] text-[32px] md:text-[50px] lg:text-[52px]">
              Amazed Clients.
              <motion.div
                ref={containerRef}
                className="bg-gtf-blue absolute left-[33%] lg:left-[61%] bottom-[2%] h-[4px] w-[100px]"
                variants={lineVariants}
                initial="hidden"
                animate={lineControls}
                style={{ willChange: "transform" }} // Optimize rendering
              />
            </span>
          </h3>
          <p className="uppercase italic pt-[16px] md:ml-[3rem] text-center lg:text-left font-[500]">
            <span className="block">They choose to work with us.</span>
            <span className="block">We chased the WOWasaS with them.</span>
          </p>
        </div> */}
        <div className="overflow-hidden relative w-full main_border_cmp border-black">
          <motion.ul
            ref={logoGridRef}
            className="grid grid-cols-2 border-none sm:grid-cols-3 md:grid-cols-5 w-full border-[2px]"
          >
            {logoSets.map((logo, i) => (
              <LogoItem
                key={logo.id}
                logo={logo}
                index={i+1}
                isVisible={isLogoGridVisible}
                top={i < 9}
                bottom={logoSets.length-6 < i}
              />
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}
