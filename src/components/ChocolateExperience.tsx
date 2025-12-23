"use client";
import { useState, Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Float, PresentationControls, ContactShadows, Environment } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";

function ChocolateModel({ biteCount, onBite }: { biteCount: number; onBite: () => void }) {
  // Replace with your actual .glb path
  const { scene } = useGLTF("/chocolate.glb");
  const modelRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (modelRef.current) {
      // Gentle floating animation
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <group 
      ref={modelRef} 
      onClick={(e) => {
        e.stopPropagation();
        onBite();
      }}
      scale={biteCount === 0 ? 1.5 : 1.5 - biteCount * 0.1} // Shrink on bite
    >
      <primitive object={scene} />
    </group>
  );
}

export default function ChocolateExperience({ onNext }: { onNext: () => void }) {
  const [biteCount, setBiteCount] = useState(0);
  const [unwrapped, setUnwrapped] = useState(false);

  const handleBite = () => {
    if (!unwrapped) return;
    const audio = new Audio("/crunch.mp3");
    audio.play();
    setBiteCount((prev) => prev + 1);
    if (biteCount >= 2) setTimeout(onNext, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="relative h-full w-full bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3]"
    >
      <div className="absolute top-20 w-full text-center z-10 px-6">
        <h2 className="text-4xl font-fredoka text-[#4a2c2a] font-bold">
          {!unwrapped ? "Swipe to unwrap... 👀" : "This is for you, sweetheart 🍫"}
        </h2>
        {biteCount > 0 && (
          <motion.p initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-xl text-pink-600 mt-2">
            One bite just for you 😋
          </motion.p>
        )}
      </div>

      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <Environment preset="sweet" />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={[2048, 2048]} castShadow />
          
          <PresentationControls
            global
            config={{ mass: 2, tension: 500 }}
            snap={{ mass: 4, tension: 1500 }}
            rotation={[0, 0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
          >
            <Float rotationIntensity={0.5} floatIntensity={0.5}>
              <ChocolateModel biteCount={biteCount} onBite={handleBite} />
            </Float>
          </PresentationControls>

          <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4.5} />
        </Suspense>
      </Canvas>

      {!unwrapped && (
        <motion.div 
          drag="x"
          dragConstraints={{ left: 0, right: 300 }}
          onDragEnd={(_, info) => {
            if (info.offset.x > 150) setUnwrapped(true);
          }}
          className="absolute bottom-40 left-1/2 -translate-x-1/2 w-64 h-16 bg-white/30 backdrop-blur-md rounded-full border-2 border-white flex items-center px-2 cursor-pointer"
        >
          <motion.div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            ➡️
          </motion.div>
          <span className="ml-4 font-fredoka text-white font-medium uppercase tracking-widest">Unwrap</span>
        </motion.div>
      )}
    </motion.div>
  );
}
