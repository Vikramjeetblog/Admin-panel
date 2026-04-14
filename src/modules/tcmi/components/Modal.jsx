import React from "react";

const Modal = ({ open, title, onClose, children, footer, maxWidth = "max-w-xl" }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className={`w-full ${maxWidth} rounded-lg border border-gray-200 bg-white p-3`}>
        <div className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
          <h4 className="text-lg font-semibold">{title}</h4>
          <button onClick={onClose} className="rounded-lg border border-gray-200 px-2 py-1 text-xs hover:bg-gray-50">Close</button>
        </div>
        {children}
        {footer && <div className="mt-3 flex justify-end gap-2">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
