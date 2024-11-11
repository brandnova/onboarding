import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'

const motivationalFacts = [
  "Every coder started as a beginner.",
  "Coding isn't magic; it's a skill you can learn.",
  "The best way to predict the future is to create it.",
  "Your coding journey is unique. Embrace it!",
  "Small steps every day lead to big achievements."
]

export default function Step4Motivation({ onNext, onPrev }) {
  const [currentFact, setCurrentFact] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % motivationalFacts.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-4xl mx-auto"
    >
      <motion.h2 
        className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Motivational Insights
      </motion.h2>
      <motion.p 
        className="text-xl mb-12 text-gray-600 dark:text-gray-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Let these words of wisdom inspire your coding journey:
      </motion.p>
      <div className="relative h-48 mb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFact}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-blue-100 dark:bg-blue-900 p-8 rounded-lg shadow-lg max-w-2xl">
              <Quote className="w-8 h-8 text-blue-500 mb-4 mx-auto" />
              <p className="text-2xl font-semibold text-blue-800 dark:text-blue-200">
                {motivationalFacts[currentFact]}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
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