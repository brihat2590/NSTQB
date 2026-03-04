'use client';

import { MessageCircle, ExternalLink } from "lucide-react";

const sections = [
  {
    id: "01",
    title: "Examination Room for e-Exam",
    items: [
      { type: "allow", text: "The examinee's position should be clearly visible to the proctor. The proctor will monitor the examinees at all times." },
      { type: "allow", text: "During the exam, the candidate should have a full set up of devices — camera, power back up and internet bandwidth." },
      { type: "allow", text: "Candidate should not have anything on their table except, if required, a dictionary, a calculator and an extra mobile." },
      { type: "deny",  text: "The examinee appearing e-exam cannot print the exam or access the internet." },
    ],
  },
  {
    id: "02",
    title: "Examinees' Identification",
    items: [
      { type: "allow", text: "The proctor will identify each examinee by the pre-notified identification card used in the respective country where the examination takes place." },
      { type: "allow", text: "The identification must contain the photo of the examinee." },
    ],
  },
  {
    id: "03",
    title: "Before the Exam",
    items: [
      { type: "allow", text: "Each examinee shall be informed by the proctor before the exam about the examination rules." },
      { type: "allow", text: "Each examinee should fill out the personal details and sign a statement saying they will keep the integrity of the examination." },
      { type: "allow", text: "The proctor shall explain the integrity rules including the penalty for being caught cheating." },
      { type: "allow", text: "All forms and documents submitted by the candidate should be valid." },
      { type: "deny",  text: "Examination papers are strictly prohibited from broadcasting, recording, or posting on any website, mails, or otherwise disseminated via any means known or which may become known in the future." },
    ],
  },
  {
    id: "04",
    title: "Integrity Rules",
    description: "Breach of the following rules may cause disqualification and penalties as defined by the Examination Board.",
    columns: [
      {
        heading: "Prohibited Actions",
        items: [
          "Copying from another examinee",
          "Communication with other examinees during the exam",
          "Using unauthorized material and all electronic devices",
          "Using the Internet to get answers",
          "Using portable media",
          "Making screenshots or photocopies of examination questions",
        ],
      },
      {
        heading: "Penalties for Cheating",
        items: [
          "The exam of this person will be disqualified",
          "No refund will be provided",
          "The person will be disqualified from taking the exam in the territory of the Member Board for at least 6 months",
        ],
      },
    ],
  },
  {
    id: "05",
    title: "Disclaimer",
    prose: [
      <>
        You agree to allow NSTQB to include your name in the Successful Candidate Registry (SCR) database and directory
        of certified persons unless you have indicated otherwise. Please visit{" "}
        <a
          href="http://scr.istqb.org/"
          className="underline underline-offset-2 text-gray-700 hover:text-gray-900 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          scr.istqb.org
        </a>{" "}
        for relevant details.
      </>,
      "All candidates are deemed to have read and to agree to abide by these and other examination regulations as determined by NSTQB from time to time. Any infringement of these regulations may have serious consequences and may be referred to a Board of Enquiry.",
    ],
  },
  {
    id: "06",
    title: "Cancellation / Re-scheduling Policy",
    policy: {
      cancellation:
        "Due to current circumstances, we are unable to offer any cancellations. However, candidates have the option to reschedule the exam.",
      rescheduling: (
        <>
          If you wish to reschedule your exam, you must contact NSTQB at{" "}
          <a
            href="mailto:info@nstqb.org"
            className="underline underline-offset-2 text-gray-700 hover:text-gray-900 transition-colors"
          >
            info@nstqb.org
          </a>{" "}
          with a written request at least <span className="font-medium text-gray-900">14 days prior</span> to your
          scheduled exam date. Failure to reschedule within the required timeframe may result in forfeiting exam fees.
        </>
      ),
    },
  },
];

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-white">
      <style jsx>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up   { animation: fadeUp 0.6s ease-out both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.15s; }
        .fade-up-3 { animation-delay: 0.25s; }

        @keyframes imageFade {
          from { opacity: 0; transform: scale(1.03); }
          to   { opacity: 1; transform: scale(1); }
        }
        .image-fade { animation: imageFade 0.9s ease-out both; }
      `}</style>

      {/* ── Hero Image ── */}
      <div className="w-full image-fade">
        <div className="relative w-full h-56 md:h-72 overflow-hidden">
          <img
            src="https://plus.unsplash.com/premium_photo-1661594739160-b26f505a09b4?q=80&w=2232&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Code of Conduct hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* ── Header ── */}
        <div className="mb-14 fade-up fade-up-1">
          <div className="flex items-center gap-3 mb-5">
            <span className="h-px w-8 bg-gray-300" />
            <span className="text-xs font-medium tracking-widest text-gray-400 uppercase">
              e-Exam
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-semibold text-center text-gray-900 tracking-tight leading-none mb-5">
            Code of Conduct
          </h1>

          
        </div>

        {/* ── Sections ── */}
        <div className="space-y-14 fade-up fade-up-2">
          {sections.map((section) => (
            <div key={section.id}>

              {/* Section heading row */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-mono text-gray-300 select-none w-6 shrink-0">
                  {section.id}
                </span>
                <h2 className="text-sm font-semibold text-gray-900 tracking-wide uppercase">
                  {section.title}
                </h2>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              <div className="ml-10 space-y-5">

                {/* Description note */}
                {section.description && (
                  <p className="text-sm text-gray-400 italic">{section.description}</p>
                )}

                {/* Allow / Deny list */}
                {section.items && (
                  <div className="divide-y divide-gray-100">
                    {section.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 py-3.5">
                        {/* dot indicator */}
                        <span
                          className={`mt-1.5 h-1.5 w-1.5 rounded-full shrink-0 ${
                            item.type === "deny" ? "bg-gray-400" : "bg-gray-300"
                          }`}
                        />
                        <p
                          className={`text-sm leading-relaxed ${
                            item.type === "deny"
                              ? "text-gray-500 line-through decoration-gray-300"
                              : "text-gray-600"
                          }`}
                        >
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Two-column grid (Integrity Rules) */}
                {section.columns && (
                  <div className="grid md:grid-cols-2 gap-8">
                    {section.columns.map((col) => (
                      <div key={col.heading}>
                        <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
                          {col.heading}
                        </p>
                        <div className="divide-y divide-gray-100">
                          {col.items.map((item, i) => (
                            <div key={i} className="flex items-start gap-3 py-3">
                              <span className="mt-2 h-1 w-1 rounded-full bg-gray-300 shrink-0" />
                              <p className="text-sm text-gray-600 leading-relaxed">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Prose (Disclaimer) */}
                {section.prose && (
                  <div className="space-y-4">
                    {section.prose.map((para, i) => (
                      <p key={i} className="text-sm text-gray-500 leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                )}

                {/* Policy (Cancellation) */}
                {section.policy && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
                        Cancellation
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {section.policy.cancellation}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-widest text-gray-400 uppercase mb-4">
                        Re-scheduling
                      </p>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        {section.policy.rescheduling}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          ))}
        </div>

        {/* ── Contact CTA ── */}
        <div className="mt-16 fade-up fade-up-3">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 px-8 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="mt-0.5 flex items-center justify-center w-9 h-9 rounded-full bg-white border border-gray-100 shadow-sm text-gray-500 shrink-0">
                <MessageCircle className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Have a question about these rules?</p>
                <p className="text-sm text-gray-400 mt-0.5">Our team is happy to clarify.</p>
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