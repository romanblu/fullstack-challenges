import { useState, useRef, useEffect } from "react";
import { MdArrowDropDown, MdTitle } from "react-icons/md";

const options = [
  { value: "paragraph", label: "Paragraph", icon: MdTitle },
  { value: 1, label: "Heading 1", icon: MdTitle },
  { value: 2, label: "Heading 2", icon: MdTitle },
  { value: 3, label: "Heading 3", icon: MdTitle },
];

export default function HeadingDropdown({ editor }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const current = 
    editor.isActive("heading", { level: 1 }) ? "Heading 1" :
    editor.isActive("heading", { level: 2 }) ? "Heading 2" :
    editor.isActive("heading", { level: 3 }) ? "Heading 3" :
    "Paragraph";

  const onSelect = (value) => {
    setOpen(false);
    if (value === "paragraph") {
      editor.chain().focus().setParagraph().run();
    } else {
      editor.chain().focus().toggleHeading({ level: value }).run();
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`p-2 rounded hover:bg-gray-200 transition flex items-center gap-1 ${
          editor.isActive("heading") ? "bg-gray-300 text-blue-600" : ""
        }`}
      >
        {current}
        <MdArrowDropDown />
      </button>

      {open && (
        <div className="absolute left-0 mt-1 bg-white border rounded shadow p-1 z-10 w-40">
          {options.map((opt) => {
            const Icon = opt.icon;
            return (
              <button
                key={opt.label}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded w-full text-left"
                onClick={() => onSelect(opt.value)}
              >
                <Icon size={18} />
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}