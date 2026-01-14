import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizOption from "@/components/quiz/QuizOption";
import QuizProgress from "@/components/quiz/QuizProgress";

const Pagina3 = () => {
  const navigate = useNavigate();

  const handleSelect = (age: string) => {
    console.log("Idade selecionada:", age);
    navigate("/pagina4");
  };

  const ageRanges = [
    { label: "18 - 25", value: "18-25", emoji: "🧑" },
    { label: "26 - 35", value: "26-35", emoji: "👨" },
    { label: "36 - 45", value: "36-45", emoji: "🧔" },
    { label: "46 - 55", value: "46-55", emoji: "👴" },
    { label: "56+", value: "56+", emoji: "👵" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina2")}>
      <QuizProgress current={1} total={8} />

      {/* Header icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
          <span className="text-3xl">🎂</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Qual é a sua idade?
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {ageRanges.map((range) => (
          <QuizOption
            key={range.value}
            emoji={range.emoji}
            label={range.label}
            onClick={() => handleSelect(range.value)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina3;