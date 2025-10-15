import React, { Fragment } from 'react';
import { loadAllProjects, loadAllTechnologies } from '../lib/contentLoader';
import { enrichProjectsWithTechnologies } from '../lib/taxonomies';
import PortfolioClient from './PortfolioClient';

const Portfolio = async () => {
  const projects = loadAllProjects();
  const technologies = loadAllTechnologies();
  const enrichedProjects = enrichProjectsWithTechnologies(projects, technologies);

  return (
    <Fragment>
      <div className='resumo_fn_section' id='portfolio'>
        <div className='container'>
          <div className='resumo_fn_main_title'>
            <h3 className='subtitle'>Portfolio</h3>
            <h3 className='title'>Featured Projects</h3>
            <p className='desc'>
              A collection of my favorite projects that I've worked on.
            </p>
          </div>
        </div>
        <div className='noright'>
          <PortfolioClient projects={enrichedProjects} />
        </div>
      </div>
    </Fragment>
  );
};

export default Portfolio;
