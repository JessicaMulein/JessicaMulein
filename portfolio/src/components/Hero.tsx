import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Hero.css";

interface HeroProps {
  scrollY: number;
}

const Hero = ({ scrollY }: HeroProps) => {
  const parallaxOffset = scrollY * 0.5;

  return (
    <section className="hero" id="home">
      <div
        className="hero-background"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div className="particles" />
      </div>

      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Jessica Mulein
        </motion.h1>

        <motion.h2
          className="hero-subtitle gradient-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Software Engineer & Architect
        </motion.h2>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          25 years of experience crafting elegant solutions
          <br />
          From ISP founder at 13 to enterprise architect at Microsoft
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn btn-secondary">
            Get in Touch
          </a>
        </motion.div>

        <motion.div
          className="social-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            href="https://github.com/JessicaMulein"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/jessicamulein/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:jessica@mulein.com">
            <FaEnvelope />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <div className="mouse">
          <div className="wheel" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
