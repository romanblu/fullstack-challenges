import { useEffect, useState, useMemo } from "react";
import { MetaForm } from "./MetaForm";
import { MarkdownEditor } from "./MarkdownEditor";
import { useBlogPostEditor } from "../../../hooks/useBlogPostEditor";

const BlogPostEditor = ({ blogPostDraft, setActiveTab }) => {

    const {meta, setMeta, handleSaveDraft, handlePublish, content, setContent} = useBlogPostEditor(blogPostDraft)
    
        
    return (
        <div className="mx-auto bg-slate-100  p-6">
            <div>
                <form className="">
                    <MetaForm 
                        meta={meta} 
                        setMeta={setMeta}
                    />

                    <MarkdownEditor 
                        handleSaveDraft={handleSaveDraft} 
                        handlePublish={handlePublish} 
                        content={content} 
                        setContent={setContent} 
                    />         
                </form>
            </div>

        </div>
    )
}

export default BlogPostEditor;