'use client';

const BlogHero = () => {
  const slide = {
    image:
      "https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg",
    title: "Welcome to Our Blog",
    subtitle: "Stories, insights, and inspiration from our journey",
  };

  return (
    <div className="relative h-96 overflow-hidden bg-black mb-16 rounded-lg shadow-lg">
      {/* Background Image */}
      <img
        src={slide.image}
        alt={slide.title}
        className="w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10" />

      {/* Text Content */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
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
  );
};

export default BlogHero;
