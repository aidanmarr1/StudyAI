"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useInView } from "framer-motion";
import { Download, Share2, Bell, Star, Check, ArrowRight, Globe, Clock, Zap, Smartphone } from "lucide-react";

const phoneFeatures = [
  {
    icon: <Globe className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
    title: "Study Anywhere",
    description: "Access your study materials on the go, whether you're commuting or in a coffee shop."
  },
  {
    icon: <Clock className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
    title: "Study Reminders",
    description: "Get smart notifications based on your optimal study times and schedule."
  },
  {
    icon: <Bell className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
    title: "Offline Mode",
    description: "Download your materials for offline studying when you don't have internet access."
  },
  {
    icon: <Zap className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />,
    title: "Quick Review",
    description: "Swipe through flashcards and use voice commands for hands-free studying."
  }
];

const appScreenshots = [
  { 
    id: 1, 
    name: "Dashboard", 
    bg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    content: (
      <div className="w-full space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col items-start">
            <h3 className="text-white text-xl font-bold">Hello, Alex</h3>
            <p className="text-white/70 text-xs">Let's continue learning</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-purple-400 text-white font-bold text-xs flex items-center justify-center">A</div>
          </div>
        </div>
        
        <div className="bg-white/10 p-3 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-white text-sm font-medium">Today's Goal</h4>
            <div className="text-xs text-white/70">75%</div>
          </div>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-green-400 rounded-full" style={{ width: '75%' }}></div>
          </div>
        </div>
        
        <div className="flex flex-col space-y-3">
          <div className="bg-white/10 rounded-xl p-3 flex items-center">
            <div className="w-10 h-10 rounded-lg bg-blue-400/20 mr-3 flex items-center justify-center">
              <div className="text-blue-300">📚</div>
            </div>
            <div className="flex-grow">
              <h4 className="text-white text-sm font-medium">Biology</h4>
              <div className="flex items-center">
                <div className="text-white/70 text-xs mr-2">15 cards due</div>
                <div className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-white">Exam in 3d</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-3 flex items-center">
            <div className="w-10 h-10 rounded-lg bg-purple-400/20 mr-3 flex items-center justify-center">
              <div className="text-purple-300">🧠</div>
            </div>
            <div className="flex-grow">
              <h4 className="text-white text-sm font-medium">Psychology</h4>
              <div className="flex items-center">
                <div className="text-white/70 text-xs mr-2">8 cards due</div>
                <div className="text-xs px-1.5 py-0.5 rounded-full bg-white/10 text-white">Exam in 7d</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  { 
    id: 2, 
    name: "Flashcards", 
    bg: "bg-gradient-to-br from-purple-500 to-pink-600",
    content: (
      <div className="w-full h-full relative">
        {/* Main content */}
        <div className="w-full space-y-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-white text-2xl font-bold">Flashcards</h3>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <div className="w-5 h-5 text-white">⋮</div>
            </div>
          </div>
          
          <div className="w-full h-1 bg-white/20 rounded-full mb-4">
            <div className="h-full w-1/3 bg-white rounded-full"></div>
          </div>
          
          {/* Current card info */}
          <div className="flex justify-between items-center mb-4">
            <div className="text-white/80 text-sm font-medium">Biology: Cell Structure</div>
            <div className="flex space-x-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-white opacity-70"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-white opacity-70"></div>
              <div className="h-1.5 w-1.5 rounded-full bg-white opacity-70"></div>
            </div>
          </div>
          
          {/* Question card */}
          <div className="bg-white/10 rounded-xl p-5 h-32 flex items-center justify-center shadow-xl border border-white/10">
            <h4 className="text-white text-lg font-medium text-center">What is the powerhouse of the cell?</h4>
          </div>
          
          {/* Answer card placeholder */}
          <div className="bg-white/10 rounded-xl p-5 h-32 mt-3 flex items-center justify-center border-2 border-dashed border-white/20">
            <h4 className="text-white/60 text-base font-medium text-center">Tap to reveal answer</h4>
          </div>
          
          {/* Button controls */}
          <div className="flex justify-between mt-6">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <div className="text-white text-2xl rotate-45">↶</div>
            </div>
            <div className="flex space-x-3">
              <div className="w-20 h-11 rounded-lg bg-red-400/30 flex items-center justify-center">
                <div className="text-white text-sm font-medium">Again</div>
              </div>
              <div className="w-20 h-11 rounded-lg bg-green-400/30 flex items-center justify-center">
                <div className="text-white text-sm font-medium">Good</div>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
              <div className="text-white text-2xl rotate-[315deg]">↷</div>
            </div>
          </div>
          
          {/* Bottom page indicator */}
          <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-2.5">
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-white/30"></div>
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
          </div>
        </div>
      </div>
    )
  },
  { 
    id: 3, 
    name: "Study Analytics", 
    bg: "bg-gradient-to-br from-green-500 to-teal-600",
    content: (
      <div className="w-full space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-xl font-bold">Analytics</h3>
          <div className="text-xs px-2 py-1 rounded-full bg-white/10 text-white">This Week</div>
        </div>
        
        <div className="bg-white/10 p-3 rounded-xl">
          <h4 className="text-white text-sm font-medium mb-2">Study Time</h4>
          <div className="flex justify-between h-24">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <div key={i} className="flex flex-col items-center justify-end">
                <div className="w-5 bg-white/20 rounded-t-sm" style={{ 
                  height: `${[30, 45, 60, 40, 80, 50, 20][i]}%`,
                  backgroundColor: i === 4 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.2)'
                }}></div>
                <div className="text-white/70 text-xs mt-1">{day}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white/10 rounded-xl p-3">
          <h4 className="text-white text-sm font-medium mb-2">Retention Rate</h4>
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-full border-4 border-teal-300 flex items-center justify-center mr-3">
              <div className="text-white text-lg font-bold">87%</div>
            </div>
            <div className="flex-grow">
              <div className="text-white text-xs mb-1">Improvement</div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-teal-300 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="text-white/70 text-xs mt-1">+12% from last week</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  { 
    id: 4, 
    name: "Notes", 
    bg: "bg-gradient-to-br from-orange-500 to-amber-600",
    content: (
      <div className="w-full space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-white text-xl font-bold">Notes</h3>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <div className="text-white">+</div>
          </div>
        </div>
        
        <div className="relative">
          <input type="text" placeholder="Search notes..." className="w-full bg-white/10 text-white border-0 rounded-lg pl-9 py-2 text-sm placeholder:text-white/50 focus:ring-2 focus:ring-white/30 focus:outline-none" />
          <div className="absolute left-3 top-2.5 text-white/50">🔍</div>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex justify-between mb-1">
              <h4 className="text-white text-sm font-medium">Neuroscience Lecture</h4>
              <div className="text-white/60 text-xs">2h ago</div>
            </div>
            <p className="text-white/70 text-xs line-clamp-2">The different parts of the brain include the cerebrum, cerebellum, and brainstem. The cerebrum is divided into...</p>
            <div className="flex mt-2">
              <div className="text-xs px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 mr-1">Psychology</div>
              <div className="text-xs px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200">Important</div>
            </div>
          </div>
          
          <div className="bg-white/10 rounded-xl p-3">
            <div className="flex justify-between mb-1">
              <h4 className="text-white text-sm font-medium">Cell Division</h4>
              <div className="text-white/60 text-xs">Yesterday</div>
            </div>
            <p className="text-white/70 text-xs line-clamp-2">Mitosis phases: Prophase, Metaphase, Anaphase, Telophase. During prophase, the nuclear envelope breaks down...</p>
            <div className="flex mt-2">
              <div className="text-xs px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200">Biology</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
];

// Phone 3D model component
const Phone3D = () => {
  const phoneRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [screenIndex, setScreenIndex] = useState(1); // Start with Flashcards screen
  const inView = useInView(phoneRef, { once: true, amount: 0.3 });
  
  // Smooth spring animations for phone rotation
  const springConfig = { mass: 1, stiffness: 60, damping: 30 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);
  
  // Auto-rotate the phone slightly to show it's interactive
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setScreenIndex((prev) => (prev + 1) % appScreenshots.length);
      }, 5000); // Slower rotation to allow for viewing the detailed UI
      return () => clearInterval(interval);
    }
  }, [inView]);
  
  // Handle mouse move for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!phoneRef.current) return;
    
    const rect = phoneRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    // Calculate rotation (limit to smaller angle for subtle effect)
    const rotateYValue = ((mouseX - centerX) / (rect.width / 2)) * 10;
    const rotateXValue = ((centerY - mouseY) / (rect.height / 2)) * 10;
    
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };
  
  // Reset rotation when mouse leaves
  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };
  
  return (
    <div
      ref={phoneRef}
      className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center perspective-1000 transition-all duration-200 cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient lights */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-purple-400/10 rounded-full blur-[80px] z-0"></div>
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-indigo-400/10 rounded-full blur-[80px] z-0"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          rotateX: rotateXSpring,
          rotateY: rotateYSpring,
          transformStyle: "preserve-3d",
          transform: `perspective(1000px) rotateX(${rotateXSpring}deg) rotateY(${rotateYSpring}deg)`,
        }}
        className="relative w-[320px] h-[640px] z-10"
      >
        {/* Main phone body with curved edges and layered design */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-800 to-gray-900 rounded-[42px] shadow-2xl transform-gpu preserve-3d">
          {/* Phone frame with depth effect */}
          <div className="absolute inset-0 rounded-[42px] border-[14px] border-black overflow-hidden shadow-inner">
            {/* Inner bezel with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 via-black to-gray-700/10 rounded-[28px] z-10">
              {/* Screen content area */}
              <div className="absolute inset-0 rounded-[28px] overflow-hidden bg-black">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[140px] h-[38px] bg-black z-30 rounded-b-[18px]">
                  {/* Camera and sensors in notch */}
                  <div className="absolute top-[12px] left-[30px] w-[10px] h-[10px] bg-gray-900 rounded-full">
                    <div className="absolute inset-[2px] bg-gray-800 rounded-full">
                      <div className="absolute inset-[2px] bg-gray-950 rounded-full"></div>
                    </div>
                    <div className="absolute w-full h-full rounded-full bg-transparent border border-gray-800 opacity-30"></div>
                  </div>
                  
                  {/* Speaker */}
                  <div className="absolute top-[14px] left-1/2 transform -translate-x-1/2 w-[40px] h-[6px] bg-gray-800 rounded-full"></div>
                  
                  {/* Front sensors */}
                  <div className="absolute top-[12px] right-[30px] w-[8px] h-[8px] bg-gray-800/80 rounded-full"></div>
                </div>
                
                {/* Status bar */}
                <div className="relative h-12 bg-transparent w-full flex justify-between items-center px-4 z-40">
                  <span className="text-white text-xs font-medium ml-3">9:41</span>
                  <div className="flex items-center space-x-1 mr-3">
                    <div className="w-5 h-2.5">
                      <div className="flex items-end justify-end h-full space-x-[1.5px]">
                        <div className="w-[1.5px] h-[3px] bg-white rounded-t-sm"></div>
                        <div className="w-[1.5px] h-[5px] bg-white rounded-t-sm"></div>
                        <div className="w-[1.5px] h-[7px] bg-white rounded-t-sm"></div>
                        <div className="w-[1.5px] h-[9px] bg-white rounded-t-sm"></div>
                      </div>
                    </div>
                    <div className="text-white text-xs font-medium">100%</div>
                  </div>
                </div>
                
                {/* App content with screen transition */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    {appScreenshots.map((screen, index) => (
                      <motion.div
                        key={screen.id}
                        className={`absolute inset-0 ${screen.bg} flex flex-col items-center justify-start p-6 pt-14`}
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ 
                          opacity: screenIndex === index ? 1 : 0,
                          x: screenIndex === index ? 0 : screenIndex > index ? "-100%" : "100%",
                          zIndex: screenIndex === index ? 1 : 0
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      >
                        {screen.content}
                        
                        {/* App navigation bar */}
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-[120px] h-[5px] bg-white/80 rounded-full"></div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                {/* Screen glass overlay with subtle reflections */}
                <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-white/2 to-white/5 pointer-events-none mix-blend-overlay rounded-[28px]"></div>
                
                {/* Interactive touch reflection */}
                <motion.div 
                  className="absolute inset-0 bg-white pointer-events-none z-30 rounded-[28px]" 
                  initial={{ opacity: 0 }}
                  whileTap={{ opacity: 0.08, transition: { duration: 0.1 } }}
                ></motion.div>
              </div>
            </div>
          </div>
          
          {/* Buttons and hardware features */}
          {/* Power button */}
          <div className="absolute top-[100px] -right-[2px] w-[4px] h-[60px] bg-gray-700 rounded-r-sm transform translate-x-[2px]"></div>
          
          {/* Volume buttons */}
          <div className="absolute top-[120px] -left-[2px] w-[4px] h-[40px] bg-gray-700 rounded-l-sm transform -translate-x-[2px]"></div>
          <div className="absolute top-[180px] -left-[2px] w-[4px] h-[40px] bg-gray-700 rounded-l-sm transform -translate-x-[2px]"></div>
          
          {/* Metal frame highlights */}
          <div className="absolute inset-0 rounded-[42px] bg-gradient-to-t from-transparent via-gray-700/30 to-gray-500/20 mix-blend-overlay pointer-events-none"></div>
        </div>
        
        {/* Phone shadows and reflections */}
        <div className="absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 w-[260px] h-[40px] bg-black/30 dark:bg-black/40 rounded-full blur-xl"></div>
      </motion.div>
    </div>
  );
};

const MobileApp = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, 100]);
  
  return (
    <section id="mobile-app" ref={containerRef} className="py-24 overflow-hidden relative bg-gray-50 dark:bg-gray-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300/20 dark:bg-indigo-900/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 dark:bg-purple-900/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          style={{ opacity, y }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 rounded-full border border-indigo-100 dark:border-indigo-800 mb-4">
            Mobile Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
            Take StudyAI <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Anywhere</span> You Go
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400">
            Our mobile app brings the full power of StudyAI to your pocket. Study on the go, track your progress, and never miss a learning opportunity.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* 3D Phone Display */}
          <div className="order-2 md:order-1">
            <Phone3D />
          </div>
          
          {/* App Features */}
          <div className="order-1 md:order-2">
            <div className="space-y-10">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50">
                  <Smartphone className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Mobile App</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Available for iOS and Android devices. Download now from the App Store or Google Play.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                {phoneFeatures.map((feature, index) => (
                  <motion.div 
                    key={feature.title}
                    className="flex items-start space-x-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-colors bg-transparent dark:bg-transparent"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Apple App Store button with direct image link */}
                <motion.a
                  href="#"
                  className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-black text-white shadow-lg hover:bg-gray-900 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Apple_logo_white.svg/1724px-Apple_logo_white.svg.png" 
                    alt="Apple App Store" 
                    className="w-8 h-8 mr-2 object-contain" 
                  />
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold font-sans -mt-1">App Store</div>
                  </div>
                </motion.a>
                
                {/* Google Play button with direct image link */}
                <motion.a
                  href="#"
                  className="flex items-center justify-center w-full sm:w-auto px-6 py-3 rounded-xl bg-black text-white shadow-lg hover:bg-gray-900 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <img 
                    src="https://brandlogos.net/wp-content/uploads/2022/07/google_play-logo_brandlogos.net_kuk1d.png" 
                    alt="Google Play" 
                    className="w-8 h-8 mr-2 object-contain" 
                  />
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold font-sans -mt-1">Google Play</div>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileApp; 