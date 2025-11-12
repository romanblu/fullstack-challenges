import { useEffect, useState } from "react";
import BlogCard from "../features/blog/BlogCard";
import Navbar from "../components/layout/Navbar";
import { fetchTopPosts } from "../api/blog";
import { useBlogData } from "../hooks/useBlogPosts";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";

const Blog = () => {
    const {blogPosts, loading, error} = useBlogData()
    
    if(loading) return <Loader />
    if(error) return <ErrorMessage message="Error getting blog posts data"/>

    return (
    <section className="bg-slate-50  px-6 text-green-950 min-h-screen">
        <Navbar theme="light" />
        <div className="container max-w-[1100px] mx-auto pt-8">
            <h1 className="text-3xl font-bold text-center mb-2.5">Our Blog</h1>
            <p className="text-center text-[20px]">Grow your knowledge — discover tips, techniques, and stories from experienced tissue culture enthusiasts.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {blogPosts.map(post => (
                <BlogCard key={post._id} post={post} />
            ))}
            </div>
        </div>
    </section>
    )
}

export default Blog;