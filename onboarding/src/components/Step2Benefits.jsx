// src/components/Step2Benefits.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowLeft, ArrowRight, Briefcase, Code, Brain, Globe, Users, DollarSign, Clock, Heart, TrendingUp, CheckCircle } from 'lucide-react';
import benefitsData from '../data/benefitsData.json';

const iconComponents = {
  Briefcase, Code, Brain, Globe, Users, DollarSign, Clock, Heart, TrendingUp
};

export default function Step2Benefits({ onNext, onPrev }) {
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [hoveredBenefit, setHoveredBenefit] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleBenefit = (benefitText) => {
    setSelectedBenefits(prev => 
      prev.includes(benefitText)
        ? prev.filter(b => b !== benefitText)
        : [...prev, benefitText]
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4"
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-12"
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-transparent bg-clip-text animate-gradient bg-size-200"
        >
          {benefitsData.title}
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {benefitsData.description}
        </motion.p>
        {selectedBenefits.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30"
          >
            <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-blue-600 dark:text-blue-400">
              {selectedBenefits.length} benefits selected
            </span>
          </motion.div>
        )}
      </motion.div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {benefitsData.benefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setHoveredBenefit(index)}
              onHoverEnd={() => setHoveredBenefit(null)}
              onClick={() => toggleBenefit(benefit.text)}
              className={`w-full h-full rounded-2xl text-left transition-all duration-300 overflow-hidden
                ${selectedBenefits.includes(benefit.text)
                  ? `bg-gradient-to-br ${benefit.gradient} text-white shadow-lg`
                  : 'bg-white dark:bg-gray-800 hover:shadow-xl'
                }`}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    selectedBenefits.includes(benefit.text)
                      ? 'bg-white/20'
                      : benefit.highlight
                  }`}>
                    {React.createElement(iconComponents[benefit.icon], {
                      className: `w-6 h-6 ${
                        selectedBenefits.includes(benefit.text)
                          ? 'text-white'
                          : benefit.color
                      }`
                    })}
                  </div>
                  <div>
                    <h3 className="text-lg text-gray-700 font-semibold">{benefit.text}</h3>
                    <p className={`text-sm ${
                      selectedBenefits.includes(benefit.text)
                        ? 'text-white/90'
                        : 'text-gray-600 dark:text-gray-300'
                    }`}>
                      {benefit.description}
                    </p>
                  </div>
                </div>

                <AnimatePresence>
                  {(hoveredBenefit === index || selectedBenefits.includes(benefit.text)) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-white/20 pt-4 mt-4 space-y-2"
                    >
                      {benefit.stats.map((stat, statIndex) => (
                        <motion.div
                          key={statIndex}
                          initial={{ x: -20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: statIndex * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <Check className={`w-4 h-4 ${
                            selectedBenefits.includes(benefit.text)
                              ? 'text-white'
                              : benefit.color
                          }`} />
                          <span className={`text-sm ${
                            selectedBenefits.includes(benefit.text)
                              ? 'text-white/90'
                              : 'text-gray-600 dark:text-gray-300'
                          }`}>
                            {stat}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        className="flex justify-between items-center"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 
            text-gray-800 dark:text-white font-bold py-3 px-6 rounded-full flex items-center
            transition-colors duration-300"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className={`${
            selectedBenefits.length > 0
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
              : 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
          } text-white font-bold py-3 px-6 rounded-full flex items-center transition-all duration-300`}
          disabled={selectedBenefits.length === 0}
        >
          Next <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}