import { Target, Eye, Heart, Globe, Users, Award, CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <section  className="py-20 bg-white bg-scroll " id='about' >
      <div className="container max-w-[1400px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16"  >
          <h2 className="text-4xl font-bold text-gray-800 mb-4" >
            About <span className="text-blue-600">NSTQB</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nepal Software Testing Qualifications Board (NSTQB) is the leading organization 
            in the field of software testing education and certification in Nepal.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Left content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">Empowering Nepal's IT Future</h3>
            <p className="text-gray-600 leading-relaxed">
              NSTQB is Nepal's only official ISTQB® member board that provides 
              software testing certifications based on international standards. 
              We aim to enable Nepali IT professionals to compete in the global market.
            </p>
            <p className="text-gray-600 leading-relaxed">
              We are committed to advancing the software testing profession in Nepal by providing 
              world-class training, certification, and career development opportunities that align 
              with international standards and best practices.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-900">2019</div>
                <div className="text-sm text-gray-600">Established</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-3xl font-bold text-red-600">ISTQB®</div>
                <div className="text-sm text-gray-600">Official Member</div>
              </div>
            </div>
          </div>

          {/* Right content - Nepal Map */}
          <div className="relative flex justify-center items-center">
            <div className="relative">

                <img src={'/new_nepal.png'} alt="Nepal Map" className="h-auto w-auto"/>
              {/* Nepal Map SVG */}

              
             
            </div>
          </div>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-blue-50 rounded-xl">
            <div className="inline-flex p-4 bg-blue-900 text-white rounded-full mb-6">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Our Mission</h3>
            <p className="text-gray-600 text-left">
            NSTQB promotes the value of software testing by empowering professionals with recognized certifications and ethical standards. We support career growth through a structured certification path and ensure quality by advancing industry knowledge and setting global standards for training and evaluation.


              
            </p>
          </div>

          <div className="text-center p-8 bg-red-50 rounded-xl">
            <div className="inline-flex p-4 bg-red-600 text-white rounded-full mb-6">
              <Eye size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Our Vision</h3>
            <p className="text-gray-600 text-left">
            To continually improve and advance the software testing profession by defining and maintaining a Body of Knowledge which allows testers to be certified based on best practices, connecting the international software testing community, and encouraging research.
            </p>
          </div>

          <div className="text-center p-8 bg-green-50 rounded-xl">
            <div className="inline-flex p-4 bg-green-600 text-white rounded-full mb-6">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Our Values</h3>
            <p className="text-gray-600 text-left">
            We are guided by integrity, inclusivity, and innovation. With a passion for testing, we work collaboratively across borders to uphold quality, embrace diverse perspectives, and continuously evolve to meet global industry needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
