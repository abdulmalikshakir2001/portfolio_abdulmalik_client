'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { FaAnglesRight,FaAnglesLeft } from "react-icons/fa6";


import { fetchApi } from '@/utility_functions/fetchApi';

interface ICardsType {
  createdAt: string;
  image: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}

const ImageGallerySlider = () => {
  

  
  const [current, setCurrent] = useState(0); // Current index
  const [cards,setCards] = useState<ICardsType[]> ([])
  const [runUseEffectAgain,setRunUseEffectAgain] = useState(false)
  // https://portfolio-abdulmalik-server.vercel.app
  useEffect(()=>{
    fetchApi(`https://portfolio-abdulmalik-server.vercel.app/api/project/allProjects`,"GET",{}).then((data)=>{
      setCards(data.allProjects)
    })
    setRunUseEffectAgain(true)

  },[])
  useEffect(()=>{
    setRunUseEffectAgain(false)
  },[])
  const nextCard = () => {
    setCurrent(current === cards.length - 1 ? 0 : current + 1);
  };

  const prevCard = () => {
    setCurrent(current === 0 ? cards.length - 1 : current - 1);
  };
  return (
    <div className='flex flex-col  items-center justify-center' id="portfolio" >
      <h2 className='uppercase text-4xl font-bold mb-4' >my portfolio</h2>
      <div className="flex flex-wrap md:flex-nowrap  justify-center gap-6  md:flex-row flex-col items-center">
        <button onClick={prevCard}><FaAnglesLeft  size="40px" /></button>
    {
        cards.length != 0 &&  Array.from({ length: 3 }, (_, i) => (current + i) % cards.length).map(index => (
          <div key={index} className="relative  rounded-2xl h-full">
            <Image width="400" height="400"  src={`/api/files/${cards[index].image}`}  alt={cards[index].title} className='rounded-2xl' />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-2xl">
              <h2 className="text-white">{cards[index].title}</h2>
            </div>
            <p className='mt-4 font-bold text-center' >{cards[index].title}</p>
          </div>
        ))
    }
        <button onClick={nextCard}><FaAnglesRight size="40px" /></button>
      </div>
    </div>
  );
};
export default ImageGallerySlider;

