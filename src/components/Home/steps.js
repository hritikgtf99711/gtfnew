import { useState } from "react";

const steps = [
  {
    title:'Brand Catalyst',
    desc:'We don\'t just tell. We weave, launching a refined brand identity across online and offline platforms, leading to improved online presence, enhanced customer engagement, and increased market competitiveness'
  },
  {
    title:'Great Story Tellers',
    desc:'We don\'t just tell. We weave, launching a refined brand identity across online and offline platforms, leading to improved online presence, enhanced customer engagement, and increased market competitiveness'
  },
  {
    title:'One-stop Solution',
    desc:'We don\'t just tell. We weave, launching a refined brand identity across online and offline platforms, leading to improved online presence, enhanced customer engagement, and increased market competitiveness'
  },
];

export default function Steps(){
  const [activeIndex, setActiveIndex] = useState(0);
  
  return(
    <section className="steps_section w-full h-screen px-[100px] flex items-center">
      <div className="grid grid-cols-2">
        <div className="col-span-1">
          <p>Company Steps</p>
          <h2 className="text-[64px] uppercase tracking-[2px]">Amazing Brands</h2>
        </div>

        <div className="col-span-1 right_col">
          <ul>
            {steps.map((item, index)=>(
              <li key={index} className={`cursor-pointer py-[40px] ${index+1 < steps.length ? 'border-b-4' : ''} ${activeIndex === index ? 'active' : 'opacity-[0.3]'} `} onMouseEnter={() => setActiveIndex(index)}>
                <h4 className="2xl:text-[50px] xl:leading-[30px] lg:text-[26px] text-[20px] uppercase font-[600]">{item.title}</h4>
                <p className={`desc text-[16px] tracking-[1px] ${activeIndex === index ? 'max-h-[200px] opacity-100 mt-[30px]' : 'max-h-0 opacity-0 overflow-hidden'}`}>{item.desc}</p>
              </li>
            ))}
            
          </ul>
        </div>
      </div>
    </section>
  )
}