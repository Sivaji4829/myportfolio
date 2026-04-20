import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { 
  Home, User, Folder, Mail, Linkedin, Github, 
  CheckCircle, Calendar, Users, Award, 
  ExternalLink, Lightbulb, TrendingUp, 
  ArrowRight, ChevronDown, Rocket, Sparkles, Globe,
  Zap, Database, Cpu, ShieldCheck, Activity
} from 'lucide-react'; 

// Publicly accessible background for the Hero section
const HERO_BACKGROUND_URL = "/profile3.jpg"; 

const portfolioData = {
  name: "Sivaji Chinnam", 
  role: "AI Innovator | Full Stack Developer", 
  taglines: ["Building the Future, One Commit at a Time.", "Seamless UX, Powerful Backend.", "Blending AI with Modern Web Development."],
  technicalProficiency: {
    languages: ["Python", "JavaScript", "HTML5", "CSS3", "SQL"],
    frameworks: ["React.js", "Node.js", "Express", "Flask", "Django", "Vite"],
    databases: ["MongoDB", "MySQL", "PostgreSQL"],
    tools: ["Git & GitHub", "Docker", "AWS", "GCP", "VS Code"],
    aiMl: ["OpenAI API", "Cohere", "Scikit-learn", "NLP", "Pandas", "NumPy"]
  },
  education: [
    { title: "B.Tech in Computer Science (Data Science)", institution: "Chalapathi Institute of Technology", year: "2020 - 2026" },
  ],
  mission: "To leverage cutting-edge AI and Full Stack technologies to build impactful, scalable, and beautifully designed digital solutions that solve real-world problems.",
  strengths: ["Problem-Solving", "Rapid Prototyping", "Team Collaboration", "Continuous Learning"],
  projectNames: ["Sanchari", "Suraksha Setu", "Nyaya Vadh AI", "KisanKart", "Vaidhya AI", "Bujji HealthCare AI", "PinakaPani", "ResumeKaro"],
  achievements: [
    { name: "Artificial Intelligence Fundamentals", org: "IBM" },
    { name: "Advanced Learning Algorithms", org: "Coursera (DeepLearning.ai)" },
    { name: "Cloud Computing", org: "NPTEL (IIT-M)" },
    { name: "Google Cloud Skills Boost", org: "Gold League Member" },
  ],
  events: [
    { name: "Finalist - SAP Hackfest", role: "National Level", icon: Award },
    { name: "Runner-up in Python AI Workshop", role: "Workshop", icon: Award },
    { name: "Top 5 finalist in Hacktly", role: "IEDC CE Thalassery", icon: Award },
    { name: "Organized CODE HUNT", role: "Event Lead", icon: Users },
  ],
  creagen: {
    vision: "To transform visionary ideas into functional digital realities.",
    completedProjects: [
      { name: "Custom E-commerce API", desc: "Highly scalable RESTful architecture." },
      { name: "Real-time Data Dashboard", desc: "Live visualization for sensor metrics." },
    ],
    upcomingProjects: [
      { 
        name: "Generative AI Platform", 
        desc: "Advanced LLM orchestration for automated enterprise workflows.",
        icon: Cpu
      },
      { 
        name: "Blockchain Tracker", 
        desc: "Real-time distributed ledger analytics and security auditing.",
        icon: ShieldCheck
      },
    ]
  },
  socials: [
    { icon: Linkedin, href: "https://www.linkedin.com/in/sivajich/", name: "LinkedIn" },
    { icon: Github, href: "https://github.com/Sivaji4829", name: "GitHub" },
  ]
};

// --- Global CSS Styles ---
const GlobalStyles = () => (
  <style dangerouslySetInnerHTML={{ __html: `
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    .animate-blink {
      animation: blink 1s step-end infinite;
    }
    
    html {
      scroll-behavior: smooth;
    }

    body {
      overflow-x: hidden;
      width: 100%;
      background-color: #f8fafc;
    }

    ::-webkit-scrollbar {
      width: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: #3b82f6;
      border-radius: 10px;
    }

    .energy-ring {
      position: fixed;
      pointer-events: none;
      border: 8px solid #3b82f6;
      border-radius: 50%;
      z-index: 9999;
      transform: translate(-50%, -50%);
    }

    @keyframes pulse-slow {
      0%, 100% { opacity: 0.1; transform: scale(1); }
      50% { opacity: 0.3; transform: scale(1.05); }
    }
    .animate-pulse-slow {
      animation: pulse-slow 4s ease-in-out infinite;
    }
  `}} />
);

// --- Reusable UI Elements ---

const GlassCard = ({ children, className = "", ...props }) => (
  <motion.div
    className={`bg-white/70 backdrop-blur-md border border-white/80 shadow-sm rounded-2xl ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-12 px-4 relative z-10">
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-500 max-w-xl mx-auto text-sm md:text-base font-medium"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const BackgroundPulse = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-100/30 rounded-full blur-[120px] animate-pulse-slow" />
    <svg className="absolute inset-0 w-full h-full opacity-[0.05]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3b82f6" strokeWidth="1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  </div>
);

// --- Modern Energy Loader Component ---
const Loader = () => (
  <motion.div 
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
    exit={{ opacity: 0, scale: 1.1 }}
    transition={{ duration: 0.8, ease: "circOut" }}
  >
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Dynamic Arcs */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-t-2 border-r-2 border-blue-500 rounded-full opacity-60"
      />
      <motion.div 
        animate={{ rotate: -360 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-4 border-b-2 border-l-2 border-blue-300 rounded-full opacity-40"
      />
      {/* Central Geometry */}
      <motion.div 
        animate={{ 
          scale: [1, 1.3, 1],
          rotate: [45, 135, 225, 315, 405]
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-10 h-10 bg-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.8)] flex items-center justify-center rotate-45"
      >
        <Zap className="text-white w-5 h-5 -rotate-45" />
      </motion.div>
    </div>
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-12 flex flex-col items-center"
    >
      <span className="text-blue-500 font-black text-[10px] tracking-[0.6em] uppercase mb-2">
        Portfolio Loading..Just a moment..
      </span>
      <div className="w-40 h-1 bg-slate-900 rounded-full overflow-hidden">
        <motion.div 
          animate={{ x: [-160, 160] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-1/2 h-full bg-blue-500 shadow-[0_0_10px_#3b82f6]"
        />
      </div>
    </motion.div>
  </motion.div>
);

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'services', 'projects', 'certifications', 'contact']; 
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 200 && window.scrollY < el.offsetTop + el.offsetHeight - 200) {
          setActiveSection(id);
        }
      });
    };
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsDropdownOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const navLinks = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'certifications', icon: Award, label: 'Awards' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];

  const handleNav = (id) => {
    const target = document.getElementById(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 100,
        behavior: 'smooth'
      });
    }
    setIsDropdownOpen(false);
  };

  return (
    <div className={`fixed inset-x-0 z-[60] flex justify-center pointer-events-none transition-all duration-500 ${isScrolled ? "top-4 sm:top-6" : "top-8 sm:top-10"}`}>
      <GlassCard className="pointer-events-auto rounded-full px-1.5 py-1.5 flex items-center gap-0.5 sm:gap-1 border-white/40 shadow-2xl backdrop-blur-2xl bg-white/40">
        {navLinks.slice(0, 2).map((link) => (
          <button 
            key={link.id}
            onClick={() => handleNav(link.id)}
            className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${activeSection === link.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-white/50'}`}
          >
            <link.icon className="w-4 h-4" />
            <span className="hidden sm:inline uppercase tracking-widest">{link.label}</span>
          </button>
        ))}

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${['services', 'projects'].includes(activeSection) ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-white/50'}`}
          >
            <Folder className="w-4 h-4" />
            <span className="hidden sm:inline uppercase tracking-widest">Work</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <GlassCard className="absolute top-full mt-4 w-40 left-1/2 -translate-x-1/2 py-2 overflow-hidden border-white shadow-2xl origin-top rounded-2xl bg-white/95" initial={{ opacity: 0, scale: 0.95, y: -10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -10 }}>
                <button onClick={() => handleNav('services')} className="flex items-center gap-3 w-full px-4 py-3.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left uppercase tracking-widest">
                  <Lightbulb className="w-3.5 h-3.5" /> Services
                </button>
                <button onClick={() => handleNav('projects')} className="flex items-center gap-3 w-full px-4 py-3.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left uppercase tracking-widest">
                  <Globe className="w-3.5 h-3.5" /> Projects
                </button>
              </GlassCard>
            )}
          </AnimatePresence>
        </div>

        {navLinks.slice(2).map((link) => (
          <button 
            key={link.id}
            onClick={() => handleNav(link.id)}
            className={`flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-full text-[10px] sm:text-xs font-bold transition-all duration-300 ${activeSection === link.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-white/50'}`}
          >
            <link.icon className="w-4 h-4" />
            <span className="hidden sm:inline uppercase tracking-widest">{link.label}</span>
          </button>
        ))}
      </GlassCard>
    </div>
  );
};

const Hero = () => {
  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTag = portfolioData.taglines[index];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentTag.substring(0, text.length + 1));
        if (text === currentTag) setTimeout(() => setIsDeleting(true), 2000);
      } else {
        setText(currentTag.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setIndex((index + 1) % portfolioData.taglines.length);
        }
      }
    }, isDeleting ? 30 : 60);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, index]);

  return (
    <section id="home" className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO_BACKGROUND_URL}')` }}>
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-slate-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6 flex flex-col items-center w-full"
      >
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-2xl overflow-hidden mb-6 sm:mb-8 group transition-transform duration-500 hover:scale-110">
          <img src="profile2.png" alt={portfolioData.name} className="w-full h-full object-cover" onError={(e) => e.target.src="https://placehold.co/120x120/D0E7FF/0F4C81?text=SC"} />
        </div>
        
        <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tight mb-4 text-center leading-tight">
          {portfolioData.name.split(' ')[0]} <span className="text-blue-600">{portfolioData.name.split(' ')[1]}</span>
        </h1>
        
        <p className="text-base md:text-xl font-medium text-slate-600 mb-8 max-w-lg mx-auto text-center leading-relaxed">
          {portfolioData.role}
        </p>
        
        <div className="bg-white/40 border border-white/60 px-6 py-2.5 rounded-full mb-10 sm:mb-12 shadow-sm min-h-[40px] flex items-center justify-center backdrop-blur-md">
          <span className="font-mono text-blue-700 text-xs sm:text-sm font-bold text-center">
            {text}<span className="animate-blink">|</span>
          </span>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full sm:w-auto px-10 sm:px-0">
          <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="px-10 py-4 bg-blue-600 text-white rounded-full font-bold text-sm shadow-xl hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center gap-2 active:scale-95">
            View Projects <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="px-10 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95">
            Contact Me
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const ProjectsSection = ({ onTriggerBurst }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [isHovered, setIsHovered] = useState(false);

  const handleHubClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    onTriggerBurst(x, y);
    
    setTimeout(() => {
      window.open("https://my-project-portfolio-omega.vercel.app/", "_blank", "noopener,noreferrer");
    }, 500);
  };

  return (
    <section id="projects" className="py-24 px-4 bg-white relative overflow-hidden" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Featured Work" subtitle="A collection of specialized tools and AI-driven platforms. Visit the workspace to explore them all." />
        
        <div className="relative h-[300px] md:h-[450px] flex items-center justify-center mt-10">
          {/* Subtle Background Rings */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="w-[200px] h-[200px] md:w-[320px] md:h-[320px] border-2 border-dashed border-blue-600 rounded-full" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute w-[300px] h-[300px] md:w-[480px] md:h-[480px] border border-blue-400 rounded-full" />
          </div>

          {/* Floating Labels */}
          {portfolioData.projectNames.map((name, i) => {
            const angle = (i / portfolioData.projectNames.length) * Math.PI * 2;
            const radius = 210; 
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={isInView ? { opacity: 1, x, y } : {}}
                transition={{ delay: i * 0.1, duration: 1 }}
                className="absolute hidden md:block"
              >
                <div className="px-5 py-2.5 bg-slate-50 border border-slate-200 shadow-sm rounded-full text-slate-600 font-bold text-[10px] uppercase tracking-widest whitespace-nowrap hover:bg-blue-600 hover:text-white transition-colors cursor-default">
                  {name}
                </div>
              </motion.div>
            );
          })}

          <div className="md:hidden flex flex-wrap justify-center gap-2 absolute -top-8 w-full px-4">
            {portfolioData.projectNames.map((name, i) => (
              <motion.span key={i} initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: i * 0.05 }} className="px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-bold text-slate-400 uppercase">{name}</motion.span>
            ))}
          </div>

          {/* Enhanced Workspace Button */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }} 
            animate={isInView ? { scale: 1, opacity: 1 } : {}} 
            transition={{ delay: 0.6 }} 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Dynamic Energy Rings - Explicitly visible on hover */}
            <AnimatePresence>
              {isHovered && [1, 1.25, 1.5].map((s, i) => (
                <motion.div 
                  key={i}
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: s + 0.3, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.3 }}
                  className="absolute inset-0 rounded-full border-2 border-blue-500 pointer-events-none"
                />
              ))}
            </AnimatePresence>
            
            <button 
              onClick={handleHubClick}
              className="relative flex flex-col items-center justify-center w-48 h-48 sm:w-60 sm:h-60 bg-white border border-blue-100 rounded-full shadow-[0_20px_60px_-15px_rgba(59,130,246,0.3)] hover:shadow-blue-300 transition-all duration-700 hover:scale-105 active:scale-90 z-10 overflow-hidden"
            >
              <motion.div 
                animate={isHovered ? { y: -10, scale: 1.2 } : { y: 0, scale: 1 }}
                className="flex flex-col items-center"
              >
                <Rocket className="text-blue-600 w-10 h-10 mb-5 transition-transform duration-500 ease-out" />
                <span className="text-xs sm:text-base font-black text-slate-800 tracking-tight uppercase mb-1">Open Workspace</span>
                <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">Portfolio Hub <ExternalLink className="w-3 h-3" /></span>
              </motion.div>
              
              <div className="absolute inset-2 border border-blue-50 rounded-full opacity-50 group-hover:scale-110 transition-transform duration-700" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="py-24 px-4 bg-slate-50 relative overflow-hidden">
    <div className="max-w-5xl mx-auto relative z-10">
      <SectionHeader title="Technical Identity" />
      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard className="p-8 sm:p-10">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-blue-600"><Sparkles className="w-5 h-5" /> Mission</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-8 font-medium">{portfolioData.mission}</p>
          <div className="space-y-4">
            {portfolioData.strengths.map((s, i) => (
              <div key={i} className="flex items-center gap-3 text-sm font-bold text-slate-700">
                <div className="bg-green-100 p-1 rounded-full"><CheckCircle className="text-green-600 w-3.5 h-3.5" /></div> {s}
              </div>
            ))}
          </div>
        </GlassCard>
        <div className="space-y-6">
          <GlassCard className="p-8">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6">Expertise Stack</h3>
             <div className="flex flex-wrap gap-2">
               {Object.values(portfolioData.technicalProficiency).flat().map((skill, i) => (
                 <span key={i} className="px-4 py-2 bg-white/50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-blue-600 hover:text-white transition-all cursor-default">{skill}</span>
               ))}
             </div>
          </GlassCard>
          <GlassCard className="p-8">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-4">Academic Background</h3>
             {portfolioData.education.map((edu, i) => (
               <div key={i}>
                 <p className="text-sm font-black text-slate-800">{edu.title}</p>
                 <p className="text-xs text-slate-400 font-bold mt-1">{edu.institution} | {edu.year}</p>
               </div>
             ))}
          </GlassCard>
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="py-24 px-4 bg-white relative">
    <div className="max-w-6xl mx-auto">
      <SectionHeader title="CreaGen Solutions" subtitle="High-impact consultancy turning visionary concepts into functional digital realities with precision and power." />
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Current Focus Section - High Contrast White Background */}
        <div className="p-8 md:p-10 border-2 border-slate-900 rounded-3xl bg-white shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-8">
              <div className="bg-slate-900 p-4 rounded-2xl">
                <TrendingUp className="w-8 h-8 text-blue-500" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Current Focus</h3>
                <p className="text-blue-600 text-[10px] font-black tracking-widest uppercase mt-1">Operational Excellence</p>
              </div>
            </div>
            
            <div className="grid gap-6">
              {portfolioData.creagen.completedProjects.map((p, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:border-blue-600 transition-all group/item">
                  <Activity className="w-6 h-6 text-blue-600 shrink-0" />
                  <div>
                    <h4 className="font-black text-base text-slate-900">{p.name}</h4>
                    <p className="text-xs text-slate-700 font-bold mt-1 leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Innovation Pipeline Section - High Contrast Blue/Black Theme */}
        <div className="p-8 md:p-10 border-2 border-blue-600 rounded-3xl bg-slate-50 shadow-xl relative overflow-hidden group">
          <div className="relative z-10">
            <div className="flex items-center gap-5 mb-8">
              <div className="bg-blue-600 p-4 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Pipeline</h3>
                <p className="text-blue-600 text-[10px] font-black tracking-widest uppercase mt-1">Future Architectures</p>
              </div>
            </div>

            <p className="text-slate-950 text-sm italic font-black leading-relaxed mb-8 border-l-4 border-blue-600 pl-4 py-1">
              "{portfolioData.creagen.vision}"
            </p>

            <div className="grid gap-6">
              {portfolioData.creagen.upcomingProjects.map((p, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl border-2 border-slate-900 bg-white hover:bg-slate-900 hover:text-white transition-all group/item">
                  <p.icon className="w-6 h-6 text-blue-600 shrink-0 group-hover/item:text-blue-400 transition-transform" />
                  <div>
                    <h4 className="font-black text-base uppercase tracking-tight">{p.name}</h4>
                    <p className="text-xs font-bold mt-1 leading-relaxed opacity-80">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const AchievementsSection = () => (
  <section id="certifications" className="py-24 px-4 bg-slate-50 relative overflow-hidden">
    <BackgroundPulse />
    <div className="max-w-5xl mx-auto relative z-10">
      <SectionHeader title="Global Recognition" />
      <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
        <div className="space-y-5">
          {portfolioData.achievements.map((item, i) => (
            <GlassCard key={i} className="p-5 flex items-center gap-5 hover:translate-x-2 transition-transform bg-white/40">
              <div className="bg-green-100 p-2 rounded-xl shrink-0"><CheckCircle className="text-green-600 w-5 h-5" /></div>
              <span className="text-sm font-black text-slate-800">{item.name}</span>
            </GlassCard>
          ))}
        </div>
        <div className="space-y-5">
          {portfolioData.events.map((item, i) => (
            <GlassCard key={i} className="p-5 flex items-center gap-5 hover:translate-x-2 transition-transform bg-white/40">
              <div className="bg-blue-100 p-2 rounded-xl shrink-0"><item.icon className="text-blue-600 w-5 h-5" /></div>
              <div>
                <p className="text-sm font-black text-slate-800">{item.name}</p>
                <p className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em] mt-1">{item.role}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  const handleMailto = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const body = `Name: ${fd.get('name')}\nEmail: ${fd.get('email')}\nMessage: ${fd.get('message')}`;
    window.location.href = `mailto:sivajichinnam2459@gmail.com?subject=Portfolio Message&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-24 px-4 bg-white relative overflow-hidden">
      <BackgroundPulse />
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionHeader title="Collaborate" subtitle="Let's build something significant together. Reach out for innovative solutions." />
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <GlassCard className="p-8 sm:p-10 shadow-2xl bg-white/80">
            <form className="space-y-5" onSubmit={handleMailto}>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Identify Yourself</label>
                <input name="name" type="text" placeholder="Your Name" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 focus:bg-white text-sm font-bold transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">How to Reply?</label>
                <input name="email" type="email" placeholder="Your Email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 focus:bg-white text-sm font-bold transition-all" required />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">The Mission</label>
                <textarea name="message" placeholder="Briefly describe your interest..." rows="4" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 focus:bg-white text-sm font-bold transition-all resize-none" required></textarea>
              </div>
              <button type="submit" className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-blue-600 transition-all active:scale-95 text-[10px] uppercase tracking-[0.3em] shadow-xl">Send Initiative</button>
            </form>
          </GlassCard>
          
          <div className="space-y-10 py-4 flex flex-col items-center md:items-start">
            <div className="flex gap-5">
              {portfolioData.socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="p-5 bg-white border border-slate-100 rounded-[2rem] shadow-lg hover:shadow-blue-100 hover:scale-110 transition-all text-blue-600 group">
                  <s.icon className="w-7 h-7 group-hover:rotate-12 transition-transform" />
                </a>
              ))}
            </div>
            <div className="space-y-4">
              <div className="text-slate-400 font-black text-[10px] uppercase tracking-widest border-l-4 border-blue-600 pl-6 py-2">
                Location: Andhra Pradesh, India
              </div>
              <div className="text-slate-400 font-black text-[10px] uppercase tracking-widest border-l-4 border-blue-200 pl-6 py-2">
                Status: Available for Collaboration
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);
  const [bursts, setBursts] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const triggerBurst = (x, y) => {
    const id = Date.now();
    setBursts(prev => [...prev, { id, x, y }]);
    setTimeout(() => {
      setBursts(prev => prev.filter(b => b.id !== id));
    }, 1500);
  };

  return (
    <div className="relative w-full overflow-x-hidden min-h-screen font-sans bg-slate-50 selection:bg-blue-600 selection:text-white">
      <GlobalStyles />
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {/* Full Page Energy Release */}
      {bursts.map(burst => (
        <motion.div
          key={burst.id}
          initial={{ width: 0, height: 0, opacity: 1, borderWidth: 20 }}
          animate={{ 
            width: '400vmax', 
            height: '400vmax', 
            opacity: 0,
            borderWidth: 0
          }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="energy-ring"
          style={{ left: burst.x, top: burst.y, borderColor: '#3b82f6' }}
        />
      ))}

      <Navbar />
      <main className="w-full">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection onTriggerBurst={triggerBurst} />
        <AchievementsSection />
        <ContactSection />
      </main>

      <footer className="py-16 bg-white text-center border-t border-slate-100 relative z-10">
        <p className="text-slate-300 font-black text-[10px] uppercase tracking-[0.4em]">
          &copy; {new Date().getFullYear()} {portfolioData.name} • Designed for impact
        </p>
      </footer>
    </div>
  );
};

export default App;