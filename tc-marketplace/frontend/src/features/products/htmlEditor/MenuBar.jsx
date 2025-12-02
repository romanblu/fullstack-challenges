import {  FaBan,     } from "react-icons/fa";
import { Table,  } from "lucide-react";
import { 
    MdFormatSize, 
    MdFormatColorText, 
    MdFormatItalic, 
    MdFormatUnderlined,
    MdFormatBold,
    MdFormatAlignCenter, 
    MdFormatAlignJustify, 
    MdFormatAlignLeft, 
    MdFormatAlignRight,
    MdOutlineAttachFile,
    MdFormatIndentDecrease,
    MdFormatIndentIncrease,
    MdFormatListBulleted,
    MdFormatListNumbered,
    MdOutlineImage,
    MdOutlineVideocam,
    MdLinkOff,
    MdOutlineViewColumn,
    MdTableRows,
    MdBorderTop,
    MdBorderBottom,
    MdBorderLeft,
    MdBorderRight,
    MdAdd,
    
    
 } from "react-icons/md";
 import { 
    TbTableColumn, 
    TbTableRow, 
    TbTableOff   
} from "react-icons/tb";
import HeadingDropdown from "./HeadingDropdown.jsx";    
import EditorButton from "../../../components/ui/EditorButton.jsx";
import './editor.css'
import { useRef } from "react";

export default function MenuBar ({ editor }){
    if (!editor) return null

    const fileInputRef = useRef(null);

    const handleButtonImageClick = () => {
        fileInputRef.current?.click(); // programmatically open file picker
    };

    const handleFileImageChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Upload the file to S3 
        // const uploadedUrl = await uploadFileToS3(file);

        // Insert the image into Tiptap
        editor.chain().focus().setImage({ src: uploadedUrl }).run();
    };

    return (
            <div className="flex flex-wrap  gap-2 mb-2 p-2 border-b">
                <div className="flex gap-1 flex-nowrap bg-gray-100 rounded-t">

                    <HeadingDropdown editor={editor} />
                    
                    <EditorButton 
                        icon={MdFormatBold}
                        title="Bold" 
                        onClick={() =>  editor.chain().focus().toggleBold().run()} 
                        isActive={editor.isActive("bold")}
                    />
                    <EditorButton 
                        icon={MdFormatItalic}
                        title="Italic" 
                        onClick={() => editor.chain().focus().toggleItalic().run()} 
                        isActive={editor.isActive("italic")}
                    />
                    <EditorButton 
                        title="Underline"
                        icon={MdFormatUnderlined} 
                        onClick={() => editor.chain().focus().toggleUnderline().run()} 
                        isActive={editor.isActive("underline")}
                    />
                </div>
                <div className="flex gap-1 flex-nowrap bg-gray-100 rounded-t">
                    <EditorButton 
                        icon={MdFormatListBulleted} 
                        title="Bullet List"
                        onClick={() => editor.chain().focus().toggleBulletList().run()} 
                        isActive={editor.isActive("bulletList")}
                    />
                    <EditorButton 
                        icon={MdFormatListNumbered} 
                        title="Ordered List"
                        onClick={() => editor.chain().focus().toggleOrderedList().run()} 
                        isActive={editor.isActive("orderedList")}
                    />
                </div>
                <div className="flex gap-1 flex-wrap bg-gray-100 rounded-t">
                    <EditorButton 
                        icon={MdOutlineAttachFile} 
                        title="Add Link"
                        onClick={() => {
                            let url = prompt("Enter link URL")
                            if(!url) return;
                            if (!/^https?:\/\//i.test(url)) {
                                url = `https://${url}`
                            }   
                            editor.chain().focus().setLink({ href: url }).run()
                        }}
                        isActive={editor.isActive("link")}
                    />
                    {
                        editor.isActive("link") &&
                        <EditorButton
                        icon={MdLinkOff} // remove link icon
                        title="Remove Link"
                        isActive={false}
                        disabled={!editor.isActive("link")}
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        />
                    }
                    {/* <EditorButton 
                        icon={MdOutlineImage} 
                        title="Insert Image"
                        onClick={() => {
                            const url = prompt("Enter image URL")
                            if(!url) return;
                            editor.chain().focus().setImage({ src: url }).run()
                        }} 
                        isActive={editor.isActive("image")}
                    />
                     */}
                    <input 
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        onChange={handleFileImageChange}
                    />
                    <button
                        type="button"
                        onClick={handleButtonImageClick}
                        className="p-2 rounded hover:bg-gray-200 transition"
                    >
                        <MdOutlineImage size={18}/>
                    </button>
               
                    <EditorButton 
                        icon={Table}
                        title="Insert Table"
                        onClick={() => editor
                            .chain()
                            .focus()
                            .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                            .run()
                        } 
                    /> 
                    {
                        (editor.isActive("tableCell") || editor.isActive("tableRow")) && ( 
                            <>
                                <EditorButton 
                                    icon={MdBorderTop}
                                    title="Insert Row Top"
                                    onClick={() => { 
                                        // do not add a row before the header
                                        if(editor.isActive('tableCell')) editor.chain().focus().addRowBefore().run()
                                    }} 
                                    /> 
                                <EditorButton  
                                    icon={MdBorderBottom}
                                    title="Insert Row Below"
                                    onClick={() => editor.chain().focus().addRowAfter().run()
                                    } 
                                /> 
                                <EditorButton  
                                    icon={MdBorderLeft}
                                    title="Insert Column Before"
                                    onClick={() => editor
                                        .chain()
                                        .focus()
                                        .addColumnBefore()
                                        .run()
                                    } 
                                /> 
                                <EditorButton  
                                    icon={MdBorderRight}
                                    title="Insert Column After"
                                    onClick={() => editor
                                        .chain()
                                        .focus()
                                        .addColumnAfter()
                                        .run()
                                    } 
                                /> 
                                <EditorButton  
                                    icon={TbTableColumn}
                                    title="Delete Column"
                                    onClick={() => editor
                                        .chain()
                                        .focus()
                                        .deleteColumn()
                                        .run()
                                    } 
                                /> 
                                <EditorButton  
                                    icon={TbTableRow}
                                    title="Delete Row"
                                    onClick={() => editor
                                        .chain()
                                        .focus()
                                        .deleteRow()
                                        .run()
                                    } 
                                /> 
                                <EditorButton  
                                    icon={TbTableOff}
                                    title="Delete Table"
                                    onClick={() => editor
                                        .chain()
                                        .focus()
                                        .deleteTable()
                                        .run()
                                    } 
                                /> 
                            </>

                        )
                    }
                    <EditorButton 
                        icon={MdOutlineVideocam}
                        title="Embed Video"
                        onClick={() => {
                            const url = prompt("YouTube URL");
                            if (url) {
                                editor.commands.setYoutubeVideo({
                                    src: url,
                                    width: 450,
                                    height: 300,
                                })
                            }

                        }} 
                    /> 
                    <EditorButton 
                        icon={FaBan}
                        title="Discard Formatting"
                        onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} 
                    /> 
                </div>
            </div>

    )
}