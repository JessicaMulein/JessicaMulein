import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaReact,
  FaNode,
  FaPython,
  FaDocker,
  FaGitAlt,
  FaAws,
  FaDatabase,
  FaMicrosoft,
} from "react-icons/fa";
import {
  SiTypescript,
  SiMongodb,
  SiPostgresql,
  SiKubernetes,
  SiRedis,
  SiExpress,
} from "react-icons/si";
import "./Skills.css";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", icon: <FaReact />, level: 95 },
      { name: "TypeScript", icon: <SiTypescript />, level: 95 },
      { name: "Vue.js", icon: <FaReact />, level: 85 },
      { name: "Angular", icon: <FaReact />, level: 80 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNode />, level: 95 },
      { name: "Express", icon: <SiExpress />, level: 95 },
      { name: "Python", icon: <FaPython />, level: 85 },
      { name: "C#/.NET", icon: <FaMicrosoft />, level: 90 },
    ],
  },
  {
    title: "Databases",
    skills: [
      { name: "MongoDB", icon: <SiMongodb />, level: 90 },
      { name: "PostgreSQL", icon: <SiPostgresql />, level: 90 },
      { name: "Redis", icon: <SiRedis />, level: 85 },
      { name: "SQL Server", icon: <FaDatabase />, level: 90 },
    ],
  },
  {
    title: "DevOps & Cloud",
    skills: [
      { name: "Docker", icon: <FaDocker />, level: 90 },
      { name: "Kubernetes", icon: <SiKubernetes />, level: 80 },
      { name: "AWS", icon: <FaAws />, level: 85 },
      { name: "Git/GitHub", icon: <FaGitAlt />, level: 95 },
    ],
  },
];

const Skills = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="skills" id="skills" ref={ref}>
      <motion.div
        className="skills-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.h2
          className="section-title gradient-text"
          variants={itemVariants}
        >
          Technical Skills
        </motion.h2>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              className="skill-category glass"
              variants={itemVariants}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <div className="skill-name">
                        <span className="skill-icon">{skill.icon}</span>
                        {skill.name}
                      </div>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-progress"
                        initial={{ width: 0 }}
                        animate={
                          inView ? { width: `${skill.level}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 1,
                          delay: catIndex * 0.1 + skillIndex * 0.1,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="additional-skills glass" variants={itemVariants}>
          <h3>Also experienced with:</h3>
          <div className="tags">
            {[
              "GraphQL",
              "REST APIs",
              "Microservices",
              "Blockchain",
              "WebSockets",
              "CI/CD",
              "Testing (Jest, Vitest)",
              "Monorepos (NX)",
              "Cryptography",
              "VS Code Extensions",
              "MCP Tools",
              "i18n",
              "Material-UI",
              "Agile/Scrum",
            ].map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Skills;
