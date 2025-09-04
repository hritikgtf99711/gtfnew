"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";

const SparkleBackground = () => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const resizeTimeoutRef = useRef(null);
  const noiseDataRef = useRef([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const createNoise = () => {
      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;
      const idata = ctx.createImageData(wWidth, wHeight);
      const buffer32 = new Uint32Array(idata.data.buffer);

      for (let i = 0; i < buffer32.length; i++) {
        buffer32[i] = Math.random() < 0.5 ? 0xfe000000 : 0;
      }
      noiseDataRef.current.push(idata);
    };

    const setup = () => {
      const wWidth = window.innerWidth;
      const wHeight = window.innerHeight;
      canvas.width = wWidth;
      canvas.height = wHeight; 
      noiseDataRef.current = [];
      for (let i = 0; i < 10; i++) {
        createNoise();
      }
      loop();
    };

    const paintNoise = () => {
      if (!ctx) return;
      frameRef.current = frameRef.current === 9 ? 0 : frameRef.current + 1;
      ctx.putImageData(noiseDataRef.current[frameRef.current], 0, 0);
    };

    const loop = () => {
      paintNoise();
      animationFrameRef.current = requestAnimationFrame(loop);
    };

    const handleResize = () => {
      if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = setTimeout(() => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        setup();
      }, 200);
    };

    const initTimeout = setTimeout(() => {
      setup();
      try {
        gsap.fromTo(
          ".main-title, .link",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.5, stagger: 0.2 }
        );
      } catch (error) {
        console.warn("GSAP animation failed:", error);
      }
    }, 100);

    window.addEventListener("resize", handleResize);
    // Cleanup
    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

  return (
    
      <canvas
        ref={canvasRef}
        className="absolute top-0 z-[2] left-0 w-full h-full pointer-events-none opacity-[0.08]"
      />
  );
};

// Portal wrapper component
const SparkleBackgroundPortal = () => {
  const [mounted, setMounted] = useState(false);
  const [portalRoot, setPortalRoot] = useState(null);




  return  <SparkleBackground />
};

export default SparkleBackgroundPortal;