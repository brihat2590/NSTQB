'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Monitor,
  BadgeIcon as IdCard,
  AlertTriangle,
  Ban,
  Calendar,
  Mail,
  ExternalLink,
  CheckCircle,
  XCircle,
} from "lucide-react"

export default function CodeOfConduct() {
  return (
    <div className="min-h-screen bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Code of Conduct [e-Exam]
          </h1>
          <p className="text-xl bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent max-w-2xl mx-auto leading-relaxed font-semibold">
            Nepal Software Testing Qualifications Body
          </p>
          <p className="text-gray-500 mt-2">
            Rules and regulations governing all online examinations approved by ISTQB
          </p>
        </div>

        {/* Introduction */}
        <Card className="shadow-sm border-0 mb-8 hover:shadow-md transition-all duration-300">
          <CardContent className="pt-6">
            <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
              <p className="text-gray-700 leading-relaxed">
                The following rules and regulations govern all online examinations held within Nepal Testing
                Qualifications Body (NSTQB) and have been approved by International Software Testing Qualifications Board
                (ISTQB):
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Examination Room Section */}
        <Card className="shadow-sm border-0 mb-8 hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-4 text-2xl text-gray-900">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white shadow-sm">
                <Monitor className="h-6 w-6" />
              </div>
              <span className="font-semibold">Examination Room for e-Exam</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  The examinees position should be clearly visible to the proctor. The proctor will monitor the
                  examinees at all times.
                </span>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  During the exam, the candidate should have a full set up of devices camera, power back up and internet
                  bandwidth.
                </span>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Candidate should not have anything on their table except and if required, a dictionary and a
                  calculator and an extra mobile.
                </span>
              </div>
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  The examinee appearing e-exam cannot print the exam or access the internet.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Identification Section */}
        <Card className="shadow-sm border-0 mb-8 hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-4 text-2xl text-gray-900">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white shadow-sm">
                <IdCard className="h-6 w-6" />
              </div>
              <span className="font-semibold">Examinees' Identification</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  The proctor will identify each examinee by the pre-notified identification card that is used in the
                  respective country where the examination takes place.
                </span>
              </div>
              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">The identification must contain the photo of the examinee.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Before the Exam Section */}
        <Card className="shadow-sm border-0 mb-8 hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-4 text-2xl text-gray-900">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white shadow-sm">
                <Shield className="h-6 w-6" />
              </div>
              <span className="font-semibold">Before the Exam</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Each examinee shall be informed by the proctor before the exam about the examination rules.
                </span>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Each examinee should fill out the personal details and sign a statement saying they will keep the
                  integrity of the examination.
                </span>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  The proctor shall explain the integrity rules including the penalty for being caught cheating.
                </span>
              </div>
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  All the form and documents submitted by the candidate should be valid.
                </span>
              </div>
              <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Examination papers are strictly prohibited from broadcasting, recording or posting on any website,
                  mails, publish or otherwise disseminate via any mean known or which in the future may become known.
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integrity Rules Section */}
        <Card className="shadow-sm border-0 mb-8 hover:shadow-md transition-all duration-300 border-red-100">
          <CardHeader className="pb-4 bg-red-50 rounded-t-lg">
            <CardTitle className="flex items-center gap-4 text-2xl text-red-800">
              <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-xl text-white shadow-sm">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <span className="font-semibold">Integrity Rules</span>
            </CardTitle>
            <CardDescription className="text-red-700 ml-16">
              Breach of the following rules may cause disqualification and penalties as defined by the Examination
              board.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <Ban className="h-5 w-5 text-red-600" />
                  Prohibited Actions
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Copying from another examinee</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Communication with other examinees during the exam</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Using unauthorized material and all electronic devices</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Using the Internet to get answers</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Using portable media</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Making screenshots or photocopies of examination questions</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Penalties for Cheating
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">The exam of this person will be disqualified</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">No refund will be provided</span>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-white rounded-lg border-l-4 border-red-500">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      The person will be disqualified from taking the exam in the territory of Member Board for at least
                      6 months
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer Section */}
        <Card className="shadow-sm border-0 mb-8 hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-4 text-2xl text-gray-900">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl text-white shadow-sm">
                <ExternalLink className="h-6 w-6" />
              </div>
              <span className="font-semibold">Disclaimer</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree to allow NSTQB to include your name in successful candidate registry(SCR) database, posting to
                  directory of certified person unless you have further indicated. Please visit{" "}
                  <a
                    href="http://scr.istqb.org/"
                    className="text-blue-600 hover:text-blue-800 underline font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    http://scr.istqb.org/
                  </a>{" "}
                  for relevant details.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  All candidates are deemed to have read and to agree to abide by these and other examination regulations
                  as determined by the NSTQB from time to time. Any infringement of these regulations may have serious
                  consequences and may be referred to a Board of Enquiry. It is in the interests of all examination
                  candidates to co-operate to ensure that the examinations are conducted in a proper and orderly manner.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* COVID Note */}
        <Alert className="mb-8 border-yellow-200 bg-yellow-50 shadow-sm">
          <AlertTriangle className="h-5 w-5 text-yellow-600" />
          <AlertDescription className="text-yellow-800 font-medium">
            <strong>Note:</strong> NSTQB holds an authority to change the date of exam if required due to the current
            COVID situation. However, candidates will be pre-notified in such circumstances.
          </AlertDescription>
        </Alert>

        {/* Cancellation/Rescheduling Policy */}
        <Card className="shadow-sm border-0 hover:shadow-md transition-all duration-300">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-4 text-2xl text-gray-900">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white shadow-sm">
                <Calendar className="h-6 w-6" />
              </div>
              <span className="font-semibold">Cancellation/Re-scheduling Policy</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-xl p-6 border border-red-100">
                <h4 className="font-semibold text-red-800 mb-4 flex items-center gap-2">
                  <XCircle className="h-5 w-5 text-red-600" />
                  Cancellation
                </h4>
                <div className="bg-white rounded-lg p-4 border-l-4 border-red-500">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    Due to the current circumstances, we are unable to offer any cancellations for now. However,
                    candidates have an option to reschedule the exam. Please refer the rescheduling policy below.
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                <h4 className="font-semibold text-blue-800 mb-4 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Re-scheduling
                </h4>
                <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500 mb-4">
                  <p className="text-gray-700 text-sm leading-relaxed">
                    If you wish to reschedule your exam, you must contact NSTQB at{" "}
                    <a
                      href="mailto:info@nstqb.org"
                      className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1 font-medium"
                    >
                      <Mail className="h-3 w-3" />
                      info@nstqb.org
                    </a>{" "}
                    with a written request at least 14 days prior to your scheduled exam date.
                  </p>
                </div>
                <div className="bg-red-100 text-red-800 text-xs px-4 py-2 rounded inline-block max-w-full leading-snug">
  Failure to cancel or re-schedule within required time frame may<br />
  result in forfeiting exam fees
</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}