import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { 
  FaReact, 
  FaNodeJs, 
  FaHtml5, 
  FaCss3Alt, 
  FaJsSquare, 
  FaPython,
  FaDatabase,
  FaGitAlt
} from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiTailwindcss, SiMongodb } from 'react-icons/si';
import './SkillsSection.css';

const SkillItem = memo(({ icon, name, percentage, color }) => (
  <motion.div 
    className="skill-item"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
  >
    <div className="skill-icon" style={{ color }}>
      {icon}
    </div>
    <div className="skill-details">
      <div className="skill-name">{name}</div>
      <div className="skill-bar">
        <motion.div 
          className="skill-progress"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color 
          }}
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay: 0.3 }}
        />
      </div>
      <div className="skill-percentage">{percentage}%</div>
    </div>
  </motion.div>
));

const SkillsSection = memo(() => {
  const skills = [
    { 
      icon: <FaReact />, 
      name: 'React', 
      percentage: 90, 
      color: '#61DAFB' 
    },
    { 
      icon: <SiNextdotjs />, 
      name: 'Next.js', 
      percentage: 85, 
      color: '#000000' 
    },
    { 
      icon: <SiTypescript />, 
      name: 'TypeScript', 
      percentage: 80, 
      color: '#3178C6' 
    },
    { 
      icon: <FaNodeJs />, 
      name: 'Node.js', 
      percentage: 75, 
      color: '#68A063' 
    },
    { 
      icon: <SiTailwindcss />, 
      name: 'Tailwind CSS', 
      percentage: 85, 
      color: '#38B2AC' 
    },
    { 
      icon: <SiMongodb />, 
      name: 'MongoDB', 
      percentage: 70, 
      color: '#4DB33D' 
    },
    { 
      icon: <FaHtml5 />, 
      name: 'HTML5', 
      percentage: 95, 
      color: '#E34F26' 
    },
    { 
      icon: <FaCss3Alt />, 
      name: 'CSS3', 
      percentage: 90, 
      color: '#1572B6' 
    }
  ];

  return (
    <motion.section 
      className="skills-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="skills-container">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          مهاراتي التقنية
        </motion.h2>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <SkillItem 
              key={index}
              {...skill}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
});

export default SkillsSection;
