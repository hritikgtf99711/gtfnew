"use client";
import Banner from "@/components/Home/Banner";
import Portfolio from "../components/Home/Portfolio";
import Expertise from "@/components/Home/expertise/Expertise";
import BoxSlides from "@/components/common/BoxSlides";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Header from "@/components/header/Index";
import Clients from "./Client";
import WhoWeAre from "@/components/common/WhowWeAre";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";
import Steps from "@/components/Home/steps";
import WhatWeDo from "@/components/Home/whatWeDo/WhatWeDo";
import EnquireForm from "@/components/Home/EnquireForm/EnquireForm";
import Footer from "@/components/footer/Footer";
import { ThreeLogo } from "@/components/Home/logo/ThreeLogo";
import { AboutUs } from "@/components/Home/aboutUs/AboutUs";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ExpertiseNew from "@/components/Home/expertise/ExpertiseNew";
gsap.registerPlugin(ScrollTrigger);

const frames = [
  { img: "/assets/img/loader/slide_1.webp", name: "Project 1" },
  { img: "/assets/img/loader/slide_2.webp", name: "Project 2" },
  { img: "/assets/img/loader/slide_4.webp", name: "Project 4" },
  { img: "/assets/img/loader/slide_5.webp", name: "Project 5" },
  { img: "/assets/img/loader/slide_3.jpg", name: "Project 3" },
];

export default function Home() {
  const bannervideoref = useRef();
  const bannerRef = useRef();
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
  const [allowFirstImage, setAllowFirstImage] = useState(false);

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

  // Scroll handling for Banner
  const { scrollYProgress: bannerScrollProgress } = useScroll({
    target: bannerRef,
    offset: ["start start", "end start"],
  });

  // Reset activeBg when Banner is in view
  useEffect(() => {
    const unsubscribe = bannerScrollProgress.on("change", (progress) => {
      if (progress < 0.7) {
        setActiveBg(-1); // Reset background when Banner is in view
      }
    });
    return () => unsubscribe();
  }, [bannerScrollProgress]);

  // Loader sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setIsTextStart(true), 0);
    const timer2 = setTimeout(() => setIsTextEnd(true), 2000);
    const timer3 = setTimeout(() => setIsBgStart(true), 300);
    const timer5 = setTimeout(() => setIsLoaderCardEnd(true), 6000);
    // const timer6 = setTimeout(() => setIsLoaderVisible(false), 7200);
    // const timer7 = setTimeout(() => setIsTransitioning(false), 6200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer5);
      // clearTimeout(timer6);
      // clearTimeout(timer7);
    };
  }, []);

  useLayoutEffect(() => {
    if (isLoaderVisible) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isLoaderVisible]);

  // NEW: gate the first slide overlay by a ScrollTrigger threshold
  useLayoutEffect(() => {
    const el = document.getElementById("first-slide");
    if (!el) return;

    const st = ScrollTrigger.create({
      trigger: el,
      // when the first slide's bottom reaches 70% from top (=> covers 30%), allow overlay
      start: "bottom 70%",
      end: "bottom top",
      onEnter: () => setAllowFirstImage(true),
      onEnterBack: () => setAllowFirstImage(true),
      onLeaveBack: () => setAllowFirstImage(false), // scrolling up above 30% coverage -> block overlay
    });

    ScrollTrigger.refresh();
    return () => st.kill();
  }, []);

  // NEW: whenever we're not allowed (above threshold), clear overlays immediately
  useEffect(() => {
    if (!allowFirstImage) {
      setActiveImage(null);
      setActiveBg(-1);
    }
  }, [allowFirstImage]);

  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     const trigger = "#about-slide";
  //     // Pin the same element that would otherwise be sticky for this section:
  //     // since we passed noSticky={true}, the sticky wrapper is absent,
  //     // so we can pin the inner container itself or a stable child.
  //     const pinTarget = document.querySelector("#about-slide .box_padding") || document.querySelector("#about-slide");

  //     if (!pinTarget) return;

  //     // Explicitly set initial state (prevents "first fade" + "second repaint")
  //   gsap.set("#about-slide .js-weare", { y: 80, autoAlpha: 0 });
  //   gsap.set("#about-slide .js-title", { y: 120, autoAlpha: 0 });

  //     const tl = gsap.timeline({
  //       scrollTrigger: {
  //         trigger,                 // section root
  //         start: "top top",
  //         end: "+=120%",           // same as your pinDistance
  //         pin: pinTarget,          // pin only this slide
  //         pinSpacing: true,
  //         scrub: 0.5,
  //         anticipatePin: 1,
  //         invalidateOnRefresh: true,
  //         pinReparent: true,           // ⭐ move element out of transformed ancestor
  //       },
  //       defaults: { ease: "power3.out",overwrite: "auto" },
  //     });

  //     // Animate only the AboutUs headings under this slide
  //     tl.fromTo("#about-slide .js-weare",
  //       { y: 80, autoAlpha: 0 },
  //       { y: 0, autoAlpha: 1, duration: 0.6, immediateRender: false }
  //     ).fromTo("#about-slide .js-title",
  //       { y: 120, autoAlpha: 0 },
  //       { y: 0, autoAlpha: 1, duration: 0.9, immediateRender: false },
  //       "-=0.2"
  //     );

  //     // Call refresh in case images/fonts change sizes
  //     ScrollTrigger.refresh();
  //   });

  //   return () => ctx.revert();
  // }, []);

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
              className={`fixed w-full `}
              initial={{ top: "20vh" }}
              animate={{
                top: isLoaderCardEnd ? "calc(100vh - 120px)" : "20vh",
                transition: { duration: 0.5, ease: "easeInOut" },
              }}
              onAnimationComplete={() => {
                setTimeout(() => {
                  setIsTransitioning(false);
                }, 500);
              }}
            >
              <div className="mx-auto flex justify-center w-[75%]">
                <div className="  grid grid-cols-[1fr_1fr_1.8fr_1fr_1fr] gap-[15px] items-start font-serif text-black w-full">
                  {frames.map((frame, i) => (
                    <div
                      key={i}
                      ref={(el) => (cardRefs.current[i] = el)}
                      className={`img_after relative overflow-hidden cursor-pointer group  ${
                        i !== 2 && "hover:basis-[60%]"
                      }`} //basis-[${i === 2 ? "80%" : "50%"}]
                    >
                      {i === 2 && (
                        <div className="overflow-hidden relative h-[380px]">
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
              top: isTransitioning ? "0" : "calc(100vh - 280px)",
              scale: isTransitioning ? 1 : 0.85,
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            onAnimationComplete={() => {
              setTimeout(() => {
                setIsLoaderVisible(false);
              }, 500);
            }}
          />
        </>
      )}

      <Banner sectionRef={bannerRef} bannervideoref={bannervideoref} />

      {!isLoaderVisible && (
        <>
          <Header
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            ref={headerRef}
          />

          {activeImage && (
            <div className="fixed inset-0 z-[9]">
              <img
                src={activeImage}
                alt="Background"
                className="w-full h-full object-cover transition-all duration-700"
              />
            </div>
          )}

          <BoxSlides
            sectionId="first-slide"
            scaleTransform={scaleTransform}
            setscaleTransform={setscaleTransform}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            headerRef={headerRef}
            bannervideoref={bannervideoref}
            via={true}
            onActive={() => {                 // DOWN into slide 0 -> show bg[0]
              setActiveBg(0);
              setActiveImage(changesImageArr[0]); // if you want the large overlay too
            }}
            subHeading={"Chapter One"}
            heading={"What We Do"}
            isFirst={true}
            onFocus={() => {
              if (allowFirstImage) setActiveBg(0); // show bgImages[0]
            }}
            onEnterBack={() => {              // UP into slide 0 from below -> show banner
              setActiveBg(-1);
              setActiveImage(null);
            }}
            onLeaveBack={() => {              // UP above slide 0 start -> show banner
              setActiveBg(-1);
              setActiveImage(null);
            }}
            onResetTop={() => {
              // ⬅️ clear both when you scroll back above the slide
              setActiveBg(-1);
              setActiveImage(null);
            }}
          >
            <WhatWeDo />
          </BoxSlides>

          <BoxSlides
            sectionId="about-slide"
            noSticky={true}
            scaleTransform={scaleTransform}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            headerRef={headerRef}
            bannervideoref={bannervideoref}
            // disableScale={true}
            via={false}
            onActive={() => {                 // DOWN into slide 1 -> show bg[1]
              setActiveBg(1);
              setActiveImage(changesImageArr[1]);
            }}
            onEnterBack={() => {              // UP into slide 1 -> previous is slide 0
              setActiveBg(0);
              setActiveImage(changesImageArr[0]);
            }}
            onLeaveBack={() => {              // UP above slide 1 start -> previous is slide 0
              setActiveBg(0);
              setActiveImage(changesImageArr[0]);
            }}
            onFocus={() => setActiveBg(1)}
            /** NEW: enable pin + scroll-tied heading animation here */
            // enablePin={true}
            pinDistance="120%" // tweak 100%–200% to tastem
            main_customClass="!min-h-[100vh]"
            inner_customClass="!pt-0"
            onResetTop={() => setActiveBg(0)}
            // animateSelectors={{ h4: ".js-weare", h1: ".js-title" }}
          >
            <AboutUs />
          </BoxSlides>

          {/* <BoxSlides
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
        </BoxSlides> */}

          {/* <BoxSlides
          scaleTransform={scaleTransform}
          setscaleTransform={setscaleTransform}
          isHidden={isHidden}
          setIsHidden={setIsHidden}
          headerRef={headerRef}
          bannervideoref={bannervideoref}
          via={true}
          onActive={() => setActiveImage(changesImageArr[0])}
          // subHeading={"Our Projects"}
          // heading={"Projects"}
          isFirst={true}
          onFocus={() => setActiveBg(0)} // <-- tell parent to show bgImages[0]
          onResetTop={() => setActiveBg(-1)}
        >
          <ThreeLogo />
        </BoxSlides> */}

          <BoxSlides
            scaleTransform={scaleTransform}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            headerRef={headerRef}
            bannervideoref={bannervideoref}
            via={false}
            // subHeading={"Our Works"}
            // heading={"Innovation Market"}
            onActive={() => { setActiveBg(2); setActiveImage(changesImageArr[2]); }}
            onEnterBack={() => { setActiveBg(1); setActiveImage(changesImageArr[1]); }}
            onLeaveBack={() => { setActiveBg(1); setActiveImage(changesImageArr[1]); }}
            onFocus={() => setActiveBg(2)} // <-- bgImages[1]
            childrenClass=""
            onResetTop={() => setActiveBg(1)}
          >
            <ExpertiseNew />
          </BoxSlides>

          {/* <BoxSlides
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
        </BoxSlides> */}

          <BoxSlides
            scaleTransform={scaleTransform}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            headerRef={headerRef}
            bannervideoref={bannervideoref}
            via={false}
            subHeading={"Our Clients"}
            heading={"Amazed Clients."}
            onActive={() => { setActiveBg(3); setActiveImage(changesImageArr[3]); }}
            onEnterBack={() => { setActiveBg(2); setActiveImage(changesImageArr[2]); }}
            onLeaveBack={() => { setActiveBg(2); setActiveImage(changesImageArr[2]); }}
            isClient={true}
            onFocus={() => setActiveBg(3)} // <-- bgImages[3]
            onResetTop={() => setActiveBg(2)}
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
            onActive={() => { setActiveBg(4); setActiveImage(changesImageArr[4]); }}
            onEnterBack={() => { setActiveBg(3); setActiveImage(changesImageArr[3]); }}
            onLeaveBack={() => { setActiveBg(3); setActiveImage(changesImageArr[3]); }}
            onFocus={() => setActiveBg(4)} // <-- bgImages[4]
            onResetTop={() => setActiveBg(3)}
          >
            <Steps />
          </BoxSlides>

          {/* <BoxSlides
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
          <Portfolio scaleTransform={scaleTransform} isHidden={isHidden} />
        </BoxSlides> */}

          <BoxSlides
            scaleTransform={scaleTransform}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
            headerRef={headerRef}
            bannervideoref={bannervideoref}
            via={false}
            subHeading={"tell us about your project Idea or just"}
            heading={"say hello"}
            onFocus={() => setActiveBg(4)} // <-- bgImages[4]
            onActive={() => { setActiveBg(4); setActiveImage(changesImageArr[4]); }}
            onEnterBack={() => { setActiveBg(3); setActiveImage(changesImageArr[3]); }}
            onLeaveBack={() => { setActiveBg(3); setActiveImage(changesImageArr[3]); }}
            onResetTop={() => setActiveBg(3)}
          >
            <EnquireForm />
          </BoxSlides>

          {activeBg !== -1 && (
            <div className="fixed inset-0 z-[9]">
              {bgImages.map((src, i) => (
                <motion.img
                  key={i}
                  src={src}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: activeBg === i ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  // optional perf hint:
                  style={{ willChange: "opacity" }}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* <section className="h-screen"></section> */}
    </>
  );
}
