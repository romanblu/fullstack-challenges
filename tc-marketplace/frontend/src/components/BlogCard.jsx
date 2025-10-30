import { Link } from "react-router-dom";

export default function BlogCard({ post, isAuthorDashboard = false, setActiveTab, setCurrentPost }) {

    const handleEditPost = () => {
        setCurrentPost(post);
        setActiveTab("editBlogPost");
    }

    const ManagementButtons = () => (
        <>
            <button onClick={handleEditPost} className="mt-4 inline-block text-green-700 hover:text-green-900 font-medium">
                Edit Post
            </button>
        </>
    );

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col h-full">
            <img src={post.image} alt={post.title} className="h-48 w-full object-cover rounded-t-xl" />
            <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-green-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 text-sm flex-grow">{post.excerpt}</p>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>{post.author.name}</span>
                    <span>{post.date}</span>
                </div>
                <Link
                to={`/blog/${post.slug}`}
                className="mt-4 inline-block text-green-700 hover:text-green-900 font-medium"
                >
                Read More →
                </Link>
                {isAuthorDashboard && <ManagementButtons />}
            </div>
        </div>
    );

}