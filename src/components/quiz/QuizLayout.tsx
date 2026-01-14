import { ReactNode } from "react";

interface QuizLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

const QuizLayout = ({ children, showBackButton, onBack }: QuizLayoutProps) => {
  return (
    <div className="min-h-screen gradient-welcome flex items-center justify-center p-4 relative overflow-hidden texture-overlay">
      {/* Decorative animated circles - new gold/rose palette */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gold orb - top left */}
        <div 
          className="absolute w-72 h-72 bg-gold-400/15 rounded-full blur-3xl animate-pulse-glow"
          style={{ top: '5%', left: '5%' }}
        />
        {/* Rose orb - right */}
        <div 
          className="absolute w-96 h-96 bg-rose-400/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ top: '40%', right: '5%', animationDelay: '1s' }}
        />
        {/* Gold orb - bottom */}
        <div 
          className="absolute w-80 h-80 bg-gold-500/10 rounded-full blur-3xl animate-pulse-glow"
          style={{ bottom: '5%', left: '15%', animationDelay: '2s' }}
        />
        {/* Subtle cross-shaped light beam */}
        <div 
          className="absolute w-1 h-32 bg-gradient-to-b from-transparent via-gold-400/20 to-transparent blur-sm"
          style={{ top: '20%', left: '50%', transform: 'translateX(-50%)' }}
        />
      </div>

      {/* Back button */}
      {showBackButton && onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 w-11 h-11 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-cream-100 hover:bg-white/10 hover:border-gold-400/30 transition-all duration-300 group"
        >
          <span className="text-xl group-hover:text-gold-400 transition-colors">←</span>
        </button>
      )}

      {/* Main content */}
      <div className="max-w-md w-full relative z-10">
        {children}
      </div>
    </div>
  );
};

export default QuizLayout;