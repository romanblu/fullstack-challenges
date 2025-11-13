import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Banner from "../../components/ui/Banner.jsx";
import { parseDate } from "../../utils/parseDate.js";
import Loader from "../../components/ui/Loader.jsx";

export default function BlogPost({post }) {

    if (!post) return <Loader />
    const {attributes, body} = post
    return (
    <div className="max-w-4xl mx-auto py-12 px-6">
        <Banner 
            title={attributes.title} 
            description={attributes.excerpt}
            imageSrc={attributes.image}
            imageAlt={"Plants Banner"}
            theme={"light"}
            size="sm"
        />
        <p className="text-gray-600 mb-8">{parseDate(attributes.date)}</p>
        <p className="text-gray-600 mb-8">{attributes.author}</p>
        <article className="prose prose-blog-post">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
        </article>
    </div>
  );
}