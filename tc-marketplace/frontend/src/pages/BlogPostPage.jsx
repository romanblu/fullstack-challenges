import { useParams, useNavigate } from "react-router-dom";
import BlogPost from "../components/BlogPost";
import Navbar from "../components/Navbar";
import { blogPosts } from "../data/blogPosts";
import { useEffect } from "react";
import PostsSelection from "../components/PostsSelection";

export default function BlogPostPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const post = blogPosts.find(post => post.slug === slug)
    
    useEffect(() => {
        if(!post ) navigate('/blog', { replace: true });
    })

    return (
        <div className="bg-slate-50">
            <Navbar theme="light" />
            <BlogPost slug={slug}/>
            <div className="text-green-900">
                <PostsSelection
                    posts={blogPosts}
                    title="Similar Posts"/>
            </div>
            
        </div>
    )
    
}