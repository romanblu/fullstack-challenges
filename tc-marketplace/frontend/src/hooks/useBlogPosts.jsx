import { useEffect, useState } from "react"
import { fetchTopPosts } from "../api/blog"

export const useBlogData = () => {
    const [blogPosts, setBlogPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() =>{
        const fetchBlogData = async () => {
            try{
                const blogPosts = await fetchTopPosts()
                setBlogPosts(blogPosts.data)
            }catch(err){
                console.error("Error loading blog posts: ", err)
                setError(err)
            }finally {
                setLoading(false)
            }
        } 

        fetchBlogData()

    }, [])
    console.log(blogPosts)
    return { blogPosts, loading, error}
}