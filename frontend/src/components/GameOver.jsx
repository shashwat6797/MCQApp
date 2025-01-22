const GameOver = ({ score, onRestart }) => {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gray-900">
      <div className="max-w-lg p-8 bg-gray-800 text-center rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-5xl font-bold text-red-500 mb-4 animate-pulse">
          Game Over
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          Your final score:{" "}
          <span className="text-yellow-400 font-bold">{score}</span>
        </p>
        <button
          className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition-all shadow-lg"
          onClick={onRestart}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
