"use client";
import { motion } from "framer-motion";

export default function EmotionalHit({ onNext }: { onNext: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onNext}
      className="h-full w-full flex flex-col items-center justify-center bg-white cursor-pointer"
    >
      <motion.h2 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-4xl font-fredoka font-bold text-gray-800"
      >
        It’s Always You
      </motion.h2>
      
      {/* Random Floating GIFs */}
      {[1, 2, 3].map((i) => (
        <motion.img
          key={i}
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGJueGZueXF6eXJueGZueXF6eXJueGZueXF6eXJueGZueXF6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/L40vP7f6mY1bS/giphy.gif"
          className="absolute w-24 h-24"
          initial={{ 
            x: Math.random() * 200 - 100, 
            y: Math.random() * 400 - 200, 
            opacity: 0 
          }}
          animate={{ opacity: 1, scale: [1, 1.2, 1] }}
          transition={{ delay: i * 0.3, repeat: Infinity, duration: 2 }}
        />
      ))}

      <p className="absolute bottom-10 text-gray-400 font-inter text-sm">Tap anywhere to continue</p>
    </motion.div>
  );
}
