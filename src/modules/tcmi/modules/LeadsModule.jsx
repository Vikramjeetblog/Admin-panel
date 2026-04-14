import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { FiEdit2, FiEye, FiPlus, FiSearch, FiTrash2 } from "react-icons/fi";
import Modal from "../components/Modal";
import TableHeader from "../components/TableHeader";
import { tcmiLeadRows } from "../data/sectionContent";

const emptyForm = { name: "", phone: "", status: "Warm", notes: "" };
const pageSize = 8;

const LeadsModule = ({ globalSearch = "" }) => {
  const [rows, setRows] = useState(tcmiLeadRows);
  const [selectedIds, setSelectedIds] = useState([]);
  const [filters, setFilters] = useState({ search: "", status: "All" });
  const [sort, setSort] = useState({ key: "name", order: "asc" });
  const [page, setPage] = useState(1);
  const [leadModal, setLeadModal] = useState({ open: false, mode: "add", id: null });
  const [leadForm, setLeadForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState({ open: false, ids: [] });
  const [toast, setToast] = useState("");

  const filtered = useMemo(() => {
    const q = `${filters.search} ${globalSearch}`.trim().toLowerCase();
    let list = rows.filter((row) => [row.name, row.phone || "", row.notes || "", row.status || ""].join(" ").toLowerCase().includes(q));
    if (filters.status !== "All") list = list.filter((row) => (row.status || "Warm") === filters.status);
    return [...list].sort((a, b) => {
      const left = String(a[sort.key] || "").toLowerCase();
      const right = String(b[sort.key] || "").toLowerCase();
      return sort.order === "asc" ? left.localeCompare(right) : right.localeCompare(left);
    });
  }, [filters, globalSearch, rows, sort]);

  const pageCount = Math.max(Math.ceil(filtered.length / pageSize), 1);
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  const start = filtered.length ? (page - 1) * pageSize + 1 : 0;
  const end = Math.min(page * pageSize, filtered.length);

  const showToast = (text) => {
    setToast(text);
    setTimeout(() => setToast(""), 2200);
  };

  const openLeadModal = (mode, row = null) => {
    setErrors({});
    setLeadModal({ open: true, mode, id: row?.id || null });
    setLeadForm(row ? { name: row.name, phone: row.phone || "", status: row.status || "Warm", notes: row.notes || "" } : emptyForm);
  };

  const saveLead = () => {
    const nextErrors = {};
    if (!leadForm.name.trim()) nextErrors.name = "Name is required.";
    if (!leadForm.phone.trim()) nextErrors.phone = "Phone is required.";
    if (!leadForm.notes.trim()) nextErrors.notes = "Notes are required.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (leadModal.mode === "add") {
      setRows((prev) => [{ id: `LD-${1000 + prev.length + 1}`, source: "Manual", leadPercentage: 0, followUp: new Date().toISOString().slice(0, 10), converted: false, ...leadForm }, ...prev]);
      showToast("Lead added");
    } else {
      setRows((prev) => prev.map((row) => (row.id === leadModal.id ? { ...row, ...leadForm } : row)));
      showToast("Lead updated");
    }
    setLeadModal({ open: false, mode: "add", id: null });
  };

  const deleteRows = (ids) => {
    setRows((prev) => prev.filter((row) => !ids.includes(row.id)));
    setSelectedIds((prev) => prev.filter((id) => !ids.includes(id)));
    setConfirmDelete({ open: false, ids: [] });
    showToast("Lead deleted");
  };

  return (
    <div className="mt-5 space-y-3">
      {toast && <div className="rounded-lg border border-gray-200 bg-white p-2 text-sm">{toast}</div>}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <FiSearch className="absolute left-2 top-2.5 text-gray-500" size={14} />
            <input value={filters.search} onChange={(e) => { setFilters((prev) => ({ ...prev, search: e.target.value })); setPage(1); }} placeholder="Search leads..." className="rounded-lg border border-gray-200 py-2 pl-8 pr-3 text-xs" />
          </div>
          <select value={filters.status} onChange={(e) => { setFilters((prev) => ({ ...prev, status: e.target.value })); setPage(1); }} className="rounded-lg border border-gray-200 px-3 py-2 text-xs">
            <option>All</option><option>Hot</option><option>Warm</option><option>Cold</option>
          </select>
          <button onClick={() => setFilters({ search: "", status: "All" })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs hover:bg-gray-50">Clear Filters</button>
        </div>
        <button onClick={() => openLeadModal("add")} className="inline-flex items-center gap-1 rounded-lg border border-black bg-black px-3 py-2 text-xs text-white"><FiPlus size={14} /> Add Lead</button>
      </div>

      {selectedIds.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-2 text-xs">
          <span>{selectedIds.length} selected</span>
          <button onClick={() => setConfirmDelete({ open: true, ids: selectedIds })} className="rounded-lg border border-gray-200 px-2 py-1 hover:bg-gray-50">Delete selected</button>
          <button onClick={() => setRows((prev) => prev.map((row) => (selectedIds.includes(row.id) ? { ...row, status: "Hot" } : row)))} className="rounded-lg border border-gray-200 px-2 py-1 hover:bg-gray-50">Change status</button>
        </div>
      )}

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full border-collapse">
          <thead className="bg-white">
            <tr>
              <TableHeader><input type="checkbox" checked={pageRows.length > 0 && pageRows.every((row) => selectedIds.includes(row.id))} onChange={(e) => setSelectedIds(e.target.checked ? pageRows.map((row) => row.id) : [])} /></TableHeader>
              <TableHeader sortable onSort={() => setSort((prev) => ({ key: "name", order: prev.order === "asc" ? "desc" : "asc" }))}>Name ↑↓</TableHeader>
              <TableHeader>Phone</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader sortable onSort={() => setSort((prev) => ({ key: "followUp", order: prev.order === "asc" ? "desc" : "asc" }))}>Follow-up ↑↓</TableHeader>
              <TableHeader>Actions</TableHeader>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 && <tr><td colSpan={6} className="px-3 py-8 text-center text-sm">No leads found. Start by adding a new lead.</td></tr>}
            {pageRows.map((row) => (
              <tr key={row.id} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-3 py-2"><input type="checkbox" checked={selectedIds.includes(row.id)} onChange={(e) => setSelectedIds((prev) => e.target.checked ? [...prev, row.id] : prev.filter((id) => id !== row.id))} /></td>
                <td className="px-3 py-2 text-sm">{row.name}</td>
                <td className="px-3 py-2 text-sm">{row.phone || "-"}</td>
                <td className="px-3 py-2">
                  <select value={row.status || "Warm"} onChange={(e) => setRows((prev) => prev.map((lead) => (lead.id === row.id ? { ...lead, status: e.target.value } : lead)))} className="rounded-lg border border-gray-200 px-2 py-1 text-xs">
                    <option>Hot</option><option>Warm</option><option>Cold</option>
                  </select>
                </td>
                <td className="px-3 py-2 text-sm">{format(new Date(row.followUp), "dd/MM/yy")}</td>
                <td className="px-3 py-2">
                  <div className="flex gap-1">
                    <button onClick={() => openLeadModal("view", row)} className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"><FiEye size={14} /></button>
                    <button onClick={() => openLeadModal("edit", row)} className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"><FiEdit2 size={14} /></button>
                    <button onClick={() => setConfirmDelete({ open: true, ids: [row.id] })} className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50"><FiTrash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between text-xs">
        <p>Showing {start}–{end} of {filtered.length}</p>
        <div className="flex items-center gap-1">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} className="rounded-lg border border-gray-200 px-2 py-1 hover:bg-gray-50">Prev</button>
          {Array.from({ length: pageCount }, (_, i) => i + 1).map((num) => (
            <button key={num} onClick={() => setPage(num)} className={`rounded-lg border px-2 py-1 ${page === num ? "border-black" : "border-gray-200 hover:bg-gray-50"}`}>{num}</button>
          ))}
          <button onClick={() => setPage((p) => Math.min(p + 1, pageCount))} className="rounded-lg border border-gray-200 px-2 py-1 hover:bg-gray-50">Next</button>
        </div>
      </div>

      <Modal
        open={leadModal.open}
        title={leadModal.mode === "add" ? "Add Lead" : leadModal.mode === "edit" ? "Edit Lead" : "View Lead"}
        onClose={() => setLeadModal({ open: false, mode: "add", id: null })}
        footer={leadModal.mode !== "view" ? (
          <>
            <button onClick={() => setLeadModal({ open: false, mode: "add", id: null })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs hover:bg-gray-50">Cancel</button>
            <button onClick={saveLead} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">Save</button>
          </>
        ) : null}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs">Name<input value={leadForm.name} onChange={(e) => setLeadForm((prev) => ({ ...prev, name: e.target.value }))} readOnly={leadModal.mode === "view"} className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2" />{errors.name && <p className="mt-1 text-xs text-gray-600">{errors.name}</p>}</label>
          <label className="text-xs">Phone<input value={leadForm.phone} onChange={(e) => setLeadForm((prev) => ({ ...prev, phone: e.target.value }))} readOnly={leadModal.mode === "view"} className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2" />{errors.phone && <p className="mt-1 text-xs text-gray-600">{errors.phone}</p>}</label>
          <label className="text-xs">Status<select value={leadForm.status} onChange={(e) => setLeadForm((prev) => ({ ...prev, status: e.target.value }))} disabled={leadModal.mode === "view"} className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2"><option>Hot</option><option>Warm</option><option>Cold</option></select></label>
          <label className="text-xs sm:col-span-2">Notes<textarea value={leadForm.notes} onChange={(e) => setLeadForm((prev) => ({ ...prev, notes: e.target.value }))} readOnly={leadModal.mode === "view"} className="mt-1 w-full rounded-lg border border-gray-200 px-2 py-2" rows={3} />{errors.notes && <p className="mt-1 text-xs text-gray-600">{errors.notes}</p>}</label>
        </div>
      </Modal>

      <Modal
        open={confirmDelete.open}
        title="Confirm Delete"
        onClose={() => setConfirmDelete({ open: false, ids: [] })}
        maxWidth="max-w-md"
        footer={
          <>
            <button onClick={() => setConfirmDelete({ open: false, ids: [] })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs hover:bg-gray-50">Cancel</button>
            <button onClick={() => deleteRows(confirmDelete.ids)} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">Delete</button>
          </>
        }
      >
        <p className="text-sm">Are you sure you want to delete?</p>
      </Modal>
    </div>
  );
};

export default LeadsModule;
