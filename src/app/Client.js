"use client";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import SparkleBackgroundPortal from "@/components/common/Sparklingbg";
export default function Clients() {
  const imageRef = useRef(null);
  const coloredLineRef = useRef(null);
  const coloredLineRef2 = useRef(null);
  const containerRef = useRef(null);
  const logoGridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLogoGridVisible, setIsLogoGridVisible] = useState(false);

  const logoSets = [
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
  ];

  // Animation controls for lines
  const lineControls = useAnimation();
  const lineControls2 = useAnimation();

  // Animation variants for image
  const imageVariants = {
    hidden: { scaleY: 0, opacity: 0, originY: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeOut" },
    },
  };

  // Animation variants for logos
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1, // Stagger effect
        duration: 0.7,
        ease: "easeInOut",
      },
    }),
  };

  // Animation variants for lines
  const lineVariants = {
    hidden: { scaleX: 0, originX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  // IntersectionObserver for logo grid
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsLogoGridVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (logoGridRef.current) {
      observer.observe(logoGridRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // IntersectionObserver for image
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          lineControls.start("visible");
          lineControls2.start("visible");
        } else {
          lineControls.start("hidden");
          lineControls2.start("hidden");
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lineControls, lineControls2]);

  return (
    <section>
      <div className="md:pt-[50px] w-full h-full md:px-[35px] px-[15px] py-[60px]">
        <SparkleBackgroundPortal/>
        <div className="md:flex justify-start items-end md:mb-[0] mb-[30px] md:text-start">
          <h3 className="uppercase relative md:leading-[70px] md:text-start text-center max-h-fit leading-[normal] md:mb-[0] mb-[15px]">
            <span className="bartino-outline tracking-[2px] 2xl:text-[72px] lg:text-[62px] md:text-[50px] text-[32px] block">
              Amazing brands,
            </span>
            <span className=" md:pl-[7.5rem] block font-medium 2xl:text-[65px] text-[32px] md:text-[50px] lg:text-[52px]">
              Amazed Clients.
              <motion.div
                ref={coloredLineRef}
                className="bg-gtf-blue absolute left-[33%] lg:left-[61%] bottom-[2%] h-[4px] w-[100px]"
                variants={lineVariants}
                initial="hidden"
                animate={lineControls}
              />
            </span>
          </h3>
          <p className="uppercase italic pt-[16px] md:ml-[3rem] text-center lg:text-left font-[500]">
            <span className="block">They choose to work with us.</span>
            <span className="block">We chased the WOWasaS with them.</span>
          </p>
        </div>
        <div className="overflow-hidden relative w-full md:mt-[70px] main_border_cmp border-black">
          <motion.ul
            ref={logoGridRef}
            className="grid grid-cols-2 border-none sm:grid-cols-3 md:grid-cols-5 w-full border-[2px]"
          >
            {logoSets.map((logo, i) => (
              <motion.li
                key={logo.id}
                custom={i}
                variants={logoVariants}
                initial="hidden"
                animate={isLogoGridVisible ? "visible" : "hidden"}
                className="p-4 flex justify-center items-center"
              >
                <img
                  src={logo.src}
                  alt={`Client logo ${logo.id}`}
                  className="w-full h-auto m-[auto] object-contain"
                />
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

    </section>
  );
}