import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiEdit2, FiTrash2, FiX, FiCheckCircle } from "react-icons/fi";

const initialData = [
  { id: 1, client: "Rahul Sharma", service: "Music Production", date: "2026-04-01", status: "Completed" },
  { id: 2, client: "Amit Verma", service: "Recording Session", date: "2026-04-03", status: "Pending" },
];

const TCS = () => {
  const [data, setData] = useState(initialData);
  const [form, setForm] = useState({ client: "", service: "", date: null, status: "Pending" });
  const [editItem, setEditItem] = useState(null);

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const formatDate = (date) =>
    date ? date.toLocaleDateString("en-GB") : "";

  const validate = () => {
    const err = {};
    if (!form.client) err.client = "Required";
    if (!form.service) err.service = "Required";
    if (!form.date) err.date = "Required";
    return err;
  };

  const handleAdd = () => {
    const err = validate();
    if (Object.keys(err).length) return setErrors(err);

    const newEntry = {
      id: Date.now(),
      ...form,
      date: formatDate(form.date),
    };

    setData([newEntry, ...data]);
    setForm({ client: "", service: "", date: null, status: "Pending" });
    setErrors({});
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete booking?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
    }).then((res) => {
      if (res.isConfirmed) {
        setData(data.filter((i) => i.id !== id));
      }
    });
  };

  const handleStatusChange = (item) => {
    Swal.fire({
      title: "Update status?",
      text: `Change to ${item.status === "Pending" ? "Completed" : "Pending"}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#000",
    }).then((res) => {
      if (res.isConfirmed) {
        setData(
          data.map((i) =>
            i.id === item.id
              ? {
                  ...i,
                  status:
                    i.status === "Pending" ? "Completed" : "Pending",
                }
              : i
          )
        );
      }
    });
  };

  const filteredData = data.filter((item) => {
    const matchSearch =
      item.client.toLowerCase().includes(search.toLowerCase()) ||
      item.service.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      filter === "All" || item.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div>
        <p className="text-xs uppercase text-gray-400">Brands / TCS</p>
        <h1 className="text-4xl italic">The Chordifiers Studio</h1>
      </div>

      {/* TOP BAR */}
      <div className="flex justify-between items-center gap-2">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1.5 rounded-md w-full max-w-sm"
        />

        <div className="flex gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-1.5 rounded-md"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white px-4 py-1.5 rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden">

        <div className="grid grid-cols-6 text-xs bg-gray-50 px-3 py-2 border-b">
          <div>ID</div>
          <div>Client</div>
          <div>Service</div>
          <div>Date</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {filteredData.map((item) => (
          <div key={item.id} className="grid grid-cols-6 px-3 py-3 border-b items-center">

            <div>{item.id}</div>
            <div>{item.client}</div>
            <div>{item.service}</div>
            <div>{item.date}</div>

            {/* STATUS */}
            <div>
              <button
                onClick={() => handleStatusChange(item)}
                className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border ${
                  item.status === "Completed"
                    ? "border-green-600 text-green-600"
                    : "border-yellow-500 text-yellow-500"
                }`}
              >
                <FiCheckCircle size={12} />
                {item.status}
              </button>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2">

              <button
                onClick={() => setEditItem(item)}
                className="flex items-center gap-1 text-blue-600 text-xs border px-2 py-1 rounded"
              >
                <FiEdit2 size={12} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.id)}
                className="flex items-center gap-1 text-red-500 text-xs border px-2 py-1 rounded"
              >
                <FiTrash2 size={12} />
                Delete
              </button>

            </div>

          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      {isOpen && (
        <Modal
          title="Add Booking"
          form={form}
          setForm={setForm}
          errors={errors}
          onClose={() => setIsOpen(false)}
          onSave={handleAdd}
        />
      )}

      {/* EDIT MODAL */}
      {editItem && (
        <Modal
          title="Edit Booking"
          form={editItem}
          setForm={setEditItem}
          onClose={() => setEditItem(null)}
          onSave={() => {
            setData(data.map((i) => (i.id === editItem.id ? editItem : i)));
            setEditItem(null);
          }}
        />
      )}
    </div>
  );
};

/* MODAL */
const Modal = ({ title, form, setForm, errors = {}, onClose, onSave }) => (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

    <div className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-5">

      <div className="flex justify-between items-center border-b pb-3">
        <h2 className="text-lg font-medium">{title}</h2>

        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100">
          <FiX size={18} />
        </button>
      </div>

      <div className="space-y-3">

        <input
          placeholder="Client"
          value={form.client}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />
        {errors.client && <p className="text-xs text-red-500">{errors.client}</p>}

        <input
          placeholder="Service"
          value={form.service}
          onChange={(e) => setForm({ ...form, service: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        />

        <DatePicker
          selected={form.date ? new Date(form.date) : null}
          onChange={(date) => setForm({ ...form, date })}
          className="w-full border px-3 py-2 rounded-lg"
          dateFormat="dd/MM/yy"
        />

        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="w-full border px-3 py-2 rounded-lg"
        >
          <option>Pending</option>
          <option>Completed</option>
        </select>

      </div>

      <div className="flex justify-end gap-3 border-t pt-3">
        <button onClick={onClose} className="border px-4 py-2 rounded-lg">
          Cancel
        </button>

        <button onClick={onSave} className="bg-black text-white px-5 py-2 rounded-lg">
          Save
        </button>
      </div>

    </div>
  </div>
);

export default TCS;