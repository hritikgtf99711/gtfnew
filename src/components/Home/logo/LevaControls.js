import { useControls } from 'leva';
import { useRef } from 'react';
import { useThree } from '@react-three/fiber';

function LevaControls({ mesh1, mesh2, mesh3, groupRef }) {
  // Leva controls for Group
  useControls('Group', {
    position: {
      value: { x: -1, y: 3, z: -5 },
      step: 0.01,
      onChange: (value) => {
        if (groupRef.current) {
          groupRef.current.position.set(value.x, value.y, value.z);
        }
      },
    },
    rotation: {
      value: { x: -Math.PI / 4, y: Math.PI / 8, z: -Math.PI / 1.5 },
      step: 0.01,
      onChange: (value) => {
        if (groupRef.current) {
          groupRef.current.rotation.set(value.x, value.y, value.z);
        }
      },
    },
  });

  // Leva controls for Mesh 1
  useControls('Mesh 1', {
    position: {
      value: { x: 3, y: -1, z: -1 },
      step: 0.01,
      onChange: (value) => {
        if (mesh1.current) {
          mesh1.current.position.set(value.x, value.y, value.z);
          // Update userData to keep hover consistent
          mesh1.current.userData.originalY = value.y;
        }
      },
    },
    rotation: {
      value: { x: -Math.PI / 3, y: Math.PI / 6, z: Math.PI / 4 },
      step: 0.01,
      onChange: (value) => {
        if (mesh1.current) {
          mesh1.current.rotation.set(value.x, value.y, value.z);
        }
      },
    },
  });

  // Leva controls for Mesh 2
  useControls('Mesh 2', {
    position: {
      value: { x: 1, y: -1, z: -1 },
      step: 0.01,
      onChange: (value) => {
        if (mesh2.current) {
          mesh2.current.position.set(value.x, value.y, value.z);
          mesh2.current.userData.originalY = value.y;
        }
      },
    },
    rotation: {
      value: { x: -Math.PI / 3, y: Math.PI / 6, z: Math.PI / 4 },
      step: 0.01,
      onChange: (value) => {
        if (mesh2.current) {
          mesh2.current.rotation.set(value.x, value.y, value.z);
        }
      },
    },
  });

  // Leva controls for Mesh 3
  useControls('Mesh 3', {
    position: {
      value: { x: -1, y: -1, z: -1 },
      step: 0.01,
      onChange: (value) => {
        if (mesh3.current) {
          mesh3.current.position.set(value.x, value.y, value.z);
          mesh3.current.userData.originalY = value.y;
        }
      },
    },
    rotation: {
      value: { x: -Math.PI / 3, y: Math.PI / 6, z: Math.PI / 4 },
      step: 0.01,
      onChange: (value) => {
        if (mesh3.current) {
          mesh3.current.rotation.set(value.x, value.y, value.z);
        }
      },
    },
  });

  return null;
}

export default LevaControls;