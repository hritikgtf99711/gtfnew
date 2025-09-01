"use client";
import { useRef, useEffect } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import Line from "../../common/Line";


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

const Expertise = () => {
  // refs for viewport detection
  const circleRef = useRef(null);
  const linesWrapperRef = useRef(null);
  const countersRef = useRef(null);

  const circleInView = useInView(circleRef, { amount: 0.2, once: true });
  const countersInView = useInView(countersRef, { amount: 0.5, once: true });

  // counts
  const projectsMV = useCountUp(countersInView, 1500);
  const googleMV = useCountUp(countersInView, 50);
  const fbMV = useCountUp(countersInView, 1000);

  // formatting helper
  const formatInt = (n) => Math.floor(n).toLocaleString();

  return (
    <section
      className="md:pt-[00px] md:pb-[100px] py-[60px] px-[15px] lg:px-[35px]"
      id="experties_sec"
    >
      <div className="flex justify-between flex-wrap">
        <h2 className="relative uppercase 2xl:leading-[70px]  xl:leading-[56px]  leading-[35px] md:basis-[50%] max-h-fit">
          <span className="bartino-outline tracking-[2px] text-[30px] xl:text-[50px]  md:text-[50px] 2xl:text-[72px] block">
            Boutique concepts
          </span>
          <span className="font-[Oswald] block font-medium text-[30px] xl:text-[48px] md:text-[50px] 2xl:text-[65px]">
            innovation market
          </span>
          <Line
            left={"xl:left-[25%] left-[50%] 2xl:left-[37%]"}
            bgColor="bg-gtf-pink"
          />
        </h2>

        <div className="md:basis-[35%] border-b-[1px] border-b-solid border-b-[#666666] md:pb-[50px] pb-[35px]">
          <p className="text-[14px] font-[400] md:mt-0 mt-[20px]">
            GTF Technologies is conceptualized from Gurukul The Foundation. We
            are a 16-year-old branding and digital media planning agency
            headquartered in Noida, Mumbai, Pune, and an upcoming office in
            Bangalore. We create innovative brands, attract customers, and offer
            comprehensive solutions.
          </p>
          <div className="flex mt-[20px] items-center">
            <p className=" mr-[10px] uppercase font-[Oswald]">meet now</p>
            <MdArrowOutward className="bg-[#ddd]" />
          </div>
        </div>
      </div>

      <div className="flex justify-between flex-wrap relative md:pt-[0] pt-[30px]">
        <div className="md:basis-[60%] basis-[100%] relative">
          {/* Lines: grow width after circle appears */}
          <motion.div
            ref={linesWrapperRef}
            className="relative w-0 top-[46%] left-[29%]"
            initial={{ width: "0%" }}
            animate={circleInView ? { width: "100%" } : { width: "0%" }}
            transition={{ duration: 0.6, ease: "easeIn", delay: 0.6 }}
          >
            {/* top */}
            <div className="origin-left md:block hidden rotate-[-15.5deg] h-[1px] w-[75%] border-dashed border-b-[1px] border-black absolute bottom-0" />
            <div className="origin-left md:block hidden rotate-[-12deg] h-[1px] w-[73%] border-dashed border-b-[1px] border-black absolute bottom-[0px]" />
            {/* middle */}
            <div className="h-[1px] md:block hidden w-[70%] border-dashed border-b-[1px] border-black origin-left rotate-[1.4deg] absolute" />
            <div className="h-[1px] md:block hidden w-[70%] border-dashed border-b-[1px] border-black absolute origin-left rotate-[-2deg]" />
            {/* third */}
            <div className="h-[1px] md:block hidden w-[73%] origin-left rotate-[12deg] border-dashed border-b-[1px] border-black absolute" />
            <div className="h-[1px] md:block hidden w-[75%] origin-left rotate-[16deg] border-dashed border-b-[1px] border-black absolute" />
          </motion.div>

          {/* Circle: fade + scale on enter */}
          <motion.div
            ref={circleRef}
            className="md:h-[250px] md:w-[250px] h-[120px] w-[120px] md:left-[8%]  md:top-[21%] z-[-1] bg-[#FDE93D] mix-blend-multiply md:relative absolute rounded-full"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ amount: 0.2, once: true }}
            transition={{ duration: 0.6, ease: "easeIn" }}
          />

          <img
            src="/assets/home/netblob.png"
            alt="Years of Expertise"
            className="absolute md:w-[70%] md:h-[auto] h-[250px] w-[100%] opacity-[.9] md:translate-y-[-50%] md:top-[55%] md:left-[-10%] left-[70%]  md:block hidden left-[0%] md:translate-x-0  top-[-52px]"
          />

          <p className="md:absolute bottom-[50px] left-[0]  md:text-start ">
            <span className="font-[Oswald] text-[35px] 2xl:text-[75px] lg:text-[65px] font-medium">
              16 +
            </span>
            <br />
            <span className="bartino-outline lading-[normal] md:leading-[76px] 2xl:text-[70px] text-[35px] lg:text-[60px] tracking-[2px] uppercase">
              Years Of <br className="md:block hidden" /> Expertise
            </span>
          </p>
        </div>

        {/* Counters */}
        <div className="md:basis-[35%] md:pt-[38px] pt-[30px]" ref={countersRef}>
          <p className="uppercase flex flex-col md:justify-start justify-center mb-[30px] md:mb-[65px]">
            <motion.span
              className="font-[Oswald] text-[30px] md:text-start 2xl:text-[40px] lg:text-[36px] font-[600] opacity-0"
              initial={{ opacity: 0 }}
              animate={countersInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {formatInt(projectsMV.get())} +
            </motion.span>
            <span className="text-[14px] font-[400] tracking-wide">PROJECTS DONE</span>
          </p>

          <p className="uppercase flex flex-col md:justify-start justify-center mb-[30px] md:mb-[65px]">
            <span className="font-[Oswald] text-[30px] md:text-start 2xl:text-[40px] lg:text-[36px] font-[600]">
              {formatInt(googleMV.get())}k +
            </span>
            <span className="text-[14px] font-[400] tracking-wide">
              Queries generated from Google per month
            </span>
          </p>

          <p className="uppercase flex flex-col md:justify-start justify-center mb-[30px] md:mb-[65px]">
            <span className="font-[Oswald] text-[30px] md:text-start 2xl:text-[40px] lg:text-[36px] font-[600]">
              {formatInt(fbMV.get())}k +
            </span>
            <span className="text-[14px] font-[400] tracking-wide">
              Queries generated from Facebook &amp; Instagram per month
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Expertise;
