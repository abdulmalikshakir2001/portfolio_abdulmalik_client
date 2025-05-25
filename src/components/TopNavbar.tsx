'use client';
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
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react"; // Spinner icon

const links = [
  { title: "Home", href: "#home" },
  { title: "About", href: "#about" },
  { title: "Portfolio", href: "#portfolio" },
  { title: "Contact", href: "#contact" },
];

type ListItemIndex = number | null;

function TopNavigation() {
  const [desktopScreenWidth, setDesktopScreenWidth] = useState(
    parseInt(config.theme.extend.screens['nsix'])
  );
  const [showMenu, setShowMenu] = useState(false);
  const [listItemIndex, setListItemIndex] = useState<ListItemIndex>(null);
  const [screenWidth, setScreenWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [navBottomBoxShadow, setNavBottomBoxShadow] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const showMobileMenu = () => {
    setShowMenu(!showMenu);
  };

  const saveIndexInState = (index: ListItemIndex) => {
    setListItemIndex(index);
  };

  const handleDownloadCV = () => {
    setIsDownloading(true);

    const fileId = "1JrNCBdIDrwHwRtrzfvD064fjhPxK4g_N";
    const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Simulate loading state reset
    setTimeout(() => {
      setIsDownloading(false);
    }, 2000);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (screenWidth >= desktopScreenWidth) {
      setShowMenu(true);
    }
  }, [desktopScreenWidth, screenWidth, showMenu]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setNavBottomBoxShadow("shadow");
      } else {
        setNavBottomBoxShadow("shadow-none");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`top_nav_parent flex items-center justify-between fixed z-10 bg-white h-24 w-full ${navBottomBoxShadow} px-10 nsix:px-24`}>
        {/* Logo */}
        <Image src={companyLogo} alt="pixel.com" width={50} height={50} priority />

        {/* Menu Links */}
        {showMenu && (
          <NavigationMenu>
            <NavigationMenuList className="nsix:gap-x-8 bg-white shadow-lg nsix:shadow-none">
              {links.map((linkItem, index) => (
                <NavigationMenuItem
                  key={index}
                  onClick={() => saveIndexInState(index)}
                  className="m-4 nsix:m-0"
                >
                  <Link href={linkItem.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`${
                        listItemIndex === index ? "text-royalBlue" : "text-black"
                      } hover:text-royalBlue`}
                    >
                      {linkItem.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* Download CV + Hamburger */}
        <div className="flex items-center gap-x-3">
          <Button
            onClick={handleDownloadCV}
            variant="outline"
            className="text-s16_w600 bg-black text-white flex items-center gap-2"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Downloading...
              </>
            ) : (
              "Download CV"
            )}
          </Button>

          <GiHamburgerMenu className="nsix:hidden cursor-pointer" onClick={showMobileMenu} />
        </div>
      </div>
    </>
  );
}

export default TopNavigation;
