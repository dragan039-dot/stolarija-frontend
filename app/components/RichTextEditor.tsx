"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";

type Props = {
  content: string;
  onChange: (html: string) => void;
  apiUrl: string;
  token: string | null;
};

export default function RichTextEditor({
  content,
  onChange,
  apiUrl,
  token,
}: Props) {

  const editor = useEditor({
    extensions: [
      StarterKit,

      Underline,

      TextStyle,

      Color,

      Highlight,

      Image,

      Link.configure({
        openOnClick: false,
      }),

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

  const addLink = () => {
    const url = window.prompt("Unesi link");

    if (!url) return;

    editor
      .chain()
      .focus()
      .setLink({
        href: url,
      })
      .run();
  };

  const addImage = () => {
    const url = window.prompt(
      "Unesi URL slike"
    );

    if (!url) return;

    editor
      .chain()
      .focus()
      .setImage({
        src: url,
      })
      .run();
  };

  const setFontSize = (size: string) => {
  if (!size) return;

  editor
    .chain()
    .focus()
    .setMark("textStyle", {
      style: `font-size: ${size}`,
    })
    .run();
};


const uploadImage = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files?.length) return;

  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${apiUrl}/instruction/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    alert("Upload slike nije uspeo");
    return;
  }

  const data = await res.json();

  editor
    .chain()
    .focus()
    .insertContent(`
  <img
    src="${apiUrl}${data.path}"
    style="width:50%; max-width:100%; display:block; margin:10px auto;"
  />
`)
    .run();

  e.target.value = "";
};


const uploadVideo = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  if (!e.target.files?.length) return;

  const file = e.target.files[0];

  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch(`${apiUrl}/instruction/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    alert("Upload video zapisa nije uspeo");
    return;
  }

  const data = await res.json();

  const videoHtml = `
    <video controls style="width:70%; max-width:100%; display:block; margin:10px auto;">
      <source src="${apiUrl}${data.path}" />
      Vaš browser ne podržava video.
    </video>
  `;

  editor
    .chain()
    .focus()
    .insertContent(videoHtml)
    .run();

  e.target.value = "";
};


const insertYouTube = () => {
  const url = window.prompt("Unesi YouTube link");

  if (!url) return;

  let videoId = "";

  if (url.includes("watch?v=")) {
    videoId = url.split("watch?v=")[1].split("&")[0];
  }

  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  }

  if (!videoId) {
    alert("Neispravan YouTube link");
    return;
  }

  editor
    .chain()
    .focus()
    .insertContent(`
      <p>
        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
          Pogledaj YouTube video
        </a>
      </p>
    `)
    .run();
};



  return (
    <div className="border rounded overflow-hidden">

      {/* TOOLBAR */}

      <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-100">

        <button
type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className="px-2 py-1 border rounded"
        >
          B
        </button>

        <button
type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className="px-2 py-1 border rounded italic"
        >
          I
        </button>

        <button
type="button"
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
          className="px-2 py-1 border rounded underline"
        >
          U
        </button>

        <button
type="button"
          onClick={() =>
            editor.chain().focus().toggleHighlight().run()
          }
          className="px-2 py-1 border rounded"
        >
          Marker
        </button>

        <button
type="button"
          onClick={() =>
            editor.chain().focus().setTextAlign("left").run()
          }
          className="px-2 py-1 border rounded"
        >
          ⬅
        </button>

        <button
type="button"
          onClick={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          className="px-2 py-1 border rounded"
        >
          ↔
        </button>

        <button
type="button"
          onClick={() =>
            editor.chain().focus().setTextAlign("right").run()
          }
          className="px-2 py-1 border rounded"
        >
          ➡
        </button>

        <button
type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className="px-2 py-1 border rounded"
        >
          • Lista
        </button>

        <button
type="button"
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          className="px-2 py-1 border rounded"
        >
          1. Lista
        </button>

        <button
type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 1,
            }).run()
          }
          className="px-2 py-1 border rounded"
        >
          H1
        </button>

        <button
type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({
              level: 2,
            }).run()
          }
          className="px-2 py-1 border rounded"
        >
          H2
        </button>

        <button
type="button"
          onClick={addLink}
          className="px-2 py-1 border rounded"
        >
          Link
        </button>

        <button
type="button"
          onClick={addImage}
          className="px-2 py-1 border rounded"
        >
          Slika
        </button>

<label className="px-2 py-1 border rounded cursor-pointer bg-white">
  Upload slike
  <input
    type="file"
    accept=".jpg,.jpeg,.png,.webp,.gif"
    className="hidden"
    onChange={uploadImage}
  />
</label>

<label className="px-2 py-1 border rounded cursor-pointer bg-white">
  Upload video
  <input
    type="file"
    accept=".mp4,.webm"
    className="hidden"
    onChange={uploadVideo}
  />
</label>


<button
  type="button"
  onClick={insertYouTube}
  className="px-2 py-1 border rounded"
>
  YouTube
</button>

        <select
          onChange={(e) =>
            setFontSize(e.target.value)
          }
          className="border rounded px-2"
        >
          <option>
            Veličina
          </option>

          <option value="12px">
            12
          </option>

          <option value="14px">
            14
          </option>

          <option value="16px">
            16
          </option>

          <option value="18px">
            18
          </option>

          <option value="22px">
            22
          </option>

          <option value="28px">
            28
          </option>

          <option value="36px">
            36
          </option>

        </select>

      </div>

      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4 bg-white"
      />
    </div>
  );
}