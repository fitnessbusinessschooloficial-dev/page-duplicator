import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

// Fotos masculinas por faixa etária
import male1825_1 from "@/assets/male-18-25-1.png";
import male1825_2 from "@/assets/male-18-25-2.png";
import male1825_3 from "@/assets/male-18-25-3.png";
import male1825_4 from "@/assets/male-18-25-4.png";

import male2635_1 from "@/assets/male-26-35-1.png";
import male2635_2 from "@/assets/male-26-35-2.png";
import male2635_3 from "@/assets/male-26-35-3.png";
import male2635_4 from "@/assets/male-26-35-4.png";

import male3645_1 from "@/assets/male-36-45-1.png";
import male3645_2 from "@/assets/male-36-45-2.png";
import male3645_3 from "@/assets/male-36-45-3.png";
import male3645_4 from "@/assets/male-36-45-4.png";

import male4655_1 from "@/assets/male-46-55-1.png";
import male4655_2 from "@/assets/male-46-55-2.png";
import male4655_3 from "@/assets/male-46-55-3.png";
import male4655_4 from "@/assets/male-46-55-4.png";

import male56plus_1 from "@/assets/male-56-plus-1.png";
import male56plus_2 from "@/assets/male-56-plus-2.png";
import male56plus_3 from "@/assets/male-56-plus-3.png";
import male56plus_4 from "@/assets/male-56-plus-4.png";

// Fotos femininas por faixa etária
import female1825_1 from "@/assets/female-18-25-1.png";
import female1825_2 from "@/assets/female-18-25-2.png";
import female1825_3 from "@/assets/female-18-25-3.png";
import female1825_4 from "@/assets/female-18-25-4.png";

import female2635_1 from "@/assets/female-26-35-1.png";
import female2635_2 from "@/assets/female-26-35-2.png";
import female2635_3 from "@/assets/female-26-35-3.png";
import female2635_4 from "@/assets/female-26-35-4.png";

import female3645_1 from "@/assets/female-36-45-1.png";
import female3645_2 from "@/assets/female-36-45-2.png";
import female3645_3 from "@/assets/female-36-45-3.png";
import female3645_4 from "@/assets/female-36-45-4.png";

import female4655_1 from "@/assets/female-46-55-1.png";
import female4655_2 from "@/assets/female-46-55-2.png";
import female4655_3 from "@/assets/female-46-55-3.png";
import female4655_4 from "@/assets/female-46-55-4.png";

import female56plus_1 from "@/assets/female-56-plus-1.png";
import female56plus_2 from "@/assets/female-56-plus-2.png";
import female56plus_3 from "@/assets/female-56-plus-3.png";
import female56plus_4 from "@/assets/female-56-plus-4.png";

// Cards de recursos
import cardEventos from "@/assets/card-eventos.png";
import cardConteudos from "@/assets/card-conteudos.png";
import cardGrupos from "@/assets/card-grupos.png";

// Fotos masculinas organizadas por faixa etária
const malePhotosByAge: Record<string, string[]> = {
  "18-25": [male1825_1, male1825_2, male1825_3, male1825_4],
  "26-35": [male2635_1, male2635_2, male2635_3, male2635_4],
  "36-45": [male3645_1, male3645_2, male3645_3, male3645_4],
  "46-55": [male4655_1, male4655_2, male4655_3, male4655_4],
  "56+": [male56plus_1, male56plus_2, male56plus_3, male56plus_4],
};

// Fotos femininas organizadas por faixa etária
const femalePhotosByAge: Record<string, string[]> = {
  "18-25": [female1825_1, female1825_2, female1825_3, female1825_4],
  "26-35": [female2635_1, female2635_2, female2635_3, female2635_4],
  "36-45": [female3645_1, female3645_2, female3645_3, female3645_4],
  "46-55": [female4655_1, female4655_2, female4655_3, female4655_4],
  "56+": [female56plus_1, female56plus_2, female56plus_3, female56plus_4],
};

// Nomes e idades masculinos por faixa
const maleDataByAge: Record<string, { names: string[]; ageRange: [number, number] }> = {
  "18-25": { names: ["Lucas", "Gabriel", "Matheus", "Pedro"], ageRange: [18, 25] },
  "26-35": { names: ["Rafael", "Felipe", "Bruno", "Thiago"], ageRange: [26, 35] },
  "36-45": { names: ["Marcelo", "André", "Ricardo", "Eduardo"], ageRange: [36, 45] },
  "46-55": { names: ["Carlos", "Roberto", "Fernando", "Sérgio"], ageRange: [46, 55] },
  "56+": { names: ["José", "Antônio", "Paulo", "Luiz"], ageRange: [56, 65] },
};

// Nomes e idades femininos por faixa
const femaleDataByAge: Record<string, { names: string[]; ageRange: [number, number] }> = {
  "18-25": { names: ["Ana", "Mariana", "Juliana", "Beatriz"], ageRange: [18, 25] },
  "26-35": { names: ["Camila", "Fernanda", "Larissa", "Patrícia"], ageRange: [26, 35] },
  "36-45": { names: ["Carla", "Renata", "Adriana", "Mônica"], ageRange: [36, 45] },
  "46-55": { names: ["Sandra", "Cláudia", "Regina", "Teresa"], ageRange: [46, 55] },
  "56+": { names: ["Maria", "Helena", "Rosa", "Lúcia"], ageRange: [56, 65] },
};

const recursos = [
  { image: cardEventos, title: "Eventos Exclusivos", description: "Participe de encontros e eventos" },
  { image: cardConteudos, title: "Conteúdos Especiais", description: "Materiais sobre relacionamentos" },
  { image: cardGrupos, title: "Grupos Regionais", description: "Conecte-se com pessoas próximas" },
];

// Mapeamento de estados para siglas
const estadosSiglas: Record<string, string> = {
  "Acre": "AC", "Alagoas": "AL", "Amapá": "AP", "Amazonas": "AM", "Bahia": "BA",
  "Ceará": "CE", "Distrito Federal": "DF", "Espírito Santo": "ES", "Goiás": "GO",
  "Maranhão": "MA", "Mato Grosso": "MT", "Mato Grosso do Sul": "MS", "Minas Gerais": "MG",
  "Pará": "PA", "Paraíba": "PB", "Paraná": "PR", "Pernambuco": "PE", "Piauí": "PI",
  "Rio de Janeiro": "RJ", "Rio Grande do Norte": "RN", "Rio Grande do Sul": "RS",
  "Rondônia": "RO", "Roraima": "RR", "Santa Catarina": "SC", "São Paulo": "SP",
  "Sergipe": "SE", "Tocantins": "TO"
};

// Função para gerar idade aleatória dentro da faixa
const getRandomAge = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const Pagina11 = () => {
  const navigate = useNavigate();
  
  // Inicializa diretamente do localStorage para evitar delay
  const userGender = localStorage.getItem("userGender");
  const userState = localStorage.getItem("userState") || "Bahia";
  const userAgeRange = localStorage.getItem("userAgeRange") || "26-35";
  const stateSigla = estadosSiglas[userState] || "BA";

  // Seleciona aleatoriamente uma foto para o perfil desbloqueado
  const randomIndex = useMemo(() => Math.floor(Math.random() * 4), []);
  
  // Define os perfis baseado no gênero e idade do usuário
  const profiles = useMemo(() => {
    // Se usuário é feminino, mostra homens. Se masculino, mostra mulheres.
    const showMale = userGender === "feminino";
    
    if (showMale) {
      const photos = malePhotosByAge[userAgeRange] || malePhotosByAge["26-35"];
      const data = maleDataByAge[userAgeRange] || maleDataByAge["26-35"];
      const [minAge, maxAge] = data.ageRange;
      
      return [
        { name: data.names[randomIndex], age: getRandomAge(minAge, maxAge), distance: "4.7 km", state: stateSigla, locked: false, photo: photos[randomIndex], community: "Comunidade Música" },
        { name: data.names[(randomIndex + 1) % 4], age: getRandomAge(minAge, maxAge), distance: "2.2 km", state: stateSigla, locked: true, photo: photos[(randomIndex + 1) % 4] },
        { name: data.names[(randomIndex + 2) % 4], age: getRandomAge(minAge, maxAge), distance: "6.4 km", state: stateSigla, locked: true, photo: photos[(randomIndex + 2) % 4] },
        { name: data.names[(randomIndex + 3) % 4], age: getRandomAge(minAge, maxAge), distance: "7.9 km", state: stateSigla, locked: true, photo: photos[(randomIndex + 3) % 4] },
      ];
    } else {
      const photos = femalePhotosByAge[userAgeRange] || femalePhotosByAge["26-35"];
      const data = femaleDataByAge[userAgeRange] || femaleDataByAge["26-35"];
      const [minAge, maxAge] = data.ageRange;
      
      return [
        { name: data.names[randomIndex], age: getRandomAge(minAge, maxAge), distance: "4.7 km", state: stateSigla, locked: false, photo: photos[randomIndex], community: "Comunidade Música" },
        { name: data.names[(randomIndex + 1) % 4], age: getRandomAge(minAge, maxAge), distance: "2.2 km", state: stateSigla, locked: true, photo: photos[(randomIndex + 1) % 4] },
        { name: data.names[(randomIndex + 2) % 4], age: getRandomAge(minAge, maxAge), distance: "6.4 km", state: stateSigla, locked: true, photo: photos[(randomIndex + 2) % 4] },
        { name: data.names[(randomIndex + 3) % 4], age: getRandomAge(minAge, maxAge), distance: "7.9 km", state: stateSigla, locked: true, photo: photos[(randomIndex + 3) % 4] },
      ];
    }
  }, [randomIndex, userGender, stateSigla, userAgeRange]);

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
                
                {/* Title and Description */}
                <h3 className="text-white font-semibold text-center text-sm group-hover:text-amber-400 transition-colors mb-1">
                  {recurso.title}
                </h3>
                <p className="text-white/60 text-center text-xs">
                  {recurso.description}
                </p>
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