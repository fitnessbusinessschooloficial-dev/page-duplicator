import { useState, useCallback } from "react";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizOption from "@/components/quiz/QuizOption";
import QuizProgress from "@/components/quiz/QuizProgress";
import heartLogo from "@/assets/heart-logo.png";

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

// Data structures
const estados = [
  "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal",
  "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul",
  "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí",
  "Rio de Janeiro", "Rio Grande do Norte", "Rio Grande do Sul", "Rondônia",
  "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
];

const estadosSiglas: Record<string, string> = {
  "Acre": "AC", "Alagoas": "AL", "Amapá": "AP", "Amazonas": "AM", "Bahia": "BA",
  "Ceará": "CE", "Distrito Federal": "DF", "Espírito Santo": "ES", "Goiás": "GO",
  "Maranhão": "MA", "Mato Grosso": "MT", "Mato Grosso do Sul": "MS", "Minas Gerais": "MG",
  "Pará": "PA", "Paraíba": "PB", "Paraná": "PR", "Pernambuco": "PE", "Piauí": "PI",
  "Rio de Janeiro": "RJ", "Rio Grande do Norte": "RN", "Rio Grande do Sul": "RS",
  "Rondônia": "RO", "Roraima": "RR", "Santa Catarina": "SC", "São Paulo": "SP",
  "Sergipe": "SE", "Tocantins": "TO"
};

const malePhotosByAge: Record<string, string[]> = {
  "18-25": [male1825_1, male1825_2, male1825_3, male1825_4],
  "26-35": [male2635_1, male2635_2, male2635_3, male2635_4],
  "36-45": [male3645_1, male3645_2, male3645_3, male3645_4],
  "46-55": [male4655_1, male4655_2, male4655_3, male4655_4],
  "56+": [male56plus_1, male56plus_2, male56plus_3, male56plus_4],
};

const femalePhotosByAge: Record<string, string[]> = {
  "18-25": [female1825_1, female1825_2, female1825_3, female1825_4],
  "26-35": [female2635_1, female2635_2, female2635_3, female2635_4],
  "36-45": [female3645_1, female3645_2, female3645_3, female3645_4],
  "46-55": [female4655_1, female4655_2, female4655_3, female4655_4],
  "56+": [female56plus_1, female56plus_2, female56plus_3, female56plus_4],
};

const maleDataByAge: Record<string, { names: string[]; ageRange: [number, number] }> = {
  "18-25": { names: ["Lucas", "Gabriel", "Matheus", "Pedro"], ageRange: [18, 25] },
  "26-35": { names: ["Rafael", "Felipe", "Bruno", "Thiago"], ageRange: [26, 35] },
  "36-45": { names: ["Marcelo", "André", "Ricardo", "Eduardo"], ageRange: [36, 45] },
  "46-55": { names: ["Carlos", "Roberto", "Fernando", "Sérgio"], ageRange: [46, 55] },
  "56+": { names: ["José", "Antônio", "Paulo", "Luiz"], ageRange: [56, 65] },
};

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

const plans = [
  {
    name: "ACESSO SEMANAL",
    price: "R$ 8,00",
    period: "7 dias de acesso",
    emoji: "⚡",
    features: ["Perfil completo + fotos", "Chat básico", "Suporte por email"],
    popular: false,
  },
  {
    name: "ACESSO MENSAL",
    price: "R$ 14,00",
    period: "30 dias de acesso",
    emoji: "🌟",
    features: ["Todos os recursos semanal", "Conexões ilimitadas", "Chat + ligações", "Filtros avançados"],
    popular: true,
    savings: "MAIS POPULAR",
  },
  {
    name: "ACESSO ANUAL",
    price: "R$ 20,00",
    period: "365 dias de acesso",
    emoji: "👑",
    features: ["Todos os recursos mensal", "Chamadas de vídeo", "Todos os grupos", "Suporte whatsapp"],
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

const getRandomAge = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const QuizFlow = () => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [randomIndex] = useState(() => Math.floor(Math.random() * 4));

  const goNext = useCallback(() => setStep(s => s + 1), []);
  const goBack = useCallback(() => setStep(s => Math.max(1, s - 1)), []);

  // Step 1: Welcome
  if (step === 1) {
    return (
      <QuizLayout>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 rounded-full shadow-2xl overflow-hidden">
            <img src={heartLogo} alt="Coração" className="w-full h-full object-cover" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-center mb-4">
          <span className="text-white">Encontro</span>{' '}
          <span className="text-amber-400">com Fé</span>
        </h1>
        <p className="text-center text-white/90 text-xl mb-8 font-light">
          Conexões que transformam vidas
        </p>
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 mb-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm mb-1">Pessoas na sua região</p>
              <p className="text-white text-3xl font-bold">5.000+</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-3xl">🏙️</span>
            </div>
          </div>
        </div>
        <button 
          onClick={goNext}
          className="w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2"
        >
          Iniciar Agora
          <span className="text-2xl">→</span>
        </button>
        <div className="mt-8 flex justify-center gap-6 text-white/60 text-sm">
          <div className="flex items-center gap-1"><span>🛡️</span><span>Seguro</span></div>
          <div className="flex items-center gap-1"><span>🔒</span><span>Privado</span></div>
          <div className="flex items-center gap-1"><span>✅</span><span>Verificado</span></div>
        </div>
      </QuizLayout>
    );
  }

  // Step 2: Gender
  if (step === 2) {
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
            <span className="text-3xl">💑</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-3">Qual é o seu gênero?</h1>
        <p className="text-center text-white/70 mb-8">Responda algumas perguntas para encontrar pessoas compatíveis com você</p>
        <div className="space-y-4">
          <QuizOption emoji="👨" label="Masculino" onClick={() => { setGender("masculino"); goNext(); }} />
          <QuizOption emoji="👩" label="Feminino" onClick={() => { setGender("feminino"); goNext(); }} />
        </div>
      </QuizLayout>
    );
  }

  // Step 3: Age
  if (step === 3) {
    const ageRanges = [
      { label: "18 - 25", value: "18-25", emoji: "🧑" },
      { label: "26 - 35", value: "26-35", emoji: "👨" },
      { label: "36 - 45", value: "36-45", emoji: "🧔" },
      { label: "46 - 55", value: "46-55", emoji: "👴" },
      { label: "56+", value: "56+", emoji: "👵" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={1} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
            <span className="text-3xl">🎂</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-8">Qual é a sua idade?</h1>
        <div className="space-y-3">
          {ageRanges.map((range) => (
            <QuizOption key={range.value} emoji={range.emoji} label={range.label} onClick={() => { setAgeRange(range.value); goNext(); }} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 4: State
  if (step === 4) {
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={2} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
            <span className="text-3xl">📍</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-8">Em qual estado você mora?</h1>
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
              <option key={estado} value={estado} className="bg-gray-800 text-white">{estado}</option>
            ))}
          </select>
        </div>
        <button
          onClick={goNext}
          disabled={!selectedState}
          className={`w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-2xl transition-all duration-200 flex items-center justify-center gap-2 ${
            selectedState ? 'hover:scale-105' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Continuar
          <span className="text-2xl">→</span>
        </button>
      </QuizLayout>
    );
  }

  // Step 5: Denomination
  if (step === 5) {
    const denominations = [
      { emoji: "✝️", label: "Evangélica" },
      { emoji: "⛪", label: "Católica" },
      { emoji: "📖", label: "Protestante" },
      { emoji: "🕊️", label: "Adventista" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={3} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
            <span className="text-3xl">🙏</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-8">Qual é a sua denominação religiosa?</h1>
        <div className="space-y-3">
          {denominations.map((denom) => (
            <QuizOption key={denom.label} emoji={denom.emoji} label={denom.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 6: Church frequency
  if (step === 6) {
    const frequencies = [
      { emoji: "✅", label: "Sim, sempre" },
      { emoji: "🕐", label: "Às vezes" },
      { emoji: "🔄", label: "Raramente" },
      { emoji: "❌", label: "Não" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={4} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
            <span className="text-3xl">⛪</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-8">Você frequenta igreja regularmente?</h1>
        <div className="space-y-3">
          {frequencies.map((freq) => (
            <QuizOption key={freq.label} emoji={freq.emoji} label={freq.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 7: Goals
  if (step === 7) {
    const goals = [
      { emoji: "💍", label: "Casamento" },
      { emoji: "💕", label: "Namoro sério" },
      { emoji: "🔍", label: "Conhecer pessoas" },
      { emoji: "🤝", label: "Amizade" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={5} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
            <span className="text-3xl">💖</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-8">O que você busca?</h1>
        <div className="space-y-3">
          {goals.map((goal) => (
            <QuizOption key={goal.label} emoji={goal.emoji} label={goal.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 8: Faith importance
  if (step === 8) {
    const importances = [
      { emoji: "⭐", label: "Muito importante" },
      { emoji: "✨", label: "Importante" },
      { emoji: "💫", label: "Pouco importante" },
      { emoji: "🤷", label: "Indiferente" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={6} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
            <span className="text-3xl">🕊️</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-8">Qual a importância da fé para você?</h1>
        <div className="space-y-3">
          {importances.map((imp) => (
            <QuizOption key={imp.label} emoji={imp.emoji} label={imp.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 9: Pray together
  if (step === 9) {
    const frequencies = [
      { emoji: "🙏", label: "Sempre" },
      { emoji: "🕐", label: "Às vezes" },
      { emoji: "🔄", label: "Raramente" },
      { emoji: "❌", label: "Nunca" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={7} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
            <span className="text-3xl">🙏</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-8">Você gostaria de orar junto com seu parceiro(a)?</h1>
        <div className="space-y-3">
          {frequencies.map((freq) => (
            <QuizOption key={freq.label} emoji={freq.emoji} label={freq.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 10: Children
  if (step === 10) {
    const options = [
      { emoji: "👨‍👩‍👧", label: "Tenho filhos" },
      { emoji: "👶", label: "Quero ter" },
      { emoji: "🤔", label: "Talvez futuramente" },
      { emoji: "🚫", label: "Não quero" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={8} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full gradient-button flex items-center justify-center shadow-xl">
            <span className="text-3xl">👪</span>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-white mb-8">Sobre ter filhos:</h1>
        <div className="space-y-3">
          {options.map((opt) => (
            <QuizOption key={opt.label} emoji={opt.emoji} label={opt.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 11: Results
  if (step === 11) {
    const showMale = gender === "feminino";
    const currentAgeRange = ageRange || "26-35";
    const stateSigla = estadosSiglas[selectedState] || "BA";
    
    const photos = showMale 
      ? (malePhotosByAge[currentAgeRange] || malePhotosByAge["26-35"])
      : (femalePhotosByAge[currentAgeRange] || femalePhotosByAge["26-35"]);
    const data = showMale 
      ? (maleDataByAge[currentAgeRange] || maleDataByAge["26-35"])
      : (femaleDataByAge[currentAgeRange] || femaleDataByAge["26-35"]);
    const [minAge, maxAge] = data.ageRange;

    const profiles = [
      { name: data.names[randomIndex], age: getRandomAge(minAge, maxAge), distance: "4.7 km", state: stateSigla, locked: false, photo: photos[randomIndex] },
      { name: data.names[(randomIndex + 1) % 4], age: getRandomAge(minAge, maxAge), distance: "2.2 km", state: stateSigla, locked: true, photo: photos[(randomIndex + 1) % 4] },
      { name: data.names[(randomIndex + 2) % 4], age: getRandomAge(minAge, maxAge), distance: "6.4 km", state: stateSigla, locked: true, photo: photos[(randomIndex + 2) % 4] },
      { name: data.names[(randomIndex + 3) % 4], age: getRandomAge(minAge, maxAge), distance: "7.9 km", state: stateSigla, locked: true, photo: photos[(randomIndex + 3) % 4] },
    ];

    return (
      <div className="min-h-screen gradient-welcome relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ top: '10%', left: '10%' }} />
          <div className="absolute w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse" style={{ top: '50%', right: '10%', animationDelay: '1s' }} />
          <div className="absolute w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ bottom: '10%', left: '20%', animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 px-4 py-4 max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <button onClick={goBack} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors flex-shrink-0">
              <span className="text-lg">←</span>
            </button>
            <div className="w-12 h-12 rounded-full gradient-button flex items-center justify-center shadow-xl flex-shrink-0">
              <span className="text-2xl">💕</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Encontramos <span className="text-amber-400">4 conexões</span></h1>
              <p className="text-white/70 text-xs">Pessoas da sua região com valores similares</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-2">
            {profiles.map((profile, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-1.5 border border-white/20 relative overflow-hidden">
                <div className="w-full aspect-[5/4] rounded-md overflow-hidden mb-1 relative">
                  <img src={profile.photo} alt={profile.name} className={`w-full h-full object-cover ${profile.locked ? 'blur-md' : ''}`} />
                </div>
                <div className="text-center">
                  <p className="text-white font-medium text-xs">{profile.name}, {profile.age}</p>
                  <p className="text-white/60 text-[10px]">{profile.state} • {profile.distance}</p>
                </div>
                {profile.locked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-sm rounded-lg flex items-center justify-center">
                    <p className="text-amber-400 text-[10px] font-medium">Assine para ver</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="bg-amber-400/20 rounded-lg p-1.5 mb-2 border border-amber-400/30 hidden md:block">
            <p className="text-amber-400 text-center text-[10px]">
              <span className="mr-1">🔓</span>3 perfis bloqueados. Desbloqueie e conecte-se
            </p>
          </div>

          <button onClick={goNext} className="hidden md:flex w-full gradient-button text-white py-2.5 px-4 rounded-lg text-sm font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 items-center justify-center gap-2 mb-6">
            Desbloquear Perfis<span className="text-lg">→</span>
          </button>

          <div className="h-16 md:hidden"></div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-center text-white mb-2">O Que Você Encontra</h2>
            <p className="text-center text-white/70 mb-6">Recursos exclusivos para membros</p>
            <div className="grid grid-cols-3 gap-4">
              {recursos.map((recurso, index) => (
                <div key={index} className="group bg-white/10 backdrop-blur-lg rounded-3xl p-5 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                  <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 mb-4 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-amber-400/30 transition-colors">
                    <img src={recurso.image} alt={recurso.title} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-white font-semibold text-center text-sm group-hover:text-amber-400 transition-colors mb-1">{recurso.title}</h3>
                  <p className="text-white/60 text-center text-xs">{recurso.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-50">
          <button onClick={goNext} className="w-full gradient-button text-white py-3 px-6 rounded-xl text-base font-semibold shadow-2xl flex items-center justify-center gap-2">
            Desbloquear Perfis<span className="text-lg">→</span>
          </button>
        </div>
      </div>
    );
  }

  // Step 12: Plans
  return (
    <div className="min-h-screen gradient-welcome relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-pulse" style={{ top: '10%', left: '10%' }} />
        <div className="absolute w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse" style={{ top: '50%', right: '10%', animationDelay: '1s' }} />
        <div className="absolute w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ bottom: '10%', left: '20%', animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 px-4 py-8 max-w-4xl mx-auto">
        <button onClick={goBack} className="mb-6 w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors">
          <span className="text-xl">←</span>
        </button>

        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <img src={heartLogo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          <span className="text-white text-xl font-bold">Encontro <span className="text-amber-400">com Fé</span></span>
        </div>

        <h2 className="text-2xl font-bold text-center text-white mb-8">ESCOLHA SEU PLANO</h2>
        <p className="text-center text-white/70 mb-8">Acesso completo à plataforma</p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white/10 backdrop-blur-lg rounded-3xl p-6 border ${plan.popular ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-white/20'} relative`}>
              {plan.savings && (
                <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${plan.popular ? 'bg-amber-400 text-black' : 'bg-teal-500 text-white'}`}>
                  {plan.savings}
                </div>
              )}
              <div className="flex justify-center mb-3 mt-2"><span className="text-4xl">{plan.emoji}</span></div>
              <h3 className="text-white font-bold text-center mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-center text-white mb-1">{plan.price}</p>
              <p className="text-white/60 text-sm text-center mb-4">{plan.period}</p>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/80 text-sm">
                    <span className="text-teal-400">✓</span>{feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-3 rounded-xl font-semibold transition-all duration-200 ${plan.popular ? 'gradient-button text-white hover:scale-105' : 'bg-white/20 text-white hover:bg-white/30'}`}>
                Assinar Agora
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-8 border border-white/20">
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">🛡️</span>
            <div>
              <p className="text-white font-semibold mb-1">GARANTIA LEGAL</p>
              <p className="text-white/70 text-sm">Conforme Código de Defesa do Consumidor, você tem o direito ao arrependimento em até 7 dias após a compra com reembolso integral.</p>
            </div>
          </div>
        </div>

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

        <div className="text-center text-white/50 text-xs space-y-2">
          <p>Serviço Digital: Nosso produto é um serviço digital que conecta comunidades oferecendo grupos segmentados por estado, região e apresentação geral.</p>
          <p>Política de Reembolso: Reembolsos podem ser solicitados para suporte@encontrocomfe.com.br</p>
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

export default QuizFlow;