import { ReactNode } from "react";

interface QuizLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

const QuizLayout = ({ children, showBackButton, onBack }: QuizLayoutProps) => {
  return (
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

      {/* Back button */}
      {showBackButton && onBack && (
        <button
          onClick={onBack}
          className="absolute top-6 left-6 z-20 w-10 h-10 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <i className="ri-arrow-left-line text-xl"></i>
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
