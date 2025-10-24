import { useState, useEffect, useRef } from "react";
import ContactRow from "../components/ContactRow";
import AddContactForm from "../components/AddContact";
import ProfileCard from "../components/ProfileCard";
import Toast from "./Toaster.jsx";
import ConfirmModal from "./ConfirmModal.jsx";
import ContactHeader from "./ContactHeader.jsx";

const ContactPage = () => {
  const [contacts, setContacts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [showFavorites, setShowFavorites] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingContact, setEditingContact] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "success" });
  const [searchTerm, setSearchTerm] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE;
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/contacts`);
        if (!res.ok) throw new Error("Failed to fetch contacts");
        const data = await res.json();
        setContacts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  
  const filteredContacts = contacts
  .filter((c) =>
    `${c.firstName} ${c.surname}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  )
  .filter((c) => (showFavorites ? c.isFavorite : true));
  

 

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  const handleDeleteRequest = (contact) => {
    setContactToDelete(contact);
    setShowConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (!contactToDelete) return;
    try {
      await fetch(`${BASE_URL}/contacts/${contactToDelete._id}`, {
        method: "DELETE"
      });
      setContacts((prev) => prev.filter((c) => c._id !== contactToDelete._id));
      setToast({ message: "Contact deleted successfully!", type: "success" });
    } catch (err) {
      setToast({ message: "Failed to delete contact.", type: "error" });
      console.error(err);
    } finally {
      setContactToDelete(null);
      setShowConfirm(false);
    }
  };

  const handleToggleFavorite = async (contact) => {
    try {
      const updated = { ...contact, isFavorite: !contact.isFavorite };
      await fetch(`${BASE_URL}/contacts/${contact._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setContacts((prev) =>
        prev.map((c) => (c._id === contact._id ? updated : c))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = (newContact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const handleUpdate = (updatedContact) => {
    setContacts((prev) => prev.map((c) => (c._id === updatedContact._id ? updatedContact : c)));
    setEditingContact(null);
  };

  const finalFilteredContacts = showFavorites 
    ? filteredContacts.filter((c) => c.isFavorite) 
    : filteredContacts;


  return (
    <div className="min-h-screen bg-[#0D1117] text-white flex">
      <div className="w-[80%] border-r border-white/10">
        <ContactHeader
  contacts={contacts}
  viewMode={viewMode}
  setViewMode={setViewMode}
  showFavorites={showFavorites}
  setShowFavorites={setShowFavorites}
  onSearchChange={setSearchTerm}
/>

        <div className="mt-32 p-6">
          {loading ? (
            <p className="text-white/60">Loading contacts...</p>
          ) : contacts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white/80 mb-2">No contacts to show</h3>
                <p className="text-white/60 mb-6">Add a new contact to get started</p>
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-2xl">📇</span>
                </div>
              </div>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {finalFilteredContacts.map((c) => (
                <ProfileCard
                  key={c._id}
                  contact={c}
                  onEdit={handleEdit}
                  onDelete={handleDeleteRequest}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          ) : (
            <ContactRow contacts={finalFilteredContacts} onDelete={handleDeleteRequest} onEdit={handleEdit} onToggleFavorite={handleToggleFavorite} />
          )}
        </div>
      </div>

      <div className="fixed top-[0] right-0 w-[20%] h-screen bg-[#161B22] backdrop-blur-xl z-30 overflow-y-auto">
        <div className="p-6">
          <AddContactForm
            editContact={editingContact}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
          />
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "success" })}
      />

      <ConfirmModal
        open={showConfirm}
        title="Delete Contact"
        description={`Are you sure you want to delete contact "${contactToDelete?.firstName} ${contactToDelete?.surname}"? This cannot be undone.`}
        onCancel={() => { setShowConfirm(false); setContactToDelete(null); }}
        onConfirm={handleDeleteConfirm}
      />

    </div>
  );
};

export default ContactPage;
