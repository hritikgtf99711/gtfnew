"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useTransform } from "framer-motion";

export default function Portfolio({ smoothScrollProgress }) {
  const bottomSectionRef = useRef(null);
  const [cardsVisible, setCardsVisible] = useState(false);
  const cardRefs = useRef([]);

  const frames = [
    { img: "/assets/img/slide_1.webp", name: "Project 1" },
    { img: "/assets/img/slide_2.webp", name: "Project 2" },
    { img: "/assets/img/slide_3.webp", name: "Project 3" },
    { img: "/assets/img/slide_4.webp", name: "Project 4" },
    { img: "/assets/img/slide_5.webp", name: "Project 5" },
  ];

  console.log(smoothScrollProgress)
  // useEffect(() => {
  //   setCardsVisible(true);

  //   // Animate only odd cards (1, 3, 5 → indexes 0, 2, 4)
  //   cardRefs.current.forEach((card, i) => {
      
  //       gsap.fromTo(
  //         card,
  //         { y: 0 },
  //         {
  //           marginTop: i==1?250:i==4?120: 0, // alternate directions
  //           ease: "none",
  //           scrollTrigger: {
  //             trigger: bottomSectionRef.current,
  //             start: "-200 bottom",
  //             end: "bottom top",
  //             scrub: true,
  //           },
  //         }
  //       );
 
  //   });
  // }, []);

  const handleCardClick = (index) => {
    console.log(`Clicked project ${index + 1}`);
  };

  return (
    <motion.div
      ref={bottomSectionRef}
      className="relative w-full h-full flex justify-center m-auto items-center"
    >
      <motion.div className="w-full z-30 p-[40px]">
        <div className="container mx-auto py-6 flex justify-center">
          <div className="flex gap-4 items-start text-black font-serif">
            <AnimatePresence>
              {frames.map((o, i) => {
                  const yTransform =
                i === 1 || i === 4
                  ? useTransform(smoothScrollProgress, [0, 0.5, 1], [0, 50, -100])
                  : 0;
             return   <motion.div
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  initial={{ flexBasis: "50%", opacity: 1 }}
                  animate={{
                    flexBasis: i === 2 ? "80%" : "50%",
                    opacity: 1,
                    transition: { duration: 0.3, ease: "linear" },
                  }}
                    style={{
                    y: yTransform,
                  }}
                  className={`img_after duration-300 group relative overflow-hidden cursor-pointer ${
                    i !== 2 && "hover:basis-[60%]"
                  }`}
                  onClick={() => handleCardClick(i)}
                >
                  <div className="relative">
                    <motion.img
                      src={o.img}
                      alt={`Project ${i + 1}`}
                      className="w-full h-auto"
                    />
                    <motion.div
                      className="content-info absolute inset-0 flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 justify-center bg-[#fff] items-center text-black origin-center h-[90%] w-[90%] scale-0 transition-all duration-300 group-hover:scale-[1]"
                    >
                      <h3 className="text-lg font-semibold">
                        Project {i + 1}
                      </h3>
                      <p className="text-sm">
                        Brief description of Project {i + 1}
                      </p>
                    </motion.div>
                  </div>
                  <h4 className="mt-[5px]">{o.name}</h4>
                </motion.div>
})}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
