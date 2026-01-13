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
      .then(res => res.json())
      .then((data: BoardMember[]) => setBoardMembers(data));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-16 md:pb-30 px-4 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl py-2 font-semibold text-center text-gray-800 mb-12">
          Meet Our  Team
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {boardMembers.map((member) => (
            <div
              key={member.id}
              className="group relative"
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative overflow-hidden rounded-sm aspect-[4/5] transition-all duration-200">
                <Image
                  src={member.imageUrl || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-200"
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-200 ${
                    hoveredMember === member.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-200 ${
                    hoveredMember === member.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-white/90 text-sm mb-3">{member.title}</p>

                  <a
                    href={member.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-white p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-150"
                   
                  >
                    <Linkedin className="h-4 w-4 text-white" />
                  </a>
                </div>
              </div>  
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
