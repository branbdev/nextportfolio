import React, { useEffect, useState } from 'react';
import { EnrichedProject } from '../lib/taxonomies';
import { IconGithub, IconExternal, getTechIcon } from './Icons';
import styles from '../../styles/components/Portfolio.module.css';

interface PortfolioModalboxProps {
  close: () => void;
  value: EnrichedProject | null;
}

const PortfolioModalbox: React.FC<PortfolioModalboxProps> = ({
  close,
  value,
}) => {
  const [project, setProject] = useState<EnrichedProject | null>(null);

  useEffect(() => {
    if (value) {
      setProject(value);
    }
  }, [value]);

  if (!project) return null;

  return (
    <div className='modal_overlay' onClick={close}>
      <div className='modal_content' onClick={(e) => e.stopPropagation()}>
        <div className='modal_header'>
          <h2>{project.name}</h2>
          <button className='close_button' onClick={close}>
            ×
          </button>
        </div>
        <div className='modal_body'>
          <div className='modal_image'>
            <img src={project.image} alt={project.name} />
          </div>
          <div className='modal_info'>
            <div className={styles.tech_stack}>
              {project.technologies.map((tech, index) => (
                <span key={index} className={styles.tech_tag}>
                  {getTechIcon(tech.slug, 16)}
                  <span>{tech.name}</span>
                </span>
              ))}
            </div>
            <p className='project_description'>{project.description}</p>
            <div className={styles.project_links}>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.demo_link}>
                  <IconExternal size={18} />
                  <span>Live Demo</span>
                </a>
              )}
              {project.repositoryUrl && (
                <a
                  href={project.repositoryUrl}
                  target='_blank'
                  rel='noreferrer'
                  className={styles.code_link}>
                  <IconGithub size={18} />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModalbox;
