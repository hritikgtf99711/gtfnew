import Image from "next/image";
import "./whatWeDo.css";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";

const secData = [
  {
    img: "/assets/home/whatWeDo/1.webp",
    title: "Brand Strategy",
    desc: "We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.",
  },
  {
    img: "/assets/home/whatWeDo/2.webp",
    title: "Creative",
    desc: "We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.",
  },
  {
    img: "/assets/home/whatWeDo/3.webp",
    title: "communication",
    desc: "We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.",
  },
  {
    img: "/assets/home/whatWeDo/4.webp",
    title: "website Design",
    desc: "We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.",
  },
  {
    img: "/assets/home/whatWeDo/5.webp",
    title: "website Maintenance",
    desc: "We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.",
  },
  {
    img: "/assets/home/whatWeDo/6.webp",
    title: "seo",
    desc: "We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.",
  },
  {
    img: "/assets/home/whatWeDo/7.webp",
    title: "Brand Strategy",
    desc: "We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand.",
  },
  /*{
    img:'/assets/home/whatWeDo/display-marketing.webp',
    title:'Brand Strategy',
    desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
  },
{
  img:'/assets/home/whatWeDo/youtube-marketing.webp',
  title:'Brand Strategy',
  desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
},
{
  img:'/assets/home/whatWeDo/social_media_optimization.webp',
  title:'Brand Strategy',
  desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
},*/
  // {
  //   img:'/assets/home/whatWeDo/social-media-marketing.webp',
  //   title:'Brand Strategy',
  //   desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
  // },
  // {
  //   img:'/assets/home/whatWeDo/online-reputation.webp',
  //   title:'Brand Strategy',
  //   desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
  // },
];

export default function WhatWeDo() {
  const itemsPerRow = 5;

  // Scroll handling for the section
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"], // Section top visible → section bottom visible
  });

  // Transform Y for the second element based on scroll
  const transformY = useTransform(scrollYProgress, [0, 0.2], [-300, 0]); // Starts at -300px and ends at 0px

  return (
    <>
      <div className="whatWeDo_section min-h-screen px-[100px] grid grid-cols-[1fr_1fr_1fr_1.5fr_1fr] gap-[15px]">
        {secData &&
          secData.map((item, index) => {
            // Check if this is the second element (index === 1)
            const isSecondImage = index === 1;

            return (
              <React.Fragment key={index}>
                {/* For the second element, apply Framer Motion */}

                {isSecondImage ? (
                  <motion.div
                    className={`relative single_image single_item_${index + 1}`}
                    style={{
                      y: transformY, // Apply scroll-based Y transform
                    }}
                  >
                    <Image
                      src={item.img}
                      width={500}
                      height={500}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="hoverContent absolute left-[20px] top-[30px] h-[calc(100%-60px)] w-[calc(100%-40px)] bg-white p-[40px] flex flex-col">
                      <h4 className="title uppercase text-[26px] text-center flex items-center justify-center flex-1">{item.title}</h4>
                      <p className="text-center leading-[28px]">{item.desc}</p>
                    </div>
                  </motion.div>
                ) : (
                  <div className={`relative single_image single_item_${index + 1}`}>
                    <Image
                      src={item.img}
                      width={500}
                      height={500}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />

                    <div className="hoverContent absolute left-[20px] top-[30px] h-[calc(100%-60px)] w-[calc(100%-40px)] bg-white p-[40px] flex flex-col scale-0 transition duration-300 ease-in-out">
                      <h4 className="title uppercase text-[26px] text-center flex items-center justify-center flex-1">{item.title}</h4>
                      <p className="text-center leading-[28px]">{item.desc}</p>
                    </div>
                  </div>
                )}

                {/* Content section */}
                <div
                  className={`single_content h-[200px] single_content_${
                    index + 1
                  }`}
                >
                  <h4 className="title uppercase tracking-[2px] text-black font-bold">
                    {item.title}
                  </h4>
                </div>
              </React.Fragment>
            );
          })}
      </div>
    </>
  );
}
