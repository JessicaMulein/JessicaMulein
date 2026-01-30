import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
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
              With over <strong>25 years</strong> of software engineering
              experience, I've worn every hat in the technology industry—from
              founding my first ISP at age 13 to architecting enterprise
              solutions at Microsoft, DHI, Dice, and Webfilings.
            </p>
            <p>
              I'm currently the <strong>President and COO</strong> of{" "}
              <a
                href="https://digitaldefiance.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                Digital Defiance
              </a>
              , a 501(c)(3) non-profit focused on open source engineering and
              community empowerment. I also founded <a 
              href="https://muleinstudios.com" target="_blank" rel="noopener
              noreferrer">Mulein Studios LLC</a>, a boutique software and media
              studio dedicated to innovative solutions and creative projects.
            </p>
            <p>
              My expertise spans full-stack development, cloud architecture,
              blockchain technology, and leading high-performing engineering
              teams. I'm passionate about creating elegant, scalable solutions
              and mentoring the next generation of developers.
            </p>
            <p>
              Beyond code, I'm a musician, composer, and advocate for diversity
              in tech. I believe in building not just software, but communities
              and opportunities.
            </p>
          </div>

          <motion.div className="timeline" variants={itemVariants}>
            <div className="timeline-item glass">
              <div className="timeline-year">2022-Present</div>
              <div className="timeline-role">President & COO</div>
              <div className="timeline-company">
                Digital Defiance (Non-Profit)
              </div>
            </div>
            <div className="timeline-item glass">
              <div className="timeline-year">2022-Present</div>
              <div className="timeline-role">Founder</div>
              <div className="timeline-company">
                Mulein Studios LLC
              </div>
            </div>
            <div className="timeline-item glass">
              <div className="timeline-year">2020-Present</div>
              <div className="timeline-role">Software Engineer II</div>
              <div className="timeline-company">Microsoft</div>
            </div>
            <div className="timeline-item glass">
              <div className="timeline-year">1995</div>
              <div className="timeline-role timeline-narrow">Founded Internet Service Provider, Silicon Connections LLC</div>
              <div className="timeline-company">Age 13</div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
