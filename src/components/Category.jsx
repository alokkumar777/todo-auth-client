
import { useState } from 'react';
import api from '../api/axios';

const Category = ({ category, onCategoryDeleted, onCategoryUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(category.name);

  const handleDelete = async () => {
    try {
      await api.delete(`/categories/${category._id}`);
      onCategoryDeleted(category._id);
    } catch (error) {
      console.error('Failed to delete category', error);
      alert('Failed to delete category');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/categories/${category._id}`, { name });
      onCategoryUpdated(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update category', error);
      alert('Failed to update category');
    }
  };

  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {isEditing ? (
        <form onSubmit={handleUpdate} className="w-100">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <button className="btn btn-success" type="submit">Save</button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </form>
      ) : (
        <>
          {category.name}
          <div>
            <button className="btn btn-sm btn-primary me-2" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default Category;
