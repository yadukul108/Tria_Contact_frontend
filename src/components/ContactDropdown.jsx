import React, { useRef, useEffect } from "react";
import { Edit, Trash2, Star } from "lucide-react";

const ContactDropdown = ({ contact, onEdit, onDelete, onToggleFavorite, onShowNote, closeMenu }) => {
  const menuRef = useRef(null);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeMenu]);

  return (
    <div
      ref={menuRef}
      className="absolute top-0 right-0 w-[130px] bg-[#161B22] border border-white/10 rounded-lg shadow-lg text-[0.75rem] z-20"
    >
      <button
        onClick={() => {
          closeMenu();
          onEdit?.(contact);
        }}
        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-[#FFD24C]/10 transition"
      >
        <Edit size={14} /> Edit
      </button>
      <button
        onClick={() => {
          closeMenu();
          onDelete?.(contact);
        }}
        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-[#FFD24C]/10 transition"
      >
        <Trash2 size={14} /> Delete
      </button>
      <button
        onClick={() => {
          closeMenu();
          onToggleFavorite?.(contact);
        }}
        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-[#FFD24C]/10 transition"
      >
        <Star
          size={14}
          className={contact.isFavorite ? "text-[#FFD24C]" : "text-slate-200"}
        />
        {contact.isFavorite ? "Unfavourite" : "Favourite"}
      </button>
      <button
        onClick={() => {
          closeMenu();
          onShowNote?.();
        }}
        className="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-[#FFD24C]/10 transition"
      >
        📝 Show Note
      </button>
    </div>
  );
};

export default ContactDropdown;
