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

  const fetchTesters = async () => {
    try {
      const res = await fetch(`/api/certified-testers?page=${page}&limit=10`);
      const data = await res.json();

      if (res.ok) {
        setTesters(data.data);
        setTotalPages(data.totalPages);
      } else {
        toast.error(data.error || 'Failed to fetch testers');
      }
    } catch (error) {
      toast.error('Failed to connect to server');
    }
  };

  useEffect(() => {
    fetchTesters();
  }, [page]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Certified Testers</h2>

      <div className="overflow-x-auto">
        <table className="w-full table-auto border border-gray-300 text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Certificate Number</th>
              <th className="border px-2 py-1">Certificate Body</th>
              <th className="border px-2 py-1">Exam Provider</th>
              <th className="border px-2 py-1">Certification</th>
              <th className="border px-2 py-1">Country</th>
              <th className="border px-2 py-1">Certification Date</th>
              
            </tr>
          </thead>
          <tbody>
            {testers.map((tester) => (
              <tr key={tester.id} className="border-t">
                <td className="border px-2 py-1">{tester.name}</td>
                <td className="border px-2 py-1">{tester.certificateNumber}</td>
                <td className="border px-2 py-1">{tester.certificateBody}</td>
                <td className="border px-2 py-1">{tester.examProvider}</td>
                <td className="border px-2 py-1">{tester.certification}</td>
                <td className="border px-2 py-1">{tester.countryOfIssue}</td>
                <td className="border px-2 py-1">
                  {new Date(tester.certificationDate).toLocaleDateString()}
                </td>
                {/* <td className="border px-2 py-1">
                  {new Date(tester.createdAt).toLocaleString()}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
