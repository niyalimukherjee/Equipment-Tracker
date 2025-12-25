import { useEffect, useState } from "react";

const initialState = {
  name: "",
  type: "",
  status: "",
  lastCleaned: "",
};

export default function EquipmentForm({ onSubmit, editingItem }) {
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (editingItem) setForm(editingItem);
  }, [editingItem]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.type || !form.status)
      return alert("All fields required");
    onSubmit(form);
    setForm(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" placeholder="Name" value={form.name} onChange={handleChange} />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="">Type</option>
        <option>Machine</option>
        <option>Vessel</option>
        <option>Tank</option>
        <option>Mixer</option>
      </select>

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="">Status</option>
        <option>Active</option>
        <option>Inactive</option>
        <option>Under Maintenance</option>
      </select>

      <input type="date" name="lastCleaned" value={form.lastCleaned} onChange={handleChange} />
      <button type="submit">{editingItem ? "Update" : "Add"}</button>
    </form>
  );
}
