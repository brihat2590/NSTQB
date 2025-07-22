'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type Blog = {
  id: string;
  title: string;
  slug: string;
  imageUrl: string;
  content: string;
  summary?: string;
  createdAt: string;
  updatedAt: string;
};

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [form, setForm] = useState<Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '', slug: '', imageUrl: '', content: '', summary: ''
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedBlog, setExpandedBlog] = useState<string | null>(null);

  // Fetch all blogs
  useEffect(() => { 
    fetchBlogs(); 
  }, []);
  
  const fetchBlogs = () => {
    setLoading(true);
    fetch('/api/blogs')
      .then(res => res.json())
      .then(setBlogs)
      .catch(() => toast.error('Failed to fetch blogs'))
      .finally(() => setLoading(false));
  };

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle create or update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (editingId) {
        await fetch(`/api/blogs/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        toast.success('Blog updated successfully!');
      } else {
        await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        toast.success('Blog created successfully!');
      }
      setForm({ title: '', slug: '', imageUrl: '', content: '', summary: '' });
      setEditingId(null);
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  // Prepare form for editing
  const handleEdit = (blog: Blog) => {
    setForm({
      title: blog.title,
      slug: blog.slug,
      imageUrl: blog.imageUrl,
      content: blog.content,
      summary: blog.summary || ''
    });
    setEditingId(blog.id);
    // Scroll to form
    document.getElementById('blog-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Delete a blog
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      setLoading(true);
      try {
        await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
        toast.success('Blog deleted successfully');
        fetchBlogs();
      } catch (error) {
        toast.error('Failed to delete blog');
      } finally {
        setLoading(false);
      }
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setForm({ title: '', slug: '', imageUrl: '', content: '', summary: '' });
    setEditingId(null);
    toast('Editing canceled', { icon: 'ℹ️' });
  };

  // Toggle blog preview
  const toggleExpand = (id: string) => {
    setExpandedBlog(expandedBlog === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      
      
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href={"/admin"}><ArrowLeft/></Link>
            <h1 className="text-3xl font-bold text-gray-800 mt-2">Blog Management</h1>
            <p className="text-gray-600 mt-1">
              {editingId ? 'Editing an existing blog' : 'Create and manage your blog posts'}
            </p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg">
            <span className="font-semibold">{blogs.length}</span> blog posts
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Blog Form */}
          <div 
            id="blog-form"
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {editingId ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input 
                    name="title" 
                    placeholder="Enter blog title" 
                    value={form.title} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
                  <input 
                    name="slug" 
                    placeholder="Enter URL slug" 
                    value={form.slug} 
                    onChange={handleChange} 
                    required 
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input 
                  name="imageUrl" 
                  placeholder="Enter image URL" 
                  value={form.imageUrl} 
                  onChange={handleChange} 
                  required 
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                <textarea 
                  name="summary" 
                  placeholder="Enter a short summary" 
                  value={form.summary} 
                  onChange={handleChange} 
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea 
                  name="content" 
                  placeholder="Enter blog content" 
                  value={form.content} 
                  onChange={handleChange} 
                  required 
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`px-6 py-3 rounded-lg font-medium transition-all ${
                    loading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {editingId 
                    ? (loading ? 'Updating...' : 'Update Blog') 
                    : (loading ? 'Creating...' : 'Create Blog')}
                </button>
                
                {editingId && (
                  <button 
                    type="button" 
                    onClick={handleCancel}
                    disabled={loading}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      loading 
                        ? 'bg-gray-300 cursor-not-allowed' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                    }`}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
          
          {/* Blog List */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Blog Posts</h2>
              <div className="relative">
               
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </div>
            </div>
            
            {loading && blogs.length === 0 ? (
              <div className="text-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading blogs...</p>
              </div>
            ) : blogs.length === 0 ? (
              <div className="text-center py-10">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No blog posts</h3>
                <p className="mt-1 text-gray-500">Get started by creating a new blog post.</p>
              </div>
            ) : (
              <ul className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {blogs.map(blog => (
                  <li 
                    key={blog.id} 
                    className="border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                  >
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg">{blog.title}</h3>
                          <div className="flex items-center mt-1 text-sm text-gray-600">
                            <span className="mr-3">/{blog.slug}</span>
                            <span className="flex items-center">
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                              </svg>
                              {new Date(blog.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(blog)}
                            disabled={loading}
                            className={`p-2 rounded-lg transition-colors ${
                              loading 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                            }`}
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(blog.id)}
                            disabled={loading}
                            className={`p-2 rounded-lg transition-colors ${
                              loading 
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                : 'bg-red-100 text-red-700 hover:bg-red-200'
                            }`}
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => toggleExpand(blog.id)}
                        className="mt-3 text-sm text-blue-600 font-medium flex items-center"
                      >
                        {expandedBlog === blog.id ? 'Hide details' : 'Show details'}
                        <svg 
                          className={`ml-1 w-4 h-4 transition-transform ${
                            expandedBlog === blog.id ? 'rotate-180' : ''
                          }`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </button>
                      
                      {expandedBlog === blog.id && (
                        <div className="mt-4 pt-4 border-t border-gray-100">
                          {blog.imageUrl && (
                            <div className="mb-3">
                              <img 
                                src={blog.imageUrl} 
                                alt={blog.title} 
                                className="w-full h-40 object-cover rounded-lg"
                              />
                            </div>
                          )}
                          <p className="text-gray-700 mb-2">
                            <span className="font-medium">Summary:</span> {blog.summary || 'No summary available'}
                          </p>
                          <p className="text-gray-700 truncate">
                            <span className="font-medium">Content:</span> {blog.content.slice(0, 200)}...
                          </p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}