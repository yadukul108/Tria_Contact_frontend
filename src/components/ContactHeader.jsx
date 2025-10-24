import React from "react";
import { Grid, List, Star } from "lucide-react";
import SearchBar from "./SearchBar.jsx";

const ContactHeader = ({
  contacts,
  viewMode,
  setViewMode,
  showFavorites,
  setShowFavorites,
  onSearchChange
}) => {
  return (
    <div className="fixed top-0 left-0 w-[80%] bg-[#0D1117] z-40 border-b border-white/10 p-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-garamond font-semibold text-[#FFD24C]">
            Your Contacts
          </h2>
          <p className="text-sm text-white/60 mt-1">
            {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SearchBar contacts={contacts} onSearchChange={onSearchChange} />

          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition ${
              viewMode === "grid"
                ? "bg-[#FFD24C]/20 text-[#FFD24C]"
                : "hover:bg-white/10"
            }`}
          >
            <Grid size={18} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition ${
              viewMode === "list"
                ? "bg-[#FFD24C]/20 text-[#FFD24C]"
                : "hover:bg-white/10"
            }`}
          >
            <List size={18} />
          </button>

          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className={`flex items-center gap-1 px-3 py-1.5 text-sm rounded-full border transition ${
              showFavorites
                ? "border-[#FFD24C] text-[#FFD24C] bg-[#FFD24C]/10"
                : "border-white/20 hover:border-[#FFD24C]/50"
            }`}
          >
            <Star size={14} />
            {showFavorites ? "All" : "Favourites"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactHeader;
