import Image from "next/image";
import Banner from "@/components/Home/Banner";
import MidSection from "../components/Home/MidSection";
import Portfolio from "../components/Home/Portfolio";
import Expertise from "@/components/Home/expertise/Expertise";
export default function Home() {
  return (
    <>
      <Banner />
      <Portfolio portfolioIndex={1} />
      <MidSection />
      <Expertise />
      <MidSection />
      <Portfolio portfolioIndex={1} />
    </>
  );
}
