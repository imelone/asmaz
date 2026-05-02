import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import lungIcon from '../assets/lung.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 500); // Wait for fade out to complete
    }, 2000); // Show splash screen for 2 seconds

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-15 h-15"
      >
        <img 
          src={lungIcon} 
          alt="Lung Icon" 
          className="w-15 h-15 mb-4" 
          sizes='10px'
        />
      </motion.div>
      <motion.h1 
        className="text-2xl font-bold text-blue-600 mt-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        AsmaZ
      </motion.h1>
      <motion.p 
        className="text-gray-600 mt-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        Controla tu asma
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
