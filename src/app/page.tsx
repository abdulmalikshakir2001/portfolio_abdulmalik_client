import AboutMe from "@/components/AboutMe";
import ContactUs from "@/components/ContactUs";
import Footer from "@/components/Footer";
import ImageGallerySlider from "@/components/ImageGallerySlider";
import Navbar from "@/components/Navbar";
function page() {
  return (
    <div className="md:mx-7" > 
       <Navbar />
       <AboutMe />
       <ImageGallerySlider />
       <ContactUs />
       <Footer />
    </div>
  );
}

export default page;
