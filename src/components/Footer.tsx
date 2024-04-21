import { FaLinkedin } from "react-icons/fa6";
import { FaWhatsappSquare } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import Icon from "@/components/Icon";
import { TbBrandGithubFilled } from "react-icons/tb";
import Link from "next/link";
function Footer() {
  return (
    <div className="h-[70dvh] bg-customDarkBlue">
      <div className="grid grid-cols-4 grid-rows-70_30 h-full">

        <div className="text-white space-y-5 place-self-center col-span-4 sevenh:col-span-2 px-14">
          <h2 className="text-4.4xl" >Let`s Talk!</h2>
          
          <h3 className="text-s24_w700">Contact Info</h3>
          <div>
            <Link href="mailto:abdulmalikshakir2001@gmail.com">
          <p className="text-s16_w500" >abdulmalikshakir2001@gmail.com</p>
          </Link>
          <p className="text-s16_w500">Faisal colony Dalazak road peshawar city pakistan</p>
          <Link href="https://wa.me/03089429794" >
          <p className="text-s16_w500">0308 94 29 794</p>
          </Link>
          </div>

        </div>
        
        
        
        <div className="text-white col-span-4 place-self-center">

          <div className="flex flex-col items-center gap-4">
          
          <div className="social_icons_wrapper flex gap-3" >
          
          <Link href="mailto:abdulmalikshakir2001@gmail.com">
            <Icon> <IoMail /></Icon>
            </Link>
          


              <Link href="https://wa.me/03089429794" >
            <Icon> <FaWhatsappSquare /></Icon>
            </Link>

            <Link href="https://www.linkedin.com/in/abdul-malik-a22368242/"  target="_blank">
            <Icon> <FaLinkedin /></Icon>
            </Link>
            <Link href="https://github.com/abdulmalikshakir2001"  target="_blank">
            <Icon> <TbBrandGithubFilled /></Icon>
            </Link>
            
            
        </div>

        <div className="rights">
        All rights reserved by © Abdul Malik

        </div>
        </div>

            

          
          
        </div>

      </div>
      
    </div>
  )
}

export default Footer
