import { useEffect, useState } from 'react';
import { portfolioData } from './portfolioData';

const PortfolioModalbox = ({ close, value }) => {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const projectData = portfolioData.find((p) => p.id === value);
    setProject(projectData);
  }, [value]);

  if (!project) return null;

  return (
    <div className='modal_overlay' onClick={() => close(false)}>
      <div className='modal_content' onClick={(e) => e.stopPropagation()}>
        <div className='modal_header'>
          <h2>{project.title}</h2>
          <button className='close_button' onClick={() => close(false)}>
            ×
          </button>
        </div>
        <div className='modal_body'>
          <div className='modal_image'>
            <img src={project.image} alt={project.title} />
          </div>
          <div className='modal_info'>
            <div className='tech_stack'>
              {project.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className='tech_tag'>
                  {tag}
                </span>
              ))}
            </div>
            <p className='project_description'>{project.description}</p>
            <div className='project_links'>
              <a
                href={project.liveUrl}
                target='_blank'
                rel='noreferrer'
                className='demo_link'>
                Live Demo
              </a>
              <a
                href={project.codeUrl}
                target='_blank'
                rel='noreferrer'
                className='code_link'>
                Source Code
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioModalbox;
