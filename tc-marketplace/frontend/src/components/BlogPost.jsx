import matter from "front-matter";
import ReactMarkdown from "react-markdown";
import getPost from "../utils/getPost.js";
import { useEffect, useState } from "react";
import remarkGfm from "remark-gfm";
import Navbar from "./Navbar.jsx";

export default function BlogPost({slug }) {
    const [post, setPost] = useState(null);
    useEffect(() => {
        getPost(slug).then((data) => {
            const {attributes, body} = matter(data.text)
            setPost({ attributes, body });
            
        });
    }, [slug]);
    
    if (!post) return <p>Loading...</p>;
    console.log(post);
    return (
        <div>
            <Navbar theme="light" />
            <div className="max-w-3xl mx-auto py-12 px-6">
                <h1 className="text-4xl font-bold mb-4 text-green-900">{post.attributes.title}</h1>
                <p className="text-gray-600 mb-8">{post.attributes.excerpt}</p>
                <p className="text-gray-600 mb-8">{post.attributes.date}</p>
                <p className="text-gray-600 mb-8">{post.attributes.author}</p>
                <img src={post.attributes.image}/>
                <article className="prose prose-green dark:prose-invert ">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown>
                </article>
            </div>
        </div>
  );
}