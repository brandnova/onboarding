// src/components/LandingPage.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, Star, ChevronDown, Layout, Database, Globe, Zap } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const techStack = [
  { name: 'HTML & CSS', icon: Layout, color: 'text-orange-500' },
  { name: 'JavaScript', icon: Zap, color: 'text-yellow-500' },
  { name: 'React', icon: Globe, color: 'text-blue-500' },
  { name: 'Backend', icon: Database, color: 'text-green-500' }
]

export default function LandingPage({ onStart }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="text-center max-w-4xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="mb-12 relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <img src="/vite.svg" alt="Vite logo" className="w-24 h-24 mx-auto mb-6 relative z-10" />
      </motion.div>

      <motion.h1 
        variants={itemVariants}
        className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-transparent bg-clip-text animate-gradient bg-size-200"
      >
        Begin Your Web Dev Journey
      </motion.h1>

      <motion.p 
        variants={itemVariants}
        className="text-xl md:text-2xl mb-12 text-gray-600 dark:text-gray-300"
      >
        Transform your future through the power of code. Join thousands of successful developers who started right here.
      </motion.p>

      {/* Tech Stack Section */}
      <motion.div
        variants={itemVariants}
        className="flex justify-center gap-8 mb-12 flex-wrap"
      >
        {techStack.map((tech, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center"
          >
            {React.createElement(tech.icon, {
              className: `w-8 h-8 ${tech.color} mb-2`
            })}
            <span className="text-sm font-medium">{tech.name}</span>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
      >
        {[
          {
            icon: Rocket,
            title: "Master Web Dev",
            description: "Learn modern web development from the ground up",
            gradient: "from-blue-500 to-blue-600"
          },
          {
            icon: Layout,
            title: "Build & Deploy",
            description: "Create and launch real-world projects",
            gradient: "from-purple-500 to-purple-600"
          },
          {
            icon: Star,
            title: "Achieve More",
            description: "Launch your career in tech",
            gradient: "from-pink-500 to-pink-600"
          }
        ].map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ 
              y: -5,
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            className="bg-white bg-opacity-25 dark:bg-gray-800 dark:bg-opacity-50 p-8 rounded-2xl shadow-xl relative overflow-hidden group backdrop-blur-lg"
          >
            {/* Optional gradient overlay for extra style */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Icon */}
            {React.createElement(item.icon, {
              className: `w-12 h-12 mb-4 mx-auto text-transparent bg-gradient-to-r ${item.gradient} bg-clip-text`
            })}
            
            {/* Title */}
            <h3 className="text-base dark:text-gray-100 text-xl font-semibold mb-2">
              {item.title}
            </h3>
            
            {/* Description */}
            <p className="text-base dark:text-gray-300">{item.description}</p>
          </motion.div>

        ))}
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col items-center"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative px-8 py-4 overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl mb-8"
        >
          <span className="relative z-10">Start Your Journey</span>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>

        <motion.div
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <ChevronDown className="w-6 h-6 text-gray-400" />
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { label: "Active Students", value: "2,000+" },
            { label: "Course Hours", value: "100+" },
            { label: "Success Rate", value: "95%" },
            { label: "Projects Built", value: "1,000+" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}