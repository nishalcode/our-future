"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MiniGame({ onNext }: { onNext: () => void }) {
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number }[]>([]);
  const [caught, setCaught] = useState(0);

  useEffect(() => {
    const spawn = setInterval(() => {
      if (hearts.length < 6) {
        setHearts(prev => [...prev, { 
          id: Date.now(), 
          x: Math.random() * 80 + 10, 
          y: Math.random() * 80 + 10 
        }]);
      }
    }, 1000);
    return () => clearInterval(spawn);
  }, [hearts]);

  const catchHeart = (id: number) => {
    new Audio("/pop.mp3").play();
    setCaught(c => c + 1);
    setHearts(prev => prev.filter(h => h.id !== id));
    if (caught >= 9) onNext();
  };

  return (
    <div className="h-full w-full bg-white relative">
      <div className="absolute top-10 w-full text-center">
        <p className="font-fredoka text-pink-500">Catch 10 Hearts!</p>
        <h2 className="text-4xl font-bold">{caught} / 10</h2>
      </div>

      <AnimatePresence>
        {hearts.map((h) => (
          <motion.button
            key={h.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1, y: [0, -20, 0] }}
            exit={{ scale: 2, opacity: 0 }}
            transition={{ y: { repeat: Infinity, duration: 2 } }}
            onClick={() => catchHeart(h.id)}
            className="absolute text-5xl"
            style={{ left: `${h.x}%`, top: `${h.y}%` }}
          >
            ❤️
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}
