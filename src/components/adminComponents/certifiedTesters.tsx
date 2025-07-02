"use client"
import React, { useState, useEffect } from 'react';
import { Edit, Trash2, Save, X, Plus, Search, AlertCircle, CheckCircle } from 'lucide-react';

type Tester = {
  id: string;
  name: string;
  certificateNumber: string;
  certificateBody: string;
  examProvider: string;
  certification: string;
  countryOfIssue: string;
  certificationDate: string;
};

type AlertType = 'success' | 'error' | 'info';

interface Alert {
  type: AlertType;
  message: string;
}

export default function CertifiedTestersAdmin() {
  const [testers, setTesters] = useState<Tester[]>([]);
  const [filteredTesters, setFilteredTesters] = useState<Tester[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [alert, setAlert] = useState<Alert | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    certificateNumber: '',
    certificateBody: '',
    examProvider: '',
    certification: '',
    countryOfIssue: '',
    certificationDate: '',
  });

  // Show alert with auto-dismiss
  const showAlert = (type: AlertType, message: string) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 5000);
  };

  // Fetch testers list on mount
  useEffect(() => {
    async function fetchTesters() {
      try {
        setLoading(true);
        const res = await fetch('/api/certified-testers');
        if (!res.ok) throw new Error('Failed to fetch testers');
        const response = await res.json();
        
        // Handle your API response format: { data: testers, totalPages, currentPage }
        const testersArray = Array.isArray(response.data) ? response.data : [];
        setTesters(testersArray);
        setFilteredTesters(testersArray);
        showAlert('success', `Loaded ${testersArray.length} certified testers`);
      } catch (error: any) {
        console.error('Fetch error:', error);
        showAlert('error', error.message || 'Failed to load testers');
        // Set empty arrays on error to prevent map errors
        setTesters([]);
        setFilteredTesters([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTesters();
  }, []);

  // Filter testers based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredTesters(testers);
    } else {
      const filtered = testers.filter(tester =>
        Object.values(tester).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredTesters(filtered);
    }
  }, [searchTerm, testers]);

  const startEdit = (tester: Tester) => {
    setEditingId(tester.id);
    setIsCreating(false);
    setFormData({
      name: tester.name,
      certificateNumber: tester.certificateNumber,
      certificateBody: tester.certificateBody,
      examProvider: tester.examProvider,
      certification: tester.certification,
      countryOfIssue: tester.countryOfIssue,
      certificationDate: tester.certificationDate.slice(0, 10),
    });
  };

  const startCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      name: '',
      certificateNumber: '',
      certificateBody: '',
      examProvider: '',
      certification: '',
      countryOfIssue: '',
      certificationDate: '',
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData({
      name: '',
      certificateNumber: '',
      certificateBody: '',
      examProvider: '',
      certification: '',
      countryOfIssue: '',
      certificationDate: '',
    });
  };

  const createNewTester = async () => {
    // Basic validation
    if (!formData.name.trim() || !formData.certificateNumber.trim()) {
      showAlert('error', 'Name and Certificate Number are required');
      return;
    }

    try {
      // Prepare data with proper date formatting
      const createData = {
        ...formData,
        // Convert date string to ISO format if provided
        certificationDate: formData.certificationDate ? new Date(formData.certificationDate).toISOString() : new Date().toISOString()
      };

      const res = await fetch('/api/certified-testers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createData),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Create error:', err);
        throw new Error(err.error || 'Failed to create tester');
      }

      const response = await res.json();
      // Handle your API response format: { message: newTester }
      const newTester = response.message || response;
      
      setTesters(prev => [newTester, ...prev]);
      setIsCreating(false);
      setFormData({
        name: '',
        certificateNumber: '',
        certificateBody: '',
        examProvider: '',
        certification: '',
        countryOfIssue: '',
        certificationDate: '',
      });
      showAlert('success', 'New tester added successfully');
    } catch (error: any) {
      console.error('Create error:', error);
      showAlert('error', error.message || 'Failed to add new tester');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    // Basic validation
    if (!formData.name.trim() || !formData.certificateNumber.trim()) {
      showAlert('error', 'Name and Certificate Number are required');
      return;
    }

    try {
      // Prepare data with proper date formatting
      const updateData = {
        ...formData,
        // Convert date string to ISO format if provided
        certificationDate: formData.certificationDate ? new Date(formData.certificationDate).toISOString() : formData.certificationDate
      };

      const res = await fetch(`/api/certified-testers/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Update error:', err);
        throw new Error(err.error || 'Update failed');
      }

      const updatedTester = await res.json();
      setTesters(prev =>
        prev.map(t => (t.id === editingId ? updatedTester : t))
      );
      setEditingId(null);
      showAlert('success', 'Tester updated successfully');
    } catch (error: any) {
      console.error('Update error:', error);
      showAlert('error', error.message || 'Failed to update tester');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete ${name}? This action cannot be undone.`)) return;

    try {
      const res = await fetch(`/api/certified-testers/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Delete failed');
      }

      setTesters(prev => prev.filter(t => t.id !== id));
      showAlert('success', `${name} deleted successfully`);
    } catch (error: any) {
      showAlert('error', error.message || 'Failed to delete tester');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString.slice(0, 10);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading testers...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-8xl mx-auto p-6  min-h-screen">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Certified Testers</h1>
            <p className="text-gray-600">Manage certified testers and their credentials</p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center space-x-3">
          <button
              onClick={startCreate}
              className="inline-flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <Plus className="h-4 w-4 mr-1 sm:mr-2" />
              Add New Tester
            </button>

            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {filteredTesters.length} Total Testers
            </span>
          </div>
        </div>
      </div>

      {/* Alert */}
      {alert && (
        <div className={`mb-6 p-4 rounded-lg border ${
          alert.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
          alert.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
          'bg-blue-50 border-blue-200 text-blue-800'
        }`}>
          <div className="flex items-center">
            {alert.type === 'success' ? <CheckCircle className="h-5 w-5 mr-2" /> : 
             <AlertCircle className="h-5 w-5 mr-2" />}
            {alert.message}
          </div>
        </div>
      )}

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search testers by name, certificate number, or any field..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificate Body</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exam Provider</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certification</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Country</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Create New Tester Row */}
              {isCreating && (
                <tr className="bg-green-50 border-2 border-green-200">
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Name *"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="certificateNumber"
                      value={formData.certificateNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Certificate Number *"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="certificateBody"
                      value={formData.certificateBody}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Certificate Body"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="examProvider"
                      value={formData.examProvider}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Exam Provider"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="certification"
                      value={formData.certification}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Certification"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="countryOfIssue"
                      value={formData.countryOfIssue}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      placeholder="Country"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="date"
                      name="certificationDate"
                      value={formData.certificationDate}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={createNewTester}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <Save className="h-4 w-4 mr-1" />
                        Create
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </button>
                    </div>
                  </td>
                </tr>
              )}

              {!Array.isArray(filteredTesters) || filteredTesters.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? 'No testers found matching your search.' : 'No certified testers found.'}
                  </td>
                </tr>
              ) : (
                filteredTesters.map(tester =>
                  editingId === tester.id ? (
                    <tr key={tester.id} className="bg-blue-50">
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Name"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="certificateNumber"
                          value={formData.certificateNumber}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Certificate Number"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="certificateBody"
                          value={formData.certificateBody}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Certificate Body"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="examProvider"
                          value={formData.examProvider}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Exam Provider"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="certification"
                          value={formData.certification}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Certification"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="text"
                          name="countryOfIssue"
                          value={formData.countryOfIssue}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Country"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <input
                          type="date"
                          name="certificationDate"
                          value={formData.certificationDate}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={handleUpdate}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                          >
                            <Save className="h-4 w-4 mr-1" />
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={tester.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{tester.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tester.certificateNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tester.certificateBody}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tester.examProvider}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tester.certification}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tester.countryOfIssue}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(tester.certificationDate)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => startEdit(tester)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tester.id, tester.name)}
                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}