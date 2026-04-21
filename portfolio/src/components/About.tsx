import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ACSLogo from '../assets/American_Cancer_Society_Logo.svg';
import "./About.css";

const About = () => {
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
    <section className="about" id="about" ref={ref}>
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          className="section-title gradient-text"
          variants={itemVariants}
        >
          About Me
        </motion.h2>

        <motion.div className="about-content" variants={itemVariants}>
          <div className="about-text glass">
            <p>
              With over <strong>35 years</strong> of engagement with code, I have spent my career exploring the 
              structural integrity of digital systems. From founding my first ISP at age 13 to architecting 
              foundational solutions at <strong>Microsoft</strong>, I have always been driven by the 
              pursuit of elegant, zero-knowledge architecture.
            </p>
            <p>
              I currently serve as the <strong>Founder and Executive Director</strong> of{" "}
              <a href="https://digitaldefiance.org" target="_blank" rel="noopener noreferrer">
                Digital Defiance
              </a>
              , a 501(c)(3) non-profit engineering guild dedicated to privacy-first open source innovation. 
              Through <a href="https://muleinstudios.com" target="_blank" rel="noopener noreferrer">
              Mulein Studios</a>, I continue to steward bespoke software and media projects that bridge 
              the gap between technical precision and creative expression.
            </p>
            <p>
              My current research focus is <strong><a href="https://github.brightchain.org">BrightChain</a></strong>—a 20-year vision for a 
              decentralized filesystem that empowers users with absolute digital sovereignty. I specialize 
              in high-performance computing, cryptographic security, and the development of 
              "Owner-Free" ecosystems.
            </p>
            <p>
              Beyond the terminal, I am a musician, composer, and advocate for neurodivergent voices 
              in technology. I believe that the most resilient systems are built not just with code, 
              but with a deep commitment to community and human rights.
            </p>
            <p>
              I'm also building on borrowed time. I have incurable cancer — and while that's not the 
              defining fact of my life, it does sharpen the focus. BrightChain is a 20-year vision, 
              and I intend to see it through as far as I can. If my work resonates with you, now is 
              the time to <a href="https://github.brightchain.org" target="_blank" rel="noopener noreferrer">get involved</a>. 
              If you want to pick my brain, <a href="#contact">reach out</a>. And if you're moved 
              to do something beyond code, consider supporting the{" "}
              <a href="https://donate.cancer.org" target="_blank" rel="noopener noreferrer" className="acs-link">
                <img src={ACSLogo} height={40} />American Cancer Society
              </a>.
            </p>
          </div>

          <motion.div className="timeline" variants={itemVariants}>
            <div className="timeline-item glass">
              <div className="timeline-year">2022-Present</div>
              <div className="timeline-role">Founder & Executive Director</div>
              <div className="timeline-company">
                Digital Defiance (501c3)
              </div>
            </div>
            <div className="timeline-item glass">
              <div className="timeline-year">2025-Present</div>
              <div className="timeline-role">Software Architect</div>
              <div className="timeline-company">Microsoft</div>
            </div>
            <div className="timeline-item glass">
              <div className="timeline-year">2022-Present</div>
              <div className="timeline-role">Founder, Principal Creative</div>
              <div className="timeline-company">
                Mulein Studios LLC
              </div>
            </div>
            <div className="timeline-item glass">
              <div className="timeline-year">2020-2025</div>
              <div className="timeline-role">Software Engineer II</div>
              <div className="timeline-company">Microsoft</div>
            </div>
            <div className="timeline-item glass">
              <div className="timeline-year">1995-Present</div>
              <div className="timeline-role">Lifetime Engineer</div>
              <div className="timeline-company">35+ Years of Development</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
