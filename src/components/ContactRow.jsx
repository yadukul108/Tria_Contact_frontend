import { Star, Trash2, Edit } from "lucide-react";

const ContactRow = ({ contacts, onDelete, onEdit, onToggleFavorite }) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="min-w-full text-sm text-left text-white/80 border-collapse">
        
        <thead className="sticky top-0 bg-white/10 text-[#FFD24C] uppercase text-xs tracking-wider z-10">
          <tr>
            <th className="px-4 py-3">Profile</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Note</th>
            <th className="px-4 py-3 text-center">Favourite</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        
        <tbody>
          {contacts.map((contact) => (
            <tr
              key={contact._id}
              className="border-t border-white/10 hover:bg-[#FFD24C]/5 transition-colors"
            >
              <td className="px-4 py-3">
                <img
                   src={contact.profileImage || "https://images.unsplash.com/photo-1457449940276-e8deed18bfff?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=500"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover border border-white/20"
                  loading="lazy"
                />
              </td>

              <td className="px-4 py-3 font-medium">
                {contact.firstName} {contact.surname}
              </td>

              <td className="px-4 py-3">{contact.phone || "-"}</td>

              <td className="px-4 py-3 truncate max-w-[180px]">
                {contact.email || "-"}
              </td>

              <td className="px-4 py-3 text-white/70 italic truncate max-w-[200px]">
                {contact.note || "—"}
              </td>

              <td className="px-4 py-3 text-center">
                <button 
                  onClick={() => onToggleFavorite?.(contact)}
                  className="p-1 rounded-md hover:bg-[#FFD24C]/10 transition"
                >
                  <Star
                    size={16}
                    className={
                      contact.isFavorite
                        ? "text-[#FFD24C]"
                        : "text-white hover:text-[#FFD24C]"
                    }
                  />
                </button>
              </td>

              <td className="px-4 py-3 flex justify-center gap-2">
                <button className="p-2 rounded-md hover:bg-[#FFD24C]/10 transition" onClick={() => onEdit?.(contact)}>
                  <Edit size={14} />
                </button>
                <button className="p-2 rounded-md hover:bg-[#FFD24C]/10 transition" onClick={() => onDelete?.(contact)}>
                  <Trash2 size={14} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactRow;
