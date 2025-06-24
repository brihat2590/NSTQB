"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type CarouselImage = {
  id: string;
  url: string;
  title: string;
  description: string;
};

export default function HeroCarousel() {
  const [carouselImages, setCarouselImages] = useState<CarouselImage[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/carousel");
      const data = await res.json();
      setCarouselImages(data);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if (carouselImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500);

    return () => clearInterval(interval);
  }, [carouselImages]);

  if (carouselImages.length === 0) return null;

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
      {carouselImages.map((image, index) => (
        <div
          key={image.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={image.url}
            alt={image.title || `Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />

          {/* Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 sm:px-6 sm:py-4">
            <div className="text-white">
              <h3 className="font-bold text-base sm:text-lg mb-1">
                {image.title || `Image ${index + 1}`}
              </h3>
              <p className="text-white/90 text-xs sm:text-sm mb-3">
                {image.description || "No description available"}
              </p>
            </div>
          </div>
        </div>
      ))}

      {/* Indicators */}
      <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-white w-6" : "bg-white/50 w-2 hover:bg-white/75"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
