import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizOption from "@/components/quiz/QuizOption";
import QuizProgress from "@/components/quiz/QuizProgress";

const Pagina10 = () => {
  const navigate = useNavigate();

  const handleSelect = (children: string) => {
    console.log("Sobre filhos:", children);
    navigate("/pagina11");
  };

  const options = [
    { emoji: "👨‍👩‍👧", label: "Tenho filhos" },
    { emoji: "👶", label: "Quero ter" },
    { emoji: "🤔", label: "Talvez futuramente" },
    { emoji: "🚫", label: "Não quero" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina9")}>
      <QuizProgress current={8} total={8} />

      {/* Header icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
          <span className="text-3xl">👪</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Sobre ter filhos:
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {options.map((opt) => (
          <QuizOption
            key={opt.label}
            emoji={opt.emoji}
            label={opt.label}
            onClick={() => handleSelect(opt.label)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina10;