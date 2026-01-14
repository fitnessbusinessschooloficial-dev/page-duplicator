interface QuizOptionProps {
  icon?: string;
  emoji?: string;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

const QuizOption = ({ icon, emoji, label, onClick, selected }: QuizOptionProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-all duration-200 hover:scale-[1.02] ${
        selected ? 'bg-white/20 border-amber-400/50' : ''
      }`}
    >
      {(icon || emoji) && (
        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
          {emoji ? (
            <span className="text-2xl">{emoji}</span>
          ) : (
            <i className={`${icon} text-2xl text-white`}></i>
          )}
        </div>
      )}
      <span className="text-white text-lg font-medium">{label}</span>
    </button>
  );
};

export default QuizOption;