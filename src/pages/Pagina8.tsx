import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizOption from "@/components/quiz/QuizOption";
import QuizProgress from "@/components/quiz/QuizProgress";

const Pagina8 = () => {
  const navigate = useNavigate();

  const handleSelect = (importance: string) => {
    console.log("Importância selecionada:", importance);
    navigate("/pagina9");
  };

  const importances = [
    { emoji: "⭐", label: "Muito importante" },
    { emoji: "✨", label: "Importante" },
    { emoji: "💫", label: "Pouco importante" },
    { emoji: "🤷", label: "Indiferente" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina7")}>
      <QuizProgress current={6} total={8} />

      {/* Header icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
          <span className="text-3xl">🕊️</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Qual a importância da fé para você?
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {importances.map((imp) => (
          <QuizOption
            key={imp.label}
            emoji={imp.emoji}
            label={imp.label}
            onClick={() => handleSelect(imp.label)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina8;