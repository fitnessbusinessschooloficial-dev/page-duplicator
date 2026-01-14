import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizOption from "@/components/quiz/QuizOption";
import QuizProgress from "@/components/quiz/QuizProgress";

const Pagina7 = () => {
  const navigate = useNavigate();

  const handleSelect = (goal: string) => {
    console.log("Objetivo selecionado:", goal);
    navigate("/pagina8");
  };

  const goals = [
    { emoji: "💍", label: "Casamento" },
    { emoji: "💕", label: "Namoro sério" },
    { emoji: "🔍", label: "Conhecer pessoas" },
    { emoji: "🤝", label: "Amizade" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina6")}>
      <QuizProgress current={5} total={8} />

      {/* Header icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
          <span className="text-3xl">💖</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        O que você busca?
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {goals.map((goal) => (
          <QuizOption
            key={goal.label}
            emoji={goal.emoji}
            label={goal.label}
            onClick={() => handleSelect(goal.label)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina7;