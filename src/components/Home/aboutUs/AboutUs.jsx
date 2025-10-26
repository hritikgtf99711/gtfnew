"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export const AboutUs = ({ setActiveBg, setActiveImage }) => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const h4 = section.querySelector(".js-weare");
      const h1 = section.querySelector(".js-title");
      const hides = section.querySelectorAll(".hide");
      const otherText = section.querySelector(".other_txt");
      const paraText = section.querySelector(".para");

      // Initial states for animations
      gsap.set(hides, { display: "inline-block", marginRight: "30px" });
      gsap.set(otherText, { width: 0, opacity: 0, display: "inline-block" });
      gsap.set(h1, { wordSpacing: "3px" });
      gsap.set(section, { transformOrigin: "center top" });

      gsap.set(paraText, { y: 20, opacity: 0 });
      gsap.set(section, { scale: 0.8 });

      // Animation timeline with pinning
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=120%", // Pin for 120% of viewport height
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => {
            setActiveBg?.(0); // Match BoxSlides' onActive for index 1
            // setActiveImage?.("/assets/img/mide_section_img.jpg"); // Match changesImageArr[1]
            console.log('on enter about');
          },
          onEnterBack: () => {
            setActiveBg?.(0); // Match BoxSlides' onEnterBack
            // setActiveImage?.("/assets/img/mide_section_img.jpg"); // Match changesImageArr[0]
            console.log('onEnterBack about');
          },
          onLeave: () => {
            setActiveBg?.(1); // Transition to next section's background
            // setActiveImage?.("/assets/img/mide_section_img_2.jpg"); // Match changesImageArr[2]
            console.log('onLeave about');

          },
          onLeaveBack: () => {
            setActiveBg?.(1); // Match BoxSlides' onLeaveBack
            // setActiveImage?.("/assets/img/mide_section_img.jpg"); // Match changesImageArr[0]
            console.log('onLeaveBack about');
          },
        },
        defaults: { ease: "power3.out" },
      });

      // Animation sequence
      tl.to(hides, { autoAlpha: 0, duration: 0.5, stagger: 0.05 })
        .to(hides, { width: 0, duration: 0.3 }, "-=0.2")
        .to(otherText, { opacity: 1, width: "auto", duration: 0.3 }, "-=0.1")
        .to(paraText, { y: 0, opacity: 1, duration: 0.6 });

      // Optional: Squeeze G T F together (uncomment if desired)
      // tl.to(h1, { letterSpacing: "-0.02em", wordSpacing: "0em", duration: 0.6 });

      // Separate ScrollTrigger for shrinking effect
      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "top top",
        scrub: 0.1,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = gsap.utils.mapRange(0, 1, 0.8, 1, progress);
          gsap.set(section, { scale, overwrite: "auto" });
        },
      });

      // Scaling on exit (1 to 0.8 as bottom moves from center to top)
      ScrollTrigger.create({
        trigger: section,
        start: "bottom center",
        end: "bottom top",
        scrub: 0.1,
        onUpdate: (self) => {
          const progress = self.progress;
          const scale = gsap.utils.mapRange(0, 1, 1, 0.8, progress);
          gsap.set(section, { scale, overwrite: "auto" });
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [setActiveBg, setActiveImage]);

  return (
    <section
      ref={sectionRef}
      id="about-slide" // Match the ID used in app.js for consistency
      className="about_section relative w-full min-h-screen px-[100px] flex flex-col justify-center bg-white z-[99] mb-[60vh]"
      // style={{ position: "relative", willChange: "transform" }}
    >
      <div className="absolute top-0 left-0 z-[-1] opacity-5 h-[100%]">
        <Image
          alt="about bg image"
          src="/assets/home/about/bg.webp"
          width={1920}
          height={1080}
          className="w-full object-cover h-full"
        />
      </div>
      <h4 className="js-weare text-center text-[24px] tracking-[2px]">We Are</h4>
      <h1 className="js-title text-center text-[80px]">
        G<span className="hide">urukul</span>T<span className="hide">he</span>F
        <span className="hide">oundation </span>
        <span className="other_txt">Technologies</span>
      </h1>
      <p className="para text-[22px] mt-[50px] mx-auto tracking-[1px] text-center max-w-[80%]">
        GTF Technologies, conceptualized from Gurukul The Foundation, is a 16-year-old branding and digital media planning agency headquartered in Noida, Mumbai, Pune, and with an upcoming office in Bangalore.
      </p>
    </section>
  );
};