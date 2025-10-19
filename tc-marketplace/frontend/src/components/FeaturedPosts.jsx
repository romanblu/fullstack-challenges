
import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import {blogPosts} from "../data/blogPosts.js";


const FeaturedPosts = () => {
    const [featuredPosts, setFeaturedPosts] = useState(null);
    useEffect(() => {

    }, [] );
    return (
        <section className="bg-green-950 text-white  px-10 py-16">
            <div className="container max-w-[1100px] mx-auto text-center mb-10 ">
                <h2 className="text-3xl font-bold mb-3">Learn About Plant Tissue Culture</h2>
                <p className="text-lg text-gray-200">
                    Discover the science behind plant propagation and how our partner labs
                    cultivate healthy, pest-free plants using modern tissue culture techniques.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-green-900 container max-w-[1100px] mx-auto">
                {blogPosts.map(post => (
                    <BlogCard key={post.slug} post={post} />
                ))}
                
            </div>
        </section>
    );
}

export default FeaturedPosts;