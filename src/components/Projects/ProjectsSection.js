import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { 
  Gi3DStairs, 
  GiBrain, 
  GiChart, 
  GiAirplane, 
  Gi3DHammer, 
  GiCloudUpload 
} from 'react-icons/gi';
import './ProjectsSection.css';

// Import project images
import project1Image from '../../assets/images/project1.jpg';
import project2Image from '../../assets/images/project2.jpg';
import project3Image from '../../assets/images/project3.jpg';
import project4Image from '../../assets/images/project4.jpg';
import project5Image from '../../assets/images/project5.jpg';
import project6Image from '../../assets/images/project6.jpg';

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const projectCategories = [
    'All', 'Web', 'Mobile', 'AI', 'Data', 'Game', 'Cloud'
  ];

  const projects = [
    {
      id: 'task-manager',
      title: 'تطبيق إدارة المهام',
      description: 'تطبيق ويب متطور لإدارة المهام',
      technologies: ['React', 'Tailwind CSS'],
      githubLink: 'https://github.com/esmail-sayed/task-manager',
      liveLink: 'https://task-manager-demo.vercel.app',
      image: project1Image,
      category: 'Web',
      type: 'Productivity',
      icon: <Gi3DStairs />,
      complexity: 'متوسط',
      duration: '2 أشهر'
    },
    {
      id: 'ecommerce-platform',
      title: 'متجر إلكتروني',
      description: 'منصة تسوق متكاملة',
      technologies: ['Next.js', 'Redux', 'Node.js'],
      githubLink: 'https://github.com/esmail-sayed/ecommerce-platform',
      liveLink: 'https://ecommerce-demo.netlify.app',
      image: project2Image,
      category: 'Web',
      type: 'E-commerce',
      icon: <GiAirplane />,
      complexity: 'معقد',
      duration: '4 أشهر'
    },
    {
      id: 'mobile-education-app',
      title: 'تطبيق محمول للتعليم',
      description: 'تطبيق تعليمي تفاعلي',
      technologies: ['React Native', 'Firebase'],
      githubLink: 'https://github.com/esmail-sayed/mobile-education-app',
      liveLink: 'https://mobile-app-demo.app.link',
      image: project3Image,
      category: 'Mobile',
      type: 'Educational',
      icon: <GiAirplane />,
      complexity: 'متوسط',
      duration: '3 أشهر'
    },
    {
      id: 'data-visualization',
      title: 'لوحة تحليلات البيانات',
      description: 'أداة تصور بيانات تفاعلية',
      technologies: ['Vue.js', 'D3.js', 'Chart.js'],
      githubLink: 'https://github.com/esmail-sayed/data-visualization',
      liveLink: 'https://data-dashboard-demo.herokuapp.com',
      image: project4Image,
      category: 'Data',
      type: 'Analytics',
      icon: <GiChart />,
      complexity: 'متقدم',
      duration: '3 أشهر'
    },
    {
      id: 'ai-recommendation',
      title: 'تطبيق الذكاء الاصطناعي',
      description: 'نظام توصية ذكي',
      technologies: ['TensorFlow', 'React', 'Flask'],
      githubLink: 'https://github.com/esmail-sayed/ai-recommendation',
      liveLink: 'https://ai-demo.cloud.app',
      image: project5Image,
      category: 'AI',
      type: 'Machine Learning',
      icon: <GiBrain />,
      complexity: 'خبير',
      duration: '6 أشهر'
    },
    {
      id: 'multiplayer-game',
      title: 'تطبيق الألعاب الإلكترونية',
      description: 'منصة ألعاب متعددة اللاعبين',
      technologies: ['Unity', 'C#', 'WebGL'],
      githubLink: 'https://github.com/esmail-sayed/multiplayer-game',
      liveLink: 'https://game-platform-demo.vercel.app',
      image: project6Image,
      category: 'Game',
      type: 'Multiplayer',
      icon: <Gi3DHammer />,
      complexity: 'متقدم',
      duration: '5 أشهر'
    }
  ];

  const filteredProjects = useMemo(() => 
    selectedCategory === 'All' 
      ? projects 
      : projects.filter(project => project.category === selectedCategory),
    [selectedCategory]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300
      }
    }
  };

  return (
    <motion.section 
      className="projects-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="projects-container">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          مشاريعي
        </motion.h2>

        <div className="project-categories">
          {projectCategories.map((category) => (
            <motion.button
              key={category}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        
        <AnimatePresence>
          {filteredProjects.length > 0 ? (
            <motion.div 
              className="projects-grid"
              variants={containerVariants}
              layout
            >
              {filteredProjects.map((project) => (
                <motion.div 
                  key={project.id} 
                  className="project-card"
                  variants={projectVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="project-image">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      loading="lazy"
                    />
                    <div className="project-type-icon">
                      {project.icon}
                    </div>
                  </div>
                  
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    
                    <div className="project-technologies">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>

                    <div className="project-metadata">
                      <span>المدة: {project.duration}</span>
                      <span>التعقيد: {project.complexity}</span>
                    </div>

                    <div className="project-links">
                      <a 
                        href={project.githubLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <FaGithub /> GitHub
                      </a>
                      <a 
                        href={project.liveLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt /> Live Demo
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="no-projects">
              لا توجد مشاريع في هذه الفئة
            </div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
};

export default ProjectsSection;
