import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView, AnimatePresence } from 'framer-motion';
import { 
  Home, User, Folder, Mail, Linkedin, Github, 
  CheckCircle, Calendar, Users, Award, 
  ExternalLink, Lightbulb, TrendingUp, 
  ArrowRight, ChevronDown, Rocket, Sparkles, Globe
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
      { name: "Custom E-commerce API" },
      { name: "Real-time Data Dashboard" },
    ],
    upcomingProjects: [
      { name: "Generative AI Platform" },
      { name: "Blockchain Tracker" },
    ]
  },
  socials: [
    { icon: Linkedin, href: "https://www.linkedin.com/in/sivajich/", name: "LinkedIn" },
    { icon: Github, href: "https://github.com/Sivaji4829", name: "GitHub" },
  ]
};

// --- Reusable UI Elements ---

const GlassCard = ({ children, className = "", ...props }) => (
  <motion.div
    className={`bg-white/60 backdrop-blur-md border border-white/80 shadow-sm rounded-2xl ${className}`}
    {...props}
  >
    {children}
  </motion.div>
);

const SectionHeader = ({ title, subtitle }) => (
  <div className="text-center mb-12 px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-4xl font-bold text-slate-900 mb-3 tracking-tight"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-slate-500 max-w-xl mx-auto text-base"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// --- Components ---

const Loader = () => (
  <motion.div 
    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white"
    exit={{ opacity: 0, scale: 1.1 }}
    transition={{ duration: 0.6, ease: "easeInOut" }}
  >
    <motion.div 
      animate={{ rotate: 360 }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
      className="w-12 h-12 border-2 border-slate-100 border-t-blue-600 rounded-full mb-4"
    />
    <motion.span 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-slate-400 font-medium text-xs tracking-widest uppercase"
    >
      Ready in a moment
    </motion.span>
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsDropdownOpen(false);
  };

  return (
    <div className={`fixed inset-x-0 z-50 flex justify-center pointer-events-none transition-all duration-500 ${isScrolled ? "top-4" : "top-8"}`}>
      <GlassCard className="pointer-events-auto rounded-full px-2 py-1.5 flex items-center gap-1 border-white/40 shadow-xl backdrop-blur-xl">
        {navLinks.slice(0, 2).map((link) => (
          <button 
            key={link.id}
            onClick={() => handleNav(link.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeSection === link.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <link.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{link.label}</span>
          </button>
        ))}

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeSection === 'services' || activeSection === 'projects' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <Folder className="w-4 h-4" />
            <span className="hidden sm:inline">Work</span>
            <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <GlassCard className="absolute top-full mt-4 w-40 left-1/2 -translate-x-1/2 py-2 overflow-hidden border-white shadow-2xl origin-top rounded-2xl" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <button onClick={() => handleNav('services')} className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left">
                  <Lightbulb className="w-3.5 h-3.5" /> Services
                </button>
                <button onClick={() => handleNav('projects')} className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors text-left">
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
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${activeSection === link.id ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            <link.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{link.label}</span>
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
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${HERO_BACKGROUND_URL}')` }}>
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-slate-50" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 px-6 flex flex-col items-center"
      >
        <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden mb-8 group transition-transform duration-500 hover:scale-105">
          <img src="profile2.png" alt={portfolioData.name} className="w-full h-full object-cover" onError={(e) => e.target.src="https://placehold.co/120x120/D0E7FF/0F4C81?text=SC"} />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-4 text-center leading-tight">
          {portfolioData.name.split(' ')[0]} <span className="text-blue-600">{portfolioData.name.split(' ')[1]}</span>
        </h1>
        
        <p className="text-lg md:text-xl font-medium text-slate-600 mb-8 max-w-lg mx-auto text-center leading-relaxed">
          {portfolioData.role}
        </p>
        
        <div className="bg-white/40 border border-white/60 px-6 py-2 rounded-full mb-12 shadow-sm">
          <span className="font-mono text-blue-700 text-sm font-bold">
            {text}<span className="animate-blink">|</span>
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-blue-600 text-white rounded-full font-bold text-sm shadow-lg hover:bg-blue-700 transition-all flex items-center gap-2">
            View Projects <ArrowRight className="w-4 h-4" />
          </button>
          <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-sm shadow-sm hover:shadow-md transition-all">
            Contact Me
          </button>
        </div>
      </motion.div>
    </section>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section id="projects" className="py-24 px-4 bg-white relative" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Featured Work" subtitle="A collection of specialized tools and AI-driven platforms. Visit the workspace to explore them all." />
        
        <div className="relative h-[400px] flex items-center justify-center mt-10">
          {/* Subtle Background Rings */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.05]">
             <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="w-[280px] h-[280px] border border-blue-600 rounded-full" />
             <motion.div animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="absolute w-[400px] h-[400px] border border-blue-400 rounded-full" />
          </div>

          {/* Floating Project Labels */}
          {portfolioData.projectNames.map((name, i) => {
            const angle = (i / portfolioData.projectNames.length) * Math.PI * 2;
            const radius = 180; 
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            return (
              <motion.div
                key={name}
                initial={{ opacity: 0, x: 0, y: 0 }}
                animate={isInView ? { opacity: 1, x, y } : {}}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="absolute hidden md:block"
              >
                <div className="px-4 py-2 bg-slate-50 border border-slate-100 shadow-sm rounded-full text-slate-600 font-bold text-[10px] uppercase tracking-wide whitespace-nowrap">
                  {name}
                </div>
              </motion.div>
            );
          })}

          <div className="md:hidden flex flex-wrap justify-center gap-2 absolute top-0 w-full">
            {portfolioData.projectNames.map((name, i) => (
              <span key={i} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-bold text-slate-400 uppercase">{name}</span>
            ))}
          </div>

          {/* Main Redirect Button */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="z-10"
          >
            <a 
              href="https://my-project-portfolio-omega.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center w-52 h-52 bg-white border border-blue-50 rounded-full shadow-2xl hover:shadow-blue-100 transition-all duration-500 hover:scale-105 active:scale-95"
            >
              <Rocket className="text-blue-600 w-8 h-8 mb-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-black text-slate-800 tracking-tighter uppercase mb-1">Open Workspace</span>
              <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">Portfolio Hub <ExternalLink className="w-3 h-3" /></span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => (
  <section id="about" className="py-24 px-4 bg-slate-50">
    <div className="max-w-5xl mx-auto">
      <SectionHeader title="Technical Identity" />
      <div className="grid md:grid-cols-2 gap-8">
        <GlassCard className="p-8">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-600"><Sparkles className="w-5 h-5" /> Mission</h3>
          <p className="text-slate-600 text-sm leading-relaxed mb-6">{portfolioData.mission}</p>
          <div className="space-y-3">
            {portfolioData.strengths.map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <CheckCircle className="text-green-500 w-4 h-4" /> {s}
              </div>
            ))}
          </div>
        </GlassCard>
        <div className="space-y-6">
          <GlassCard className="p-6">
             <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">Tech Stack</h3>
             <div className="flex flex-wrap gap-2">
               {Object.values(portfolioData.technicalProficiency).flat().map((skill, i) => (
                 <span key={i} className="px-3 py-1 bg-white border border-slate-100 rounded-lg text-xs font-bold text-slate-500">{skill}</span>
               ))}
             </div>
          </GlassCard>
          <GlassCard className="p-6">
             <h3 className="text-sm font-bold uppercase tracking-widest text-blue-600 mb-4">Education</h3>
             {portfolioData.education.map((edu, i) => (
               <div key={i}>
                 <p className="text-sm font-bold text-slate-800">{edu.title}</p>
                 <p className="text-xs text-slate-400">{edu.institution} | {edu.year}</p>
               </div>
             ))}
          </GlassCard>
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="py-24 px-4 bg-white">
    <div className="max-w-5xl mx-auto">
      <SectionHeader title="CreaGen Solutions" subtitle="Specialized AI and Full Stack consultancy for modern business challenges." />
      <div className="grid sm:grid-cols-2 gap-6">
        <GlassCard className="p-8 bg-slate-50 border-none">
          <TrendingUp className="text-blue-600 w-8 h-8 mb-6" />
          <h3 className="text-xl font-bold mb-4">Current Focus</h3>
          <ul className="space-y-3">
            {portfolioData.creagen.completedProjects.map((p, i) => (
              <li key={i} className="text-sm font-bold text-slate-600 flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {p.name}</li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard className="p-8 bg-blue-600 text-white border-none shadow-blue-100">
           <h3 className="text-xl font-bold mb-4">Roadmap</h3>
           <p className="text-blue-50 text-sm mb-6 opacity-80 italic">"{portfolioData.creagen.vision}"</p>
           <ul className="space-y-3">
             {portfolioData.creagen.upcomingProjects.map((p, i) => (
               <li key={i} className="text-sm font-bold flex items-center gap-2"><div className="w-1.5 h-1.5 bg-white rounded-full" /> {p.name}</li>
             ))}
           </ul>
        </GlassCard>
      </div>
    </div>
  </section>
);

const AchievementsSection = () => (
  <section id="certifications" className="py-24 px-4 bg-slate-50">
    <div className="max-w-5xl mx-auto">
      <SectionHeader title="Achievements" />
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          {portfolioData.achievements.map((item, i) => (
            <GlassCard key={i} className="p-4 flex items-center gap-4">
              <div className="bg-green-100 p-1.5 rounded-lg"><CheckCircle className="text-green-600 w-4 h-4" /></div>
              <span className="text-sm font-bold text-slate-700">{item.name}</span>
            </GlassCard>
          ))}
        </div>
        <div className="space-y-4">
          {portfolioData.events.map((item, i) => (
            <GlassCard key={i} className="p-4 flex items-center gap-4">
              <div className="bg-blue-100 p-1.5 rounded-lg"><item.icon className="text-blue-600 w-4 h-4" /></div>
              <div>
                <p className="text-sm font-bold text-slate-700">{item.name}</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest">{item.role}</p>
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
    <section id="contact" className="py-24 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <SectionHeader title="Contact" subtitle="Let's build something significant together." />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <GlassCard className="p-8">
            <form className="space-y-4" onSubmit={handleMailto}>
              <input name="name" type="text" placeholder="Your Name" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 text-sm font-bold" required />
              <input name="email" type="email" placeholder="Your Email" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 text-sm font-bold" required />
              <textarea name="message" placeholder="Briefly describe your interest..." rows="3" className="w-full px-5 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none focus:border-blue-600 text-sm font-bold" required></textarea>
              <button type="submit" className="w-full py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-black transition-all active:scale-95 text-xs uppercase tracking-widest">Send Initiative</button>
            </form>
          </GlassCard>
          <div className="space-y-8 py-4">
            <div className="flex gap-4">
              {portfolioData.socials.map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md hover:scale-105 transition-all text-blue-600">
                  <s.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
            <div className="text-slate-400 font-bold text-xs uppercase tracking-widest border-l-2 border-blue-600 pl-4">
              Andhra Pradesh, India
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen font-sans bg-slate-50 selection:bg-blue-600 selection:text-white">
      <AnimatePresence>
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>

      <footer className="py-12 bg-white text-center border-t border-slate-100">
        <p className="text-slate-300 font-bold text-[10px] uppercase tracking-[0.3em]">
          &copy; {new Date().getFullYear()} {portfolioData.name}
        </p>
      </footer>
    </div>
  );
};

export default App;