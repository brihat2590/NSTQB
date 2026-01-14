'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Linkedin } from 'lucide-react';

type BoardMember = {
  id: string;
  name: string;
  title: string;
  linkedInUrl: string;
  imageUrl: string;
};

export default function MemberBoards() {
  const [boardMembers, setBoardMembers] = useState<BoardMember[]>([]);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/board-members')
      .then((res) => res.json())
      .then((data: BoardMember[]) => setBoardMembers(data));
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 to-red-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-semibold text-center text-gray-800 mb-12">
          Meet Our Team
        </h2>

        {/* ===================== */}
        {/* 📱 MOBILE VIEW */}
        {/* ===================== */}
        <div className="lg:hidden">
          <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {boardMembers.map((member) => (
              <div
                key={member.id}
                className="min-w-[260px] snap-start flex-shrink-0"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image
                    src={member.imageUrl || '/placeholder.svg'}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                  {/* Info */}
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-lg font-semibold">{member.name}</h3>
                    <p className="text-sm text-white/90 mb-2">
                      {member.title}
                    </p>

                    {member.linkedInUrl && (
                      <a
                        href={member.linkedInUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition p-2"
                      >
                        <Linkedin className="h-4 w-4 text-white" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Swipe hint */}
          <p className="mt-3 text-sm text-gray-500 text-center">
            Swipe to explore team members →
          </p>
        </div>

        {/* ===================== */}
        {/* 💻 DESKTOP VIEW */}
        {/* ===================== */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="group relative"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative aspect-[4/5] overflow-hidden transition-all duration-200">
                <Image
                  src={member.imageUrl || '/placeholder.svg'}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />

                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-200 ${
                    hoveredMember === member.id
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                />

                {/* Hover Content */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-200 ${
                    hoveredMember === member.id
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0'
                  }`}
                >
                  <h3 className="text-lg font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-white/90 mb-3">
                    {member.title}
                  </p>

                  {member.linkedInUrl && (
                    <a
                      href={member.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 transition p-2"
                    >
                      <Linkedin className="h-4 w-4 text-white" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
