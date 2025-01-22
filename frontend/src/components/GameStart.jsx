const GameStart = ({ onStart }) => {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gradient-to-r from-blue-900 to-purple-900">
      <div className="max-w-lg p-8 bg-gray-800 text-center rounded-lg shadow-lg border border-gray-700">
        <h2 className="text-5xl font-bold text-green-400 mb-4 animate-bounce">
          Ready to Play?
        </h2>
        <p className="text-xl text-gray-300 mb-6">
          Click below to start the game!
        </p>
        <button
          className="px-6 py-3 bg-green-500 text-white text-lg font-semibold rounded-lg hover:bg-green-600 transition-all shadow-lg animate-pulse"
          onClick={onStart}
        >
          Start Game
        </button>
      </div>
    </div>
  );
};

export default GameStart;
