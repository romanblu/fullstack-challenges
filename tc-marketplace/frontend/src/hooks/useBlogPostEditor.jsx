import { useEffect, useState } from "react";
import matter from "front-matter";
import { createPost, updatePost } from "../api/blog";

export function useBlogPostEditor (blogPostDraft) {
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
    

    return {meta, setMeta, handleSaveDraft, handlePublish, content, setContent}
}