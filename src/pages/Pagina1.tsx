import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";
import heartLogo from "@/assets/heart-logo.png";

const Pagina1 = () => {
  const navigate = useNavigate();

  return (
    <QuizLayout>
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <div className="w-24 h-24 rounded-full gradient-button flex items-center justify-center shadow-2xl overflow-hidden">
          <img src={heartLogo} alt="Coração" className="w-16 h-16 object-contain" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center mb-4">
        <span className="text-white">Encontro</span>{' '}
        <span className="text-amber-400">com Fé</span>
      </h1>

      {/* Subtitle */}
      <p className="text-center text-white/90 text-xl mb-8 font-light">
        Conexões que transformam vidas
      </p>

      {/* Stats card */}
      <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm mb-1">Pessoas na sua região</p>
            <p className="text-white text-3xl font-bold">5.000+</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <i className="ri-community-line text-3xl text-white"></i>
          </div>
        </div>
      </div>

      {/* CTA Button */}
      <button 
        onClick={() => navigate("/pagina2")}
        className="w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
      >
        Iniciar Agora
        <i className="ri-arrow-right-line text-2xl"></i>
      </button>

      {/* Trust badges */}
      <div className="mt-8 flex justify-center gap-6 text-white/60 text-sm">
        <div className="flex items-center gap-1">
          <i className="ri-shield-check-line"></i>
          <span>Seguro</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="ri-lock-line"></i>
          <span>Privado</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="ri-verified-badge-line"></i>
          <span>Verificado</span>
        </div>
      </div>
    </QuizLayout>
  );
};

export default Pagina1;
