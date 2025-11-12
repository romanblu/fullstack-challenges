import { useEffect, useState } from "react"
import { getFeaturedPosts } from "../api/blog"
import { getFeaturedProducts } from "../api/product"


export const useHomeData = () => {
    const [featuredPosts, setFeaturedPosts] = useState([])
    const [featuredProducts, setFeaturedProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() =>{
        const fetchHomeData = async () => {
            try{
                const [postsRes, productsRes] = await Promise.all([
                    getFeaturedPosts(),
                    getFeaturedProducts()
                ])
                setFeaturedPosts(postsRes.data)
                setFeaturedProducts(productsRes.data)
            }catch(err){
                console.error("Error loading homepage data: ", err)
                setError(err)
            }finally {
                setLoading(false)
            }
        } 

        fetchHomeData()

    }, [])

    return { featuredPosts, featuredProducts, loading, error}
}