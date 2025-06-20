"use client";

import { Linkedin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const boardMembers = [
  {
    id: 1,
    name: "Dr. Rajesh Sharma",
    role: "Chairman & CEO",
    image: "/temple.jpg",
    linkedIn: "https://linkedin.com/in/rajesh-sharma",
  },
  {
    id: 2,
    name: "Ms. Priya Thapa",
    role: "Vice Chairman",
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg",
    linkedIn: "https://linkedin.com/in/priya-thapa",
  },
  {
    id: 3,
    name: "Mr. Amit Gurung",
    role: "Technical Director",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    linkedIn: "https://linkedin.com/in/amit-gurung"
  },
  {
    id: 4,
    name: "Dr. Sunita Maharjan",
    role: "Academic Director",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    linkedIn: "https://linkedin.com/in/sunita-maharjan"
  },
  {
    id: 5,
    name: "Mr. Kamal Shrestha",
    role: "Operations Manager",
    image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg",
    linkedIn: "https://linkedin.com/in/kamal-shrestha"
  },
  {
    id: 6,
    name: "Ms. Anita Poudel",
    role: "Quality Assurance Head",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    linkedIn: "https://linkedin.com/in/anita-poudel"
  },
  {
    id: 7,
    name: "Mr. Dipesh Karki",
    role: "Training Coordinator",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    linkedIn: "https://linkedin.com/in/dipesh-karki"
  },
  {
    id: 8,
    name: "Ms. Roshani Adhikari",
    role: "Certification Manager",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    linkedIn: "https://linkedin.com/in/roshani-adhikari"
  },
  {
    id: 9,
    name: "Mr. Bikash Tamang",
    role: "International Relations",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    linkedIn: "https://linkedin.com/in/bikash-tamang"
  }
];

export default function MemberBoards() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Meet Our Board Members
        </h2>

        {/* Members Grid */}
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
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  fill
                  className="object-cover transition-all duration-200"
                />

                {/* Gradient Overlay on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-200 ${
                    hoveredMember === member.id ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Member Info Overlay */}
                <div
                  className={`absolute bottom-0 left-0 right-0 p-4 text-white transform transition-all duration-200 ${
                    hoveredMember === member.id ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                  }`}
                >
                  <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                  <p className="text-white/90 text-sm mb-3">{member.role}</p>

                  <a
                    href={member.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center text-white p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors duration-150"
                    onClick={(e) => e.stopPropagation()}
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
