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
  "/phto/IMG_0219.jpg",
  "/phto/IMG_1002.jpg",
  "/phto/IMG_1426.jpg",
  "/phto/IMG_1507.jpg",
  "/phto/IMG_1510.jpg",
  "/phto/IMG_1513.jpg",
  "/phto/IMG_1710.jpg",
  "/phto/IMG_2575.jpg",
  "/phto/IMG_2748.JPG",
  "/phto/IMG_2894.jpg",
  "/phto/IMG_3272.JPG",
  "/phto/IMG_3572.JPG",
  "/phto/IMG_4562.JPG",
  "/phto/IMG_6238.jpg",
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
      className="fixed inset-0 z-50 flex flex-col"
      style={{ backgroundColor: "rgba(22, 6, 12, 0.93)", backdropFilter: "blur(12px)" }}
    >
      {/* top bar */}
      <div className="flex items-center justify-between px-5 py-4 shrink-0">
        <span className="text-[10px] tracking-[0.25em] uppercase text-white/25">
          {String(cur + 1).padStart(2, "0")} / {String(PHOTOS.length).padStart(2, "0")}
        </span>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-white/40 hover:text-white/80 hover:border-white/25 transition-all cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>

      {/* photo */}
      <div className="flex-1 flex items-center justify-center px-5 py-2 min-h-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={cur}
            src={photo.src}
            alt=""
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.28 }}
            className="w-full h-full object-contain rounded-xl"
            style={{ maxWidth: 520 }}
          />
        </AnimatePresence>
      </div>

      {/* caption + nav */}
      <div className="shrink-0 px-5 pb-8 pt-4 max-w-lg mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={cur}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="text-center mb-6"
          >
            <p className="serif font-light text-white/80 leading-relaxed" style={{ fontSize: "clamp(1rem,4vw,1.2rem)" }}>{photo.desc}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="flex-1 flex items-center justify-center gap-2 h-11 text-[10px] tracking-[0.2em] uppercase text-white/35 hover:text-white/70 border border-white/10 hover:border-white/25 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <ChevronLeft size={13} /> Пред.
          </button>
          <button
            onClick={next}
            className="flex-1 flex items-center justify-center gap-2 h-11 text-[10px] tracking-[0.2em] uppercase text-white/35 hover:text-white/70 border border-white/10 hover:border-white/25 rounded-xl transition-all duration-300 cursor-pointer"
          >
            След. <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </motion.div>
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
  const [view,  setView]  = useState<"home" | "gallery">("home");
  const [modal, setModal] = useState<number | null>(null);

  return (
    <div className="min-h-[100svh] bg-[#fdf4f5] relative">
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
              onClick={() => setView("gallery")}
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
