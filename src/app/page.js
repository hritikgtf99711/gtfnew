import Image from "next/image";
import Banner from "@/components/Home/Banner";
import MidSection from "../components/Home/MidSection";
import Portfolio from "../components/Home/Portfolio";
export default function Home() {
  return (<>
  <Banner/>
  <MidSection src={'./assets/img/mide_section_img.jpg'}/>
  <Portfolio portfolioIndex={1}/>
   <MidSection  src={'./assets/img/mide_section_img1.jpg'}/>
  <Portfolio portfolioIndex={1}/>
  </>);
}
