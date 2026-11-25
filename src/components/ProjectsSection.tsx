import { useState } from 'react';
import { CheckCircle2, Clock, ExternalLink, FolderGit2, Wrench } from 'lucide-react';
import { ProjectCategory, ProjectItem, ProjectStatus } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface ProjectsSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

const FILTER_CATEGORIES: ProjectCategory[] = [
  'All',
  'Web Development',
  'Artificial Intelligence',
  'Software Systems',
  'Cybersecurity',
];

type StageFilter = 'All' | 'Completed' | 'In Development' | 'Planned';

const STAGE_FILTERS: StageFilter[] = ['All', 'Completed', 'In Development', 'Planned'];

function getStageMeta(status: ProjectStatus) {
  if (status === 'Completed' || status === 'Active Build') {
    return {
      label: 'Completed Project',
      note: 'Built and live on this portfolio',
      textClass: 'text-blue-400',
      borderClass: 'border-blue-500/35',
      headerBgClass: 'bg-blue-500/[0.07]',
      Icon: CheckCircle2,
    };
  }
  if (status === 'In Development') {
    return {
      label: 'In Development',
      note: 'Currently being designed and built',
      textClass: 'text-violet-300',
      borderClass: 'border-white/[0.08]',
      headerBgClass: 'bg-violet-500/[0.05]',
      Icon: Wrench,
    };
  }
  return {
    label: 'Planned Project',
    note: 'Upcoming concept — implementation not yet started',
    textClass: 'text-slate-300',
    borderClass: 'border-white/[0.08]',
    headerBgClass: 'bg-white/[0.02]',
    Icon: Clock,
  };
}

export function ProjectsSection({ projects, onSelectProject }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [selectedStage, setSelectedStage] = useState<StageFilter>('All');

  const completedCount = projects.filter(
    (p) => p.status === 'Completed' || p.status === 'Active Build'
  ).length;
  const inDevCount = projects.filter((p) => p.status === 'In Development').length;
  const plannedCount = projects.filter((p) => p.status === 'Planned').length;

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      selectedCategory === 'All' || project.category === selectedCategory;

    const normalizedStatus =
      project.status === 'Active Build' ? 'Completed' : project.status;
    const matchesStage =
      selectedStage === 'All' || normalizedStatus === selectedStage;

    return matchesCategory && matchesStage;
  });

  return (
    <section id="projects" className="border-b border-white/[0.06] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 mb-8 sm:mb-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-medium text-blue-400 tracking-wide mb-2">Projects</p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-50 mb-2">
                Completed &amp; Planned Builds
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Completed work is separated clearly from projects currently in development or
                planned for upcoming study.
              </p>
            </div>

            {/* Unboxed Tabular Stage Summary */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs tabular-nums text-slate-400">
              <span className="text-blue-400 font-medium">{completedCount} Completed</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-violet-300 font-medium">{inDevCount} In Development</span>
              <span aria-hidden="true" className="text-slate-600">
                ·
              </span>
              <span className="text-slate-300 font-medium">{plannedCount} Planned</span>
            </div>
          </div>

          {/* Interactive Filters: Stage + Category */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div
              role="tablist"
              aria-label="Filter projects by category"
              className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#101219] p-1.5"
            >
              {FILTER_CATEGORIES.map((category) => {
                const isSelected = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedCategory(category)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer min-h-[38px] ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <div
              role="tablist"
              aria-label="Filter projects by completion stage"
              className="flex flex-wrap items-center gap-1.5 rounded-lg border border-white/[0.08] bg-[#101219] p-1.5 self-start lg:self-auto"
            >
              {STAGE_FILTERS.map((stage) => {
                const isSelected = selectedStage === stage;
                return (
                  <button
                    key={stage}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => setSelectedStage(stage)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors duration-150 cursor-pointer min-h-[38px] ${
                      isSelected
                        ? 'bg-white/[0.12] text-slate-50'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/[0.04]'
                    }`}
                  >
                    {stage === 'All' ? 'All Stages' : stage}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="rounded-xl border border-white/[0.08] bg-[#101219] p-8 sm:p-10 text-center">
            <p className="text-sm text-slate-300 mb-4">
              No projects match both the selected category and stage filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSelectedStage('All');
              }}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors duration-150 cursor-pointer min-h-[40px]"
            >
              Reset Project Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredProjects.map((project) => {
              const stage = getStageMeta(project.status);
              const StageIcon = stage.Icon;

              return (
                <article
                  key={project.id}
                  className={`group flex flex-col overflow-hidden rounded-xl border bg-[#101219] hover:border-white/[0.18] transition-colors duration-150 ${stage.borderClass}`}
                >
                  {/* Explicit Stage Header Bar */}
                  <div
                    className={`flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] px-5 py-3 text-xs ${stage.headerBgClass}`}
                  >
                    <span className={`inline-flex items-center gap-1.5 font-semibold ${stage.textClass}`}>
                      <StageIcon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                      <span>{stage.label}</span>
                    </span>
                    <span className="text-slate-400">{project.category}</span>
                  </div>

                  {/* 4:3 Media Frame */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-white/[0.06] bg-[#0B0D14]">
                    <ResilientImage
                      src={project.imageUrl}
                      alt={project.imageAlt}
                      fallbackTitle={project.title}
                      className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                    <div>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-slate-50 mb-2">
                        {project.title}
                      </h3>

                      <p className="text-sm text-slate-300 leading-relaxed mb-2.5">
                        {project.description}
                      </p>

                      <p className="text-xs text-slate-400 leading-relaxed mb-5">
                        {stage.note}
                      </p>
                    </div>

                    <div className="space-y-4 sm:space-y-5">
                      {/* Unboxed Metadata Tech Stack */}
                      <div className="pt-4 border-t border-white/[0.06]">
                        <p className="font-mono text-xs text-slate-300 leading-relaxed">
                          {project.technologies.join(' · ')}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
                        <button
                          type="button"
                          onClick={() => onSelectProject(project)}
                          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white whitespace-nowrap shrink-0 hover:bg-blue-500 transition-colors duration-150 min-h-[44px] sm:min-h-[40px] cursor-pointer"
                        >
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>View Project</span>
                        </button>

                        {project.githubUrl ? (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-transparent px-4 py-2 text-xs font-medium text-slate-200 whitespace-nowrap shrink-0 hover:bg-white/[0.04] hover:border-white/[0.22] transition-colors duration-150 min-h-[44px] sm:min-h-[40px]"
                          >
                            <FolderGit2 className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                            <span>GitHub</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => onSelectProject(project)}
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-transparent px-4 py-2 text-xs font-medium text-slate-300 whitespace-nowrap shrink-0 hover:text-slate-100 hover:bg-white/[0.04] hover:border-white/[0.22] transition-colors duration-150 min-h-[44px] sm:min-h-[40px] cursor-pointer"
                          >
                            <FolderGit2 className="h-3.5 w-3.5 text-slate-400" aria-hidden="true" />
                            <span>GitHub (Placeholder)</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
