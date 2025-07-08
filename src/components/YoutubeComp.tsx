// components/YouTubeVideo.tsx
'use client';

export default function YouTubeVideo() {
  return (
    <div className="w-full max-w-[1200px] mx-0 sm:mx-auto  rounded-xl overflow-hidden shadow-lg sm:my-10">
      <div className="relative w-full pt-[56.25%]"> {/* 16:9 Aspect Ratio */}
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/i3ky8cyAHBc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
