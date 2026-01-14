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
      className={`w-full bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 flex items-center gap-4 hover:bg-white/10 hover:border-gold-400/40 transition-all duration-300 hover:scale-[1.02] hover:shadow-glow-gold group ${
        selected ? 'bg-white/10 border-gold-400/50 shadow-glow-gold' : ''
      }`}
    >
      {(icon || emoji) && (
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400/20 to-rose-400/10 flex items-center justify-center flex-shrink-0 border border-white/10 group-hover:border-gold-400/30 transition-colors">
          {emoji ? (
            <span className="text-2xl">{emoji}</span>
          ) : (
            <i className={`${icon} text-2xl text-cream-100`}></i>
          )}
        </div>
      )}
      <span className="text-cream-100 text-lg font-medium group-hover:text-gold-400 transition-colors">{label}</span>
    </button>
  );
};

export default QuizOption;