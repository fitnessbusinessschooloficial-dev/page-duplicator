import { useNavigate } from "react-router-dom";
import QuizLayout from "@/components/quiz/QuizLayout";

const profiles = [
  { name: "Ana", age: 20, distance: "4.7 km", state: "BA", locked: false },
  { name: "Amanda", age: 23, distance: "2.2 km", state: "BA", locked: true },
  { name: "Isabela", age: 21, distance: "6.4 km", state: "BA", locked: true },
  { name: "Carolina", age: 23, distance: "7.9 km", state: "BA", locked: true },
];

const Pagina11 = () => {
  const navigate = useNavigate();

  return (
    <QuizLayout>
      {/* Success icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full gradient-button flex items-center justify-center shadow-2xl">
          <i className="ri-heart-3-fill text-4xl text-white"></i>
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
            {/* Profile avatar placeholder */}
            <div className="w-full aspect-square rounded-xl bg-white/20 mb-3 flex items-center justify-center">
              {profile.locked ? (
                <div className="text-center">
                  <i className="ri-lock-line text-3xl text-white/60"></i>
                  <p className="text-white/60 text-xs mt-1">Perfil Bloqueado</p>
                </div>
              ) : (
                <i className="ri-user-line text-4xl text-white/60"></i>
              )}
            </div>
            
            {/* Profile info */}
            <div className="text-center">
              <p className="text-white font-semibold">{profile.name}, {profile.age}</p>
              <p className="text-white/60 text-sm">{profile.state} • {profile.distance}</p>
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
          <i className="ri-lock-unlock-line mr-2"></i>
          3 perfis bloqueados. Desbloqueie e comece a se conectar
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={() => navigate("/pagina12")}
        className="w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
      >
        Desbloquear Perfis
        <i className="ri-arrow-right-line text-2xl"></i>
      </button>
    </QuizLayout>
  );
};

export default Pagina11;
