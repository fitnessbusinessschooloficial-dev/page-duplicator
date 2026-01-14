import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizOption from "@/components/quiz/QuizOption";
import QuizProgress from "@/components/quiz/QuizProgress";

const Pagina9 = () => {
  const navigate = useNavigate();

  const handleSelect = (prayFrequency: string) => {
    console.log("Frequência de oração selecionada:", prayFrequency);
    navigate("/pagina10");
  };

  const frequencies = [
    { emoji: "🙏", label: "Sempre" },
    { emoji: "🕐", label: "Às vezes" },
    { emoji: "🔄", label: "Raramente" },
    { emoji: "❌", label: "Nunca" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina8")}>
      <QuizProgress current={7} total={8} />

      {/* Header icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
          <span className="text-3xl">🙏</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Você gostaria de orar junto com seu parceiro(a)?
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {frequencies.map((freq) => (
          <QuizOption
            key={freq.label}
            emoji={freq.emoji}
            label={freq.label}
            onClick={() => handleSelect(freq.label)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina9;