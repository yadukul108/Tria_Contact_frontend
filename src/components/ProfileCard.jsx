import React, { useState } from "react";
import { MoreVertical, Mail, Phone } from "lucide-react";
import ContactDropdown from "./ContactDropdown";

const capitalize = (s) => s && s[0]?.toUpperCase() + s.slice(1).toLowerCase();

const ProfileCard = ({ contact, onEdit, onDelete, onToggleFavorite }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNoteOnly, setShowNoteOnly] = useState(false);

  return (
    <div className="font-mono relative p-2 w-[260px] h-[180px] bg-white/5 backdrop-blur-[80px] rounded-[24px] overflow-hidden group transition-all duration-300 hover:shadow-[0_8px_32px_rgba(255,210,76,0.44)]">
      
      <div className="flex items-start justify-between p-3 h-[30%]">
        <div className="flex items-center gap-3">
          <img
            src={contact.profileImage || "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500"}
            alt={capitalize(contact.firstName)}
            className="w-[60px] h-[60px] rounded-full object-cover border border-white/10"
            loading="lazy"
          />
          <div className="flex flex-col justify-center">
            <p className="text-slate-200 font-bold text-md ">
              {capitalize(contact.firstName)} {capitalize(contact.surname)}
            </p>
            <p className="text-slate-400 text-xs">
              Created: {new Date(contact.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="text-white/70 hover:text-[#FFD24C] transition"
          >
            <MoreVertical size={18} />
          </button>

          {menuOpen && (
            <ContactDropdown
              contact={contact}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleFavorite={onToggleFavorite}
              onShowNote={() => setShowNoteOnly(true)}
              closeMenu={() => setMenuOpen(false)}
            />
          )}
        </div>
      </div>
          
      <div className="flex flex-col justify-between h-[70%] px-3 py-3 mt-6 text-slate-200">
        {showNoteOnly ? (
          <div className="pb-2.5 h-full flex flex-col justify-center items-center">
            <p className="text-[13px] text-slate-300 text-center leading-tight mb-0.5 font-semibold">Note</p>
            <div className="text-[12px] text-slate-400 mt-1 text-center">
              {contact.note || "No description available."}
            </div>
            <button
              className="mt-4 text-xs text-[#FFD24C] underline hover:no-underline transition"
              onClick={() => setShowNoteOnly(false)}
            >
              Show Contact Details
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-2.5">
              {contact.email && (
                <div className="flex items-center gap-2.5 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Mail size={14} className="text-[#FFD24C]" />
                  </div>
                  <span className="text-slate-300 truncate">{contact.email}</span>
                </div>
              )}
              {contact.phone && (
                <div className="flex items-center gap-2.5 text-xs">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Phone size={14} className="text-[#FFD24C]" />
                  </div>
                  <span className="text-slate-300">{contact.phone}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
