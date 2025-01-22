import { useState } from "react";
import { useAxios } from "../context/AuthProvider";

const QuestionForm = () => {
  const api = useAxios();
  const [formData, setFormData] = useState({
    question: "",
    options: { A: "", B: "", C: "", D: "" },
    answer: "",
    marks: 0,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (["A", "B", "C", "D"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        options: { ...prevData.options, [name]: value },
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Validate required fields
    if (
      !formData.question ||
      !formData.options.A ||
      !formData.options.B ||
      !formData.options.C ||
      !formData.options.D ||
      !formData.answer ||
      !formData.marks
    ) {
      setMessage("All fields are required!");
      return;
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_QUESTION_URL}/add`,
        formData,
      );
      console.log(response);
      setMessage("Question added successfully!");
      setFormData({
        question: "",
        options: { A: "", B: "", C: "", D: "" },
        answer: "",
        marks: "",
      });
    } catch (error) {
      setMessage("Error adding question. Please try again.");
    }
  };

  return (
    <div className="flex py-10 bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="max-w-2xl mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-400">
          Add a New Question
        </h2>
        {message && (
          <p className="mb-4 text-center text-yellow-400">{message}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2">Question:</label>
            <input
              type="text"
              name="question"
              value={formData.question}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Options:</label>
            {["A", "B", "C", "D"].map((option) => (
              <input
                key={option}
                type="text"
                name={option}
                placeholder={`Option ${option}`}
                value={formData.options[option]}
                onChange={handleChange}
                className="w-full mb-2 p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            ))}
          </div>

          <div>
            <label className="block mb-2">Correct Answer:</label>
            <select
              name="answer"
              value={formData.answer}
              onChange={handleChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Correct Option</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">Marks (0-5):</label>
            <input
              type="number"
              name="marks"
              value={formData.marks}
              onChange={handleChange}
              min="0"
              max="5"
              className="w-full p-3 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 py-3 rounded-lg text-lg font-semibold hover:bg-green-600 transition-all"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
