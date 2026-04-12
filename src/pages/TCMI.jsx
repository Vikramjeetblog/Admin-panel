import React, { useState } from "react";
import { FiUserPlus, FiEye, FiEdit2 } from "react-icons/fi";
import StudentForm from "../components/forms/EnrollStudentForm";

const initialStudents = [
  {
    id: 1,
    name: "Rahul Sharma",
    course: "Guitar",
    status: "Active",
    date: "18/04/26",
    fullData: {},
  },
];

const TCMI = () => {
  const [data, setData] = useState(initialStudents);
  const [openForm, setOpenForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ADD / EDIT
  const handleAddStudent = (student) => {
    if (editStudent) {
      // EDIT
      setData((prev) =>
        prev.map((item) =>
          item.id === editStudent.id
            ? {
                ...item,
                name: student.name,
                course: student.level || student.courseType,
                fullData: student,
              }
            : item
        )
      );
      setEditStudent(null);
    } else {
      // ADD
      setData([
        {
          id: Date.now(),
          name: student.name,
          course: student.level || student.courseType,
          status: "Active",
          date: new Date().toLocaleDateString("en-GB"),
          fullData: student,
        },
        ...data,
      ]);
    }
  };

  // FILTER
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.course?.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || item.status === filter;

    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto">

      {/* HEADER */}
      <div>
        <p className="text-xs uppercase text-gray-400">Brands / TCMI</p>
        <h1 className="text-4xl italic">Music Institute</h1>
      </div>

      {/* TOP BAR */}
      <div className="flex justify-between items-center gap-3 flex-wrap">

        <input
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full max-w-sm"
        />

        <div className="flex gap-2">

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>

          <button
            onClick={() => {
              setEditStudent(null);
              setOpenForm(true);
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md"
          >
            <FiUserPlus size={16} />
            Add Student
          </button>

        </div>
      </div>

      {/* TABLE */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">

        {/* HEADER */}
        <div className="grid grid-cols-5 text-xs uppercase text-gray-500 bg-gray-50 px-4 py-3 border-b">
          <div>Name</div>
          <div>Course</div>
          <div>Date</div>
          <div>Status</div>
          <div>Action</div>
        </div>

        {/* ROWS */}
        {filteredData.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-400">
            No students found
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 px-4 py-3 border-b text-sm items-center hover:bg-gray-50"
            >
              <div>{item.name}</div>
              <div>{item.course}</div>
              <div>{item.date}</div>

              <div>
                <span className="text-xs px-2 py-1 rounded-full border border-green-600 text-green-600">
                  {item.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="flex gap-2">

                {/* VIEW */}
                <button
                  onClick={() => setViewStudent(item.fullData)}
                  className="p-2 border rounded hover:bg-gray-100"
                >
                  <FiEye />
                </button>

                {/* EDIT */}
                <button
                  onClick={() => {
                    setEditStudent(item);
                    setOpenForm(true);
                  }}
                  className="p-2 border rounded hover:bg-gray-100"
                >
                  <FiEdit2 />
                </button>

              </div>
            </div>
          ))
        )}
      </div>

      {/* FORM */}
      <StudentForm
        isOpen={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditStudent(null);
        }}
        onSubmit={handleAddStudent}
        editData={editStudent?.fullData} // 🔥 IMPORTANT
      />

      {/* VIEW MODAL */}
      {viewStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-2xl p-6 rounded-xl space-y-4 max-h-[80vh] overflow-y-auto">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Student Details</h2>
              <button onClick={() => setViewStudent(null)}>✕</button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

              {Object.entries(viewStudent).map(([key, value]) => (
                <div key={key}>
                  <p className="text-gray-400 text-xs capitalize">{key}</p>
                  <p>{value?.toString()}</p>
                </div>
              ))}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default TCMI;