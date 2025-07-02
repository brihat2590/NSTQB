'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

type BoardMember = {
  id: string;
  name: string;
  title: string;
  linkedInUrl: string;
  imageUrl: string;
};

export default function BoardMemberAdminPage() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editData, setEditData] = useState<Partial<BoardMember>>({});
  const [newMember, setNewMember] = useState({
    name: '',
    title: '',
    linkedInUrl: '',
    imageUrl: '',
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    const res = await axios.get('/api/board-members');
    setMembers(res.data);
    setEditIndex(null);
    setEditData({});
  };

  const handleAdd = async () => {
    if (!newMember.name.trim()) return;

    try {
      await axios.post('/api/board-members', newMember);
      setNewMember({ name: '', title: '', linkedInUrl: '', imageUrl: '' });
      fetchMembers();
    } catch (err) {
      console.error('Failed to add member:', err);
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      await axios.put(`/api/board-members/${id}`, editData);
      fetchMembers();
    } catch (err) {
      console.error('Failed to update member:', err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/board-members/${id}`);
      fetchMembers();
    } catch (err) {
      console.error('Failed to delete member:', err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-indigo-700">Board Members Admin</h1>

      {/* Add New Member */}
      <div className="bg-white p-6 rounded-xl shadow mb-10 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-4">Add New Member</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Name"
            value={newMember.name}
            onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Title"
            value={newMember.title}
            onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="url"
            placeholder="LinkedIn URL"
            value={newMember.linkedInUrl}
            onChange={(e) => setNewMember({ ...newMember, linkedInUrl: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={newMember.imageUrl}
            onChange={(e) => setNewMember({ ...newMember, imageUrl: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={handleAdd}
          className={`mt-4 px-6 py-2 text-white rounded-xl transition ${
            !newMember.name.trim()
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
          }`}
          disabled={!newMember.name.trim()}
        >
          Add Member
        </button>
      </div>

      {/* Members List */}
      <div className="space-y-6">
        {members.map((member, index) => (
          <div key={member.id} className="bg-white p-6 rounded-xl shadow border border-gray-200">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full border"
              />
              <div className="flex-1 space-y-2 w-full">
                {editIndex === index ? (
                  <div className="space-y-4 w-full">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={editData.name ?? member.name}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, name: e.target.value }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={editData.title ?? member.title}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, title: e.target.value }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn URL</label>
                      <input
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        value={editData.linkedInUrl ?? member.linkedInUrl}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, linkedInUrl: e.target.value }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                      <input
                        type="url"
                        placeholder="https://example.com/photo.jpg"
                        value={editData.imageUrl ?? member.imageUrl}
                        onChange={(e) =>
                          setEditData((prev) => ({ ...prev, imageUrl: e.target.value }))
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      />
                      {(editData.imageUrl ?? member.imageUrl) && (
                        <img
                          src={editData.imageUrl ?? member.imageUrl}
                          alt="Preview"
                          className="mt-2 w-24 h-24 rounded-full object-cover border border-gray-300"
                        />
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-gray-600">{member.title}</p>
                    <a
                      href={member.linkedInUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      LinkedIn
                    </a>
                  </>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-3">
              {editIndex === index ? (
                <>
                  <button
                    onClick={() => {
                      setEditIndex(null);
                      setEditData({});
                    }}
                    className="px-4 py-2 border rounded-xl hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUpdate(member.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setEditIndex(index);
                      setEditData({ ...member });
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
