
import { useState } from 'react';
import api from '../api/axios';

const CreateTask = ({ categories, onTaskCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/tasks', {
        title,
        description,
        categoryId: categoryId || null,
      });
      onTaskCreated(res.data);
      setTitle('');
      setDescription('');
      setCategoryId('');
    } catch (error) {
      console.error('Failed to create task', error);
      alert('Failed to create task');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3">
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">None</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Create Task</button>
    </form>
  );
};

export default CreateTask;
