import { useParams } from "react-router-dom";
import matter from "gray-matter";
import BlogPost from "../components/BlogPost";
import Navbar from "../components/Navbar";

export default function BlogPostPage() {
    return (
        <div className="bg-slate-50">
            <Navbar theme="light" />
            <BlogPost slug={'setting-up-your-first-tc-lab'}/>
        </div>
    )
    
}