"use client";
import Banner from "@/components/Home/Banner";
import Portfolio from "../components/Home/Portfolio";
import Expertise from "@/components/Home/expertise/Expertise";
import BoxSlides from "@/components/common/BoxSlides";
import { useEffect, useRef, useState } from "react";
import Header from "@/components/header/Index";
import Clients from "./Client";
import WhoWeAre from "@/components/common/WhowWeAre";
import { motion, AnimatePresence } from "framer-motion";

const frames = [
  { img: "/assets/img/loader/slide_1.webp", name: "Project 1" },
  { img: "/assets/img/loader/slide_2.webp", name: "Project 2" },
  { img: "/assets/img/loader/slide_4.webp", name: "Project 4" },
  { img: "/assets/img/loader/slide_5.webp", name: "Project 5" },
  { img: "/assets/img/loader/slide_3.webp", name: "Project 3" },
];

export default function Home() {
  const bannervideoref = useRef();
  const headerRef = useRef();
  const [scaleTransform, setscaleTransform] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [latestN, setlatest] = useState();
  const [isLoaderVisible, setIsLoaderVisible] = useState(true);
  const [isTextStart, setIsTextStart] = useState(false);
  const [isTextEnd, setIsTextEnd] = useState(false);
  const [isBgStart, setIsBgStart] = useState(false);
  const [isImagesVisible, setIsImagesVisible] = useState(false);
  const [isLoaderCardEnd, setIsLoaderCardEnd] = useState(false);
  const [isLoaderCardVisible, setIsLoaderCardVisible] = useState(false);
  const cardRefs = useRef([]);

  const changesImageArr = [
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img_2.jpg",
    "/assets/img/mide_section_img_3.jpg",
    "/assets/img/portfolio/portfolio_5.jpg",
  ];

  // Loader sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setIsTextStart(true), 0);
    const timer2 = setTimeout(() => setIsTextEnd(true), 2000);
    const timer3 = setTimeout(() => setIsBgStart(true), 300);
    const timer5 = setTimeout(() => setIsLoaderCardEnd(true), 6000);
    const timer6 = setTimeout(() => setIsLoaderVisible(false), 6500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  return (
    <>
      {isLoaderVisible && (
        <div className="z-999 w-full fixed top-0 left-0">
          <motion.div
            className="fixed w-full"
            initial={{ top: "300px", opacity: 0 }}
            animate={{
              top: isTextStart ? "100px" : "300px",
              opacity: isTextEnd ? 0 : 1,
              transition: { duration: 1.5, ease: "easeInOut" },
            }}
          >
            <h3 className="text-[16px] tracking-[1px] text-center">
              GTF Technologies
            </h3>
          </motion.div>

          <motion.div
            className={`fixed w-full ${isLoaderCardVisible ? "hidden" : "block"}`}
            initial={{ top: "20vh" }}
            animate={{
              top: isLoaderCardEnd ? "40vh" : "20vh",
              transition: { duration: 0.5, ease: "easeInOut" },
            }}
          >
            <div className="container mx-auto flex justify-center">
              <div className="flex gap-4 items-start font-serif text-black w-full">
                {frames.map((frame, i) => (
                  <div
                    key={i}
                    ref={(el) => (cardRefs.current[i] = el)}
                    className={`img_after relative overflow-hidden cursor-pointer group basis-[${
                      i === 2 ? "80%" : "50%"
                    }] ${i !== 2 && "hover:basis-[60%]"}`}
                  >
                    {i === 2 && (
                      <div className="overflow-hidden relative h-[500px]">
                        <AnimatePresence>
                          {isImagesVisible &&
                            frames.map((image, index) => (
                              <motion.div
                                key={index}
                                className="absolute bottom-0 left-0 right-0"
                                initial={{
                                  clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                                  scale: 1.2,
                                }}
                                animate={{
                                  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                                  scale: 1,
                                }}
                                transition={{
                                  duration: 0.6,
                                  delay: index * 0.4,
                                  ease: "easeInOut",
                                }}
                              >
                                <motion.img
                                  src={image.img}
                                  alt={image.name}
                                  className="h-full w-full object-cover"
                                />
                              </motion.div>
                            ))}
                        </AnimatePresence>
                        <motion.div
                          className="absolute bg-[#ba9b53] h-full w-full z-[-1]"
                          initial={{ scale: 0.3 }}
                          animate={{
                            scale: isBgStart ? 1 : 0.3,
                            transition: { duration: 1.5, ease: "easeInOut" },
                          }}
                          onAnimationComplete={() => {
                            setTimeout(() => {
                              setIsImagesVisible(true);
                            }, 200);
                          }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Header isHidden={isHidden} setIsHidden={setIsHidden} ref={headerRef} />
      <Banner bannervideoref={bannervideoref} />

      <div className="fixed inset-0 z-[-1]">
        {activeImage && (
          <img
            src={activeImage}
            alt="Background"
            className="w-full h-full object-cover transition-all duration-700"
          />
        )}
      </div>

      <BoxSlides
        scaleTransform={scaleTransform}
        setscaleTransform={setscaleTransform}  // Only pass to first
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        headerRef={headerRef}
        bannervideoref={bannervideoref}
        via={true}
        onActive={() => setActiveImage(changesImageArr[0])}
        subHeading={"Our Projects"}
        heading={"Projects"}
        isFirst={true}
      >
        <Portfolio
          scaleTransform={scaleTransform}
          isHidden={isHidden}
        />
      </BoxSlides>

      <BoxSlides
        scaleTransform={scaleTransform}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        headerRef={headerRef}
        bannervideoref={bannervideoref}
        via={false}
        onActive={() => setActiveImage(changesImageArr[1])}
      >
        <Expertise />
      </BoxSlides>

      <BoxSlides
        scaleTransform={scaleTransform}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        headerRef={headerRef}
        bannervideoref={bannervideoref}
        via={false}
        onActive={() => setActiveImage(changesImageArr[2])}
      >
        <WhoWeAre />
      </BoxSlides>

      <BoxSlides
        scaleTransform={scaleTransform}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        headerRef={headerRef}
        bannervideoref={bannervideoref}
        via={false}
        onActive={() => setActiveImage(changesImageArr[3])}
      >
        <Clients />
      </BoxSlides>
    </>
  );
}