import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Home, User, Folder, Mail, Linkedin, Github, Twitter, Zap, GraduationCap, Code, Heart, CheckCircle, Calendar, Users, Award, ExternalLink, Code as CodeIcon, Lightbulb, TrendingUp, ArrowRight, ChevronDown } from 'lucide-react'; 

// CRITICAL FIX: Using a guaranteed public URL for background visibility
const HERO_BACKGROUND_URL = "profile3.jpg"; 

// --- Static Data ---
const portfolioData = {
  name: "Sivaji Chinnam", 
  role: "AI Innovator | Full Stack Developer", 
  taglines: ["Building the Future, One Commit at a Time.", "Seamless UX, Powerful Backend.", "Blending AI with Modern Web Development."],
  
  // Technical Proficiency
  technicalProficiency: {
    languages: ["Python", "JavaScript (ES6+)", "HTML5", "CSS3", "PHP", "SQL"],
    frameworks: ["React.js", "Node.js", "Express.js", "Flask", "Django", "Bootstrap", "Vite"],
    databases: ["MongoDB", "MySQL", "PostgreSQL"],
    tools: ["Git & GitHub", "Docker", "AWS", "GCP", "Zscaler", "Google Cloud Console", "VS Code"],
    aiMl: ["OpenAI API", "Cohere API", "Scikit-learn", "spaCy", "NLTK", "Pandas", "NumPy", "Explainable AI"]
  },

  // UPDATED EDUCATION DATA
  education: [
    { title: "B.Tech in Computer Science with Specialization in Data Science", institution: "Chalapathi Institute of Technology", year: "2020 - 2026" },
  ],
  mission: "To leverage cutting-edge AI and Full Stack technologies to build impactful, scalable, and beautifully designed digital solutions that solve real-world problems.",
  strengths: ["Problem-Solving", "Rapid Prototyping", "Team Collaboration", "Continuous Learning"],
  
  // Project List with Demo/Code links
  projects: [
    { 
      title: "Kisan Kart", 
      description: "A full-fledged e-commerce platform for farmers to buy and sell products using React, Node.js, and Bootstrap.", 
      tags: ["React", "Node.js", "e-commerce"], 
      image: "https://placehold.co/400x250/C8F2C7/0E4A1A?text=Kisan+Kart",
      demoLink: "#", 
      codeLink: "#"
    },
    { 
      title: "Suraksha Setu", 
      description: "Disaster management platform for quick SOS reporting and live location tracking using AI and real-time alerts.", 
      tags: ["AI", "Real-time", "Disaster Mgmt"], 
      image: "https://placehold.co/400x250/FFE4B5/8B4513?text=Suraksha+Setu",
      demoLink: "#", 
      codeLink: "#"
    },
    { 
      title: "FRIDAY AI Assistant", 
      description: "An AI-powered personal assistant built with Flask, React, and APIs like OpenAI, Cohere, and OpenWeatherMap.", 
      tags: ["Flask", "React", "OpenAI", "Cohere"], 
      image: "https://placehold.co/400x250/D2E8FF/1034A6?text=FRIDAY+AI",
      demoLink: "#", 
      codeLink: "#"
    },
    { 
      title: "AI Translator", 
      description: "A language translation app using machine learning models and language APIs for seamless multilingual communication.", 
      tags: ["ML", "APIs", "Translation"], 
      image: "https://placehold.co/400x250/F0E68C/6B8E23?text=AI+Translator",
      demoLink: "#", 
      codeLink: "#"
    },
    { 
      title: "PDF to Text Converter", 
      description: "Convert PDF files into readable text using Python, PyPDF2 and frontend UI built in React.", 
      tags: ["Python", "PyPDF2", "React"], 
      image: "https://placehold.co/400x250/E6E6FA/4B0082?text=PDF+Converter",
      demoLink: "#", 
      codeLink: "#"
    },
    { 
      title: "Read Aloud App", 
      description: "Text-to-Speech application that reads aloud documents and webpages using web speech synthesis APIs.", 
      tags: ["Web Speech API", "React"], 
      image: "https://placehold.co/400x250/ADD8E6/00008B?text=Read+Aloud",
      demoLink: "#", 
      codeLink: "#"
    },
  ],
  
  // Certifications (Mapping to portfolioData.achievements)
  achievements: [
    { name: "Artificial Intelligence Fundamentals", org: "IBM", date: "Certification" },
    { name: "Advanced Learning Algorithms", org: "Coursera (DeepLearning.ai)", date: "Certification" },
    { name: "Cloud Computing", org: "NPTEL (IIT-M)", date: "Certification" },
    { name: "Introduction to IoT", org: "NPTEL", date: "Certification" },
    { name: "Data Science Foundations", org: "Infosys Springboard", date: "Certification" },
    { name: "Networking for Cyber Professionals", org: "Zscaler Academy", date: "Certification" },
    { name: "Google Cloud Skills Boost", org: "Gold League Member (25 Badges, 30k+ XP)", date: "Certification" },
    { name: "Micro Certification", org: "ServiceNow", date: "Certification" },
    { name: "Generative AI - Essential Courses", org: "Completed", date: "Certification" },
  ],
  // Events/Activities (Mapping to portfolioData.events)
  events: [
    { name: "Finalist - SAP Hackfest", role: "National Level Competition", date: "Activity", icon: Award },
    { name: "Runner-up in Python AI Workshop", role: "Competition", date: "Activity", icon: Award },
    { name: "Top 5 finalist in IEDC CE Thalassery Hacktly", role: "Competition", date: "Activity", icon: Award },
    { name: "Organized two college tech events", role: "CODE HUNT", date: "Activity", icon: Users },
    { name: "Qualified Coding Round of Adobe India Hackathon 2025", role: "Coding Competition", date: "Activity", icon: Award },
    { name: "Tech Talk: Future of AI in Web", role: "Keynote Speaker", date: "Mar 2024", icon: Calendar },
  ],

  // CreaGen Solutions Data
  creagen: {
    vision: "To transform visionary ideas into functional digital realities. We believe that with the right application of AI and Full Stack expertise, everything is possible.",
    completedProjects: [
      { name: "Custom E-commerce API (Node.js/MongoDB)", targetId: "#projects" },
      { name: "Real-time Data Dashboard (React/D3)", targetId: "#projects" },
    ],
    upcomingProjects: [
      { name: "Generative AI Content Platform" },
      { name: "Blockchain-based Supply Chain Tracker" },
      { name: "Advanced NLP Chatbot Integration" },
    ]
  },

  // UPDATED SOCIALS LIST
  socials: [
    { icon: Linkedin, href: "https://www.linkedin.com/in/chowdary369/", name: "LinkedIn" },
    { icon: Github, href: "https://github.com/Sivaji4829", name: "GitHub" },
  ]
};

// --- Reusable Components ---

// Glassmorphism Card Wrapper (Using Tailwind Classes)
const GlassCard = ({ children, className, ...props }) => (
  <motion.div
    className={`
      bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg rounded-xl
      transition-all duration-300 ${className}
    `}
    {...props}
  >
    {children}
  </motion.div>
);

// Custom Hook for Scroll-based Animation 
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: threshold });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return { ref, controls, variants };
};

// Function to handle smooth scrolling
const scrollToSection = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 1. Navbar Component (Retained design for consistency)
const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); 
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sections = ['home', 'about', 'services', 'projects', 'certifications', 'contact']; 
      
      setIsScrolled(scrollY > 50);

      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
          if (scrollY >= element.offsetTop - 150 && scrollY < element.offsetTop + element.offsetHeight - 150) {
            setActiveSection(id);
          }
        }
      });
    };

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, []);

  const simpleLinks = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'certifications', icon: Award, label: 'Certifications' },
    { id: 'contact', icon: Mail, label: 'Contact' },
  ];
  
  const dropdownItems = [
    { id: 'services', icon: Lightbulb, label: 'Services' },
    { id: 'projects', icon: Folder, label: 'Projects' },
  ];

  const handleLinkClick = (id) => {
    scrollToSection(id);
    setActiveSection(id);
    setIsDropdownOpen(false);
  }

  const isWorkActive = activeSection === 'services' || activeSection === 'projects';

  const NavItem = ({ link, isActive, children, isDropdownTrigger = false }) => (
    <div className={`relative flex items-center ${isDropdownTrigger ? 'flex flex-col items-center' : ''}`} ref={isDropdownTrigger ? dropdownRef : null}>
      <button
        onClick={isDropdownTrigger ? () => setIsDropdownOpen(!isDropdownOpen) : (e) => { e.preventDefault(); handleLinkClick(link.id); }}
        className={`
          flex items-center px-3 py-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap
          ${isActive
            // 3D Pill Style
            ? 'bg-blue-600 text-white shadow-[0_12px_30px_rgba(37,99,235,0.55)]'
            : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
          }
        `}
      >
        <link.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-0 sm:mr-2" />
        <span className="hidden sm:inline">{link.label}</span>
        {isDropdownTrigger && <ChevronDown className={`w-4 h-4 ml-1 hidden sm:inline transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />}
      </button>

      {/* Dropdown Content */}
      {isDropdownTrigger && isDropdownOpen && (
        <GlassCard 
          className="
            absolute top-full mt-2
            w-44
            origin-top py-2
            z-50
            text-left
            rounded-xl
            bg-white/100
            backdrop-blur-2xl
            border border-white/80
            shadow-[0_8px_35px_rgba(0,0,0,0.12)]
          "
          initial={{ opacity: 0, scaleY: 0.9, y: -6 }}
          animate={{ opacity: 1, scaleY: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        >
          {children}
        </GlassCard>
      )}
    </div>
  );

  return (
    <div
      className={`
        fixed inset-x-0 
        z-50 
        flex justify-center 
        pointer-events-none
        ${isScrolled ? "top-3 sm:top-4" : "top-6 sm:top-8"}
      `}
    >
      <GlassCard
        className="
          pointer-events-auto
          rounded-full
          px-3 py-2 sm:px-4 sm:py-3
          max-w-[94%] sm:max-w-3xl
          border border-white/70
          bg-white/80
          backdrop-blur-xl
          shadow-[0_18px_45px_rgba(15,23,42,0.18)]
          transition-all duration-300
          scale-100
        "
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 90, delay: 0.3 }}
      >
        <nav
          className="
            flex items-center justify-between
            gap-1.5 sm:gap-3
          "
        >
          {/* Left: Home, About */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {simpleLinks.slice(0, 2).map((link) => (
              <NavItem
                key={link.id}
                link={link}
                isActive={activeSection === link.id}
              />
            ))}
          </div>

          {/* Center: Work dropdown */}
          <div className="flex items-center">
            <NavItem
              link={{ id: "work", icon: Folder, label: "Work" }}
              isActive={isWorkActive}
              isDropdownTrigger={true}
            >
              {dropdownItems.map((item) => (
                <button
                  key={item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className="
                    flex items-center gap-2
                    w-full px-3 py-2
                    text-sm text-slate-700
                    hover:bg-blue-50 hover:text-blue-600
                    transition-colors
                  "
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              ))}
            </NavItem>
          </div>

          {/* Right: Certifications, Contact */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {simpleLinks.slice(2).map((link) => (
              <NavItem
                key={link.id}
                link={link}
                isActive={activeSection === link.id}
              />
            ))}
          </div>
        </nav>
      </GlassCard>
    </div>
  );
};

// 2. Hero Section Component (Rewritten for guaranteed background image visibility)
const Hero = () => {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 70;
  const deletingSpeed = 40;
  const delay = 1500;

  const currentTagline = portfolioData.taglines[taglineIndex];

  useEffect(() => {
    let timer;

    if (isDeleting) {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(prev => prev.substring(0, prev.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setTaglineIndex(prev => (prev + 1) % portfolioData.taglines.length);
      }
    } else {
      if (displayedText.length < currentTagline.length) {
        timer = setTimeout(() => {
          setDisplayedText(prev => prev + currentTagline[prev.length]);
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, taglineIndex, currentTagline]);

  return (
    <motion.section
      id="home"
      // REMOVED pt-32, using min-h-screen to ensure background covers viewport
      className="relative min-h-screen flex flex-col justify-center items-center text-center p-4 text-white" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background Image Layer (Guaranteed to load) */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
            backgroundImage: `url('${HERO_BACKGROUND_URL}')`,
            // Removed internal padding as it caused layout issues. The fixed navbar spacing handles this.
        }} 
        aria-hidden="true"
      >
        {/* Soft, dark overlay to increase text contrast and enable glassmorphism effect */}
        <div className="absolute inset-0 bg-gray-900/40" aria-hidden="true"></div>
      </div>
      
      {/* Semi-transparent White Overlay (Reduced opacity for better image visibility) */}
      <div className="absolute inset-0 bg-white/40" aria-hidden="true"></div> 
      
      {/* Content Layer */}
      <motion.div
        className="relative z-10 text-gray-900 pt-24" // Added top padding to the content layer to push it down
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 50, delay: 0.5 }}
      >
        <div className="w-32 h-32 mx-auto rounded-full bg-blue-200 border-4 border-white shadow-xl overflow-hidden mb-6">
          <img
            src="profile2.png"
            alt="Sivaji Chinnam Profile"
            className="w-full h-full object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/128x128/D0E7FF/0F4C81?text=SC" }}
          />
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-2">
          {portfolioData.name}
        </h1>

        <motion.p
          className="text-2xl md:text-3xl font-light text-blue-700 mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {portfolioData.role}
        </motion.p>

        <GlassCard className="inline-block p-3 mb-8">
          <p className="text-lg font-mono text-gray-700 h-6 whitespace-nowrap">
            {displayedText}
            <span className="animate-blink inline-block w-0.5 h-6 ml-0.5 bg-gray-700"></span>
          </p>
        </GlassCard>

        <div className="flex justify-center space-x-4">
          <motion.a
            href="#projects"
            className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/50 hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 1.2 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href="#contact"
            className="px-6 py-3 bg-white text-blue-500 font-semibold rounded-full border border-blue-500 hover:bg-blue-50 transition duration-300 transform hover:scale-105"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 1.4 }}
          >
            Get In Touch
          </motion.a>
        </div>
      </motion.div>
    </motion.section>
  );
};

// 3. Project Card Component
const ProjectCard = ({ project }) => {
  return (
    <GlassCard
      className="p-5 flex flex-col cursor-pointer min-h-[450px] transform hover:scale-[1.05] hover:rotate-1 hover:shadow-2xl" 
      whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <div className="h-40 overflow-hidden rounded-lg mb-4">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform hover:scale-110 transition duration-500"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x250/C4D4E7/151C34?text=Placeholder+Image" }}
        />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">{project.title}</h3>
      <p className="text-gray-600 flex-grow mb-4">{project.description}</p>
      
      <div className="flex flex-wrap gap-2 mt-auto pb-4">
        {project.tags.map(tag => (
          <span key={tag} className="text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
            {tag}
          </span>
        ))}
      </div>

      {/* Demo and Code Buttons (Links) */}
      <div className="flex justify-between space-x-3 mt-auto border-t border-white/50 pt-4">
        <a 
            href={project.demoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 text-sm font-semibold rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition duration-300 shadow-md shadow-blue-300/50"
        >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
        </a>
        <a 
            href={project.codeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 text-sm font-semibold rounded-lg bg-white/70 text-gray-700 border border-white/80 hover:bg-white/90 transition duration-300 shadow-md"
        >
            <CodeIcon className="w-4 h-4" />
            <span>Code</span>
        </a>
      </div>
    </GlassCard>
  );
};

// 4. Contact Form Component
const ContactForm = () => {
  const { ref, controls, variants } = useScrollAnimation();

  // New function to handle form submission via mailto link
  const handleMailtoSubmit = (e) => {
    e.preventDefault();
    
    // In a real application, you would collect and validate form data here.
    const form = e.target.closest('form');
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    const recipient = "sivajichinnam2459@gmail.com";
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    const mailtoLink = `mailto:${recipient}?subject=${subject}&body=${body}`;
    
    // Redirects user to their mail client
    window.location.href = mailtoLink;
  };

  return (
    <motion.div
      id="contact"
      className="container mx-auto p-4 md:p-8 pt-20 max-w-7xl min-h-[500px]" // Added min-h
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">Get In Touch</h2>

      <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Contact Form (Redirects to mailto) */}
        <GlassCard className="p-6">
          <form className="space-y-4" onSubmit={handleMailtoSubmit}>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Send a Message</h3>
            <div>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-white/70 border border-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                required
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-white/70 border border-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                required
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                rows="4"
                className="w-full p-3 rounded-lg bg-white/70 border border-white/80 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md shadow-blue-500/50 hover:bg-blue-600 transition duration-300"
            >
              Send Message
            </button>
            <p className="text-sm text-center text-gray-500">
              *Submitting will open your default email client to send the message.
            </p>
          </form>
        </GlassCard>

        {/* Social Icons */}
        <GlassCard className="p-6 flex flex-col justify-center items-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">Connect with Me</h3>
          <div className="flex space-x-6">
            {portfolioData.socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-blue-600 transition duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-8 h-8 md:w-10 md:h-10" />
                <span className="sr-only">{social.name}</span>
              </motion.a>
            ))}
          </div>
        </GlassCard>
      </div>
    </motion.div>
  );
};

// 5. Footer Component
const Footer = () => {
  return (
    <footer className="w-full p-4 mt-12 bg-gray-100/70 backdrop-blur-sm border-t border-white/60 text-center text-gray-600">
      <p>&copy; {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
      <p className="text-xs mt-1">
        Built with React, Tailwind CSS, and Framer Motion for a smooth UX.
      </p>
    </footer>
  );
};


// --- Section Components ---

// Component for displaying categorized skills
const ProficiencyGroup = ({ title, skills }) => (
    <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-2 border-b border-blue-100 pb-1">{title}</h4>
        <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 text-sm font-medium bg-blue-100/80 text-blue-800 rounded-full backdrop-blur-sm shadow-sm transition duration-200 hover:bg-blue-200">
                    {skill}
                </span>
            ))}
        </div>
    </div>
);

const AboutSection = () => {
  const { ref, controls, variants } = useScrollAnimation();

  return (
    <motion.section
      id="about"
      className="container mx-auto p-4 md:p-8 pt-20 max-w-7xl min-h-screen" 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">About Me</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Mission & Strengths */}
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1, delayChildren: 0.1, ease: "easeOut" }} variants={variants}>
            <GlassCard className="p-6 col-span-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">My Mission</h3>
                <p className="text-gray-700 leading-relaxed mb-6">{portfolioData.mission}</p>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Key Strengths</h3>
                <ul className="space-y-2 text-gray-700 list-none p-0">
                  {portfolioData.strengths.map((s, i) => (
                    <motion.li key={i} className="flex items-center space-x-2" variants={variants} transition={{ duration: 0.4 }}>
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{s}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </GlassCard>
        </motion.div>

        {/* Technical Proficiency & Education */}
        <div className="lg:col-span-2 space-y-8">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.05, delayChildren: 0.2, ease: "easeOut" }} variants={variants}>
            <GlassCard className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Technical Proficiency</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
                  <ProficiencyGroup 
                      title="Languages & Markup" 
                      skills={portfolioData.technicalProficiency.languages} 
                  />
                  <ProficiencyGroup 
                      title="Frameworks & Libraries" 
                      skills={portfolioData.technicalProficiency.frameworks} 
                  />
                  <ProficiencyGroup 
                      title="Databases" 
                      skills={portfolioData.technicalProficiency.databases} 
                  />
                  <ProficiencyGroup 
                      title="Tools & Platforms" 
                      skills={portfolioData.technicalProficiency.tools} 
                  />
                  <ProficiencyGroup 
                      title="AI & Machine Learning" 
                      skills={portfolioData.technicalProficiency.aiMl} 
                  />
              </div>
            </GlassCard>
          </motion.div>

          {/* Education */}
          <motion.div initial="hidden" animate="visible" transition={{ delayChildren: 0.4 }} variants={variants}>
            <GlassCard className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Education</h3>
              <ol className="relative border-l border-blue-200 ml-2 list-none p-0">
                {portfolioData.education.map((edu, i) => (
                  <motion.li key={i} className="mb-6 ml-6" variants={variants} transition={{ duration: 0.5 }}>
                    <span className="absolute flex items-center justify-center w-3 h-3 bg-blue-200 rounded-full -left-1.5 ring-4 ring-white/60"></span>
                    <h4 className="flex items-center mb-1 text-lg font-semibold text-gray-800">{edu.title}</h4>
                    <p className="text-sm font-medium text-blue-600">{edu.institution}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </motion.li>
                ))}
              </ol>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

// Services Section
const ServicesSection = () => {
    const { ref, controls, variants } = useScrollAnimation();

    const ServiceProjectItem = ({ project, Icon, color, isCompleted }) => (
        <GlassCard 
            className={`p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 
                        ${isCompleted ? 'hover:shadow-lg hover:shadow-green-100' : 'hover:shadow-lg hover:shadow-orange-100'}`}
            whileHover={{ translateY: isCompleted ? -3 : 0 }}
        >
            <div className="flex items-start space-x-3 mb-3">
                <Icon className={`w-5 h-5 flex-shrink-0 mt-1 ${color}`} />
                <p className="text-lg font-medium text-gray-800 leading-tight">{project.name}</p>
            </div>
            
            {/* Added Link Button for Completed Projects */}
            {isCompleted && project.targetId && (
                <a 
                    href={project.targetId}
                    onClick={(e) => { 
                        e.preventDefault(); 
                        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center justify-center space-x-2 px-3 py-1.5 text-sm font-semibold rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition duration-200 mt-2 self-start"
                >
                    <span>View Details</span>
                    <ArrowRight className="w-4 h-4" />
                </a>
            )}
            
            {!isCompleted && (
                <p className="text-xs text-gray-500 mt-1">In Planning / Development Phase</p>
            )}
        </GlassCard>
    );

    return (
        <motion.section
            id="services"
            className="container mx-auto p-4 md:p-8 pt-20 max-w-7xl min-h-screen" 
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={variants}
        >
            <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">CreaGen Solutions: Freelance Services</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Side: Briefing and Vision */}
                <motion.div variants={variants} transition={{ duration: 0.6, delay: 0.1 }}>
                    <GlassCard className="p-6 lg:col-span-1 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center space-x-3 mb-4">
                                <Lightbulb className="w-8 h-8 text-blue-600" />
                                <h3 className="text-2xl font-semibold text-blue-600">Our Vision</h3>
                            </div>
                            <p className="text-gray-700 leading-relaxed mb-6">{portfolioData.mission}</p>
                            <p className="text-sm text-gray-600 mt-4 border-t pt-3">
                                Providing solutions where innovation meets execution, ensuring robust and scalable results.
                            </p>
                        </div>
                    </GlassCard>
                </motion.div>

                {/* Right Side: Completed and Upcoming Projects */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Completed Projects */}
                    <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1, delayChildren: 0.3 }} variants={variants}>
                        <GlassCard className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                <h3 className="text-2xl font-semibold text-gray-800">Completed Projects</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {portfolioData.creagen.completedProjects.map((project, i) => (
                                    <motion.div key={i} variants={variants} transition={{ duration: 0.4 }}>
                                        <ServiceProjectItem 
                                            project={project}
                                            Icon={CheckCircle}
                                            color="text-green-600"
                                            isCompleted={true}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>

                    {/* Upcoming Projects */}
                    <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1, delayChildren: 0.5 }} variants={variants}>
                        <GlassCard className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <TrendingUp className="w-6 h-6 text-orange-500" />
                                <h3 className="text-2xl font-semibold text-gray-800">Upcoming Projects (Roadmap)</h3>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {portfolioData.creagen.upcomingProjects.map((project, i) => (
                                    <motion.div key={i} variants={variants} transition={{ duration: 0.4 }}>
                                        <ServiceProjectItem 
                                            project={project}
                                            Icon={TrendingUp}
                                            color="text-orange-500"
                                            isCompleted={false}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </GlassCard>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}

const ProjectsSection = () => {
  const { ref, controls, variants } = useScrollAnimation(0.2);

  return (
    <motion.section
      id="projects"
      className="container mx-auto p-4 md:p-8 pt-20 max-w-7xl min-h-[100vh]" // Aggressively setting min-height
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">Featured Projects</h2>
      {/* Content rendering check: If portfolioData.projects is empty, display a placeholder */}
      {portfolioData.projects && portfolioData.projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project, i) => (
              <motion.div 
                key={i} 
                className="w-full"
                initial="hidden"
                animate={controls}
                variants={{
                    hidden: { opacity: 0, y: 50 },
                    visible: {
                        opacity: 1,
                        y: 0,
                        transition: { 
                            delay: i * 0.1 + 0.3, 
                            duration: 0.6, 
                            ease: "easeOut" 
                        }
                    }
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
      ) : (
          <GlassCard className="p-8 text-center text-gray-600">
              <Folder className="w-12 h-12 mx-auto mb-4 text-blue-500" />
              <p className="text-xl font-semibold">No featured projects available right now.</p>
              <p className="text-sm">Please check back soon for updates!</p>
          </GlassCard>
      )}
    </motion.section>
  );
};

const AchievementsSection = () => {
  const { ref, controls, variants } = useScrollAnimation(0.1);

  const AchievementItem = ({ item, Icon }) => (
    <GlassCard 
      className="p-4 flex items-start space-x-4 h-full min-h-[120px] transition-all duration-300" // Added transition-all
      whileHover={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)", translateY: -2 }}
    >
      <Icon className={`w-6 h-6 flex-shrink-0 mt-1 ${Icon === CheckCircle ? 'text-green-500' : 'text-blue-500'}`} />
      <div>
        <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
        {item.role && <p className="text-gray-600 font-medium">{item.role}</p>}
        <p className="text-sm text-gray-500">{item.org || item.date}</p>
      </div>
    </GlassCard>
  );

  return (
    <motion.section
      id="certifications" // Renamed anchor to align with Navbar
      className="container mx-auto p-4 md:p-8 pt-20 max-w-7xl min-h-screen" 
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
    >
      <h2 className="text-4xl font-bold text-gray-900 text-center mb-10">Certifications & Activities</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Certifications (Mapping to portfolioData.achievements) */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-blue-600 border-b pb-2 mb-4">Certifications</h3>
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1, delayChildren: 0.1 }} variants={variants}>
            {portfolioData.achievements.map((item, i) => (
              <motion.div key={i} className="w-full mb-4" variants={variants} transition={{ duration: 0.5 }}>
                <AchievementItem item={item} Icon={CheckCircle} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Events & Activities (Mapping to portfolioData.events) */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-blue-600 border-b pb-2 mb-4">Achievements & Activities</h3>
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1, delayChildren: 0.3 }} variants={variants}>
            {portfolioData.events.map((item, i) => (
              <motion.div key={i} className="w-full mb-4" variants={variants} transition={{ duration: 0.5 }}>
                <AchievementItem item={item} Icon={item.icon} /> 
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};


// --- Main Application Component ---
const App = () => {
  return (
    <div className="min-h-screen font-sans">
      
      <Navbar />
      <main className=""> {/* REMOVED pt-24 */}
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
};

export default App;