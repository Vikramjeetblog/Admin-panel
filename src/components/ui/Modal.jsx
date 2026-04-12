import { useState, useEffect } from "react";

const initialData = [
  { id: 1, client: "Rahul Sharma", service: "Music Production", date: "2026-04-01", status: "Completed" },
  { id: 2, client: "Amit Verma", service: "Recording Session", date: "2026-04-03", status: "Pending" },
];

const TCS = () => {
  const [data, setData] = useState(initialData);

  const [form, setForm] = useState({
    client: "",
    service: "",
    date: "",
    status: "Pending",
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // Close modal on ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!form.client) newErrors.client = "Client required";
    if (!form.service) newErrors.service = "Service required";
    if (!form.date) newErrors.date = "Date required";
    return newErrors;
  };

  const handleAdd = () => {
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const newEntry = {
      id: Date.now(),
      ...form,
    };

    setData([newEntry, ...data]);
    setForm({ client: "", service: "", date: "", status: "Pending" });
    setErrors({});
    setIsOpen(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const toggleStatus = (id) => {
    setData(
      data.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "Pending" ? "Completed" : "Pending",
            }
          : item
      )
    );
  };

  const filteredData = data.filter((item) => {
    const matchSearch =
      item.client.toLowerCase().includes(search.toLowerCase()) ||
      item.service.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" ? true : item.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
          Brands / TCS
        </p>
        <h1 className="text-4xl italic mt-1">
          The Chordifiers Studio
        </h1>
      </div>

      {/* TOP BAR */}
      <div className="flex justify-between items-center">

        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1.5 text-sm rounded-md w-full max-w-sm"
        />

        <div className="flex gap-2 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-1.5 text-sm rounded-md"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-black text-white px-4 py-1.5 text-sm rounded-md"
          >
            Add Booking
          </button>
        </div>

      </div>

      {/* TABLE */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">

        <div className="grid grid-cols-6 text-[11px] uppercase text-gray-500 px-3 py-2 border-b bg-gray-50">
          <div>ID</div>
          <div>Client</div>
          <div>Service</div>
          <div>Date</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {filteredData.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-400">
            No bookings found
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-6 px-3 py-2 text-sm items-center border-b hover:bg-gray-50"
            >
              <div>{item.id}</div>
              <div>{item.client}</div>
              <div>{item.service}</div>
              <div>{item.date}</div>

              <div>
                <button
                  onClick={() => toggleStatus(item.id)}
                  className={`text-[11px] px-2 py-[2px] border rounded ${
                    item.status === "Completed"
                      ? "border-black text-black"
                      : "border-gray-300 text-gray-400"
                  }`}
                >
                  {item.status}
                </button>
              </div>

              <div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-500 text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

      </div>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">

          <div className="bg-white w-full max-w-md rounded-xl p-6 space-y-4 animate-[fadeIn_0.2s_ease]">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Add Booking</h2>
              <button onClick={() => setIsOpen(false)}>✕</button>
            </div>

            <div className="space-y-3">

              <div>
                <input
                  placeholder="Client"
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md"
                />
                {errors.client && <p className="text-xs text-red-500">{errors.client}</p>}
              </div>

              <div>
                <input
                  placeholder="Service"
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md"
                />
                {errors.service && <p className="text-xs text-red-500">{errors.service}</p>}
              </div>

              <div>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full border px-3 py-2 rounded-md"
                />
                {errors.date && <p className="text-xs text-red-500">{errors.date}</p>}
              </div>

              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option>Pending</option>
                <option>Completed</option>
              </select>

            </div>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-sm border rounded-md"
              >
                Cancel
              </button>

              <button
                onClick={handleAdd}
                className="bg-black text-white px-4 py-2 text-sm rounded-md"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default TCS;