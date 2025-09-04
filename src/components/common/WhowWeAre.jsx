"use client";
import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useAnimationControls } from "framer-motion";

const words = [
  "GTF",
  " ",
  "Technologies",
  " ",
  "is",
  " ",
  "conceptualized",
  " ",
  "from",
  " ",
  "Gurukul",
  " ",
  "The",
  " ",
  "Foundation.",
  " ",
  "We",
  " ",
  "are",
  " ",
  "a",
  " ",
  "16-year-old",
  " ",
  "branding",
  " ",
  "and",
  " ",
  "digital",
  " ",
  "media",
  " ",
  "planning",
  " ",
  "agency",
  " ",
  "headquartered",
  " ",
  "in",
  " ",
  "Noida,",
  " ",
  "Mumbai,",
  " ",
  "Pune,",
  " ",
  "and",
  " ",
  "an",
  " ",
  "upcoming",
  " ",
  "office",
  " ",
  "in",
  " ",
  "Bangalore.",
  " ",
  "GTF",
  " ",
  "Technologies",
  " ",
  "is",
  " ",
  "conceptualized",
  " ",
  "from",
  " ",
  "Gurukul",
  " ",
  "The",
  " ",
  "Foundation.",
  " ",
  "GTF",
  " ",
  "Technologies",
  " ",
  "is",
  " ",
  "conceptualized",
  " ",
  "from",
  " ",
  "Gurukul",
  " ",
  "The",
  " ",
  "Foundation.",
  " ",
];

const WhoWeAre = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const textRef = useRef([]);
  const imagesRef = useRef([]);
  const controls = useAnimationControls();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const maxTranslateX = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const calculateMaxTranslateX = () => {
      const scrollWidth = section.scrollWidth;
      const windowWidth = window.innerWidth;
      maxTranslateX.current = scrollWidth - windowWidth;
    };

    calculateMaxTranslateX();
    window.addEventListener("resize", calculateMaxTranslateX);

    return () => window.removeEventListener("resize", calculateMaxTranslateX);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, () => -maxTranslateX.current]);

  useEffect(() => {
    const images = imagesRef.current.filter(Boolean);

    const animateImages = async () => {
      const animatedIndices = new Set();

      const checkImages = () => {
        images.forEach((image, index) => {
          if (animatedIndices.has(index)) return;

          const rect = image.getBoundingClientRect();
          if (rect.right > 0 && rect.left < window.innerWidth) {
            controls.start((i) => {
              if (i === index) {
                return {
                  opacity: 1,
                  y: 0,
                  clipPath: "inset(0% 0% 0% 0%)",
                  transition: { duration: 2, delay: 0.3, ease: [0.6, 0.01, -0.05, 0.95] },
                };
              }
              return {};
            });
            animatedIndices.add(index);
          }
        });
      };

      const interval = setInterval(checkImages, 100);
      return () => clearInterval(interval);
    };

    animateImages();
  }, [controls]);

  const textVariants = {
    hidden: { opacity: 0.2, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.22,
        ease: "easeOut",
      },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50, clipPath: "inset(50% 0 50% 0)" },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0% 0)",
      transition: { duration: 2, delay: 0.3, ease: [0.6, 0.01, -0.05, 0.95] },
    },
  };

  return (
    <section className="w-full mix-blend-multiply overflow-hidden">
      <motion.div
        ref={containerRef}
        className="pin-container"
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        <motion.section
          ref={sectionRef}
          className="flex flex-row uppercase h-screen main-container-scroll no-scrollbar min-w-[430vw] relative"
          style={{ x }}
        >
          <div
            className="main-container-scroll no-scrollbar flex h-screen will-change-transform"
            style={{ display: "flex", width: "fit-content" }}
          >
            {/* Left Text Section */}
            <div className="flex flex-row bg-pink-200 justify-between h-full min-w-[100vw]">
              <div className="grid grid-cols-12 items-center gap-[40px]">
                <div className="w-[100vw] col-span-12 pt-[20px] px-[35px]">
                  <h2 className="font-[Oswald] mb-[15px] text-[25px] text-left">
                    Who We Are?
                  </h2>
                  <div>
                    {words.map((word, index) => (
                      <motion.p
                        key={index}
                        ref={(el) => (textRef.current[index] = el)}
                        className="font-[Oswald] pr-[8px] 2xl:leading-[1.2] lg:leading-[1.4] tracking-[-2.5px] font-[700] 2xl:text-[60px] xl:text-[48px] text-[32px] inline-block"
                        custom={index}
                        initial="hidden"
                        whileInView="visible"
                        variants={textVariants}
                        viewport={{ once: false, amount: 0.5 }}
                      >
                        {word}
                      </motion.p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* First Image Section */}
            <div className="flex flex-row items-center relative pl-[13rem]">
              <motion.img
                ref={(el) => (imagesRef.current[0] = el)}
                className="xl:h-[390px] 2xl:h-auto object-cover inline-block ml-[4rem] mr-[1rem] mt-[2.5rem] w-[365px] border-[4px] border-solid rotate-[-6deg] border-black"
                src="/assets/home/who_we_are/img1.webp"
                alt="Team member working on a project"
                custom={0}
                initial="hidden"
                animate={controls}
                variants={imageVariants}
              />
              <motion.img
                ref={(el) => (imagesRef.current[1] = el)}
                className="xl:h-[480px] 2xl:h-auto object-cover inline-block w-[365px] mr-[10rem] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/img2.webp"
                alt="Creative brainstorming session"
                custom={1}
                initial="hidden"
                animate={controls}
                variants={imageVariants}
              />
              <div className="basis-[100%] pr-[50px] pl-[20px]">
                <h3 className="font-[Oswald] text-[70px] mb-[1rem] font-[600]">
                  CHORDIA'S
                </h3>
                <p className="text-[16px] tracking-[0.5px] leading-[23px]">
                  When an unknown printer took a gallery of type and scrambled it to
                </p>
              </div>
              <motion.img
                ref={(el) => (imagesRef.current[2] = el)}
                className="object-cover relative top-[-20px] 2xl:h-auto inline-block top-[-70px] right-[-90px] rotate-[-5deg] z-[1] xl:h-[360px] w-[365px] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/absolute_img.webp"
                alt="GTF Technologies office environment"
                custom={2}
                initial="hidden"
                animate={controls}
                variants={imageVariants}
              />
              <motion.img
                ref={(el) => (imagesRef.current[3] = el)}
                className="object-cover inline-block w-[365px] 2xl:h-auto xl:h-[480px] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/img3.webp"
                alt="GTF Technologies office environment"
                custom={3}
                initial="hidden"
                animate={controls}
                variants={imageVariants}
              />
            </div>
            {/* Second Image Section */}
            <div className="flex flex-row lg:pl-[13rem] pr-[2rem] items-center">
              <div className="w-[850px] mr-[11rem]">
                <h3 className="font-[Oswald] xl:text-[35px] 2xl:text-[44px] mb-[1rem] font-bold">
                  WHEN UNKNOWN PRINTER <br /> TOOK A GALLERY
                </h3>
                <p className="font-[Oswald] font-[400] xl:text-[25px] 2xl-text-[28px] mb-[1rem]">
                  MAKE A TYPE SPECIMEN BOOK
                </p>
                <p className="xl:text-[13px] 2xl:text-[16px] leading-[23px] text-right mt-[30px]">
                  <span className="block">
                    When an unknown printer took a gallery of type and scrambled it to
                  </span>
                  <span className="block">
                    make a type specimen book. It has survived not only five centuries
                  </span>
                </p>
              </div>
              <motion.img
                ref={(el) => (imagesRef.current[4] = el)}
                className="object-cover inline-block 2xl:h-auto mt-[2.3rem] mr-[1.35rem] w-[365px] border-[4px] border-solid rotate-[-6deg] border-black"
                src="/assets/home/who_we_are/img4.webp"
                alt="Digital media planning in action"
                custom={4}
                initial="hidden"
                animate={controls}
                variants={imageVariants}
              />
              <motion.img
                ref={(el) => (imagesRef.current[5] = el)}
                className="object-cover inline-block 2xl:h-auto w-[365px] mr-[4rem] border-[4px] border-solid border-black"
                src="/assets/home/who_we_are/thumb1.webp"
                alt="Branding project showcase"
                custom={5}
                initial="hidden"
                animate={controls}
                variants={imageVariants}
              />
            </div>
          </div>
        </motion.section>
      </motion.div>
    </section>
  );
};

export default WhoWeAre;