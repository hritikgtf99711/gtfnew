"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import { PiSuitcaseSimple } from "react-icons/pi";
import Line from "../../common/Line";
import Image from "next/image";
function useCountUp(inView, to, duration = 2) {
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, {
      duration,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, to, mv, duration]);

  return mv;
}

const ExpertiseNew = () => {
  // Refs for viewport detection
  const circleRef = useRef(null);
  const linesWrapperRef = useRef(null);
  const countersRef = useRef(null);

  const circleInView = useInView(circleRef, { amount: 0.5, once: false }); // Adjusted for reliability
  const countersInView = useInView(countersRef, { amount: 0.5, once: true });

  // Debug circleInView state
  useEffect(() => {
    console.log("circleInView:", circleInView);
  }, [circleInView]);

  // Counts
  const projectsMV = useCountUp(countersInView, 1500);
  const googleMV = useCountUp(countersInView, 50);
  const fbMV = useCountUp(countersInView, 1000);

  // Formatting helper
  const formatInt = (n) => Math.floor(n).toLocaleString();

  return (
    <section
      className="flex flex-col justify-center p-[80px] h-[100%] relative"
      id="experties_sec"
    >
      <div className="grid grid-cols-2 justify-between  mb-[100px] gap-[150px]">
        <div className="">
          <h2 className="relative uppercase 2xl:leading-[70px] xl:leading-[56px] leading-[35px]  max-h-fit">
            <span className=" block font-medium text-[30px] xl:text-[48px] md:text-[50px] 2xl:text-[65px]">
              We are a creative bold digital agency based in Delhi NCR.
            </span>
            <Line
              left={"xl:left-[25%] left-[50%] 2xl:left-[37%]"}
              bgColor="bg-gtf-pink"
            />
          </h2>
        </div>

        <div className="md:pb-[50px] pb-[35px]">
          <div className="flex gap-[40px]">
            <div className="circle h-[200px] w-[200px] bg-[#fde93d] rounded-[100%] flex items-center justify-center text-[100px]">
              <div className="leading-[30px]">16<span className="text-[40px] font-bold">+</span></div>
            </div>

            <div className="flex-1 relative">
              <h5 className="uppercase font-bold tracking-[1px] text-[20px]">16+ Years of Expertise</h5>
              <p className="text-[16px] font-[400] mt-[20px] tracking-[1px] leading-[30px]">
                GTF Technologies is conceptualized from Gurukul The Foundation. We
                are a 16-year-old branding and digital media planning agency
                headquartered in Noida, Mumbai, Pune, and an upcoming office in
                Bangalore.
              </p>
              {/* <div className="flex mt-[20px] items-center">
                <p className="mr-[10px] uppercase ">meet now</p>
                <MdArrowOutward className="bg-[#ddd]" />
              </div> */}
            </div>
          </div>

        </div>

      </div>

      <div className="grid grid-cols-12 gap-[100px]">
        <div className="col-span-4">
          <div className="border-t-[1px] border-[#ddd] flex items-center">
            <div className="left_content">
              <h4 className="number text-[40px] font-bold">1500+</h4>
              <p className="tracking-[1px]">successfully project completed.</p>
            </div>
            <div className="ml-auto">
              <PiSuitcaseSimple size={32} />
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="border-t-[1px] border-[#ddd] flex items-center">
            <div className="left_content">
              <h4 className="number text-[40px] font-bold">1500+</h4>
              <p className="tracking-[1px]">successfully project completed.</p>
            </div>
            <div className="ml-auto">
              <PiSuitcaseSimple size={32} />
            </div>
          </div>
        </div>

        <div className="col-span-4">
          <div className="border-t-[1px] border-[#ddd] flex items-center">
            <div className="left_content">
              <h4 className="number text-[40px] font-bold">1500+</h4>
              <p className="tracking-[1px]">successfully project completed.</p>
            </div>
            <div className="ml-auto">
              <PiSuitcaseSimple size={32} />
            </div>
          </div>
        </div>
      </div>


      <Image
        src="/assets/home/netblob.png"
        height={500}
        width={500}
        alt="Years of Expertise"
        className="absolute md:w-[auto] md:h-[800px] left-0 z-[2] h-[250px] w-[100%] opacity-[.9] md:block hidden"
      />

    </section>
  );
};

export default ExpertiseNew;