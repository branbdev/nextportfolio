import React, { useEffect, useState } from 'react';
import { portfolioData, PortfolioItem } from './portfolioData';
import { 
  IconReact, 
  IconNextjs, 
  IconTypescript, 
  IconDjango, 
  IconNodejs, 
  IconExpress, 
  IconMongoDB,
  IconExternal,
  IconGithub
} from './Icons';

// Helper function to get icon for technology
const getTechIcon = (tag: string) => {
  const iconSize = 16;
  const iconColor = 'currentColor';
  
  switch(tag.toLowerCase()) {
    case 'react':
      return <Icons.IconReact size={iconSize} color={iconColor} className="tech-icon" />;
    case 'next.js':
    case 'nextjs':
      return <Icons.IconNextjs size={iconSize} color={iconColor} className="tech-icon" />;
    case 'typescript':
      return <Icons.IconTypescript size={iconSize} color={iconColor} className="tech-icon" />;
    case 'django':
      return <Icons.IconDjango size={iconSize} color={iconColor} className="tech-icon" />;
    case 'node':
    case 'node.js':
      return <Icons.IconNodejs size={iconSize} color={iconColor} className="tech-icon" />;
    case 'express':
      return <Icons.IconExpress size={iconSize} color={iconColor} className="tech-icon" />;
    case 'mongodb':
      return <Icons.IconMongoDB size={iconSize} color={iconColor} className="tech-icon" />;
    default:
      return null;
  }
};

interface PortfolioModalboxProps {
  close: () => void;
  value: PortfolioItem | null;
}

const PortfolioModalbox: React.FC<PortfolioModalboxProps> = ({
  close,
  value,
}) => {
  const [project, setProject] = useState<PortfolioItem | null>(null);

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
          <h2>{project.title}</h2>
          <button className='close_button' onClick={close}>
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
