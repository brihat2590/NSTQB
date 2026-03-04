"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQData = [
  {
    question: "What is NSTQB and how is it related to ISTQB?",
    answer: "NSTQB is the Nepal Software Testing Qualifications Board, the official member board of ISTQB in Nepal. We localise ISTQB certifications, exams, and community initiatives for Nepali professionals to ensure global standards are met locally."
  },
  {
    question: "How do I register for an ISTQB exam in Nepal?",
    answer: "Registration can be completed through our official portal. You will need to select your desired certification level, provide identification, and complete the payment process."
  },
  {
    question: "Can I take exams remotely from anywhere in Nepal?",
    answer: "Yes, we offer remote proctored exams that allow you to take your certification from the comfort of your home or office, provided you meet the technical requirements."
  },
  {
    question: "How long is my ISTQB certificate valid?",
    answer: "Most ISTQB certificates, including Foundation Level and Advanced Level, are valid for life and do not expire."
  },
  {
    question: "Who can I contact for special accommodation?",
    answer: "If you require special arrangements due to a disability or other needs, please contact our support team at least two weeks before your scheduled exam date."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index:any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='bg-grid-pattern pb-20 pt-5' >

   
    <section className="max-w-5xl mx-auto px-6 py-16 font-sans text-[#1a1a1a]">
      {/* Header Section */}
      <div className="mb-12">
        <nav className="text-sm text-gray-500 mb-8">
          Support / FAQ / General
        </nav>
        <h1 className="text-5xl font-bold mb-6 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
          Everything you need to know about NSTQB Nepal, ISTQB certifications, and 
          how we empower Nepali software testers.
        </p>
      </div>

      <hr className="border-gray-200 mb-12" />

      {/* Accordion Section */}
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-2xl font-bold">General Questions</h2>
        {/* <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2.5 py-1 rounded-full">
          {FAQData.length}
        </span> */}
      </div>

      <div className="space-y-4">
        {FAQData.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`border-2 rounded-xl transition-all duration-200 overflow-hidden ${
                isOpen ? 'border-black shadow-sm' : 'border-gray-100 hover:border-gray-200'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-semibold transition-colors ${
                  isOpen ? 'text-black-600' : 'text-gray-800'
                }`}>
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="text-gray-400 w-5 h-5" />
                ) : (
                  <ChevronDown className="text-gray-400 w-5 h-5" />
                )}
              </button>
              
              <div 
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-gray-50 pt-4">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>  
    </div>
  );
}