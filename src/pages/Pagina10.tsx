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
    { icon: "ri-parent-line", label: "Tenho filhos" },
    { icon: "ri-heart-add-line", label: "Quero ter" },
    { icon: "ri-question-line", label: "Talvez futuramente" },
    { icon: "ri-close-circle-line", label: "Não quero" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina9")}>
      <QuizProgress current={8} total={8} />

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Sobre ter filhos:
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {options.map((opt) => (
          <QuizOption
            key={opt.label}
            icon={opt.icon}
            label={opt.label}
            onClick={() => handleSelect(opt.label)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina10;
