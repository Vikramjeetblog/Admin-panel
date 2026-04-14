import React from "react";
import Modal from "../../components/Modal";

const LeadFormModal = ({ leadModal, setLeadModal, leadForm, setLeadForm, errors, onSave, normalizePhone }) => (
  <Modal
    open={leadModal.open}
    title={leadModal.mode === "add" ? "Add Lead" : leadModal.mode === "edit" ? "Edit Lead" : "View Lead"}
    onClose={() => setLeadModal({ open: false, mode: "add", id: null })}
    footer={leadModal.mode !== "view" ? (
      <>
        <button onClick={() => setLeadModal({ open: false, mode: "add", id: null })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs hover:bg-gray-50">Cancel</button>
        <button onClick={onSave} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">Save</button>
      </>
    ) : null}
  >
    <div className="grid gap-3 sm:grid-cols-2">
      <label className="text-xs">Name<input value={leadForm.name} onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))} readOnly={leadModal.mode === "view"} className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2" />{errors.name && <p className="mt-1 text-xs text-gray-600">{errors.name}</p>}</label>
      <label className="text-xs">Phone<input value={leadForm.phone} onChange={(e) => setLeadForm((prev) => ({ ...prev, phone: normalizePhone(e.target.value) }))} maxLength={10} inputMode="numeric" readOnly={leadModal.mode === "view"} className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2" />{errors.phone && <p className="mt-1 text-xs text-gray-600">{errors.phone}</p>}</label>
      <label className="text-xs">Status<select value={leadForm.status} onChange={(e) => setLeadForm((prev) => ({ ...prev, status: e.target.value }))} disabled={leadModal.mode === "view"} className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2"><option>Hot</option><option>Warm</option><option>Cold</option></select></label>
      <label className="text-xs sm:col-span-2">Notes<textarea value={leadForm.notes} onChange={(e) => setLeadForm((prev) => ({ ...prev, notes: e.target.value }))} readOnly={leadModal.mode === "view"} className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2" rows={3} />{errors.notes && <p className="mt-1 text-xs text-gray-600">{errors.notes}</p>}</label>
    </div>
  </Modal>
);

export default LeadFormModal;
