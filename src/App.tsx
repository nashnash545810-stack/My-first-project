import { useState, useEffect, useCallback } from 'react';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { EducationSection } from './components/EducationSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar, NAV_ITEMS } from './components/Navbar';
import { PortfolioCustomizerModal } from './components/PortfolioCustomizerModal';
import { ProjectModal } from './components/ProjectModal';
import { ProjectsSection } from './components/ProjectsSection';
import { ResumeModal } from './components/ResumeModal';
import { SkillsSection } from './components/SkillsSection';
import { usePortfolioState } from './hooks/usePortfolioState';
import { ProjectItem } from './types/portfolio';

export default function App() {
  const {
    state,
    updateIdentity,
    updateAbout,
    updateSkill,
    updateProjectLinks,
    updateEducation,
    resetToDefaults,
  } = usePortfolioState();

  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [staticResumeExists, setStaticResumeExists] = useState(false);

  const selectedProject: ProjectItem | null =
    state.projects.find((p) => p.id === selectedProjectId) ?? null;

  useEffect(() => {
    let cancelled = false;
    fetch('/resume.pdf', { method: 'HEAD' })
      .then((res) => {
        const contentType = res.headers.get('content-type') || '';
        if (!cancelled) {
          setStaticResumeExists(res.ok && contentType.includes('pdf'));
        }
      })
      .catch(() => {
        if (!cancelled) setStaticResumeExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const hasResumeAvailable =
    Boolean(state.identity.resumeDataUrl && state.identity.resumeFileName) ||
    staticResumeExists;

  const handleDownloadResume = useCallback(() => {
    if (state.identity.resumeDataUrl && state.identity.resumeFileName) {
      const link = document.createElement('a');
      link.href = state.identity.resumeDataUrl;
      link.download = state.identity.resumeFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    if (staticResumeExists) {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    setResumeModalOpen(true);
  }, [state.identity.resumeDataUrl, state.identity.resumeFileName, staticResumeExists]);

  const navigateToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
    }
  }, []);

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -55% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#090A0F] text-slate-100 flex flex-col overflow-x-hidden">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-blue-600 focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Skip to main content
      </a>

      <Navbar activeSection={activeSection} onNavigate={navigateToSection} />

      <main id="main-content" className="flex-1">
        <HeroSection
          identity={state.identity}
          hasResumeAvailable={hasResumeAvailable}
          onViewProjects={() => navigateToSection('projects')}
          onContactMe={() => navigateToSection('contact')}
          onDownloadResume={handleDownloadResume}
          onManageResume={() => setResumeModalOpen(true)}
          onOpenCustomize={() => setCustomizerOpen(true)}
        />

        <AboutSection about={state.about} onSaveAbout={updateAbout} />

        <SkillsSection categories={state.skillCategories} onUpdateSkill={updateSkill} />

        <ProjectsSection
          projects={state.projects}
          onSelectProject={(project) => setSelectedProjectId(project.id)}
        />

        <EducationSection education={state.education} onSaveEducation={updateEducation} />

        <ContactSection
          identity={state.identity}
          onOpenCustomize={() => setCustomizerOpen(true)}
        />
      </main>

      <Footer
        identity={state.identity}
        onOpenCustomize={() => setCustomizerOpen(true)}
        onResetDefaults={resetToDefaults}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProjectId(null)}
        onSaveLinks={updateProjectLinks}
      />

      <ResumeModal
        isOpen={resumeModalOpen}
        identity={state.identity}
        onClose={() => setResumeModalOpen(false)}
        onAttachResume={(fileName, dataUrl) =>
          updateIdentity({ resumeFileName: fileName, resumeDataUrl: dataUrl })
        }
      />

      <PortfolioCustomizerModal
        isOpen={customizerOpen}
        identity={state.identity}
        onClose={() => setCustomizerOpen(false)}
        onSaveIdentity={updateIdentity}
      />
    </div>
  );
}
