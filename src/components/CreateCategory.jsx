
import { useState } from 'react';
import api from '../api/axios';

const CreateCategory = ({ onCategoryCreated }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/categories', { name });
      onCategoryCreated(res.data);
      setName('');
    } catch (error) {
      console.error('Failed to create category', error);
      alert('Failed to create category');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn btn-primary" type="submit">Create</button>
      </div>
    </form>
  );
};

export default CreateCategory;
