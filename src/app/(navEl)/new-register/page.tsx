"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User,
  Mail,
  Globe,
  CreditCard,
  Building,
  Briefcase,
  Phone,
  Calendar,
  MessageCircle,
  CheckCircle,
  Loader2,
  Shield,
  ArrowRight,
  X,
  FileText
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

interface FormData {
  fullName: string;
  email: string;
  nationality: string;
  citizenshipNumber: string;
  companyName: string;
  designation: string;
  mobileNumber: string;
  examDate: string;
  examLanguageConfirm: string;
  acceptTerms: boolean;
}

interface ExamDate {
  id: string;
  examTitle: string;
  examDate: string; // ISO string
  applicationPeriod: string;
  location: string;
}

const formFields = [
  {
    id: "fullName",
    label: "Full Name",
    type: "input",
    placeholder: "Enter your full name",
    icon: User,
  },
  {
    id: "email",
    label: "Email Address",
    type: "input",
    inputType: "email",
    placeholder: "Enter your email address",
    icon: Mail,
  },
  {
    id: "nationality",
    label: "Nationality",
    type: "select",
    placeholder: "Select your nationality",
    options: [
      { value: "nepali", label: "Nepali" },
      { value: "others", label: "Others" },
    ],
    icon: Globe,
  },
  {
    id: "citizenshipNumber",
    label: "Citizenship Number",
    type: "input",
    placeholder: "Enter your citizenship number",
    icon: CreditCard,
  },
  {
    id: "companyName",
    label: "Company Name",
    type: "input",
    placeholder: "Enter your company name",
    icon: Building,
  },
  {
    id: "designation",
    label: "Designation",
    type: "input",
    placeholder: "Enter your job designation",
    icon: Briefcase,
  },
  {
    id: "mobileNumber",
    label: "Mobile Number",
    type: "input",
    inputType: "tel",
    placeholder: "Enter your mobile number",
    icon: Phone,
  },
  {
    id: "examDate",
    label: "Exam Date & Venue",
    type: "select",
    placeholder: "Select your preferred exam date",
    icon: Calendar,
    fullWidth: true,
  },
  {
    id: "examLanguageConfirm",
    label: "Exam Language Confirmation",
    type: "select",
    placeholder: "The exam is only available in English. Do you confirm?",
    options: [
      { value: "yes", label: "Yes, I confirm to take the exam in English" },
      { value: "no", label: "No, I do not confirm" },
    ],
    icon: MessageCircle,
    fullWidth: true,
  },
];

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    nationality: "",
    citizenshipNumber: "",
    companyName: "",
    designation: "",
    mobileNumber: "",
    examDate: "",
    examLanguageConfirm: "",
    acceptTerms: false,
  });
  const price=15;

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [examDates, setExamDates] = useState<ExamDate[]>([]);
  const [loadingDates, setLoadingDates] = useState(true);

  useEffect(() => {
    const fetchExamDates = async () => {
      setLoadingDates(true);
      try {
        const res = await axios.get("/api/exam-date");
        setExamDates(res.data);
      } catch (err) {
        console.error("Failed to fetch exam dates", err);
      }
      setLoadingDates(false);
    };

    fetchExamDates();
  }, []);

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
    
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.nationality) newErrors.nationality = "Please select your nationality";
    if (!formData.citizenshipNumber.trim()) newErrors.citizenshipNumber = "Citizenship number is required";
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobileNumber.replace(/\s/g, ""))) {
      newErrors.mobileNumber = "Please enter a valid 10-digit mobile number";
    }
    if (!formData.examDate) newErrors.examDate = "Please select an exam date";
    if (!formData.examLanguageConfirm) newErrors.examLanguageConfirm = "Please confirm exam language preference";
    if (!formData.acceptTerms) newErrors.acceptTerms = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try{

      if (validateForm()) {
        setIsLoading(true);
        
        console.log("Form Data:", formData);
        const response = await fetch('/api/esewa/initiate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            amount: Number(price.toFixed(2)),
            
          })
        });
  
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Payment initiation failed');
        }
  
        const { paymentUrl, params } = await response.json();
  
        // Create hidden form for eSewa submission
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = paymentUrl;
        form.style.display = 'none';
  
        // Add fields in required order
        const addField = (name: string, value: string) => {
          const input = document.createElement('input');
          input.type = 'hidden';
          input.name = name;
          input.value = value;
          form.appendChild(input);
        };
  
        addField('amount', params.amount);
        addField('tax_amount', params.tax_amount);
        addField('total_amount', params.total_amount);
        addField('transaction_uuid', params.transaction_uuid);
        addField('product_code', params.product_code);
        addField('product_service_charge', params.product_service_charge);
        addField('product_delivery_charge', params.product_delivery_charge);
        addField('signed_field_names', params.signed_field_names);
        addField('signature', params.signature);
        addField('success_url', params.success_url);
        addField('failure_url', params.failure_url);
  
        document.body.appendChild(form);
        form.submit();
  
       
      }

    }
    catch(error:any){
      console.log(error.message)
      toast.error("An error occurred while processing your request. Please try again later.");
    }
    
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <h1 className="text-3xl font-bold text-center mb-4">CTFL Exam Registration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formFields.map((field) => {
          const Icon = field.icon;

          return (
            <div key={field.id} className={`${field.fullWidth ? "md:col-span-2" : ""}`}>
              <Label className="flex items-center gap-2 mb-1 text-sm font-medium text-gray-700">
                <Icon className="w-4 h-4 text-gray-500" />
                {field.label}
              </Label>

              {field.type === "input" ? (
                <Input
                  type={field.inputType || "text"}
                  value={formData[field.id as keyof FormData] as string}
                  onChange={(e) => handleInputChange(field.id as keyof FormData, e.target.value)}
                  placeholder={field.placeholder}
                />
              ) : (
                <Select
                  value={formData[field.id as keyof FormData] as string}
                  onValueChange={(value) => handleInputChange(field.id as keyof FormData, value)}
                  disabled={loadingDates && field.id === "examDate"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingDates ? "Loading exam dates..." : field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.id === "examDate"
                      ? examDates.map((date) => (
                          <SelectItem key={date.id} value={date.id}>
                            {`${formatDate(date.examDate)} - ${date.examTitle} | ${date.location}`}
                          </SelectItem>
                        ))
                      : field.options?.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              )}

              {errors[field.id as keyof FormData] && (
                <p className="text-red-500 text-sm mt-1">
                  {errors[field.id as keyof FormData]}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="acceptTerms"
          checked={formData.acceptTerms}
          onCheckedChange={(checked) => handleInputChange("acceptTerms", Boolean(checked))}
        />
        <Label htmlFor="acceptTerms" className="text-sm text-gray-700">
          I accept the terms and conditions *
        </Label>
      </div>
      {errors.acceptTerms && (
        <p className="text-red-500 text-sm ml-6">{errors.acceptTerms}</p>
      )}

      <Button type="submit" disabled={isLoading} className="w-full text-lg">
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pay with eSewa
          </>
        )}
      </Button>
    </form>
  );
}
