import BlogCard from "./BlogCard"

const PostsSelection = ({ posts, title, subtitle }) => {

    return (
        <div className="px-10 py-16">
            <div className="container max-w-[1100px] mx-auto text-center mb-10 ">
                { title && <h2 className="text-3xl font-bold mb-3">{ title }</h2> }
                { subtitle && <p className="text-lg ">{ subtitle }</p> }
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-green-900 container max-w-[1100px] mx-auto">
                {posts.map(post => (
                    <BlogCard key={post._id} post={post} />
                ))}
                
            </div>
        </div>
    )
}

export default PostsSelection