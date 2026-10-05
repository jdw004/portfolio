import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { homeMetadata, graphMetadata } from '../data/siteMetadata';
const KnowledgeGraph = lazy(() => import('./KnowledgeGraph'));

const sections = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const navigation = [
  { id: 'about', label: 'Home', href: '/#about' },
  { id: 'graph', label: 'Knowledge Graph', href: '/graph/' },
];

const experiences = [
  { company: 'Apple', href: 'https://www.apple.com/apple-pay/', role: 'Software Engineer Intern', dates: 'May 2026 - Aug 2026', summary: 'Built agents for Apple Pay.', current: true },
  { company: 'Stripe', href: 'https://stripe.com/terminal', role: 'Software Engineer Intern', dates: 'Jan 2026 - May 2026', summary: 'Built infrastructure powering Stripe Terminal.' },
  { company: 'Scale AI', href: 'https://scale.com/', role: 'Gen AI Intern', dates: 'Oct 2025 - Jan 2026', summary: 'Evaluated the next generation of large language models.' },
  { company: 'LPL Financial', href: 'https://www.lpl.com/', role: 'Software Engineer Intern', dates: 'Jun 2025 - Aug 2025', summary: 'Built an MCP server connecting coding agents to Jira, turning user stories into code.' },
  { company: 'Auburn HC-AI Lab', role: 'Undergraduate Research Assistant', dates: 'Aug 2024 - Nov 2024', summary: 'Conducted research in Auburn’s Human-Centered AI Laboratory.' },
  { company: 'LPL Financial', href: 'https://www.lpl.com/', role: 'Software Engineer Intern', dates: 'Jun 2024 - Aug 2024', summary: 'Built developer tools and automation for engineering teams.' },
];

function SectionRail() {
  const [active, setActive] = useState('about');
  useEffect(() => {
    const onScroll = () => {
      let next = sections[0].id;
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element && window.scrollY + 180 >= element.offsetTop) next = id;
      });
      setActive(next);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className="section-rail" aria-label="Page sections">
      {sections.map((section) => (
        <a key={section.id} className={`section-rail-link ${active === section.id ? 'is-active' : ''}`} href={`#${section.id}`} aria-label={`Go to ${section.label}`}>
          <span className="section-rail-marker" /><span className="section-rail-label">{section.label}</span>
        </a>
      ))}
    </nav>
  );
}

function Header({ isGraphPage }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const isActive = (id) => isGraphPage ? id === 'graph' : id === 'about';
  useEffect(() => {
    if (!menuOpen) return;
    const onOutsideClick = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onOutsideClick);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onOutsideClick);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 680px)');
    const onResize = () => { if (desktop.matches) setMenuOpen(false); };
    desktop.addEventListener('change', onResize);
    return () => desktop.removeEventListener('change', onResize);
  }, []);
  return (
    <>
      <div className="header-spacer" />
      <header className="site-header" ref={headerRef}>
        <div className="header-inner">
          <a className="site-logo" href="/#about" aria-label="John Welch home">{'</>'}</a>
          <nav className="desktop-nav" aria-label="Main navigation">{navigation.map((section) => <a key={section.id} href={section.href} className={isActive(section.id) ? 'nav-active' : undefined} aria-current={isActive(section.id) ? 'page' : undefined}>{section.label}</a>)}</nav>
          <button ref={menuButtonRef} className="menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
          </button>
        </div>
        <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!menuOpen}>
          {navigation.map((section) => <a key={section.id} href={section.href} className={isActive(section.id) ? 'nav-active' : undefined} aria-current={isActive(section.id) ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{section.label}</a>)}
        </nav>
      </header>
    </>
  );
}

function Timeline() {
  return <div className="timeline">
    {experiences.map((experience) => <article className="timeline-row" key={`${experience.company}-${experience.dates}`}>
      <span className={`timeline-marker ${experience.current ? 'is-filled' : ''}`} aria-hidden="true" />
      <div className="timeline-content">
        <div className="timeline-title-row"><h3>{experience.href ? <a href={experience.href} target="_blank" rel="noreferrer">{experience.company}</a> : experience.company}</h3><span className="timeline-dates">{experience.dates}</span></div>
        <p className="timeline-role">{experience.role}</p><p className="timeline-summary">{experience.summary}</p>
      </div>
    </article>)}
  </div>;
}

export default function PortfolioWebsite() {
  const isGraphPage = /^\/graph\/?$/.test(window.location.pathname);
  useEffect(() => {
    const metadata = isGraphPage ? graphMetadata : homeMetadata;
    document.title = metadata.title;
    const entries = {
      'meta[name="description"]': metadata.description,
      'meta[property="og:title"]': metadata.title,
      'meta[property="og:description"]': metadata.description,
      'meta[property="og:url"]': metadata.url,
      'meta[name="twitter:title"]': metadata.title,
      'meta[name="twitter:description"]': metadata.description,
    };
    Object.entries(entries).forEach(([selector, content]) => {
      document.querySelector(selector)?.setAttribute('content', content);
    });
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', metadata.url);
  }, [isGraphPage]);
  return <div className="portfolio-shell">
    <Header isGraphPage={isGraphPage} />
    {!isGraphPage && <SectionRail />}
    <main className="site-main">
      {isGraphPage ? <section className="page-section hero-section">
        <h1>Knowledge Graph</h1>
        <p className="section-intro">My personal knowledge graph, built with Obsidian and visualized.</p>
        <Suspense fallback={<p>Loading graph…</p>}><KnowledgeGraph /></Suspense>
      </section> : <>
      <section id="about" className="page-section hero-section">
        <h1>John Welch</h1>
        <div className="hero-copy">
          <p>I’m a software engineer and computer science student at <a href="https://www.auburn.edu/" target="_blank" rel="noreferrer">Auburn University</a>, interested in building applied AI systems and backend infrastructure.</p>
          <p>Outside of work, I enjoy playing drums, spending time outdoors, chess, and competitive programming.</p>
        </div>
        <div className="link-row"><a href="mailto:johnwelch004@outlook.com">email</a><span>·</span><a href="https://www.linkedin.com/in/johnd-welch/" target="_blank" rel="noreferrer">linkedin</a><span>·</span><a href="https://github.com/jdw004" target="_blank" rel="noreferrer">github</a></div>
      </section>
      <section id="experience" className="page-section"><h2>Experience</h2><p className="section-intro">A few places I’ve had the chance to learn, build, and ship.</p><Timeline /></section>
      <section id="contact" className="page-section contact-section"><h2>Contact</h2><p>If you want to talk about a project, technology, or just say hello, my inbox is open.</p><a className="contact-email" href="mailto:johnwelch004@outlook.com">johnwelch004@outlook.com</a><div className="social-row"><a href="https://github.com/jdw004" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={20} /></a><a href="https://www.linkedin.com/in/johnd-welch/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={20} /></a><a href="mailto:johnwelch004@outlook.com" aria-label="Email"><Mail size={20} /></a></div></section>
      </>}
    </main>
    <footer>Built by John Welch with inspo from Jacob Murrah · <a href="https://github.com/jdw004/portfolio" target="_blank" rel="noreferrer">source</a></footer>
  </div>;
}
