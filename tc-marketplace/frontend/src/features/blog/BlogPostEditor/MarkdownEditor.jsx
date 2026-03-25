import ReactMarkdown from "react-markdown";
import remarkBreaks from "remark-breaks";


export const MarkdownEditor = ({handleSaveDraft, handlePublish, content, setContent  }) => {
    const handleImageUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = await uploadImage(file);

        const markdownImage = `![image](${imageUrl})`;
        setContent(prev => prev + "\n\n" + markdownImage + "\n\n");
    };
    return (
        <div className="mt-6 container max-w-[1600px] mx-auto">  
            <button onClick={handleSaveDraft} className="bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded-lg">
                Save Draft
            </button>
            <button onClick={handlePublish} className="ml-4 bg-lime-500 hover:bg-lime-600 py-1 px-2 rounded-lg">
                Publish
            </button> 
            <button onClick={handleImageUpload} className="bg-gray-300 hover:bg-gray-400 py-1 px-2 rounded-lg ml-50" >
                Add Image
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
    )
}