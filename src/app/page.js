import Image from "next/image";
import Banner from "@/components/Home/Banner";
import MidSection from "../components/Home/MidSection";
import Portfolio from "../components/Home/Portfolio";
export default function Home() {
  return (<><Banner/>
  <MidSection/>
  <Portfolio portfolioIndex={1}/>
    <MidSection/>
  <Portfolio portfolioIndex={1}/>
  </>);
}
