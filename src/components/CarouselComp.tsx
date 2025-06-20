"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const carouselImages = [
  {
    src: "/main.png",
    alt: "Software testing team collaboration",
    title: "Professional Testing Team",
    description: "Join our community of certified professionals",
  },
  {
    src: "/3.png",
    alt: "ISTQB certification ceremony",
    title: "ISTQB Certification",
    description: "Globally recognized testing credentials",
  },
  { 
    src: "/2.png",
    alt: "Software testing training session",
    title: "Expert Training",
    description: "Learn from industry experts",
  },
  {
    src: "/1million.png",
    alt: "Career growth in testing",
    title: "Career Growth",
    description: "Advance your testing career",
  },
];

export default function HeroCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority={index === 0}
          />

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 sm:px-6 sm:py-4">
            <div className="text-white">
              <h3 className="font-bold text-base sm:text-lg mb-1">{image.title}</h3>
              <p className="text-white/90 text-xs sm:text-sm mb-3">{image.description}</p>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-white"
                    />
                  ))}
                </div>
              </div>
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
