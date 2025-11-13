import { useEffect, useState } from "react";
import { fetchMyPosts } from "../../api/blog";
import BlogCard from "./BlogCard";
import Loader from "../../components/ui/Loader";
import ErrorMessage from '../../components/ui/ErrorMessage'
const BlogDashboard = ({ setActiveTab, setCurrentPost }) => {
    const [blogPosts, setBlogPosts] =  useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const loadPosts = async () => {
            try{
                const res = await fetchMyPosts()
                setBlogPosts(res.data || [])
            }catch(err){
                console.error("Error fetching my blog posts:", err);
                setError("Failed to load posts. Please try again later.");
            }finally{
                setLoading(false)
            }
        }

        loadPosts()
    
    }, []);

    const handleCreateBlogPost = () => {
        setActiveTab("newBlogPost");
    }

    if(loading) return <Loader />
    if(error) return <ErrorMessage message={error.message}/>

    return (
        <div className="mx-auto   bg-slate-100 text-center p-6 container max-w-[1100px]">
            <div className="mb-4">
                <h1 className="text-xl pb-3">Blog Post List</h1>
                <p>Here you can create and manage your blog posts.</p>
            </div>
            <button onClick={handleCreateBlogPost} className="bg-lime-500 hover:bg-lime-600 text-green-950 font-semibold py-2 px-4 rounded-md shadow-md transition">Create Blog Post</button>
            {
                blogPosts.length === 0 ? 
                <h1 className="text-xl py-3" >Nothing to show yet...</h1> 
                :
                <div className="mt-6 ">
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center ">
                        {
                            blogPosts.length !== 0 && blogPosts.map((post) => (
                                <BlogCard key={post._id} post={post} isAuthorDashboard={true} onEditPost={(post) => {setActiveTab("editBlogPost"); setCurrentPost(post)}}/>
                            ))
                        }
                    </div>
                </div>                
            }
        </div>    
    )
}

export default BlogDashboard;