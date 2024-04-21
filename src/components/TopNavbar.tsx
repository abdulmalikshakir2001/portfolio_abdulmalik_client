'use client'
import React, { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import companyLogo from "@/assets/company_malik_site.svg";
import Image from "next/image";
import { GiHamburgerMenu } from "react-icons/gi";
import config from "@root/tailwind.config";
const links = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Portfolio", href: "#portfolio" },
  { title: "Contact", href: "#contact" },
];
type ListItemIndex = number | null;
function TopNavigation() {
  const [desktopScreenWidth,setDesktopScreenWidth] = useState(parseInt(config.theme.extend.screens['nsix'])); 
  const [showMenu, setShowMenu] = useState(false);
  const [listItemIndex, setListItemIndex] = useState<ListItemIndex>(null);

  const showMobileMenu = () => {
    setShowMenu(!showMenu);
  };

  const saveIndexInState = (listItemIndex: ListItemIndex) => {
    setListItemIndex(listItemIndex);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    if (typeof window !== 'undefined') {
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useEffect(()=>{
    if(screenWidth >= desktopScreenWidth){
      setShowMenu(true)
    }


  },[desktopScreenWidth, screenWidth, showMenu]);
  // add box shadow to bottom of navbar when the page scroll
  const [navBottomBoxShadow, setNavBottomBoxShadow] = useState<string|null>(null);
    useEffect(() => {
        const handleScroll = () => {
          // Check if the page is scrolled beyond certain threshold
          if (window.scrollY > 0) {
            setNavBottomBoxShadow('shadow')
          } else {
            setNavBottomBoxShadow('shadow-none')
            
          }
        };
    
        // Attach event listener when component mounts
        window.addEventListener('scroll', handleScroll);
    
        // Clean up by removing event listener when component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
  return (
    <>
      <div className={`top_nav_parent flex items-center  justify-between fixed z-10 bg-white h-24 w-full ${navBottomBoxShadow} px-10 nsix:px-24`}>
        {/* image */}
        <Image src={companyLogo} alt="pixel.com" width={50} height={50} priority={true} />
        {/* menu links */}
        {showMenu && (
          <NavigationMenu>
            <NavigationMenuList className="nsix:gap-x-8 bg-white shadow-lg nsix:shadow-none">
              {links.map((linkItem, index) => {
                return (
                  <NavigationMenuItem key={index} onClick={() => saveIndexInState(index)} className="m-4 nsix:m-0">
                    <Link href={linkItem.href} legacyBehavior passHref className="">
                      <NavigationMenuLink className={`${listItemIndex === index ? "text-royalBlue" : "text-black"} hover:text-royalBlue`}>
                        {linkItem.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        )}
        {/* button */}
        <div className="flex items-center gap-x-3">
          <GiHamburgerMenu className="nsix:hidden" onClick={showMobileMenu} />
        </div>
      </div>
    </>
  );
}

export default TopNavigation;
