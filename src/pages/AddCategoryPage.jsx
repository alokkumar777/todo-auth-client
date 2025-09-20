import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Loader from "../components/Loader";

const AddCategoryPage = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCategoryCreated = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/categories", { name });
      handleCategoryCreated(res.data);
      setName("");
    } catch (error) {
      console.error("Failed to create category", error);
      alert("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">
        Add Category
      </h2>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="New category, eg: Work, Personal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition"
          type="submit"
        >
          Create
        </button>
      </form>
      <button
        className="mt-6 px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded transition"
        onClick={() => navigate("/")}
      >
        Go Back
      </button>
    </div>
  );
};

export default AddCategoryPage;
