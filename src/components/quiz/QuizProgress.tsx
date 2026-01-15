import { memo } from "react";

interface QuizProgressProps {
  current: number;
  total: number;
}

const QuizProgress = memo(({ current, total }: QuizProgressProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between text-cream-200/70 text-sm mb-3">
        <span className="font-medium">Pergunta {current} de {total}</span>
        <span className="text-gold-400 font-semibold">{Math.round(percentage)}%</span>
      </div>
      <div className="h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
        <div 
          className="h-full gradient-button rounded-full transition-all duration-500 shadow-glow-gold"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
});

QuizProgress.displayName = "QuizProgress";

export default QuizProgress;