import { useState, memo } from "react";
import { Play } from "lucide-react";

interface LazyYouTubeProps {
  videoId: string;
  title: string;
}

const LazyYouTube = memo(({ videoId, title }: LazyYouTubeProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  if (!isLoaded) {
    return (
      <button
        onClick={() => setIsLoaded(true)}
        className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-glow-gold border border-gold-400/30 group cursor-pointer"
        aria-label={`Reproduzir vídeo: ${title}`}
      >
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
          <div className="w-20 h-20 rounded-full bg-gold-400 flex items-center justify-center shadow-glow-gold group-hover:scale-110 transition-transform">
            <Play className="w-10 h-10 text-white ml-1" fill="white" />
          </div>
        </div>
      </button>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-glow-gold border border-gold-400/30">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
});

LazyYouTube.displayName = "LazyYouTube";

export default LazyYouTube;
