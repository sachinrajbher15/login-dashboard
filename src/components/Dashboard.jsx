import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addItem, editItem, deleteItem, setData, logout } from "../redux/store";
import data from "../data";

const Dashboard = () => {
  const isAuthenticated = useSelector((state) => state.isAuthenticated);
  const dataFromStore = useSelector((state) => state.data);
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState(null);
  const [newItemForm, setNewItemForm] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  useEffect(() => {
    setTimeout(() => {
      dispatch(setData(data));
      setLoading(false);
    }, 2000); // Simulate a 2-second delay
  }, [dispatch]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const currentDate = new Date();
    const age = currentDate.getFullYear() - birthDate.getFullYear();
    const month = currentDate.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && currentDate.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
    toast.success("Item deleted successfully");
  };

  const handleEdit = (id, name, dob) => {
    setEditingItem(id);
    setName(name);
    setDob(dob);
  };

  const handleUpdate = () => {
    dispatch(editItem(editingItem, name, dob));
    toast.success("Item updated successfully");
    setEditingItem(null);
  };

  const handleAdd = () => {
    const newItem = { id: Date.now(), name, dob };
    dispatch(addItem(newItem));
    toast.success("Item added successfully");
    setNewItemForm(false);
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="dash-container">
      <h2>Dashboard</h2>
      <button id="logout-button" onClick={() => dispatch(logout())}>Logout</button>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {!newItemForm && <button id="add-button" onClick={() => setNewItemForm(true)}>Add New Item</button>}
          {newItemForm && (
            <div className="additem-container">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name" />
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
              <button id="add" onClick={handleAdd}>Add Item</button>
              <button id="cancel" onClick={() => setNewItemForm(false)}>Cancel</button>
            </div>
          )}

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Date of Birth</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dataFromStore.map((item) => (
                <tr key={item.id}>
                  <td>
                    {editingItem === item.id ? (
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                    ) : item.name}
                  </td>
                  <td>
                    {editingItem === item.id ? (
                      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
                    ) : calculateAge(item.dob)}
                  </td>
                  <td>{item.dob}</td>
                  <td className="action-container">
                    {editingItem === item.id ? (
                      <button onClick={handleUpdate}>Save</button>
                    ) : (
                      <button id="edit-button" onClick={() => handleEdit(item.id, item.name, item.dob)}>Edit</button>
                    )}
                    <button id="delete-button" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Dashboard;
