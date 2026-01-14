import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizProgress from "@/components/quiz/QuizProgress";

const estados = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
  "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

const Pagina4 = () => {
  const navigate = useNavigate();
  const [selectedState, setSelectedState] = useState("");

  const handleContinue = () => {
    if (selectedState) {
      console.log("Estado selecionado:", selectedState);
      navigate("/pagina5");
    }
  };

  return (
    <QuizLayout showBackButton onBack={() => navigate("/pagina3")}>
      <QuizProgress current={2} total={8} />

      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-white mb-8">
        Em qual estado você mora?
      </h1>

      {/* Select dropdown */}
      <div className="mb-6">
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="w-full bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 text-white text-lg appearance-none cursor-pointer focus:outline-none focus:border-amber-400/50"
          style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '1.5rem'
          }}
        >
          <option value="" disabled className="bg-gray-800 text-white">Selecione seu estado</option>
          {estados.map((estado) => (
            <option key={estado} value={estado} className="bg-gray-800 text-white">
              {estado}
            </option>
          ))}
        </select>
      </div>

      {/* Continue button */}
      <button
        onClick={handleContinue}
        disabled={!selectedState}
        className={`w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 ${
          selectedState ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
        }`}
      >
        Continuar
        <i className="ri-arrow-right-line text-2xl"></i>
      </button>
    </QuizLayout>
  );
};

export default Pagina4;
