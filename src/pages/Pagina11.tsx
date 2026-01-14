import { useNavigate } from "react-router-dom";

const profiles = [
  { name: "Ana", age: 20, distance: "4.7 km", state: "BA", locked: false, avatar: "👩", community: "Comunidade Música" },
  { name: "Amanda", age: 23, distance: "2.2 km", state: "BA", locked: true, avatar: "👩‍🦱" },
  { name: "Isabela", age: 21, distance: "6.4 km", state: "BA", locked: true, avatar: "👱‍♀️" },
  { name: "Carolina", age: 23, distance: "7.9 km", state: "BA", locked: true, avatar: "👩‍🦰" },
];

const recursos = [
  { image: "", title: "Esboços Bíblicos" },
  { image: "", title: "Mapa Mental Bíblico" },
  { image: "", title: "Cursos Exclusivos" },
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

          <div className="grid grid-cols-3 gap-4">
            {recursos.map((recurso, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-lg rounded-3xl p-5 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                {/* Image container */}
                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 mb-4 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-amber-400/30 transition-colors">
                  {recurso.image ? (
                    <img 
                      src={recurso.image} 
                      alt={recurso.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <span className="text-4xl opacity-50">🖼️</span>
                      <p className="text-white/30 text-xs mt-2">Imagem</p>
                    </div>
                  )}
                </div>
                
                {/* Title */}
                <h3 className="text-white font-semibold text-center text-sm group-hover:text-amber-400 transition-colors">
                  {recurso.title}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pagina11;