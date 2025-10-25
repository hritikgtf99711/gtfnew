import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import required modules
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "./whatWeDo.css";

const secData = [
  {
    img: "/assets/home/whatWeDo/brand-strategy.webp",
    title: "Brand Strategy",
    desc: "We use our insight, experience, and rich industry knowledge.",
  },
  {
    img: "/assets/home/whatWeDo/creative.webp",
    title: "Creative",
    desc: "Launching a refined brand identity, leading to improved online presence.",
  },
  {
    img: "/assets/home/whatWeDo/website-design.webp",
    title: "Website Design & Developement",
    desc: "We use our insight, experience, and rich industry knowledge to craft and execute compelling brand campaigns.",
  },
  {
    img: "/assets/home/whatWeDo/organic-marketing.webp",
    title: "Organic Marketing",
    desc: "No matter what your goals are: leads, subscribers, or followers, GTF Technologies is committed to meeting and exceeding them.",
  },
  {
    img: "/assets/home/whatWeDo/paid-marketing.webp",
    title: "Paid Marketing ",
    desc: "Recognized by Google among its top 30 partners in India, GTF Technologies commits to maximizing your return on investment.",
  },
  // {
  //   img: "/assets/home/whatWeDo/seo.jpg",
  //   title: "Search Engine Optimization",
  //   desc: "Positioning your website in the first place on Google is our commitment.",
  // },
  // {
  //   img: "/assets/home/whatWeDo/paid-ads.webp",
  //   title: "Paid Ads",
  //   desc: "GTF Technologies commits tobuilding you a brand on social media with its customized services.",
  // },
  // {
  //   img: "/assets/home/whatWeDo/display-marketing.jpg",
  //   title: "Display Marketing",
  //   desc: "GTF Technologies is committed to persuading your target audience through a thoroughly planned display advertising campaign.",
  // },
  // {
  //   img: "/assets/home/whatWeDo/youtube-marketing.webp",
  //   title: "Youtube Marketing",
  //   desc: "Your website is your digital face. Visuals, content, and appearance are its features.",
  // },
  // {
  //   img: "/assets/home/whatWeDo/social-media-optimization.webp",
  //   title: "Social Media Optimization",
  //   desc: "GTF Technologies is a prestigious website development company in India with more than 12 years experience in the industry.",
  // },
  //   {
  //     img:'/assets/home/whatWeDo/social-media-marketing.webp',
  //     title:'Social Media Marketing',
  //     desc:'GTF Technologies is a team of crackerjack website maintenance engineers.',
  //   },
  //   {
  //     img:'/assets/home/whatWeDo/online-reputation.webp',
  //     title:'Online Reputation Management Marketing',
  //     desc:'Multiply your sales with our custom YouTube marketing services. With more than 2 billion users across the world.',
  //   },
];

export default function WhatWeDo() {
  const itemsPerRow = 5;

  // Scroll handling for the section
  const { scrollYProgress } = useScroll({
    offset: ["start end", "end start"], // Section top visible → section bottom visible
  });

  // Transform Y for the second element based on scroll
  const transformY = useTransform(scrollYProgress, [0, 0.1], [-200, 0]); // Starts at -300px and ends at 0px

  return (
    <>
      {/* <section className="whatWeDo_section pb-[150px] px-[100px]">
        <Swiper
        className="what_we_do_swiper"
          pagination={{
            type: "progressbar",
          }}
          modules={[Pagination]}
          spaceBetween={20}
          slidesPerView={5}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {secData?.map((item,index)=>(
            <SwiperSlide>
              <div className={`relative single_image h-[450px]`}>
                <Image
                  src={item.img}
                  width={500}
                  height={500}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  unoptimized
                />

                <div className="hoverContent absolute left-[20px] top-[30px] h-[calc(100%-60px)] w-[calc(100%-40px)] bg-white p-[40px] flex flex-col scale-0 transition duration-300 ease-in-out">
                  <h4 className="title uppercase text-[26px] text-center flex items-center justify-center flex-1">
                    {item.title}
                  </h4>
                  <p className="text-center leading-[28px]">{item.desc}</p>
                </div>
              </div>

              <div
                  className={`single_content mt-[10px] single_content_${
                    index + 1
                  }`}
                >
                  <h4 className="title uppercase tracking-[2px] text-black font-medium">
                    {item.title}
                  </h4>
                </div>
            </SwiperSlide>
          ))}

        </Swiper>
      </section> */}

      <div className="whatWeDo_section min-h-screen px-[100px] grid grid-cols-[1fr_1fr_1.8fr_1fr_1fr] gap-[15px]">
        {secData &&
          secData.map((item, index) => {
            // Check if this is the second element (index === 1)
            const isSecondImage = index === 1;

            return (
              <React.Fragment key={index}>
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
                    <div className="hoverContent absolute left-[20px] top-[30px] h-[calc(100%-60px)] w-[calc(100%-40px)] bg-white p-[20px] flex flex-col  scale-0 transition duration-300 ease-in-out">
                      {/* <h4 className="title uppercase text-[26px] text-center flex items-center justify-center flex-1">
                        {item.title}
                      </h4> */}
                      <p className="text-center leading-[28px] text-[14px]">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div
                    className={`relative single_image single_item_${index + 1}`}
                  >
                    <Image
                      src={item.img}
                      width={500}
                      height={500}
                      alt={item.title}
                      className="h-full w-full object-cover"
                    />

                    <div className="hoverContent absolute left-[20px] top-[30px] h-[calc(100%-60px)] w-[calc(100%-40px)] bg-white p-[20px] flex flex-col scale-0 transition duration-300 ease-in-out">
                      {/* <h4 className="title uppercase text-[26px] text-center flex items-center justify-center flex-1">
                        {item.title}
                      </h4> */}
                      <p className="text-center leading-[28px] text-[14px]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )}

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
