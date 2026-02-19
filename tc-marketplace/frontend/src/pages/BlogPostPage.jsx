import { useParams, useNavigate } from "react-router-dom";
import BlogPost from "../features/blog/BlogPost";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import PostsSelection from "../features/blog/PostsSelection";
import { getFeaturedPosts, getPost } from "../services/blog";
import matter from "front-matter";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useBlogPostData } from "../hooks/useBlogPost";

export default function BlogPostPage() {
    const { slug } = useParams();

    useEffect(() => {
        window.scrollTo({
        top: 0,
        behavior: "smooth"
        })
    },[slug])
    
    const {blogPost, featuredPosts ,loading, error} = useBlogPostData(slug)

    if(loading) return <Loader />
    if(error) return <ErrorMessage message="Could not get blog data"/>


    return (
        <div className="bg-slate-50">
            <Navbar theme="light" />
            <BlogPost post={blogPost} slug={slug}/>
            <div className="text-green-900">
                <PostsSelection
                    posts={featuredPosts}
                    title="Similar Posts"/>
            </div>
            
        </div>
    )
    
}