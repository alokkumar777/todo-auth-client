import { useNavigate } from "react-router-dom";
import CreateCategory from "../components/CreateCategory";

const AddCategoryPage = () => {
  const navigate = useNavigate();

  const handleCategoryCreated = () => {
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h2 className="text-3xl font-semibold mb-6 text-gray-900">
        Add Category
      </h2>
      <CreateCategory onCategoryCreated={handleCategoryCreated} />
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
