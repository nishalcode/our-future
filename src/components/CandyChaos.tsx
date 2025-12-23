"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CandyChaos({ onNext }: { onNext: () => void }) {
  const [candies, setCandies] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCandies(prev => [...prev, { id: Date.now(), x: Math.random() * 80 + 10 }]);
    }, 800);

    setTimeout(onNext, 8000); // Auto-advance after 8s of chaos
    return () => clearInterval(interval);
  }, []);

  const handlePop = (id: number) => {
    new Audio("/pop.mp3").play();
    setCandies(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div className="h-full w-full bg-[#FFF5F7] overflow-hidden relative">
      <h2 className="absolute top-20 w-full text-center text-2xl font-fredoka text-pink-400 font-bold z-10">
        CANDY SHOWER! 🍬
      </h2>
      
      <AnimatePresence>
        {candies.map((candy) => (
          <motion.div
            key={candy.id}
            initial={{ y: -100, x: `${candy.x}%`, rotate: 0 }}
            animate={{ y: 1000, rotate: 360 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 4, ease: "linear" }}
            onClick={() => handlePop(candy.id)}
            className="absolute text-4xl cursor-pointer select-none"
          >
            🍬
            <motion.span 
              initial={{ opacity: 0 }}
              whileTap={{ opacity: 1, y: -20 }}
              className="absolute text-xs font-bold text-pink-500 whitespace-nowrap"
            >
              for my cutipie
            </motion.span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
