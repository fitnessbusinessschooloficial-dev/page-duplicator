import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";

const profiles = [
  { name: "Ana", age: 20, distance: "4.7 km", state: "BA", locked: false, avatar: "👩", community: "Comunidade Música" },
  { name: "Amanda", age: 23, distance: "2.2 km", state: "BA", locked: true, avatar: "👩‍🦱" },
  { name: "Isabela", age: 21, distance: "6.4 km", state: "BA", locked: true, avatar: "👱‍♀️" },
  { name: "Carolina", age: 23, distance: "7.9 km", state: "BA", locked: true, avatar: "👩‍🦰" },
];

const recursos = [
  { emoji: "📖", title: "Esboços Bíblicos Especiais", description: "Material exclusivo para estudos aprofundados" },
  { emoji: "🧠", title: "Mapa Mental Bíblico", description: "Visualização estruturada do conhecimento bíblico" },
  { emoji: "🎓", title: "Cursos", description: "Conhecimento bíblico aprofundado e detalhado" },
  { emoji: "📚", title: "Manuais Bíblicos", description: "Guias práticos para estudo bíblico" },
  { emoji: "🎉", title: "Eventos Exclusivos", description: "Participe de encontros e eventos" },
  { emoji: "💕", title: "Conteúdos Especiais", description: "Materiais sobre relacionamentos" },
];

const gruposRegionais = [
  { emoji: "💑", title: "Tinder +30 Anos", description: "Relacionamentos cristãos" },
  { emoji: "💍", title: "Tinder +40 Anos", description: "Relacionamentos maduros" },
  { emoji: "👴👵", title: "Tinder +60 Anos", description: "Conexões especiais" },
];

const Pagina11 = () => {
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
          onClick={() => navigate("/pagina10")}
          className="mb-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <span className="text-xl">←</span>
        </button>

        {/* Success icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full gradient-button flex items-center justify-center shadow-2xl">
            <span className="text-4xl">💕</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-white mb-2">
          Encontramos <span className="text-amber-400">4 conexões</span>
        </h1>
        <p className="text-center text-white/70 mb-6">
          Pessoas da sua região com valores similares aos seus
        </p>

        {/* Profiles grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 relative overflow-hidden"
            >
              {/* Profile avatar */}
              <div className="w-full aspect-square rounded-xl bg-white/20 mb-3 flex items-center justify-center">
                {profile.locked ? (
                  <div className="text-center">
                    <span className="text-4xl">🔒</span>
                    <p className="text-white/60 text-xs mt-1">Perfil Bloqueado</p>
                  </div>
                ) : (
                  <span className="text-5xl">{profile.avatar}</span>
                )}
              </div>
              
              {/* Profile info */}
              <div className="text-center">
                <p className="text-white font-semibold">{profile.name}, {profile.age}</p>
                <p className="text-white/60 text-sm">{profile.state} • {profile.distance}</p>
                {profile.community && (
                  <p className="text-amber-400 text-xs mt-1">{profile.community}</p>
                )}
              </div>

              {/* Locked overlay */}
              {profile.locked && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <p className="text-amber-400 text-sm font-medium">Assine para ver</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Unlock message */}
        <div className="bg-amber-400/20 rounded-2xl p-4 mb-6 border border-amber-400/30">
          <p className="text-amber-400 text-center text-sm">
            <span className="mr-2">🔓</span>
            3 perfis bloqueados. Desbloqueie e comece a se conectar
          </p>
        </div>

        {/* Milhares de pessoas */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-8 border border-white/20 text-center">
          <p className="text-white font-semibold">
            <span className="mr-2">👥</span>
            Milhares de pessoas esperando por você
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={() => navigate("/pagina12")}
          className="w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2 mb-10"
        >
          Desbloquear Perfis
          <span className="text-2xl">→</span>
        </button>

        {/* O Que Você Encontra Section */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-center text-white mb-2">
            O Que Você Encontra
          </h2>
          <p className="text-center text-white/70 mb-6">
            Recursos exclusivos para membros
          </p>

          <div className="grid grid-cols-2 gap-3">
            {recursos.map((recurso, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-3 mx-auto">
                  <span className="text-2xl">{recurso.emoji}</span>
                </div>
                <h3 className="text-white font-semibold text-center text-sm mb-1">{recurso.title}</h3>
                <p className="text-white/60 text-xs text-center">{recurso.description}</p>
                <button className="w-full mt-3 py-2 bg-white/10 rounded-xl text-white/80 text-xs hover:bg-white/20 transition-colors">
                  Acessar Material
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bem-vindo ao Portal Cristão */}
        <div className="bg-gradient-to-r from-teal-500/20 to-amber-500/20 backdrop-blur-lg rounded-3xl p-6 mb-10 border border-white/20 text-center">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">⛪</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo ao Portal Cristão</h2>
          <p className="text-white/70 mb-4">Escolha uma opção para continuar</p>
          <div className="flex gap-3 justify-center">
            <button className="px-6 py-2 bg-white/20 rounded-xl text-white text-sm hover:bg-white/30 transition-colors">
              Grupos Gerais
            </button>
            <button className="px-6 py-2 gradient-button rounded-xl text-white text-sm hover:scale-105 transition-transform">
              Explorar
            </button>
          </div>
        </div>

        {/* Grupos Regionais */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-center text-white mb-2">
            <span className="mr-2">🗺️</span>
            Grupos Regionais
          </h2>
          <p className="text-center text-white/70 mb-6">
            Conecte-se com pessoas próximas
          </p>

          <div className="space-y-3">
            {gruposRegionais.map((grupo, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 flex items-center gap-4 hover:bg-white/20 transition-colors cursor-pointer"
              >
                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{grupo.emoji}</span>
                </div>
                <div className="flex-grow">
                  <h3 className="text-white font-semibold">{grupo.title}</h3>
                  <p className="text-white/60 text-sm">{grupo.description}</p>
                </div>
                <span className="text-white/40 text-xl">→</span>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <button
          onClick={() => navigate("/pagina12")}
          className="w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
        >
          Ver Planos de Acesso
          <span className="text-2xl">→</span>
        </button>
      </div>
    </div>
  );
};

export default Pagina11;