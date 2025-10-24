import React from 'react'

const ConfirmModal = ({ open, title, description, onCancel, onConfirm }) => {
    if (!open) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60">
        <div className="bg-[#161B22] p-6 rounded-xl w-96 shadow-lg border border-white/10">
          <h3 className="text-lg font-semibold mb-2 text-[#FFD24C]">{title}</h3>
          <p className="text-white/80 mb-6">{description}</p>
          <div className="flex gap-3 justify-end">
            <button onClick={onCancel} className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white">Cancel</button>
            <button onClick={onConfirm} className="px-3 py-1.5 rounded bg-[#FFD24C] text-black font-semibold hover:bg-[#ffcf3a]">Yes, Delete</button>
          </div>
        </div>
      </div>
    );
  };

export default ConfirmModal
