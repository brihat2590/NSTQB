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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const recentBlogs = blogs.slice(0, 5);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-8 w-1/3"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="bg-gray-200 h-48 w-full"></div>
                  <div className="p-5">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/5"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        

        <BlogCarousel />

        <div className="grid lg:grid-cols-4 gap-10 mt-16">
          <main className="lg:col-span-3">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">All Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map(blog => (
                <article 
                  key={blog.id} 
                  className="bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <Link href={`/blogs/${blog.slug}`} aria-label={blog.title}>
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={blog.imageUrl} 
                        alt={blog.title} 
                        width={400}
                        height={400}
                        loading="lazy"
                        className="w-full h-full object-cover transition-all duration-500 hover:scale-105" 
                      />
                    </div>
                  </Link>
                  <div className="p-5">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <time 
                        dateTime={new Date(blog.createdAt).toISOString()}
                        className="mr-3"
                      >
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </time>
                      
                    </div>
                    <Link href={`/blogs/${blog.slug}`}>
                      <h2 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer line-clamp-2">
                        {blog.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                      {blog.summary || `${blog.content.slice(0, 100).trim()}...`}
                    </p>
                    <Link 
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors group"
                      aria-label={`Read ${blog.title}`}
                    >
                      Read more
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </main>

          <aside className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                  Recent Posts
                </h2>
                <ul className="space-y-5">
                  {recentBlogs.map(blog => (
                    <li key={blog.id} className="group">
                      <Link href={`/blogs/${blog.slug}`} aria-label={blog.title}>
                        <div className="flex items-start space-x-4 py-2">
                          <div className="flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg">
                            <img 
                              src={blog.imageUrl} 
                              alt={blog.title} 
                              width={64}
                              height={64}
                              loading="lazy"
                              className="w-full h-full object-cover transition-opacity group-hover:opacity-90" 
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {blog.title}
                            </h3>
                            <time 
                              dateTime={new Date(blog.createdAt).toISOString()}
                              className="text-xs text-gray-500 mt-1 block"
                            >
                              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </time>
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}