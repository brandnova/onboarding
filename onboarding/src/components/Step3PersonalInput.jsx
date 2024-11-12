import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Send, Lightbulb, Code, BookOpen, 
         Rocket, Check, Users, Heart, Star, Trophy, Target, 
         Calendar, Clock, Globe, Laptop, Book } from 'lucide-react';
import confetti from 'canvas-confetti';
import personalInputData from '../data/personalInputData.json';

const iconComponents = {
  Laptop, Code, Globe, Book, Target, Clock, Check, Trophy, ArrowLeft, ArrowRight
};

export default function Step3PersonalInput({ onNext, onPrev }) {
  const [formData, setFormData] = useState({
    motivation: '',
    experience: 'beginner',
    availableHours: '',
    preferredStack: [],
    learningStyle: '',
    goals: []
  });
  const [currentSection, setCurrentSection] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFeedback(true);
    setTimeout(() => {
      setShowFeedback(false);
      onNext();
    }, 2000);
  };

  const triggerConfetti = () => {
    const duration = 2000;
    const end = Date.now() + duration;

    const colors = ['#3B82F6', '#8B5CF6', '#EC4899'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const sections = [
    {
      title: personalInputData.sections[0].title,
      component: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <textarea
            value={formData.motivation}
            onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
            className="w-full p-6 min-h-[150px] text-lg rounded-xl border-2 
              transition-all duration-300 resize-none
              border-gray-200 dark:border-gray-700
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={personalInputData.sections[0].placeholder}
            required
          />
        </motion.div>
      )
    },
    {
      title: personalInputData.sections[1].title,
      component: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="grid gap-4">
            <select
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              {personalInputData.sections[1].experienceOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
            
            <div className="flex items-center space-x-4">
              <Clock className="w-5 h-5 text-blue-500" />
              <input
                type="number"
                value={formData.availableHours}
                onChange={(e) => setFormData({ ...formData, availableHours: e.target.value })}
                placeholder="Hours per week"
                className="flex-1 p-4 rounded-xl border-2 border-gray-200 dark:border-gray-700
                  bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
        </motion.div>
      )
    },
    {
      title: personalInputData.sections[2].title,
      component: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {personalInputData.techStacks.map(({ id, label, icon }) => (
                <motion.button
                  key={id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const newStacks = formData.preferredStack.includes(id)
                      ? formData.preferredStack.filter(s => s !== id)
                      : [...formData.preferredStack, id];
                    setFormData({ ...formData, preferredStack: newStacks });
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-300
                    ${formData.preferredStack.includes(id)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                      : 'border-gray-200 dark:border-gray-700'}
                    flex flex-col items-center space-y-2`}
                >
                  {React.createElement(iconComponents[icon], { className: "w-6 h-6 text-blue-500" })}
                  <span className="text-sm font-medium">{label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      )
    },
    {
      title: personalInputData.sections[3].title,
      component: (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {personalInputData.goalOptions.map((goal) => (
              <motion.button
                key={goal}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const newGoals = formData.goals.includes(goal)
                    ? formData.goals.filter(g => g !== goal)
                    : [...formData.goals, goal];
                  setFormData({ ...formData, goals: newGoals });
                }}
                className={`p-4 rounded-xl border-2 transition-all duration-300
                  ${formData.goals.includes(goal)
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                    : 'border-gray-200 dark:border-gray-700'}
                  text-left`}
              >
                <span className="font-medium">{goal}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto px-4"
    >
      <div className="space-y-8">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            {sections[currentSection].title}
          </h2>
        </motion.div>

        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mb-8">
          {sections.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSection
                  ? 'w-8 bg-blue-500'
                  : index < currentSection
                  ? 'w-8 bg-green-500'
                  : 'w-4 bg-gray-200 dark:bg-gray-700'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {sections[currentSection].component}
          </AnimatePresence>
        </form>

        <div className="flex justify-between items-center pt-4">
          <motion.button
            onClick={() => {
              if (currentSection === 0) onPrev();
              else setCurrentSection(prev => prev - 1);
            }}
            className="flex items-center space-x-2 px-6 py-3 rounded-full
              bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-black
              transition-colors duration-300"
            whileHover={{ x: -5 }}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          {currentSection < sections.length - 1 ? (
            <motion.button
              onClick={() => setCurrentSection(prev => prev + 1)}
              className="flex items-center space-x-2 px-6 py-3 rounded-full
                bg-blue-600 hover:bg-blue-700 text-white
                transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <span>Next</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-6 py-3 rounded-full
                bg-blue-600 hover:bg-blue-700 text-white
                transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <span>Complete</span>
              <Check className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2
              bg-gradient-to-r from-green-500 to-emerald-500 text-white 
              p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center justify-center space-x-3">
              <Trophy className="w-6 h-6" />
              <p className="text-lg font-semibold">
                Profile Complete! Let's start your journey!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}