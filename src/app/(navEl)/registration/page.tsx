'use client';

import React, { useState, useRef, ChangeEvent, FormEvent, useEffect } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Eye, Edit3, Trash2, Users, Clock, CheckSquare, Calendar, Router } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Types
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  citizenshipNumber: string;
  designation: string;
  languageConfirmed: boolean;
}

interface FormErrors {
  [key: string]: string;
}

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
  onClose: () => void;
}

interface QRCodeProps {
  size?: number;
}



// Toast Component
const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 flex items-center gap-2 ${type === 'success' ? 'bg-green-600 text-white' :
    type === 'error' ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
    }`}>
    {type === 'success' && <CheckCircle size={20} />}
    {type === 'error' && <AlertCircle size={20} />}
    <span>{message}</span>
    <button onClick={onClose} className="ml-2">
      <X size={16} />
    </button>
  </div>
);

export default function RegistrationPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    citizenshipNumber: '',
    designation: '',
    languageConfirmed: false
  });
  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const [toasts, setToasts] = useState<{ id: number, message: string, type: 'success' | 'error' | 'info' }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [examInfo, setExamInfo] = useState<{ examDate: string; location: string } | null>(null);


  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/exam-date');
      const data = await res.json();
      if (data?.length > 0) {
        setExamInfo({ examDate: data[0].examDate, location: data[0].location });
      }
    }
    fetchData()

  }, [])
  const formatExamDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', {
        weekday: 'long',    // e.g. "Saturday"
        year: 'numeric',    // e.g. "2025"
        month: 'long',      // e.g. "August"
        day: 'numeric'      // e.g. "30"
      });
    } catch {
      return dateStr;
    }
  };





  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.citizenshipNumber.trim()) newErrors.citizenshipNumber = 'Citizenship number is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.designation.trim()) newErrors.designation = 'Designation is required';
    if (!formData.languageConfirmed) newErrors.languageConfirmed = 'You must confirm language requirement';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);

      try {
        // Prepare FormData to send text fields + file
        const payload = new FormData();
        payload.append('firstName', formData.firstName);
        payload.append('lastName', formData.lastName);
        payload.append('email', formData.email);
        payload.append('phone', formData.phone);
        payload.append('companyName', formData.companyName);
        payload.append('citizenshipNumber', formData.citizenshipNumber);
        payload.append('designation', formData.designation);
        payload.append('languageConfirmed', formData.languageConfirmed ? 'true' : 'false');
        if (uploadedFile) {
          payload.append('screenShot', uploadedFile);
        }

        const response = await fetch('/api/cloudinary', {
          method: 'POST',
          body: payload,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to register');
        }

        setLoading(false);
        showToast('Registration successful! Your payment is under review.', 'success');
        router.push('/CTFL/thanks')


        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          companyName: '',
          citizenshipNumber: '',
          designation: '',
          languageConfirmed: false,
        });
        setUploadedFile(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch (error: any) {
        setLoading(false);
        showToast(error.message || 'Something went wrong', 'error');
      }
    }
  };




  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);

    // Auto-dismiss toast after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 7000);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        setUploadedFile(file);
        setErrors(prev => ({ ...prev, file: '' }));
      } else {
        setErrors(prev => ({ ...prev, file: 'Only images and PDF files are allowed' }));
      }
    }
  };

  const removeFile = (): void => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleInputChange = (field: keyof FormData) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    };

  const inputClasses = "w-full rounded-lg border border-[#EBEBEB] bg-white px-4 py-3 text-[#141414] shadow-sm transition-colors placeholder:text-[#9A9A9A] focus:border-[#8B1A1A] focus:outline-none focus:ring-2 focus:ring-[#8B1A1A]/10";
  const errorClasses = "mt-1 text-sm text-[#8B1A1A]";

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-5 py-10 text-[#141414] transition-all duration-300 sm:px-8 lg:px-8 animate-fade-in-up animate-delay-200">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
        />
      ))}<style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>

      <div className="mx-auto max-w-6xl">
        <section className="mb-10 text-center sm:mb-12 lg:mb-14">
          <h1 className="mx-auto mb-4 max-w-4xl text-5xl font-medium leading-none tracking-tight sm:text-6xl lg:text-7xl">
            CTFL <em className="font-medium italic text-[#8B1A1A]">4.0 Exam Registration</em>
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-7 text-[#5A5A5A] sm:text-lg">
            Nepal Software Testing Qualification Body (NSTQB)
          </p>
        </section>



        <div className="overflow-hidden rounded-2xl border border-[#EBEBEB] bg-white shadow-sm">
          <div className="h-1 bg-[#8B1A1A]" />
          <div className="p-7 sm:p-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-[#8B1A1A]">Registration</p>
            <h2 className="mb-5 text-3xl font-normal tracking-tight text-[#141414] sm:text-[2rem]">How to register?</h2>
            <div className="space-y-3 text-[15px] leading-7 text-[#5A5A5A]">
              <div className="flex items-start gap-2">
                <span className="font-semibold text-[#8B1A1A]">→</span>
                <span>Provide your Full name, Email address, Contact number, Citizenship number, Company name and Your Designation.</span>
              </div>
              {/* <div className="flex items-start gap-2">
                <span className="text-red-600 font-semibold">→</span>
                <span>Scan the QR code and send the total amount displayed on "Your Order" tab.</span>
              </div> */}
              {/* <div className="flex items-start gap-2">
                <span className="font-semibold text-[#8B1A1A]">→</span>
                <span>Take a screenshot of the payment & upload it in the file upload field below.</span>
              </div> */}
              {/* <div className="flex items-start gap-2">
                <span className="font-semibold text-[#8B1A1A]">→</span>
                <span>We will verify your payment within a few hours and after that you will receive the confirmation email.</span>
              </div> */}
              <div className="flex items-start gap-2">
                <span className="font-semibold text-[#8B1A1A]">→</span>
                <span>In case of any confusions & queries feel free to reach out at: <span className="text-[#8B1A1A]">info@nstqb.org</span></span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[#EBEBEB] p-7 sm:p-8">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
              {/* Left Column - Payment Details */}
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8B1A1A]">Candidate Details</p>
                  <h3 className="text-2xl font-normal tracking-tight text-[#141414]">Personal information</h3>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#141414]">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={handleInputChange('firstName')}
                      className={inputClasses}
                    />
                    {errors.firstName && <p className={errorClasses}>{errors.firstName}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#141414]">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={handleInputChange('lastName')}
                      className={inputClasses}
                    />
                    {errors.lastName && <p className={errorClasses}>{errors.lastName}</p>}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-[#141414]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    className={inputClasses}
                  />
                  {errors.email && <p className={errorClasses}>{errors.email}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#141414]">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange('phone')}
                      className={inputClasses}
                    />
                    {errors.phone && <p className={errorClasses}>{errors.phone}</p>}
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-[#141414]">
                      Citizenship Number *
                    </label>
                    <input
                      type="text"
                      value={formData.citizenshipNumber}
                      onChange={handleInputChange('citizenshipNumber')}
                      className={inputClasses}
                    />
                    {errors.citizenshipNumber && <p className={errorClasses}>{errors.citizenshipNumber}</p>}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="mb-1 block text-sm font-medium text-[#141414]">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={handleInputChange('companyName')}
                    className={inputClasses}
                  />
                  {errors.companyName && <p className={errorClasses}>{errors.companyName}</p>}
                </div>

                <div className="mb-6">
                  <label className="mb-1 block text-sm font-medium text-[#141414]">
                    Designation *
                  </label>
                  <select
                    value={formData.designation}
                    onChange={handleInputChange('designation')}
                    className={inputClasses}
                  >
                    <option value="">Select your designation</option>
                    <option value="Student">Student</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="Software Developer">Software Developer</option>
                    <option value="Test Manager">Test Manager</option>
                    <option value="Business Analyst">Business Analyst</option>
                    <option value="Project Manager">Project Manager</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.designation && <p className={errorClasses}>{errors.designation}</p>}
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.languageConfirmed}
                      onChange={handleInputChange('languageConfirmed')}
                      className="mt-1 h-4 w-4 rounded border-[#D8D8D8] text-[#8B1A1A] focus:ring-[#8B1A1A]"
                    />
                    <span className="text-sm leading-6 text-[#5A5A5A]">
                      This exam will be conducted in <strong>English only</strong>. I confirm I am comfortable with this.
                    </span>
                  </label>
                  {errors.languageConfirmed && <p className={errorClasses}>{errors.languageConfirmed}</p>}
                </div>

                {/* QR Payment Section */}
                {/* <div className="border-t pt-6"> */}
                {/* QR Payment Section */}
                {/* <div className="border-t pt-6">
  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
    
    {/* Left: QR Image */}
                {/* <div className="flex-1 flex justify-center">
      <img src={'./qr.png'} alt="QR Code" className=" " />
    </div> */}

                {/* Right: Account Details
    <div className="flex-1 items-center">
      <h4 className="font-semibold text-gray-900 mb-2 text-left md:text-left">Account Details:</h4>
      <div className="text-sm text-gray-700 space-y-1 text-left md:text-left">
        <p><strong>Acc Name:</strong> Nepal Software Testing Qualification Body</p>
        <p><strong>Bank:</strong> Sanima Bank Limited </p>
        <p><strong>Branch:</strong> New Baneshwor</p>
        <p><strong>Acc No:</strong> 023010010001137</p>
        <p><strong>Remark</strong> YOUR_NAME-CTFL</p>
      </div>
    </div>

  </div>
</div>



                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Payment Screenshot *
                    </label>
                    
                    {!uploadedFile ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 text-center">
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileUpload}
                          accept="image/*,.pdf"
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                          <span className="text-sm text-gray-600">
                            Click to upload or drag and drop<br />
                            Images or PDF files only
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="border border-gray-300 rounded-lg p-2 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                          <span className="text-sm text-gray-700">{uploadedFile.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={20} />
                        </button>
                      </div>
                    )}
                    {errors.file && <p className={errorClasses}>{errors.file}</p>}
                  </div>
                </div>
              </div> */}
              </div>

              {/* Right Column - Your Order */}
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8B1A1A]">Payment</p>
                  <h3 className="text-2xl font-normal tracking-tight text-[#141414]">Examination fee</h3>
                </div>

                <div className="rounded-xl border border-[#EBEBEB] bg-white p-6 shadow-sm">
                  <div className="mb-4 flex justify-between items-center pb-4 border-b border-[#EBEBEB]">
                    <span className="font-medium text-[#141414]">Course</span>
                    <span className="font-medium text-[#141414]">Amount</span>
                  </div>

                  <div className="mb-6 flex justify-between items-center">
                    <div>
                      <span className="block text-[#141414]">Certified Tester Foundation Level (CTFL 4.0)</span>
                      <span className="text-xs font-medium text-[#9A9A9A]">ISTQB Certification</span>
                    </div>
                    <span className="font-medium text-[#141414]">Rs.21,000</span>
                  </div>

                  <div className="border-t border-[#EBEBEB] pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total Amount</span>
                      <span className="">Rs.21,000</span>
                    </div>
                  </div>

                </div>

                <div>

                  {examInfo ? (
                    <div className="rounded-xl border border-[#EBEBEB] bg-white p-5 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8B1A1A]">Exam Date & Time</p>
                      <p className="py-2 text-base font-medium text-[#141414]">{formatExamDate(examInfo.examDate)}</p>


                    </div>
                  ) : (
                    <div className="rounded-xl border border-[#EBEBEB] bg-white p-5 shadow-sm">

                      <p className="text-sm text-[#5A5A5A]">Loading exam date...</p>


                    </div>
                  )}


                </div>




                {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-semibold  mb-2">QR Payment</h4>
                  <p className="text-sm  mb-2">
                    Please pay the amount by scanning the QR code.
                  </p>
                  <p className="text-sm ">
                    We will manually review your payment and let you know once verified.
                  </p>
                </div> */}



                {/* Support Information */}
                <div className="rounded-xl border border-[#EBEBEB] bg-white p-6 shadow-sm">
                  <h4 className="mb-2 font-semibold text-[#141414]">Need Help?</h4>
                  <div className="space-y-1 text-sm text-[#5A5A5A]">
                    <p><strong>Email:</strong> info@nstqb.org</p>
                    <p><strong>Phone:</strong> +977-9851055879</p>
                    <p><strong>Office Hours:</strong> Sun-Fri, 10:00 AM - 5:00 PM</p>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#8B1A1A] bg-[#8B1A1A] px-6 py-3 font-semibold text-white transition-colors duration-150 hover:bg-[#6B1414] disabled:cursor-not-allowed disabled:bg-[#C8A3A3]"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    'Confirm Registration'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}