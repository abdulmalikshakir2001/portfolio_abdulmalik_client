import Image from "next/image"
import CircleSvg from "./CircleSvg"
import malikPic from "@/assets/malik_background_remove.png"
import { Button } from "@/components/ui/button"
import { buttonVariants } from "@/components/ui/button"
import Link from "next/link"

function Body() {
  return (
    <div className="pt-24" id="home">
      <div className="flex flex-col nsix:flex-row">
        <div className="nsix:flex-1">
        <CircleSvg  radius="45"  className="-translate-x-12" cx="50" cy="50"  fill="#ECF1FB" height="100" width="100"/>
        <div className="intro space-y-5 ftwenty:ms-24 p-4 nsix:p-0">
          <h1>
            <span className="text-s16_w600 text-royalBlue">
            Hey there 👋 i am 
            </span>
            <br />
            <span className="text-4.5xl">Abdul Malik</span> 
            </h1>
          <h2 className="text-s20_w500" > <span className="text-customLightGray" >Mern Stack</span> Web developer</h2>
          <p className="text-customLightGray">Empower your business with cutting-edge web technologies and innovative solutions. As a seasoned problem solver, I specialize in digitizing and enhancing businesses through advanced web development strategies. Whether you have a problem that needs solving or an idea waiting to be realized, I`m here to help you navigate the digital landscape and drive your business growth. Reach out today to explore how I can transform your vision into reality</p>
          <div className="contact_learn_butt flex flex-col tfifty:flex-row gap-2">
          

          


          <Button asChild  variant="outline" className="text-s16_w600 bg-royalBlue text-white">
          <Link href="#contact">Contact Me</Link>
          </Button>
          <Button asChild variant="outline" className="text-s16_w600  bg-black  text-white">
          <Link href="#about">Learn More</Link>
          </Button>
          </div>

        </div>
        </div>
        <div className="nsix:flex-1">
          <div className="flex justify-end ">
        <CircleSvg  radius="250"   cx="250" cy="250"  height="400" width="330" fill="#4264EB"  className="-z-1"/>
        <div className="image_parent  absolute -z-1">
      <Image
      src={malikPic}
      width={300}
      height={300}
      alt="malik pic"
    />
    </div>

    </div>
        </div>
      </div>
    </div>
  )
}

export default Body
