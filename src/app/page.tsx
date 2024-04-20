import Body from "@/components/Body";
import Footer from "@/components/Footer";

import TopNavbar from "@/components/TopNavbar";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Portfolio from "@/pages/Portfolio";

export default function Home() {
  console.log('app')
  return (
    <div className="main">
      <TopNavbar />
      <Body />
      <About />
      <Portfolio />
      <Contact />
      <Footer />
       
      
    </div>
  );
}
