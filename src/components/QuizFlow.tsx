import { useState, useCallback, useMemo, lazy, Suspense, memo } from "react";
import QuizLayout from "@/components/quiz/QuizLayout";
import QuizOption from "@/components/quiz/QuizOption";
import QuizProgress from "@/components/quiz/QuizProgress";
import LazyImage from "@/components/quiz/LazyImage";
import LazyYouTube from "@/components/quiz/LazyYouTube";
import heartLogo from "@/assets/heart-logo.png";
import { 
  Users, Heart, User, Cake, MapPin, Church, Cross, BookOpen, Bird, 
  CheckCircle, Clock, RefreshCw, XCircle, Gem, HeartHandshake, Search, 
  Handshake, Star, Sparkles, CircleDot, HelpCircle, Baby, UsersRound, Ban,
  Shield, Lock, ShieldCheck, Zap, Crown, Map, MessageCircle, Headphones,
  ArrowRight, Check, ChevronLeft, Unlock
} from "lucide-react";

// Cards de recursos - mantidos pois são usados na tela de resultados
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

// Lazy load das fotos de perfil - só carrega quando necessário
const getPhotoUrl = (gender: "male" | "female", ageRange: string, index: number) => {
  const ageMap: Record<string, string> = {
    "18-25": "18-25",
    "26-35": "26-35", 
    "36-45": "36-45",
    "46-55": "46-55",
    "56+": "56-plus"
  };
  const age = ageMap[ageRange] || "26-35";
  return `/src/assets/${gender}-${age}-${index + 1}.png`;
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
    icon: Zap,
    features: ["Perfil completo + fotos", "Chat básico", "Suporte por email"],
    popular: false,
  },
  {
    name: "ACESSO MENSAL",
    price: "R$ 14,00",
    period: "30 dias de acesso",
    icon: Star,
    features: ["Todos os recursos semanal", "Conexões ilimitadas", "Chat + ligações", "Filtros avançados"],
    popular: true,
    savings: "MAIS POPULAR",
  },
  {
    name: "ACESSO ANUAL",
    price: "R$ 20,00",
    period: "365 dias de acesso",
    icon: Crown,
    features: ["Todos os recursos mensal", "Chamadas de vídeo", "Todos os grupos", "Suporte whatsapp"],
    popular: false,
    savings: "Economia de 83%",
  },
];

const stats = [
  { value: "27", label: "Estados", icon: Map },
  { value: "5.000+", label: "Membros", icon: Users },
  { value: "100+", label: "Grupos", icon: MessageCircle },
  { value: "24/7", label: "Suporte", icon: Headphones },
];

const getRandomAge = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

// Componente de background decorativo memoizado
const DecorativeBackground = memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute w-72 h-72 bg-gold-400/15 rounded-full blur-3xl will-change-transform" style={{ top: '10%', left: '5%' }} />
    <div className="absolute w-96 h-96 bg-rose-400/10 rounded-full blur-3xl will-change-transform" style={{ top: '50%', right: '5%' }} />
    <div className="absolute w-80 h-80 bg-gold-500/10 rounded-full blur-3xl will-change-transform" style={{ bottom: '10%', left: '15%' }} />
  </div>
));
DecorativeBackground.displayName = "DecorativeBackground";

// Importações dinâmicas das fotos
const photoImports = {
  male: {
    "18-25": () => Promise.all([
      import("@/assets/male-18-25-1.png"),
      import("@/assets/male-18-25-2.png"),
      import("@/assets/male-18-25-3.png"),
      import("@/assets/male-18-25-4.png"),
    ]),
    "26-35": () => Promise.all([
      import("@/assets/male-26-35-1.png"),
      import("@/assets/male-26-35-2.png"),
      import("@/assets/male-26-35-3.png"),
      import("@/assets/male-26-35-4.png"),
    ]),
    "36-45": () => Promise.all([
      import("@/assets/male-36-45-1.png"),
      import("@/assets/male-36-45-2.png"),
      import("@/assets/male-36-45-3.png"),
      import("@/assets/male-36-45-4.png"),
    ]),
    "46-55": () => Promise.all([
      import("@/assets/male-46-55-1.png"),
      import("@/assets/male-46-55-2.png"),
      import("@/assets/male-46-55-3.png"),
      import("@/assets/male-46-55-4.png"),
    ]),
    "56+": () => Promise.all([
      import("@/assets/male-56-plus-1.png"),
      import("@/assets/male-56-plus-2.png"),
      import("@/assets/male-56-plus-3.png"),
      import("@/assets/male-56-plus-4.png"),
    ]),
  },
  female: {
    "18-25": () => Promise.all([
      import("@/assets/female-18-25-1.png"),
      import("@/assets/female-18-25-2.png"),
      import("@/assets/female-18-25-3.png"),
      import("@/assets/female-18-25-4.png"),
    ]),
    "26-35": () => Promise.all([
      import("@/assets/female-26-35-1.png"),
      import("@/assets/female-26-35-2.png"),
      import("@/assets/female-26-35-3.png"),
      import("@/assets/female-26-35-4.png"),
    ]),
    "36-45": () => Promise.all([
      import("@/assets/female-36-45-1.png"),
      import("@/assets/female-36-45-2.png"),
      import("@/assets/female-36-45-3.png"),
      import("@/assets/female-36-45-4.png"),
    ]),
    "46-55": () => Promise.all([
      import("@/assets/female-46-55-1.png"),
      import("@/assets/female-46-55-2.png"),
      import("@/assets/female-46-55-3.png"),
      import("@/assets/female-46-55-4.png"),
    ]),
    "56+": () => Promise.all([
      import("@/assets/female-56-plus-1.png"),
      import("@/assets/female-56-plus-2.png"),
      import("@/assets/female-56-plus-3.png"),
      import("@/assets/female-56-plus-4.png"),
    ]),
  },
};

// Hook para carregar fotos sob demanda
const useProfilePhotos = (gender: string, ageRange: string) => {
  const [photos, setPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    const loadPhotos = async () => {
      setLoading(true);
      const showMale = gender === "feminino";
      const genderKey = showMale ? "male" : "female";
      const currentAge = ageRange || "26-35";
      
      try {
        const importFn = photoImports[genderKey][currentAge as keyof typeof photoImports.male];
        if (importFn) {
          const modules = await importFn();
          setPhotos(modules.map(m => m.default));
        }
      } catch (error) {
        console.error("Error loading photos:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPhotos();
  }, [gender, ageRange]);

  return { photos, loading };
};

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
        {/* Logo with glow effect */}
        <div className="flex justify-center mb-8">
          <div className="w-28 h-28 rounded-full shadow-glow-gold overflow-hidden border-2 border-gold-400/30">
            <img src={heartLogo} alt="Coração" className="w-full h-full object-cover" loading="eager" />
          </div>
        </div>

        {/* Title with gradient text */}
        <h1 className="text-4xl font-bold text-center mb-3">
          <span className="text-cream-100">Encontro</span>{' '}
          <span className="text-gradient">com Fé</span>
        </h1>
        <p className="text-center text-cream-200/80 text-xl mb-10 font-light tracking-wide">
          Conexões que transformam vidas
        </p>

        {/* Stats card with glass effect */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 mb-8 border border-white/10 hover:border-gold-400/30 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cream-200/70 text-sm mb-1">Pessoas na sua região</p>
              <p className="text-cream-100 text-4xl font-bold">5.000<span className="text-gold-400">+</span></p>
            </div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400/20 to-rose-400/10 flex items-center justify-center border border-white/10">
              <MapPin className="w-8 h-8 text-gold-400" />
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button 
          onClick={goNext}
          className="w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-glow-gold hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3"
        >
          Iniciar Agora
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Trust badges */}
        <div className="mt-10 flex justify-center gap-8 text-cream-200/50 text-sm">
          <div className="flex items-center gap-2 hover:text-gold-400 transition-colors">
            <Shield className="w-4 h-4" /><span>Seguro</span>
          </div>
          <div className="flex items-center gap-2 hover:text-gold-400 transition-colors">
            <Lock className="w-4 h-4" /><span>Privado</span>
          </div>
          <div className="flex items-center gap-2 hover:text-gold-400 transition-colors">
            <ShieldCheck className="w-4 h-4" /><span>Verificado</span>
          </div>
        </div>
      </QuizLayout>
    );
  }

  // Step 2: Gender
  if (step === 2) {
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <div className="flex justify-center mb-6">
          <div className="w-18 h-18 rounded-full gradient-button flex items-center justify-center shadow-glow-gold p-4">
            <Users className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-cream-100 mb-3">Qual é o seu gênero?</h1>
        <p className="text-center text-cream-200/60 mb-8">Responda algumas perguntas para encontrar pessoas compatíveis com você</p>
        <div className="space-y-4">
          <QuizOption icon={User} label="Masculino" onClick={() => { setGender("masculino"); goNext(); }} />
          <QuizOption icon={User} label="Feminino" onClick={() => { setGender("feminino"); goNext(); }} />
        </div>
      </QuizLayout>
    );
  }

  // Step 3: Age
  if (step === 3) {
    const ageRanges = [
      { label: "18 - 25", value: "18-25", icon: User },
      { label: "26 - 35", value: "26-35", icon: User },
      { label: "36 - 45", value: "36-45", icon: User },
      { label: "46 - 55", value: "46-55", icon: User },
      { label: "56+", value: "56+", icon: User },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={1} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-18 h-18 rounded-full gradient-button flex items-center justify-center shadow-glow-gold p-4">
            <Cake className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-cream-100 mb-8">Qual é a sua idade?</h1>
        <div className="space-y-3">
          {ageRanges.map((range) => (
            <QuizOption key={range.value} icon={range.icon} label={range.label} onClick={() => { setAgeRange(range.value); goNext(); }} />
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
          <div className="w-18 h-18 rounded-full gradient-button flex items-center justify-center shadow-glow-gold p-4">
            <MapPin className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-cream-100 mb-8">Em qual estado você mora?</h1>
        <div className="mb-6">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 text-cream-100 text-lg appearance-none cursor-pointer focus:outline-none focus:border-gold-400/50 transition-colors hover:border-gold-400/30"
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23d4a853'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1.5rem'
            }}
          >
            <option value="" disabled className="bg-navy-600 text-cream-100">Selecione seu estado</option>
            {estados.map((estado) => (
              <option key={estado} value={estado} className="bg-navy-600 text-cream-100">{estado}</option>
            ))}
          </select>
        </div>
        <button
          onClick={goNext}
          disabled={!selectedState}
          className={`w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-glow-gold transition-all duration-300 flex items-center justify-center gap-2 ${
            selectedState ? 'hover:scale-[1.02]' : 'opacity-50 cursor-not-allowed'
          }`}
        >
          Continuar
          <ArrowRight className="w-5 h-5" />
        </button>
      </QuizLayout>
    );
  }

  // Step 5: Denomination
  if (step === 5) {
    const denominations = [
      { icon: Cross, label: "Evangélica" },
      { icon: Church, label: "Católica" },
      { icon: BookOpen, label: "Protestante" },
      { icon: Bird, label: "Adventista" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={3} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-18 h-18 rounded-full gradient-button flex items-center justify-center shadow-glow-gold p-4">
            <HeartHandshake className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-cream-100 mb-8">Qual é a sua denominação religiosa?</h1>
        <div className="space-y-3">
          {denominations.map((denom) => (
            <QuizOption key={denom.label} icon={denom.icon} label={denom.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 6: Church frequency
  if (step === 6) {
    const frequencies = [
      { icon: CheckCircle, label: "Sim, sempre" },
      { icon: Clock, label: "Às vezes" },
      { icon: RefreshCw, label: "Raramente" },
      { icon: XCircle, label: "Não" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={4} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-18 h-18 rounded-full gradient-button flex items-center justify-center shadow-glow-gold p-4">
            <Church className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-cream-100 mb-8">Você frequenta igreja regularmente?</h1>
        <div className="space-y-3">
          {frequencies.map((freq) => (
            <QuizOption key={freq.label} icon={freq.icon} label={freq.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 7: Goals
  if (step === 7) {
    const goals = [
      { icon: Gem, label: "Casamento" },
      { icon: Heart, label: "Namoro sério" },
      { icon: Search, label: "Conhecer pessoas" },
      { icon: Handshake, label: "Amizade" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={5} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-18 h-18 rounded-full gradient-button flex items-center justify-center shadow-glow-gold p-4">
            <Heart className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-cream-100 mb-8">O que você busca?</h1>
        <div className="space-y-3">
          {goals.map((goal) => (
            <QuizOption key={goal.label} icon={goal.icon} label={goal.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 8: Faith importance
  if (step === 8) {
    const importances = [
      { icon: Star, label: "Muito importante" },
      { icon: Sparkles, label: "Importante" },
      { icon: CircleDot, label: "Pouco importante" },
      { icon: HelpCircle, label: "Indiferente" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={6} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-18 h-18 rounded-full gradient-button flex items-center justify-center shadow-glow-gold p-4">
            <Bird className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-cream-100 mb-8">Qual a importância da fé para você?</h1>
        <div className="space-y-3">
          {importances.map((imp) => (
            <QuizOption key={imp.label} icon={imp.icon} label={imp.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 9: Pray together
  if (step === 9) {
    const frequencies = [
      { icon: HeartHandshake, label: "Sempre" },
      { icon: Clock, label: "Às vezes" },
      { icon: RefreshCw, label: "Raramente" },
      { icon: XCircle, label: "Nunca" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={7} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-18 h-18 rounded-full gradient-button flex items-center justify-center shadow-glow-gold p-4">
            <HeartHandshake className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-cream-100 mb-8">Você gostaria de orar junto com seu parceiro(a)?</h1>
        <div className="space-y-3">
          {frequencies.map((freq) => (
            <QuizOption key={freq.label} icon={freq.icon} label={freq.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 10: Children
  if (step === 10) {
    const options = [
      { icon: UsersRound, label: "Tenho filhos" },
      { icon: Baby, label: "Quero ter" },
      { icon: HelpCircle, label: "Talvez futuramente" },
      { icon: Ban, label: "Não quero" },
    ];
    return (
      <QuizLayout showBackButton onBack={goBack}>
        <QuizProgress current={8} total={8} />
        <div className="flex justify-center mb-6">
          <div className="w-18 h-18 rounded-full gradient-button flex items-center justify-center shadow-glow-gold p-4">
            <UsersRound className="w-10 h-10 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-cream-100 mb-8">Sobre ter filhos:</h1>
        <div className="space-y-3">
          {options.map((opt) => (
            <QuizOption key={opt.label} icon={opt.icon} label={opt.label} onClick={goNext} />
          ))}
        </div>
      </QuizLayout>
    );
  }

  // Step 11: Results
  if (step === 11) {
    return <ResultsStep gender={gender} ageRange={ageRange} selectedState={selectedState} randomIndex={randomIndex} goBack={goBack} goNext={goNext} />;
  }

  // Step 12: Plans
  return <PlansStep goBack={goBack} />;
};

// Componente separado para resultados - otimizado com lazy loading de fotos
const ResultsStep = memo(({ gender, ageRange, selectedState, randomIndex, goBack, goNext }: {
  gender: string;
  ageRange: string;
  selectedState: string;
  randomIndex: number;
  goBack: () => void;
  goNext: () => void;
}) => {
  const { photos, loading } = useProfilePhotos(gender, ageRange);
  
  const showMale = gender === "feminino";
  const currentAgeRange = ageRange || "26-35";
  const stateSigla = estadosSiglas[selectedState] || "BA";
  
  const data = showMale 
    ? (maleDataByAge[currentAgeRange] || maleDataByAge["26-35"])
    : (femaleDataByAge[currentAgeRange] || femaleDataByAge["26-35"]);
  const [minAge, maxAge] = data.ageRange;

  const profiles = useMemo(() => [
    { name: data.names[randomIndex], age: getRandomAge(minAge, maxAge), distance: "4.7 km", state: stateSigla, locked: false, photoIndex: randomIndex },
    { name: data.names[(randomIndex + 1) % 4], age: getRandomAge(minAge, maxAge), distance: "2.2 km", state: stateSigla, locked: true, photoIndex: (randomIndex + 1) % 4 },
    { name: data.names[(randomIndex + 2) % 4], age: getRandomAge(minAge, maxAge), distance: "6.4 km", state: stateSigla, locked: true, photoIndex: (randomIndex + 2) % 4 },
    { name: data.names[(randomIndex + 3) % 4], age: getRandomAge(minAge, maxAge), distance: "7.9 km", state: stateSigla, locked: true, photoIndex: (randomIndex + 3) % 4 },
  ], [data.names, randomIndex, minAge, maxAge, stateSigla]);

  return (
    <div className="min-h-screen gradient-welcome relative overflow-hidden texture-overlay">
      <DecorativeBackground />

      <div className="relative z-10 px-4 py-4 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={goBack} className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-cream-100 hover:bg-white/10 hover:border-gold-400/30 transition-all flex-shrink-0">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 rounded-full gradient-button flex items-center justify-center shadow-glow-gold flex-shrink-0">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-cream-100">Encontramos <span className="text-gradient">4 conexões</span></h1>
            <p className="text-cream-200/60 text-xs">Pessoas da sua região com valores similares</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          {profiles.map((profile, index) => (
            <div key={index} className="bg-white/5 backdrop-blur-xl rounded-2xl p-2 border border-white/10 relative overflow-hidden hover:border-gold-400/30 transition-colors group">
              <div className="w-full aspect-[5/4] rounded-xl overflow-hidden mb-2 relative bg-white/5">
                {loading ? (
                  <div className="w-full h-full animate-pulse bg-white/10" />
                ) : photos[profile.photoIndex] ? (
                  <LazyImage 
                    src={photos[profile.photoIndex]} 
                    alt={profile.name}
                    className={`w-full h-full ${profile.locked ? 'blur-md' : ''}`}
                  />
                ) : null}
                {!profile.locked && !loading && (
                  <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-gold-400" />
                    <span className="text-cream-100 text-xs font-medium">Compatível</span>
                  </div>
                )}
              </div>
              <div className="text-center">
                <p className="text-cream-100 font-semibold text-sm">{profile.name}, {profile.age}</p>
                <p className="text-cream-200/50 text-xs">{profile.state} • {profile.distance}</p>
              </div>
              {profile.locked && (
                <div className="absolute inset-0 bg-navy-600/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                  <div className="text-center">
                    <Lock className="w-6 h-6 text-gold-400 mx-auto mb-1" />
                    <p className="text-gold-400 text-xs font-medium">Assine para ver</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-gold-400/20 to-rose-400/20 rounded-2xl p-3 mb-3 border border-gold-400/30 hidden md:block">
          <p className="text-gold-400 text-center text-sm font-medium flex items-center justify-center gap-2">
            <Unlock className="w-4 h-4" />3 perfis bloqueados. Desbloqueie e conecte-se
          </p>
        </div>

        <button onClick={goNext} className="hidden md:flex w-full gradient-button text-white py-3 px-4 rounded-2xl text-base font-semibold shadow-glow-gold hover:scale-[1.02] transition-all duration-300 items-center justify-center gap-2 mb-8">
          Desbloquear Perfis<ArrowRight className="w-5 h-5" />
        </button>

        <div className="h-20 md:hidden"></div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-cream-100 mb-2">O Que Você Encontra</h2>
          <p className="text-center text-cream-200/60 mb-6">Recursos exclusivos para membros</p>
          <div className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-4">
            {recursos.map((recurso, index) => (
              <div key={index} className="group bg-white/5 backdrop-blur-xl rounded-3xl p-3 md:p-5 border border-white/10 hover:bg-white/10 hover:border-gold-400/30 transition-all duration-300 hover:scale-[1.02] cursor-pointer">
                <div className="w-full md:aspect-square rounded-2xl bg-gradient-to-br from-gold-400/10 to-rose-400/5 mb-3 md:mb-4 flex items-center justify-center overflow-hidden border border-white/10 group-hover:border-gold-400/30 transition-colors">
                  <img src={recurso.image} alt={recurso.title} className="w-full h-auto object-contain" loading="lazy" />
                </div>
                <h3 className="text-cream-100 font-semibold text-center text-lg md:text-sm group-hover:text-gold-400 transition-colors mb-1">{recurso.title}</h3>
                <p className="text-cream-200/50 text-center text-base md:text-xs">{recurso.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background/95 to-transparent z-50">
        <button onClick={goNext} className="w-full gradient-button text-white py-3.5 px-6 rounded-2xl text-base font-semibold shadow-glow-gold flex items-center justify-center gap-2">
          Desbloquear Perfis<ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
});
ResultsStep.displayName = "ResultsStep";

// Componente separado para planos
const PlansStep = memo(({ goBack }: { goBack: () => void }) => {
  return (
    <div className="min-h-screen gradient-welcome relative overflow-hidden texture-overlay">
      <DecorativeBackground />

      <div className="relative z-10 px-4 py-8 max-w-4xl mx-auto">
        <button onClick={goBack} className="mb-6 w-11 h-11 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-cream-100 hover:bg-white/10 hover:border-gold-400/30 transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-400/30 shadow-glow-gold">
            <img src={heartLogo} alt="Logo" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <span className="text-cream-100 text-2xl font-bold">Encontro <span className="text-gradient">com Fé</span></span>
        </div>

        {/* Video Section - Lazy loaded */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-center text-cream-100 mb-2">Veja Como Funciona</h2>
          <p className="text-center text-cream-200/60 mb-6">Conheça nossa plataforma e histórias de sucesso</p>
          <LazyYouTube videoId="QTvgTq9cq8E" title="Como Funciona - Encontro com Fé" />
        </div>

        <h2 className="text-2xl font-bold text-center text-cream-100 mb-2">ESCOLHA SEU PLANO</h2>
        <p className="text-center text-cream-200/60 mb-8">Acesso completo à plataforma</p>

        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {plans.map((plan, index) => {
            const PlanIcon = plan.icon;
            return (
              <div key={index} className={`bg-white/5 backdrop-blur-xl rounded-3xl p-6 border ${plan.popular ? 'border-gold-400 ring-2 ring-gold-400/30 shadow-glow-gold' : 'border-white/10 hover:border-gold-400/30'} relative transition-all duration-300 hover:scale-[1.02]`}>
                {plan.savings && (
                  <div className={`absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold ${plan.popular ? 'gradient-button text-white' : 'bg-rose-500 text-white'}`}>
                    {plan.savings}
                  </div>
                )}
                <div className="flex justify-center mb-4 mt-2">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold-400/30 to-rose-400/20 flex items-center justify-center border border-gold-400/30">
                    <PlanIcon className="w-8 h-8 text-gold-400" />
                  </div>
                </div>
                <h3 className="text-cream-100 font-bold text-center mb-2">{plan.name}</h3>
                <p className="text-4xl font-bold text-center text-cream-100 mb-1">{plan.price}</p>
                <p className="text-cream-200/50 text-sm text-center mb-5">{plan.period}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-cream-200/80 text-sm">
                      <Check className="w-4 h-4 text-gold-400 flex-shrink-0" />{feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3.5 rounded-2xl font-semibold transition-all duration-300 ${plan.popular ? 'gradient-button text-white hover:scale-[1.02] shadow-glow-gold' : 'bg-white/10 text-cream-100 hover:bg-white/15 hover:border-gold-400/30 border border-white/10'}`}>
                  Assinar Agora
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-5 mb-10 border border-white/10 hover:border-gold-400/30 transition-colors">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400/20 to-rose-400/10 flex items-center justify-center border border-white/10 flex-shrink-0">
              <Shield className="w-6 h-6 text-gold-400" />
            </div>
            <div>
              <p className="text-cream-100 font-semibold mb-1">GARANTIA LEGAL</p>
              <p className="text-cream-200/60 text-sm">Conforme Código de Defesa do Consumidor, você tem o direito ao arrependimento em até 7 dias após a compra com reembolso integral.</p>
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-center text-cream-100 mb-6">Nossa Comunidade</h3>
        <div className="grid grid-cols-4 gap-4 mb-10">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div key={index} className="text-center bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10 hover:border-gold-400/30 transition-colors">
                <div className="flex justify-center mb-2">
                  <StatIcon className="w-6 h-6 text-gold-400" />
                </div>
                <p className="text-2xl font-bold text-gold-400">{stat.value}</p>
                <p className="text-cream-200/50 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center text-cream-200/40 text-xs space-y-3">
          <p>Serviço Digital: Nosso produto é um serviço digital que conecta comunidades oferecendo grupos segmentados por estado, região e apresentação geral.</p>
          <p>Política de Reembolso: Reembolsos podem ser solicitados para suporte@encontrocomfe.com.br</p>
          <div className="flex justify-center gap-6 mt-5">
            <a href="#" className="hover:text-gold-400 transition-colors">Termos de Uso</a>
            <span>•</span>
            <a href="#" className="hover:text-gold-400 transition-colors">Política de Reembolso</a>
          </div>
        </div>
      </div>
    </div>
  );
});
PlansStep.displayName = "PlansStep";

export default QuizFlow;
