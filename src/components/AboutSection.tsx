import { Target, Eye, Heart } from "lucide-react";

/* ----------------------------- Data ----------------------------- */

const STATS = [
  {
    value: "2019",
    label: "Established",
    bg: "bg-blue-50",
    text: "text-blue-900",
  },
  {
    value: "ISTQB®",
    label: "Official Member",
    bg: "bg-red-50",
    text: "text-red-600",
  },
];

const CORE_VALUES = [
  {
    title: "Our Mission",
    description:
      "Empowering professionals with globally recognized certifications and ethical standards to advance software testing excellence in Nepal.",
    icon: Target,
    image: "https://res.cloudinary.com/dlrpmew9d/image/upload/v1768305720/img1_vbv6hd.jpg",
  },
  {
    title: "Our Vision",
    description:
      "Advancing the software testing profession through a globally accepted Body of Knowledge, research, and international collaboration.",
    icon: Eye,
    image: "https://res.cloudinary.com/dlrpmew9d/image/upload/v1768305717/img3_bnzx7u.jpg",
  },
  {
    title: "Our Values",
    description:
      "Driven by integrity, inclusivity, and innovation, we collaborate across borders to uphold quality and excellence in testing.",
    icon: Heart,
    image: "https://res.cloudinary.com/dlrpmew9d/image/upload/v1768305715/img2_iry5bv.jpg",
  },
];

/* -------------------------- Components --------------------------- */

const SectionHeader = () => (
  <div className="relative mb-20 pt-8 text-center">
    {/* Top divider */}
    <div className="absolute top-0 left-1/2 h-px w-32 -translate-x-1/2 bg-red-300/60" />

    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-4">
      About NSTQB
    </h2>
  </div>
);

type StatCardProps = {
  value: string;
  label: string;
  color?: "blue" | "red";
};

const StatCard = ({ value, label, color = "blue" }: StatCardProps) => {
  const accent =
    color === "red"
      ? "bg-red-500 group-hover:bg-red-600"
      : "bg-blue-500 group-hover:bg-blue-600";

  const valueColor =
    color === "red"
      ? "group-hover:text-red-600"
      : "group-hover:text-blue-600";

  return (
    <div
      className="
        group relative flex flex-col items-center justify-center
        bg-white px-6 py-6
        shadow-md shadow-black/30
        transition-all duration-500
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      {/* Accent line */}
      <div
        className={`
          absolute top-0 left-1/2 h-1 w-14 -translate-x-1/2
          ${accent}
          transition-all duration-500
        `}
      />

      {/* Value */}
      <div
        className={`
          text-3xl font-semibold tracking-tight text-slate-900
          transition-colors duration-300
          ${valueColor}
        `}
      >
        {value}
      </div>

      {/* Label */}
      <div className="mt-1 text-sm text-slate-500">
        {label}
      </div>
    </div>
  );
};


const InfoCard = ({ title, description, icon: Icon, image }: any) => (
  <div className="group cursor-default  overflow-hidden bg-white shadow-md  shadow-black/50 hover:shadow-lg transition-all duration-300">
    
    {/* Image */}
    <div className="relative h-48 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 " />
    </div>

    {/* Content */}
    <div className="p-6">
      <div className="flex justify-center items-center gap-3 mb-3">
        
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>

      <p className="text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

/* --------------------------- Section ----------------------------- */

const AboutSection = () => {
  return (
    <section
      id="about"
      className="py-24 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container max-w-[1400px] mx-auto px-4">
        <SectionHeader />

        {/* Intro Section */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Left */}
          <div className="space-y-7 max-w-xl">
            <h3 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Empowering Nepal's IT Future
            </h3>

            <p className="text-gray-600 leading-relaxed">
              NSTQB is Nepal's only official ISTQB® member board that provides
              software testing certifications based on international standards.
              We enable Nepali IT professionals to compete in the global market.
            </p>

            <p className="text-gray-600 leading-relaxed">
              We are committed to advancing software testing in Nepal by
              providing world-class training, certification, and career
              development opportunities aligned with global best practices.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-6">
  <StatCard value="2019" label="Established" color="blue" />
  <StatCard value="ISTQB®" label="Official Member" color="red" />
</div>
          </div>

          {/* Right */}
          <div className="flex justify-center">
            <img
              src="/new_nepal.png"
              alt="Nepal Map"
              className="max-w-full h-auto drop-shadow-xl"
            />
          </div>
        </div>

        {/* Mission / Vision / Values */}
        <div className="grid md:grid-cols-3 gap-8">
          {CORE_VALUES.map((item) => (
            <InfoCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
