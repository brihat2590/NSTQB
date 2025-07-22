import { CheckCircle, Clock, Home, Mail } from 'lucide-react';

export default function RegistrationSuccess() {
  return (
    <div className="min-h-screen w-full bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">

          {/* Success Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <CheckCircle className="w-20 h-20 text-blue-500 animate-pulse" />
              <div className="absolute inset-0 w-20 h-20 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-4">
              Registration Successful
            </h1>
            <p className="text-xl text-gray-600 font-light">
              Thank you for your Registration
            </p>
          </div>

          {/* Success Message */}
          <div className="text-center mb-12">
            <p className="text-lg text-gray-700 leading-relaxed">
              Your registration has been submitted successfully. We've received all your information 
              and it's now being processed by our team. Thank you for your patience and trust in us.
            </p>
          </div>

          {/* Approval Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-12">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-medium text-blue-900">
                Pending Admin Approval
              </h2>
            </div>
            <p className="text-blue-800 text-center leading-relaxed">
              Your registration is currently under review by our administrators. 
              You'll receive an email notification once your registration has been approved 
              and your payment has been verified.
            </p>
          </div>

          
          

        </div>
      </div>
    </div>
  );
}
