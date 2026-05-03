import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'white',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{ width: '100%', textAlign: 'center', marginBottom: '1rem' }}
      >
        <img 
          src={logo} 
          alt="Logo" 
          style={{ width: '150px', height: '150px', objectFit: 'contain', display: 'block', margin: '0 auto' }}
        />
      </motion.div>
      <motion.p 
        style={{ textAlign: 'center', color: '#4b5563', margin: 0 }}
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
