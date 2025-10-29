import { useState } from "react";
import MarkdownPreview from "./MarkdownPreview";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AddBlogPost = () => {

    const [form, setForm] = useState({
        title: '',
        content: ''
    });
    const [content, setContent] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({...form, [name]: value});
    }

    return (
        <div className="mx-auto bg-slate-100  p-6">
            <div>
                <form className="">
                    {/* Blog post meta data */}
                    <div className="grid grid-cols-2 gap-4 justify-center container max-w-[900px] mx-auto ">  
                        <div>
                            <label className="block text-sm font-medium ">Blog Title</label>
                            <input
                                name="title"
                                placeholder="Title"
                                value={form.title}
                                onChange={handleChange}
                                className="border rounded p-2 w-full mb-3"
                                />
                            <label className="block text-sm font-medium ">Slug URL</label>
                            <input
                                name="slug"
                                placeholder="Slug"
                                value={form.title}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                                />
                        </div>
                        <div className="flex flex-row gap-4">
                            <div>
                                <label className="block text-sm font-medium">Author</label>
                                <input
                                    name="author"
                                    placeholder="Author"
                                    value={form.author}
                                    onChange={handleChange}
                                    className="border rounded p-2  mb-3"
                                />
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    name="date"
                                    placeholder="Date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className="border rounded p-2 "
                                />
                            </div>
                            
                            
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Tags</label>
                            <input
                                name="tags"
                                placeholder="Tags"
                                value={form.tags}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-1">Image</label>
                            
                            <span className="text-gray-700">Attach File (optional)</span>
                            <input
                                type="file"
                                name="attachment"
                                className="mt-2 block  text-sm text-gray-700
                                        file:mr-4 file:py-2 file:px-4
                                        file:rounded-md file:border-0
                                        file:text-sm file:font-semibold
                                        file:bg-green-600 file:text-white
                                        hover:file:bg-green-700
                                        cursor-pointer"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Excerpt</label>
                            <input
                                name="excerpt"
                                placeholder="Excerpt"
                                value={form.excerpt}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                            />
                        </div>

                    </div>

                    <div className="mt-4  flex flex-row container max-w-[1600px] mx-auto ">
                        {/* markdown edittor */}
                        <div className="w-full border-r-2 pr-4">
                            <textarea
                                name="content"
                                placeholder="Write your blog content here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="border rounded p-2 w-full min-h-[400px] h-full"
                            />
                        </div>
                        {/* blog post preview */}
                        <div className="w-full ml-4 bg-slate-50 border rounded prose prose-blog-post">
                            {content ? (
                                <ReactMarkdown 
                                    children={content} >
                                </ReactMarkdown>
                            ) : (
                                <div className="p-4 text-gray-500">Blog post preview will appear here...</div>
                            )
                        }
                        </div>
                    </div>

                </form>
            </div>

        </div>
    )
}

export default AddBlogPost;