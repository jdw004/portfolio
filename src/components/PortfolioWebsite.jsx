import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const PortfolioWebsite = () => {
  const [typingText, setTypingText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const experienceMenuRefs = useRef([]);

  const fullText = "Hey there, I'm\nJohn Welch\nI write code.";
  
  // Updated experiences data
const experiences = [
  {
    company: 'OCV, LLC',
    position: 'Software Engineer Intern',
    period: 'January 2025 - Present',
    details: [
      'Engineered user-friendly applications using SwiftUI, focusing on seamless UI/UX and efficient code architecture',
      'Executed comprehensive testing using Xcode and Android Studio, ensuring high performance and compatibility across iOS and Android ecosystems'
    ]
  },
  {
    company: 'Auburn Human-Centered AI Lab',
    position: 'Undergraduate Research Assistant',
    period: 'August 2024 - December 2024',
    details: [
      'Researched jailbreak methods for large language models to understand how standard restrictions are bypassed',
      'Examined safety procedures and the ethical consequences of security breaches in models'
    ]
  },
  {
    company: 'LPL Financial',
    position: 'Software Engineer Intern',
    period: 'June 2024 - August 2024',
    details: [
      'Developed AWS application deployment manager using Angular & Terraform, decreasing deployment time by 50%',
      'Reduced application downtime by 30% by creating a load balancer utilizing blue-green deployment, easing release of updates to over 22,000 financial advisors',
      'Automated push notifications for pending annual reviews using the Jira API, reducing meeting time by 14 hours for employees across technology governance in 2024'
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

// Updated projects data
const projects = [
  {
    name: 'Mars Meteo',
    description: 'A Mars weather web application with a comprehensive weather tracking dashboard.',
    details: 'Led a team to develop this application, designed and built a web scraper using JavaScript for active updates of NASA Rover data, and crafted a user-friendly UI using React.',
    tags: ['React', 'Node.js', 'JavaScript']
  },
  {
    name: 'Lyric Vibe',
    description: 'A sentiment analysis project, fetching a user\'s spotify data and quantifying user music taste on a numerical happy-to-sad scale.',
    details: 'Utilized NLTK LLM sentiment analysis to review song lyrics from user accounts, allowing us to recommend songs based on mood.',
    tags: ['Python', 'NLTK', 'pandas', 'Spotify API']
  }
];

  // Technologies based on experience and projects
  const technologies = [
    'React', 
    'SwiftUI', 
    'JavaScript', 
    'Python',
    'AWS', 
    'MongoDB'
  ];
  
  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (
            scrollPosition >= offsetTop - 100 && 
            scrollPosition < offsetTop + offsetHeight - 100
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial active section
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Typing animation effect
  useEffect(() => {
    if (typingText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypingText(fullText.slice(0, typingText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [typingText, fullText]);

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // This runs right after the DOM is updated, before paint.
  useLayoutEffect(() => {
    // Reset refs to match current experiences
    experienceMenuRefs.current = experienceMenuRefs.current.slice(0, experiences.length);
    
    // Force a small delay to ensure DOM elements are properly rendered
    const timer = setTimeout(() => {
      const currentRef = experienceMenuRefs.current[currentExperience];
      if (currentRef && currentRef.offsetTop !== undefined) {
        setIndicatorPosition(currentRef.offsetTop);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [experiences.length]);

  // Update indicator position when currentExperience changes
  useEffect(() => {
    // Force a small delay to ensure DOM elements are properly rendered
    const timer = setTimeout(() => {
      const currentRef = experienceMenuRefs.current[currentExperience];
      if (currentRef && currentRef.offsetTop !== undefined) {
        setIndicatorPosition(currentRef.offsetTop);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [currentExperience]);

  // Additional component mount effect to ensure indicator is properly set
  useEffect(() => {
    // Force initial indicator update after component fully mounts
    const timer = setTimeout(() => {
      if (experienceMenuRefs.current[0] && experienceMenuRefs.current[0].offsetTop !== undefined) {
        setIndicatorPosition(experienceMenuRefs.current[0].offsetTop);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen text-3xl" style={{ scrollBehavior: 'smooth' }}>
      <header className="p-6 flex justify-between items-center fixed top-0 left-0 right-0 bg-gray-900 z-50">
        <a href="#home" className="text-cyan-400">
          <div className="font-bold text-4xl font-mono">JW</div>
        </a>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a 
                href="#home" 
                style={{ 
                  color: activeSection === 'home' ? 'rgb(34 211 238)' : 'rgb(209 213 219)',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== 'home') e.currentTarget.style.color = 'rgb(34 211 238)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== 'home') e.currentTarget.style.color = 'rgb(209 213 219)';
                }}
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#about" 
                style={{ 
                  color: activeSection === 'about' ? 'rgb(34 211 238)' : 'rgb(209 213 219)',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== 'about') e.currentTarget.style.color = 'rgb(34 211 238)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== 'about') e.currentTarget.style.color = 'rgb(209 213 219)';
                }}
              >
                About Me
              </a>
            </li>
            <li>
              <a 
                href="#experience" 
                style={{ 
                  color: activeSection === 'experience' ? 'rgb(34 211 238)' : 'rgb(209 213 219)',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== 'experience') e.currentTarget.style.color = 'rgb(34 211 238)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== 'experience') e.currentTarget.style.color = 'rgb(209 213 219)';
                }}
              >
                Experience
              </a>
            </li>
            <li>
              <a 
                href="#projects" 
                style={{ 
                  color: activeSection === 'projects' ? 'rgb(34 211 238)' : 'rgb(209 213 219)',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== 'projects') e.currentTarget.style.color = 'rgb(34 211 238)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== 'projects') e.currentTarget.style.color = 'rgb(209 213 219)';
                }}
              >
                Projects
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                style={{ 
                  color: activeSection === 'contact' ? 'rgb(34 211 238)' : 'rgb(209 213 219)',
                  transition: 'color 0.3s'
                }}
                onMouseEnter={(e) => {
                  if (activeSection !== 'contact') e.currentTarget.style.color = 'rgb(34 211 238)';
                }}
                onMouseLeave={(e) => {
                  if (activeSection !== 'contact') e.currentTarget.style.color = 'rgb(209 213 219)';
                }}
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Side links with icons */}
      <div className="fixed left-6 bottom-0 flex flex-col items-center z-40 text-2xl">
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

      {/* Right side links */}
      {/* text-2xl for bigger text on the right side */}
      <div className="fixed right-6 bottom-0 flex flex-col items-center z-40 text-3xl">
        <div className="flex flex-col space-y-6 mb-8">
          <a
            href="mailto:jwelch04@outlook.com"
            className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 writing-mode-vertical-right"
          >
            jwelch04@outlook.com
          </a>
        </div>
        <div className="h-24 w-px bg-gray-700"></div>
      </div>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-6 pt-24">
        {/* Home Section */}
        <section id="home" className="h-screen flex flex-col items-center justify-center">
          <div className="text-left font-mono text-white text-6xl mb-8">
            <pre className="whitespace-pre-wrap">
              {typingText}
              {showCursor && <span className="text-cyan-400">_</span>}
            </pre>
          </div>
        </section>

        {/* About Me Section - NEW SECTION */}
        <section id="about" className="py-24">
          <h2 className="text-cyan-400 font-mono text-3xl mb-16">About Me</h2>
          
          <div className="grid grid-cols-12 gap-8">
            {/* Left side - Text */}
            <div className="col-span-7">
              <div className="font-mono text-xl leading-relaxed text-white">
                <p className="mb-6">
                  Hey, my name is John and I'm a software engineering student at Auburn University. Lately I've been working to leverage <span className="text-cyan-400">mobile development</span> to create <span className="text-cyan-400">engaging iOS/Android applications</span>.
                </p>
                <p className="mb-6">
                  To date, I've had the privilege of working as an intern at <span className="text-cyan-400">OCV</span>, conducting <span className="text-cyan-400">undergraduate research</span> at Auburn's Human-Centered AI Lab, <span className="text-cyan-400">interning at LPL Financial</span>, and founding my own e-commerce business.
                </p>
                <p className="mb-8">
                  I have a passion for continually expanding my skill-set, so if you have a project you'd like to collaborate on, please don't hesitate to reach out!
                </p>
                
                <p className="text-xl text-gray-300 mb-4">
                  Here are a few technologies I've been working with recently:
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {technologies.map((tech, index) => (
                    <div key={index} className="flex items-center mb-3">
                      <span className="text-cyan-400 mr-2">{'>'}</span>
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="col-span-5 flex justify-center items-center">
              <div className="relative w-72 h-72">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-cyan-400 bg-opacity-20 rounded-md transition-all duration-300 hover:translate-x-2 hover:translate-y-2">
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

        {/* Experience Section */}
        <section id="experience" className="text-2xl py-24">
          <h2 className="text-cyan-400 font-mono text-3xl mb-16">Work Experience</h2>
          
          <div className="grid grid-cols-12 gap-6 mx-auto max-w-5xl">
            {/* Experience Menu (Left Side) */}
            <div className="col-span-3 relative">
              <div className="font-mono sticky top-24">
                {/* Moving indicator */}
                <div 
                  className="absolute w-2 h-8 bg-cyan-400 transition-all duration-300 ease-in-out" 
                  style={{ 
                    top: `${indicatorPosition}px`, 
                    left: "-10px"
                  }}
                />
                
                {/* Experience Menu Items */}
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
            
            {/* Experience Content (Right Side) */}
            <div className="col-span-9">
              {experiences.map((exp, index) => (
                <div 
                  key={index} 
                  className={`transition-opacity duration-500 ${
                    index === currentExperience ? 'opacity-100 block' : 'opacity-0 hidden'
                  }`}
                >
                  <div className="mb-6">
                    <h3 className="text-white text-2xl font-mono">
                      {exp.position} @ 
                      <span className="text-cyan-400"> {exp.company}</span>
                    </h3>
                    <p className="text-gray-300 font-mono">{exp.period}</p>
                  </div>
                  
                  <div className="mt-8">
                    {exp.details.map((detail, idx) => (
                      <div key={idx} className="mb-6 font-mono">
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

        {/* Projects Section with fixed image container */}
        <section id="projects" className="py-24">
          <h2 className="text-cyan-400 font-mono text-3xl mb-16">Projects</h2>
          {projects.map((project, index) => (
            <div key={index} className="mb-20">
              <h3 className="text-cyan-400 font-mono text-xl mb-6">
                <span className="text-white text-2xl">{project.name}</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* UPDATED: Image container with better sizing and object-fit properties */}
                <div className="font-mono text-right md:text-left bg-gray-800 rounded-xl shadow-lg hover:shadow-cyan-400/20 transition-all duration-300 flex items-center justify-center h-56 w-full overflow-hidden">
                  <img 
                    src={`/images/${project.name.toLowerCase().replace(' ', '-')}.png`} 
                    alt={`${project.name} interface`}
                    className="max-w-full max-h-full object-contain mx-auto my-auto transition-transform duration-500 hover:scale-105" 
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML += `
                        <div class=\"w-full h-full flex items-center justify-center bg-gray-800\">
                          <div class=\"text-cyan-400 text-xl font-mono\">
                            ${project.name} Preview
                          </div>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div className="font-mono text-right">
                  <p className="text-white mb-6">{project.description}</p>
                  <p className="text-gray-300 text-xl mb-8">{project.details}</p>
                  <div className="flex flex-wrap justify-end gap-4">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="text-cyan-400">/tag/{tag}</span>
                    ))}
                  </div>
                  {/* MOVED: GitHub icon to the right side */}
                  <div className="mt-4">
                    <a 
                      href={`https://github.com/jdw004/${project.name.toLowerCase().replace(' ', '-')}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-block text-cyan-400 hover:text-white transition-colors duration-300"
                      aria-label={`View ${project.name} code on GitHub`}
                    >
                      <Github size={42} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section id="contact" className="pt-16 pb-24 flex flex-col items-center">
          <h2 className="text-cyan-400 font-mono text-3xl mb-16">Contact-Me</h2>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-white font-mono mb-12">
            I'm exploring new opportunities, so my inbox is always open. 
            Feel free to reach out with any questions or just to say hello.
            I promise to get back to you as soon as I can!
            </p>
            <div className="flex justify-center gap-6">
              <a href="mailto:jwelch04@outlook.com" className="text-cyan-400 hover:text-white transition-colors duration-300 flex items-center">
                <Mail size={18} className="mr-2" /> Email
              </a>
            </div>
          </div>
          <div className="mt-16 text-gray-400 text-xl font-mono">
            Built with inspo from  
            <a href="https://github.com/wumphlett/willhumphlett" className="text-cyan-400 mx-1 hover:text-white transition-colors duration-300"> Will Humphlett</a> &
            <a href="https://github.com/jmurrah/personal-portfolio" className="text-cyan-400 mx-1 hover:text-white transition-colors duration-300"> Jacob Murrah</a>
            <div className="mt-2 text-center">
              Source on <a href="https://github.com/jdw004/portfolio" className="text-cyan-400 hover:text-white transition-colors duration-300">GitHub</a>
            </div>
          </div>
        </section>
      </main>

      {/* Global styles for vertical text */}
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