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

    
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-12 px-4">
            <div className="max-w-5xl mx-auto">
              {/* Header Section */}
              <div className="text-center mb-12  text-gray-800 py-12 px-6 rounded-2xl shadow-lg">
                <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
                <p className="text-xl max-w-2xl mx-auto opacity-95">Nepal Software Testing Qualifications Body</p>
                <p className="mt-2 opacity-90">Find answers to common questions about our certifications and services</p>
              </div>

              {/* FAQ Sections */}
              <div className="space-y-8">
                {faqData.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="shadow-lg">
                    <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
                      <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
                        <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-full text-white">
                          {category.icon}
                        </div>
                        {category.category}
                      </CardTitle>
                      <CardDescription>Common questions about {category.category.toLowerCase()}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <Accordion type="single" collapsible className="w-full">
                        {category.questions.map((faq, faqIndex) => (
                          <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                            <AccordionTrigger className="text-left hover:text-red-600">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-gray-600 leading-relaxed">{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Contact Section
              <Card className="mt-12 shadow-lg bg-gradient-to-r from-red-600 to-blue-600 text-white">
                <CardContent className="pt-6 text-center">
                  <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
                  <p className="mb-6 opacity-90">
                    Can't find the answer you're looking for? Our support team is here to help.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="mailto:support@nstqb.org.np"
                      className="bg-white text-red-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                    >
                      Email Support
                    </a>
                    <a
                      href="/contact"
                      className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-red-600 transition-colors"
                    >
                      Contact Us
                    </a>
                  </div>
                </CardContent>
              </Card> */}
            </div>
          </div>
    
  )
}
