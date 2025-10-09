import Image from "next/image";

const WhoWeAre = () => {
  return (
    <section className="about_section w-full min-h-[calc(100vh+200px)] px-[100px] flex items-center">
      <div className="grid grid-cols-2">
        <div className="col-span-1 flex flex-col justify-center">
          <p>Who We Are?</p>
          <h2 className="text-[64px] uppercase tracking-[2px]">Who We Are?</h2>
          <p className="text-[28px] mt-[30px] tracking-[1px]">GTF Technologies, conceptualized from Gurukul The Foundation, is a 16-year-old branding and digital media planning agency headquartered in Noida, Mumbai, Pune, and with an upcoming office in Bangalore.</p>
        </div>

        <div className="flex justify-end col-span-1 right_col">
          <Image
          alt="who we are"
          height={1000}
          width={750}
          className="max-w-[600px]"
            src="/assets/home/about/overview_image.webp"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
