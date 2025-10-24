import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({ contacts, onSearchChange }) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);
  const inputRef = useRef();
  const suggestionRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      onSearchChange(search); 
    }, 300); 
    return () => clearTimeout(timer);
  }, [search, onSearchChange]);

  const getFilteredContacts = (searchTerm) => {
    if (!searchTerm.trim()) return contacts;
    return contacts.filter((c) => 
      `${c.firstName} ${c.surname}`.toLowerCase().includes(searchTerm.trim().toLowerCase())
    );
  };

  useEffect(() => {
    if (search.trim() && searchFocused) {
      const filtered = contacts.filter((c) =>
        `${c.firstName} ${c.surname}`
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8));
    } else {
      setSuggestions([]);
    }
  }, [search, contacts, searchFocused]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target) &&
        inputRef.current &&
        !inputRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSuggestionPicked = (c) => {
    setSearch(`${c.firstName} ${c.surname}`);
    setSuggestions([]);
    onSearchChange(`${c.firstName} ${c.surname}`);
  };
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute top-1/2 left-3 -translate-y-1/2 text-[#FFD24C] pointer-events-none"
      />
      <input
        type="text"
        placeholder="Search from contacts"
        className={`transition-all pl-10 pr-10 py-2 rounded-full bg-white/10 border-2 outline-none w-80 duration-200 text-white ${
          searchFocused ? "border-[#FFD24C]" : "border-white/30"
        } focus:shadow focus:shadow-[#FFD24C33]`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.currentTarget.blur();
          }
        }}
        onFocus={() => setSearchFocused(true)}
        onBlur={() => setSearchFocused(false)}
        ref={inputRef}
      />
      {search && (
        <button
          onClick={() => {
            setSearch("");
            setSuggestions([]);
            onSearchChange("");
          }}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
        >
          <X size={16} />
        </button>
      )}
      {search && suggestions.length > 0 && (
        <ul
          ref={suggestionRef}
          className="absolute left-0 top-11 bg-[#161B22] border border-white/20 w-full rounded-lg shadow text-sm z-30 max-h-60 overflow-y-auto"
        >
          {suggestions.map((s) => (
            <li
              key={s._id}
              className="px-3 py-2 hover:bg-[#FFD24C]/20 cursor-pointer"
              onMouseDown={() => handleSuggestionPicked(s)}
            >
              {s.firstName} {s.surname}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
