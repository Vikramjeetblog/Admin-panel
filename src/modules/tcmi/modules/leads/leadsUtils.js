export const normalizePhone = (value = "") => value.replace(/\D/g, "").slice(0, 10);

export const validateLeadForm = (leadForm) => {
  const nextErrors = {};

  if (!leadForm.name.trim()) nextErrors.name = "Name is required.";
  if (!/^\d{10}$/.test(leadForm.phone)) nextErrors.phone = "Phone must be exactly 10 digits.";
  if (!leadForm.notes.trim()) nextErrors.notes = "Notes are required.";

  return nextErrors;
};
