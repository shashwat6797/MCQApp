import { useState } from "react";

const QuizQuestion = ({ questionData, onSubmit, time, index }) => {
  const { options, question } = questionData;
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (index) => {
    setSelectedOption(index);
  };

  const handleClearOptions = () => {
    setSelectedOption(null);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onSubmit(selectedOption);
    }
    setSelectedOption(null);
  };

  return (
    <div className="w-[40vw] mx-auto p-8 bg-white shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">
          {" "}
          {index + 1}. {question}
        </h2>
        <div className="text-xl font-semibold text-red-500">⏳ {time}s</div>
      </div>
      <div className="space-y-3">
        {Object.keys(options).map((key) => (
          <button
            key={key} // Add a unique key for each button
            className={`w-full p-4 border rounded-lg text-lg transition-all
            ${
              selectedOption === key
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-blue-100"
            }
          `}
            onClick={() => handleOptionSelect(key)} // Pass the key to the handler
          >
            {options[key]}
          </button>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
          onClick={handleClearOptions}
        >
          Clear Selection
        </button>
        <button
          className={`px-6 py-3 rounded-lg transition-all ${
            selectedOption === null
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
          onClick={handleSubmit}
          disabled={selectedOption === null}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default QuizQuestion;
