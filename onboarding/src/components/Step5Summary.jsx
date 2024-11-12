// src/components/Step5Summary.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Rocket, Check, Users } from 'lucide-react'
import summaryData from '../data/summaryData.json'

const iconComponents = {
  Rocket,
  Check,
  Users
}

export default function Step5Summary({ onPrev }) {
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
        {summaryData.title}
      </motion.h2>
      <motion.p 
        className="text-xl mb-12 text-gray-600 dark:text-gray-300"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {summaryData.description}
      </motion.p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {summaryData.steps.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
          >
            {React.createElement(iconComponents[item.icon], {
              className: "w-12 h-12 text-blue-500 mb-4 mx-auto"
            })}
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 dark:text-gray-300">{item.description}</p>
          </motion.div>
        ))}
      </div>
      <motion.a
        href={summaryData.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl"
      >
        {summaryData.whatsappButtonText}
      </motion.a>
      <div className="mt-12">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-2 px-4 rounded-full flex items-center mx-auto"
        >
          <ArrowLeft className="mr-2" /> {summaryData.backButtonText}
        </motion.button>
      </div>
    </motion.div>
  )
}