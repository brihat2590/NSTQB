'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

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
  const [featuredBlog, setFeaturedBlog] = useState<Blog | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setFeaturedBlog(data[0] || null);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  const recentBlogs = blogs.slice(0, 5);
  const otherBlogs = blogs.slice(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-12">
            {/* Featured blog skeleton */}
            <div className="relative h-80 bg-gray-200 rounded-xl animate-pulse">
              <div className="absolute inset-0 flex items-end p-8">
                <div className="space-y-4 w-full max-w-2xl">
                  <div className="h-3 bg-gray-300 rounded w-20"></div>
                  <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            
            {/* Grid skeleton */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
                    <div className="h-5 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
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
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Featured Blog Section */}
        {featuredBlog && (
          <div className="mb-16">
            <Link href={`/blogs/${featuredBlog.slug}`}>
              <div className="relative group cursor-pointer">
                <div className="relative h-80 rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                  {/* Background image with subtle overlay */}
                  <div className="absolute inset-0">
                    <img 
                      src={featuredBlog.imageUrl} 
                      alt={featuredBlog.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-gray-900/50"></div>
                  </div>
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 flex items-end p-8">
                    <div className="text-white max-w-2xl">
                      {/* Featured badge */}
                      <div className="inline-flex items-center bg-blue-600 px-3 py-1 rounded-md text-xs font-medium mb-4">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                        Featured
                      </div>
                      
                      <h1 className="text-3xl font-bold mb-3 leading-tight group-hover:text-gray-200 transition-colors duration-300">
                        {featuredBlog.title}
                      </h1>
                      
                      <p className="text-gray-200 mb-4 leading-relaxed">
                        {featuredBlog.summary || `${featuredBlog.content.slice(0, 120).trim()}...`}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <time className="text-sm text-gray-300">
                          {new Date(featuredBlog.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </time>
                        
                        <div className="flex items-center text-white hover:text-red-400 transition-colors duration-300">
                          <span className="text-sm font-medium mr-2">Read Article</span>
                          <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid lg:grid-cols-4 gap-8">
          <main className="lg:col-span-3">
            {/* Section header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Latest Articles</h2>
              <div className="w-12 h-0.5 bg-blue-600"></div>
            </div>

            {/* Articles grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherBlogs.map((blog, index) => (
                <article 
                  key={blog.id} 
                  className="group"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                  onMouseEnter={() => setHoveredId(blog.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <Link href={`/blogs/${blog.slug}`}>
                    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <img 
                          src={blog.imageUrl} 
                          alt={blog.title} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                        
                        {/* Date badge */}
                        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded text-xs font-medium text-gray-700 shadow-sm">
                          {new Date(blog.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors duration-300">
                          {blog.title}
                        </h3>
                        
                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mb-3">
                          {blog.summary || `${blog.content.slice(0, 100).trim()}...`}
                        </p>
                        
                        {/* Read more */}
                        <div className="flex items-center text-red-600 font-medium text-sm group-hover:text-red-700 transition-colors duration-300">
                          <span>Read more</span>
                          <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Recent posts */}
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <div className="w-1 h-5 bg-blue-600 mr-3 rounded"></div>
                  Recent Posts
                </h3>
                
                <div className="space-y-4">
                  {recentBlogs.map((blog, index) => (
                    <Link key={blog.id} href={`/blogs/${blog.slug}`}>
                      <div className="flex gap-3 group hover:bg-gray-50 p-2 rounded-md transition-colors duration-200">
                        <img 
                          src={blog.imageUrl} 
                          alt={blog.title} 
                          className="w-12 h-12 object-cover rounded flex-shrink-0" 
                        />
                        
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight mb-1 group-hover:text-blue-600 transition-colors duration-200">
                            {blog.title}
                          </h4>
                          <time className="text-xs text-gray-500">
                            {new Date(blog.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </time>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Newsletter signup */}
              <div className="bg-gray-900 rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                <p className="text-gray-300 text-sm mb-4">
                  Get the latest articles delivered to your inbox.
                </p>
                <div className="bg-gray-800 rounded-md p-3 text-center">
                  <p className="text-gray-400 text-xs">Newsletter coming soon</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}