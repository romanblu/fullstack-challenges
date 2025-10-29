import { useEffect, useState } from "react";
import { fetchMyPosts } from "../api/blog";

const BlogDashboard = ({ setActiveTab }) => {
    const [blogPosts, setBlogPosts] =  useState([]);
    
    useEffect(() => {
        fetchMyPosts().then(res => {
            setBlogPosts(res.data);
        }).catch(err => {
            console.log("Error fetching my blog posts:", err);
        });        
    
    }, []);

    const handleCreateBlogPost = () => {
        setActiveTab("newBlogPost");
    }

    return (
        <div className="mx-auto   bg-slate-100 text-center p-6">
            <div className="mb-4">
                <h1 className="text-xl pb-3">Blog Post List</h1>
                <p>Here you can create and manage your blog posts.</p>
            </div>
            <button onClick={handleCreateBlogPost} className="bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 px-2 rounded-md shadow-md">Create Blog Post</button>
            {blogPosts.length === 0 && <h1 className="text-xl py-3" >Nothing to show yet...</h1>}
        </div>    
    )
}

export default BlogDashboard;