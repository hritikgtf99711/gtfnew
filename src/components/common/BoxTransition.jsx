import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BoxTransitionsM = () => {
  const time = 2; // Duration for one direction (seconds)
  const xgap = 300; // Distance to move (pixels)
  const [isAnimating, setIsAnimating] = useState(false);

  // Start animations after component mounts
  useEffect(() => {
    setIsAnimating(true);
  }, []);

  // Define elements with their respective easing/transitions
  const elements = [
    { 
      name: 'strong', 
      transition: { 
        duration: time, 
        ease: [0.68, -0.55, 0.265, 1.55],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'linear', 
      transition: { 
        duration: time, 
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'power1', 
      transition: { 
        duration: time, 
        ease: [0.42, 0, 1, 1],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'power2', 
      transition: { 
        duration: time, 
        ease: [0.55, 0.085, 0.68, 0.53],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'power3', 
      transition: { 
        duration: time, 
        ease: [0.7, 0.2, 0.9, 0.1],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'power4', 
      transition: { 
        duration: time, 
        ease: [0.895, 0.03, 0.685, 0.22],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'quad', 
      transition: { 
        duration: time, 
        ease: [0.55, 0.085, 0.68, 0.53],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'cubic', 
      transition: { 
        duration: time, 
        ease: [0.55, 0.055, 0.675, 0.19],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'quart', 
      transition: { 
        duration: time, 
        ease: [0.895, 0.03, 0.685, 0.22],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'quint', 
      transition: { 
        duration: time, 
        ease: [0.755, 0.05, 0.855, 0.06],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    {
      name: 'elastic',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        mass: 1,
        duration: time,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      },
    },
    {
      name: 'back',
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1,
        duration: time,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      },
    },
    {
      name: 'bounce',
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 20,
        mass: 1,
        duration: time,
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      },
    },
    {
      name: 'slowmo',
      transition: { 
        duration: time * 1.25, 
        ease: [0.8, 0, 0.2, 1],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      },
    },
    { 
      name: 'circ', 
      transition: { 
        duration: time, 
        ease: [0.785, 0.135, 0.15, 0.86],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'expo', 
      transition: { 
        duration: time, 
        ease: [1, 0, 0, 1],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
    { 
      name: 'sine', 
      transition: { 
        duration: time, 
        ease: [0.445, 0.05, 0.55, 0.95],
        repeat: Infinity,
        repeatType: 'reverse',
        repeatDelay: 0
      } 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Framer Motion Easing Transitions
        </h1>
        <div className="space-y-2">
          {elements.map(({ name, transition }, index) => (
            <div key={name} className="flex items-center">
              <div className="w-24 text-sm text-gray-600 font-mono">
                {name}
              </div>
              <div className="flex-1 relative h-12 bg-gray-200 rounded overflow-hidden">
                <motion.div
                  className="absolute left-0 top-1/2 transform -translate-y-1/2"
                  animate={isAnimating ? { x: xgap } : { x: 0 }}
                  transition={transition}
                  style={{
                    width: '40px',
                    height: '24px',
                    background: `hsl(${(index * 20) % 360}, 70%, 60%)`,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    color: 'white'
                  }}
                >
                  •
                </motion.div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <button
            onClick={() => setIsAnimating(!isAnimating)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
          >
            {isAnimating ? 'Pause' : 'Play'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoxTransitionsM;