"use client";
import React, { useEffect, useRef, useState, forwardRef } from "react";

const Line = forwardRef(
  (
    {
      bgColor,
      left = "left-[45%]",
      top,
      right = "right-[15%]",
      bottom = "bottom-0",
      callVia,
      height="h-[20px]"

    },
    ref
  ) => {
    const localRef = useRef(null);
    const elementRef = ref || localRef;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        { threshold: 0.1 }
      );

      if (elementRef.current) observer.observe(elementRef.current);

      return () => observer.disconnect();
    }, [elementRef]);
  useEffect(()=>{
    if(callVia){
      setIsVisible(true)

    }

  },[callVia])
    return (
      <div
        ref={elementRef}
        className={`absolute ${bgColor} ${height} ${bottom} ${left} ${top} ${right} -z-10 -mb-[0.25rem] md:block ${
          isVisible ? "animate-growBarSm lg:animate-growBar" : "w-0"
        }`}
      />
    );
  }
);

export default Line;
