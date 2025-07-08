'use client';

import { useState, useEffect } from 'react';

const BlogCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.pexels.com/photos/6195783/pexels-photo-6195783.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080",
      title: "Welcome to Our Blog",
      subtitle: "Stories, insights, and inspiration from our journey"
    },
    {
      id: 2,
      image: "https://imgs.search.brave.com/8-IM7w1o_qGBZIk_OWMTfL-y9OTs2S1dvHABy1zbqJc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXQuY29t/L3cvZnVsbC83L2Yv/Yy8xMDI3MTUtMzg0/MHgyMTYwLWRlc2t0/b3AtNGstbW91bnQt/ZXZlcmVzdC1iYWNr/Z3JvdW5kLXBob3Rv/LmpwZw",
      title: "Read Our Latest Posts",
      subtitle: "Discover fresh perspectives and expert insights"
    },
    {
      id: 3,
      image: "https://imgs.search.brave.com/ZES1CitnGQxpZNpqFufYvDXBPa4I1DJUhOIe25EFEAg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC80LzIvZS8x/MzA3MzY4LWZ1bGwt/c2l6ZS1uZXBhbC13/YWxscGFwZXItaGQt/MjU2MHgxNDQwLWZv/ci1pcGhvbmUtNi5q/cGc",
      title: "Join the Conversation",
      subtitle: "Explore articles that matter to you"
    }
    
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-96 overflow-hidden bg-black mb-16 rounded-lg shadow-lg">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
            style={{ pointerEvents: index === currentSlide ? 'auto' : 'none' }}
          >
            {/* Background Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-opacity-60" />

            {/* Text Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6 max-w-3xl">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl text-gray-200 drop-shadow-sm">
                  {slide.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20"
        aria-label="Previous Slide"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-20"
        aria-label="Next Slide"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogCarousel;
