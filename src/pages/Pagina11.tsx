import { useNavigate } from "react-router-dom";
import profileAna from "@/assets/profile-ana.png";
import profileAmanda from "@/assets/profile-amanda.png";
import profileIsabela from "@/assets/profile-isabela.png";
import profileCarolina from "@/assets/profile-carolina.png";

const profiles = [
  { name: "Ana", age: 20, distance: "4.7 km", state: "BA", locked: false, photo: profileAna, community: "Comunidade Música" },
  { name: "Amanda", age: 23, distance: "2.2 km", state: "BA", locked: true, photo: profileAmanda },
  { name: "Isabela", age: 21, distance: "6.4 km", state: "BA", locked: true, photo: profileIsabela },
  { name: "Carolina", age: 23, distance: "7.9 km", state: "BA", locked: true, photo: profileCarolina },
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

      <div className="relative z-10 px-4 py-4 max-w-4xl mx-auto">
        {/* Header row - back button + icon + title inline */}
        <div className="flex items-center gap-3 mb-3">
          <button
            onClick={() => navigate("/pagina10")}
            className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors flex-shrink-0"
          >
            <span className="text-lg">←</span>
          </button>
          <div className="w-12 h-12 rounded-full gradient-button flex items-center justify-center shadow-xl flex-shrink-0">
            <span className="text-2xl">💕</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Encontramos <span className="text-amber-400">4 conexões</span>
            </h1>
            <p className="text-white/70 text-xs">
              Pessoas da sua região com valores similares
            </p>
          </div>
        </div>

        {/* Profiles grid - compact for above fold */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {profiles.map((profile, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-1.5 border border-white/20 relative overflow-hidden"
            >
              {/* Profile photo */}
              <div className="w-full aspect-[5/4] rounded-md overflow-hidden mb-1 relative">
                <img 
                  src={profile.photo} 
                  alt={profile.name}
                  className={`w-full h-full object-cover ${profile.locked ? 'blur-md' : ''}`}
                />
              </div>
              
              {/* Profile info - minimal */}
              <div className="text-center">
                <p className="text-white font-medium text-xs">{profile.name}, {profile.age}</p>
                <p className="text-white/60 text-[10px]">{profile.state} • {profile.distance}</p>
              </div>

              {/* Locked overlay */}
              {profile.locked && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
                  <p className="text-amber-400 text-[10px] font-medium">Assine para ver</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Unlock message - minimal */}
        <div className="bg-amber-400/20 rounded-lg p-1.5 mb-2 border border-amber-400/30 hidden md:block">
          <p className="text-amber-400 text-center text-[10px]">
            <span className="mr-1">🔓</span>
            3 perfis bloqueados. Desbloqueie e conecte-se
          </p>
        </div>

        {/* CTA Button - desktop */}
        <button
          onClick={() => navigate("/pagina12")}
          className="hidden md:flex w-full gradient-button text-white py-2.5 px-4 rounded-lg text-sm font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 items-center justify-center gap-2 mb-6"
        >
          Desbloquear Perfis
          <span className="text-lg">→</span>
        </button>

        {/* Spacer for mobile floating button */}
        <div className="h-16 md:hidden"></div>

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

      {/* Floating CTA Button - mobile only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-50">
        <button
          onClick={() => navigate("/pagina12")}
          className="w-full gradient-button text-white py-3 px-6 rounded-xl text-base font-semibold shadow-2xl flex items-center justify-center gap-2"
        >
          Desbloquear Perfis
          <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );
};

export default Pagina11;