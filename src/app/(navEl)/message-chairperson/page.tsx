'use client';
import Image from 'next/image';

export default function PresidentMessage() {
  return (
    <div className="min-h-screen  p-4 md:p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-white p-6 md:p-8 border-b-4 border-red-500 shadow-md">
  <div className="flex flex-col md:flex-row items-center justify-between">
    {/* Left: Logo and Title */}
    <div className="flex items-center mb-4 md:mb-0">
      {/* <div className="bg-red-600 w-14 h-14 rounded-full flex items-center justify-center mr-3 shadow-md">
        <span className="text-white font-bold text-2xl">N</span>
      </div> */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800">Nepal Software Testing Body</h1>
        <p className="text-sm md:text-base text-red-600 font-medium">Advancing Software Quality in Nepal</p>
      </div>
    </div>

    {/* Right: Section Title */}
    <div className="text-center">
      <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-blue-900">President's Message</h2>
      <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-2 rounded-full"></div>
    </div>
  </div>
</div>


        {/* Main Content */}
        <div className="flex flex-col lg:flex-row">
          {/* President Photo */}
          <div className="lg:w-2/5 p-6 md:p-10 bg-gradient-to-b from-red-50 to-white flex justify-center items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-red-400 to-blue-600 rounded-full opacity-20 blur-lg"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white shadow-2xl">
                <Image 
                  src="https://nstqb.org/wp-content/uploads/2020/07/Sangeeta-e1595139163767.jpg" 
                  alt="Ms. Sangeetha Rajamajhi, President of NSTQB"
                  width={320}
                  height={320}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-gray-800">Ms. Sangeetha Rajamajhi</h3>
                <p className="text-lg text-red-700 font-semibold">President, NSTQB</p>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="lg:w-3/5 p-6 md:p-10">
            <div className="border-l-4 border-red-600 pl-4 mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">A Message from Our President</h3>
              <p className="text-blue-900 font-medium">Leading Nepal's Software Testing Community</p>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p className="font-medium">
                Dear Esteemed Members, Partners, and Software Testing Community,
              </p>
              
              <p>
                It is with great honor and enthusiasm that I address you as the President of the Nepal Software Testing Body (NSTQB). As we navigate the rapidly evolving landscape of technology, our commitment to excellence in software quality assurance remains steadfast and stronger than ever.
              </p>
              
              <p>
                NSTQB has been at the forefront of establishing international standards in software testing practices within Nepal. Our mission is to empower professionals, elevate industry standards, and create a robust ecosystem where quality is not just an afterthought, but an integral part of the development lifecycle.
              </p>
              
              <p>
                Over the past year, we've achieved significant milestones:
              </p>  
              
              <ul className="list-disc pl-5 space-y-2">
                <li>Certified over 500 professionals through our ISTQB-compliant programs</li>
                <li>Partnered with 15 leading tech companies to implement best practices</li>
                <li>Expanded our training programs to 5 major cities across Nepal</li>
                <li>Launched the "Quality for All" initiative to make testing education accessible</li>
              </ul>
              
              <p>
                Looking ahead, our vision is to establish Nepal as a regional hub for software quality excellence. We are launching specialized training in automation testing, performance testing, and security testing to address the growing demands of our industry.
              </p>
              
              <p>
                I invite each of you to join us in this transformative journey. Whether you are an experienced professional or just beginning your career in software testing, your participation and contributions are vital to our collective success.
              </p>
              
              <p className="font-medium">
                Together, we can set new benchmarks and create a future where "Made in Nepal" software is synonymous with reliability and world-class quality.
              </p>
            </div>

            <div className="mt-10 flex items-center">
              <div className="flex-grow h-0.5 bg-gradient-to-r from-red-200 to-blue-200"></div>
              <div className="px-4 text-center">
                <p className="text-lg font-bold text-gray-800">Ms. Sangeetha Rajamajhi</p>
                <p className="text-red-700 font-medium">President, Nepal Software Testing Body</p>
              </div>
              <div className="flex-grow h-0.5 bg-gradient-to-r from-blue-200 to-red-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
