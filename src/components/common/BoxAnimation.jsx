"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  animate,
  useTransform,
  useScroll,
  useAnimation,
  AnimatePresence,
} from "framer-motion";
import PropTypes from "prop-types";

// Default project data if none provided
const defaultProjects = [
  { id: 0, title: "Project 1", description: "Brief description of Project 1", image: "/assets/img/slide_1.webp" },
  { id: 1, title: "Project 2", description: "Brief description of Project 2", image: "/assets/img/slide_2.webp" },
  { id: 2, title: "Project 3", description: "Brief description of Project 3", image: "/assets/img/slide_3.webp" },
  { id: 3, title: "Project 4", description: "Brief description of Project 4", image: "/assets/img/slide_4.webp" },
  { id: 4, title: "Project 5", description: "Brief description of Project 5", image: "/assets/img/slide_5.webp" },
];

export default function Portfolio({
  projects = defaultProjects,
  portfolioIndex = 0,
  via = false,
  animationConfig = {
    frameDelay: 140,
    holdAfter: 420,
    followDelay: 200,
    boxFadeDuration: 0.35,
    boxScaleDuration: 1.0,
    bgFadeDuration: 0.25,
    sectionMoveDuration: 0.9,
  },
  classNames = {
    container: "relative min-h-[120vh]",
    section: "bg-white p-[80px] m-auto overflow-hidden",
    card: "img_after duration-300",
    modal: "bg-white p-8 h-full w-full rounded shadow-lg relative flex flex-col items-center justify-center",
    modalOverlay: "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50",
  },
  enableIntroAnimation = true,
  enableScrollLock = true,
  enableModal = true,
}) {
  // ---------- State and Motion Values ----------
  const width = useMotionValue(80);
  const [renderWidth, setRenderWidth] = useState("80%");
  const [scrollLocked, setScrollLocked] = useState(enableScrollLock);
  const bottomSectionRef = useRef(null);
  const anchorRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFixed, setIsFixed] = useState(enableIntroAnimation);
  const [booting, setBooting] = useState(enableIntroAnimation);
  const [showBox, setShowBox] = useState(false);
  const [showClip, setShowClip] = useState(false);
  const [revealContent, setRevealContent] = useState(false);
  const [frameIndex, setFrameIndex] = useState(0);
  const sectionControls = useAnimation();
  const boxScale = useMotionValue(0.2);
  const boxOpacity = useMotionValue(0);
  const boxY = useMotionValue(0);
  const bgOpacity = useMotionValue(1);

  // ---------- Utility: Clear Overflow ----------
  const clearOverflow = () => {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;
    bodyEl.style.removeProperty("overflow");
    htmlEl.style.removeProperty("overflow");
    bodyEl.style.overflow = "auto";
    htmlEl.style.overflow = "auto";
    requestAnimationFrame(() => {
      bodyEl.style.removeProperty("overflow");
      htmlEl.style.removeProperty("overflow");
      bodyEl.style.overflow = "";
      htmlEl.style.overflow = "";
    });
  };

  useEffect(() => {
    clearOverflow();
  }, []);

  // ---------- Scroll Lock ----------
  const shouldLock = isFixed || scrollLocked;

  useEffect(() => {
    const prevent = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };
    const preventKeys = (e) => {
      const keys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
      if (keys.includes(e.key)) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (enableScrollLock && shouldLock) {
      window.addEventListener("wheel", prevent, { passive: false });
      window.addEventListener("touchmove", prevent, { passive: false });
      window.addEventListener("keydown", preventKeys, false);
      return () => {
        window.removeEventListener("wheel", prevent);
        window.removeEventListener("touchmove", prevent);
        window.removeEventListener("keydown", preventKeys);
      };
    } else {
      clearOverflow();
    }
  }, [shouldLock, enableScrollLock]);

  // ---------- Width Resize Wheel ----------
  useEffect(() => {
    const handleWheel = (event) => {
      if (shouldLock) return;
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

  // ---------- Main Animation Sequence ----------
  useEffect(() => {
    if (!enableIntroAnimation) {
      setRevealContent(true);
      setScrollLocked(false);
      clearOverflow();
      return;
    }

    let intervalId;
    let cancelled = false;

    (async () => {
      await sectionControls.set({ opacity: 1, y: 0 });
      setShowBox(true);
      await animate(boxOpacity, 1, { duration: animationConfig.boxFadeDuration, ease: "easeOut" });
      await animate(boxScale, 1, { duration: animationConfig.boxScaleDuration, ease: [0.25, 0.8, 0.25, 1] });
      await new Promise((r) => setTimeout(r, 500));
      if (cancelled) return;

      await animate(bgOpacity, 0, { duration: animationConfig.bgFadeDuration, ease: "linear" });
      setShowClip(true);
      setFrameIndex(0);

      intervalId = window.setInterval(() => {
        setFrameIndex((i) => {
          if (i + 1 >= projects.length) {
            window.clearInterval(intervalId);
            setTimeout(async () => {
              const anchorTop = (anchorRef.current && anchorRef.current.getBoundingClientRect().top) || 0;
              await animate(boxY, anchorTop, {
                duration: animationConfig.sectionMoveDuration,
                ease: [0.2, 0.7, 0.2, 1],
              });
              setTimeout(async () => {
                await sectionControls.start({
                  y: anchorTop,
                  transition: { duration: animationConfig.sectionMoveDuration, ease: [0.2, 0.7, 0.2, 1] },
                });
                setIsFixed(false);
                sectionControls.set({ y: 0 });
                setBooting(false);
                setRevealContent(true);
                setTimeout(() => {
                  setScrollLocked(false);
                  clearOverflow();
                }, 300);
              }, animationConfig.followDelay);
            }, animationConfig.holdAfter);
            return i;
          }
          return i + 1;
        });
      }, animationConfig.frameDelay);
    })();

    return () => {
      cancelled = true;
      if (intervalId) window.clearInterval(intervalId);
      clearOverflow();
    };
  }, [sectionControls, boxOpacity, boxScale, bgOpacity, boxY, projects, animationConfig, enableIntroAnimation]);

  // ---------- Scroll Scale ----------
  const { scrollYProgress } = useScroll({
    target: bottomSectionRef,
    offset: ["start end", "end start"],
  });
  const scaleTransform = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // ---------- Animation Variants ----------
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
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

  const handleCardClick = (projectId) => enableModal && setSelectedProject(projectId);
  const handleCloseModal = () => setSelectedProject(null);

  return (
    <div className={`${classNames.container} ${via === false && "pt-[80vh]"} white_color_animation mt-[-300px]`}>
      <motion.div
        ref={bottomSectionRef}
        className={classNames.section}
        style={{
          scale: scaleTransform,
          willChange: "transform",
          width: renderWidth,
        }}
        animate={sectionControls}
        initial={false}
        layout
      >
        {booting && showBox && (
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-2xl overflow-hidden"
            style={{
              willChange: "transform, opacity",
              scale: boxScale,
              opacity: boxOpacity,
              y: boxY,
            }}
          >
            {showClip && (
              <motion.img
                key={frameIndex}
                src={projects[frameIndex]?.image || "/assets/img/placeholder.webp"}
                alt="portfolio clip frame"
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.18 }}
              />
            )}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: "#5a3b2f", opacity: bgOpacity, pointerEvents: "none" }}
            />
          </motion.div>
        )}
        <motion.div
          variants={parentStagger}
          initial="hidden"
          animate={revealContent ? "show" : "hidden"}
          className={`relative w-full h-full transition-opacity duration-300 ${booting ? "opacity-0" : "opacity-100"}`}
        >
          <div className="text-center mb-10">
            <motion.h3 variants={childFade} className="text-[30px]">
              Portfolio
            </motion.h3>
            <motion.h2 variants={childFade} className="text-[50px]">
              Our Projects
            </motion.h2>
          </div>

          <motion.div variants={childFade} className="w-full z-30">
            <div className="container mx-auto py-6 flex justify-end">
              <div className="flex gap-4 items-start text-black font-serif">
                {projects.map((project, i) => (
                  <motion.div
                    key={project.id || i}
                    layoutId={`project-${project.id || i}`}
                    className={`${classNames.card} ${i === 2 ? "basis-[80%]" : "basis-[50%]"} ${
                      i === 1 || i === 4 ? "mt-[auto]" : ""
                    } ${i !== 2 && "hover:basis-[60%]"} group relative overflow-hidden cursor-pointer`}
                    onClick={() => handleCardClick(project.id || i)}
                    transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: revealContent ? 1 : 0, y: revealContent ? 0 : 12 }}
                    whileHover={{ y: -4 }}
                  >
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-auto"
                      layoutId={`image-${project.id || i}`}
                    />
                    <motion.div
                      className="content-info absolute inset-0 flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center bg-[#fff] items-center text-black origin-center h-[90%] w-[90%] scale-0 transition-all duration-300 group-hover:scale-[1]"
                      layoutId={`content-${project.id || i}`}
                    >
                      <h3 className="text-lg font-semibold">{project.title}</h3>
                      <p className="text-sm">{project.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {enableModal && selectedProject !== null && (
          <motion.div
            className={classNames.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={handleCloseModal}
          >
            <motion.div
              layoutId={`project-${selectedProject}`}
              className={classNames.modal}
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
                <h3 className="text-2xl font-semibold mb-2">{projects[selectedProject]?.title}</h3>
                <p className="text-base">
                  {projects[selectedProject]?.detailedDescription || projects[selectedProject]?.description}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </motion.div>

              <motion.img
                layoutId={`image-${selectedProject}`}
                src={projects[selectedProject]?.image}
                alt={projects[selectedProject]?.title}
                className="w-[300px] h-auto mb-4"
                variants={imageVariants}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={anchorRef} />
    </div>
  );
}
