"use client"
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';

const ZigzagBoxes = () => {
  const groupRef = useRef();
  const { scrollYProgress } = useScroll();
  
  const waveRotation = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const stretchY = useTransform(scrollYProgress, [0, 1], [1, 2]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = waveRotation.get();
      groupRef.current.scale.set(scale.get(), stretchY.get(), scale.get());
    }
  });
  
  scrollProgress.forEach((progress, index) => {
  useMotionValueEvent(progress, "change", (latest) => {
    setlatest(latest)
    if (index === 0) {
      bannervideoref.current.style.opacity = latest < 0.5 ? "1" : "0";
    }

    if (latest >= 0) {
      setActiveImage(changesImageArr[index === 0 ? 1 : index]);
    } else if (latest < 5 && index > 0.5 && scrollProgress[index - 1]) {
      setActiveImage(changesImageArr[index === 1 ? 1 : index - 1]);
    }
  });
});
  return (
    <group ref={groupRef}>
      {[...Array(10)].map((_, i) => (
        <Box
          key={i}
          args={[1, 1, 1]}
          position={[ (i % 2 === 0 ? 1 : -1) * (i + 1), i * 1.5, 0 ]} 
          material={new THREE.MeshStandardMaterial({ color: 'white' })}
        />
      ))}
    </group>
  );
};

const Scene = () => {
  return (
    <Canvas style={{ background: 'white' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <ZigzagBoxes />
      <OrbitControls />
    </Canvas>
  );
};

const App = () => {
  return (
    <motion.div style={{ height: '200vh' }}>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
        <Scene />
      </div>
      <div style={{ position: 'relative', zIndex: 1, padding: '20px', color: 'black' }}>
        <h1>365 - A year of Cartier</h1>
      </div>
    </motion.div>
  );
};

export default App;