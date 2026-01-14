const Index = () => {
  return (
    <div className="min-h-screen transition-opacity duration-300 opacity-100">
      <div className="min-h-screen gradient-welcome flex items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative animated circles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div 
            className="absolute w-64 h-64 bg-teal-400/20 rounded-full blur-3xl animate-pulse"
            style={{ top: '10%', left: '10%' }}
          />
          <div 
            className="absolute w-96 h-96 bg-amber-400/20 rounded-full blur-3xl animate-pulse"
            style={{ top: '50%', right: '10%', animationDelay: '1s' }}
          />
          <div 
            className="absolute w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"
            style={{ bottom: '10%', left: '20%', animationDelay: '2s' }}
          />
        </div>

        {/* Main content */}
        <div className="max-w-md w-full relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 rounded-full gradient-button flex items-center justify-center shadow-2xl">
              <i className="ri-heart-3-fill text-5xl text-white"></i>
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
          <button className="w-full gradient-button text-white py-4 px-8 rounded-2xl text-lg font-semibold shadow-2xl hover:scale-105 transition-transform duration-200 flex items-center justify-center gap-2">
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
        </div>
      </div>
    </div>
  );
};

export default Index;
