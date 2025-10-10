"use client";
import Banner from "@/components/Home/Banner";
import Portfolio from "../components/Home/Portfolio";
import Expertise from "@/components/Home/expertise/Expertise";
import BoxSlides from "@/components/common/BoxSlides";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "@/components/header/Index";
import Clients from "./Client";
import WhoWeAre from "@/components/common/WhowWeAre";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Steps from "@/components/Home/steps";
import WhatWeDo from "@/components/Home/whatWeDo/WhatWeDo";
import EnquireForm from "@/components/Home/EnquireForm/EnquireForm";
import Footer from "@/components/footer/Footer";

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
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [activeBg, setActiveBg] = useState(-1);
  const cardRefs = useRef([]);

  const changesImageArr = [
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img_2.jpg",
    "/assets/img/mide_section_img_3.jpg",
    "/assets/img/portfolio/portfolio_5.jpg",
  ];

  const bgImages = [
    "/assets/home/bg/bg_img1.webp",
    "/assets/home/bg/bg_img2.webp",
    "/assets/home/bg/bg_img3.webp",
    "/assets/home/bg/bg_img4.webp",
    "/assets/home/bg/bg_img1.webp",
    "/assets/home/bg/bg_img2.webp",
    "/assets/home/bg/bg_img3.webp",
    "/assets/home/bg/bg_img4.webp",
  ];

  // Loader sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setIsTextStart(true), 0);
    const timer2 = setTimeout(() => setIsTextEnd(true), 2000);
    const timer3 = setTimeout(() => setIsBgStart(true), 300);
    const timer5 = setTimeout(() => setIsLoaderCardEnd(true), 6000);
    const timer6 = setTimeout(() => setIsLoaderVisible(false), 7200);
    const timer7 = setTimeout(() => setIsTransitioning(false), 6200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer5);
      clearTimeout(timer6);
      clearTimeout(timer7);
    };
  }, []);

  useLayoutEffect(()=>{
    if (isLoaderVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isLoaderVisible])

  return (
    <>
      {isLoaderVisible && (
        <>
          <div className="z-100 w-full fixed top-0 left-0">
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
              className={`fixed w-full ${
                isLoaderCardVisible ? "hidden" : "block"
              }`}
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
                                    clipPath:
                                      "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                                    scale: 1.2,
                                  }}
                                  animate={{
                                    clipPath:
                                      "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
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
          <motion.div
            className="fixed top-0 left-0 h-screen w-screen bg-white z-99"
            initial={{
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              position: "fixed",
            }}
            // calc(-100vh + 290px)
            animate={{
              top: isTransitioning ? "0" : "calc(100vh - 290px)",
              scale: isTransitioning ? 1 : 0.85,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
          />
        </>
      )}
      <Banner bannervideoref={bannervideoref} />

      {!isLoaderVisible && (
        <>
          <Header
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            ref={headerRef}
          />

          <div className="fixed inset-0 z-[-1]">
            {activeImage && (
              <img
                src={activeImage}
                alt="Background"
                className="w-full h-full object-cover transition-all duration-700"
              />
            )}
          </div>

          <div className="fixed inset-0 z-[9]">
            {bgImages.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: activeBg === i ? 1 : 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                // optional perf hint:
                style={{ willChange: "opacity" }}
              />
            ))}
          </div>

          <BoxSlides
            scaleTransform={scaleTransform}
            setscaleTransform={setscaleTransform}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            headerRef={headerRef}
            bannervideoref={bannervideoref}
            via={true}
            onActive={() => setActiveImage(changesImageArr[0])}
            subHeading={"Our Projects"}
            heading={"Projects"}
            isFirst={true}
            onFocus={() => setActiveBg(0)} // <-- tell parent to show bgImages[0]
            onResetTop={() => setActiveBg(-1)}
          >
            <Portfolio scaleTransform={scaleTransform} isHidden={isHidden} />
          </BoxSlides>

          <BoxSlides
            scaleTransform={scaleTransform}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            headerRef={headerRef}
            bannervideoref={bannervideoref}
            via={false}
            onActive={() => setActiveImage(changesImageArr[1])}
            onFocus={() => setActiveBg(1)} // <-- bgImages[1]
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
            // subHeading={"Who We Are"}
            // heading={"Who We Are"}
            onActive={() => setActiveImage(changesImageArr[2])}
            onFocus={() => setActiveBg(2)} // <-- bgImages[2]
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
            subHeading={"Our Clients"}
            heading={"Amazing brands, Amazed Clients."}
            onActive={() => setActiveImage(changesImageArr[3])}
            isClient={true}
            onFocus={() => setActiveBg(3)} // <-- bgImages[3]
          >
            <Clients />
          </BoxSlides>

          <BoxSlides
            scaleTransform={scaleTransform}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            headerRef={headerRef}
            bannervideoref={bannervideoref}
            via={false}
            // subHeading={"Company Steps"}
            // heading={"Amazing brands"}
            onActive={() => setActiveImage(changesImageArr[4])}
            onFocus={() => setActiveBg(4)} // <-- bgImages[4]
          >
            <Steps />
          </BoxSlides>

          <BoxSlides
            scaleTransform={scaleTransform}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            headerRef={headerRef}
            bannervideoref={bannervideoref}
            via={false}
            subHeading={"What We Do"}
            heading={"What We Do"}
            onActive={() => setActiveImage(changesImageArr[5])}
            onFocus={() => setActiveBg(5)} // <-- bgImages[4]
          >
            <WhatWeDo />
          </BoxSlides>

          <BoxSlides
            scaleTransform={scaleTransform}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            headerRef={headerRef}
            bannervideoref={bannervideoref}
            via={false}
            subHeading={"tell us about your project Idea or just"}
            heading={"say hello"}
            onActive={() => setActiveImage(changesImageArr[6])}
            onFocus={() => setActiveBg(6)} // <-- bgImages[4]
          >
            <EnquireForm />
          </BoxSlides>
        </>
      )}

      {/* <section className="h-screen"></section> */}
    </>
  );
}
