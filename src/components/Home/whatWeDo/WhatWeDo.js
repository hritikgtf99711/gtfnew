import Image from "next/image"
import './whatWeDo.css'

const secData = [
  {
    img:'/assets/home/whatWeDo/brand-strategies.webp',
    title:'Brand Strategy',
    desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
  },
  {
    img:'/assets/home/whatWeDo/creatives.webp',
    title:'Creative',
    desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
  },
  {
    img:'/assets/home/whatWeDo/communication.webp',
    title:'Brand Strategy',
    desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
  },
  {
    img:'/assets/home/whatWeDo/website_design.webp',
    title:'Brand Strategy',
    desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
  },
  {
    img:'/assets/home/whatWeDo/website_maintenance.webp',
    title:'Brand Strategy',
    desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
  },
    {
      img:'/assets/home/whatWeDo/seo.webp',
      title:'Brand Strategy',
      desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
    },
    /*{
      img:'/assets/home/whatWeDo/paid-ads.webp',
      title:'Brand Strategy',
      desc:'We use our insight, experience, and rich industry knowledge to formulate and drive a distinct and differentiating positioning for your brand. We uncover your brand\'s coreâ€”the heart or soul of who you are and how you want to be perceived!',
    },
    {
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
]

export default function WhatWeDo(){
  const itemsPerRow = 5;

  return(
    <div className="whatWeDo_section w-full min-h-screen px-[100px] grid" style={{ gridTemplateColumns: `repeat(${itemsPerRow}, 1fr)` }}>
      {secData && secData.map((item, index) => {
        const rowGroup = Math.floor(index / itemsPerRow); // Determine which group of 5 items
        const isEvenIndex = (index % 2) === 1; // Check if index (0-based) is odd in display (1-based)
        const imageRowStart = isEvenIndex ? 2 + rowGroup * 3 : 1 + rowGroup * 3;
        const imageRowEnd = imageRowStart + 2;
        const contentRowStart = isEvenIndex ? 4 + rowGroup * 3 : 3 + rowGroup * 3;
        const contentRowEnd = contentRowStart + 1;
        const colStart = (index % itemsPerRow) + 1;
        const colEnd = colStart + 1;

        return (
          <>
            <div
              className={`single_image row-start-${imageRowStart} row-end-${imageRowEnd} col-start-${colStart} col-end-${colEnd}`}
            >
              <Image
                src={item.img}
                width={500}
                height={500}
                alt={item.title}
              />
            </div>
            <div
              className={`single_content row-start-${contentRowStart} row-end-${contentRowEnd} col-start-${colStart} col-end-${colEnd}`}
            >
              <p className="title">{item.title}</p>
              {/* <p className="desc">{item.desc}</p> */}
            </div>
          </>
        );
      })}
    </div>
  )
}