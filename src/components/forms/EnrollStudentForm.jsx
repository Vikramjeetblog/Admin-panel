import { useState } from "react";
import { FiX } from "react-icons/fi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from "react";
import Swal from "sweetalert2";
const StudentForm = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    father: "",
    fatherPhone: "",
    course: "",
    mode: "",
    level: "",
    blood: "",
    emergency: "",
  });

  if (!isOpen) return null;

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl p-6 space-y-6">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-medium">Add Student</h2>

          <button onClick={onClose}>
            <FiX size={18} />
          </button>
        </div>

        {/* STEP BAR */}
        <div className="flex gap-2">
          {[1,2,3,4,5,6].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded ${
                step >= s ? "bg-black" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        {/* CONTENT */}
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">

          {/* STEP 1 */}

{step === 1 && (
  <>
    {/* SECTION TITLE */}
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wider text-gray-400">
        Section I: For Student Use
      </p>
      <h2 className="text-lg font-medium">
        A. Student Information
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <Input
        label="Full Name"
        required
        placeholder="Enter full name"
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
      />

      {/* DATE PICKER */}
      <DateField
        label="Date of Birth"
        required
        value={form.dob}
        onChange={(date) => setForm({ ...form, dob: date })}
      />

      <Input
        label="Place of Birth"
        required
        placeholder="Enter place of birth"
        value={form.place}
        onChange={(v) => setForm({ ...form, place: v })}
      />

      <Select
        label="Gender"
        required
        value={form.gender}
        onChange={(v) => setForm({ ...form, gender: v })}
        options={["Male", "Female"]}
      />

      {/* NEW FIELD */}
      <Select
        label="Marital Status"
        required
        value={form.marital}
        onChange={(v) => setForm({ ...form, marital: v })}
        options={["Single", "Married", "Other"]}
      />

      <Input
        label="Nationality"
        required
        placeholder="Enter nationality"
        value={form.nationality}
        onChange={(v) => setForm({ ...form, nationality: v })}
      />

      <Input
        label="Aadhaar Number"
        required
        placeholder="Enter Aadhaar / ID"
        value={form.aadhaar}
        onChange={(v) => setForm({ ...form, aadhaar: v })}
      />

    </div>
  </>
)}
          {/* STEP 2 */}
          {/* STEP 2 */}
{step === 2 && (
  <>
    {/* SECTION TITLE */}
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wider text-gray-400">
        Section I: For Student Use
      </p>
      <h2 className="text-lg font-medium">
        B. Contact Information
      </h2>
    </div>

    {/* CONTACT */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <Input
        label="Student Mobile No."
        required
        placeholder="Enter mobile number"
        value={form.phone}
        onChange={(v) => setForm({ ...form, phone: v })}
      />

      <Input
        label="Alternate Phone No."
        placeholder="Enter alternate number"
        value={form.altPhone}
        onChange={(v) => setForm({ ...form, altPhone: v })}
      />

      <div className="md:col-span-2">
        <Input
          label="Student Email"
          required
          placeholder="Enter email"
          value={form.email}
          onChange={(v) => setForm({ ...form, email: v })}
        />
      </div>

    </div>

    {/* PRESENT ADDRESS */}
    <div className="space-y-2 pt-4">
      <h3 className="text-sm font-medium text-gray-700">
        Present Address
      </h3>

      <TextArea
        label="Street Address"
        required
        placeholder="Enter street address"
        value={form.street}
        onChange={(v) => setForm({ ...form, street: v })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="City / Town"
          required
          placeholder="Enter city"
          value={form.city}
          onChange={(v) => setForm({ ...form, city: v })}
        />

        <Input
          label="District"
          required
          placeholder="Enter district"
          value={form.district}
          onChange={(v) => setForm({ ...form, district: v })}
        />

        <Input
          label="State / Province"
          required
          placeholder="Enter state"
          value={form.state}
          onChange={(v) => setForm({ ...form, state: v })}
        />

        <Input
          label="Pin / Zip Code"
          required
          placeholder="Enter pin code"
          value={form.pin}
          onChange={(v) => setForm({ ...form, pin: v })}
        />
      </div>
    </div>

    {/* PERMANENT ADDRESS */}
    <div className="space-y-2 pt-4">
      <h3 className="text-sm font-medium text-gray-700">
        Permanent Address (if different)
      </h3>

      <TextArea
        label="Street Address"
        placeholder="Enter street address"
        value={form.pStreet}
        onChange={(v) => setForm({ ...form, pStreet: v })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="City / Town"
          placeholder="Enter city"
          value={form.pCity}
          onChange={(v) => setForm({ ...form, pCity: v })}
        />

        <Input
          label="District"
          placeholder="Enter district"
          value={form.pDistrict}
          onChange={(v) => setForm({ ...form, pDistrict: v })}
        />

        <Input
          label="State / Province"
          placeholder="Enter state"
          value={form.pState}
          onChange={(v) => setForm({ ...form, pState: v })}
        />

        <Input
          label="Pin / Zip Code"
          placeholder="Enter pin code"
          value={form.pPin}
          onChange={(v) => setForm({ ...form, pPin: v })}
        />
      </div>
    </div>
  </>
)}

          {/* STEP 3 */}
          
{step === 3 && (
  <>
    {/* SECTION TITLE */}
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wider text-gray-400">
        Section I: For Student Use
      </p>
      <h2 className="text-lg font-medium">
        C. Parent / Guardian Information
      </h2>
    </div>

    <div className="space-y-6">

      {/* FATHER */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">
          Father Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Father's Full Name"
            required
            placeholder="Enter father's name"
            value={form.fatherName}
            onChange={(v) => setForm({ ...form, fatherName: v })}
          />

          <Input
            label="Father's Mobile No."
            required
            placeholder="Enter mobile number"
            value={form.fatherPhone}
            onChange={(v) => setForm({ ...form, fatherPhone: v })}
          />
        </div>
      </div>

      {/* MOTHER */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">
          Mother Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Mother's Full Name"
            placeholder="Enter mother's name"
            value={form.motherName}
            onChange={(v) => setForm({ ...form, motherName: v })}
          />

          <Input
            label="Mother's Mobile No."
            placeholder="Enter mobile number"
            value={form.motherPhone}
            onChange={(v) => setForm({ ...form, motherPhone: v })}
          />
        </div>
      </div>

      {/* GUARDIAN */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">
          Guardian (if different)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Guardian's Full Name"
            placeholder="Enter guardian name"
            value={form.guardianName}
            onChange={(v) => setForm({ ...form, guardianName: v })}
          />

          <Input
            label="Guardian's Mobile No."
            placeholder="Enter mobile number"
            value={form.guardianPhone}
            onChange={(v) => setForm({ ...form, guardianPhone: v })}
          />
        </div>
      </div>

    </div>
  </>
)}

  {/* STEP 4 */}
{step === 4 && (
  <>
    {/* SECTION TITLE */}
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wider text-gray-400">
        Section I: For Student Use
      </p>
      <h2 className="text-lg font-medium">
        D. Medical Information
      </h2>
    </div>

    <div className="space-y-6">

      {/* BASIC MEDICAL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input
          label="Blood Group"
          placeholder="e.g. O+"
          value={form.blood}
          onChange={(v) => setForm({ ...form, blood: v })}
        />

        <Input
          label="Allergies (if any)"
          placeholder="Mention allergies"
          value={form.allergies}
          onChange={(v) => setForm({ ...form, allergies: v })}
        />

        <Input
          label="Identification Mark"
          placeholder="e.g. mole on hand"
          value={form.mark}
          onChange={(v) => setForm({ ...form, mark: v })}
        />

        <Input
          label="Medical Conditions (if any)"
          placeholder="Mention condition"
          value={form.condition}
          onChange={(v) => setForm({ ...form, condition: v })}
        />

      </div>

      {/* EMERGENCY CONTACT */}
      <div className="space-y-3 pt-2">
        <h3 className="text-sm font-medium text-gray-700">
          Emergency Contact (other than parent/guardian)
        </h3>

        <Input
          label="Emergency Contact Name"
          required
          placeholder="Enter name"
          value={form.emergencyName}
          onChange={(v) => setForm({ ...form, emergencyName: v })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <Input
            label="Relationship to Student"
            required
            placeholder="e.g. Uncle"
            value={form.relationship}
            onChange={(v) => setForm({ ...form, relationship: v })}
          />

          <Input
            label="Emergency Phone"
            required
            placeholder="Enter phone number"
            value={form.emergencyPhone}
            onChange={(v) => setForm({ ...form, emergencyPhone: v })}
          />

        </div>

        <Input
          label="Alternate Phone"
          placeholder="Optional"
          value={form.altEmergency}
          onChange={(v) => setForm({ ...form, altEmergency: v })}
        />
      </div>

    </div>
  </>
)}
          
{/* STEP 5 */}
{step === 5 && (
  <>
    {/* SECTION TITLE */}
    <div className="space-y-1">
      <p className="text-xs uppercase tracking-wider text-gray-400">
        Section I: For Student Use
      </p>
      <h2 className="text-lg font-medium">
        E. Course Selection
      </h2>
    </div>

    <div className="space-y-6">

      {/* COURSE TYPE */}
      <RadioGroup
        label="Desired Course Type"
        required
        value={form.courseType}
        onChange={(v) => setForm({ ...form, courseType: v, level: "" })}
        options={["Certificate", "Diploma"]}
      />

      {/* MODE */}
      <RadioGroup
        label="Preferred Mode of Education"
        required
        value={form.mode}
        onChange={(v) => setForm({ ...form, mode: v })}
        options={["Offline", "Online"]}
      />

      {/* CERTIFICATE LEVEL */}
      {form.courseType === "Certificate" && (
        <RadioGroup
          label="Select Level"
          required
          value={form.level}
          onChange={(v) => setForm({ ...form, level: v })}
          options={["Basic", "Intermediate", "Advanced", "Pro"]}
        />
      )}

      {/* DIPLOMA OPTIONS */}
      {form.courseType === "Diploma" && (
        <RadioGroup
          label="Select Diploma Program"
          required
          value={form.level}
          onChange={(v) => setForm({ ...form, level: v })}
          options={[
            "Music Production",
            "Sound Design",
            "Music Production + Business",
            "Sound Design + Production",
            "Sound Design + Production + Business",
          ]}
        />
      )}

      {/* SOURCE */}
      <RadioGroup
        label="How did you hear about us?"
        value={form.source}
        onChange={(v) => setForm({ ...form, source: v })}
        options={["Instagram", "Facebook", "Whatsapp", "Website"]}
      />

      {/* REFERRAL */}
      {form.source === "Referral" && (
        <Input
          label="Referral Details"
          placeholder="Enter reference"
          value={form.referral}
          onChange={(v) => setForm({ ...form, referral: v })}
        />
      )}

    </div>
  </>
)}
 {/* STEP 6 */}
{step === 6 && (
  <>
    {/* DECLARATION */}
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-wider text-gray-400">
        Section I: For Student Use
      </p>

      <h2 className="text-lg font-medium">
        F. Declaration
      </h2>

      <p className="text-sm text-gray-600 leading-relaxed">
        I hereby declare that all the information provided above is true and accurate 
        to the best of my knowledge. I agree to the terms and conditions.
      </p>
    </div>

    <div className="space-y-4">

      <Input
        label="Student Signature (Name)"
        required
        placeholder="Enter full name"
        value={form.studentSign}
        onChange={(v) => setForm({ ...form, studentSign: v })}
      />

      <Input
        label="Parent / Guardian Signature"
        required
        placeholder="Enter name"
        value={form.parentSign}
        onChange={(v) => setForm({ ...form, parentSign: v })}
      />

      <DateField
        label="Date"
        required
        value={form.declarationDate}
        onChange={(date) => setForm({ ...form, declarationDate: date })}
      />
    </div>

    {/* ADMIN SECTION */}
    <div className="border rounded-xl p-4 space-y-4 mt-6 bg-gray-50">

      <div>
        <p className="text-xs uppercase tracking-wider text-gray-400">
          Section 2: For Official Use Only
        </p>
      </div>

      {/* ADMIN FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <DateField
          label="Application Received Date"
          value={form.appDate}
          onChange={(d) => setForm({ ...form, appDate: d })}
        />

        <Input
          label="Application ID"
          value={form.appId}
          onChange={(v) => setForm({ ...form, appId: v })}
        />

        <RadioGroup
          label="Admission Status"
          value={form.admissionStatus}
          onChange={(v) => setForm({ ...form, admissionStatus: v })}
          options={["Accepted", "Rejected", "Waitlisted", "In Review"]}
        />

        <Input
          label="Course Enrolled"
          value={form.courseEnroll}
          onChange={(v) => setForm({ ...form, courseEnroll: v })}
        />

        <Input
          label="Batch / Start Date"
          placeholder="e.g. April Batch"
          value={form.batch}
          onChange={(v) => setForm({ ...form, batch: v })}
        />

        <Input
          label="Fee Structure"
          value={form.fee}
          onChange={(v) => setForm({ ...form, fee: v })}
        />

        <RadioGroup
          label="Payment Status"
          value={form.payment}
          onChange={(v) => setForm({ ...form, payment: v })}
          options={["Paid", "Installments", "Pending"]}
        />

      </div>

      {/* NOTES */}
      <TextArea
        label="Remarks / Notes"
        placeholder="Enter notes"
        value={form.notes}
        onChange={(v) => setForm({ ...form, notes: v })}
      />

    </div>
  </>
)}         
         

        </div>

        {/* ACTIONS */}
        <div className="flex justify-between border-t pt-3">

          {step > 1 && (
            <button onClick={prev} className="border px-4 py-2 rounded">
              Back
            </button>
          )}

          {step < 6 ? (
            <button onClick={next} className="bg-black text-white px-4 py-2 rounded">
              Next
            </button>
          ) : (
            <button
  onClick={() => {
    Swal.fire({
      title: "Submit Admission?",
      text: "Please confirm all details are correct",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Submit",
      confirmButtonColor: "#000",
    }).then((res) => {
      if (res.isConfirmed) {
        onSubmit(form);

        Swal.fire({
          title: "Success!",
          text: "Student added successfully",
          icon: "success",
          confirmButtonColor: "#000",
        });

        // RESET FORM
        setForm({
          name: "",
          dob: "",
          gender: "",
          phone: "",
          email: "",
          address: "",
          father: "",
          fatherPhone: "",
          course: "",
          mode: "",
          level: "",
          blood: "",
          emergency: "",
        });

        setStep(1);
        onClose();
      }
    });
  }}
  className="bg-black text-white px-4 py-2 rounded hover:opacity-90"
>
  Submit
</button>
          )}

        </div>

      </div>
    </div>
  );
};

const Input = ({ label, value, onChange, type="text", placeholder="", required }) => (
  <div className="flex flex-col">

    <label className="text-xs text-gray-500 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className="w-full border px-3 py-2 rounded focus:outline-none focus:border-black"
    />

  </div>
);

const TextArea = ({ label, value, onChange, placeholder="", required }) => (
  <div className="flex flex-col">
    <label className="text-xs text-gray-500 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <textarea
      rows={3}
      placeholder={placeholder}
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className="w-full border px-3 py-2 rounded focus:outline-none focus:border-black resize-none"
    />
  </div>
);
const RadioGroup = ({ label, value, onChange, options, required }) => (
  <div className="space-y-2">

    <label className="text-xs text-gray-500">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <div className="flex flex-wrap gap-4">

      {options.map((opt) => (
        <label
          key={opt}
          className="flex items-center gap-2 text-sm cursor-pointer"
        >
          <input
            type="radio"
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          {opt}
        </label>
      ))}

    </div>
  </div>
);

const Select = ({ label, value, onChange, options, required }) => (
  <div className="flex flex-col">

    <label className="text-xs text-gray-500 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <select
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className="w-full border px-3 py-2 rounded focus:outline-none focus:border-black"
    >
      <option value="">Select</option>
      {options.map((o)=>(
        <option key={o}>{o}</option>
      ))}
    </select>

  </div>
);





/* CUSTOM INPUT */
const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <input
    ref={ref}
    onClick={onClick}
    value={value || ""}
    placeholder="dd/mm/yyyy"
    readOnly
    className="w-full border px-3 py-2 rounded mt-1 cursor-pointer focus:outline-none focus:border-black"
  />
));

/* DATE FIELD */
const DateField = ({ label, value, onChange, required }) => (
  <div className="flex flex-col">

    <label className="text-xs text-gray-500 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>

    <DatePicker
      selected={value}
      onChange={onChange}
      dateFormat="dd/MM/yyyy"
      customInput={
        <input
          placeholder="dd/mm/yyyy"
          className="w-full border px-3 py-2 rounded focus:outline-none focus:border-black"
          readOnly
        />
      }
    />

  </div>
);

export default StudentForm;