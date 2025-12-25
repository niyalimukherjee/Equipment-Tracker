import { useEffect, useState } from "react";
import API from "./api";
import EquipmentForm from "./components/EquipmentForm";
import EquipmentTable from "./components/EquipmentTable";

function App() {
  const [equipment, setEquipment] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const fetchEquipment = async () => {
    const res = await API.get("/");
    setEquipment(res.data);
  };

  useEffect(() => {
    fetchEquipment();
  }, []);

  const addOrUpdate = async (item) => {
    if (editingItem) {
      await API.put(`/${editingItem.id}`, item);
    } else {
      await API.post("/", item);
    }
    setEditingItem(null);
    fetchEquipment();
  };

  const deleteItem = async (id) => {
    await API.delete(`/${id}`);
    fetchEquipment();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Equipment Tracker</h2>
      <EquipmentForm onSubmit={addOrUpdate} editingItem={editingItem} />
      <EquipmentTable
        equipment={equipment}
        onEdit={setEditingItem}
        onDelete={deleteItem}
      />
    </div>
  );
}

export default App;
