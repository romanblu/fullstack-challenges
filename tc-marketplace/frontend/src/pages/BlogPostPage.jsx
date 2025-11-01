import { useParams, useNavigate } from "react-router-dom";
import BlogPost from "../components/blog/BlogPost";
import Navbar from "../components/layout/Navbar";
import { useEffect, useState } from "react";
import PostsSelection from "../components/blog/PostsSelection";
import { getFeaturedPosts, getPost } from "../api/blog";
import matter from "front-matter";

export default function BlogPostPage() {
    const { slug } = useParams();
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [post, setPost] = useState(null)

    useEffect(() => {
        try{
            getPost(slug).then((res) => {
                const {attributes, body} = matter(res.data.content)
                setPost({ attributes, body });         
            })

            getFeaturedPosts().then(res => {
                setFeaturedPosts(res.data)
                window.scrollTo(0, 0);
            })

        } catch(err){
            console.error("Could not fetch blog data", err.message)
        }
    }, [slug])


    return (
        <div className="bg-slate-50">
            <Navbar theme="light" />
            <BlogPost post={post} slug={slug}/>
            <div className="text-green-900">
                <PostsSelection
                    posts={featuredPosts}
                    title="Similar Posts"/>
            </div>
            
        </div>
    )
    
}