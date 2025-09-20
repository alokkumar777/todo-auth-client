
import { useState } from 'react';
import api from '../api/axios';

const Task = ({ task, onTaskDeleted, onTaskUpdated }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleDelete = async () => {
    try {
      await api.delete(`/tasks/${task._id}`);
      onTaskDeleted(task._id);
    } catch (error) {
      console.error('Failed to delete task', error);
      alert('Failed to delete task');
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/tasks/${task._id}`, { title, description });
      onTaskUpdated(res.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update task', error);
      alert('Failed to update task');
    }
  };

  const toggleComplete = async () => {
    try {
      const res = await api.put(`/tasks/${task._id}`, { completed: !task.completed });
      onTaskUpdated(res.data);
    } catch (error) {
      console.error('Failed to update task', error);
      alert('Failed to update task');
    }
  };

  return (
    <div className={`card mb-3 ${task.completed ? 'bg-light' : ''}`}>
      <div className="card-body">
        {isEditing ? (
          <form onSubmit={handleUpdate}>
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
            <button type="submit" className="btn btn-success me-2">Save</button>
            <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <div className="d-flex justify-content-between">
              <h5 className="card-title">{task.title}</h5>
              <div>
                <button className="btn btn-sm btn-primary me-2" onClick={() => setIsEditing(true)}>Edit</button>
                <button className="btn btn-sm btn-danger" onClick={handleDelete}>Delete</button>
              </div>
            </div>
            <p className="card-text">{task.description}</p>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={task.completed}
                onChange={toggleComplete}
              />
              <label className="form-check-label">Completed</label>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Task;
