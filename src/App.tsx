import { Heart, ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const HEARTS = [
  { left: "10%", size: 24, duration: 20, delay: 0, opacity: 0.2 },
  { left: "25%", size: 16, duration: 25, delay: 5, opacity: 0.15 },
  { left: "40%", size: 32, duration: 18, delay: 2, opacity: 0.25 },
  { left: "55%", size: 20, duration: 22, delay: 7, opacity: 0.2 },
  { left: "70%", size: 28, duration: 19, delay: 1, opacity: 0.3 },
  { left: "85%", size: 14, duration: 24, delay: 8, opacity: 0.1 },
  { left: "15%", size: 18, duration: 21, delay: 12, opacity: 0.25 },
  { left: "35%", size: 26, duration: 17, delay: 10, opacity: 0.15 },
  { left: "65%", size: 22, duration: 23, delay: 14, opacity: 0.2 },
  { left: "80%", size: 30, duration: 16, delay: 4, opacity: 0.25 },
  { left: "5%",  size: 15, duration: 26, delay: 9, opacity: 0.1 },
  { left: "45%", size: 35, duration: 15, delay: 11, opacity: 0.3 },
  { left: "75%", size: 19, duration: 20, delay: 6, opacity: 0.15 },
  { left: "90%", size: 25, duration: 18, delay: 3, opacity: 0.2 },
  { left: "50%", size: 21, duration: 22, delay: 13, opacity: 0.25 },
];

const FloatingHearts = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
    {HEARTS.map((heart, idx) => (
      <motion.div
        key={idx}
        className="absolute text-primary"
        style={{ left: heart.left }}
        initial={{ y: "110vh", opacity: 0 }}
        animate={{ 
          y: "-10vh", 
          opacity: [0, heart.opacity, heart.opacity, 0],
          x: ["-20px", "20px", "-20px", "20px", "-20px"] 
        }}
        transition={{ 
          y: { duration: heart.duration, repeat: Infinity, ease: "linear", delay: heart.delay },
          opacity: { duration: heart.duration, repeat: Infinity, ease: "linear", delay: heart.delay },
          x: { duration: heart.duration * 0.7, repeat: Infinity, ease: "easeInOut", delay: heart.delay }
        }}
      >
        <Heart size={heart.size} className="fill-primary" strokeWidth={1} />
      </motion.div>
    ))}
  </div>
);

export default function App() {
  const [view, setView] = useState<'home' | 'gallery'>('home');

  return (
    <div className="bg-texture text-on-background min-h-screen flex items-center justify-center relative overflow-hidden px-6">
      <FloatingHearts />
      
      <AnimatePresence mode="wait">
        {view === 'home' ? (
          <motion.main 
            key="home"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="w-full flex items-center justify-center relative z-10 py-12"
          >
            <div className="glass-panel w-full max-w-lg rounded-3xl p-10 md:p-16 flex flex-col items-center text-center relative shadow-[0_8px_32px_rgba(128,0,32,0.05)]">
              {/* Main Icon */}
              <div className="mb-8 text-primary">
                <Heart className="fill-primary w-12 h-12 md:w-14 md:h-14" strokeWidth={1} />
              </div>
              
              {/* Greeting Text */}
              <h1 className="font-display-lg text-4xl md:text-5xl text-primary mb-12 drop-shadow-sm leading-tight">
                Поздравляю,<br />любимая!
              </h1>
              
              {/* Action Button */}
              <button 
                onClick={() => setView('gallery')}
                className="relative group px-8 py-4 w-full sm:w-auto rounded-full overflow-hidden bg-gradient-to-r from-primary-container to-tertiary-container border border-tertiary-fixed shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <span className="font-label-caps text-label-caps tracking-widest text-on-primary-container relative z-10 flex items-center justify-center gap-3 text-sm font-semibold uppercase">
                  Наши воспоминания
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </motion.main>
        ) : (
          <motion.main 
            key="gallery"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="w-full h-[100dvh] max-w-4xl flex flex-col relative z-10 py-8 md:py-12"
          >
            <button 
              onClick={() => setView('home')}
              className="self-start mb-6 flex items-center gap-2 text-primary hover:text-primary/70 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-label-caps tracking-wider text-sm">НАЗАД</span>
            </button>
            
            <div className="flex-1 glass-panel rounded-3xl p-6 md:p-10 shadow-[0_8px_32px_rgba(128,0,32,0.05)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <h2 className="font-display-lg text-3xl md:text-4xl text-primary mb-8 text-center drop-shadow-sm">
                Наши моменты
              </h2>
              
              {/* Photo Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  "1518199266791-5375a83190b7",
                  "1522673607200-164d1b6ce486",
                  "1490750967868-88aa4486c946",
                  "1516589178581-6cd7833ae3b2",
                  "1499916078039-922301b0eb9b",
                  "1502086223501-7ea6ecd79368",
                  "1515934751635-c81c6bc9a2d8",
                  "1474552226712-ac0f0961a954"
                ].map((id, idx) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer border border-primary/10">
                    <img 
                      src={`https://images.unsplash.com/photo-${id}?w=500&q=80&fit=crop`} 
                      alt={`Воспоминание ${idx + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
