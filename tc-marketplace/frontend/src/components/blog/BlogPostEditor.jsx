import { useEffect, useState } from "react";
import MarkdownPreview from "../shared/MarkdownPreview";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {  createPost, updatePost } from "../../api/blog";
import matter from "front-matter";

const BlogPostEditor = ({ currentPost, setActiveTab }) => {

    const [meta, setMeta] = useState({
        title: '',
        date: '',
        author: '',
        slug: '',
        image: '',
        tags: [],
        excerpt : ''
    });
    const [content, setContent] = useState('');

    const isEditing = !!currentPost

    useEffect(() => {
        const today = new Date();
        const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        const user = JSON.parse(localStorage.getItem("user"));
        const authorName = user?.name || "Anonymous";
        
        
        if(!isEditing){
            setMeta((prev) => ({
                ...prev,
                date: formattedDate,
                author: authorName,
            }));
        }else {
            setMeta((prev) => ({...prev,
                title: currentPost.title || '',
                tags: currentPost.tags || [],
                image: currentPost.image || '',
                slug: currentPost.slug || '',
                
                excerpt: currentPost.excerpt || '',
                author: currentPost.author?.name || 'Anonymous',
                date: currentPost.date || '',
            }))

            const { attributes , body } = matter(currentPost.content || '');
            setContent( body || '',)
        }          
    }, [currentPost]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeta({...meta, [name]: value});
    }

    const handleSave = (e) => {
        e.preventDefault();
        const frontmatter = 
`---
title: ${meta.title}
tags: [${meta.tags.join(", ")}]
author: ${meta.author}
image: ${meta.image}
excerpt: ${meta.excerpt}
date: ${new Date().toISOString()}
---

${content}`;
        
    if(isEditing){
        updatePost({id: currentPost._id, title:meta.title, content: frontmatter, image: meta.image,excerpt: meta.excerpt, slug: meta.slug , published: false}).then(res => {       
        }).catch(err => console.log("Error updating blog post:", err));
    } else{

        createPost({title:meta.title, content: frontmatter, image: meta.image,excerpt: meta.excerpt,slug: meta.slug, published: false}).then(res => {  
            console.log("Blog post created:", res);     
        }).catch(err => console.log("Error creating blog post:", err));
    }

    }
    // check if there is a saved blog post, then update it with the new content and publish
    const handleSubmit = (e) => {
        e.preventDefault();
     
        if(isEditing){
            updatePost({title:meta.title, content: frontmatter, image: meta.image,excerpt: meta.excerpt, slug:meta.slug, published: true}).then(res => {       
        }).catch(err => console.log("Error updating blog post:", err));
        }
            createPost({title:meta.title, content: frontmatter, image: meta.image,excerpt: meta.excerpt,slug: meta.slug, published: true}).then(res => {       
        }).catch(err => console.log("Error creating blog post:", err));

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
                                value={meta.title}
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
                        <button onClick={handleSave} className="bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded-lg">
                            Save Draft
                        </button>
                        <button onClick={handleSubmit} className="ml-4 bg-lime-500 hover:bg-lime-600 py-1 px-2 rounded-lg">
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
                                    <ReactMarkdown 
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