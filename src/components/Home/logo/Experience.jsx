import React, { useRef } from "react";
import { gsap } from "gsap";
import { degToRad } from "three/src/math/MathUtils";

const Experience = () => {
  const mesh1 = useRef();
  const mesh2 = useRef();
  const mesh3 = useRef();
  const redDot = useRef();

  const handleHover = (meshRef, isHovered, color, yOffset) => {
    if (!meshRef.current) return;
    gsap.to(meshRef.current.position, {
      z: isHovered ? yOffset : meshRef.current.userData.originalZ,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(meshRef.current.material.color, {
      r: parseInt(color.slice(1, 3), 16) / 255,
      g: parseInt(color.slice(3, 5), 16) / 255,
      b: parseInt(color.slice(5, 7), 16) / 255,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  return (
    <group position={[15,5,-40]} rotation={[ degToRad(-45), degToRad(-15), degToRad(35)]} scale={8}>
      {/* Adjust group rotation to match the angled perspective */}
      <group rotation={[0, 0, 0]}>
        {/* Mesh 1 - Leftmost, slightly lower and rotated */}
        <mesh
          ref={mesh1}
          position={[-2, -0.5, 0.3]}
          rotation={[0, degToRad(-80), 0]}
          castShadow
          receiveShadow
          userData={{ originalZ: 0.3 }}
          onPointerOver={() => handleHover(mesh1, true, "#db4192", 1)}
          onPointerOut={() => handleHover(mesh1, false, "#000000", 0.3)}
        >
          <boxGeometry args={[0.8 , 3.5, 0.7]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Mesh 2 - Middle, slightly raised */}
        <mesh
          ref={mesh2}
          position={[-0.8, -0.5, 0.3]}
          rotation={[0, degToRad(-80), 0]}
          castShadow
          // scale={1.2}
          receiveShadow
          userData={{ originalZ: 0.3 }}
          onPointerOver={() => handleHover(mesh2, true, "#f5e23b", 1)}
          onPointerOut={() => handleHover(mesh2, false, "#000000", 0.3)}
        >
          <boxGeometry  args={[0.8 , 3.5, 0.7]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Mesh 3 - Rightmost, higher and rotated */}
        <mesh
          ref={mesh3}
          position={[1, -1, 0.3]}
          rotation={[0, 0, degToRad(10)]}
          castShadow
          scale={1.2}
          receiveShadow
          userData={{ originalZ: 0.3 }}
          onPointerOver={() => handleHover(mesh3, true, "#29a9dd", 1)}
          onPointerOut={() => handleHover(mesh3, false, "#000000", 0.3)}
        >
          <boxGeometry  args={[0.8 , 3.5, 0.7]} />
          <meshStandardMaterial color="black" />
        </mesh>

        {/* Red Dot */}
        {/* <mesh ref={redDot} position={[3, -1, 1]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshStandardMaterial color="red" />
        </mesh> */}
      </group>
    </group>
  );
};

export default Experience;