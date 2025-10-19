import { useParams } from "react-router-dom";
import matter from "gray-matter";
import BlogPost from "../components/BlogPost";

export default function BlogPostPage() {
    return (
        <div>
            <BlogPost slug={'setting-up-your-first-tc-lab'}/>
        </div>
    )
    
}