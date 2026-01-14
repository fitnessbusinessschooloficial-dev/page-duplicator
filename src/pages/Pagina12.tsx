import QuizLayout from "@/components/quiz/QuizLayout";
import { useNavigate } from "react-router-dom";
import heartLogo from "@/assets/heart-logo.png";

const plans = [
  {
    name: "ACESSO SEMANAL",
    price: "R$ 8,00",
    period: "7 dias de acesso",
    emoji: "⚡",
    features: [
      "Perfil completo + fotos",
      "Chat básico",
      "Suporte por email",
    ],
    popular: false,
  },
  {
    name: "ACESSO MENSAL",
    price: "R$ 14,00",
    period: "30 dias de acesso",
    emoji: "🌟",
    features: [
      "Todos os recursos semanal",
      "Conexões ilimitadas",
      "Chat + ligações",
      "Filtros avançados",
    ],
    popular: true,
    savings: "MAIS POPULAR",
  },
  {
    name: "ACESSO ANUAL",
    price: "R$ 20,00",
    period: "365 dias de acesso",
    emoji: "👑",
    features: [
      "Todos os recursos mensal",
      "Chamadas de vídeo",
      "Todos os grupos",
      "Suporte whatsapp",
    ],
    popular: false,
    savings: "Economia de 83%",
  },
];

const stats = [
  { value: "27", label: "Estados", emoji: "🗺️" },
  { value: "5.000+", label: "Membros", emoji: "👥" },
  { value: "100+", label: "Grupos", emoji: "💬" },
  { value: "24/7", label: "Suporte", emoji: "🎧" },
];

const Pagina12 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-welcome relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ top: '10%', left: '10%' }} />
        <div className="absolute w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse" style={{ top: '50%', right: '10%', animationDelay: '1s' }} />
        <div className="absolute w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ bottom: '10%', left: '20%', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 px-4 py-8 max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/pagina11")}
          className="mb-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <span className="text-xl">←</span>
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={heartLogo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-white text-xl font-bold">Encontro <span className="text-amber-400">com Fé</span></span>
        </div>

        {/* Section title */}
        <h2 className="text-2xl font-bold text-center text-white mb-8">
          ESCOLHA SEU PLANO
        </h2>
        <p className="text-center text-white/70 mb-8">
          Acesso completo à plataforma
        </p>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border ${
                plan.popular ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-white/20'
              } relative`}
            >
              {plan.savings && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${
                  plan.popular ? 'bg-amber-400 text-black' : 'bg-teal-500 text-white'
                }`}>
                  {plan.savings}
                </div>
              )}

              {/* Plan emoji */}
              <div className="flex justify-center mb-3 mt-2">
                <span className="text-4xl">{plan.emoji}</span>
              </div>

              <h3 className="text-white font-bold text-center mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-center text-white mb-1">{plan.price}</p>
              <p className="text-white/60 text-sm text-center mb-4">{plan.period}</p>

              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="text-teal-400">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${
                plan.popular 
                  ? 'gradient-button text-white hover:scale-105' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}>
                Assinar Agora
              </button>
            </div>
          ))}
        </div>

        {/* Guarantee */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-8 border border-white/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🛡️</span>
            <div>
              <p className="text-white font-semibold mb-1">GARANTIA LEGAL</p>
              <p className="text-white/70 text-sm">
                Conforme Código de Defesa do Consumidor, você tem o direito ao arrependimento em até 7 dias após a compra com reembolso integral.
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <h3 className="text-xl font-bold text-center text-white mb-6">Nossa Comunidade</h3>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl mb-1">{stat.emoji}</div>
              <p className="text-2xl font-bold text-amber-400">{stat.value}</p>
              <p className="text-white/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center text-white/50 text-xs space-y-2">
          <p>
            Serviço Digital: Nosso produto é um serviço digital que conecta comunidades oferecendo grupos segmentados por estado, região e apresentação geral.
          </p>
          <p>
            Política de Reembolso: Reembolsos podem ser solicitados para suporte@encontrocomfe.com.br
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <span>•</span>
            <a href="#" className="hover:text-white transition-colors">Política de Reembolso</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagina12;