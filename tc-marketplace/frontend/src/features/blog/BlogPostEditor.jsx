import { useEffect, useState, useMemo } from "react";
import MarkdownPreview from "../../components/ui/MarkdownPreview";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {  createPost, updatePost } from "../../api/blog";
import matter from "front-matter";
import remarkBreaks from "remark-breaks";

const BlogPostEditor = ({ blogPostDraft, setActiveTab }) => {

    const [meta, setMeta] = useState({
        title: '',
        date: '',
        author: '',
        slug: '',
        image: '',
        tags: "",
        excerpt : ''
    });
    const [content, setContent] = useState('');
    const [post, setPost] = useState()

    useEffect(() => {      
        const today = new Date();
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        const user = JSON.parse(localStorage.getItem("user"));
        const authorName = user?.name || "Anonymous";
        
        const source = post || blogPostDraft
        
        // new post
        if(!source){
            setMeta((prev) => ({
                ...prev,
                date: today,
                author: authorName,
            }));
            return
        }

        // loading current post for edit
        setMeta((prev) => ({
            ...prev,
            title: source.title || '',
            tags: source.tags || [],
            image: source.image || '',
            slug: source.slug || '',
            excerpt: source.excerpt || '',
            author: source.author?.name || 'Anonymous',
            date: source.date || '',
        }))
        try{
            const { attributes , body } = matter(source.content || '');
            setContent( body || '',)
        }catch (err){
            console.error("Error", err)
        }
              
    },[blogPostDraft, post]);

    const yamlSafe = (value) => {
        if (!value) return '""';
        return `"${String(value).replace(/"/g, '\\"')}"`;
    };

    const buildFrontmatter = () => {
        return `---
title: ${yamlSafe(meta.title)}
tags: ${yamlSafe(meta.tags)}
author: ${yamlSafe(meta.author)}
image: ${yamlSafe(meta.image)}
excerpt: ${yamlSafe(meta.excerpt)}
date: ${yamlSafe(new Date().toISOString())}
---

${content}`;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeta({...meta, [name]: value});
    }

    const handleSaveDraft = async (e) => {
        e.preventDefault();

        const source = post || blogPostDraft
        const isEditing = Boolean(source && source._id) 
        const markdown = buildFrontmatter()
        const updatedData = {
            title:meta.title, 
            content: markdown, 
            image: meta.image,
            excerpt: meta.excerpt, 
            published: false
        }

        if(isEditing){
            // update existing
            await updatePost({ id: source._id, ...updatedData })
            alert("Draft updated")
        } else{
            // create new post
            const res = await createPost(updatedData)
            setPost(res.data) // state now has _id
            alert('Draft created')
        }
    }
    // check if there is a saved blog post, then update it with the new content and publish
    const handlePublish = async (e) => {
        e.preventDefault();
        const source = post || blogPostDraft
        const isEditing = Boolean(source && source._id)
        const markdown = buildFrontmatter()

        const updatedData = {
            title:meta.title, 
            content: markdown, 
            image: meta.image,
            slug: meta.slug,
            tags: meta.tags,
            excerpt: meta.excerpt, 
            published: true
        }

        if (isEditing) {
            await updatePost({ id: source._id, ...updatedData });
        } else {
            await createPost(updatedData);
        }

        alert("Post published!");
        setPost(null);
        setActiveTab("blogDashboard");
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
                                value={meta.title}
                                onChange={handleChange}
                                className="border rounded p-2 w-full mb-3"
                                />
                            <label className="block text-sm font-medium ">Slug URL</label>
                            <input
                                name="slug"
                                placeholder="Slug"
                                value={meta.slug}
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
                                    value={meta.author}
                                    onChange={handleChange}
                                    className="border rounded p-2  mb-3"
                                />
                                <label className="block text-sm font-medium mb-1">Date</label>
                                <input
                                    name="date"
                                    placeholder="Date"
                                    value={meta.date}
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
                                value={meta.tags}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium mb-1">Image</label>
                            <input
                                name="image"
                                placeholder="Image URL"
                                value={meta.image}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Excerpt</label>
                            <input
                                name="excerpt"
                                placeholder="Excerpt"
                                value={meta.excerpt}
                                onChange={handleChange}
                                className="border rounded p-2 w-full"
                            />
                        </div>

                    </div>

                    <div className="mt-6 container max-w-[1600px] mx-auto">  
                        <button onClick={handleSaveDraft} className="bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded-lg">
                            Save Draft
                        </button>
                        <button onClick={handlePublish} className="ml-4 bg-lime-500 hover:bg-lime-600 py-1 px-2 rounded-lg">
                            Publish
                        </button> 
                        <div className="mt-4  flex flex-row  ">
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
                            <div className="w-full ml-4 bg-slate-50 border rounded prose prose-blog-post ">
                                {content ? (
                                    <ReactMarkdown  remarkPlugins={[remarkBreaks]}
                                        children={content} >
                                    </ReactMarkdown>
                                ) : (
                                    <div className="p-4 text-gray-500">Blog post preview will appear here...</div>
                                )
                            }
                            </div>
                        </div>
                    </div>            
                </form>
            </div>

        </div>
    )
}

export default BlogPostEditor;