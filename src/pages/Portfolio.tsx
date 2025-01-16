import * as React from "react";


import { Card, CardFooter,CardContent } from "@/components/ui/card";
import coworkMockup from "@/assets/cowork_mockup_malik_site.png";
import corporateMockup from "@/assets/corporate_mockup_malik_site.png";
import ecommerceMockup from "@/assets/ecommerce_mockup_malik_site.png";
import erpdashboard from "@/assets/erp_dashboard_malik_site.png";
import bml from "@/assets/bml_malik_site.png";
import  titiflix from "@/assets/titiflix_malik_site.png";
import  plano from "@/assets/plano_malik_site.png";
import  tms from "@/assets/tms_malik_site.jpeg";
import  eciErp from "@/assets/erp_malik_site.jpeg";
import  editur from "@/assets/editur_malik_site.jpeg";
import {
  Carousel,
  CarouselContent,
  
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
function Portfolio() {
  const images = [
    // {title:"integrated chat+auth into existing web app",desc:"login mention users and start the chats 1)admin@gmail.com 2)user1@gmail.com",imgSrc:coworkMockup,link:""},

    {title:"TMS - Empowering Efficient and Effective Training Management",desc:`The TMS addresses these challenges by streamlining the organization, conduct, and monitoring of training programs. It integrates with existing systems, offers user-friendly interfaces, and ensures scalability and data security.
    Key features include course management, scheduling tools, participant tracking, assessments, feedback collection, reporting, certificate management, user roles, and integration with HR systems. This system improves training efficiency, participant tracking, and real-time reporting, enhancing overall training effectiveness.`,imgSrc:tms,link:"https://ecitms.zetasoft.org/"},

    {title:"Editur.ai - Converts Long Videos into Engaging Shorts",desc:` Editur.ai is a web-based OpenAI powered SaaS application built with the MERN stack. This innovative AI tool converts long videos into engaging short clips, ideal for social media and marketing. The app features advanced editing capabilities, automatic highlight detection, and seamless integration with various video platforms. My role encompassed full-stack development, user interface design, and deployment, ensuring a smooth and efficient user experience. Editur.ai has garnered positive feedback for its ease of use and effectiveness in enhancing video content.`,imgSrc:editur,link:"https://responsible-consideration-production.up.railway.app/"},

    {title:"ERP - Integrated Solutions for Managing Business Processes",desc:`The ERP system addresses these challenges by providing a unified platform for managing core business processes, improving efficiency, and enabling better decision-making through real-time data access. It ensures seamless integration of various business modules and offers customization to meet specific requirements.

Key features include finance, HR, inventory, and sales modules, centralized data management, real-time reporting, workflow automation, customizable dashboards, and mobile access. This system streamlines processes, enhances data accuracy, and supports business growth.`,imgSrc:eciErp,link:"https://erpdemo.zetasoft.org/login"},

    {title:"Enterprise Resource Planning",desc:"Register your account and you are good to go .  Note : This app is under development . ",imgSrc:erpdashboard,link:"https://malik-erp.gooposts.com/"},
    {title:"convert bml wordpress theme into pure tailwind css",desc:"convert bml  wordpress theme into pure tailwind css code ",imgSrc:bml,link:"https://bml.gooposts.com/"},
    {title:"integrated chat component + auth into existing web app",desc:"login two users to check the demo of chat app    1)email = one@gmail.com , password = 123456   2)email = two@gmail.com , password = 123456 ",imgSrc:coworkMockup,link:"https://cowork-front.gooposts.com/"},
    {title:"convert titiflix wordpress theme into pure tailwind css code",desc:"convert titiflix wordpress theme into pure tailwind css code for BRAZIL client ",imgSrc:titiflix,link:"https://titiflix.gooposts.com/"},
    {title:"ecommerce app for buisness store",desc:"modular ecommerce app with beautiful ui for buisness store",imgSrc:ecommerceMockup,link:"https://ecommerce-client-lake-five.vercel.app/"},
    {title:"corporate website with beautiful ui",desc:"devoloped an corporate website for ui exploration",imgSrc:corporateMockup,link:"https://corporate-react.vercel.app/"},
    {title:"convert plano wordpress themen into fully resposive tailwind css code",desc:"convert plano wordpress themen into fully resposive tailwind css code",imgSrc:plano,link:"https://plano.gooposts.com/"},
    
    
  ];
  return (
    <div className="mt-24 bg-customWhiteGray space-y-5 flex flex-col py-20" id="portfolio">
      <div className="flex flex-col items-center space-y-5">
        <p className="text-royalBlue text-s18_w600">Creative Portfolios</p>
        <h2 className="text-4.5xl">Recent Works</h2>
        <p className="text-s18_w500 text-customLightGray w-2/3">
         I`ve built a bunch of cool stuff like business management systems(ERP), online stores, chat apps, and professional websites. And get this—I made them all from scratch using MERN stack. So, if you need something awesome for your business, I`m your go-to person. Let`s chat and see how I can bring your ideas to life!

        </p>
      </div>
      <div className="carousal_parent  px-14  fiveh:px-28  sevenh:px-15 nsix:px-40">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full "
        >
          <CarouselContent>
            {images.map((project, index) => (
              <CarouselItem key={index} className="sevenh:basis-1/2 nsix:basis-1/3">
                <div className="p-1">
              <Link href={project.link} target="_blank">
                  <Card className="shadow-none space-y-3 ">
                    <CardContent className="flex aspect-square items-center justify-center relative h-72 w-full">
                      <Image src={project.imgSrc}  fill alt="Picture of the author" />
                    </CardContent>
                    <CardFooter className="bg-customWhiteGray space-y-3" >
                      <p className="text-s20_w600 underline">{project.title}</p>
                      <p className="text-s16_w500 text-customLightGray">{project.desc}</p>
                    </CardFooter>
                  </Card>
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

export default Portfolio;
