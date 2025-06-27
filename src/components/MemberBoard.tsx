"use client";

import { Linkedin } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

 const boardMembers = [
  {
    id: 1,
    name: "Ms. Sangeeta Rayamajhi",
    role: "President",
    image: "https://nstqb.org/wp-content/uploads/2020/07/Sangeeta-e1595139163767.jpg",
    linkedIn: "https://www.linkedin.com/in/sangeeta-rayamajhi/", // Add if available
  },
  {
    id: 2,
    name: "Ms. Saluja Bhandari",
    role: "Ex-President",
    image: "https://nstqb.org/wp-content/uploads/2020/07/Saluja-Bhandari-Portrait.jpg",
    linkedIn: "https://www.linkedin.com/in/salujab/", // Use actual if known
  },
  {
    id: 3,
    name: "Mr. Raunak Maskay",
    role: "Treasurer",
    image: "https://nstqb.org/wp-content/uploads/2020/06/Raunak-Maskay-e1595138923951.jpg",
    linkedIn: "https://www.linkedin.com/in/raunak-maskay/",
  },
  {
    id: 4,
    name: "Mr. Prashan Vaidya",
    role: "Accreditation Officer",
    image: "https://nstqb.org/wp-content/uploads/2020/07/Prashan-Vaidya.jpg",
    linkedIn: "https://www.linkedin.com/in/prashan-vaidya/",
  },
  {
    id: 5,
    name: "Mr. Hempal Shrestha",
    role: "Board Member",
    image: "https://nstqb.org/wp-content/uploads/2020/07/Hempal.jpg",
    linkedIn: "https://www.linkedin.com/in/hempalshrestha/",
  },
  {
    id: 6,
    name: "Mr. Chandra Paudel",
    role: "Board Member",
    image: "https://nstqb.org/wp-content/uploads/2020/07/Chandra-Paudel.jpg",
    linkedIn: "https://www.linkedin.com/in/chandrapaudel/",
  },
  {
    id: 7,
    name: "Mr. Ananta Bhadra Lamichhanne",
    role: "Board Member",
    image: "https://nstqb.org/wp-content/uploads/2020/07/Ananta-Bhadra-Lamichhanne.jpg",
    linkedIn: "https://www.linkedin.com/in/anantal/",
  },
  {
    id: 8,
    name: "Mr. Deepak Thapa",
    role: "Board Member",
    image: "/memberBoards/deepakSir.jpg",
    linkedIn: "https://www.linkedin.com/in/deepak-thapa-83059482/",
  },
  {
    id: 9,
    name: "Mr. Ramesh Adhikari",
    role: "Board Member",
    image: "https://nstqb.org/wp-content/uploads/2020/06/Ramesh-Adhikari-2-e1595138657439.jpg",
    linkedIn: "https://www.linkedin.com/in/ramesh-adhikari/",
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
