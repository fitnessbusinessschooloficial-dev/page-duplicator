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
    { icon: "ri-hand-heart-line", label: "Sempre" },
    { icon: "ri-time-line", label: "Às vezes" },
    { icon: "ri-history-line", label: "Raramente" },
    { icon: "ri-close-circle-line", label: "Nunca" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina8")}>
      <QuizProgress current={7} total={8} />

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Você gostaria de orar junto com seu parceiro(a)?
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {frequencies.map((freq) => (
          <QuizOption
            key={freq.label}
            icon={freq.icon}
            label={freq.label}
            onClick={() => handleSelect(freq.label)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina9;
