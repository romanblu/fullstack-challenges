import { useEffect, useState } from "react"
import matter from "front-matter";
import { getFeaturedPosts, getPost } from "../services/blog"

export const useBlogPostData = (slug) => {
    const [blogPost, setBlogPost] = useState(null)
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() =>{
        const fetchBlogData = async () => {
            try{
                
                const blogPostRes = await getPost(slug)
                const {attributes, body} = matter(blogPostRes.data.content)
                setBlogPost({attributes, body })
                
                const featuredPostsRes = await getFeaturedPosts()  
                setFeaturedPosts(featuredPostsRes.data)
            }catch(err){
                console.error("Error loading blog post data: ", err)
                setError(err)
            }finally {
                setLoading(false)
            }
        } 

        fetchBlogData()

    }, [slug])

    return { blogPost, featuredPosts, loading, error}
}