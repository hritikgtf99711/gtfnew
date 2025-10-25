"use client";
import { useRef, useEffect, useLayoutEffect } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PiSuitcaseSimple } from "react-icons/pi";
import Line from "../../common/Line";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const ExpertiseNew = () => {
  // Refs for viewport detection
  const sectionRef = useRef(null);
  const circleRef = useRef(null);
  const linesWrapperRef = useRef(null);
  const countersRef = useRef(null);

  const circleInView = useInView(circleRef, { amount: 0.5, once: false }); // Adjusted for reliability
  const countersInView = useInView(countersRef, { amount: 0.5, once: true });

  // Debug circleInView state
  useEffect(() => {
    console.log("circleInView:", circleInView);
  }, [circleInView]);

  useLayoutEffect(()=>{
    const sect = sectionRef.current;
    if(!sect) return;

    const ctx = gsap.context(()=>{
      //elements
      const heading = sect.querySelector(".js-heading");
      const circle = sect.querySelector(".js-circle");
      const circleText = sect.querySelector(".js-circle-text");
      const rightTextWrap = sect.querySelector(".js-right-text");
      const statItems = gsap.utils.toArray(sect.querySelectorAll(".js-stat-item"));

      const counters = statItems.map((item)=>{
        return item.querySelector(".js-count");
      }).filter(Boolean);

      // --- Initial states (no FOUC) ---
      gsap.set(heading, { y: 70, autoAlpha: 0 });
      gsap.set(circle, { width: 0, height: 0 });
      gsap.set(circleText, {autoAlpha: 0, scale: 0.5});
      gsap.set(rightTextWrap, {y:20, autoAlpha:0})
      gsap.set(statItems, { y: 40, autoAlpha: 0 });

      counters.forEach((el)=>{
        if(!el) return;
        el.textContent = "0";
      });

      // --- Helper: count-up tween for a single element ---
      const runCount = (el) => {
        if(!el) return;
        const end = Number(el.dataset.end || "0");
        const suffix = el.dataset.suffix || "";
        const format = el.dataset.format || "";

        const obj = { val: 0 };
        gsap.to(obj, {
          val:end,
          duration: 1.2,
          ease: "power2.out",
          onUpdate:()=>{
            const v = Math.floor(obj.val);
            const base = format === "comma" ? v.toLocaleString() : String(v);
            el.textContent = base + suffix;
          }
        })

      }

      const tl = gsap.timeline({
        scrollTrigger:{
          trigger:sect,
          start:'top 60%',
          end: "bottom 30%",
          toggleActions:"play none none none"
        },
        defaults: { ease: "power3.out" },
      });

      //Circle grows 0→200, then reveal "16+"
      tl.to(circle, 
        {
          width: 200,
          height: 200,
          duration: 0.6,
          ease: "power3.inOut",
        },
      ).to(circleText, {autoAlpha:1, scale:1, duration:0.35}, "-=0.1");

      // Heading slide up + fade
      tl.to(heading, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.3");

      // Right text fades in
      tl.to(rightTextWrap, { y: 0, autoAlpha: 1, duration: 0.5 }, "-=0.1")

      tl.to(statItems, {
        y: 0,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.15,
        onStart: () => {
          // When the first item starts animating in, kick off counters
          counters.forEach((el) => runCount(el));
        },
      });
      
      ScrollTrigger.refresh();
    }, sectionRef)

    return () => ctx.revert();
  }, [])

  return (
    <section
    ref={sectionRef}
      className="flex flex-col justify-center p-[80px] h-[100%] relative min-h-screen" 
      id="experties_sec"
    >
      <div className="grid grid-cols-2 justify-between gap-[150px] mb-[100px]">
        <div className="">
          <h2 className="js-heading relative uppercase 2xl:leading-[70px] xl:leading-[56px] leading-[35px]  max-h-fit">
            <span className=" block font-medium text-[30px] xl:text-[42px] md:text-[42px] 2xl:text-[55px]">
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
            <div className="js-circle circle h-[200px] w-[200px] bg-[#fde93d] rounded-[100%] flex items-center justify-center text-[100px]">
              <div className="js-circle-text leading-[30px]">
                16<span className="text-[40px] font-bold">+</span>
              </div>
            </div>

            <div className="js-right-text flex-1 relative">
              <h5 className="uppercase font-bold tracking-[1px] text-[20px]">
                16+ Years of Expertise
              </h5>
              <p className="text-[16px] font-[400] mt-[20px] tracking-[1px] leading-[30px]">
                GTF Technologies is conceptualized from Gurukul The Foundation.
                We are a 16-year-old branding and digital media planning agency
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
        <div className="js-stat-item col-span-4">
          <div className="border-t-[1px] border-[#ddd] flex items-center pt-[40px]">
            <div className="left_content">
              <h4 className="number text-[40px] font-bold">
                <span
                  className="js-count"
                  data-end="1500"
                  data-format="comma"
                  data-suffix="+"
                >
                  0
                </span>
              </h4>
              <p className="tracking-[1px]">successfully project completed.</p>
            </div>
            <div className="ml-auto">
              <PiSuitcaseSimple size={32} />
            </div>
          </div>
        </div>

        <div className="js-stat-item col-span-4">
          <div className="border-t-[1px] border-[#ddd] flex items-center pt-[40px]">
            <div className="left_content">
              <h4 className="number text-[40px] font-bold">
                <span className="js-count" data-end="50" data-suffix="k+">
                  0
                </span>
              </h4>
              <p className="tracking-[1px]">
                Queries generated from Google per month.
              </p>
            </div>
            <div className="ml-auto">
              <PiSuitcaseSimple size={32} />
            </div>
          </div>
        </div>

        <div className="js-stat-item col-span-4">
          <div className="border-t-[1px] border-[#ddd] flex items-center pt-[40px]">
            <div className="left_content">
              <h4 className="number text-[40px] font-bold">
                <span className="js-count" data-end="1000" data-suffix="k+">
                  0
                </span>
              </h4>
              <p className="tracking-[1px]">
                Queries generated from Facebook & Instagram per month.
              </p>
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
