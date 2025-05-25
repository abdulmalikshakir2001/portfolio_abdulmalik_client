'use client'
import React, { useState, useEffect } from "react";
import { Card, CardFooter, CardContent } from "@/components/ui/card";
import axios from 'axios';
import parse from 'html-react-parser';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

// Define types
interface ProjectImage {
  id: number;
  image_path: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image_path: string;
  link?: string;
  images: ProjectImage[];
}

const Portfolio: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  
  // New state for image preview modal
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(-1);
  const [isImageModalOpen, setIsImageModalOpen] = useState<boolean>(false);

useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/projects/projectWithImages`);
      const projects = response.data.projects;

      setProjects(projects); // assuming your state is setProjects
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

  const truncateDescription = (text: string, wordLimit = 8): string => {
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleCardClick = async (project: Project) => {
    try {
      // You can replace this with real API call
      setSelectedProject(project);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  // New functions for image preview modal
  const openImageModal = (imageIndex: number) => {
    setSelectedImageIndex(imageIndex);
    setIsImageModalOpen(true);
  };

  const closeImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImageIndex(-1);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedProject || !selectedProject.images) return;
    
    const currentIndex = selectedImageIndex;
    const totalImages = selectedProject.images.length;
    
    if (direction === 'prev') {
      setSelectedImageIndex(currentIndex === 0 ? totalImages - 1 : currentIndex - 1);
    } else {
      setSelectedImageIndex(currentIndex === totalImages - 1 ? 0 : currentIndex + 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isImageModalOpen) {
        if (e.key === 'Escape') {
          closeImageModal();
        } else if (e.key === 'ArrowLeft') {
          navigateImage('prev');
        } else if (e.key === 'ArrowRight') {
          navigateImage('next');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isImageModalOpen, selectedImageIndex]);

  if (loading) {
    return (
      <div className="mt-24 bg-gray-50 py-20 flex items-center justify-center">
        <div className="text-blue-600 text-xl">Loading projects...</div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-24 bg-gray-50 space-y-5 flex flex-col py-20" id="portfolio">
        <div className="flex flex-col items-center space-y-5">
          <p className="text-royalBlue text-s18_w600">Creative Portfolios</p>
          <h2 className="text-4.5xl px-10">Recent Works</h2>
          <p className="text-s18_w500 text-customLightGray w-2/3">
            I've built a bunch of cool stuff like business management systems (ERP), online stores, chat apps, and professional websites. And get this—I made them all from scratch using MERN stack. So, if you need something awesome for your business, I'm your go-to person. Let's chat and see how I can bring your ideas to life!
          </p>
        </div>

        <div className="px-14 lg:px-28 xl:px-40">
          <Carousel opts={{ align: "start" }} className="w-full">
            <CarouselContent>
              {projects.map((project) => (
                <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card
                      className="shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 bg-white border border-gray-200"
                      onClick={() => handleCardClick(project)}
                    >
                      <CardContent className="flex aspect-square items-center justify-center relative h-60 w-full p-0 overflow-hidden rounded-t-lg">
                        <img
                          src={`${process.env.NEXT_PUBLIC_SERVER_URL}${project.image_path}`}
                          alt={project.title}
                          className="w-full h-full object-fill transition-transform duration-300 hover:scale-110"
                        />
                      </CardContent>
                      <CardFooter className="bg-white p-6 space-y-3 flex flex-col items-start">
                        <h3 className="text-s20_w600 underline">
                          {project.title}
                        </h3>
                        <p className="text-s16_w500 text-customLightGray">
                          {parse(truncateDescription(project.description))}
                          <span
                            className="text-blue-600 hover:text-blue-800 cursor-pointer ml-1 font-medium"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCardClick(project);
                            }}
                          >
                            read more →
                          </span>
                        </p>
                      </CardFooter>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="bg-blue-600 shadow-lg border-2 border-blue-600 text-white hover:bg-blue hover:text-white" />
<CarouselNext className="bg-blue-600 shadow-lg border-2 border-blue-600 text-white hover:bg-blue hover:text-white" />

          </Carousel>
        </div>
      </div>

      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-7xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-blue-700">
              <div className="flex items-center space-x-4">
                <img
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}${selectedProject.image_path}`}
                  alt={selectedProject.title}
                  className="w-10 h-10 object-fill rounded-lg shadow-md"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-100 hover:text-white transition-colors duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Live Demo
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
                className="text-white hover:text-gray-200 transition-colors duration-200 p-2 hover:bg-white hover:bg-opacity-20 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="p-6 bg-white">
                <div className="mb-6">
                  <img
                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}${selectedProject.image_path}`}
                    alt={selectedProject.title}
                    className="w-11/12  lg:w-2/4 h-80 object-fill rounded-lg shadow-lg mx-auto"

                  />
                </div>
                <div className="w-11/12  lg:w-2/4 mx-auto">

                <h2 className="text-3xl font-bold text-gray-800 mb-4">{selectedProject.title}</h2>

                <div className="mb-8">
                  
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50 p-6 rounded-lg">
                     {parse(selectedProject.description)}
                  </div>
                </div>
                </div>

                {selectedProject.images && selectedProject.images.length > 0 ? (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Project Gallery</h3>
                    <div className="grid grid-cols-1 xl:grid-cols-3 lg:grid-cols-2 gap-6">
                      {selectedProject.images.map((image, index) => (
                        <div
                          key={image.id || index}
                          className="relative group overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                          onClick={() => openImageModal(index)}
                        >
                          <img
                            src={`${process.env.NEXT_PUBLIC_SERVER_URL}${image.image_path}`}
                            alt={`${selectedProject.title} - Image ${index + 1}`}
                            className="w-full h-64 object-fill transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                              Click to view full size
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500 py-12 border-t border-gray-200">
                    <p>No additional gallery images available for this project.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Preview Modal */}
      {isImageModalOpen && selectedProject && selectedProject.images && selectedImageIndex >= 0 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-[60]"
          onClick={closeImageModal}
        >
          {/* Fixed Controls Layer */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Close Button - Fixed Position */}
            <button
              onClick={closeImageModal}
              className="absolute top-6 right-6 z-20 text-white hover:text-gray-300 transition-all duration-200 p-3 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 backdrop-blur-sm pointer-events-auto"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons - Fixed Position */}
            {selectedProject.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('prev');
                  }}
                  className="fixed left-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-all duration-200 p-4 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 backdrop-blur-sm pointer-events-auto hover:scale-110"
                >
                  <ChevronLeft className="w-7 h-7" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateImage('next');
                  }}
                  className="fixed right-6 top-1/2 -translate-y-1/2 z-20 text-white hover:text-gray-300 transition-all duration-200 p-4 bg-black bg-opacity-60 rounded-full hover:bg-opacity-80 backdrop-blur-sm pointer-events-auto hover:scale-110"
                >
                  <ChevronRight className="w-7 h-7" />
                </button>
              </>
            )}

            {/* Image Counter - Fixed Position */}
            {selectedProject.images.length > 1 && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black bg-opacity-60 text-white px-6 py-3 rounded-full text-sm font-medium backdrop-blur-sm pointer-events-none">
                {selectedImageIndex + 1} of {selectedProject.images.length}
              </div>
            )}

            {/* Keyboard Instructions - Fixed Position */}
            <div className="fixed bottom-6 right-6 z-20 text-white text-xs bg-black bg-opacity-60 px-4 py-2 rounded-lg backdrop-blur-sm pointer-events-none">
              Use ← → arrows or ESC to close
            </div>
          </div>

          {/* Image Container - Fixed Dimensions */}
          <div className="absolute inset-0 flex items-center justify-center p-20">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Image with smooth transitions */}
              <div 
                className="relative max-w-full max-h-full flex items-center justify-center transition-opacity duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  key={selectedImageIndex} // Force re-render for smooth transitions
                  src={`${process.env.NEXT_PUBLIC_SERVER_URL}${selectedProject.images[selectedImageIndex].image_path}`}
                  alt={`${selectedProject.title} - Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in fade-in zoom-in duration-300"
                  style={{
                    maxWidth: 'calc(100vw - 160px)',
                    maxHeight: 'calc(100vh - 160px)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Portfolio;