import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaStar,
  FaCode,
  FaBook,
  FaNpm,
  FaChartLine,
} from "react-icons/fa";
import { GrAppleAppStore } from "react-icons/gr";
import "./Projects.css";

interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  liveUrl?: string;
  projectUrl?: string;
  npmPackage?: string;
  appleAppStore?: string;
  docUrl?: string;
  googlePlay?: string;
  stats?: {
    stars?: number;
    downloads?: string;
    coverage?: string;
    tests?: string;
  };
  highlights: string[];
  category: "Research" | "Production" | "Legacy";
}

const projects: Project[] = [
  {
    title: "BrightChain",
    description:
      "A 20-year vision for a next-generation decentralized ecosystem featuring an Owner-Free File System and cryptographic sovereignty.",
    tech: ["TypeScript", "NX", "React", "Express", "MongoDB"],
    github: "https://github.com/Digital-Defiance/BrightChain",
    projectUrl: "https://github.brightchain.org",
    liveUrl: "https://brightchain.org",
    category: "Research",
    highlights: [
      "ECIES encryption with AES-256-GCM for absolute privacy",
      "Architected the 'Owner-Free File System' (OFFS) protocol",
      "Decentralized identity and zero-knowledge storage",
      "Cryptographic voting and consensus mechanisms",
    ],
  },
  {
    title: "BrightDate",
    description:
      "A timezone-free decimal time protocol anchored to the J2000.0 epoch, replacing legacy temporal complexity with a single universal scalar.",
    tech: ["TypeScript", "Rust", "J2000.0", "Decimal Math"],
    github: "https://github.com/Digital-Defiance/BrightDate",
    projectUrl: "https://brightdate.org",
    category: "Production",
    highlights: [
      "Eliminates 'Legacy Tax' (DST, timezones, leap seconds)",
      "High-precision J2000.0 astronomical anchoring",
      "Native Rust implementation for sub-microsecond precision",
      "Supports cross-platform synchronization for distributed systems",
    ],
  },
  {
    title: "BrightDate StatusBar",
    description:
      "A native macOS menu bar application providing real-time BrightDate display in the menu bar, built with Swift and SwiftUI.",
    tech: ["Swift", "SwiftUI", "BrightDate"],
    github: "https://github.com/Digital-Defiance/brightdate-macos-statusbar",
    category: "Production",
    highlights: [
      "Real-time BrightDate display in the macOS menu bar",
      "Built with Swift and SwiftUI for native performance",
      "Seamless integration with BrightDate ecosystem",
    ],
  },
  {
    title: "BrightDate MacOS/IOS Widget",
    description:
      "A desktop widget for macOS and iOS that displays real-time BrightDate information, built with SwiftUI",
    tech: ["Swift", "SwiftUI", "BrightDate"],
    github: "https://github.com/Digital-Defiance/brightdate-apple-widget",
    category: "Production",
    highlights: [
      "Real-time BrightDate display in a desktop widget",
      "Built with SwiftUI for native performance",
      "Seamless integration with BrightDate ecosystem",
    ],
  },
  {
    title: "BrightDate Android Widget",
    description:
      "A simple Android widget that displays real-time BrightDate information, built with Kotlin.",
    tech: ["Kotlin", "Android", "BrightDate"],
    github: "https://github.com/Digital-Defiance/brightdate-android-widget",
    googlePlay:
      "https://play.google.com/store/apps/details?id=org.brightchain.brightdate.widget",
    category: "Production",
    highlights: [
      "Real-time BrightDate display in an Android widget",
      "Built with Kotlin for native performance",
      "Seamless integration with BrightDate ecosystem",
    ],
  },
  {
    title: "BrightDate Android Alarm Clock",
    description:
      "A native Android alarm clock application that uses BrightDate for timekeeping, built with Kotlin.",
    tech: ["Kotlin", "Android", "BrightDate"],
    github: "https://github.com/Digital-Defiance/brightdate-android-alarm",
    googlePlay:
      "https://play.google.com/store/apps/details?id=org.brightchain.brightdate.alarm",
    category: "Production",
    highlights: [
      "Real-time BrightDate display in an Android alarm clock",
      "Built with Kotlin for native performance",
      "Seamless integration with BrightDate ecosystem",
    ],
  },
  {
    title: "BrightDate Android WearOS Watch Face",
    description:
      "A WearOS watch face that displays real-time BrightDate information, built with Kotlin.",
    tech: ["Kotlin", "WearOS", "BrightDate"],
    github: "https://github.com/Digital-Defiance/brightdate-wearos",
    googlePlay:
      "https://play.google.com/store/apps/details?id=org.brightchain.brightdate",
    category: "Production",
    highlights: [
      "Real-time BrightDate display in a WearOS watch face",
      "Built with Kotlin for native performance",
      "Seamless integration with BrightDate ecosystem",
    ],
  },
  {
    title: "BSH (BrightShell)",
    description:
      "A high-performance shell environment (forked from Zsh) that treats BrightDate as a native temporal primitive.",
    tech: ["Zsh", "C", "Shell Scripting", "BrightDate"],
    github: "https://github.com/Digital-Defiance/bsh",
    projectUrl: "https://bsh.digitaldefiance.org",
    category: "Production",
    highlights: [
      "Native BrightDate glob modifiers (e.g., *.log(.m-0.01))",
      "Immutable birth-time (.b) file filtering logic",
      "Shadowed legacy commands (date, uptime) for decimal parity",
      "Integrated with Oh-My-BSH for enterprise customization",
    ],
  },
  {
    title: "Bright-Findutils",
    description:
      "Port of GNU Findutils (find, xargs, locate) re-engineered to support native decimal time filtering and high-precision scalars.",
    tech: ["C", "GNU Coreutils", "Decimal Filtering"],
    github: "https://github.com/Digital-Defiance/findutils-brightdate",
    projectUrl: "https://findutils.digitaldefiance.org",
    category: "Production",
    highlights: [
      "Native -mtime and -atime support for floating-point decimals",
      "Atomic temporal sorting for multi-million file systems",
      "Seamless integration with BSH environment variables",
      "High-velocity log auditing via milliday precision",
    ],
  },
  {
    title: "Oh-My-BSH",
    description:
      "The official configuration framework and widget ecosystem for BrightShell, featuring highly customizable temporal interfaces.",
    tech: ["TypeScript", "React", "Mobile Widgets", "RGB UI"],
    github: "https://github.com/Digital-Defiance/ohmybsh",
    projectUrl: "https://ohmybsh.digitaldefiance.org",
    category: "Research",
    highlights: [
      "Cross-platform BrightDate mobile widget with RGB picker",
      "Enterprise theme engine for secure terminal environments",
      "Plugin architecture for custom decimal time complications",
      "Central hub for the Digital Defiance user experience",
    ],
  },
  {
    title: "EECP - Ephemeral Encrypted Collaboration Protocol",
    description:
      "Zero-knowledge, self-destructing collaborative workspace with cryptographic guarantees of content unreadability after expiration.",
    tech: ["TypeScript", "React 19", "Yjs CRDT", "AES-256-GCM", "Nx"],
    github: "https://github.com/Digital-Defiance/digitaldefiance-eecp",
    projectUrl: "https://digital-defiance.github.io/digitaldefiance-eecp",
    category: "Research",
    stats: {
      tests: "500+ tests",
      coverage: "Property-based",
    },
    highlights: [
      "Zero-knowledge server with encrypted CRDT collaboration",
      "Temporal key derivation with automated rotation",
      "Multi-recipient encryption via ECIES (secp256k1)",
      "Designed for high-integrity, ephemeral communication",
    ],
  },
  {
    title: "Node Accelerate",
    description:
      "High-performance Apple Accelerate framework bindings for Node.js. Optimized for Apple Silicon architectures (M1 through M4 Max).",
    tech: ["TypeScript", "Rust", "Apple Silicon", "C++"],
    github: "https://github.com/Digital-Defiance/node-accelerate",
    projectUrl: "https://digital-defiance.github.io/node-accelerate/",
    npmPackage:
      "https://www.npmjs.com/package/@digitaldefiance/node-accelerate",
    category: "Production",
    highlights: [
      "283x faster matrix operations via hardware acceleration",
      "5-8x faster vector operations on M-series chips",
      "Zero-copy memory management between Node and native layers",
      "Architected for scientific and cryptographic computing",
    ],
  },
  {
    title: "AI Capabilities Suite",
    description:
      "Enterprise-grade Model Context Protocol (MCP) tools suite with secure debugging and process management.",
    tech: ["TypeScript", "MCP", "Docker", "NPM"],
    github: "https://github.com/Digital-Defiance/ai-capabilities-suite",
    projectUrl: "https://digital-defiance.github.io/ai-capabilities-suite/",
    category: "Production",
    stats: {
      coverage: "94.53%",
      downloads: "Marketplace + NPM",
    },
    highlights: [
      "25+ debugging tools with enterprise-grade security",
      "1,059 tests with a 99.81% pass rate",
      "Screenshot capture with automated PII masking",
      "Full VS Code Marketplace and NPM integration",
    ],
  },
  {
    title: "Express Suite",
    description:
      "Comprehensive MERN stack monorepo providing foundational i18n, ECIES cryptography, and authentication services.",
    tech: ["TypeScript", "Express.js", "React", "MongoDB", "NX"],
    github: "https://github.com/Digital-Defiance/express-suite",
    projectUrl: "https://digital-defiance.github.io/express-suite/",
    category: "Production",
    highlights: [
      "End-to-end ECIES encryption for browser and Node.js",
      "Enterprise-grade internationalization (i18n) framework",
      "Modular authentication and database abstractions",
      "Integrated Monorepo generator CLI",
    ],
  },
  {
    title: "Kliply",
    description:
      "A high-performance clipboard manager for macOS, utilizing native event-driven architecture and Secure Enclave principles.",
    tech: ["Swift", "SwiftUI", "macOS", "AppKit"],
    github: "https://github.com/Digital-Defiance/kliply",
    appleAppStore: "https://apps.apple.com/us/app/kliply/id6757326539?mt=12",
    category: "Production",
    highlights: [
      "Privacy-focused: History stored in-memory, no disk writes",
      "Smart exclusion for 1Password and sensitive apps",
      "Native Apple Silicon optimization for zero-latency",
      "Global hotkey integration with rich metadata previews",
    ],
  },
  {
    title: "Enclave Bridge",
    description:
      "Native macOS bridge exposing Apple Secure Enclave cryptographic operations to Node.js via Unix file sockets.",
    tech: ["Swift", "TypeScript", "Secure Enclave", "Unix IPC"],
    github: "https://github.com/Digital-Defiance/enclave-bridge",
    npmPackage:
      "https://www.npmjs.com/package/@digitaldefiance/enclave-bridge-client",
    appleAppStore:
      "https://apps.apple.com/us/app/enclave-bridge/id6758280835?mt=12",
    category: "Production",
    highlights: [
      "Hardware-backed P-256 keys via Secure Enclave",
      "Zero Trust IPC: All communication encrypted with ECIES",
      "Fast local Unix Socket communication protocol",
      "Menu bar monitoring for real-time connection status",
    ],
  },
  {
    title: "Secrets.js (Refactored)",
    description:
      "Advanced implementation of Shamir's Secret Sharing for secure data splitting and threshold recovery.",
    tech: ["Shamir's Secret Sharing", "TypeScript", "CSPRNG"],
    github: "https://github.com/Digital-Defiance/secrets-ts",
    category: "Production",
    npmPackage: "https://www.npmjs.com/package/@digitaldefiance/secrets",
    projectUrl: "https://digital-defiance.github.io/secrets-ts",
    highlights: [
      "Cure53 security audit compliance with zero issues",
      "Up to 1,048,575 shares via Galois field arithmetic",
      "Configurable t-of-n threshold recovery for keys/files",
      "Native support for both Browser and Node.js environments",
    ],
  },
  {
    title: "Luhn Mod N",
    description:
      "Enterprise-grade check digit algorithm supporting bases 2-16 with full type safety and zero dependencies.",
    tech: ["TypeScript", "Algorithms", "SOLID Architecture"],
    github: "https://github.com/Digital-Defiance/Luhn-mod-n-ts",
    npmPackage: "https://www.npmjs.com/package/@digitaldefiance/luhn-mod-n",
    projectUrl: "https://digital-defiance.github.io/Luhn-mod-n-ts",
    category: "Production",
    stats: {
      tests: "66 tests",
      coverage: "100%",
    },
    highlights: [
      "Supports multi-base validation (Binary to Hexadecimal)",
      "Advanced error detection for transposition and single-digits",
      "Generic services for Strings, BigInts, and Arrays",
      "Factory pattern implementation for enterprise extensibility",
    ],
  },
  {
    title: "Akira",
    description:
      "VS Code extension for Spec-Driven Development using EARS syntax and property-based testing integration.",
    tech: ["TypeScript", "VS Code API", "MCP", "EARS"],
    github: "https://github.com/Digital-Defiance/Akira",
    category: "Research",
    highlights: [
      "Automated Requirements → Design → Task workflow",
      "MCP integration for real-time AI architectural assistance",
      "Seamless integration with fast-check for property testing",
      "Enterprise task management hooks",
    ],
  },
  {
    title: "Star Realms Assistant",
    description:
      "High-fidelity cross-platform application for tracking complex gameplay statistics and authority graphing.",
    tech: ["React", "TypeScript", "Material-UI", "Capacitor"],
    github: "https://github.com/Digital-Defiance/StarRealmsAssistant",
    liveUrl: "https://starrealmsassistant.com",
    category: "Production",
    highlights: [
      "Real-time authority graphing and session statistics",
      "Mobile iOS/Android support via Capacitor",
      "800+ unit tests ensuring game state integrity",
      "Offline-first architecture with local persistence",
    ],
  },
  {
    title: "Dominion Assistant",
    description:
      "Comprehensive game management and scoring engine for complex deck-building ecosystems.",
    tech: ["React", "TypeScript", "Material-UI", "NX"],
    github: "https://github.com/Digital-Defiance/DominionAssistant",
    liveUrl: "https://dominionassistant.com",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.digitaldefiance.dominionassistant",
    category: "Production",
    highlights: [
      "Dynamic scoring algorithms for all 15+ expansions",
      "Player turn and state management",
      "Automated turn tracking and deck-state estimation",
      "Available on Google Play Store",
    ],
  },
  {
    title: "OpenBook",
    description:
      "Git-versioned markdown filesystem to MongoDB orchestrator for non-profit knowledge management.",
    tech: ["Node.js", "Express", "MongoDB", "Git"],
    github: "https://github.com/Digital-Defiance/OpenBook",
    category: "Research",
    highlights: [
      "Transforms Markdown repositories into queryable databases",
      "Full version control for organizational documentation",
      "Automated Excel export and reporting engines",
      "Designed for distributed non-profit data transparency",
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
        staggerChildren: 0.1,
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
          Selected Projects & Research
        </motion.h2>

        <motion.p className="projects-subtitle" variants={projectVariants}>
          A portfolio of foundational architecture, open-source stewardship, and
          academic research.
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
                  {project.stats.tests && (
                    <div className="stat">
                      <FaChartLine />
                      <span>{project.stats.tests}</span>
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
                {project.npmPackage && (
                  <a
                    href={project.npmPackage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaNpm /> NPM
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaExternalLinkAlt /> Live
                  </a>
                )}
                {project.projectUrl && (
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaBook /> Docs
                  </a>
                )}
                {project.appleAppStore && (
                  <a
                    href={project.appleAppStore}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link apple-app-store"
                  >
                    <GrAppleAppStore /> App Store
                  </a>
                )}
                {project.googlePlay && (
                  <a
                    href={project.googlePlay}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link google-play"
                  >
                    <FaExternalLinkAlt /> Play Store
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
