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
    { icon: "ri-star-fill", label: "Muito importante" },
    { icon: "ri-star-line", label: "Importante" },
    { icon: "ri-star-half-line", label: "Pouco importante" },
    { icon: "ri-checkbox-blank-circle-line", label: "Indiferente" },
  ];

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina7")}>
      <QuizProgress current={6} total={8} />

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Qual a importância da fé para você?
      </h1>

      {/* Options */}
      <div className="space-y-3">
        {importances.map((imp) => (
          <QuizOption
            key={imp.label}
            icon={imp.icon}
            label={imp.label}
            onClick={() => handleSelect(imp.label)}
          />
        ))}
      </div>
    </QuizLayout>
  );
};

export default Pagina8;
