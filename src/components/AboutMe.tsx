import Image from "next/image";
import malikPic from "../assets/malik_professional.JPG";
import Button from "./Button";
function AboutMe() {
  return (
    <div className="flex flex-wrap  justify-evenly items-center p-4 mb-10" id="about" >
  <div className="w-full md:w-1/2 flex justify-center">
    <Image width="500" height="200" src={malikPic} alt="Your Name" className="rounded-lg shadow-md" />
  </div>
  <div className="w-full md:w-1/2 p-4">
    <h2 className="text-2xl font-bold mb-2">Who is Abdul Malik</h2>
    <p className="text-gray-700 mb-4">Abdulmalik is a seasoned full-stack developer with a specialization in MERN stack. His expertise lies in creating a wide range of digital solutions including websites, web apps, SaaS products, ERP systems, chat applications, and video streaming applications. He has a passion for solving real-life problems using MERN technologies and has successfully implemented these skills in various projects. His portfolio includes ERP systems and e-commerce applications, showcasing his ability to handle complex and diverse projects. 
    </p>
    <p className="text-gray-700">  
    In addition to his project experience, Abdulmalik is proficient in a variety of programming languages and technologies. He is adept at JavaScript and TypeScript, and is well-versed in backend technologies like Node.js and Express.js. His frontend skills include mastery of React.js and Next.js. He also has extensive knowledge in handling databases like MySQL and MongoDB. His proficiency in these areas allows him to work on existing web apps or build new ones from scratch, depending on the client needs.
    </p>

    <Button text="More About Me" />
  </div>
</div>
  )
}

export default AboutMe
