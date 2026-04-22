import { Heart, ArrowRight, ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// ─── floating hearts ──────────────────────────────────────────────────────────

const BG_HEARTS = [
  { left: "4%",  size: 20, duration: 34, delay: 0,  opacity: 0.34 },
  { left: "13%", size: 14, duration: 28, delay: 3,  opacity: 0.28 },
  { left: "24%", size: 18, duration: 30, delay: 8,  opacity: 0.32 },
  { left: "35%", size: 24, duration: 32, delay: 13, opacity: 0.38 },
  { left: "47%", size: 16, duration: 27, delay: 5,  opacity: 0.3  },
  { left: "58%", size: 22, duration: 31, delay: 10, opacity: 0.36 },
  { left: "68%", size: 15, duration: 29, delay: 16, opacity: 0.27 },
  { left: "78%", size: 19, duration: 33, delay: 20, opacity: 0.33 },
  { left: "88%", size: 23, duration: 30, delay: 24, opacity: 0.37 },
  { left: "95%", size: 17, duration: 28, delay: 12, opacity: 0.29 },
];

// ─── floating words ───────────────────────────────────────────────────────────

const BG_WORDS = [
  { text: "кошечка",        left: "5%",  duration: 38, delay: 0,  opacity: 0.13, size: "0.72rem" },
  { text: "жанным",         left: "18%", duration: 44, delay: 7,  opacity: 0.11, size: "0.68rem" },
  { text: "менным",         left: "30%", duration: 36, delay: 15, opacity: 0.12, size: "0.7rem"  },
  { text: "люблю тебя",     left: "44%", duration: 42, delay: 3,  opacity: 0.1,  size: "0.66rem" },
  { text: "пупсяшка",       left: "57%", duration: 40, delay: 20, opacity: 0.13, size: "0.72rem" },
  { text: "душечка",        left: "68%", duration: 46, delay: 10, opacity: 0.11, size: "0.68rem" },
  { text: "пантерочка",     left: "80%", duration: 38, delay: 25, opacity: 0.12, size: "0.7rem"  },
  { text: "цветошка",       left: "90%", duration: 43, delay: 5,  opacity: 0.1,  size: "0.66rem" },
  { text: "любимка",        left: "12%", duration: 41, delay: 30, opacity: 0.12, size: "0.7rem"  },
  { text: "булочка",        left: "36%", duration: 37, delay: 18, opacity: 0.11, size: "0.68rem" },
  { text: "солнышка",       left: "62%", duration: 45, delay: 12, opacity: 0.12, size: "0.7rem"  },
  { text: "айжанным",       left: "75%", duration: 39, delay: 35, opacity: 0.13, size: "0.72rem" },
];

function FloatingWords() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {BG_WORDS.map((w, i) => (
        <motion.div
          key={i}
          className="absolute select-none"
          style={{
            left: w.left,
            fontFamily: "Cormorant Garamond, serif",
            fontSize: w.size,
            letterSpacing: "0.18em",
            color: `rgba(180,80,100,${w.opacity})`,
            whiteSpace: "nowrap",
          }}
          initial={{ y: "108vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, w.opacity, w.opacity, 0],
            x: ["-8px", "8px", "-8px"],
          }}
          transition={{
            y:       { duration: w.duration, repeat: Infinity, ease: "linear",    delay: w.delay },
            opacity: { duration: w.duration, repeat: Infinity, ease: "linear",    delay: w.delay },
            x:       { duration: w.duration * 0.6, repeat: Infinity, ease: "easeInOut", delay: w.delay },
          }}
        >
          {w.text}
        </motion.div>
      ))}
    </div>
  );
}

function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {BG_HEARTS.map((h, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{ left: h.left }}
          initial={{ y: "108vh", opacity: 0 }}
          animate={{
            y: "-10vh",
            opacity: [0, h.opacity, h.opacity, 0],
            x: ["-10px", "10px", "-10px"],
            scale: [0.85, 1.08, 0.95],
          }}
          transition={{
            y:       { duration: h.duration, repeat: Infinity, ease: "linear",    delay: h.delay },
            opacity: { duration: h.duration, repeat: Infinity, ease: "linear",    delay: h.delay },
            x:       { duration: h.duration * 0.55, repeat: Infinity, ease: "easeInOut", delay: h.delay },
            scale:   { duration: h.duration * 0.45, repeat: Infinity, ease: "easeInOut", delay: h.delay },
          }}
        >
          <Heart
            size={h.size}
            className="fill-[#dd6e85] text-[#dd6e85]"
            style={{ filter: "drop-shadow(0 0 10px rgba(221,110,133,0.38))" }}
            strokeWidth={0}
          />
        </motion.div>
      ))}
    </div>
  );
}

// ─── data ─────────────────────────────────────────────────────────────────────

type Photo = { src: string; desc: string };

const PHOTO_DESCRIPTIONS = [
  "Айжанным, именно тогда моё сердце нашло своё место",
  "Кошечка, с тобой даже ночной воздух кажется теплее",
  "Душечка, такие закаты бывают только рядом с тобой",
  "Жанным, этот день навсегда останется в моём сердце",
  "Любимая, ты делаешь каждый обычный день особенным",
  "Солнышка, рядом с тобой мне не нужно ничего больше",
  "Душечка, любой маршрут становится любимым, если ты рядом",
  "Булочка милая, именно так ты и выглядишь в моих мыслях",
  "Няшка вкусняшка, вечера с тобой - мои любимые часы",
  "Айжанным, эта улыбка - самое красивое что я видел",
  "Кошечка, в такие моменты я понимаю как мне повезло",
  "Жанным, любая дорога - праздник, когда ты рядом",
  "Солнышка, таких дней с тобой пусть будет ещё тысяча",
  "Любимая, ты - моё самое лучшее воспоминание и мечта",
];

const LOCAL_PHOTOS = [
  "/IMG_0219.jpg",
  "/IMG_1002.jpg",
  "/IMG_1426.jpg",
  "/IMG_1507.jpg",
  "/IMG_3005.jpg",
  "/IMG_1513.jpg",
  "/IMG_1710.jpg",
  "/IMG_2575.jpg",
  "/IMG_2748.JPG",
  "/IMG_2894.jpg",
  "/IMG_3272.JPG",
  "/IMG_3572.JPG",
  "/IMG_4562.JPG",
  "/IMG_6238.jpg",
];

const PHOTOS: Photo[] = LOCAL_PHOTOS.map((src, idx) => ({
  src,
  desc: PHOTO_DESCRIPTIONS[idx] ?? "Наше любимое воспоминание",
}));

// keep all cards same width for an even 2x4 layout
const FEATURED = new Set<number>();

// ─── modal ────────────────────────────────────────────────────────────────────

function Modal({ index, onClose }: { index: number; onClose: () => void }) {
  const [cur, setCur] = useState(index);
  const photo = PHOTOS[cur];

  const prev = useCallback(() => setCur((i: number) => (i - 1 + PHOTOS.length) % PHOTOS.length), []);
  const next = useCallback(() => setCur((i: number) => (i + 1) % PHOTOS.length), []);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowLeft")   prev();
      if (e.key === "ArrowRight")  next();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex flex-col overflow-hidden"
      style={{ backgroundColor: "rgba(22, 6, 12, 0.93)", backdropFilter: "blur(12px)" }}
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-4 sm:px-5 pt-[max(env(safe-area-inset-top),0.8rem)] pb-3 sm:py-4 shrink-0">
        <span className="text-[10px] sm:text-[11px] tracking-[0.22em] sm:tracking-[0.25em] uppercase text-white/35">
          {String(cur + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
        </span>
        <button
          onClick={onClose}
          className="w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center rounded-full border border-white/20 text-white/65 sm:text-white/40 hover:text-white/90 hover:border-white/35 transition-all cursor-pointer"
        >
          <X size={16} />
        </button>
      </div>

      {/* photo */}
      <div className="flex-1 flex items-center justify-center px-3 sm:px-5 py-1 sm:py-2 min-h-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={cur}
            src={photo.src}
            alt=""
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.28 }}
            className="w-full h-full object-contain rounded-lg sm:rounded-xl"
            style={{ maxWidth: 640, maxHeight: "62vh" }}
          />
        </AnimatePresence>
      </div>

      {/* caption + nav */}
      <div className="shrink-0 px-4 sm:px-5 pb-[max(env(safe-area-inset-bottom),1rem)] sm:pb-8 pt-3 sm:pt-4 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-center mb-4 sm:mb-6"
          >
            <p className="serif font-light text-white/85 leading-relaxed px-1" style={{ fontSize: "clamp(0.98rem,4.6vw,1.2rem)" }}>
              {photo.desc}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
          <button
            onClick={prev}
            className="flex items-center justify-center gap-2 h-12 sm:h-11 text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/65 sm:text-white/35 hover:text-white/85 border border-white/20 sm:border-white/10 hover:border-white/35 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft size={14} /> Пред.
          </button>
          <button
            onClick={next}
            className="flex items-center justify-center gap-2 h-12 sm:h-11 text-[10px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-white/65 sm:text-white/35 hover:text-white/85 border border-white/20 sm:border-white/10 hover:border-white/35 rounded-xl transition-all duration-300 cursor-pointer"
          >
            След. <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── quiz ─────────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    q: "Когда мы познакомились?",
    options: ["15 марта", "23 апреля", "7 мая", "30 апреля"],
    answer: "23 апреля",
  },
  {
    q: "Когда мы впервые прогулись?",
    options: ["1 мая", "20 апреля", "9 мая", "15 мая"],
    answer: "9 мая",
  },
  {
    q: "Наш первый поцелуй?",
    options: ["5 июня", "25 мая", "20 июня", "12 июня"],
    answer: "12 июня",
  },
];

function Quiz({ onDone }: { onDone: () => void }) {
  const [step,    setStep]    = useState(0);
  const [picked,  setPicked]  = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const question = QUESTIONS[step];

  function choose(opt: string) {
    if (picked) return;
    setPicked(opt);
    if (opt === question.answer) {
      setTimeout(() => {
        if (step + 1 < QUESTIONS.length) {
          setStep(s => s + 1);
          setPicked(null);
        } else {
          setSuccess(true);
          setTimeout(onDone, 1800);
        }
      }, 700);
    }
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-5 text-center py-8"
      >
        <motion.div
          animate={{ scale: [1, 1.18, 1] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
        >
          <Heart size={26} className="fill-[#d4878f] text-[#d4878f]" strokeWidth={0} />
        </motion.div>
        <p className="serif font-light italic text-[#b06070]" style={{ fontSize: "clamp(1.3rem,5vw,1.8rem)" }}>
          Ты всё помнишь, жанным ♡
        </p>
      </motion.div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 24 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-full flex flex-col gap-6"
      >
        {/* step dots */}
        <div className="flex items-center gap-2 justify-center">
          {QUESTIONS.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500"
              style={{
                width:  i === step ? 20 : 6,
                height: 3,
                background: i <= step ? "#d4878f" : "rgba(212,135,143,0.22)",
              }}
            />
          ))}
        </div>

        {/* question */}
        <p className="text-[9px] tracking-[0.32em] uppercase text-[#d4878f]/50 text-center">
          вопрос {step + 1} из {QUESTIONS.length}
        </p>
        <h3
          className="serif font-light text-[#3d1a22] text-center leading-snug"
          style={{ fontSize: "clamp(1.35rem,5vw,1.9rem)" }}
        >
          {question.q}
        </h3>

        {/* options */}
        <div className="grid grid-cols-2 gap-3 mt-1">
          {question.options.map(opt => {
            const isCorrect = picked === opt && opt === question.answer;
            const isWrong   = picked === opt && opt !== question.answer;
            return (
              <motion.button
                key={opt}
                onClick={() => choose(opt)}
                whileTap={{ scale: picked ? 1 : 0.96 }}
                animate={isWrong ? { x: [-5, 5, -4, 4, 0] } : {}}
                transition={{ duration: 0.3 }}
                className="h-12 rounded-2xl text-sm transition-all duration-300 cursor-pointer"
                style={{
                  border: isCorrect
                    ? "1px solid rgba(120,190,108,0.55)"
                    : isWrong
                    ? "1px solid rgba(210,90,90,0.45)"
                    : "1px solid rgba(212,135,143,0.22)",
                  background: isCorrect
                    ? "rgba(120,190,108,0.1)"
                    : isWrong
                    ? "rgba(210,90,90,0.07)"
                    : "rgba(255,255,255,0.55)",
                  color: isCorrect ? "#3d7a35" : isWrong ? "#b84040" : "#3d1a22",
                  fontFamily: "Cormorant Garamond, serif",
                  fontWeight: 300,
                  fontSize: "1rem",
                }}
              >
                {opt}
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── photo card ───────────────────────────────────────────────────────────────

function PhotoCard({ photo, index, featured, onClick }: {
  photo: Photo;
  index: number;
  featured: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: 0.06 + index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onClick={onClick}
      className={`text-left group cursor-pointer ${featured ? "col-span-2" : ""}`}
    >
      <div
        className={`overflow-hidden rounded-2xl ${featured ? "aspect-[16/9] sm:aspect-[3/1.4]" : "aspect-[3/4]"}`}
        style={{ boxShadow: "0 2px 20px rgba(180,80,100,0.07)" }}
      >
        <img
          src={photo.src}
          alt=""
          className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
        />
      </div>

      <div className="mt-3 px-0.5">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[9px] tracking-[0.22em] uppercase text-[#d4878f]/50">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[9px] tracking-[0.15em] text-[#d4878f]/35 group-hover:text-[#d4878f]/65 transition-colors duration-300">
            ↗
          </span>
        </div>
        <p className="serif font-light text-[#3d1a22] leading-snug" style={{ fontSize: "0.9rem" }}>{photo.desc}</p>
      </div>
    </motion.button>
  );
}

// ─── app ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [view,  setView]  = useState<"home" | "quiz" | "gallery">("home");
  const [modal, setModal] = useState<number | null>(null);

  return (
    <div className="min-h-[100svh] bg-[#fdf4f5] relative">
      <FloatingWords />
      <FloatingHearts />

      <AnimatePresence mode="wait">

        {/* ── Home ─────────────────────────────────────────────────────────── */}
        {view === "home" && (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10 min-h-[100svh] flex flex-col items-center justify-center px-6 sm:px-10 text-center"
          >
            {/* badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full mb-10"
              style={{ border: "1px solid rgba(232,160,171,0.3)", background: "rgba(253,244,245,0.9)" }}
            >
              <Heart size={7} className="fill-[#d4878f] text-[#d4878f]" strokeWidth={0} />
              <span className="text-[9px] tracking-[0.28em] uppercase text-[#d4878f]/70">2 года вместе</span>
            </motion.div>

            {/* heading */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1
                className="serif font-light text-[#3d1a22] leading-[1.06]"
                style={{ fontSize: "clamp(2.8rem,11vw,6.5rem)" }}
              >
                С годовщиной,
              </h1>
              <h1
                className="serif font-light italic text-[#b06070] leading-[1.06]"
                style={{ fontSize: "clamp(2.8rem,11vw,6.5rem)" }}
              >
                любимая
              </h1>
            </motion.div>

            {/* divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.85 }}
              className="h-px w-16 my-9"
              style={{ background: "linear-gradient(to right, transparent, #e8a0ab80, transparent)" }}
            />

            {/* cta */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              onClick={() => setView("quiz")}
              className="group inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#b06070]/50 hover:text-[#b06070] transition-colors duration-500 cursor-pointer"
            >
              Наши воспоминания
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-400" />
            </motion.button>

            {/* scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.6 }}
              className="absolute bottom-8 left-0 right-0 flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-px h-8" style={{ background: "linear-gradient(to bottom, transparent, #e8a0ab60)" }} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* ── Quiz ─────────────────────────────────────────────────────────── */}
        {view === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 min-h-[100svh] w-full max-w-xl mx-auto px-5 sm:px-6 pt-12 pb-20"
          >
            <button
              onClick={() => setView("home")}
              className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-[#b06070]/45 hover:text-[#b06070]/80 transition-colors cursor-pointer mb-10"
            >
              <ArrowLeft size={11} />
              Назад
            </button>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-8"
            >
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#e8a0ab] mb-2.5">мини</p>
              <h2
                className="serif font-light text-[#3d1a22]"
                style={{ fontSize: "clamp(2rem,8vw,3rem)" }}
              >
                quiz
              </h2>
            </motion.div>

            <Quiz onDone={() => setView("gallery")} />
          </motion.div>
        )}

        {/* ── Gallery ──────────────────────────────────────────────────────── */}
        {view === "gallery" && (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 min-h-[100svh] w-full max-w-xl mx-auto px-5 sm:px-6 pt-12 pb-20"
          >
            {/* back */}
            <button
              onClick={() => setView("home")}
              className="flex items-center gap-2 text-[10px] tracking-[0.22em] uppercase text-[#b06070]/45 hover:text-[#b06070]/80 transition-colors cursor-pointer mb-12"
            >
              <ArrowLeft size={11} />
              Назад
            </button>

            {/* title */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#e8a0ab] mb-2.5">наши</p>
              <h2
                className="serif font-light text-[#3d1a22]"
                style={{ fontSize: "clamp(2rem,8vw,3rem)" }}
              >
                воспоминания
              </h2>
              <div
                className="mt-4 h-px w-10"
                style={{ background: "linear-gradient(to right, #e8a0ab70, transparent)" }}
              />
            </motion.div>

            {/* editorial grid */}
            <div className="grid grid-cols-2 gap-x-3 gap-y-8">
              {PHOTOS.map((photo, idx) => (
                <PhotoCard
                  key={idx}
                  photo={photo}
                  index={idx}
                  featured={FEATURED.has(idx)}
                  onClick={() => setModal(idx)}
                />
              ))}
            </div>

            {/* footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-16 flex flex-col items-center gap-3"
            >
              <Heart size={9} className="fill-[#e8a0ab] text-[#e8a0ab]" strokeWidth={0} />
              <p className="text-[9px] tracking-[0.25em] uppercase text-[#d4878f]/35">
                {PHOTOS.length} воспоминаний
              </p>
            </motion.div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* ── Modal ── */}
      <AnimatePresence>
        {modal !== null && (
          <Modal index={modal} onClose={() => setModal(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
