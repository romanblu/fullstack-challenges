import { useEffect, useState } from "react";

const BlogDashboard = ({ setActiveTab }) => {
    const [blogPosts, setBlogPosts] =  useState([]);
    
    useEffect(() => {
    
    
    }, []);
    
    const handleCreateBlogPost = () => {
        setActiveTab("newBlogPost");
    }

    return (
        <div className="mx-auto container max-w-[1100px] bg-slate-100 text-center p-6">
            <h1 className="text-xl pb-3">Blog Post List</h1>
            <p>Here you can create and manage your blog posts.</p>
            <h1 className="text-xl py-3" >Nothing to show yet...</h1>
            <button onClick={handleCreateBlogPost} className="bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 px-2 rounded-md shadow-md">Create Blog Post</button>
        </div>    
    )
}

export default BlogDashboard;