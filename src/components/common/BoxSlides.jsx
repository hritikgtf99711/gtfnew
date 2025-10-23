"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function BoxSlides({
  children,
  sectionId,
  noSticky = false,
  disableScale = false,
  via,
  isHidden,
  hide,
  setscaleTransform, // kept for API parity (now a no-op provider)
  subHeading,
  heading,
  isFirst,
  onActive,
  isClient,
  onFocus,
  onResetTop,
  enablePin = false,
  main_customClass,
  inner_customClass,
  childrenClass,
  animateSelectors = { h4: ".js-weare", h1: ".js-title" },
  pinDistance = "120%", // or a number like 1200
}) {
  const [isLoading, setIsLoading] = useState(true);

  const sectionRef = useRef(null);
  const innerSecRef = useRef(null);

  // dynamic scale mapping
  const paddingInputRef = useRef([0, 0.4, 1]);
  const scaleXOutputRef = useRef([0.8, 1, 0.8]);

  // guards
  const resetArmedRef = useRef(true);
  const wasCenteredRef = useRef(false);

  // local refs to nodes we animate
  const subHeadingH2Ref = useRef(null);
  const headingH2Ref = useRef(null);

  // measure viewport width for scale mapping
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1920
  );

  useEffect(() => {
    const handleResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 6500);
    return () => clearTimeout(t);
  }, []);

  // recompute piecewise mapping once loading done and on vw change
  useEffect(() => {
    if (!isLoading && sectionRef.current) {
      const VH = window.innerHeight;
      const SH = sectionRef.current.offsetHeight;

      const p1 = VH / (SH + VH);
      const p2 = (SH + VH / 2) / (SH + VH);
      paddingInputRef.current = [0, p1, p2, 1];

      // base paddings -> scaleX
      const basePaddings = [200, 0, 0, 200];
      const out = basePaddings.map((p) =>
        Math.max(0.1, (vw - 2 * p) / vw)
      );
      scaleXOutputRef.current = out;
    }
  }, [isLoading, vw]);

  // helper: piecewise-linear map progress -> value
  const interp = (x, inPts, outPts) => {
    const n = Math.min(inPts.length, outPts.length);
    if (n < 2) return outPts[0] ?? 0;

    if (x <= inPts[0]) return outPts[0];
    if (x >= inPts[n - 1]) return outPts[n - 1];

    for (let i = 0; i < n - 1; i++) {
      const x1 = inPts[i], x2 = inPts[i + 1];
      const y1 = outPts[i], y2 = outPts[i + 1];
      if (x >= x1 && x <= x2) {
        const t = (x - x1) / (x2 - x1 || 1e-6);
        return y1 + t * (y2 - y1);
      }
    }
    return outPts[n - 1];
  };

  // MAIN GSAP WIRES
  useLayoutEffect(() => {
    if (!sectionRef.current || !innerSecRef.current) return;

    const ctx = gsap.context(() => {
      const sectionEl = sectionRef.current;
      const innerEl = innerSecRef.current;

      // find the optional heading block (your static markup)
      const subHeadingNode =
        sectionEl.querySelector(".heading > h2:first-child") || null;
      const headingNode =
        sectionEl.querySelector(".heading > h2:last-child") || null;
      subHeadingH2Ref.current = subHeadingNode;
      headingH2Ref.current = headingNode;

      // ———————————————————————————
      // 1) MASTER PROGRESS TRIGGER (start: top arrives in viewport bottom, end: bottom leaves viewport top)
      //    This mimics your framer useScroll({ offset: ["start end", "end start"] })
      // ———————————————————————————
      const masterST = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const p = self.progress; // 0..1 across section visibility
      
          // onActive when within (0.2, 0.8)
          if (p > 0.2 && p < 0.8 && onActive) onActive();
      
          // onResetTop when very close to the very top (entering)
          if (p <= 0.02) {
            if (resetArmedRef.current) {
              onResetTop?.();
              resetArmedRef.current = false;
            }
          } else if (p >= 0.06) {
            resetArmedRef.current = true;
          }
      
          // ✅ Always define sx before using it
          let sx = disableScale
            ? 1
            : interp(p, paddingInputRef.current, scaleXOutputRef.current);
      
          // Only apply transform if scaling is enabled
          if (!disableScale) {
            gsap.set(sectionEl, { scaleX: sx, transformOrigin: "center top" });
          }
      
          // onFocus when scaleX ~ 1
          const isCenteredNow = sx > 0.99;
          if (isCenteredNow && !wasCenteredRef.current) {
            wasCenteredRef.current = true;
            onFocus?.();
          }
          if (!isCenteredNow && wasCenteredRef.current) {
            wasCenteredRef.current = false;
          }
        },
      });

      // ———————————————————————————
      // 2) HEADING SCROLL EFFECTS
      //    Two separate ranges like your headingScrollProgress & headingClipProgress
      //    Offsets: ["0.2 1", "0.3 0"] and ["0.3 1", "1 1"]
      // ———————————————————————————

      // A) Progress for opacity/translate (0.2 -> 1 in viewport space)
      const headingProgST = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top+=20% bottom", // approx "0.2 1"
        end: "bottom top",        // approx "1 0"
        onUpdate: (self) => {
          const p = self.progress; // 0..1 across section visibility
        
          // onActive when within (0.2, 0.8)
          if (p > 0.2 && p < 0.8 && onActive) onActive();
        
          // onResetTop when very close to the very top (entering)
          if (p <= 0.02) {
            if (resetArmedRef.current) {
              onResetTop?.();
              resetArmedRef.current = false;
            }
          } else if (p >= 0.06) {
            resetArmedRef.current = true;
          }
        
          // ✅ Always define sx so we can safely use it below
          let sx = disableScale
            ? 1
            : interp(p, paddingInputRef.current, scaleXOutputRef.current);
        
          // Only apply the transform when scaling is enabled
          if (!disableScale) {
            gsap.set(sectionEl, { scaleX: sx, transformOrigin: "center top" });
          }
        
          // onFocus when scaleX ~ 1
          const isCenteredNow = sx > 0.99;
          if (isCenteredNow && !wasCenteredRef.current) {
            wasCenteredRef.current = true;
            onFocus?.();
          }
          if (!isCenteredNow && wasCenteredRef.current) {
            wasCenteredRef.current = false;
          }
        }
      });

      // B) Clip-path reveal (0.3 -> 1)
      const clipProgST = ScrollTrigger.create({
        trigger: sectionEl,
        start: "top+=30% bottom", // ~ "0.3 1"
        end: "bottom bottom",     // ~ "1 1"
        onUpdate: (self) => {
          const p = self.progress; // 0..1
          // from "inset(100% 0 0 0)" -> "inset(0 0 0 0)"
          const clipTop = Math.round((1 - p) * 100);
          const clipVal = `inset(${clipTop}% 0% 0% 0%)`;

          if (subHeadingNode) gsap.set(subHeadingNode, { clipPath: clipVal });
          if (headingNode) gsap.set(headingNode, { clipPath: clipVal });
        },
      });

      // ———————————————————————————
      // 3) OPTIONAL PIN + AboutUs headings timeline while pinned
      // ———————————————————————————
      let pinTL = null;
      // if (enablePin) {
      //   pinTL = gsap.timeline({
      //     scrollTrigger: {
      //       trigger: sectionEl,
      //       start: "top top",
      //       end: `+=${pinDistance}`,
      //       pin: innerEl,
      //       pinSpacing: true,
      //       scrub: 0.5,
      //       anticipatePin: 1,
      //     },
      //     defaults: { ease: "power3.out" },
      //   });

      //   pinTL
      //     .from(animateSelectors.h4, { y: 80, opacity: 0, duration: 0.6 })
      //     .from(
      //       animateSelectors.h1,
      //       { y: 120, opacity: 0, duration: 0.9 },
      //       "-=0.2"
      //     );
      // }

      // cleanup
      return () => {
        masterST.kill();
        headingProgST.kill();
        clipProgST.kill();
        if (pinTL) pinTL.scrollTrigger?.kill();
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [enablePin, pinDistance, animateSelectors]);

  return (
    <div
      ref={sectionRef}
      id={sectionId}   
      data-boxslide="true" 
      className={`${isFirst && "mt-[-200px]"} mb-[60vh] relative z-[99] animated_section min-h-[calc(100vh+200px)] ${main_customClass}`}
      style={{
        willChange: "transform",
      }}
    >
      <div
        ref={innerSecRef}
        className={`relative bg-white z-9 items-center h-full pt-[40px] ${inner_customClass}`}
      >
        <div className={`relative max-w-full box_padding`}>
          <div className={noSticky ? "" : "sticky top-0"}>
            <div className="relative w-full flex flex-col justify-center items-center">
              {heading && (
                <div className="heading text-center text-[#000] flex flex-col mb-[80px]">
                  {/* subHeading */}
                  <h2
                    className="uppercase font-semibold tracking-[3px]"
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    {subHeading}
                  </h2>

                  {/* main heading */}
                  <h2
                    className="text-[64px] uppercase tracking-[3px] font-normal"
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    {heading}
                  </h2>
                </div>
              )}

              <div className={`relative w-full z-10 ${childrenClass}`}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
