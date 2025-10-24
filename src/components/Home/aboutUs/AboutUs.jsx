"use client";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger);

export const AboutUs = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const boxSlideEl = section.closest('[data-boxslide="true"]') || section;
    let postScaleST = null;

    const ctx = gsap.context(() => {
      const h4 = section.querySelector(".js-weare");
      const h1 = section.querySelector(".js-title");
      const hides = section.querySelectorAll(".hide");
      const otherText = section.querySelector(".other_txt");
      const paraText = section.querySelector(".para");

      gsap.set(hides, { display: "inline-block", marginRight:'30px' });
      gsap.set(otherText, { width:0, opacity:0, display:"inline-block" });
      gsap.set(h1, {wordSpacing: "3px" });
      gsap.set(paraText, {transform: "translateY(20px)", opacity:0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: boxSlideEl,
          start: "top top",
          end: "+=120%",
          pin: boxSlideEl,
          pinSpacing: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          pinReparent: false,

          // 👇 clamp scale during the entire pin phase
          onEnter:   () => gsap.set(boxSlideEl, { scale: 1, transformOrigin: "center top" }),
          onUpdate:  () => gsap.set(boxSlideEl, { scale: 1 }),
          onEnterBack: () => {
            if (postScaleST) { postScaleST.kill(); postScaleST = null; }
            gsap.set(boxSlideEl, { scale: 1 });
          },

          // when pin completes, THEN create the post-pin scaler
          onLeave: () => {
            gsap.set(boxSlideEl, { scale: 1 });

            if (postScaleST) postScaleST.kill();
            postScaleST = ScrollTrigger.create({
              trigger: boxSlideEl,
              start: "bottom 50%",
              end: "bottom top",
              scrub: true,
              onUpdate: (st) => {
                const s = gsap.utils.mapRange(0, 1, 1, 0.86, st.progress);
                gsap.to(boxSlideEl, { scale: s, transformOrigin: "center top", duration: 0 });
              },
            });

            ScrollTrigger.refresh();
          },

          onLeaveBack: () => {
            if (postScaleST) { postScaleST.kill(); postScaleST = null; }
            gsap.set(boxSlideEl, { scale: 1 });
          },
        },
        defaults: { ease: "power3.out" },
      });

      // Phase 1 — fade middle spans out
      tl.to(hides, { autoAlpha: 0, duration: 0.5, stagger: 0.05 });
      tl.to(hides, {width:0})
      tl.to(otherText, {opacity:1, width:"auto"})
      tl.to(paraText, {opacity:1, transform:"translateY(0)"})

      // Phase 2 — squeeze G T F together
      // tl.to(h1, { letterSpacing: "-0.02em", wordSpacing: "0em", duration: 0.6 });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      if (postScaleST) postScaleST.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="about_section w-full min-h-screen px-[100px] flex flex-col justify-center"
      style={{ position: "relative", willChange: "transform" }}
    >
        <div className="absolute top-0 left-0 z-[-1] opacity-5 h-[100%]">
          <Image
            src={'/assets/home/about/bg.webp'}
            width={1920}
            height={1080}
            className="w-full object-cover h-full w-full"
          />
        </div>
      <h4 className="js-weare text-center text-[24px] tracking-[2px]">We Are</h4>
      <h1 className="js-title text-center text-[80px]">
        G<span className="hide">urukul</span>T<span className="hide">he</span>F<span className="hide">oundation </span>
        <span className="other_txt">Technologies</span>
      </h1>
      <p className="para text-[22px] mt-[50px] mx-auto tracking-[1px] text-center max-w-[80%]">GTF Technologies, conceptualized from Gurukul The Foundation, is a 16-year-old branding and digital media planning agency headquartered in Noida, Mumbai, Pune, and with an upcoming office in Bangalore.</p>
    </section>
  );
};
