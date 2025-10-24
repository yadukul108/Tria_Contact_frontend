import { useState, useEffect } from "react";
import Toast from "./Toaster.jsx";

const AddContactForm = ({ onAdd, editContact, onUpdate }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    phone: "",
    email: "",
    note: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});
  const BASE_URL = import.meta.env.VITE_API_BASE;
  
  useEffect(() => {
    if (editContact) setFormData(editContact);
    else
      setFormData({
        firstName: "",
        surname: "",
        phone: "",
        email: "",
        note: "",
      });
  }, [editContact]);

  const toProperCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  };

  const validate = (data) => {
    const newErrors = {};

    // First name
    if (!data.firstName.trim()) newErrors.firstName = "First name is required.";
    else if (!/^[A-Za-z]+$/.test(data.firstName))
      newErrors.firstName = "Only alphabets allowed (no spaces).";

    // Surname
    if (!data.surname.trim()) newErrors.surname = "Surname is required.";
    else if (!/^[A-Za-z]+$/.test(data.surname))
      newErrors.surname = "Only alphabets allowed (no spaces).";

    // Phone
    if (!/^\d{10}$/.test(data.phone))
      newErrors.phone = "Enter a valid 10-digit phone number.";

if (
  data.email.trim() !== "" && 
  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
) {
  newErrors.email = "Enter a valid email address.";
}


    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "firstName" || name === "surname") {
      formattedValue = value.replace(/[^A-Za-z]/g, ""); 
    } else if (name === "phone") {
      formattedValue = value.replace(/\D/g, ""); 
    } else if (name === "email") {
      formattedValue = value.trim().toLowerCase();
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const formatBeforeSubmit = (data) => ({
    ...data,
    firstName: toProperCase(data.firstName.trim()),
    surname: toProperCase(data.surname.trim()),
    email: data.email.toLowerCase().trim(),
    phone: data.phone.trim(),
    note: data.note.trim(),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    const formattedData = formatBeforeSubmit(formData);
    const validationErrors = validate(formattedData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const isEditing = !!editContact;
      const url = isEditing
      ? `${BASE_URL}/contacts/${editContact._id}`
      : `${BASE_URL}/contacts`;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        if (res.status === 400) {
          if (errorData.error.includes("Phone number")) {
            setErrors({ phone: errorData.error });
          } else if (errorData.error.includes("Email")) {
            setErrors({ email: errorData.error });
          } else {
            setErrors({ general: errorData.error });
          }
          return;
        }
        throw new Error(isEditing ? "Failed to update contact" : "Failed to add contact");
      }

      const contact = await res.json();

      setToast({
        message: isEditing
          ? "Contact updated successfully!"
          : "Contact added successfully!",
        type: "success",
      });

      if (isEditing) onUpdate?.(contact);
      else onAdd?.(contact);

      setFormData({
        firstName: "",
        surname: "",
        phone: "",
        email: "",
        note: "",
      });
      setErrors({});
    } catch (err) {
      console.error(err);
      setToast({
        message: err.message || "Something went wrong",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: "", type: "" })}
      />
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 font-mono">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-[#FFD24C]">
            {editContact ? "Edit Contact" : "Add Contact"}
          </h3>
          {!editContact && (
            <button
              type="button"
              onClick={() => {
                setFormData({
                  firstName: "",
                  surname: "",
                  phone: "",
                  email: "",
                  note: "",
                });
                setErrors({});
              }}
              className="text-xs text-white/60 hover:text-white transition-colors underline"
            >
              Clear All
            </button>
          )}
        </div>

        <div>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className={`bg-white/10 border rounded-lg p-2 text-sm w-full ${
              errors.firstName ? "border-red-500" : "border-white/20"
            }`}
            autoComplete="off"
            required
          />
          {errors.firstName && (
            <div className="mt-1 p-2 bg-red-500/10 border border-red-500 rounded text-red-400 text-xs">
              {errors.firstName}
            </div>
          )}
        </div>

        <div>
          <input
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Surname"
            className={`bg-white/10 border rounded-lg p-2 text-sm w-full ${
              errors.surname ? "border-red-500" : "border-white/20"
            }`}
            autoComplete="off"
            required
          />
          {errors.surname && (
            <div className="mt-1 p-2 bg-red-500/10 border border-red-500 rounded text-red-400 text-xs">
              {errors.surname}
            </div>
          )}
        </div>

        <div>
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone (10 digits)"
            className={`bg-white/10 border rounded-lg p-2 text-sm w-full ${
              errors.phone ? "border-red-500" : "border-white/20"
            }`}
            autoComplete="off"
            required
            maxLength="10"
          />
          {errors.phone && (
            <div className="mt-1 p-2 bg-red-500/10 border border-red-500 rounded text-red-400 text-xs">
              {errors.phone}
            </div>
          )}
        </div>

        <div>
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            type="text"
            className={`bg-white/10 border rounded-lg p-2 text-sm w-full ${
              errors.email ? "border-red-500" : "border-white/20"
            }`}
          />
          {errors.email && (
            <div className="mt-1 p-2 bg-red-500/10 border border-red-500 rounded text-red-400 text-xs">
              {errors.email}
            </div>
          )}
        </div>

        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          placeholder="Add a note"
          className="bg-white/10 border border-white/20 rounded-lg p-2 text-sm resize-none"
          autoComplete="off"
        />
  
        <button
  type="submit"
  disabled={loading}
  className={`mt-2 bg-[#FFD24C] text-slate-800 font-semibold rounded-lg py-2 
              transition-all duration-200 
              ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#ffcf3a] hover:scale-[1.03] cursor-pointer shadow-md hover:shadow-lg'}`}
>
  {loading ? "Saving..." : editContact ? "Update Contact" : "Save Contact"}
</button>

      </form>
    </>
  );
};

export default AddContactForm;
