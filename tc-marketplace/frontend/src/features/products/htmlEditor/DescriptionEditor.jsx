import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import {Table} from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import Youtube from '@tiptap/extension-youtube'
import MenuBar from './MenuBar.jsx'

import { useEffect, useState } from 'react';

export default function DescriptionEditor({ value, onReady }) {
    const [_, forceUpdate] = useState(0);

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3, 4, 5, 6] }
            }),
            Image, 
            Link.configure({
                    HTMLAttributes: {
                    class: 'text-blue-600 underline hover:text-blue-800 cursor-pointer',
                    target: '_blank', // optional
                    rel: 'noopener noreferrer', // optional
                },
            }),
            Table.configure({
            resizable: true,
            HTMLAttributes: {
                class: "border-collapse border border-gray-300",
            },
            }),
            TableRow,
            TableHeader,
            TableCell,
            Youtube.configure({
                width: 640,
                height: 360,
                inline: false,
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => onChange(editor.getHTML()),
        editorProps: {
            attributes: {   
                class: 'min-h-[150px] focus:outline-none',
            }
        }
    });



    // Re-render whenever editor selection or state changes
    useEffect(() => {
        if (!editor) return;

        const transactionListener = () => forceUpdate(x => x + 1);
        editor.on('transaction', transactionListener);
        editor.on('selectionUpdate', transactionListener);

        return () => {
            editor.off('transaction', transactionListener);
            editor.off('selectionUpdate', transactionListener);
        };
    }, [editor]);

    // pass editor to parent when ready - expose html data
    useEffect(() => {
        if (editor && onReady) onReady(editor);
    }, [editor]);

    if(!editor) return null

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="border rounded-md p-2" />
        </div>
    )


}