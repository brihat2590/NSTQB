'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { toast } from 'sonner';

type BoardMember = {
  id: string;
  name: string;
  title: string;
  linkedInUrl: string;
  imageUrl: string;
};

function SortableItem({
  member,
  onDelete,
  onEditClick,
}: {
  member: BoardMember;
  onDelete: (id: string) => void;
  onEditClick: (member: BoardMember) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-4 md:p-6 rounded-xl shadow border flex flex-col md:flex-row items-center gap-4"
    >
      {/* Drag Handle */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab p-3 rounded bg-gray-200 hover:bg-gray-300 select-none flex items-center justify-center"
        title="Drag handle"
        style={{ touchAction: 'none' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
        </svg>
      </div>

      <img
        src={member.imageUrl}
        alt={member.name}
        className="w-20 h-20 rounded-full object-cover border"
      />
      <div className="flex-1 space-y-1 w-full">
        <h3 className="text-xl font-bold">{member.name}</h3>
        <p className="text-gray-600">{member.title}</p>
        <a
          href={member.linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
          onClick={(e) => e.stopPropagation()}
        >
          LinkedIn
        </a>
      </div>

      <div className="flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(member);
          }}
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          type="button"
        >
          Edit
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(member.id);
          }}
          className="px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          type="button"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default function BoardMemberAdminPage() {
  const [members, setMembers] = useState<BoardMember[]>([]);
  const [newMember, setNewMember] = useState({
    name: '',
    title: '',
    linkedInUrl: '',
    imageUrl: '',
  });

  // State for currently editing member
  const [editingMember, setEditingMember] = useState<BoardMember | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { delay: 150, tolerance: 5 } }));

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await axios.get('/api/board-members');
      setMembers(res.data);
    } catch {
      toast.error('Failed to fetch members');
    }
  };

  const handleAdd = async () => {
    if (!newMember.name.trim()) return;

    try {
      await axios.post('/api/board-members', newMember);
      setNewMember({ name: '', title: '', linkedInUrl: '', imageUrl: '' });
      toast.success('Member added');
      fetchMembers();
    } catch {
      toast.error('Failed to add member');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/board-members/${id}`);
      toast.success('Member deleted');
      fetchMembers();
    } catch {
      toast.error('Failed to delete member');
    }
  };

  const handleEditSave = async (updated: BoardMember) => {
    try {
      await axios.put(`/api/board-members/${updated.id}`, updated);
      toast.success('Member updated');
      fetchMembers();
      setEditingMember(null); // close edit panel
    } catch {
      toast.error('Failed to update member');
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = members.findIndex((m) => m.id === active.id);
      const newIndex = members.findIndex((m) => m.id === over.id);

      const newMembers = arrayMove(members, oldIndex, newIndex);
      setMembers(newMembers);

      try {
        await axios.post('/api/board-members/reorder', {
          ids: newMembers.map((m) => m.id),
        });
        toast.success('Order updated');
      } catch {
        toast.error('Failed to update order');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h2 className="text-3xl font-bold mb-6 text-indigo-700">
          Board Members Admin (Drag to Reorde from left side icons ) 
        </h2>

        {/* Add New Member */}
        <div className="bg-white p-6 rounded-xl shadow mb-8 border border-gray-200">
          <h3 className="text-xl font-semibold mb-4">Add New Member</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
            <input
              type="text"
              placeholder="Title"
              value={newMember.title}
              onChange={(e) => setNewMember({ ...newMember, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
            <input
              type="url"
              placeholder="LinkedIn URL"
              value={newMember.linkedInUrl}
              onChange={(e) => setNewMember({ ...newMember, linkedInUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
            />
            <input
              type="url"
              placeholder="Image URL"
              value={newMember.imageUrl}
              onChange={(e) => setNewMember({ ...newMember, imageUrl: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl"
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
            type="button"
          >
            Add Member
          </button>
        </div>

        {/* Drag and Drop List */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={members.map((m) => m.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-6">
              {members.map((member) => (
                <SortableItem
                  key={member.id}
                  member={member}
                  onDelete={handleDelete}
                  onEditClick={setEditingMember}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Edit Panel */}
      {editingMember && (
        <EditPanel
          member={editingMember}
          onClose={() => setEditingMember(null)}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}

function EditPanel({
  member,
  onClose,
  onSave,
}: {
  member: BoardMember;
  onClose: () => void;
  onSave: (updated: BoardMember) => void;
}) {
  const [editData, setEditData] = useState(member);

  const handleChange = (field: keyof BoardMember, value: string) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(editData);
  };

  return (
    <div className="w-full md:w-96 p-6 bg-white rounded-xl shadow border border-gray-300 sticky top-6 self-start">
      <h3 className="text-2xl font-bold mb-4">Edit Member</h3>
      <div className="space-y-3">
        <input
          type="text"
          value={editData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Name"
        />
        <input
          type="text"
          value={editData.title}
          onChange={(e) => handleChange('title', e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Title"
        />
        <input
          type="url"
          value={editData.linkedInUrl}
          onChange={(e) => handleChange('linkedInUrl', e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="LinkedIn URL"
        />
        <input
          type="url"
          value={editData.imageUrl}
          onChange={(e) => handleChange('imageUrl', e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Image URL"
        />
      </div>

      <div className="mt-6 flex justify-between">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
