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
    { icon: "ri-cross-line", label: "Evangélica" },
    { icon: "ri-cross-2-line", label: "Católica" },
    { icon: "ri-book-open-line", label: "Protestante" },
    { icon: "ri-calendar-check-line", label: "Adventista" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina4")}>
      <QuizProgress current={3} total={8} />

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Qual é a sua denominação religiosa?
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {denominations.map((denom) => (
          <QuizOption
            key={denom.label}
            icon={denom.icon}
            label={denom.label}
            onClick={() => handleSelect(denom.label)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina5;
