import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCode } from "react-icons/fa";
import "./Projects.css";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  liveUrl?: string;
  docUrl?: string;
  googlePlay?: string;
  stats?: {
    stars?: number;
    downloads?: string;
    coverage?: string;
  };
  highlights: string[];
  category: "Active" | "Production" | "Legacy";
}

const projects: Project[] = [
  {
    title: "AI Capabilities Suite",
    description:
      "Enterprise-grade MCP (Model Context Protocol) tools suite with debugger, screenshot capture, and process management capabilities.",
    tech: ["TypeScript", "MCP", "VS Code", "Docker", "NPM"],
    github: "https://github.com/Digital-Defiance/ai-capabilities-suite",
    docUrl: "https://digital-defiance.github.io/ai-capabilities-suite/",
    category: "Production",
    stats: {
      coverage: "94.53%",
      downloads: "NPM + VS Code Marketplace",
    },
    highlights: [
      "25+ debugging tools with enterprise security",
      "1,059 tests with 99.81% pass rate",
      "Screenshot capture with PII masking",
      "Published on VS Code Marketplace & NPM",
    ],
  },
  {
    title: "Express Suite",
    description:
      "Comprehensive MERN stack monorepo with 9+ packages for full-stack development including i18n, ECIES cryptography, and authentication.",
    tech: ["TypeScript", "Express.js", "React", "MongoDB", "NX"],
    github: "https://github.com/Digital-Defiance/express-suite",
    docUrl: "https://digital-defiance.github.io/express-suite/",
    category: "Production",
    highlights: [
      "Full ECIES encryption for browser & Node",
      "Comprehensive i18n library",
      "Express framework with auth & DB",
      "Monorepo generator CLI",
    ],
  },
  {
    title: "Akira",
    description:
      "VS Code extension for spec-driven development using EARS requirements syntax with MCP integration and property-based testing.",
    tech: ["TypeScript", "VS Code API", "MCP", "fast-check"],
    github: "https://github.com/Digital-Defiance/Akira",
    category: "Active",
    highlights: [
      "Requirements → Design → Tasks workflow",
      "MCP integration for AI assistance",
      "Property-based testing support",
      "Task management integration",
    ],
  },
  {
    title: "BrightChain",
    description:
      "Next-generation blockchain with Owner-Free File System, decentralized identity, and cryptographic voting capabilities.",
    tech: ["TypeScript", "NX", "React", "Express", "MongoDB"],
    github: "https://github.com/Digital-Defiance/BrightChain",
    category: "Active",
    highlights: [
      "ECIES encryption with AES-256-GCM",
      "Owner-Free File System",
      "Decentralized identity management",
      "Cryptographic voting system",
    ],
  },
  {
    title: "Star Realms Assistant",
    description:
      "Production React app for tracking Star Realms card game with player management, statistics, save/load, and mobile support.",
    tech: ["React", "TypeScript", "Material-UI", "NX", "Capacitor"],
    github: "https://github.com/Digital-Defiance/StarRealmsAssistant",
    liveUrl: "https://starrealmsassistant.com",
    category: "Production",
    highlights: [
      "Real-time score tracking",
      "Authority graphing & statistics",
      "Mobile iOS/Android support",
      "800+ unit tests",
    ],
  },
  {
    title: "Dominion Assistant",
    description:
      "Production React application for Dominion card game tracking with comprehensive game management and scoring features.",
    tech: ["React", "TypeScript", "Material-UI", "NX"],
    github: "https://github.com/Digital-Defiance/DominionAssistant",
    liveUrl: "https://dominionassistant.com",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.digitaldefiance.dominionassistant",
    category: "Production",
    highlights: [
      "Player and turn management",
      "Dynamic scoring system",
      "Expansion support",
      "Available on Google Play",
    ],
  },
  {
    title: "OpenBook",
    description:
      "Git-versioned markdown filesystem to MongoDB orchestrator with REST API for non-profit data management.",
    tech: ["Node.js", "Express", "MongoDB", "Git", "Markdown"],
    github: "https://github.com/Digital-Defiance/OpenBook",
    category: "Active",
    highlights: [
      "Markdown to database conversion",
      "REST API for data queries",
      "Excel export capabilities",
      "Version-controlled data",
    ],
  },
  {
    title: "Chili & Cilantro",
    description:
      "Full-stack MERN bluffing game with real-time features, internationalization for 6+ languages, and Pusher integration.",
    tech: ["React", "Express", "MongoDB", "Pusher", "i18n"],
    github: "https://github.com/Digital-Defiance/chili-and-cilantro",
    category: "Active",
    highlights: [
      "Real-time multiplayer gameplay",
      "6+ language support",
      "NX monorepo architecture",
      "Pusher websocket integration",
    ],
  },
];

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="projects" id="projects" ref={ref}>
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          className="section-title gradient-text"
          variants={projectVariants}
        >
          Featured Projects
        </motion.h2>

        <motion.p className="projects-subtitle" variants={projectVariants}>
          A selection of production-ready open source projects from my portfolio
        </motion.p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card glass"
              variants={projectVariants}
              whileHover={{ y: -8 }}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <span
                  className={`project-badge ${project.category.toLowerCase()}`}
                >
                  {project.category}
                </span>
              </div>

              <p className="project-description">{project.description}</p>

              {project.stats && (
                <div className="project-stats">
                  {project.stats.coverage && (
                    <div className="stat">
                      <FaCode />
                      <span>{project.stats.coverage} coverage</span>
                    </div>
                  )}
                  {project.stats.downloads && (
                    <div className="stat">
                      <FaStar />
                      <span>{project.stats.downloads}</span>
                    </div>
                  )}
                </div>
              )}

              <ul className="project-highlights">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx}>{highlight}</li>
                ))}
              </ul>

              <div className="project-tech">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="project-links">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-link"
                >
                  <FaGithub /> GitHub
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaExternalLinkAlt /> Live Site
                  </a>
                )}
                {project.docUrl && (
                  <a
                    href={project.docUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaExternalLinkAlt /> Documentation
                  </a>
                )}
                {project.googlePlay && (
                  <a
                    href={project.googlePlay}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link google-play"
                  >
                    <FaExternalLinkAlt /> Google Play
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
