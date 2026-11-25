import { useState, useEffect, useCallback } from 'react';
import { DEFAULT_PORTFOLIO_STATE } from '../data/defaultPortfolio';
import {
  AboutData,
  EducationItem,
  PortfolioState,
  ProfileIdentity,
  SkillLevel,
} from '../types/portfolio';

const STORAGE_KEY = 'my_portfolio_state_v1';

function loadInitialState(): PortfolioState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PORTFOLIO_STATE;
    const parsed = JSON.parse(raw) as Partial<PortfolioState>;

    const mergedIdentity = {
      ...DEFAULT_PORTFOLIO_STATE.identity,
      ...(parsed.identity ?? {}),
    };

    if (
      mergedIdentity.subheadline ===
      'Aspiring Software Engineer | AI Enthusiast | Future Cybersecurity Professional.'
    ) {
      mergedIdentity.subheadline = DEFAULT_PORTFOLIO_STATE.identity.subheadline;
    }
    if (mergedIdentity.headline === 'Computer Science Engineering Student.') {
      mergedIdentity.headline = DEFAULT_PORTFOLIO_STATE.identity.headline;
    }
    if (mergedIdentity.location === '[Your City, Country]') {
      mergedIdentity.location = DEFAULT_PORTFOLIO_STATE.identity.location;
    }

    const mergedProjects = Array.isArray(parsed.projects)
      ? parsed.projects.map((proj) =>
          proj.id === 'personal-portfolio' && proj.status === 'Active Build'
            ? { ...proj, status: 'Completed' as const }
            : proj
        )
      : DEFAULT_PORTFOLIO_STATE.projects;

    return {
      identity: mergedIdentity,
      about: { ...DEFAULT_PORTFOLIO_STATE.about, ...(parsed.about ?? {}) },
      skillCategories: Array.isArray(parsed.skillCategories)
        ? parsed.skillCategories
        : DEFAULT_PORTFOLIO_STATE.skillCategories,
      projects: mergedProjects,
      education: Array.isArray(parsed.education)
        ? parsed.education
        : DEFAULT_PORTFOLIO_STATE.education,
    };
  } catch {
    return DEFAULT_PORTFOLIO_STATE;
  }
}

export function usePortfolioState() {
  const [state, setState] = useState<PortfolioState>(() => loadInitialState());

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors (e.g. very large uploaded resume)
    }
  }, [state]);

  const updateIdentity = useCallback((patch: Partial<ProfileIdentity>) => {
    setState((prev) => ({
      ...prev,
      identity: { ...prev.identity, ...patch },
    }));
  }, []);

  const updateAbout = useCallback((patch: Partial<AboutData>) => {
    setState((prev) => ({
      ...prev,
      about: { ...prev.about, ...patch },
    }));
  }, []);

  const updateSkill = useCallback(
    (categoryId: string, skillId: string, level: SkillLevel, developing: boolean) => {
      setState((prev) => ({
        ...prev,
        skillCategories: prev.skillCategories.map((cat) =>
          cat.id !== categoryId
            ? cat
            : {
                ...cat,
                skills: cat.skills.map((skill) =>
                  skill.id !== skillId ? skill : { ...skill, level, developing }
                ),
              }
        ),
      }));
    },
    []
  );

  const updateProjectLinks = useCallback(
    (projectId: string, githubUrl: string, liveUrl: string) => {
      setState((prev) => ({
        ...prev,
        projects: prev.projects.map((proj) =>
          proj.id !== projectId ? proj : { ...proj, githubUrl, liveUrl }
        ),
      }));
    },
    []
  );

  const updateEducation = useCallback((items: EducationItem[]) => {
    setState((prev) => ({
      ...prev,
      education: items,
    }));
  }, []);

  const resetToDefaults = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
    setState(DEFAULT_PORTFOLIO_STATE);
  }, []);

  return {
    state,
    updateIdentity,
    updateAbout,
    updateSkill,
    updateProjectLinks,
    updateEducation,
    resetToDefaults,
  };
}
