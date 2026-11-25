import { useState } from 'react';
import { Layers } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  fallbackTitle: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  fallbackTitle,
  className = '',
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#12141E] border border-white/[0.06] text-slate-400 p-6 ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-8 h-8 text-blue-400/70 mb-3" strokeWidth={1.5} />
        <span className="text-xs font-medium text-slate-300 text-center max-w-[20ch]">
          {fallbackTitle}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
