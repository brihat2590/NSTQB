import { Target, Eye, Heart } from "lucide-react";

/* ----------------------------- Data ----------------------------- */

const CORE_VALUES = [
  {
    eyebrow: "Mission",
    title: "Our Mission",
    description:
      "Empowering professionals with globally recognized certifications and ethical standards to advance software testing excellence in Nepal.",
    icon: Target,
    image:
      "https://res.cloudinary.com/dlrpmew9d/image/upload/v1768305720/img1_vbv6hd.jpg",
  },
  {
    eyebrow: "Vision",
    title: "Our Vision",
    description:
      "Advancing the software testing profession through a globally accepted Body of Knowledge, research, and international collaboration.",
    icon: Eye,
    image:
      "https://res.cloudinary.com/dlrpmew9d/image/upload/v1768305717/img3_bnzx7u.jpg",
  },
  {
    eyebrow: "Values",
    title: "Our Values",
    description:
      "Driven by integrity, inclusivity, and innovation, we collaborate across borders to uphold quality and excellence in testing.",
    icon: Heart,
    image:
      "https://res.cloudinary.com/dlrpmew9d/image/upload/v1768305715/img2_iry5bv.jpg",
  },
];

/* -------------------------- Components --------------------------- */

const SectionLabel = () => (
  <div className="flex items-center gap-3 mb-4">
    <div className="h-px w-8 bg-red-500" />
    <span className="text-xs font-semibold uppercase tracking-widest text-red-500">
      About NSTQB
    </span>
  </div>
);

const StatCard = ({
  value,
  label,
  accent,
}: {
  value: string;
  label: string;
  accent: "blue" | "red";
}) => (
  <div className="relative bg-white border border-gray-100 rounded-2xl p-5 overflow-hidden">
    {/* Subtle corner dot */}
    <div
      className={`absolute top-4 right-4 w-1.5 h-1.5 rounded-full opacity-40 ${accent === "red" ? "bg-red-400" : "bg-blue-400"
        }`}
    />

    <div className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
      {label}
    </div>

    <div className="text-2xl font-semibold text-gray-800">{value}</div>

    {/* Bottom accent line */}
    <div
      className={`absolute bottom-0 left-0 h-[2px] w-10 rounded-r-full ${accent === "red" ? "bg-red-300" : "bg-blue-300"
        }`}
    />
  </div>
);

const InfoCard = ({
  eyebrow,
  title,
  description,
  image,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  icon: React.ElementType;
}) => (
  <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-gray-200 hover:shadow-sm transition-all duration-300">
    <div className="relative h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    </div>
    <div className="p-5">
      <div className="text-xs font-semibold uppercase tracking-widest text-red-500 mb-1">
        {eyebrow}
      </div>
      <h3 className="text-base font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 leading-relaxed">{description}</p>
    </div>
  </div>
);

/* --------------------------- Section ----------------------------- */

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Intro Grid */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-20">

          {/* Left */}
          <div className="max-w-xl">
            <SectionLabel />

            <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-6">
              Empowering Nepal's IT future
            </h2>

            <p className="text-gray-500 leading-relaxed mb-4">
              NSTQB is Nepal's only official ISTQB® member board that provides
              software testing certifications based on international standards.
              We enable Nepali IT professionals to compete in the global market.
            </p>

            <p className="text-gray-500 leading-relaxed mb-8">
              We are committed to advancing software testing in Nepal by
              providing world-class training, certification, and career
              development opportunities aligned with global best practices.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <StatCard value="2019" label="Established" accent="blue" />
              <StatCard value="ISTQB®" label="Official Member" accent="red" />
            </div>
          </div>

          {/* Right — image with floating info cards */}
          <div className="relative h-[480px]">
            {/* Main image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1746597061227-eb3767a3822a?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8TmVwYWwlMjBmbGFnJTIwbW91bnRhaW58ZW58MHx8MHx8fDA%3D"
                alt="Team collaborating"
                className="w-full h-full object-cover"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" /> */}
            </div>

            {/* Floating badge — bottom left */}
            {/* <div className="absolute bottom-5 left-5 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100">
              <div className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">
                Location
              </div>
              <div className="text-sm font-semibold text-gray-800">
                Nepal · Kathmandu
              </div>
            </div> */}

            {/* Floating badge — top right */}
            <div className="absolute top-5 right-5 bg-white rounded-xl px-4 py-3 shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              </div>

            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-100 mb-12" />

        {/* Cards label */}
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
          Mission · Vision · Values
        </p>

        {/* Mission / Vision / Values */}
        <div className="grid md:grid-cols-3 gap-6">
          {CORE_VALUES.map((item) => (
            <InfoCard key={item.title} {...item} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutSection;