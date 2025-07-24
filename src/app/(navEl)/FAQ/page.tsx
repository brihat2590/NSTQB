'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, BookOpen, Users } from "lucide-react";

const faqData = [
  {
    category: "General Information",
    icon: <HelpCircle className="h-5 w-5" aria-hidden="true" />,
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
    questions: [
      {
        question: "What is Nepal Software Testing Qualifications Body (NSTQB)?",
        answer:
          "NSTQB is the national body responsible for software testing certifications and qualifications in Nepal. We provide internationally recognized certifications to enhance the skills of software testing professionals.",
      },
      {
        question: "Does NSTQB offer any certifications other than CTFL??",
        answer:
          "Yes, NSTQB offers additional certifications on demand, based on candidate interest and industry relevance.",
      },
      {
        question: "Are NSTQB certifications recognized internationally?",
        answer:
          "Yes, our certifications are aligned with international standards and are recognized by major software companies and organizations worldwide.",
      },
    ],
  },
  {
    category: "Exam Preparation",
    icon: <BookOpen className="h-5 w-5" aria-hidden="true" />,
    bgColor: "bg-green-100",
    iconColor: "text-green-600",
    questions: [
      {
        question: "What study materials are available?",
        answer:
          "NSTQB provides official study materials to help you prepare for the ISTQB exam. You can read the official documentation, explore the detailed syllabus under the CTFL section, and access downloadable resources such as the syllabus PDF, sample questions, and glossary of testing terms.",
      },
      {
        question: "How should I prepare for the exam?",
        answer:
          "We recommend studying the official syllabus, taking practice tests, attending training courses, and gaining practical experience in software testing projects. You can get resources and syllabus from our CTFL section",
      },
      {
        question: "Are there any prerequisites for taking the exam?",
        answer:
          "Foundation level has no prerequisites. Advanced level requires Foundation certification and 18 months of testing experience. Expert level requires Advanced certification and 5 years of experience.",
      },
    ],
  },
  {
    category: "Support & Services",
    icon: <Users className="h-5 w-5" aria-hidden="true" />,
    bgColor: "bg-red-100",
    iconColor: "text-red-600",
    questions: [
      {
        question: "How can I contact NSTQB for support?",
        answer:
          "You can reach us through our contact form, email us at support@nstqb.org, or call our helpline during business hours",
      },
      {
        question: "What if I fail the exam?",
        answer:
          "If you don't pass the exam, you can retake it after a waiting period of 30 days. You'll need to pay the exam fee again.",
      },
      {
        question: "Can I get a refund if I cancel my exam?",
        answer:
          "Exam fees can be refunded if you cancel at least 48 hours before the scheduled exam time. A processing fee of 10% will be deducted from the refund amount.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen py-16 px-4 bg-gray-50 transistion-all duration-300 animate-fade-in-up animate-delay-200 ">
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
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xl bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent max-w-2xl mx-auto leading-relaxed font-semibold">
            Nepal Software Testing Qualifications Body
          </p>
          <p className="text-gray-500 mt-2">
            Find answers to common questions about our certifications and services
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="space-y-8">
          {faqData.map((category, categoryIndex) => (
            <Card
              key={categoryIndex}
              className="border-0 shadow-sm bg-white hover:shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-4 text-xl text-gray-900">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full bg-white ${category.iconColor} ring-2 ring-current`}
                    aria-hidden="true"
                  >
                    {category.icon}
                  </div>
                  <span className="font-semibold">{category.category}</span>
                </CardTitle>
                <CardDescription className="text-gray-500 ml-14">
                  Common questions about {category.category.toLowerCase()}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`item-${categoryIndex}-${faqIndex}`}
                      className="border-gray-100 last:border-b-0"
                    >
                      <AccordionTrigger className="text-left hover:text-red-600 transition-colors duration-200 py-4 text-gray-900 font-medium hover:no-underline">
                        <span className="pr-4">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed pb-4 pt-0">
                        <div className="bg-white rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
                          {faq.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
