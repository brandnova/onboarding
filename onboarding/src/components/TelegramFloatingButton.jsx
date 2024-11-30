import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X } from 'lucide-react';

const TelegramFloatingButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    const shakeInterval = setInterval(() => {
      // Only shake if the modal is not expanded
      if (!isExpanded) {
        setShouldShake(true);
        
        // Reset the shake after the animation completes
        const shakeTimeout = setTimeout(() => {
          setShouldShake(false);
        }, 500); // Duration of shake animation

        return () => clearTimeout(shakeTimeout);
      }
    }, 10000); // Trigger every 10 seconds

    return () => clearInterval(shakeInterval);
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      y: 20,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      rotate: [0, -10, 10, -10, 0],
      transition: {
        duration: 0.4,
        type: "tween"
      }
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    shake: {
      x: [-10, 10, -10, 10, 0],
      rotate: [0, -15, 15, -15, 0],
      transition: {
        duration: 0.5,
        type: "spring",
        stiffness: 500,
        damping: 10
      }
    },
    idle: {
      rotate: [0, -2, 2, -2, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-4">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white shadow-2xl rounded-xl p-5 w-72 max-w-xs border border-gray-100"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Community Access</h3>
              <motion.button 
                onClick={toggleExpand}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </motion.button>
            </div>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">
              Bypass the traditional onboarding and jump straight into our vibrant Telegram community! Connect instantly with members, get real-time updates, and participate in engaging discussions.
            </p>
            <motion.a 
              href="https://t.me/kumotechs" 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              <Send size={20} className="mr-3" />
              Join Now
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        variants={buttonVariants}
        initial="idle"
        animate={[
          shouldShake ? "shake" : "idle"
        ]}
        whileHover="hover"
        whileTap="tap"
        onClick={toggleExpand}
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
        aria-label="Telegram Community"
      >
        <Send size={28} />
      </motion.button>
    </div>
  );
};

export default TelegramFloatingButton;