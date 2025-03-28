"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Moon, Sun, Sparkles, Brain, LogIn, UserCircle, LogOut } from "lucide-react";
import { motion, useSpring } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { useAuth } from "../utils/AuthContext";

// Base64 encoded robot logo
const ROBOT_LOGO_BASE64 = "data:image/png;base64,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";

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
            <div className="relative w-10 h-10 flex items-center justify-center">
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
              <div className="relative z-10 w-7 h-7">
                <Image 
                  src={ROBOT_LOGO_BASE64}
                  alt="StudyAI Robot Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
              </div>
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