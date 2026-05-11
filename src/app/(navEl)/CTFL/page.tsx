import React from 'react';
import { Download, FileText, Clock, Users, Shield, Target, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function CTFlPage() {
  const downloadItems = [
    {
      title: 'CTFL Syllabus',
      description: 'Complete foundation level testing syllabus',
      icon: Target,
      fileType: 'PDF',
      href: '/istqbSyllabus.pdf',
    },
    {
      title: 'Glossary of Terms',
      description: 'Standard testing terminology and definitions',
      icon: Sparkles,
      fileType: 'PDF',
      href: '/istqbGlossary.pdf',
    },
    {
      title: 'Past Papers',
      description: 'Previous examination papers with solutions',
      icon: Zap,
      fileType: 'PDF',
      href: '/istqbSampleQ.pdf',
    },
  ];

  const examDetails = [
    { label: 'Duration', value: '60 minutes', icon: Clock },
    { label: 'Questions', value: '40 MCQ', icon: FileText },
    { label: 'Pass Score', value: '65% (26/40)', icon: Shield },
    { label: 'Prerequisites', value: 'None', icon: Users },
    { label: 'Validity', value: 'Lifetime', icon: null },
  ];

  const topics = [
    'Fundamentals of Testing',
    'Testing Throughout the SDLC',
    'Static Testing',
    'Test Techniques',
    'Test Management',
    'Tool Support for Testing',
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#141414]">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-8 lg:py-16">
        <section className="mb-20 text-center">
          <h1 className="mx-auto mb-5 max-w-4xl text-5xl font-medium leading-none tracking-tight sm:text-6xl lg:text-7xl">
            CTFL <em className="font-medium italic text-[#8B1A1A]">Certification</em>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-[#5A5A5A] sm:text-lg">
            The internationally recognised entry-level qualification in software testing -
            building the fundamental skills for effective QA practice.
          </p>
        </section>

        <section className="mb-20 grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8B1A1A]">
              About the Exam
            </p>
            <h2 className="mb-7 text-3xl font-normal tracking-tight text-[#141414] sm:text-[2rem]">
              What is CTFL?
            </h2>
            <div className="space-y-4 text-[15px] leading-8 text-[#5A5A5A]">
              <p>
                The Certified Tester Foundation Level (CTFL) validates your understanding of
                software testing fundamentals. It covers essential concepts, techniques, and
                practices used throughout the software development lifecycle.
              </p>
              <p>
                Whether starting your career in testing or formalising existing knowledge, CTFL
                gives you the solid foundation needed to excel in software quality assurance.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#EBEBEB] bg-white p-7 shadow-sm">
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.12em] text-[#9A9A9A]">
              Key Topics Covered
            </h3>
            <div className="divide-y divide-[#EBEBEB]">
              {topics.map((topic) => (
                <div key={topic} className="flex items-center gap-3 py-3 text-sm font-medium text-[#141414]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8B1A1A]" />
                  {topic}
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="mb-16 h-px bg-[#EBEBEB]" />

        <section className="mb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8B1A1A]">
            Exam Details
          </p>
          <h2 className="mb-7 text-3xl font-normal tracking-tight text-[#141414] sm:text-[2rem]">
            What to expect
          </h2>
          <div className="overflow-hidden rounded-xl border border-[#EBEBEB] bg-white shadow-sm">
            <div className="flex flex-wrap">
              {examDetails.map((detail, index) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={detail.label}
                    className={`min-w-[160px] flex-1 p-7 ${index === examDetails.length - 1 ? '' : 'border-b border-[#EBEBEB] lg:border-b-0 lg:border-r'}`}
                  >
                    <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5EDED] text-[#8B1A1A]">
                      {Icon ? <Icon size={18} /> : <span className="text-lg font-bold leading-none">∞</span>}
                    </div>
                    <div className="mb-1 text-lg font-semibold text-[#141414]">{detail.value}</div>
                    <div className="text-xs font-medium text-[#9A9A9A]">{detail.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="mb-16 h-px bg-[#EBEBEB]" />

        <section className="mb-20">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8B1A1A]">
            Resources
          </p>
          <h2 className="mb-7 text-3xl font-normal tracking-tight text-[#141414] sm:text-[2rem]">
            Download Study Materials
          </h2>
          <div className="grid gap-5 md:grid-cols-3">
            {downloadItems.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="group rounded-xl border border-[#EBEBEB] bg-white p-7 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#d9b8b8] hover:shadow-[0_8px_32px_rgba(139,26,26,0.07)]"
                >
                  <div className="mb-5 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F5EDED] text-[#8B1A1A]">
                      <Icon size={22} />
                    </div>
                    <span className="rounded border border-[#EBEBEB] bg-[#FAFAFA] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#9A9A9A]">
                      {item.fileType}
                    </span>
                  </div>
                  <h3 className="mb-2 text-base font-semibold text-[#141414]">{item.title}</h3>
                  <p className="mb-6 text-sm leading-6 text-[#5A5A5A]">{item.description}</p>
                  <a
                    href={item.href}
                    download
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#d9b8b8] bg-[#F5EDED] px-4 py-2.5 text-sm font-semibold text-[#8B1A1A] transition-colors duration-150 hover:bg-[#8B1A1A] hover:text-white"
                  >
                    <Download size={14} />
                    Download Free
                  </a>
                </article>
              );
            })}
          </div>
        </section>

        <section className="relative overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white px-6 py-12 text-center shadow-sm sm:px-10 lg:px-12">
          <div className="absolute inset-x-0 top-0 h-1 bg-[#8B1A1A]" />
          <h2 className="mb-3 text-3xl font-normal tracking-tight text-[#141414] sm:text-[2rem]">
            Ready to Get Certified?
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-[15px] leading-7 text-[#5A5A5A]">
            Join thousands of professionals who have advanced their careers with CTFL certification.
            Register for the next available exam session.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/registration"
              className="inline-flex items-center justify-center rounded-lg border border-[#8B1A1A] bg-[#8B1A1A] px-7 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-[#6B1414]"
            >
              Register for Exam
            </Link>
            <Link
              href="/mock-test"
              className="inline-flex items-center justify-center rounded-lg border border-[#EBEBEB] bg-white px-7 py-3 text-sm font-semibold text-[#141414] transition-colors duration-150 hover:border-[#8B1A1A] hover:text-[#8B1A1A]"
            >
              Give Mock Exam
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}