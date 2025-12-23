"use client";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function LoveMeter({ onNext }: { onNext: () => void }) {
  const [level, setLevel] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    const timer = setInterval(() => {
      setLevel((prev) => {
        const next = prev + 1.5;
        if (next >= 300) {
          clearInterval(timer);
          triggerBlast();
        }
        return next;
      });
    }, 50);
    return () => clearInterval(timer);
  }, []);

  const triggerBlast = async () => {
    await controls.start({
      rotate: [0, -5, 5, -5, 5, 0],
      scale: [1, 1.2, 0.8, 1.5],
      transition: { duration: 0.5 }
    });
    // Add logic to trigger canvas-confetti here
    setTimeout(onNext, 1000);
  };

  const getStatusText = () => {
    if (level > 250) return "LOVE IS HIGH — METER WILL BLAST NOW 💣";
    if (level > 180) return "WARNING: HEART OVERLOAD";
    if (level > 100) return "Love is TOO HIGH 💥";
    return "Okay okay 😳";
  };

  return (
    <motion.div 
      animate={controls}
      className="h-full w-full flex flex-col items-center justify-center bg-pink-50"
    >
      <h2 className="text-3xl font-fredoka text-pink-500 mb-8 uppercase tracking-tighter">Love Level</h2>
      
      <div className="relative w-32 h-80 bg-white rounded-full border-4 border-pink-200 overflow-hidden shadow-inner">
        <motion.div 
          className="absolute bottom-0 w-full bg-gradient-to-t from-pink-500 to-red-400"
          initial={{ height: 0 }}
          animate={{ height: `${Math.min(level / 3, 100)}%` }}
        />
        <div className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-pink-900 mix-blend-overlay">
          {Math.floor(level)}%
        </div>
      </div>

      <motion.p 
        key={getStatusText()}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mt-10 text-2xl font-fredoka text-pink-600 font-bold px-6 text-center"
      >
        {getStatusText()}
      </motion.p>
    </motion.div>
  );
}
