"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, animate, useTransform, AnimatePresence, useScroll } from "framer-motion";

export default function Portfolio() {
  const width = useMotionValue(80); // numeric 80%
  const [renderWidth, setRenderWidth] = useState("80%");
  const bottomSectionRef = useRef(null);
  const [selectedProject, setSelectedProject] = useState(null);

  // Wheel scroll to resize width
  useEffect(() => {
    const handleWheel = (event) => {
      const delta = event.deltaY;
      let newWidth = width.get() + delta * 0.6;
      newWidth = Math.max(80, Math.min(newWidth, 100));

      animate(width, newWidth, {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
        onUpdate: (v) => setRenderWidth(`${v.toFixed(2)}%`),
      });
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [width]);

  const handleCardClick = (projectId) => setSelectedProject(projectId);
  const handleCloseModal = () => setSelectedProject(null);

  // Scroll progress for section
  const { scrollYProgress } = useScroll({
    target: bottomSectionRef,
    offset: ["start end", "end start"], // section relative scroll
  });

  // Map scroll progress to scale (reverses at end)
  const scaleTransform = useTransform(scrollYProgress, [0, 0.8, 1], [0.8, 1.05, 0.8]);

  // Modal animation variants
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 1.5 } },
    exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
  };

  return (
    <div className="relative z-[1] h-[100vh] mt-[-300px]">
      <motion.div
        ref={bottomSectionRef}
        className="bg-white h-[100vh] p-[30px] m-auto"
        style={{ scale: scaleTransform }}
        layout
      >
        <div className="text-center mb-10">
          <h3 className="text-[30px]">Portfolio</h3>
          <h2 className="text-[50px]">Our Projects</h2>
        </div>

        <div className="w-full z-30">
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
                >
                  <motion.img
                    src={`./assets/img/slide_${i + 1}.jpg`}
                    alt={`Project ${i + 1}`}
                    className="w-full h-auto"
                    layoutId={`image-${i}`}
                  />
                  <motion.div
                    className="content-info absolute inset-0 flex flex-col top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] justify-center bg-[#fff] items-center text-black origin-center h-[90%] w-[90%] scale-0 transition-all duration-300 group-hover:scale-[1]"
                    layoutId={`content-${i}`}
                  >
                    <h3 className="text-lg font-semibold">Project {i + 1}</h3>
                    <p className="text-sm">Brief description of Project {i + 1}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {selectedProject !== null && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            onClick={handleCloseModal}
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
                  Detailed description of Project {selectedProject + 1}. This is an expanded view with more
                  information about the project.
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
                src={`./assets/img/slide_${selectedProject + 1}.jpg`}
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
