"use client";
import { useEffect, useState } from "react";
import { FaAnglesRight, FaAnglesLeft } from "react-icons/fa6";
import { fetchApi } from "@/utility_functions/fetchApi";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from 'next/image';

interface ICardsType {
  createdAt: string;
  image: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};
const ImageGallerySlider = () => {
  const [current, setCurrent] = useState(0); // Current index
  const [cards, setCards] = useState<ICardsType[]>([]);
  const [runUseEffectAgain, setRunUseEffectAgain] = useState(false);
  // https://portfolio-abdulmalik-server.vercel.app
  useEffect(() => {
    fetchApi(`/api/project/allProjects`, "GET", {}).then((data) => {
      setCards(data.allProjects);
    
    
    });
    setRunUseEffectAgain(true);
  }, []);
  useEffect(() => {
    setRunUseEffectAgain(false);
  }, []);

  return (

<Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      keyBoardControl={true}
      customTransition="all .5"
      
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {cards.map((item) => (
        <div key={item._id} className="m-4">
          <Image src={`/api/files/${item.image}`} alt={item.title} layout="responsive" width={500} height={300} className="rounded-xl" />
          <p className="legend font-bold text-center my-2">{item.title}</p>
        </div>
      ))}
    </Carousel>


  );
};
export default ImageGallerySlider;
