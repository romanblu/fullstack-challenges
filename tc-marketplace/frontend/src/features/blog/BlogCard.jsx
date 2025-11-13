import { Link, useNavigate } from "react-router-dom";
import { parseDate } from "../../utils/parseDate";

export default function BlogCard({ 
        post, 
        isAuthorDashboard = false, 
        onEditPost
    }) {

    if(!post) return null

    const {title,excerpt, image, author, date, slug, published} = post

    const handleEditPost = () => {
        if(onEditPost) onEditPost(post)
    }

    return (
        <div className="bg-white rounded-xl shadow hover:shadow-lg transition flex flex-col h-full">
            <img src={image} alt={title} className="h-48 w-full object-cover rounded-t-xl" />
            <div className="p-4 flex flex-col flex-grow">
                <Link to={`/blog/${slug}`} className="text-xl font-semibold text-green-900 mb-2">{title}</Link>
                <p className="text-gray-700 text-sm flex-grow">{excerpt}</p>
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                    <span>{author.name}</span>
                    <span>{parseDate(date)}</span>
                </div>
                <Link
                to={`/blog/${slug}`}
                className="mt-4 inline-block text-green-700 hover:text-green-900 font-medium"
                >
                Read More →
                </Link>
                {isAuthorDashboard && (
                    <>
                        <button onClick={handleEditPost} className="mt-4 inline-block text-green-700 hover:text-green-900 font-medium">
                            Edit Post
                        </button>
                        {
                            !published && (
                                <p>Draft - Not published yet</p>
                            )
                        }
                    </>
                )}
            </div>
        </div>
    );

}