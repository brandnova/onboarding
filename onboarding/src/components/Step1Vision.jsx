// src/components/Step1Vision.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code, Layout, Database, Palette, Terminal, Globe, CheckCircle, ChevronDown } from 'lucide-react';
import roadmapData from '../data/roadmapData.json';

const iconComponents = {
  Layout,
  Terminal,
  Code,
  Database,
  Globe
};

export default function Step1Vision({ onNext, onPrev }) {
  const [selectedStep, setSelectedStep] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
          {roadmapData.title}
        </motion.h2>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          {roadmapData.description}
        </motion.p>
      </motion.div>

      <div className="space-y-8 mb-12">
        {roadmapData.roadmapSteps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ x: -50, opacity: 0 }}
            animate={{ 
              x: 0, 
              opacity: 1,
              transition: { delay: index * 0.1 }
            }}
          >
            <motion.div
              className={`relative overflow-hidden rounded-2xl ${
                selectedStep === index 
                  ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/20' 
                  : 'hover:shadow-md'
              }`}
            >
              <motion.button
                onClick={() => setSelectedStep(selectedStep === index ? null : index)}
                className={`w-full text-left transition-all duration-300 ${
                  selectedStep === index 
                    ? 'bg-white dark:bg-gray-800' 
                    : 'bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800'
                }`}
              >
                <div className="p-6 flex items-start space-x-4">
                  <div className={`p-3 rounded-xl ${step.bgColor}`}>
                    {React.createElement(iconComponents[step.icon], { className: `w-6 h-6 ${step.color}` })}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl text-gray-600 font-semibold">{step.title}</h3>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {step.timeline}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{step.description}</p>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedStep === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {selectedStep === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <div className="p-6 grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-3">
                          Key Skills
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {step.skills.map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className={`px-3 py-1 rounded-full text-sm ${step.bgColor} ${step.color}`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-3">
                          Practice Projects
                        </h4>
                        <ul className="space-y-2">
                          {step.projects.map((project, projectIndex) => (
                            <li key={projectIndex} className="flex items-center space-x-2">
                              <CheckCircle className={`w-4 h-4 ${step.color}`} />
                              <span className="text-gray-500 dark:text-gray-300">{project}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        ))}
      </div>

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
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 
            text-white font-bold py-3 px-6 rounded-full flex items-center transition-all duration-300"
        >
          Next <ArrowRight className="ml-2 h-5 w-5" />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}