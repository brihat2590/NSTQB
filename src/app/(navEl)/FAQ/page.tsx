'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageCircle } from "lucide-react";

const faqData = [
  {
    question: "What is Nepal Software Testing Qualifications Body (NSTQB)?",
    answer:
      "NSTQB is the national body responsible for software testing certifications and qualifications in Nepal. We provide internationally recognized certifications to enhance the skills of software testing professionals.",
  },
  {
    question: "Does NSTQB offer any certifications other than CTFL?",
    answer:
      "Yes, NSTQB offers additional certifications on demand, based on candidate interest and industry relevance.",
  },
  {
    question: "Are NSTQB certifications recognized internationally?",
    answer:
      "Yes, our certifications are aligned with international standards and are recognized by major software companies and organizations worldwide.",
  },
  {
    question: "What study materials are available?",
    answer:
      "NSTQB provides official study materials to help you prepare for the ISTQB exam. You can read the official documentation, explore the detailed syllabus under the CTFL section, and access downloadable resources such as the syllabus PDF, sample questions, and glossary of testing terms.",
  },
  {
    question: "How should I prepare for the exam?",
    answer:
      "We recommend studying the official syllabus, taking practice tests, attending training courses, and gaining practical experience in software testing projects. You can get resources and syllabus from our CTFL section.",
  },
  {
    question: "Are there any prerequisites for taking the exam?",
    answer:
      "Foundation level has no prerequisites. Advanced level requires Foundation certification and 18 months of testing experience. Expert level requires Advanced certification and 5 years of experience.",
  },
  {
    question: "How can I contact NSTQB for support?",
    answer:
      "You can reach us through our contact form, email us at info@nstqb.org, or call our helpline during business hours.",
  },
  {
    question: "What if I fail the exam?",
    answer:
      "If you don't pass the exam, you can retake it after a waiting period of 30 days. You'll need to pay the exam fee again.",
  },
  {
    question: "Can I get a refund if I cancel my exam?",
    answer:
      "Sorry, we don't offer refunds for exams. However, you can retake the exam after a waiting period of 30 days.",
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up        { animation: fadeUp 0.6s ease-out both; }
        .fade-up-1      { animation-delay: 0.05s; }
        .fade-up-2      { animation-delay: 0.2s;  }
        .fade-up-3      { animation-delay: 0.35s; }

        @keyframes imageFade {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1);    }
        }
        .image-fade { animation: imageFade 0.9s ease-out both; }
      `}</style>

      {/* ── Hero Image — full width, no side padding ── */}
      <div className="w-full image-fade">
        <div className="relative w-full h-56 md:h-72 overflow-hidden">
          <img
            src="https://images.pexels.com/photos/933054/pexels-photo-933054.jpeg"
            alt="NSTQB FAQ hero"
            className="w-full h-full object-cover object-center"
          />
          {/* subtle dark gradient so header text sits cleanly below */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
        </div>
      </div>

      {/* ── Page Content ── */}
      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* ── Header ── */}
        <div className="mb-14 fade-up fade-up-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-gray-300" />
            <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
              Help Center
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold  text-gray-900 text-center tracking-tight leading-none mb-5">
            Frequently Asked Questions
          </h1>

          

          {/* Stats row */}
          {/* <div className="mt-10 flex items-center gap-10 pt-8 border-t border-gray-100">
            {[
              { value: "9",   label: "Questions"      },
              { value: "3",   label: "Topics"         },
              { value: "24h", label: "Avg. Response"  },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </div> */}
        </div>

        {/* ── Accordion — full content width ── */}
        <div className="fade-up fade-up-2">
          <Accordion type="single" collapsible className="w-full divide-y divide-gray-100">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-none py-1"
              >
                <AccordionTrigger className="py-5 text-left text-base font-medium text-gray-800 hover:text-gray-900 hover:no-underline transition-colors duration-150 [&>svg]:text-gray-300 [&>svg]:transition-colors [&>svg]:hover:text-gray-500">
                  <span className="flex items-baseline gap-4 pr-6">
                    <span className="text-xs font-mono text-gray-300 select-none tabular-nums w-5 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pt-0 pl-9">
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* ── Contact CTA ── */}
        <div className="mt-16 fade-up fade-up-3">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex items-center justify-center w-9 md:w-15 h-9 md:h-15 rounded-full bg-white border border-gray-100 shadow-sm text-gray-500 shrink-0">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Still have questions?</p>
                <p className="text-sm text-gray-400 mt-0.5">Our team is happy to help you.</p>
              </div>
            </div>
            <a
              href="mailto:info@nstqb.org"
              className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-700 transition-colors duration-200"
            >
              Contact Support
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}