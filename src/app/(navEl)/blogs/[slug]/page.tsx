'use client';

import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

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
// async function fetchBlog(slug:string):Promise<Blog|null>{
//   const res=await fetch(`api/blogs/${slug}`,{cache:"no-store"});
//   if(!res.ok) return null;
//   return res.json();
// }
// export async function generateMetadata({params}:{params: Promise<{slug:string}>}){
//   const {slug}=await params;
//   const blog=await fetchBlog(slug);
  


// }

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const router = useRouter();
  const { slug } = use(params);

  useEffect(() => {
    fetch('/api/blogs')
      .then(res => res.json())
      .then((data: Blog[]) => setBlog(data.find(b => b.slug === slug) || null));
  }, [slug]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200">
        {/* <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Blog
          </button>
        </div> */}
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <article className="bg-white">
          {/* Hero Image */}
          <div className="mb-12">
            <img 
              src={blog.imageUrl} 
              alt={blog.title} 
              className="w-full h-96 object-cover" 
            />
          </div>

          {/* Content */}
          <div className="max-w-4xl mx-auto px-8 pb-12">
            {/* Title */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
                {blog.title}
              </h1>
              
              {/* Meta Information */}
              <div className="flex items-center text-sm text-gray-500 space-x-6">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
                {blog.createdAt !== blog.updatedAt && (
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Updated {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                )}
              </div>
            </header>

            {/* Summary */}
            {blog.summary && (
              <div className="mb-8 p-6 bg-gray-50 border-l-4 border-blue-600">
                <p className="text-lg text-gray-700 italic leading-relaxed">
                  {blog.summary}
                </p>
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  <p>Published on {new Date(blog.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                </div>
                
                <button
                  onClick={() => router.back()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Blog
                </button>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
}