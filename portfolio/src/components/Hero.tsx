import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { BrightDate } from "@brightchain/brightdate";
import "./Hero.css";

interface HeroProps {
  scrollY: number;
}

const Hero = ({ scrollY }: HeroProps) => {
  const parallaxOffset = scrollY * 0.5;
  const [brightDateNow, setBrightDateNow] = useState(() =>
    BrightDate.now().toString(),
  );

  useEffect(() => {
    const id = setInterval(() => {
      setBrightDateNow(BrightDate.now().toString());
    }, 100);
    return () => clearInterval(id);
  }, []);

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
          Software Architect | Musician
        </motion.h2>

        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Architecting the future of decentralized sovereignty.
          <br />
          From ISP founder at age 13 to foundational systems researcher.
          <br />
          Now is the time.
        </motion.p>

        <motion.div
          className="brightdate-callout"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <p>
            Speaking of time, I’m currently building the future of time itself.
          </p>
          <p>
            I’m developing{" "}
            <a
              rel="noopener"
              href="https://brightdate.brightchain.org"
              target="_blank"
            >
              BrightDate
            </a>
            —a universal decimal time scalar anchored to the J2000.0 epoch. Most
            of our modern timekeeping is a patchwork of Babylonian base-60 logic
            and complex timezone offsets: a “Legacy Tax” that complicates
            distributed systems and human coordination alike.
          </p>
          <p>
            BrightDate replaces the calendar-clock mess with a single, linear
            <code>f64</code> coordinate. By treating time as a continuous scalar
            from a fixed astronomical point, we eliminate the need for local
            translations. Whether you're orchestrating containers, logging
            decentralized ledger events, or just setting an alarm on your desk,
            BrightDate provides a high-precision, human-readable interface for a
            spacefaring civilization.
          </p>
          <p>
            It isn't just a library; it’s a refactor of how we interface with
            the Fourth Dimension.
          </p>
          <div className="hero-live">
            <span className="hero-live-label">Right now:</span>
            <span className="hero-live-value">{`BD: ${brightDateNow}`}</span>
          </div>
        </motion.div>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="/blog" className="btn btn-secondary">
            Blog
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
