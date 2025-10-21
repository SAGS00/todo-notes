"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { clsx } from "clsx";

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
}

export default function RichTextEditor({
    content,
    onChange,
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit],
        content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: "prose prose-sm max-w-none focus:outline-none min-h-[200px] px-4 py-3",
            },
        },
    });

    if (!editor) {
        return null;
    }

    const MenuButton = ({
        onClick,
        isActive,
        children,
    }: {
        onClick: () => void;
        isActive?: boolean;
        children: React.ReactNode;
    }) => (
        <button
            type="button"
            onClick={onClick}
            className={clsx(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                isActive
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
            )}
        >
            {children}
        </button>
    );

    return (
        <div className="border-2 border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-black focus-within:border-transparent">
            <div className="border-b border-gray-200 p-2 flex gap-1 flex-wrap bg-gray-50">
                <MenuButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                >
                    Bold
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                >
                    Italic
                </MenuButton>
                <MenuButton
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    isActive={editor.isActive("strike")}
                >
                    Strike
                </MenuButton>
                <div className="w-px bg-gray-300 mx-1" />
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    isActive={editor.isActive("heading", { level: 1 })}
                >
                    H1
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    isActive={editor.isActive("heading", { level: 2 })}
                >
                    H2
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    isActive={editor.isActive("heading", { level: 3 })}
                >
                    H3
                </MenuButton>
                <div className="w-px bg-gray-300 mx-1" />
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    isActive={editor.isActive("bulletList")}
                >
                    Bullet
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                    isActive={editor.isActive("orderedList")}
                >
                    Number
                </MenuButton>
                <MenuButton
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                    isActive={editor.isActive("blockquote")}
                >
                    Quote
                </MenuButton>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
}
