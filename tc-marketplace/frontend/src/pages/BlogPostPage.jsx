import { useParams, useNavigate } from "react-router-dom";
import BlogPost from "../components/blog/BlogPost";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import PostsSelection from "../components/blog/PostsSelection";

export default function BlogPostPage() {
    const { slug } = useParams();
    
    return (
        <div className="bg-slate-50">
            <Navbar theme="light" />
            <BlogPost slug={slug}/>
            <div className="text-green-900">
                {/* <PostsSelection
                    posts={blogPosts}
                    title="Similar Posts"/> */}
            </div>
            
        </div>
    )
    
}