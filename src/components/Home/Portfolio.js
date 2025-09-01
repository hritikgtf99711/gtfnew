"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  animate,
  useTransform,
  useScroll,
  useAnimation,
  AnimatePresence, // only for the modal
} from "framer-motion";

export default function Portfolio() {
  // ---------- wheel width behavior (kept) ----------
  const width = useMotionValue(80);
  const [renderWidth, setRenderWidth] = useState("80%");

  // allow width-resize only when not scroll-locked
  const [scrollLocked, setScrollLocked] = useState(true);

  // ---------- refs & modal ----------
  const bottomSectionRef = useRef(null);
  const anchorRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // ---------- boot / sequence state ----------
  const [isFixed, setIsFixed] = useState(true);        // section fixed fullscreen initially
  const [booting, setBooting] = useState(true);        // brown box + clip phase
  const [showBox, setShowBox] = useState(false);       // mount box after bg shows
  const [showClip, setShowClip] = useState(false);     // show image after brown fades
  const [revealContent, setRevealContent] = useState(false);

  // clip frames
  const frames = [
    "/assets/img/slide_1.webp",
    "/assets/img/slide_2.webp",
    "/assets/img/slide_3.webp",
    "/assets/img/slide_4.webp",
    "/assets/img/slide_5.webp",
  ];
  const [frameIndex, setFrameIndex] = useState(0);

  // controllers
  const sectionControls = useAnimation(); // moves the section

  // BOOT BOX motion values (pure JS control)
  const boxScale = useMotionValue(0.2);   // start smaller
  const boxOpacity = useMotionValue(0);   // start invisible
  const boxY = useMotionValue(0);         // box glide down
  const bgOpacity = useMotionValue(1);    // brown overlay 1 → 0

  // ---------- utility: hard clear any leftover overflow from html/body ----------
  const clearOverflow = () => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    // remove inline overflow if any was left by other code
    bodyEl.style.removeProperty("overflow");
    htmlEl.style.removeProperty("overflow");

    // as a stronger reset, set to auto then remove on next frame
    bodyEl.style.overflow = "auto";
    htmlEl.style.overflow = "auto";
    requestAnimationFrame(() => {
      bodyEl.style.removeProperty("overflow");
      htmlEl.style.removeProperty("overflow");
      // final fallback
      bodyEl.style.overflow = "";
      htmlEl.style.overflow = "";
    });
  };

  // clear any previous leftover overflow right away (from HMR, other libs, etc.)
  useEffect(() => {
    clearOverflow();
  }, []);

  // ---------- scroll lock (NO overflow hidden) ----------
  // We only prevent scroll events; we do not touch html/body overflow at all.
  const shouldLock = isFixed || scrollLocked;

  useEffect(() => {
    const prevent = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const preventKeys = (e) => {
      const keys = ["ArrowUp","ArrowDown","PageUp","PageDown","Home","End"," "];
      if (keys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (shouldLock) {
      window.addEventListener("wheel", prevent, { passive: false });
      window.addEventListener("touchmove", prevent, { passive: false });
      window.addEventListener("keydown", preventKeys, false);
      return () => {
        window.removeEventListener("wheel", prevent, { passive: false });
        window.removeEventListener("touchmove", prevent, { passive: false });
        window.removeEventListener("keydown", preventKeys, false);
      };
    } else {
      // ensure any stray inline styles from elsewhere are cleared
      clearOverflow();
    }
  }, [shouldLock]);

  // Width resize wheel (blocked while shouldLock = true)
  useEffect(() => {
    const handleWheel = (event) => {
      if (shouldLock) return; // ignore while locked
      const delta = event.deltaY;
      let newWidth = width.get() + delta * 0.6;
      newWidth = Math.max(80, Math.min(newWidth, 100));
      animate(width, newWidth, {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (v) => setRenderWidth(`${v.toFixed(2)}%`),
      });
    };
    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [width, shouldLock]);

  // ---------- main sequence ----------
  useEffect(() => {
    let intervalId;
    let cancelled = false;

    (async () => {
      // section is opaque white, fixed fullscreen (no flicker)
      await sectionControls.set({ opacity: 1, y: 0 });

      // show only background first; THEN mount the box
      setShowBox(true);

      // 1) fade in the box (opacity 0 -> 1) via JS
      await animate(boxOpacity, 1, { duration: 0.35, ease: "easeOut" });

      // 2) scale 0.2 -> 1 via JS (1s)
      await animate(boxScale, 1, { duration: 1.0, ease: [0.25, 0.8, 0.25, 1] });

      // 3) wait 500ms, then fade brown overlay and start image clip
      await new Promise((r) => setTimeout(r, 500));
      if (cancelled) return;

      await animate(bgOpacity, 0, { duration: 0.25, ease: "linear" });
      setShowClip(true);

      // 4) play the clip
      setFrameIndex(0);
      const frameDelay = 140; // per frame
      const holdAfter = 420;  // hold on last frame
      const followDelay = 200; // section follows box after 200ms

      intervalId = window.setInterval(() => {
        setFrameIndex((i) => {
          if (i + 1 >= frames.length) {
            window.clearInterval(intervalId);

            // 5) box glides to anchor, section follows after 200ms
            setTimeout(async () => {
              const anchorTop =
                (anchorRef.current && anchorRef.current.getBoundingClientRect().top) || 0;

              await animate(boxY, anchorTop, {
                duration: 0.9, ease: [0.2, 0.7, 0.2, 1],
              });

              setTimeout(async () => {
                await sectionControls.start({
                  y: anchorTop,
                  transition: { duration: 0.9, ease: [0.2, 0.7, 0.2, 1] },
                });

                // land & restore normal flow
                setIsFixed(false);
                sectionControls.set({ y: 0 });

                // hide box & reveal real content
                setBooting(false);
                setRevealContent(true);

                // 🔓 finally allow scrolling; also clear any leftover inline overflow
                setTimeout(() => {
                  setScrollLocked(false);
                  clearOverflow();
                }, 300);
              }, followDelay);
            }, holdAfter);

            return i;
          }
          return i + 1;
        });
      }, frameDelay);
    })();

    return () => {
      cancelled = true;
      if (intervalId) window.clearInterval(intervalId);
      // clear on unmount just in case
      clearOverflow();
    };
  }, [sectionControls, boxOpacity, boxScale, bgOpacity, boxY]);

  // ---------- scroll scale only when relative (not fixed) ----------
  const { scrollYProgress } = useScroll({
    target: bottomSectionRef,
    offset: ["start end", "end start"],
  });
  const scaleTransform = useTransform(scrollYProgress, [0, 0.8, 1], [0.8, 1.05, 0.8]);

  // ---------- modal variants (kept) ----------
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1, scale: 1,
      transition: { type: "spring", stiffness: 120, damping: 15, when: "beforeChildren", staggerChildren: 0.5 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };
  const imageVariants = {
    hidden: { scale: 1, y: 0 },
    visible: {
      scale: [1, 2, 2, 1],
      y: [0, 0, -50, 50],
      transition: {
        scale: { times: [0, 0.2, 0.5, 1], duration: 2 },
        y: { times: [0, 0.2, 0.5, 1], duration: 2 },
      },
    },
    exit: { scale: 0.8, y: 0, transition: { duration: 0.3 } },
  };
  const contentVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.15 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };
  const parentStagger = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { when: "beforeChildren", staggerChildren: 0.08 } },
  };
  const childFade = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const handleCardClick = (projectId) => setSelectedProject(projectId);
  const handleCloseModal = () => setSelectedProject(null);

  return (
    <div className="relative h-[100vh] mt-[-300px]">
      {/* natural landing spot */}
      <div ref={anchorRef} />

      {/* SECTION: fixed full-screen while booting; relative after landing */}
      <motion.div
        ref={bottomSectionRef}
        className={`${isFixed ? "fixed inset-0 z-[70]" : "relative h-[100vh]"} bg-white p-[30px] m-auto overflow-hidden`}
        style={{
          scale: isFixed ? 1 : scaleTransform, // disable scroll scaling while fixed
          width: isFixed ? "100vw" : undefined,
          height: isFixed ? "100vh" : "100vh",
          willChange: "transform",
        }}
        animate={sectionControls}
        initial={false}
        layout
      >
        {/* BOOT BOX: only mount after bg shown */}
        {booting && showBox && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-2xl overflow-hidden"
            style={{
              width: 500,
              height: 600,
              willChange: "transform, opacity",
              scale: boxScale,      // JS-driven
              opacity: boxOpacity,  // JS-driven fade-in
              y: boxY,              // JS-driven glide later
            }}
          >
            {/* image (starts after brown overlay is removed) */}
            {showClip && (
              <motion.img
                key={frameIndex}
                src={frames[frameIndex]}
                alt="portfolio clip frame"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.18 }}
              />
            )}

            {/* brown overlay (fades to 0 via JS; sits above image until gone) */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: "#5a3b2f", opacity: bgOpacity, pointerEvents: "none" }}
            />
          </motion.div>
        )}

        {/* REAL CONTENT — revealed after landing */}
        <motion.div
          variants={parentStagger}
          initial="hidden"
          animate={revealContent ? "show" : "hidden"}
          className={`relative w-full h-full transition-opacity duration-300 ${booting ? "opacity-0" : "opacity-100"}`}
        >
          <div className="text-center mb-10">
            <motion.h3 variants={childFade} className="text-[30px]">Portfolio</motion.h3>
            <motion.h2 variants={childFade} className="text-[50px]">Our Projects</motion.h2>
          </div>

          <motion.div variants={childFade} className="w-full z-30">
            <div className="container mx-auto py-6 flex justify-end">
              <div className="flex gap-4 items-start text-black font-serif">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    layoutId={`project-${i}`}
                    className={`${i === 2 ? "basis-[80%]" : "basis-[50%]"} img_after duration-300 ${
                      i === 1 || i === 4 ? "mt-[auto]" : ""
                    } ${i !== 2 && "hover:basis-[60%]"} group relative overflow-hidden cursor-pointer`}
                    onClick={() => handleCardClick(i)}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: revealContent ? 1 : 0, y: revealContent ? 0 : 12 }}
                    whileHover={{ y: -4 }}
                  >
                    <motion.img
                      src={`/assets/img/slide_${i + 1}.webp`}
                      alt={`Project ${i + 1}`}
                      className="w-full h-auto"
                      layoutId={`image-${i}`}
                    />
                    <motion.div
                      className="content-info absolute inset-0 flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center bg-[#fff] items-center text-black origin-center h-[90%] w-[90%] scale-0 transition-all duration-300 group-hover:scale-[1]"
                      layoutId={`content-${i}`}
                    >
                      <h3 className="text-lg font-semibold">Project {i + 1}</h3>
                      <p className="text-sm">Brief description of Project {i + 1}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Modal (unchanged) */}
      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              layoutId={`project-${selectedProject}`}
              className="bg-white p-8 h-full w-full rounded shadow-lg relative flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <motion.div
                layoutId={`content-${selectedProject}`}
                className="text-black text-center"
                variants={contentVariants}
              >
                <h3 className="text-2xl font-semibold mb-2">Project {selectedProject + 1}</h3>
                <p className="text-base">
                  Detailed description of Project {selectedProject + 1}. This is an expanded view with more information about the project.
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </button>
              </motion.div>

              <motion.img
                layoutId={`image-${selectedProject}`}
                src={`/assets/img/slide_${selectedProject + 1}.jpg`}
                alt={`Project ${selectedProject + 1}`}
                className="w-[300px] h-auto mb-4"
                variants={imageVariants}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
