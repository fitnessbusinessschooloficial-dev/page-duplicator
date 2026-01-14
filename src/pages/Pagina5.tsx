import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizOption from "@/components/quiz/QuizOption";
import QuizProgress from "@/components/quiz/QuizProgress";

const Pagina5 = () => {
  const navigate = useNavigate();

  const handleSelect = (denomination: string) => {
    console.log("Denominação selecionada:", denomination);
    navigate("/pagina6");
  };

  const denominations = [
    { emoji: "✝️", label: "Evangélica" },
    { emoji: "⛪", label: "Católica" },
    { emoji: "📖", label: "Protestante" },
    { emoji: "🕊️", label: "Adventista" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina4")}>
      <QuizProgress current={3} total={8} />

      {/* Header icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
          <span className="text-3xl">🙏</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Qual é a sua denominação religiosa?
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {denominations.map((denom) => (
          <QuizOption
            key={denom.label}
            emoji={denom.emoji}
            label={denom.label}
            onClick={() => handleSelect(denom.label)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina5;