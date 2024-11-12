// src/components/Step4Motivation.jsx
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import motivationData from '../data/motivationData.json'

function FlipCard({ fact }) {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => setIsFlipped(!isFlipped)

  return (
    <motion.div
      className="flip-card cursor-pointer w-full h-48"
      onClick={handleFlip}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="flip-card-inner w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="flip-card-front absolute w-full h-full bg-blue-100 dark:bg-blue-900 rounded-lg shadow-lg flex items-center justify-center p-4">
          <Quote className="w-12 h-12 text-blue-500" />
        </div>
        <div className="flip-card-back absolute w-full h-full bg-blue-600 dark:bg-blue-800 rounded-lg shadow-lg flex items-center justify-center p-4 [transform:rotateY(180deg)]">
          <p className="text-lg font-semibold text-white text-center">{fact}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Step4Motivation({ onNext, onPrev }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-6xl mx-auto px-4"
    >
      <motion.h2 
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {motivationData.title}
      </motion.h2>
      <motion.p 
        className="text-xl mb-12 text-gray-600 dark:text-gray-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {motivationData.description}
      </motion.p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {motivationData.motivationalFacts.map((fact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <FlipCard fact={fact} />
          </motion.div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-full flex items-center"
        >
          <ArrowLeft className="mr-2" /> Back
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full flex items-center"
        >
          Next <ArrowRight className="ml-2" />
        </motion.button>
      </div>
    </motion.div>
  )
}