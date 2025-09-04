"use client";
import Banner from "@/components/Home/Banner";
import Portfolio from "../components/Home/Portfolio";
import Expertise from "@/components/Home/expertise/Expertise";
import BoxSlides from "@/components/common/BoxSlides";
import { useRef, useState } from "react";
import Header from "@/components/header/Index";
import Clients from "./Client";
import WhoWeAre from "@/components/common/WhowWeAre";

export default function Home() {
  const bannervideoref = useRef();
  const [scaleTransform, setscaleTransform] = useState(0);
  const headerRef = useRef();
  const [isHidden, setIsHidden] = useState(false);

  // 🔥 background controller
  const [activeImage, setActiveImage] = useState(null);

  const changesImageArr = [
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img.jpg",
    "/assets/img/mide_section_img_2.jpg",
    "/assets/img/portfolio/portfolio_4.jpg",
    "/assets/img/portfolio/portfolio_5.jpg",
  ];

  return (
    <>
      <Header
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        ref={headerRef}
      />
      <Banner bannervideoref={bannervideoref} />

      {/* ✅ Single background layer */}
      <div className="fixed inset-0 z-[-1]">
        {activeImage && (
          <img
            src={activeImage}
            alt="Background"
            className="w-full h-full object-cover transition-all duration-700"
          />
        )}
      </div>

      {/* ✅ Multiple BoxSlides */}
      <BoxSlides
        hide={1}
        scaleTransform={scaleTransform}
        setscaleTransform={setscaleTransform}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        headerRef={headerRef}
        index={0}
        bannervideoref={bannervideoref}
        via={true}
        onActive={() => setActiveImage(changesImageArr[0])}
      >
        <Portfolio scaleTransform={scaleTransform} isHidden={isHidden} />
      </BoxSlides>

      <BoxSlides
        scaleTransform={scaleTransform}
        setscaleTransform={setscaleTransform}
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        headerRef={headerRef}
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
