import React, { memo } from 'react';
import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from '../Projects/ProjectsSection';
import SkillsSection from '../Skills/SkillsSection';
import ProfessionalStatistics from './ProfessionalStatistics';

const Home = memo(() => (
  <div className="home-container">
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <SkillsSection />
    <ProfessionalStatistics />
  </div>
));

export default Home;
