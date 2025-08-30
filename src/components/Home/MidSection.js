"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export default function MidSection({ src }) {
  const ref = useRef(null);

  const imageVariants = {
    initial: {
      scale: 1.2,
      opacity: 0.7,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 2,
        ease: [0.25, 0.46, 0.45, 0.94],
        repeat: Infinity,
        repeatType: "loop",
      },
    },
  };

  return (
    <div ref={ref}>
      <motion.img
        src={src}
        alt="midsection"
        className="w-full h-auto banner_img"
        variants={imageVariants}
        initial="initial"
        animate="animate"
        
      />
    </div>
  );
}