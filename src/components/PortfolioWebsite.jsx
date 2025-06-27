// Import necessary components and libraries from React and other packages.
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';

// Import project images.
import marsMeteo from '/images/mars-meteo.png';
import lyricVibe from '/images/lyric-vibe.png';

// Define the main functional component for the portfolio website.
const PortfolioWebsite = () => {
  // State for the typing animation text.
  const [typingText, setTypingText] = useState('');
  // State to control the visibility of the typing cursor.
  const [showCursor, setShowCursor] = useState(true);
  // State to track the currently selected experience.
  const [currentExperience, setCurrentExperience] = useState(0);
  // State to keep track of the active section in the viewport.
  const [activeSection, setActiveSection] = useState('');
  // State for the position of the indicator in the experience section.
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  // State to manage the mobile menu's open/close status.
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Ref to hold references to the experience menu items.
  const experienceMenuRefs = useRef([]);

  // The full text to be displayed by the typing animation.
  const fullText = `Hey there, I'm
John Welch
I write code.`;
  
  // Data for work experiences.
  const experiences = [
    {
      company: 'LPL Financial Summer 2025',
      position: 'Software Engineer Intern',
      period: 'June 2025 - August 2025',
      details: [
        'Created .NET server for GitHub Copilot and Jira, automating code generation for 10+ weekly user stories',
        'Enhanced code generation by integrating Meta\'s Llama 4 to MCP via AWS Bedrock to support 2000+ developers',
        'Implemented Jenkins CI/CD build pipeline using Docker, Bash, AWS Cloudformation alongside DevOps team'
      ]
    },
    {
      company: 'OCV, LLC Winter 2025',
      position: 'Software Engineer Intern',
      period: 'January 2025 - Present',
      details: [
        'Engineered user-friendly applications using SwiftUI, focusing on seamless UI/UX and efficient code architecture',
        'Executed comprehensive testing using Xcode and Android Studio, ensuring high performance and compatibility across iOS and Android ecosystems'
      ]
    },
    {
      company: 'Auburn Human-Centered AI Lab Fall 2024',
      position: 'Undergraduate Research Assistant',
      period: 'August 2024 - December 2024',
      details: [
        'Researched jailbreak methods for large language models to understand how standard restrictions are bypassed',
        'Examined safety procedures and the ethical consequences of security breaches in models'
      ]
    },
    {
      company: 'LPL Financial 2024',
      position: 'Software Engineer Intern',
      period: 'June 2024 - August 2024',
      details: [
        'Developed AWS application deployment manager using Angular and Terraform, decreasing deployment time by 50\%',
        'Reduced app downtime 30\% by building load balancer for blue-green deployment, enabling updates for 22,000+ advisors',
        'Decreased yearly meetings 20 hours for Infosec employees by automating notifications for annual reviews using Jira API'
      ]
    },
    {
      company: 'Welch Sneaks',
      position: 'Founder',
      period: 'August 2021 - May 2023',
      details: [
        'Successfully generated $40,000 in revenue through retail arbitrage tactics as sole proprietor',
        'Developed an e-commerce platform utilizing React and Node.js to effectively display product, process orders, and handle customer relationships',
        'Implemented an inventory management system to effectively manage daily orders by implementing API routes to query from MongoDB database and display it back to clients'
      ]
    }
  ];

  // Data for projects.
  const projects = [
    {
      name: 'Mars Meteo',
      image: marsMeteo,
      description: 'A Mars weather web application with a comprehensive weather tracking dashboard.',
      details: 'Led a team to develop this application, designed and built a web scraper using JavaScript for active updates of NASA Rover data, and crafted a user-friendly UI using React.',
      tags: ['React', 'Node.js', 'JavaScript']
    },
    {
      name: 'Lyric Vibe',
      image: lyricVibe,
      description: 'A sentiment analysis project, fetching a user\'s spotify data and quantifying user music taste on a numerical happy-to-sad scale.',
      details: 'Utilized NLTK LLM sentiment analysis to review song lyrics from user accounts, allowing us to recommend songs based on mood.',
      tags: ['Python', 'NLTK', 'pandas', 'Spotify API']
    }
  ];

  // List of technologies to display in the about section.
  const technologies = [
    'Golang', 
    'React', 
    'JavaScript', 
    'Python',
    'AWS', 
    'Docker'
  ];
  
  // Effect to handle scroll events and update the active section.
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop - 100 && scrollPosition < offsetTop + offsetHeight - 100) {
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

  // Layout effect to handle the position of the experience indicator.
  useLayoutEffect(() => {
    experienceMenuRefs.current = experienceMenuRefs.current.slice(0, experiences.length);
    const timer = setTimeout(() => {
      const currentRef = experienceMenuRefs.current[currentExperience];
      if (currentRef) {
        setIndicatorPosition(currentRef.offsetTop);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [experiences.length, currentExperience]);

  // Effect to update the indicator position when the current experience changes.
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentRef = experienceMenuRefs.current[currentExperience];
      if (currentRef) {
        setIndicatorPosition(currentRef.offsetTop);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentExperience]);

  // Effect to set the initial indicator position when the component mounts.
  useEffect(() => {
    const timer = setTimeout(() => {
      if (experienceMenuRefs.current[0]) {
        setIndicatorPosition(experienceMenuRefs.current[0].offsetTop);
      }
    }, 500);
    
    return () => clearTimeout(timer);
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
            {['home', 'about', 'experience', 'projects', 'contact'].map(section => (
              <li key={section}>
                <a 
                  href={`#${section}`}
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
          <div className="absolute top-16 left-0 right-0 bg-gray-900 md:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4">
              {['home', 'about', 'experience', 'projects', 'contact'].map(section => (
                <li key={section}>
                  <a 
                    href={`#${section}`}
                    className="text-gray-300 hover:text-cyan-400 transition-colors duration-300"
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
            <Github size={42} />
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
            <Linkedin size={42} />
          </a>
          <a 
            href="mailto:jwelch04@outlook.com" 
            className="group"
            aria-label="Email"
            style={{ color: 'rgb(156 163 175)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'rgb(34 211 238)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(156 163 175)'}
          >
            <Mail size={42} />
          </a>
        </div>
        <div className="h-24 w-px bg-gray-700"></div>
      </div>

      {/* Main content of the portfolio. */}
      <main className="max-w-5xl mx-auto px-6 pt-24">
        {/* Home section with typing animation. */}
        <section id="home" className="h-screen flex flex-col items-center justify-center">
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
                  Hey, my name is John and I'm a software engineering student at Auburn University. Lately I've been working to leverage <span className="text-cyan-400">artificial intelligence</span> to create a <span className="text-cyan-400">stock analysis tool</span>.
                </p>
                <p className="mb-4">
                  To date, I've had the privilege of working as an intern for two summers at <span className="text-cyan-400">LPL Financial</span>, creating AI-driven developer tools, automations, and more. I've also gained valuable experience by researching LLMs at Auburn's Human-Centered AI Lab, creating a <span className="text-cyan-400">5 star iOS application</span> at OCV, and founding my own e-commerce business.
                </p>
                <p className="mb-6">
                  I have a passion for continually expanding my skill-set, so if you have a project you'd like to collaborate on, please don't hesitate to reach out!
                </p>
                <p className="text-lg text-gray-300 mb-3">
                  Here are a few technologies I've been working with recently:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center mb-2">
                      <span className="text-cyan-400 mr-2">{'>'}</span>
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Profile image. */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div className="relative w-56 h-56">
                <div className="absolute -top-3 -left-3 w-56 h-56 bg-cyan-400 bg-opacity-20 rounded-md transition-all duration-300 hover:translate-x-2 hover:translate-y-2">
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <img
                      src="/images/profile.jpg"
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
        <section id="experience" className="text-lg py-16">
          <h2 className="text-cyan-400 font-mono text-2xl mb-12">Work Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mx-auto max-w-5xl">
            {/* Experience menu. */}
            <div className="md:col-span-3 relative">
              <div className="font-mono sticky top-24">
                <div 
                  className="absolute w-2 h-8 bg-cyan-400 transition-all duration-300 ease-in-out" 
                  style={{ 
                    top: `${indicatorPosition}px`, 
                    left: "-10px"
                  }}
                />
                {experiences.map((exp, index) => (
                  <div 
                    key={index}
                    ref={el => experienceMenuRefs.current[index] = el}
                    className={`py-2 mb-4 pl-4 cursor-pointer transition-colors duration-300 ${
                      index === currentExperience ? 'text-white' : 'text-gray-400'
                    }`}
                    onClick={() => setCurrentExperience(index)}
                  >
                    {exp.company}
                  </div>
                ))}
              </div>
            </div>
            {/* Experience details. */}
            <div className="md:col-span-9">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`transition-opacity duration-500 ${
                    index === currentExperience ? 'opacity-100 block' : 'opacity-0 hidden'
                  }`}
                >
                  <div className="mb-4">
                    <h3 className="text-white text-xl font-mono">
                      {exp.position} @ 
                      <span className="text-cyan-400"> {exp.company}</span>
                    </h3>
                    <p className="text-gray-300 font-mono text-sm">{exp.period}</p>
                  </div>
                  <div className="mt-6">
                    {exp.details.map((detail, idx) => (
                      <div key={idx} className="mb-4 font-mono">
                        <span className="text-cyan-400">{'>'}</span>
                        <span className="ml-4 text-white">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects section. */}
        <section id="projects" className="py-16">
          <h2 className="text-cyan-400 font-mono text-2xl mb-12">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-16">
              <h3 className="text-cyan-400 font-mono text-lg mb-4">
                <span className="text-white text-xl">{project.name}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="font-mono text-right md:text-left bg-gray-800 rounded-xl shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 flex items-center justify-center h-48 w-full overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.name} interface`}
                    className="max-w-full max-h-full object-contain mx-auto my-auto transition-transform duration-500 hover:scale-105" 
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML += `
                        <div class="w-full h-full flex items-center justify-center bg-gray-800">
                          <div class="text-cyan-400 text-xl font-mono">
                            ${project.name} Preview
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="font-mono text-right">
                  <p className="text-white mb-4 text-lg">{project.description}</p>
                  <p className="text-gray-300 text-base mb-6">{project.details}</p>
                  <div className="flex flex-wrap justify-end gap-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-cyan-400 text-sm">/tag/{tag}</span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <a 
                      href={`https://github.com/jdw004/${project.name.toLowerCase().replace(' ', '-')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block text-cyan-400 hover:text-white transition-colors duration-300"
                      aria-label={`View ${project.name} code on GitHub`}
                    >
                      <Github size={32} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Contact section. */}
        <section id="contact" className="pt-12 pb-16 flex flex-col items-center">
          <h2 className="text-cyan-400 font-mono text-2xl mb-12">Contact-Me</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white font-mono mb-8 text-lg">
            I'm exploring new opportunities, so my inbox is always open. 
            Feel free to reach out with any questions or just to say hello.
            I promise to get back to you as soon as I can!
            </p>
            <div className="flex justify-center gap-6">
              <a href="mailto:jwelch04@outlook.com" className="text-cyan-400 hover:text-white transition-colors duration-300 flex items-center text-lg">
                <Mail size={16} className="mr-2" /> Email
              </a>
            </div>
          </div>
          <div className="mt-12 text-gray-400 text-lg font-mono">
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
      `}</style>
    </div>
  );
};

export default PortfolioWebsite;