import React from 'react';
import { motion } from 'framer-motion';

const SkillsShowcase = () => {
  const skills = [
    { name: 'React', level: 90, color: '#61DAFB' },
    { name: 'Python', level: 85, color: '#3776AB' },
    { name: 'JavaScript', level: 88, color: '#F7DF1E' },
    { name: 'Node.js', level: 80, color: '#68A063' }
  ];

  return (
    <motion.div 
      className="skills-showcase"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h2>معرض المهارات التقنية</h2>
      <div className="skills-grid">
        {skills.map((skill, index) => (
          <motion.div 
            key={index}
            className="skill-card"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.2,
              type: "spring",
              stiffness: 100
            }}
          >
            <div 
              className="skill-progress" 
              style={{ 
                width: `${skill.level}%`, 
                backgroundColor: skill.color 
              }}
            ></div>
            <div className="skill-name">{skill.name}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsShowcase;
