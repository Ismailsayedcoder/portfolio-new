import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaCode, FaRocket, FaMobileAlt, FaDesktop } from 'react-icons/fa';
import { SiReact, SiTypescript, SiNodedotjs, SiPython, SiDocker, SiKubernetes } from 'react-icons/si';
import './Project.css';

// Ensure ProjectDetails is defined before the component
const ProjectDetails = {
  webProjects: [
    {
      id: 1,
      name: 'AI Chat Assistant',
      description: 'منصة ذكاء اصطناعي متقدمة للتواصل الذكي',
      technologies: ['React', 'TypeScript', 'OpenAI', 'WebSockets', 'Docker'],
      techIcons: [SiReact, SiTypescript, SiNodedotjs, SiDocker],
      githubLink: 'https://github.com/example/ai-chat',
      demoLink: 'https://ai-chat-demo.vercel.app',
      icon: '🤖',
      category: 'web',
      complexity: 'متقدم',
      fullDescription: 'منصة ذكاء اصطناعي متقدمة تستخدم تقنيات الذكاء الاصطناعي للتواصل الذكي والتفاعل مع المستخدمين.'
    },
    {
      id: 2,
      name: 'E-Commerce Platform',
      description: 'منصة تسوق إلكترونية متكاملة',
      technologies: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Stripe'],
      techIcons: [SiReact, SiNodedotjs, SiDocker, SiKubernetes],
      githubLink: 'https://github.com/example/ecommerce',
      demoLink: 'https://ecommerce-platform.vercel.app',
      icon: '🛍️',
      category: 'web',
      complexity: 'متقدم',
      fullDescription: 'منصة تسوق إلكترونية شاملة مع نظام دفع متكامل وإدارة المنتجات المتقدمة.'
    },
    {
      id: 3,
      name: 'Real-Time Collaboration Tool',
      description: 'أداة تعاون فوري للفرق المبدعة',
      technologies: ['React', 'WebSockets', 'TypeScript', 'Firebase'],
      techIcons: [SiReact, SiTypescript, SiNodedotjs],
      githubLink: 'https://github.com/example/collaboration-tool',
      demoLink: 'https://collaboration-tool.vercel.app',
      icon: '🤝',
      category: 'web',
      complexity: 'متوسط',
      fullDescription: 'أداة تعاون فورية تمكن الفرق من العمل معًا في الوقت الحقيقي مع أدوات مشاركة متقدمة.'
    },
    {
      id: 4,
      name: 'Machine Learning Dashboard',
      description: 'لوحة متابعة للتحليلات باستخدام التعلم الآلي',
      technologies: ['React', 'Python', 'Machine Learning', 'D3.js', 'TensorFlow'],
      techIcons: [SiReact, SiPython, SiNodedotjs],
      githubLink: 'https://github.com/example/ml-dashboard',
      demoLink: 'https://ml-dashboard-demo.vercel.app',
      icon: '📊',
      category: 'web',
      complexity: 'متقدم',
      fullDescription: 'لوحة متابعة متقدمة تستخدم التعلم الآلي لتحليل البيانات وتقديم رؤى عميقة.'
    },
    {
      id: 5,
      name: 'Blockchain Voting Platform',
      description: 'منصة تصويت آمنة ومشفرة',
      technologies: ['React', 'Solidity', 'Ethereum', 'Web3.js', 'TypeScript'],
      techIcons: [SiReact, SiNodedotjs, SiKubernetes],
      githubLink: 'https://github.com/example/blockchain-voting',
      demoLink: 'https://blockchain-voting.vercel.app',
      icon: '🗳️',
      category: 'web',
      complexity: 'متقدم',
      fullDescription: 'منصة تصويت إلكترونية آمنة تستخدم تقنية البلوكتشين لضمان الشفافية والأمان.'
    },
    {
      id: 6,
      name: 'Social Media Analytics Tool',
      description: 'أداة تحليل وسائل التواصل الاجتماعي',
      technologies: ['React', 'Node.js', 'Machine Learning', 'GraphQL', 'Redis'],
      techIcons: [SiReact, SiNodedotjs, SiDocker],
      githubLink: 'https://github.com/example/social-analytics',
      demoLink: 'https://social-analytics-tool.vercel.app',
      icon: '📈',
      category: 'web',
      complexity: 'متوسط',
      fullDescription: 'أداة متقدمة لتحليل البيانات من وسائل التواصل الاجتماعي باستخدام الذكاء الاصطناعي.'
    },
    {
      id: 7,
      name: 'Cloud Development Platform',
      description: 'منصة تطوير سحابية متكاملة',
      technologies: ['React', 'Kubernetes', 'Docker', 'CI/CD', 'Microservices'],
      techIcons: [SiReact, SiKubernetes, SiDocker],
      githubLink: 'https://github.com/example/cloud-dev-platform',
      demoLink: 'https://cloud-dev-platform.vercel.app',
      icon: '☁️',
      category: 'web',
      complexity: 'متقدم',
      fullDescription: 'منصة متكاملة لتطوير وإدارة التطبيقات السحابية باستخدام أحدث التقنيات.'
    }
  ],
  mobileProjects: [
    {
      id: 1,
      name: 'Fitness Tracking App',
      description: 'تطبيق متكامل لتتبع اللياقة البدنية',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'Machine Learning'],
      techIcons: [SiReact, SiTypescript, SiNodedotjs],
      githubLink: 'https://github.com/example/fitness-app',
      demoLink: 'https://fitness-app-demo.vercel.app',
      icon: '💪',
      category: 'mobile',
      complexity: 'متقدم',
      fullDescription: 'تطبيق شامل لتتبع اللياقة البدنية يستخدم الذكاء الاصطناعي لتقديم توصيات مخصصة.'
    },
    {
      id: 2,
      name: 'Language Learning App',
      description: 'تطبيق متقدم لتعلم اللغات',
      technologies: ['React Native', 'AI', 'Machine Learning', 'Firebase'],
      techIcons: [SiReact, SiNodedotjs],
      githubLink: 'https://github.com/example/language-learning-app',
      demoLink: 'https://language-app-demo.vercel.app',
      icon: '🌐',
      category: 'mobile',
      complexity: 'متوسط',
      fullDescription: 'تطبيق مبتكر لتعلم اللغات باستخدام تقنيات الذكاء الاصطناعي والتعلم التفاعلي.'
    },
    {
      id: 3,
      name: 'Smart Home Control',
      description: 'تطبيق التحكم الذكي في المنزل',
      technologies: ['React Native', 'IoT', 'Machine Learning', 'Firebase'],
      techIcons: [SiReact, SiNodedotjs, SiKubernetes],
      githubLink: 'https://github.com/example/smart-home-app',
      demoLink: 'https://smart-home-app-demo.vercel.app',
      icon: '🏠',
      category: 'mobile',
      complexity: 'متقدم',
      fullDescription: 'تطبيق متكامل للتحكم في الأجهزة المنزلية الذكية باستخدام تقنيات إنترنت الأشياء.'
    },
    {
      id: 4,
      name: 'Mental Health Companion',
      description: 'تطبيق الدعم النفسي الذكي',
      technologies: ['React Native', 'AI', 'Machine Learning', 'Firebase'],
      techIcons: [SiReact, SiNodedotjs],
      githubLink: 'https://github.com/example/mental-health-app',
      demoLink: 'https://mental-health-companion.vercel.app',
      icon: '🧠',
      category: 'mobile',
      complexity: 'متوسط',
      fullDescription: 'تطبيق ذكي للدعم النفسي يقدم استشارات وتمارين للصحة العقلية باستخدام الذكاء الاصطناعي.'
    },
    {
      id: 5,
      name: 'Augmented Reality Education',
      description: 'تطبيق تعليمي بالواقع المعزز',
      technologies: ['React Native', 'AR', 'Machine Learning', 'Firebase'],
      techIcons: [SiReact, SiNodedotjs],
      githubLink: 'https://github.com/example/ar-education-app',
      demoLink: 'https://ar-education-app.vercel.app',
      icon: '🔬',
      category: 'mobile',
      complexity: 'متقدم',
      fullDescription: 'تطبيق تعليمي مبتكر يستخدم تقنية الواقع المعزز لتعزيز التعلم التفاعلي.'
    },
    {
      id: 6,
      name: 'Personal Finance Manager',
      description: 'مدير المالية الشخصية الذكي',
      technologies: ['React Native', 'AI', 'Machine Learning', 'Firebase'],
      techIcons: [SiReact, SiNodedotjs],
      githubLink: 'https://github.com/example/finance-manager-app',
      demoLink: 'https://finance-manager-app.vercel.app',
      icon: '💰',
      category: 'mobile',
      complexity: 'متوسط',
      fullDescription: 'تطبيق إدارة مالية ذكي يقدم توصيات مالية مخصصة وتحليلات متقدمة.'
    },
    {
      id: 7,
      name: 'Travel Companion App',
      description: 'تطبيق مرافق السفر الذكي',
      technologies: ['React Native', 'AI', 'Maps API', 'Machine Learning'],
      techIcons: [SiReact, SiNodedotjs],
      githubLink: 'https://github.com/example/travel-companion-app',
      demoLink: 'https://travel-companion-app.vercel.app',
      icon: '✈️',
      category: 'mobile',
      complexity: 'متقدم',
      fullDescription: 'تطبيق سفر ذكي يقدم توصيات وخدمات مخصصة باستخدام الذكاء الاصطناعي.'
    }
  ]
};

const TechIcon = ({ Icon, name }) => (
  <motion.div 
    className="tech-icon-tooltip"
    whileHover={{ scale: 1.2 }}
    title={name}
  >
    <Icon />
  </motion.div>
);

const ProjectCard = ({ project, onProjectClick }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div 
      ref={cardRef}
      style={{ opacity, scale }}
      className="advanced-project-card"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)"
      }}
      onClick={() => onProjectClick(project)}
    >
      <div className="project-card-background"></div>
      <div className="project-card-content">
        <div className="project-card-header">
          <div className="project-icon">{project.icon}</div>
          <h3>{project.name}</h3>
        </div>
        <p>{project.description}</p>
        <div className="project-tech-icons">
          {project.techIcons.map((Icon, index) => (
            <TechIcon key={index} Icon={Icon} name={project.technologies[index]} />
          ))}
        </div>
        <div className="project-card-footer">
          <span className="project-complexity">{project.complexity}</span>
          <div className="project-links">
            <motion.a 
              href={project.githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
            >
              <FaGithub />
            </motion.a>
            <motion.a 
              href={project.demoLink} 
              target="_blank" 
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
            >
              <FaExternalLinkAlt />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('web');
  const [selectedProject, setSelectedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState({
    web: ProjectDetails.webProjects || [],
    mobile: ProjectDetails.mobileProjects || []
  });

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const getFilteredProjects = () => {
    console.log('Selected Category:', selectedCategory);
    console.log('Projects:', projects);

    // Ensure we have a valid category
    if (!['web', 'mobile'].includes(selectedCategory)) {
      console.error('Invalid category selected:', selectedCategory);
      return [];
    }

    // Select projects based on category
    const categoryProjects = projects[selectedCategory] || [];

    // Filter projects based on search term
    const filteredProjects = categoryProjects.filter(project => 
      (project.name && project.name.includes(searchTerm)) || 
      (project.description && project.description.includes(searchTerm))
    );

    console.log('Filtered Projects:', filteredProjects);
    return filteredProjects;
  };

  return (
    <motion.div 
      className="advanced-projects-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="projects-page-background"></div>
      
      <div className="projects-header">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          مشاريعي الإبداعية
        </motion.h1>
        
        <div className="projects-search-and-filter">
          <motion.input 
            type="text"
            placeholder="ابحث عن مشروع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="projects-search-input"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          
          <div className="category-buttons">
            <motion.button
              className={`category-btn ${selectedCategory === 'web' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('web')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDesktop /> مشاريع الويب
            </motion.button>
            <motion.button
              className={`category-btn ${selectedCategory === 'mobile' ? 'active' : ''}`}
              onClick={() => handleCategoryChange('mobile')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaMobileAlt /> مشاريع الموبايل
            </motion.button>
          </div>
        </div>
      </div>

      <motion.div 
        className="advanced-projects-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              delayChildren: 0.3,
              staggerChildren: 0.2 
            } 
          }
        }}
      >
        {getFilteredProjects().length > 0 ? (
          getFilteredProjects().map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onProjectClick={handleProjectClick} 
            />
          ))
        ) : (
          <div className="no-projects-found">
            لم يتم العثور على مشاريع
          </div>
        )}
      </motion.div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            className="advanced-project-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="advanced-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <button className="close-modal" onClick={handleCloseModal}>×</button>
              
              <div className="modal-header">
                <div className="project-icon">{selectedProject.icon}</div>
                <h2>{selectedProject.name}</h2>
                <p className="project-description">{selectedProject.description}</p>
              </div>

              <div className="modal-body">
                <div className="modal-section full-description">
                  <h3>نظرة عامة</h3>
                  <p>{selectedProject.fullDescription}</p>
                </div>

                <div className="modal-section technologies">
                  <h3>التقنيات المستخدمة</h3>
                  <div className="tech-tags">
                    {selectedProject.technologies.map((tech, index) => {
                      const TechIcon = selectedProject.techIcons[index];
                      return (
                        <span key={index} className="tech-tag">
                          {TechIcon && <TechIcon />}
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="modal-section features">
                  <h3>الميزات الرئيسية</h3>
                  <ul>
                    {selectedProject.features && selectedProject.features.map((feature, index) => (
                      <motion.li 
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FaCode /> {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section challenges">
                  <h3>التحديات التقنية</h3>
                  <ul>
                    {selectedProject.challenges && selectedProject.challenges.map((challenge, index) => (
                      <motion.li 
                        key={index}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <FaRocket /> {challenge}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="modal-section project-links">
                  <motion.a 
                    href={selectedProject.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="github-link"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaGithub /> GitHub
                  </motion.a>
                  <motion.a 
                    href={selectedProject.demoLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="demo-link"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaExternalLinkAlt /> عرض المشروع
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Projects;