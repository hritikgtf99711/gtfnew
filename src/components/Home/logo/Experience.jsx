import React, { useRef } from "react"
import { gsap } from "gsap"
import LevaControls from "./LevaControls"

const Experience = () => {
  const mesh1 = useRef()
  const mesh2 = useRef()
  const mesh3 = useRef()
  const groupRef = useRef();

  const handleHover = (meshRef, isHovered, color, yOffset) => {
    if (!meshRef.current) return
    gsap.to(meshRef.current.position, {
      y: isHovered ? yOffset : meshRef.current.userData.originalY,
      duration: 0.3,
      ease: "power2.out",
    })
    gsap.to(meshRef.current.material.color, {
      r: parseInt(color.slice(1, 3), 16) / 255,
      g: parseInt(color.slice(3, 5), 16) / 255,
      b: parseInt(color.slice(5, 7), 16) / 255,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
   <>
     <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={2}>
      {/* Mesh 1 */}
      <mesh
        ref={mesh1}
        // rotation={[-Math.PI / 3 , Math.PI / 6, Math.PI / 4]}
        position={[3, -1, -1]}
        castShadow
        receiveShadow
        userData={{ originalY: -1 }}
        onPointerOver={() => handleHover(mesh1, true, "#db4192", -0.5)}
        onPointerOut={() => handleHover(mesh1, false, "#000000", -1)}
      >
        <boxGeometry args={[1.2, 4, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Mesh 2 */}
      <mesh
        ref={mesh2}
        // rotation={[-Math.PI / 3, Math.PI / 6, Math.PI / 4]}
        position={[1, -1, -1]}
        castShadow
        // scale={1.1}
        receiveShadow
        userData={{ originalY: -1 }}
        onPointerOver={() => handleHover(mesh2, true, "#f5e23b", -0.5)}
        onPointerOut={() => handleHover(mesh2, false, "#000000", -1)}
      >
        <boxGeometry args={[1.2, 4, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Mesh 3 */}
      <mesh
        ref={mesh3}
        // rotation={[-Math.PI / 3, Math.PI / 6, Math.PI / 4]}
        position={[-1, -1, -1]}
        castShadow
        // scale={1.5}
        receiveShadow
        userData={{ originalY: -2 }}
        onPointerOver={() => handleHover(mesh3, true, "#29a9dd", -1.5)}
        onPointerOut={() => handleHover(mesh3, false, "#000000", -2)}
      >
        <boxGeometry args={[1.2, 4, 1]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </group>

    <LevaControls mesh1={mesh1} mesh2={mesh2} mesh3={mesh3} groupRef={groupRef} />
   </>
  )
}

export default Experience
