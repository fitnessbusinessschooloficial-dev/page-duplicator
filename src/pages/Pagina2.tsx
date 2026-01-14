import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizOption from "@/components/quiz/QuizOption";

const Pagina2 = () => {
  const navigate = useNavigate();

  const handleSelect = (gender: string) => {
    console.log("Gênero selecionado:", gender);
    navigate("/pagina3");
  };

  return (
    <QuizLayout showBackButton onBack={() => navigate("/")}>
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
          <span className="text-3xl">💑</span>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-3">
        Qual é o seu gênero?
      </h1>

      {/* Subtitle */}
      <p className="text-center text-white/70 mb-8">
        Responda algumas perguntas para encontrar pessoas compatíveis com você
      </p>

      {/* Options */}
      <div className="space-y-4">
        <QuizOption
          emoji="👨"
          label="Masculino"
          onClick={() => handleSelect("masculino")}
        />
        <QuizOption
          emoji="👩"
          label="Feminino"
          onClick={() => handleSelect("feminino")}
        />
      </div>
    </QuizLayout>
  );
};

export default Pagina2;