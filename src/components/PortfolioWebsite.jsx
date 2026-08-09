import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';


// Define the main functional component for the portfolio website.
const PortfolioWebsite = () => {
  // State for the typing animation text.
  const [typingText, setTypingText] = useState('');
  // State to control the visibility of the typing cursor.
  const [showCursor, setShowCursor] = useState(true);
  // State to keep track of the active section in the viewport.
  const [activeSection, setActiveSection] = useState('');
  // State to manage the mobile menu's open/close status.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // The full text to be displayed by the typing animation.
  const fullText = `Hey there, I'm
John Welch
I write code.`;
  
  // Data for work experiences.
  const experiences = [
    {
      company: 'Apple \'26',
      companyFull: 'Apple',
      position: 'Software Engineer Intern',
      period: 'May 2026 - August 2026',
      details: [
        'Building agents for Apple Pay'
      ]
    },
    {
      company: 'Stripe \'26',
      companyFull: 'Stripe',
      position: 'Software Engineer Intern',
      period: 'January 2026 - May 2026',
      details: [
        'Stripe Terminal infrastructure'
      ]
    },
    {
      company: 'Scale AI \'25',
      companyFull: 'Scale AI',
      position: 'Gen AI Intern',
      period: 'October 2025 - January 2026',
      details: [
        'LLM evaluation systems'
      ]
    },
    {
      company: 'LPL Financial \'25',
      companyFull: 'LPL Financial',
      position: 'Software Engineer Intern',
      period: 'June 2025 - August 2025',
      details: [
        'Coding agents for developer workflows'
      ]
    },
    {
      company: 'Auburn HCAI Lab \'24',
      companyFull: 'Auburn Human-Centered AI Lab',
      position: 'Undergraduate Research Assistant',
      period: 'August 2024 - November 2024',
      details: [
        'Conducted research in Auburn\'s Human-Centered AI Laboratory'
      ]
    },
    {
      company: 'LPL Financial \'24',
      companyFull: 'LPL Financial',
      position: 'Software Engineer Intern',
      period: 'June 2024 - August 2024',
      details: [
        'Built developer tools and automation'
      ]
    }
  ];

  // Effect to handle scroll events and update the active section.
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = ['home', 'about', 'experience', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 110 && scrollPosition < offsetTop + offsetHeight - 110) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set the initial active section on load.
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Effect for the typing animation on the home screen.
  useEffect(() => {
    if (typingText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypingText(fullText.slice(0, typingText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typingText, fullText]);

  // Effect for the blinking cursor animation.
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Main render method for the component.
  return (
    <div className="bg-gray-900 text-white min-h-screen text-lg">
      {/* Header section with navigation. */}
      <header className="p-6 flex justify-between items-center fixed top-0 left-0 right-0 bg-gray-900 z-50">
        <a href="#home" className="text-cyan-400">
          <div className="font-bold text-4xl font-mono">JW</div>
        </a>
        {/* Mobile menu button. */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {/* Desktop navigation. */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {['home', 'about', 'experience', 'contact'].map(section => (
              <li key={section}>
                <a 
                  href={`#${section}`}
                  className="text-2xl font-normal"
                  style={{ 
                    color: activeSection === section ? 'rgb(34 211 238)' : 'rgb(209 213 219)',
                    transition: 'color 0.3s'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== section) e.currentTarget.style.color = 'rgb(34 211 238)';
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== section) e.currentTarget.style.color = 'rgb(209 213 219)';
                  }}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        {/* Mobile dropdown menu. */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 backdrop-blur-sm md:hidden">
            <ul className="flex flex-col items-end space-y-4 py-4 pr-6">
              {['home', 'about', 'experience', 'contact'].map(section => (
                <li key={section}>
                  <a 
                    href={`#${section}`}
                    className="text-white hover:text-cyan-400 transition-colors duration-300 font-semibold text-shadow"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Social media links on the side. */}
      <div className="fixed left-6 bottom-0 flex-col items-center z-40 text-2xl hidden md:flex">
        <div className="flex flex-col space-y-6 mb-8">
          <a 
            href="https://github.com/jdw004" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group"
            aria-label="GitHub"
            style={{ color: 'rgb(156 163 175)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(34 211 238)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156 163 175)'}
          >
            <Github size={33} />
          </a>
          <a 
            href="https://www.linkedin.com/in/johnd-welch/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group"
            aria-label="LinkedIn"
            style={{ color: 'rgb(156 163 175)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(34 211 238)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156 163 175)'}
          >
            <Linkedin size={33} />
          </a>
          <a 
            href="mailto:johnwelch004@outlook.com" 
            className="group"
            aria-label="Email"
            style={{ color: 'rgb(156 163 175)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(34 211 238)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156 163 175)'}
          >
            <Mail size={33} />
          </a>
        </div>
        <div className="h-24 w-px bg-gray-700"></div>
      </div>

      {/* Main content of the portfolio. */}
      <main className="max-w-5xl mx-auto px-6 pt-24">
        {/* Home section with typing animation. */}
        <section id="home" className="h-screen flex flex-col items-center justify-center -mt-24">
          <div className="text-left font-mono text-white text-6xl mb-8">
            <pre className="whitespace-pre-wrap">
              {typingText}
              {showCursor && <span className="text-cyan-400">_</span>}
            </pre>
          </div>
        </section>

        {/* About Me section. */}
        <section id="about" className="py-16">
          <h2 className="text-cyan-400 font-mono text-2xl mb-12">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <div className="font-mono text-lg leading-relaxed text-white">
                <p className="mb-4">
                  Hey, my name is John and I'm a computer science student at Auburn University. Lately, I've been building Forge, an agent execution engine for reliable AI workflows.
                </p>
                <p className="mb-6">
                  I have a passion for continually expanding my skillset, so if you have a project you'd like to collaborate on, please don't hesitate to reach out!
                </p>
              </div>
            </div>
            {/* Profile image. */}
            <div className="md:col-span-5 justify-center items-center hidden md:flex">
              <div className="relative w-72 h-72">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-cyan-400 bg-opacity-20 rounded-md transition-all duration-300 hover:translate-x-3 hover:translate-y-3">
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img
                      src="/images/IMG_5710.jpg"
                      alt="John Welch"
                      className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML += '<div class="w-full h-full flex items-center justify-center text-cyan-400 text-4xl font-bold">JW</div>';
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Work Experience section. */}
        <section id="experience" className="py-16">
          <div className="mb-8">
            <h2 className="text-cyan-400 font-mono text-2xl mb-2">Work Experience</h2>
          </div>
          <div className="relative ml-2 border-l border-dotted border-gray-600">
            {experiences.map((exp, index) => (
              <article key={index} className="relative pl-8 pb-8 last:pb-0">
                <span
                  className={`absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-cyan-400 bg-gray-900 ${
                    exp.period.includes('Present') ? 'bg-cyan-400' : ''
                  }`}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                    <h3 className="text-lg font-mono text-cyan-400">{exp.companyFull}</h3>
                    <span className="mr-auto text-sm font-normal text-gray-400">{exp.position}</span>
                    <span className="whitespace-nowrap text-sm font-normal text-gray-400">{exp.period}</span>
                  </div>
                  <div className="flex flex-col gap-2 text-base text-gray-300">
                    {exp.details.map((detail, idx) => (
                      <p key={idx} className="m-0 font-mono">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Contact section. */}
        <section id="contact" className="pt-12 pb-16 flex flex-col items-center">
          <h2 className="text-cyan-400 font-mono text-2xl mb-12">Contact-Me</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white font-mono mb-8 text-lg">
            I'm exploring new opportunities, so my inbox is always open. 
            Feel free to reach out with any questions or just to say hello.
            </p>
            <div className="flex justify-center gap-6">
              <a href="mailto:johnwelch004@outlook.com" className="text-cyan-400 hover:text-white transition-colors duration-300 flex items-center text-lg">
                <Mail size={16} className="mr-2" /> Email
              </a>
              <a 
                href="https://www.linkedin.com/in/johnd-welch/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-white transition-colors duration-300 flex items-center text-lg md:hidden"
              >
                <Linkedin size={16} className="mr-2" /> LinkedIn
              </a>
            </div>
          </div>
          <div className="mt-12 text-gray-400 text-lg font-mono text-center md:text-left">
            Built with inspo from  
            <a href="https://github.com/wumphlett/willhumphlett" className="text-cyan-400 mx-1 hover:text-white transition-colors duration-300"> Will Humphlett</a> &
            <a href="https://github.com/jmurrah/personal-portfolio" className="text-cyan-400 mx-1 hover:text-white transition-colors duration-300"> Jacob Murrah</a>
            <div className="mt-2 text-center">
              Source on <a href="https://github.com/jdw004/portfolio" className="text-cyan-400 hover:text-white transition-colors duration-300">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      {/* Custom global styles. */}
      <style jsx>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
        }
        
        .writing-mode-vertical-right {
          writing-mode: vertical-rl;
          text-orientation: mixed;
        }
        
        .text-shadow {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8), 0 0 4px rgba(0, 0, 0, 0.5);
        }
        
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 120px;
        }
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;
