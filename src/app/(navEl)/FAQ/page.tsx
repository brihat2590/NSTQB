'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle, BookOpen, Award, Users } from "lucide-react"

const faqData = [
  {
    category: "General Information",
    icon: <HelpCircle className="h-5 w-5" />,
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
    icon: <BookOpen className="h-5 w-5" />,
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
    icon: <Users className="h-5 w-5" />,
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
]

export default function FAQ() {
  return (
    <div className="min-h-screen  py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-blue-500 rounded-2xl mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
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
        <div className="space-y-6">
          {faqData.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="border-0 shadow-sm bg-white hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-4 text-xl text-gray-900">
                  <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-500 to-blue-500 rounded-xl text-white shadow-sm">
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
  )
}