"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion";

export default function Portfolio({ sectionRef }) {
  const cardRefs = useRef([]);

  const frames = [
    { img: "/assets/img/slide_1.webp", name: "Project 1" },
    { img: "/assets/img/slide_2.webp", name: "Project 2" },
    { img: "/assets/img/slide_3.webp", name: "Project 3" },
    { img: "/assets/img/slide_4.webp", name: "Project 4" },
    { img: "/assets/img/slide_5.webp", name: "Project 5" },
  ];

  const { scrollY } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const yTransformCard1 = useTransform(scrollY, [0, 0.5, 1], [0, 100, 250]);
  const yTransformCard4 = useTransform(scrollY, [0, 0.5, 1], [0, 100, 200]);

  const handleCardClick = (index) => console.log(`Clicked project ${index + 1}`);

  return (
    <motion.div className="relative w-full  flex justify-center items-center">
      <div className="container mx-auto py-6 flex justify-center">
        <div className="flex gap-4 items-start font-serif text-black">
          <AnimatePresence>
            {frames.map((o, i) => (
              <motion.div
                key={i}
                ref={(el) => (cardRefs.current[i] = el)}
                initial={{ flexBasis: "50%" }}
                animate={{ flexBasis: i === 2 ? "80%" : "50%" }}
                style={{ y: i === 1 ? yTransformCard1 : i === 4 ? yTransformCard4 : 0 }}
                className={`img_after relative overflow-hidden cursor-pointer group ${i !== 2 && "hover:basis-[60%]"}`}
                onClick={() => handleCardClick(i)}
              >
                <div className="relative">
                  <motion.img src={o.img} alt={o.name} className="w-full h-auto" />
                  <motion.div className="content-info absolute inset-0 flex flex-col justify-center items-center bg-white text-black h-[90%] w-[90%] scale-0 transition-all duration-300 group-hover:scale-100">
                    <h3 className="text-lg font-semibold">{o.name}</h3>
                    <p className="text-sm">Brief description of {o.name}</p>
                  </motion.div>
                </div>
                <h4 className="mt-2">{o.name}</h4>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
