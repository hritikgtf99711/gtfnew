"use client";
import Banner from "@/components/Home/Banner";
import Portfolio from "../components/Home/Portfolio";
import Expertise from "@/components/Home/expertise/Expertise";
import BoxSlides from "@/components/common/BoxSlides";
import { useRef, useState } from "react";
import Header from "@/components/header/Index";
import Clients from "./Client";
import WhoWeAre from "@/components/common/WhowWeAre";
import { useScroll, useSpring,useMotionValueEvent } from "framer-motion";

export default function Home() {
  const bannervideoref = useRef();
  const headerRef = useRef();
  const [scaleTransform, setscaleTransform] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [activeImage, setActiveImage] = useState(null);
  const [latestN,setlatest]=useState();

  const sectionRefs = [useRef(), useRef(), useRef(), useRef()];

  const changesImageArr = [
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img_2.jpg",
    "/assets/img/mide_section_img_3.jpg",
    "/assets/img/portfolio/portfolio_5.jpg",
  ];

  const scrollProgress = sectionRefs.map((ref) => {
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start end", "end start"],
    });
    return useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 1});
  });
  
  scrollProgress.forEach((progress, index) => {
  useMotionValueEvent(progress, "change", (latest) => {
    setlatest(latest)
    if (index === 0) {
      bannervideoref.current.style.opacity = latest < 0.5 ? "1" : "0";
    }

    if (latest >= 0) {
      setActiveImage(changesImageArr[index === 0 ? 1 : index]);
    } else if (latest < 5 && index > 0.5 && scrollProgress[index - 1]) {
      setActiveImage(changesImageArr[index === 1 ? 1 : index - 1]);
    }
  });
});
  return (
    <>
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
        hide={1}
        scaleTransform={scaleTransform}
        setscaleTransform={setscaleTransform}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        headerRef={headerRef}
        sectionRef={sectionRefs[0]}
        smoothScrollProgress={scrollProgress[0]}
        index={0}
        bannervideoref={bannervideoref}
        via={true}
        latestN={latestN}
        onActive={() => setActiveImage(changesImageArr[0])}
        subHeading={"Our Projects"}
        heading={"Projects"}
      >
        <Portfolio sectionRef={sectionRefs[0]} scaleTransform={scaleTransform} smoothScrollProgress={scrollProgress[1]} isHidden={isHidden} />
      </BoxSlides>

      <BoxSlides
        scaleTransform={scaleTransform}
        setscaleTransform={setscaleTransform}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        headerRef={headerRef}
        sectionRef={sectionRefs[1]}
        smoothScrollProgress={scrollProgress[1]}
        index={1}
        bannervideoref={bannervideoref}
        via={false}
        onActive={() => setActiveImage(changesImageArr[1])}
      >
        <Expertise />
      </BoxSlides>

      <BoxSlides
        scaleTransform={scaleTransform}
        setscaleTransform={setscaleTransform}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        headerRef={headerRef}
        sectionRef={sectionRefs[2]}
        smoothScrollProgress={scrollProgress[2]}
        index={2}
        bannervideoref={bannervideoref}
        via={false}
        onActive={() => setActiveImage(changesImageArr[2])}
      >
        <WhoWeAre />
      </BoxSlides>

      <BoxSlides
        scaleTransform={scaleTransform}
        setscaleTransform={setscaleTransform}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        headerRef={headerRef}
        sectionRef={sectionRefs[3]}
        smoothScrollProgress={scrollProgress[3]}
        index={3}
        bannervideoref={bannervideoref}
        via={false}
        onActive={() => setActiveImage(changesImageArr[3])}
      >
        <Clients />
      </BoxSlides>
    </>
  );
}
