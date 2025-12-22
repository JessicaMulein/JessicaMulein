import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Contact.css";

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="contact" id="contact" ref={ref}>
      <motion.div
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          className="section-title gradient-text"
          variants={itemVariants}
        >
          Let's Connect
        </motion.h2>

        <motion.p className="contact-subtitle" variants={itemVariants}>
          I'm always open to discussing new projects, opportunities, or
          collaborations
        </motion.p>

        <div className="contact-content">
          <motion.div className="contact-info glass" variants={itemVariants}>
            <h3>Get in Touch</h3>
            <div className="contact-methods">
              <a href="mailto:jessica@mulein.com" className="contact-method">
                <FaEnvelope />
                <div>
                  <div className="method-label">Email</div>
                  <div className="method-value">jessica@mulein.com</div>
                </div>
              </a>

              <a
                href="https://github.com/JessicaMulein"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method"
              >
                <FaGithub />
                <div>
                  <div className="method-label">GitHub</div>
                  <div className="method-value">@JessicaMulein</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/jessicamulein/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-method"
              >
                <FaLinkedin />
                <div>
                  <div className="method-label">LinkedIn</div>
                  <div className="method-value">jessicamulein</div>
                </div>
              </a>

              <div className="contact-method">
                <FaMapMarkerAlt />
                <div>
                  <div className="method-label">Location</div>
                  <div className="method-value">Washington State, USA</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="organizations glass" variants={itemVariants}>
            <h3>Organizations</h3>
            <div className="org-list">
              <div className="org-item">
                <h4>Digital Defiance</h4>
                <p className="org-role">President & COO</p>
                <p className="org-desc">
                  501(c)(3) non-profit focused on open source engineering and
                  community empowerment
                </p>
                <a
                  href="https://digitaldefiance.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="org-link"
                >
                  Visit Website →
                </a>
              </div>

              <div className="org-item">
                <h4>Mulein Studios</h4>
                <p className="org-role">Founder</p>
                <p className="org-desc">
                  Software development and consulting, specializing in
                  full-stack solutions
                </p>
                <a
                  href="https://muleinstudios.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="org-link"
                >
                  Visit Website →
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="footer" variants={itemVariants}>
          <p>© 2025 Jessica Mulein. Built with React, TypeScript, and ❤️</p>
          <div className="footer-links">
            <a
              href="https://github.com/JessicaMulein/portfolio"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;
