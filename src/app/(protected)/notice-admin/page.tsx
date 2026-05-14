'use client';

import { ArrowLeft, Upload, Trash2, Edit2, FileText } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Notice = {
  id: string;
  title: string;
  content: string;
  fileUrl?: string | null;
  fileName?: string | null;
  published: boolean;
  endDate: string;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  title: string;
  content: string;
  fileUrl: string;
  fileName: string;
  published: boolean;
  endDate: string;
};

const emptyForm: FormState = {
  title: '',
  content: '',
  fileUrl: '',
  fileName: '',
  published: true,
  endDate: '',
};

export default function NoticeAdminPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = () => {
    setLoading(true);
    fetch('/api/notices')
      .then((r) => r.json())
      .then(setNotices)
      .catch(() => toast.error('Failed to fetch notices'))
      .finally(() => setLoading(false));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.secure_url) {
        setForm((f) => ({ ...f, fileUrl: data.secure_url, fileName: file.name }));
        toast.success('File uploaded');
      } else {
        toast.error('Upload failed');
      }
    } catch {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.endDate) {
      toast.error('Please choose an end date');
      return;
    }
    setLoading(true);
    try {
      const url = editingId ? `/api/notices/${editingId}` : '/api/notices';
      const method = editingId ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      toast.success(editingId ? 'Notice updated' : 'Notice published');
      setForm(emptyForm);
      setEditingId(null);
      fetchNotices();
    } catch {
      toast.error('Failed to save notice');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (n: Notice) => {
    setEditingId(n.id);
    setForm({
      title: n.title,
      content: n.content,
      fileUrl: n.fileUrl || '',
      fileName: n.fileName || '',
      published: n.published,
      endDate: n.endDate.slice(0, 10),
    });
    document.getElementById('notice-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this notice?')) return;
    setLoading(true);
    try {
      await fetch(`/api/notices/${id}`, { method: 'DELETE' });
      toast.success('Notice deleted');
      fetchNotices();
    } catch {
      toast.error('Failed to delete');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin">
              <ArrowLeft />
            </Link>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">Notice Management</h1>
            <p className="text-gray-600 mt-1">
              {editingId ? 'Editing an existing notice' : 'Publish a new notice'}
            </p>
          </div>
          <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-lg">
            <span className="font-semibold">{notices.length}</span> notices
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div
            id="notice-form"
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingId ? 'Edit Notice' : 'New Notice'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  name="title"
                  placeholder="Notice title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
                <p className="text-xs text-gray-400 mt-1">{form.title.length}/200</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  name="content"
                  placeholder="Write the notice text..."
                  value={form.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Attachment (optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-lg cursor-pointer hover:bg-amber-200">
                    <Upload className="w-4 h-4" />
                    {uploading ? 'Uploading...' : 'Choose file'}
                    <input
                      type="file"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                  {form.fileUrl && (
                    <div className="flex items-center gap-2 text-sm">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <a
                        href={form.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline truncate max-w-[200px]"
                      >
                        {form.fileName || 'Uploaded file'}
                      </a>
                      <button
                        type="button"
                        onClick={() =>
                          setForm((f) => ({ ...f, fileUrl: '', fileName: '' }))
                        }
                        className="text-red-500 text-xs"
                      >
                        remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Display end date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="published"
                      checked={form.published}
                      onChange={handleChange}
                      className="w-4 h-4"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Published
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    loading || uploading
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-amber-600 hover:bg-amber-700 text-white'
                  }`}
                >
                  {editingId
                    ? loading
                      ? 'Updating...'
                      : 'Update Notice'
                    : loading
                    ? 'Publishing...'
                    : 'Publish Notice'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-6 py-3 rounded-lg font-medium bg-gray-200 hover:bg-gray-300 text-gray-800"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">All Notices</h2>
            {loading && notices.length === 0 ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500 mx-auto" />
              </div>
            ) : notices.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No notices yet.</p>
            ) : (
              <ul className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                {notices.map((n) => {
                  const expired = new Date(n.endDate) < new Date();
                  return (
                    <li
                      key={n.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-amber-300"
                    >
                      <div className="flex justify-between items-start gap-2">
                        <div className="min-w-0">
                          <h3 className="font-bold text-gray-800">{n.title}</h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {n.content}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2 text-xs">
                            <span
                              className={`px-2 py-0.5 rounded ${
                                n.published
                                  ? 'bg-green-100 text-green-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {n.published ? 'Published' : 'Draft'}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded ${
                                expired
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-blue-100 text-blue-700'
                              }`}
                            >
                              {expired ? 'Expired' : 'Active'} ·{' '}
                              {new Date(n.endDate).toLocaleDateString()}
                            </span>
                            {n.fileUrl && (
                              <a
                                href={n.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="px-2 py-0.5 rounded bg-amber-100 text-amber-700 underline"
                              >
                                attachment
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            onClick={() => handleEdit(n)}
                            className="p-2 rounded-lg bg-amber-100 text-amber-700 hover:bg-amber-200"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(n.id)}
                            className="p-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
