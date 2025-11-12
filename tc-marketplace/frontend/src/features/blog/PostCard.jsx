export default function PostCard({post}){
    return (
        <div className="bg-green-50 rounded-xl shadow hover:shadow-lg transition overflow-hidden pb-6">
            <img src={post.image} alt={post.title} className=" mb-3 " />
            <h3 className="font-semibold text-xl mb-2 px-4">{post.title}</h3>
            <p className="text-gray-600 text-sm px-4">
                {post.description}
            </p>
        </div>
    )
}