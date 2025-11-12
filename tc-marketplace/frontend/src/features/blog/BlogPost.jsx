import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Banner from "../../components/ui/Banner.jsx";
import { parseDate } from "../../utils/parseDate.js";

export default function BlogPost({post }) {

    
    if (!post) return <p>Loading...</p>;

    

    return (
        <div>
            
            <div className="max-w-4xl mx-auto py-12 px-6">
                <Banner 
                    title={post.attributes.title} 
                    description={post.attributes.excerpt}
                    imageSrc={post.attributes.image}
                    imageAlt={"Plants Banner"}
                    theme={"light"}
                    size="sm"
                />
                {/* <h1 className="text-4xl font-bold mb-4 text-green-900">{post.attributes.title}</h1> */}
                {/* <p className="text-gray-600 mb-8">{post.attributes.excerpt}</p> */}
                <p className="text-gray-600 mb-8">{parseDate(post.attributes.date)}</p>
                <p className="text-gray-600 mb-8">{post.attributes.author}</p>
                {/* <img src={post.attributes.image}/> */}
                <article className="prose prose-blog-post">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
                </article>
                {/* Move similar-posts section here and recieve the data with the post content */}
            </div>
        </div>
  );
}