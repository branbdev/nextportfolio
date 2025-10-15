'use client';

import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { portfolioSliderProps } from '../sliderProps';
import { EnrichedProject } from '../lib/taxonomies';
import { getTechIcon } from './Icons';
import PortfolioModalbox from './PortfolioModalbox';
import styles from '../../styles/components/Portfolio.module.css';

interface PortfolioClientProps {
  projects: EnrichedProject[];
}

const PortfolioClient: React.FC<PortfolioClientProps> = ({ projects }) => {
  const [selectedProject, setSelectedProject] = useState<EnrichedProject | null>(null);

  const handleOpenModal = (project: EnrichedProject) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <Swiper
        {...portfolioSliderProps}
        modules={[Autoplay, Navigation]}
        className='owl-carousel'>
        {projects.map((project) => (
          <SwiperSlide className='item modal_item' key={project.slug}>
            <div
              className='portfolio_item'
              onClick={() => handleOpenModal(project)}>
              <div className='img_holder'>
                <img src={project.image} alt={project.name} />
                <div
                  className='abs_img'
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>
              <div className='title_holder'>
                <p className={styles.tech_tags}>
                  {project.technologies.slice(0, 2).map((tech, index) => (
                    <span key={index} className={styles.tech_tag}>
                      {getTechIcon(tech.slug, 14)}
                      <span>{tech.name}</span>
                      {index === 0 && ' • '}
                    </span>
                  ))}
                </p>
                <h3>{project.name}</h3>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedProject && (
        <PortfolioModalbox 
          value={selectedProject} 
          close={handleCloseModal} 
        />
      )}
    </>
  );
};

export default PortfolioClient;
