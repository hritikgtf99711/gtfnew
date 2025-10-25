"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function BoxSlides({
  children,
  sectionId,
  noSticky = false,
  disableScale = false,
  subHeading,
  heading,
  isFirst,
  onActive, // optional (kept)
  onFocus, // use this to: setActiveBg(index)
  onResetTop, // use this to: setActiveBg(-1)
  main_customClass,
  inner_customClass,
  childrenClass,
}) {
  const sectionRef = useRef(null);
  const innerSecRef = useRef(null);

  useLayoutEffect(() => {
    const sectionEl = sectionRef.current;
    const innerEl = innerSecRef.current;
    if (!sectionEl || !innerEl) return;

    const ctx = gsap.context(() => {
      gsap.set(sectionEl, { transformOrigin: "center top" });
      gsap.set(innerEl, { willChange: "transform" });

      // 1) COVER DETECTOR — when this section covers the viewport (top hits top)
      //    Show its background; when it leaves, clear (or let next section take over).
      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top top",
        end: "bottom top",
        onEnter: () => onActive?.(), // show bg for this slide
        onEnterBack: () => onFocus?.(), // show bg again when scrolling back
        onLeave: () => onFocus?.(), // clear bg when passing up
        onLeaveBack: () => onResetTop?.(), // clear bg when scrolling back past
      });

      // 2) Optional “active” range (middle visibility) callback (kept for parity)
      // ScrollTrigger.create({
      //   trigger: sectionEl,
      //   start: "top bottom",
      //   end: "bottom top",
      //   onUpdate: (self) => {
      //     const p = self.progress; // 0..1 over the full pass
      //     if (p > 0.2 && p < 0.8) onActive?.();
      //   },
      // });

      // 3) Smooth scale in/out (if enabled)
      // if (!disableScale) {
      //   // Enter: 0.9 -> 1 while the top goes from bottom -> center
      //   ScrollTrigger.create({
      //     trigger: sectionEl,
      //     start: "top bottom",
      //     end: "top top",
      //     scrub: true,
      //     onUpdate: (self) => {
      //       const s = gsap.utils.mapRange(0, 1, 0.8, 1, self.progress);
      //       gsap.to(sectionEl, { scaleX: s, duration: 0, overwrite: "auto" });
      //     },
      //   });

      //   // Exit: 1 -> 0.86 while the bottom goes from center -> top
      //   ScrollTrigger.create({
      //     trigger: sectionEl,
      //     start: "bottom center",
      //     end: "bottom top",
      //     scrub: true,
      //     onUpdate: (self) => {
      //       const s = gsap.utils.mapRange(0, 1, 1, 0.8, self.progress);
      //       gsap.to(sectionEl, { scaleX: s, duration: 0, overwrite: "auto" });
      //     },
      //   });
      // }

      // 4) Heading/Subheading: collapsed by default, reveal around 50% viewport
      const headingWrap = sectionEl.querySelector(".heading");
      const sub = headingWrap?.querySelector("h2:first-child") || null;
      const main = headingWrap?.querySelector("h2:last-child") || null;

      // if (headingWrap && (sub || main)) {
      //   gsap.set(headingWrap, {
      //     height: 0,
      //     marginBottom: 0,
      //     overflow: "hidden",
      //     willChange: "height, margin",
      //   });
      //   gsap.set([sub, main].filter(Boolean), {
      //     clipPath: "inset(100% 0% 0% 0%)",
      //     WebkitClipPath: "inset(100% 0% 0% 0%)",
      //     opacity: 0,
      //     willChange: "clip-path, opacity",
      //   });

      //   const revealTL = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: sectionEl,
      //       start: "top 70%",
      //       end: "top 50%",
      //       scrub: true,
      //       invalidateOnRefresh: true,
      //     },
      //     defaults: { ease: "power2.out" },
      //   });

      //   // expand wrapper space
      //   revealTL.to(
      //     headingWrap,
      //     { height: "auto", marginBottom: 80, duration: 0.6 },
      //     0
      //   );

      //   // reveal lines
      //   if (sub) {
      //     revealTL.to(
      //       sub,
      //       {
      //         clipPath: "inset(0% 0% 0% 0%)",
      //         WebkitClipPath: "inset(0% 0% 0% 0%)",
      //         opacity: 1,
      //         duration: 0.6,
      //       },
      //       0.05
      //     );
      //   }
      //   if (main) {
      //     revealTL.to(
      //       main,
      //       {
      //         clipPath: "inset(0% 0% 0% 0%)",
      //         WebkitClipPath: "inset(0% 0% 0% 0%)",
      //         opacity: 1,
      //         duration: 0.6,
      //       },
      //       0.12
      //     );
      //   }
      // }

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => ctx.revert();
  }, [disableScale, onActive, onFocus, onResetTop]);

  return (
    <div
      ref={sectionRef}
      id={sectionId}
      data-boxslide="true"
      // 🔽 ensure minimum 100vh for every slide
      className={`${
        isFirst ? "mt-[-200px]" : ""
      } min-h-screen mb-[60vh] relative z-[99] animated_section ${main_customClass}`}
      style={{ willChange: "transform" }}
    >
      <div
        ref={innerSecRef}
        className={`relative bg-white z-9 items-center h-full pt-[40px] ${inner_customClass}`}
      >
        <div className="relative max-w-full box_padding">
          <div className={noSticky ? "" : "sticky top-0"}>
            <div className="relative w-full flex flex-col justify-center items-center">
              {heading && (
                <div className="heading text-center text-[#000] flex flex-col mb-[50px]">
                  <h2 className="uppercase font-semibold tracking-[3px] overflow-hidden">
                    {subHeading}
                  </h2>
                  <h2 className="text-[64px] uppercase tracking-[3px] font-normal overflow-hidden">
                    {heading}
                  </h2>
                </div>
              )}
              <div className={`relative w-full z-10 ${childrenClass}`}>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
