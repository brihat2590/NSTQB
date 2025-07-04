export default function Home() {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <section className="bg-white  overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 px-8 py-8 my-5">
              <h1 className="text-3xl sm:text-4xl font-bold text-blue-950 text-center font-serif">
                Message from the President
              </h1>
            </div>
  
            {/* Content */}
            <div className="px-8 sm:px-12 lg:px-16 py-12 space-y-10">
              {/* President Image */}
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src="https://nstqb.org/wp-content/uploads/2020/07/Sangeeta-e1595139163767.jpg"
                    alt="Sangeeta Rayamajhi - President of NSTQB Nepal"
                    className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full shadow-xl object-cover ring-4 ring-white border-4 border-gray-200 transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent via-transparent to-gray-900/10"></div>
                </div>
              </div>
  
              {/* Message Content */}
              <div className="prose prose-xl max-w-none">
                <div className="grid lg:grid-cols-1 gap-8">
                  <div className="space-y-8">
                    <p className="text-gray-700 text-xl leading-relaxed font-medium">
                      Welcome to NSTQB – Nepal Software Testing Qualifications Body.
                    </p>
                    
                    <p className="text-gray-700 text-lg leading-relaxed">
                      As the President of NSTQB, it is my great honor to lead an organization committed to advancing the software testing profession in Nepal. Our mission is to promote global standards in quality assurance through ISTQB® certifications, foster professional growth, and build a strong and collaborative QA community.
                    </p>
                    
                    <p className="text-gray-700 text-lg leading-relaxed">
                      In today's fast-evolving digital landscape, the role of software testing is more crucial than ever. At NSTQB, we are dedicated to empowering individuals with internationally recognized certifications, creating opportunities for continuous learning, and elevating the visibility of Nepal's testing talent on the global stage.
                    </p>
                  </div>
                </div>
  
                {/* Signature */}
                <footer className="border-t border-gray-200 pt-8 mt-12">
                  <div className="text-center space-y-2">
                    <p className="text-2xl font-bold text-gray-900 mb-2">
                      Sangeeta Rayamajhi
                    </p>
                    <p className="text-lg text-gray-600 font-semibold">
                      President, NSTQB Nepal
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto mt-4 rounded-full"></div>
                  </div>
                </footer>
              </div>
            </div>
          </section>
  
          {/* Additional Info Section */}
    
        </div>
      </div>
    );
  }