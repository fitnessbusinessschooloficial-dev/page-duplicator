import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizOption from "@/components/quiz/QuizOption";
import QuizProgress from "@/components/quiz/QuizProgress";

const Pagina6 = () => {
  const navigate = useNavigate();

  const handleSelect = (frequency: string) => {
    console.log("Frequência selecionada:", frequency);
    navigate("/pagina7");
  };

  const frequencies = [
    { icon: "ri-checkbox-circle-line", label: "Sim, sempre" },
    { icon: "ri-time-line", label: "Às vezes" },
    { icon: "ri-history-line", label: "Raramente" },
    { icon: "ri-close-circle-line", label: "Não" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina5")}>
      <QuizProgress current={4} total={8} />

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Você frequenta igreja regularmente?
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

export default Pagina6;
