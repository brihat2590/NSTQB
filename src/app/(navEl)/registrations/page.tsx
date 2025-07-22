'use client';

import { useEffect,  useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Search, User, Mail, Briefcase, CreditCard, Calendar, BadgeCheck, Download } from 'lucide-react';

type Registration = {
  id: number;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  designation: string;
  status: string;
  citizenshipNumber: string;
  remarks?:string
};

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/exam-registration')
      .then(res => res.json())
      .then(data => {
        setRegistrations(data);
        setLoading(false);
        
      });
  }, []);

  const filteredRegistrations = registrations.filter(reg => {
    const searchLower = searchTerm.toLowerCase();
    return (
      reg.firstName.toLowerCase().includes(searchLower) ||
      reg.lastName.toLowerCase().includes(searchLower) ||
      reg.email.toLowerCase().includes(searchLower) ||
      reg.designation.toLowerCase().includes(searchLower) ||
      reg.citizenshipNumber.toLowerCase().includes(searchLower) ||
      reg.status.toLowerCase().includes(searchLower) ||
      reg.createdAt.toLowerCase().includes(searchLower)
    );
  });

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Excel export function
  const handleDownloadExcel = () => {
    // Map filtered registrations to worksheet data
    const worksheetData = filteredRegistrations.map(reg => ({
      'First Name': reg.firstName,
      'Last Name': reg.lastName,
      Email: reg.email,
      Designation: reg.designation,
      'Citizenship Number': reg.citizenshipNumber,
      Registered: new Date(reg.createdAt).toLocaleDateString('en-GB'),
      Status: reg.status,
      Remark: reg.status === 'REJECTED' ? reg.remarks || '' : '', //

    }));

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Create a new workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

    // Write workbook to binary array
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });

    // Create blob and save
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'ctfl-registrations.xlsx');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-red-600 text-white rounded-full px-6 py-2 mb-4">
            <span className="text-sm font-medium">Nepal Software Testing Qualitative Body</span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            CTFL Exam Registration Dashboard
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto">
            view all exam registrations 
          </p>
        </div>

        {/* Search and Stats Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-blue-100 p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-400" />
              </div>
              <input
                type="text"
                placeholder="Search registrations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2.5 border border-blue-200 rounded-lg bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleDownloadExcel}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Excel
            </button>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 p-12 flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600">Loading registrations...</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-blue-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-100">
                <thead className="bg-blue-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Applicant
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Briefcase className="h-4 w-4 mr-2" />
                        Designation
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Citizenship
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Registered
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
                      <div className="flex items-center">
                        <BadgeCheck className="h-4 w-4 mr-2" />
                        Status
                      </div>
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-blue-700 uppercase tracking-wider">
  Remark
</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-blue-100">
                  {filteredRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center">
                        <div className="text-gray-500 flex flex-col items-center justify-center">
                          <Search className="h-12 w-12 text-blue-200 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No registrations found</h3>
                          <p>Try adjusting your search query</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredRegistrations.map((reg) => (
                      <tr key={reg.id} className="hover:bg-blue-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="bg-gradient-to-r from-blue-100 to-red-50 rounded-lg w-10 h-10 flex items-center justify-center text-blue-800 font-bold mr-3">
                              {reg.firstName.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{reg.firstName} {reg.lastName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {reg.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {reg.designation}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {reg.citizenshipNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                          {new Date(reg.createdAt).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(reg.status)}`}>
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
  {reg.status === 'REJECTED' ? reg.remarks || '—' : '—'}
</td>

                        
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="bg-blue-50 px-6 py-3 border-t border-blue-100 text-xs text-blue-700">
              Showing <span className="font-semibold">{filteredRegistrations.length}</span> of{' '}
              <span className="font-semibold">{registrations.length}</span> registrations
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
