"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Moon, Sun, Sparkles, Brain, LogIn, UserCircle, LogOut } from "lucide-react";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "../utils/AuthContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { theme, setTheme } = useTheme();
  const { user, signOut } = useAuth();
  const isDarkMode = theme === "dark";

  // Refined spring animations for smoother transitions
  const navSpring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Check if we're scrolled down
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 20);
      navSpring.set(Math.min(1, scrollPosition / 100));
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navSpring]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const navItems = ['Features', 'Testimonials', 'Mobile App', 'Pricing', 'FAQ', 'Contact'];

  // Handle sign out
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="fixed top-0 w-full z-50 px-4">
      <motion.div 
        className={`mx-auto my-4 max-w-7xl rounded-full ${
          scrolled 
            ? 'bg-white/70 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg dark:shadow-black/20 border border-gray-200/50 dark:border-gray-700/50' 
            : 'bg-transparent'
        } transition-all duration-500`}
        style={{ 
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        }}
      >
        <div className="flex justify-between items-center py-3 px-6">
          {/* Logo */}
          <Link href="#" className="flex items-center gap-2 group" onClick={scrollToTop}>
            <div className="relative w-8 h-8 flex items-center justify-center">
              <motion.div 
                className="absolute w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg rotate-6 group-hover:rotate-12" 
                animate={{
                  rotate: [6, 12, 6],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute w-full h-full bg-gradient-to-tr from-indigo-600 to-blue-500 rounded-lg -rotate-6 group-hover:-rotate-12" 
                animate={{
                  rotate: [-6, -12, -6],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
              <Brain className="w-5 h-5 text-white relative z-10" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400 group-hover:from-indigo-400 group-hover:to-purple-500 dark:group-hover:from-indigo-300 dark:group-hover:to-purple-400 transition-all duration-300">
              StudyAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <div className="relative flex bg-gray-100/50 dark:bg-gray-800/50 rounded-full backdrop-blur-sm p-1">
              {navItems.map((item, index) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="relative px-4 py-2 text-gray-700 dark:text-gray-300 font-medium rounded-full hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {hoverIndex === index && (
                    <motion.div
                      className="absolute inset-0 bg-white dark:bg-gray-700 rounded-full -z-10"
                      layoutId="navHighlight"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.3 }}
                    />
                  )}
                  {item}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center ml-4 space-x-2">
              <motion.button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle dark mode"
                whileHover={{ rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                {isDarkMode ? (
                  <Sun className="h-5 w-5 text-yellow-400" />
                ) : (
                  <Moon className="h-5 w-5 text-indigo-600" />
                )}
              </motion.button>

              {user ? (
                <div className="flex items-center space-x-2">
                  <Link href="/profile" className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <UserCircle className="h-5 w-5" />
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                  <Link href="/dashboard" className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <Sparkles className="h-5 w-5" />
                    <span className="text-sm font-medium">Dashboard</span>
                  </Link>
                  <motion.button
                    onClick={handleSignOut}
                    className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400"
                    whileTap={{ scale: 0.95 }}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="text-sm font-medium">Sign Out</span>
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/signin" className="flex items-center gap-1 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                    <LogIn className="h-5 w-5" />
                    <span className="text-sm font-medium">Sign In</span>
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href="/auth/signup"
                      className="flex items-center gap-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    >
                      <span>Sign Up</span>
                      <Sparkles className="h-4 w-4 opacity-70" />
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center space-x-3">
            <motion.button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle dark mode"
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-indigo-600" />
              )}
            </motion.button>
            
            <motion.button 
              onClick={toggleMenu} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              whileTap={{ scale: 0.9 }}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          y: isMenuOpen ? 0 : -10,
          pointerEvents: isMenuOpen ? "auto" : "none"
        }}
        transition={{ duration: 0.2 }}
        className="md:hidden mx-4 mt-2 overflow-hidden bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="p-4 space-y-3">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
              onClick={toggleMenu}
            >
              {item}
            </Link>
          ))}
          <div className="pt-2">
            {user ? (
              <div className="space-y-2">
                <Link 
                  href="/profile" 
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={toggleMenu}
                >
                  <UserCircle className="h-5 w-5 text-indigo-500" />
                  <span>Profile</span>
                </Link>
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={toggleMenu}
                >
                  <Sparkles className="h-5 w-5 text-indigo-500" />
                  <span>Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
                >
                  <LogOut className="h-5 w-5 text-red-500" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link 
                  href="/auth/signin" 
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  onClick={toggleMenu}
                >
                  <LogIn className="h-5 w-5 text-indigo-500" />
                  <span>Sign In</span>
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white rounded-lg font-medium transition-colors"
                  onClick={toggleMenu}
                >
                  <span>Sign Up</span>
                  <Sparkles className="h-4 w-4 opacity-70" />
                </Link>
              </div>
            )}
          </div>
          
          {/* Auth links for mobile */}
          <hr className="my-2 border-gray-200 dark:border-gray-700" />
          
          {user ? (
            <>
              <Link 
                href="/dashboard" 
                className="block p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <UserCircle className="h-5 w-5 text-indigo-500" />
                  <span>Dashboard</span>
                </div>
              </Link>
              <button
                onClick={() => {
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="w-full text-left p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <div className="flex items-center gap-2">
                  <LogOut className="h-5 w-5 text-red-500" />
                  <span>Sign Out</span>
                </div>
              </button>
            </>
          ) : (
            <>
              <Link 
                href="/auth/signin" 
                className="block p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <LogIn className="h-5 w-5 text-indigo-500" />
                  <span>Sign In</span>
                </div>
              </Link>
              <Link 
                href="/auth/signup" 
                className="block p-2 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                  <Sparkles className="h-5 w-5" />
                  <span>Sign Up</span>
                </div>
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </header>
  );
};

export default Navbar; 