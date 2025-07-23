"use client"
import React from 'react';
import { Download, FileText, BookOpen, Clock, Users, Award, ChevronRight, Target, Zap, Shield, Sparkles, Infinity } from 'lucide-react';
import Link from 'next/link';


export default function page(){
  const downloadItems = [
    {
      title: 'CTFL Syllabus',
      description: 'Complete foundation level testing syllabus',
      icon: Target,
      fileType: 'PDF',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    },
    {
      title: 'Glossary of Terms',
      description: 'Standard testing terminology and definitions',
      icon: Sparkles,
      fileType: 'PDF',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100'
    },
    {
      title: 'Past Papers',
      description: 'Previous examination papers with solutions',
      icon: Zap,
      fileType: 'PDF',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100'
    }
  ];

  const examDetails = [
    {
      label: 'Duration',
      value: '75 minutes',
      icon: Clock,
      color: 'text-red-500',
      delay: '0s'
    },
    {
      label: 'Questions',
      value: '40 multiple choice',
      icon: FileText,
      color: 'text-blue-500',
      delay: '0.2s'
    },
    {
      label: 'Pass Score',
      value: '65% (26/40)',
      icon: Shield,
      color: 'text-red-500',
      delay: '0.4s'
    },
    {
      label: 'Prerequisites',
      value: 'None required',
      icon: Users,
      color: 'text-blue-500',
      delay: '0.6s'
    },
    {
      label: 'Validity',
      value: 'Lifetime',
      icon: '∞',
      color: 'text-purple-600',
      delay: '0.8s'
    }
  ];

  return (
    <div className="min-h-screen bg-white transition-all duration-300">
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
      {/* Header */}
      {/* Removed header section */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12 transition-all duration-300">
        {/* Hero Section */}
        <div className="text-center mb-16 transition-all duration-300">
          <h1 className="text-5xl font-semibold text-gray-900 mb-4 animate-fade-in-up transition-all duration-300">
            CTFL Certification
          </h1>
          <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 mb-2 animate-fade-in-up animation-delay-200 transition-all duration-300">
            Certified Tester Foundation Level
          </p>
          <p className="text-gray-500 max-w-2xl mx-auto animate-fade-in-up animation-delay-400 transition-all duration-300">
            The CTFL certification is the entry-level qualification in software testing, providing 
            fundamental knowledge and skills required for effective software testing practices.
          </p>
        </div>

        {/* About CTFL */}
        <section className="mb-16 animate-fade-in-up transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 transition-colors duration-300">About CTFL Exam</h2>
          <div className="grid md:grid-cols-2 gap-8 transition-all duration-300">
            <div className="space-y-6 transition-all duration-300">
              <p className="text-gray-700 leading-relaxed transition-colors duration-300">
                The Certified Tester Foundation Level (CTFL) is an internationally recognized 
                certification that validates your understanding of software testing fundamentals. 
                This certification covers essential testing concepts, techniques, and practices 
                used in the software development lifecycle.
              </p>
              <p className="text-gray-700 leading-relaxed transition-colors duration-300">
                Whether you're starting your career in testing or looking to formalize your 
                existing knowledge, CTFL provides the solid foundation needed to excel in 
                software quality assurance.
              </p>
            </div>
            <div className="bg-gray-50 p-6 transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 transition-colors duration-300">Key Topics Covered</h3>
              <ul className="space-y-2 text-gray-700 transition-colors duration-300">
                <li className="flex items-start group transition-transform duration-300">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  Fundamentals of Testing
                </li>
                <li className="flex items-start group transition-transform duration-300">
                  <ChevronRight className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  Testing Throughout the SDLC
                </li>
                <li className="flex items-start group transition-transform duration-300">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  Static Testing
                </li>
                <li className="flex items-start group transition-transform duration-300">
                  <ChevronRight className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  Test Techniques
                </li>
                <li className="flex items-start group transition-transform duration-300">
                  <ChevronRight className="w-4 h-4 text-blue-500 mt-1 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  Test Management
                </li>
                <li className="flex items-start group transition-transform duration-300">
                  <ChevronRight className="w-4 h-4 text-red-500 mt-1 mr-2 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-300" />
                  Tool Support for Testing
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Exam Details */}
        <section className="mb-16 transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 transition-colors duration-300">Exam Details</h2>
          <div className="flex flex-wrap justify-center gap-8 bg-gradient-to-r from-blue-50 via-white to-red-50 p-8 border border-gray-100 transition-all duration-300">
            {examDetails.map((detail, index) => {
              const IconComponent = detail.icon;
              const isInfinity = detail.icon === '∞';
              return (
                <div 
                  key={index} 
                  className="flex items-center space-x-3 group animate-float transition-all duration-500"
                  style={{ animationDelay: detail.delay }}
                >
                  {isInfinity ? (
                    <div className="relative w-8 h-8 flex items-center justify-center transition-all duration-300">
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 animate-pulse-glow transition-all duration-300">
                        ∞
                      </span>
                    </div>
                  ) : (
                    <div className="relative transition-all duration-300">
                      <IconComponent className={`w-7 h-7 ${detail.color} group-hover:scale-125 transition-transform duration-500 drop-shadow-sm`} />
                      <div className={`absolute inset-0 ${detail.color} opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-500`}></div>
                    </div>
                  )}
                  <div className="text-center transition-all duration-300">
                    <h3 className="font-semibold text-gray-900 text-sm group-hover:text-gray-700 transition-colors duration-300">{detail.label}</h3>
                    <p className={`text-gray-600 text-sm transition-all duration-300 ${isInfinity ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500' : 'group-hover:font-medium'}`}>
                      {detail.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Download Section */}
        <section className="mb-16 transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center transition-colors duration-300">Download Resources</h2>
          <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto transition-all duration-300">
            {downloadItems.map((item, index) => {
              const IconComponent = item.icon;
              let href = '';
  if (item.title === 'CTFL Syllabus') href = '/istqbSyllabus.pdf';
  else if (item.title === 'Glossary of Terms') href = '/istqbGlossary.pdf';
  else if (item.title === 'Past Papers') href = '/istqbSampleQ.pdf';
              return (
                <div 
                  key={index} 
                  className={`relative bg-white border-2 border-gray-200 p-8 ${item.hoverColor} hover:border-gradient-to-r hover:from-blue-300 hover:to-red-300 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 cursor-pointer group flex-shrink-0 w-80 overflow-hidden`}
                >
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-red-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-1 h-1 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping animation-delay-200 transition-opacity duration-300"></div>
                  
                  <div className="relative z-10 transition-all duration-300">
                    <div className="flex items-center justify-between mb-6 transition-all duration-300">
                      <div className={`w-16 h-16 ${item.bgColor} flex items-center justify-center relative group-hover:scale-125 transition-transform duration-500`}>
                        <IconComponent className={`w-8 h-8 ${item.color} group-hover:rotate-12 transition-transform duration-500`} />
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.color === 'text-blue-500' ? 'from-blue-500' : item.color === 'text-red-500' ? 'from-red-500' : 'from-blue-500'} to-transparent opacity-0 group-hover:opacity-20 blur transition-opacity duration-500`}></div>
                      </div>
                      <div className="flex flex-col items-end transition-all duration-300">
                        <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs px-3 py-1 font-bold tracking-wider group-hover:from-blue-100 group-hover:to-red-100 transition-all duration-300">
                          {item.fileType}
                        </span>
                        <div className="text-xs text-gray-400 mt-1 group-hover:text-gray-600 transition-colors duration-300">
                          Free Download
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-red-600 transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {item.description}
                    </p>
                    
                    <button className="flex items-center justify-center w-full py-3 px-6 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 border border-gray-200 hover:border-gray-300">
                    <a
        href={href}
        download
        className="flex items-center justify-center w-full py-3 px-6 bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 border border-gray-200 hover:border-gray-300"
      >
        <Download className="w-4 h-4 mr-2 group-hover:animate-bounce transition-transform duration-300" />
        <span className="text-sm transition-all duration-300">Download</span>
      </a>
                      
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Registration CTA */}
        <section className="text-center bg-gradient-to-br from-blue-50 to-red-50 p-12 animate-fade-in-up transition-all duration-300">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 transition-colors duration-300">Ready to Get Certified?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto transition-colors duration-300">
            Join thousands of professionals who have advanced their careers with CTFL certification. 
            Register for the next available exam session.
          </p>
          <div className="space-x-4 transition-all duration-300">
            <Link href={'/registration'} className="bg-gradient-to-r from-red-700 to-blue-700 text-transparent bg-clip-text hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-xl border  px-8 py-3 border-blue-400 hover:bg-gray-50 hover:border-blue-500">
              Register for Exam
            </Link>
            <Link href={'/mock-test'} className="border border-red-300 text-gray-700 px-8 py-3 font-semibold hover:bg-gray-50 hover:scale-105 hover:border-red-400 transition-all duration-300">
              Give Mock Exam
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};
