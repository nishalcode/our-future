"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EntryPage from "@/components/EntryPage";
import EmotionalHit from "@/components/EmotionalHit";
import CandyChaos from "@/components/CandyChaos";
import ChocolateExperience from "@/components/ChocolateExperience";
import LoveMeter from "@/components/LoveMeter";
import MiniGame from "@/components/MiniGame";
import FinalPage from "@/components/FinalPage";

export default function Home() {
  const [step, setStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextStep = () => setStep((s) => s + 1);

  useEffect(() => {
    audioRef.current = new Audio("/music.mp3");
    audioRef.current.loop = true;
  }, []);

  const startExperience = () => {
    audioRef.current?.play();
    nextStep();
  };

  return (
    <main className="relative h-screen w-full overflow-hidden bg-[#FFF5F7] select-none">
      {/* BUILDER WATERMARK */}
      <div className="fixed bottom-4 right-4 z-[9999] text-pink-400 font-bold opacity-50 pointer-events-none">
        @ngaithemes
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && <EntryPage onStart={startExperience} key="step0" />}
        {step === 1 && <EmotionalHit onNext={nextStep} key="step1" />}
        {step === 2 && <CandyChaos onNext={nextStep} key="step2" />}
        {step === 3 && <ChocolateExperience onNext={nextStep} key="step3" />}
        {step === 4 && <LoveMeter onNext={nextStep} key="step4" />}
        {step === 5 && <MiniGame onNext={nextStep} key="step5" />}
        {step === 6 && <FinalPage onRestart={() => setStep(0)} key="step6" />}
      </AnimatePresence>

      {/* Audio Controls */}
      {step > 0 && (
        <button 
          onClick={() => {
            if(audioRef.current) {
              audioRef.current.muted = !isMuted;
              setIsMuted(!isMuted);
            }
          }}
          className="fixed top-6 right-6 z-50 p-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg"
        >
          {isMuted ? "🔇" : "🎵"}
        </button>
      )}
    </main>
  );
}
