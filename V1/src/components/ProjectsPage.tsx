import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { projects } from './projectsData';
import ProjectCard from './ProjectCard';
import './ProjectsPage.css';

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'hackathon' | 'other'>('all');

  const hackathonProjects = projects.filter(p => p.isHackathon === true);
  const otherProjects = projects.filter(p => !p.isHackathon);

  const sortByHackathonWinner = (projectList: typeof projects) => {
    return [...projectList].sort((a, b) => {
      if (a.hackathonWinner && !b.hackathonWinner) return -1;
      if (!a.hackathonWinner && b.hackathonWinner) return 1;
      return 0;
    });
  };

  const displayedProjects = 
    activeTab === 'all' ? sortByHackathonWinner(projects) :
    activeTab === 'hackathon' ? sortByHackathonWinner(hackathonProjects) :
    otherProjects;

  return (
    <div className="projects-root">
      <div className="projects-scroll-container">
        <div className="projects-layout">
          <div className="projects-title-block">
            <h1 className="projects-title">Projects</h1>
            <div className="projects-subtitle">Below are some of my projects that I've worked on. I first started developing my own projects after participating in hackathons late 2024. </div>
          </div>
          
          <div style={{
            marginBottom: '24px',
            display: 'flex',
            gap: '12px',
            borderBottom: '2px solid rgba(255,255,255,0.1)',
            paddingBottom: '2px',
          }}>
            <button
              onClick={() => setActiveTab('all')}
              style={{
                padding: '8px 16px',
                background: activeTab === 'all' ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'all' ? '2px solid #fff' : '2px solid transparent',
                color: activeTab === 'all' ? '#fff' : 'rgba(255,255,255,0.6)',
                fontSize: '1rem',
                fontWeight: activeTab === 'all' ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '-2px',
              }}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveTab('hackathon')}
              style={{
                padding: '8px 16px',
                background: activeTab === 'hackathon' ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'hackathon' ? '2px solid #fff' : '2px solid transparent',
                color: activeTab === 'hackathon' ? '#fff' : 'rgba(255,255,255,0.6)',
                fontSize: '1rem',
                fontWeight: activeTab === 'hackathon' ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '-2px',
              }}
            >
              Hackathon Projects
            </button>
            <button
              onClick={() => setActiveTab('other')}
              style={{
                padding: '8px 16px',
                background: activeTab === 'other' ? 'rgba(255,255,255,0.15)' : 'transparent',
                border: 'none',
                borderBottom: activeTab === 'other' ? '2px solid #fff' : '2px solid transparent',
                color: activeTab === 'other' ? '#fff' : 'rgba(255,255,255,0.6)',
                fontSize: '1rem',
                fontWeight: activeTab === 'other' ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '-2px',
              }}
            >
              Other Projects
            </button>
          </div>

          {activeTab === 'hackathon' && (
            <div style={{
              marginBottom: '18px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              border: '2px solid #fff',
              borderRadius: '18px',
              padding: '6px 18px 6px 12px',
              background: 'rgba(20,20,20,0.18)',
              width: 'fit-content',
            }}>
              <span className="hackathon-winner-label" style={{ position: 'static', width: 24, height: 24, fontSize: '1.1rem', minWidth: 24, minHeight: 24, border: '2px solid #fffbe6', background: 'rgba(255,215,0,0.92)', color: '#fffbe6', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }} aria-label="Hackathon Winner" role="img">{'\u{1F451}'}</span>
              <span style={{ color: '#fff', fontSize: '1rem', opacity: 0.85, lineHeight: 1.2 }}>
                = Hackathon Winner
              </span>
            </div>
          )}
          
          <div className="projects-grid">
            {displayedProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          {/* Navigation button to contact page */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 56 }}>
            <button
              className="nav-next-button"
              onClick={() => navigate('/contact')}
            >
              Want to Chat About a Project? Contact Me!
              <svg className="nav-next-arrow" width="30" height="30" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 11H15M15 11L11.5 7.5M15 11L11.5 14.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage; 