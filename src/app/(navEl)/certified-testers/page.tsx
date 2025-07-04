'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Tester = {
  id: string;
  name: string;
  certificateNumber: string;
  certificateBody: string;
  examProvider: string;
  certification: string;
  countryOfIssue: string;
  certificationDate: string;
  createdAt: string;
};

export default function CertifiedTestersPage() {
  const [testers, setTesters] = useState<Tester[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTesters = async () => {
    setLoading(true);
    try {
      const searchParam = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '';
      const res = await fetch(`/api/certified-testers?page=${page}&limit=20${searchParam}`);
      const data = await res.json();

      if (res.ok) {
        setTesters(data.data);
        setTotalPages(data.totalPages);
      } else {
        toast.error(data.error || 'Failed to fetch testers');
      }
    } catch (error) {
      toast.error('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTesters();
  }, [page, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
    fetchTesters();
  };

  const clearSearch = () => {
    setSearchTerm('');
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          ISTQB® Certified Testers
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Verified professionals holding internationally recognized software testing certifications
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, certificate number, certification, or country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Search
            </button>
            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <tr>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Name
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Certificate No
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Certifying Body
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Exam Provider
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Certification
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Country
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700 uppercase tracking-wider text-sm">
                  Certified On
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center">
                    <div className="flex justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                    <p className="mt-2 text-gray-600">Loading certified testers...</p>
                  </td>
                </tr>
              ) : testers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center">
                    <p className="text-gray-600">
                      {searchTerm ? 'No testers found matching your search.' : 'No certified testers found.'}
                    </p>
                  </td>
                </tr>
              ) : (
                testers.map((tester) => (
                  <tr key={tester.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{tester.name}</td>
                    <td className="py-4 px-6 text-blue-600 font-mono">{tester.certificateNumber}</td>
                    <td className="py-4 px-6">{tester.certificateBody}</td>
                    <td className="py-4 px-6">{tester.examProvider}</td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        {tester.certification}
                      </span>
                    </td>
                    <td className="py-4 px-6">{tester.countryOfIssue}</td>
                    <td className="py-4 px-6">
                      {new Date(tester.certificationDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
          <div className="text-sm text-gray-600 mb-4 sm:mb-0">
            Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
            {searchTerm && (
              <span className="ml-2">
                (searching for: <span className="font-medium">"{searchTerm}"</span>)
              </span>
            )}
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                page === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-md text-sm font-medium ${
                page === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 shadow-sm'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}