import { Mail, Phone } from 'lucide-react';

export function Banner() {
  const bannerMessages = [
    '🚀 Zyzops is on the way!',
    '📧 Email: zaynabrehann@gmail.com',
    '📞 Phone: 0324 553 1819',
  ];

  return (
    <div className="fixed top-0 left-0 right-0 bg-green-500 text-black z-[100] py-2 overflow-hidden">
      <style>{`
        @keyframes slide {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        
        .banner-scroll {
          animation: slide 15s linear infinite;
          white-space: nowrap;
          display: inline-block;
          padding-left: 100%;
        }
        
        .banner-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="relative w-full h-full flex items-center">
        <div className="banner-scroll font-semibold text-sm md:text-base flex gap-8 items-center">
          {bannerMessages.map((message, index) => (
            <span key={index} className="flex items-center gap-2">
              {message}
              {index < bannerMessages.length - 1 && <span className="text-black">•</span>}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {bannerMessages.map((message, index) => (
            <span key={`duplicate-${index}`} className="flex items-center gap-2">
              {message}
              {index < bannerMessages.length - 1 && <span className="text-black">•</span>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
