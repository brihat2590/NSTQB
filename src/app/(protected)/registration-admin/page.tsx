'use client'

import React, { useEffect, useState } from 'react'
import { markAsComplete, rejectRegistration } from './action'
import { CheckCircle, XCircle, FileImage, User, Phone, Mail, Calendar, MapPin, MoveLeft, ArrowLeft } from 'lucide-react'
import Link from 'next/link'


interface Registration {
  id: number
  firstName: string
  lastName: string
  email: string
  designation: string
  screenShot: string
  phone: string
  citizenshipNumber: string
  status: string
  createdAt: string
  remarks?: string | null
}

interface ConfirmationModalProps {
  isOpen: boolean
  type: 'approve' | 'reject'
  onClose: () => void
  onConfirm: () => void
  registration: Registration | null
  remarks?: string
  onRemarksChange?: (value: string) => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  type,
  onClose,
  onConfirm,
  registration,
  remarks = '',
  onRemarksChange
}) => {
  if (!isOpen || !registration) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 animate-scale-up">
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            type === 'approve' ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {type === 'approve' ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {type === 'approve' ? 'Approve Registration' : 'Reject Registration'}
          </h3>
          <p className="text-gray-600">
            {registration.firstName} {registration.lastName}
          </p>
        </div>

        {type === 'reject' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rejection Reason
            </label>
            <textarea
              value={remarks}
              onChange={(e) => onRemarksChange?.(e.target.value)}
              placeholder="Please provide a reason for rejection...(max 10 char)"
              rows={4}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
            />
          </div>
        )}

        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 text-white rounded-xl font-medium transition-colors ${
              type === 'approve'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {type === 'approve' ? 'Approve' : 'Reject'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function AdminRegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [loading, setLoading] = useState(false)
  const [isPending, setIsPending] = useState(false)
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean
    type: 'approve' | 'reject'
    registration: Registration | null
    remarks: string
  }>({
    isOpen: false,
    type: 'approve',
    registration: null,
    remarks: ''
  })

  useEffect(() => {
    async function fetchRegistrations() {
      setLoading(true)
      try {
        const res = await fetch('/api/exam-registration')
        const data: Registration[] = await res.json()
        setRegistrations(data)
      } catch (error) {
        console.error('Failed to fetch registrations:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchRegistrations()
  }, [])

  const handleApprove = (registration: Registration) => {
    setConfirmModal({
      isOpen: true,
      type: 'approve',
      registration,
      remarks: ''
    })
  }

  const handleReject = (registration: Registration) => {
    setConfirmModal({
      isOpen: true,
      type: 'reject',
      registration,
      remarks: ''
    })
  }

  const confirmAction = async () => {
    if (!confirmModal.registration) return

    setIsPending(true)
    try {
      if (confirmModal.type === 'approve') {
        await markAsComplete(confirmModal.registration.id)
        setRegistrations(prev =>
          prev.map(r =>
            r.id === confirmModal.registration!.id
              ? { ...r, status: 'COMPLETED', remarks: null }
              : r
          )
        )
      } else {
        if (!confirmModal.remarks.trim()) {
          alert('Please enter a rejection reason.')
          return
        }
        await rejectRegistration(confirmModal.registration.id, confirmModal.remarks)
        setRegistrations(prev =>
          prev.map(r =>
            r.id === confirmModal.registration!.id
              ? { ...r, status: 'REJECTED', remarks: confirmModal.remarks }
              : r
          )
        )
      }
    } catch (error) {
      console.error('Action failed:', error)
    } finally {
      setIsPending(false)
      setConfirmModal({ isOpen: false, type: 'approve', registration: null, remarks: '' })
    }
  }

  const closeModal = () => {
    setConfirmModal({ isOpen: false, type: 'approve', registration: null, remarks: '' })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'REJECTED':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading registrations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href={"/admin"}><ArrowLeft/></Link>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Registration Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Review and manage exam registrations
          </p>
        </div>

        {/* Registrations */}
        {registrations.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <User className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No registrations yet
            </h3>
            <p className="text-gray-600">
              New registrations will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {registrations.map((registration, index) => (
              <div
                key={registration.id}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-all duration-200 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {/* Main Info */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {registration.firstName} {registration.lastName}
                      </h3>
                      <div className="flex items-center space-x-4 text-gray-600 text-sm">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {registration.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-1" />
                          {registration.phone}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center space-x-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(registration.status)}`}>
                      {registration.status}
                    </span>
                  </div>
                </div>

                {/* Additional Details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    <span className="font-medium">Designation:</span>
                    <span className="ml-1">{registration.designation}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="font-medium">Citizenship:</span>
                    <span className="ml-1">{registration.citizenshipNumber}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">Applied:</span>
                    <span className="ml-1">{new Date(registration.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Rejection Remarks */}
                {registration.status === 'REJECTED' && registration.remarks && (
                  <div className="mt-4 p-4 bg-red-50 rounded-xl">
                    <p className="text-sm text-red-700">
                      <span className="font-medium">Rejection Reason:</span> {registration.remarks}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="mt-6 flex items-center justify-between pt-4 border-t border-gray-100">
                  <div>
                    <a
                      href={registration.screenShot}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <FileImage className="w-4 h-4 mr-2" />
                      View Screenshot
                    </a>
                  </div>

                  {registration.status === 'PENDING' && (
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => handleReject(registration)}
                        disabled={isPending}
                        className="inline-flex items-center px-6 py-2 border border-red-300 text-red-700 rounded-xl hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprove(registration)}
                        disabled={isPending}
                        className="inline-flex items-center px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        type={confirmModal.type}
        registration={confirmModal.registration}
        onClose={closeModal}
        onConfirm={confirmAction}
        remarks={confirmModal.remarks}
        onRemarksChange={(value) => setConfirmModal(prev => ({ ...prev, remarks: value }))}
      />


    </div>
  )
}