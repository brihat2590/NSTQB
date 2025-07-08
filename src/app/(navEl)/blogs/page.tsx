'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import BlogCarousel from '@/components/BlogCarousel';

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

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    fetch('/api/blogs').then(res => res.json()).then(setBlogs);
  }, []);

  const recentBlogs = blogs.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogCarousel />

        <div className="grid lg:grid-cols-4 gap-6">
          <main className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-4">
              {blogs.map(blog => (
                <article key={blog.id} className="bg-white border border-gray-200 h-full flex flex-col">
                  <Link href={`/blogs/${blog.slug}`}>
                    <div className="aspect-square h-48 w-full rounded-sm  overflow-hidden">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        className="w-full h-full object-cover cursor-pointer hover:opacity-90 transition-opacity" 
                      />
                    </div>
                  </Link>
                  <div className="p-3 flex-1 flex flex-col">
                    <Link href={`/blogs/${blog.slug}`}>
                      <h2 className="text-sm font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 flex-1">
                      {blog.summary || blog.content.slice(0, 80) + '...'}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs text-gray-500">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </span>
                      <Link href={`/blogs/${blog.slug}`}>
                        <span className="text-blue-600 hover:text-blue-800 font-medium text-xs transition-colors cursor-pointer">
                          Read →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </main>

          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white border-l-2 border-gray-200 pl-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-6">
                  Recent Posts
                </h2>
                <div className="space-y-4">
                  {recentBlogs.map(blog => (
                    <div key={blog.id} className="group">
                      <Link href={`/blogs/${blog.slug}`}>
                        <div className="flex items-start space-x-3 py-2 hover:bg-gray-50 transition-colors cursor-pointer">
                          <div className="flex-shrink-0 w-12 h-12 overflow-hidden">
                            <img 
                              src={blog.imageUrl} 
                              alt={blog.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors">
                              {blog.title}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}