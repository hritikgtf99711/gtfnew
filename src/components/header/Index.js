import './header.css';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const Header = ({ ref,isHidden,setIsHidden }) => {
  const { scrollY } = useScroll();
  console.log(setIsHidden)
  
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 30) {
      setIsHidden(true)
    } else {
      setIsHidden(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      className={`absolute header_main w-[86%] ${isHidden?'hide':''} left-[50%] translate-x-[-50%] top-0 z-[99999]`}
      animate={{ y: isHidden ? '-100%' : '0%' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      <div className="container mx-auto py-6">
        <div className="row flex justify-between items-center">
          <figure className="logo">
            <img
              src="./assets/img/logo.svg"
              alt="bg"
              className="w-[120px] h-full object-cover"
            />
          </figure>

          <div className="hamburger">
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;