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
    { icon: "ri-heart-3-line", label: "Casamento" },
    { icon: "ri-hearts-line", label: "Namoro sério" },
    { icon: "ri-user-search-line", label: "Conhecer pessoas" },
    { icon: "ri-user-heart-line", label: "Amizade" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina6")}>
      <QuizProgress current={5} total={8} />

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        O que você busca?
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {goals.map((goal) => (
          <QuizOption
            key={goal.label}
            icon={goal.icon}
            label={goal.label}
            onClick={() => handleSelect(goal.label)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina7;
