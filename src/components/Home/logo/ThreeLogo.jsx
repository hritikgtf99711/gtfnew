import React, { useEffect, useRef } from 'react'
import Experience from './Experience'
import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from "three"


const SceneLights = () => {
  const lightRef = useRef()
  const { scene } = useThree()

  useEffect(() => {
    if (lightRef.current) {
      const helper = new THREE.DirectionalLightHelper(lightRef.current, 1)
      scene.add(helper)
      return () => scene.remove(helper)
    }
  }, [scene])

  return (
    <>
      {/* Global ambient light for overall illumination */}
      <ambientLight intensity={0.5} color={"#ffffff"} />

      {/* Directional light from left side */}
      <directionalLight
        ref={lightRef}
        castShadow
        position={[5, 2, 3]} // ← coming from the left
        intensity={7}
        color="white"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
    </>
  )
}


export const ThreeLogo = () => {
  return (
    <div className="sticky top-0 h-[90vh]">
    <Canvas shadows camera={{ position: [-3, 0, 5], fov: 60, }} className="w-full h-full ">
      {/* <OrbitControls /> */}
      <SceneLights />
      <Experience />
    </Canvas>
    </div>
    
  )
}
