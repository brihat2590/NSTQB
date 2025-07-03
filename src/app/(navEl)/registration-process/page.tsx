"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import {
  FileText,
  CreditCard,
  Mail,
  CheckCircle,
  ExternalLink,
  Copy,
  Building,
  User,
  Hash,
  DollarSign,
  MessageSquare,
  Smartphone,
  AlertCircle,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const steps = [
  {
    number: 1,
    title: "Fill and Submit Registration Form",
    icon: <FileText className="h-6 w-6" />,
    description: "Complete the online registration form for CTFL examination",
    action: "Register Here for Certified Tester Foundation Level (CTFL) Examination",
  },
  {
    number: 2,
    title: "Deposit Exam Fee",
    icon: <CreditCard className="h-6 w-6" />,
    description: "Pay the examination fee through bank deposit or digital payment",
  },
  {
    number: 3,
    title: "Send Payment Receipt",
    icon: <Mail className="h-6 w-6" />,
    description: "Email the payment receipt to NSTQB for verification",
  },
  {
    number: 4,
    title: "Registration Confirmation",
    icon: <CheckCircle className="h-6 w-6" />,
    description: "NSTQB will verify and confirm your registration via email",
  },
]

const bankDetails = [
  { label: "Bank Name", value: "Sanima Bank Limited", icon: <Building className="h-4 w-4" /> },
  { label: "Branch Name", value: "New Baneshwor", icon: <Building className="h-4 w-4" /> },
  { label: "Account Name", value: "Nepal Software Testing Qualifications Body", icon: <User className="h-4 w-4" /> },
  { label: "Account Number", value: "023010010001137", icon: <Hash className="h-4 w-4" /> },
  { label: "Amount", value: "NPR 21,000/-", icon: <DollarSign className="h-4 w-4" /> },
]

function CopyButton({ text }: { text: string }) {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(text)
    toast.success("Copied to clipboard successfully.")
  }

  return (
    <Button variant="outline" size="sm" onClick={copyToClipboard} className="ml-2">
      <Copy className="h-3 w-3" />
    </Button>
  )
}

export default function RegistrationProcess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 bg-gray-50 text-gray-800  py-12 px-6 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Registration Process</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">Nepal Software Testing Qualifications Body</p>
          <p className="mt-2 opacity-90">Step-by-step guide for CTFL examination registration</p>
        </div>

        {/* Process Overview */}
        <div className=" hidden md:grid md:grid-cols-4 gap-4 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="shadow-lg text-center">
              <CardContent className="pt-6">
                <div className="bg-gradient-to-r from-red-100 to-blue-100 p-3 rounded-full w-fit mx-auto mb-3">
                  {step.icon}
                </div>
                <Badge variant="outline" className="mb-2">
                  Step {step.number}
                </Badge>
                <h3 className="font-semibold text-sm">{step.title}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Step 1: Registration Form */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
              <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-full text-white">
                <FileText className="h-5 w-5" />
              </div>
              Step 1: Fill and Submit Registration Form
            </CardTitle>
            <CardDescription>Complete the online registration form for CTFL examination</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-4">Fill and submit the form available at the following link:</p>
            <Button
  className="w-full sm:w-auto text-sm sm:text-base px-4 py-2 flex items-center justify-center flex-wrap text-center bg-gradient-to-r from-red-600 to-blue-600 hover:from-red-700 hover:to-blue-700"
  onClick={() =>
    window.open(
      "https://forms.office.com/pages/responsepage.aspx?id=_i1yLTh780Kq2qRWX0KI5b6VtBMM30pPgHHIR38G7o1UM0s5SjRCWjVOQ0g5Q0xHNUgxSjBFMzFNRy4u&route=shorturl",
      "_blank"
    )
  }
>
  <ExternalLink className="h-4 w-4 mr-2" />
  <span className="whitespace-normal text-center">
    Register Here for Certified Tester Foundation Level (CTFL) Examination
  </span>
</Button>
          </CardContent>
        </Card>

        {/* Step 2: Payment */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
              <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-full text-white">
                <CreditCard className="h-5 w-5" />
              </div>
              Step 2: Deposit Exam Fee
            </CardTitle>
            <CardDescription>Pay the examination fee through bank deposit or digital payment</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-6">Deposit the exam fee in the following account:</p>

            {/* Bank Details */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4 text-center">Bank Details</h4>
                {/* Use only vertical spacing between rows here */}
                <div className="space-y-5 max-w-[800px] w-full mx-auto">
                  {bankDetails.map((detail, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                      // Removed space-x-2 here to avoid extra horizontal gap inside this flex container
                    >
                      {/* Left side: icon and label */}
                      <div className="flex items-center gap-2">
                        <div className="text-gray-500">{detail.icon}</div>
                        <span className="text-sm font-medium text-gray-700">{detail.label}:</span>
                      </div>

                      {/* Right side: value and optional copy button */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-900 font-medium">{detail.value}</span>
                        {detail.label === "Account Number" && <CopyButton text={detail.value} />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>


            {/* Remarks Format */}
            <Alert className="mb-6 border-blue-200 bg-blue-50">
              <MessageSquare className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                <strong>Remarks Format:</strong> {"<fullname>-CTFL"}
                <br />
                <strong>Example:</strong> RajeshTuladhar-CTFL
              </AlertDescription>
            </Alert>

            {/* Digital Payment Option */}
          <div className="border-t pt-6">
            <div className="flex items-center mb-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="mx-4 text-gray-700 font-medium">OR</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="text-center">
              <h4 className="font-semibold text-gray-900 mb-3">Scan and Pay</h4>
              

              <div className="flex items-center justify-center">
                <a href="/image.png" target="_blank" rel="noopener noreferrer">
                  <img src="/image.png" alt="Sample" className="w-64" />
                </a>
              </div>

              <p className="text-sm text-gray-600 mt-2">Scan QR code to pay via FonePay</p>
            </div>
          </div>

          </CardContent>
        </Card>

        {/* Step 3: Send Receipt */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
              <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-full text-white">
                <Mail className="h-5 w-5" />
              </div>
              Step 3: Send Payment Receipt
            </CardTitle>
            <CardDescription>Email the payment receipt to NSTQB for verification</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700 mb-4">
              Send the copy of physical deposit receipt/ Online receipt / Mobile Banking transfer evidence in the
              following email:
            </p>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-gray-700">Primary Email:</span>
                <a href="mailto:sales@nstqb.org" className="text-red-600 hover:text-red-800 underline">
                  sales@nstqb.org
                </a>
                <CopyButton text="sales@nstqb.org" />
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">CC:</span>
                <a href="mailto:info@nstqb.org" className="text-blue-600 hover:text-blue-800 underline">
                  info@nstqb.org
                </a>
                <CopyButton text="info@nstqb.org" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 4: Confirmation */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
              <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-full text-white">
                <CheckCircle className="h-5 w-5" />
              </div>
              Step 4: Registration Confirmation
            </CardTitle>
            <CardDescription>NSTQB will verify and confirm your registration</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-gray-700">
              NSTQB will verify the registration and deposit and confirm your registration via email.
            </p>
          </CardContent>
        </Card>

        {/* Important Notice */}
        <Alert className="border-yellow-200 bg-yellow-50">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Important:</strong> Please ensure all information is accurate and complete. Keep copies of all
            receipts and correspondence for your records. Registration confirmation may take 2-3 business days after
            payment verification.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}
