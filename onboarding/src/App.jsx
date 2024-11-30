import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Sun, Moon, Sparkles, BookOpen, Star, User, Heart, CheckCircle, Menu, X } from 'lucide-react';
import confetti from 'canvas-confetti';
import TelegramFloatingButton from './components/TelegramFloatingButton'; 
import LandingPage from './components/LandingPage';
import Step1Vision from './components/Step1Vision';
import Step2Benefits from './components/Step2Benefits';
import Step3PersonalInput from './components/Step3PersonalInput';
import Step4Motivation from './components/Step4Motivation';
import Step5Summary from './components/Step5Summary';

const steps = [
  { path: '/', label: 'Start', icon: Sparkles },
  { path: '/vision', label: 'Vision', icon: BookOpen },
  { path: '/benefits', label: 'Benefits', icon: Star },
  { path: '/personal', label: 'Profile', icon: User },
  { path: '/motivation', label: 'Motivation', icon: Heart },
  { path: '/summary', label: 'Summary', icon: CheckCircle }
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideNav, setHideNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const stepIndex = steps.findIndex(step => step.path === location.pathname);
    if (stepIndex !== -1) {
      setCurrentStep(stepIndex);
      // Scroll to the top of the page when the active section changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHideNav(currentScrollY > lastScrollY && currentScrollY > 80);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const nextStep = () => {
    const nextIndex = Math.min(currentStep + 1, steps.length - 1);
    setCurrentStep(nextIndex);
    navigate(steps[nextIndex].path);
    
    if (nextIndex === steps.length - 1) {
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);
      
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const prevStep = () => {
    const prevIndex = Math.max(currentStep - 1, 0);
    setCurrentStep(prevIndex);
    navigate(steps[prevIndex].path);
    // Scroll to the top of the page when the active section changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${
      isDarkMode 
        ? 'dark bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-b from-white via-blue-50 to-white text-gray-900'
    }`}>
      {/* Telegram Floating Button */}
      <TelegramFloatingButton />

      {/* Smart Navigation Bar */}
      <nav className={`fixed w-full transition-all duration-300 transform ${
        hideNav ? '-translate-y-full' : 'translate-y-0'
      } backdrop-blur-md ${
        isDarkMode ? 'bg-gray-900/90' : 'bg-white/90'
      } border-b border-gray-200 dark:border-gray-700 z-50`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <img src="/vite.svg" alt="Vite logo" className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
              <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                Web Innovators
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                {React.createElement(steps[currentStep].icon, {
                  className: "h-5 w-5 text-blue-600 dark:text-blue-400"
                })}
                <span className="text-sm font-medium">
                  {steps[currentStep].label} ({currentStep + 1}/{steps.length})
                </span>
              </div>
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-blue-600" />
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ${
            isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              <div className="flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white">
                {React.createElement(steps[currentStep].icon, {
                  className: "h-5 w-5"
                })}
                <span>{steps[currentStep].label} ({currentStep + 1}/{steps.length})</span>
              </div>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center text-gray-500 space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-5 w-5 text-yellow-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 text-blue-600" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Progress Steps */}
          <div className="mb-8 mt-4">
            <div className="hidden md:flex justify-between items-center mb-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index === steps.length - 1 ? '' : 'flex-1'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                      index === currentStep
                        ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-500/50'
                        : index < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="flex-1 h-1 mx-4 rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-blue-600 to-purple-600"
                        style={{
                          width: `${index < currentStep ? '100%' : index === currentStep ? '50%' : '0%'}`
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="md:hidden bg-gray-200 dark:bg-gray-700 h-2 rounded-full">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-blue-600 to-purple-600"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          {/* Routes */}
          <div className="relative min-h-[600px]">
            <Routes>
              <Route path="/" element={<LandingPage onStart={nextStep} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
              <Route path="/vision" element={<Step1Vision onNext={nextStep} onPrev={prevStep} />} />
              <Route path="/benefits" element={<Step2Benefits onNext={nextStep} onPrev={prevStep} />} />
              <Route path="/personal" element={<Step3PersonalInput onNext={nextStep} onPrev={prevStep} />} />
              <Route path="/motivation" element={<Step4Motivation onNext={nextStep} onPrev={prevStep} />} />
              <Route path="/summary" element={<Step5Summary onPrev={prevStep} />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}