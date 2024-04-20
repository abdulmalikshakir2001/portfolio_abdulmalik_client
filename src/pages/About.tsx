import { FaLinkedin } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { FaWhatsappSquare } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import Icon from "@/components/Icon";
import Link from "next/link";
function About() {
  return (
    <div className="about_parent_div flex flex-col nsix:flex-row mx-4 md:mx-24  gap-28 mt-24" id="about">
      <div className="left_side flex-1 space-y-5">
        <span className="uppercase text-royalBlue text-s20_w700">about me</span>
        <h2 className="text-4.5xl" >Who is Abdul Malik ? </h2>
        <p className="text-s16_w500 text-customLightGray">
          Abdulmalik is a seasoned full-stack developer with a specialization in
          MERN stack. His expertise lies in creating a wide range of digital
          solutions including websites, web apps, SaaS products, ERP systems,
          chat applications, and video streaming applications. He has a passion
          for solving real-life problems using MERN technologies and has
          successfully implemented these skills in various projects. His
          portfolio includes ERP systems and e-commerce applications, showcasing
          his ability to handle complex and diverse projects. In addition to his
          project experience, Abdulmalik is proficient in a variety of
          programming languages and technologies. He is adept at JavaScript and
          TypeScript, and is well-versed in backend technologies like Node.js
          and Express.js. His frontend skills include mastery of React.js and
          Next.js. He also has extensive knowledge in handling databases like
          MySQL , postgresql  and MongoDB.For performance and optimization  of web app he use technologies like  Redis and Graphql etc.He also has expreince with AWS (use with node js).His proficiency in these areas allows him to work
          on existing web apps or build new ones from scratch, depending on the
          client needs.
        </p>
      </div>
      <div className="right_side flex-1 space-y-5">
        <p className="text-s30_w600" >Connect with Me</p>
        <p className="text-customLightGray text-s16_w500">
        Feel free to get in touch with me! Whether you have questions, feedback, or just want to say hello, I`m here to connect. Don `t hesitate to reach out I`d love to hear from you.
        </p>
        

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
      </div>
    </div>
  );
}

export default About;
