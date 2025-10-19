import BlogCard from "../components/BlogCard";
import Navbar from "../components/Navbar";
import { blogPosts } from "../data/blogPosts";

const Blog = () => {
    return (
    <section className="bg-slate-50 py-6 px-6 text-green-950 min-h-screen">
        <Navbar theme="light" />
        <div className="container max-w-[1100px] mx-auto pt-8">
            <h1 className="text-3xl font-bold text-center mb-2.5">Our Blog</h1>
            <p className="text-center text-[20px]">Grow your knowledge — discover tips, techniques, and stories from experienced tissue culture enthusiasts.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {blogPosts.map(post => (
                <BlogCard key={post.id} post={post} />
            ))}
            </div>
        </div>
    </section>
    )
}

export default Blog;