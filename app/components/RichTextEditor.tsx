"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

type Props = {
  content: string;
  onChange: (html: string) => void;
};

export default function RichTextEditor({
  content,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      Link.configure({
        openOnClick: false,
      }),

      Image,

      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],

    content,

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border rounded overflow-hidden">

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-100">

        <button
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="px-2 py-1 border rounded"
        >
          B
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className="px-2 py-1 border rounded italic"
        >
          I
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className="px-2 py-1 border rounded underline"
        >
          U
        </button>

        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          className="px-2 py-1 border rounded"
        >
          ⬅
        </button>

        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          className="px-2 py-1 border rounded"
        >
          ↔
        </button>

        <button
          onClick={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          className="px-2 py-1 border rounded"
        >
          ➡
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="px-2 py-1 border rounded"
        >
          • Lista
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 2,
            }).run()
          }
          className="px-2 py-1 border rounded"
        >
          H2
        </button>

      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4 bg-white"
      />
    </div>
  );
}