"use client";
import { motion } from "framer-motion";

export default function FinalPage({ onRestart }: { onRestart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full w-full flex flex-col items-center justify-center bg-[#FFF5F7] p-8 text-center"
    >
      <img 
        src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZueXF6eXJueGZueXF6eXJueGZueXF6eXJueGZueXF6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/v6aOebdclIYfTtRBBt/giphy.gif" 
        className="w-48 h-48 mb-6"
      />
      
      <h1 className="text-4xl font-fredoka font-bold text-gray-800 mb-4">
        Our Future is Beautiful
      </h1>
      
      <p className="text-lg text-pink-600 font-inter italic mb-12">
        "I can't wait to spend every second of it with you."
      </p>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={onRestart}
          className="w-full py-4 bg-white border-2 border-pink-200 text-pink-500 rounded-2xl font-bold shadow-sm"
        >
          Replay Experience 🔄
        </motion.button>
        
        <button className="text-gray-400 text-sm">Save to Memories 📸</button>
      </div>

      <footer className="absolute bottom-8 w-full text-center">
        <p className="text-pink-300 font-bold tracking-widest text-xs uppercase">
          Crafted with emotion by @ngaithemes
        </p>
      </footer>
    </motion.div>
  );
}
