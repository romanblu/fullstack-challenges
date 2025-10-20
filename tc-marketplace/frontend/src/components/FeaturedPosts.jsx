
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import {blogPosts} from "../data/blogPosts.js";
import PostsSelection from "./PostsSelection.jsx";


const FeaturedPosts = () => {
    const [featuredPosts, setFeaturedPosts] = useState(null);
    useEffect(() => {

    }, [] );
    return (
        <section className="bg-green-950 text-gray-200 ">
            <PostsSelection 
                posts={blogPosts}
                title="Learn About Plant Tissue Culture" 
                subtitle="Discover the science behind plant propagation and how our partner labs cultivate healthy, pest-free plants using modern tissue culture techniques." />
        </section>
    );
}

export default FeaturedPosts;