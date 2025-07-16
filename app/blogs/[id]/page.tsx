// 

'use client';
import { Suspense, use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, CheckCircle } from 'lucide-react';
import Image from 'next/image';

function BlogContent({ id }: { id: string }) {
  // In a real app, you'd fetch this data based on the ID
  const blog = {
    id,
    title: "The Future of Web Development",
    content: `
      As we dive into 2025, the landscape of web development continues to evolve at an unprecedented pace. 
      From new frameworks to innovative design patterns, developers are constantly adapting to new tools and methodologies.
      
      The rise of AI-powered development tools has transformed how we approach coding, making it more accessible 
      and efficient than ever before. Yet, the fundamental principles of clean code and user-centric design remain crucial.
      
      One of the most significant shifts we're seeing is the increased adoption of edge computing and serverless architectures. 
      These technologies are not just changing how we build applications, but also how we think about scalability and performance.
    `,
    author: "Sarah Johnson",
    date: "Feb 10, 2025",
    readTime: "5 min read",
    category: "Technology"
  };

  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">{blog.category}</span>
          <span className="text-gray-600">{blog.readTime}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200"></div>
          <div>
            <p className="font-medium">{blog.author}</p>
            <p className="text-gray-600">{blog.date}</p>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className="aspect-video bg-gray-100 mb-12 rounded-lg overflow-hidden">
      <Image
          src={`/api/placeholder/1200/675`}
          alt="Featured blog image"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {blog.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-6 text-gray-800 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Tags */}
      <div className="mt-12 pt-8 border-t">
        <div className="flex flex-wrap gap-2">
          {['Web Development', 'Technology', 'Future Trends', 'Programming'].map((tag) => (
            <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function BlogPost({ params }: { params: Promise<{ id: string }> }) {

  const [shared, setShared] = useState(false);
  // const [bookmarked, setBookmarked] = useState(false);
  const { id } = use(params);
  
  function handleShare(event: React.MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();
    const blogUrl = window.location.href; // Get the current URL
    navigator.clipboard.writeText(blogUrl);
    setShared(true);
    alert("Blog link copied to clipboard!");
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 bg-white border-b border-gray-100 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/blogs" className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
            <ArrowLeft size={20} />
            <span>Back to Blogs</span>
          </Link>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={handleShare}>
            {shared ? <CheckCircle size={20} /> : <Share2 size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}>
        <BlogContent id={id} />
      </Suspense>
    </div>
  );
}