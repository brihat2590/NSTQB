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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-red-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12 text-gray-600 bg-gray-50 py-12 px-6 rounded-2xl shadow-lg">
          <h1 className="text-4xl font-bold mb-4">Code of Conduct [e-Exam]</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-95">Nepal Software Testing Qualifications Body</p>
          <p className="mt-2 opacity-90">Rules and regulations governing all online examinations approved by ISTQB</p>
        </div>

        {/* Introduction */}
        <Card className="shadow-lg mb-8">
          <CardContent className="pt-6">
            <p className="text-gray-700 leading-relaxed">
              The following rules and regulations govern all online examinations held within Nepal Testing
              Qualifications Body (NSTQB) and have been approved by International Software Testing Qualifications Board
              (ISTQB):
            </p>
          </CardContent>
        </Card>

        {/* Examination Room Section */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
              <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-full text-white">
                <Monitor className="h-5 w-5" />
              </div>
              Examination Room for e-Exam
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  The examinees position should be clearly visible to the proctor. The proctor will monitor the
                  examinees at all times.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  During the exam, the candidate should have a full set up of devices camera, power back up and internet
                  bandwidth.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Candidate should not have anything on their table except and if required, a dictionary and a
                  calculator and an extra mobile.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  The examinee appearing e-exam cannot print the exam or access the internet.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Identification Section */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
              <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-full text-white">
                <IdCard className="h-5 w-5" />
              </div>
              Examinees' Identification
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  The proctor will identify each examinee by the pre-notified identification card that is used in the
                  respective country where the examination takes place.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">The identification must contain the photo of the examinee.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Before the Exam Section */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
              <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-full text-white">
                <Shield className="h-5 w-5" />
              </div>
              Before the Exam
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Each examinee shall be informed by the proctor before the exam about the examination rules.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Each examinee should fill out the personal details and sign a statement saying they will keep the
                  integrity of the examination.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  The proctor shall explain the integrity rules including the penalty for being caught cheating.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  All the form and documents submitted by the candidate should be valid.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">
                  Examination papers are strictly prohibited from broadcasting, recording or posting on any website,
                  mails, publish or otherwise disseminate via any mean known or which in the future may become known.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Integrity Rules Section */}
        <Card className="shadow-lg mb-8 border-red-200">
          <CardHeader className="bg-gradient-to-r from-red-100 to-red-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-red-800">
              <div className="bg-red-600 p-2 rounded-full text-white">
                <AlertTriangle className="h-5 w-5" />
              </div>
              Integrity Rules
            </CardTitle>
            <CardDescription className="text-red-700">
              Breach of the following rules may cause disqualification and penalties as defined by the Examination
              board.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-red-800 mb-3">Prohibited Actions:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Copying from another examinee</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Communication with other examinees during the exam</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Using unauthorized material and all electronic devices
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Using the Internet to get answers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">Using portable media</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Ban className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      Making screenshots or photocopies of examination questions
                    </span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-800 mb-3">Penalties for Cheating:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">The exam of this person will be disqualified</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">No refund will be provided</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-700">
                      The person will be disqualified from taking the exam in the territory of Member Board for at least
                      6 months
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer Section */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-red-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
              <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-full text-white">
                <ExternalLink className="h-5 w-5" />
              </div>
              Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                You agree to allow NSTQB to include your name in successful candidate registry(SCR) database, posting to
                directory of certified person unless you have further indicated. Please visit{" "}
                <a
                  href="http://scr.istqb.org/"
                  className="text-blue-600 hover:text-blue-800 underline"
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
          </CardContent>
        </Card>

        {/* COVID Note */}
        <Alert className="mb-8 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            <strong>Note:</strong> NSTQB holds an authority to change the date of exam if required due to the current
            COVID situation. However, candidates will be pre-notified in such circumstances.
          </AlertDescription>
        </Alert>

        {/* Cancellation/Rescheduling Policy */}
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-red-50 to-blue-50">
            <CardTitle className="flex items-center gap-3 text-2xl text-gray-900">
              <div className="bg-gradient-to-r from-red-600 to-blue-600 p-2 rounded-full text-white">
                <Calendar className="h-5 w-5" />
              </div>
              Cancellation/Re-scheduling Policy
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  Cancellation
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Due to the current circumstances, we are unable to offer any cancellations for now. However,
                  candidates have an option to reschedule the exam. Please refer the rescheduling policy below.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  Re-scheduling
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed mb-3">
                  If you wish to reschedule your exam, you must contact NSTQB at{" "}
                  <a
                    href="mailto:info@nstqb.org"
                    className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                  >
                    <Mail className="h-3 w-3" />
                    info@nstqb.org
                  </a>{" "}
                  with a written request at least 14 days prior to your scheduled exam date.
                </p>
                <Badge variant="destructive" className="text-xs">
                  Failure to cancel or re-schedule within required time frame may<br></br> result in forfeiting exam fees
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
