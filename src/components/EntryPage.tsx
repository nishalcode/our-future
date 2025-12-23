"use client";
import { motion } from "framer-motion";

export default function EntryPage({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      exit={{ opacity: 0, scale: 0.9 }}
      className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-white"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12 }}
      >
        <img 
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJueGZueXF6eXJueGZueXF6eXJueGZueXF6eXJueGZueXF6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1z/v6aOebdclIYfTtRBBt/giphy.gif" 
          alt="Excited Panda"
          className="w-64 h-64 object-contain mb-8"
        />
      </motion.div>

      <h1 className="text-5xl font-fredoka font-bold text-[#FF6B9D] mb-4 leading-tight">
        Wanna see <br /> our future? 👀
      </h1>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onStart}
        className="mt-8 px-12 py-4 bg-[#FF6B9D] text-white rounded-full text-2xl font-fredoka font-bold shadow-lg shadow-pink-200"
      >
        Show me 😳
      </motion.button>
    </motion.div>
  );
}
