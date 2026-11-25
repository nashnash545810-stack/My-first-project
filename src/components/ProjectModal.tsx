import { useState, useEffect } from 'react';
import { Check, ExternalLink, FolderGit2, X } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onSaveLinks: (projectId: string, githubUrl: string, liveUrl: string) => void;
}

export function ProjectModal({ project, onClose, onSaveLinks }: ProjectModalProps) {
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    if (project) {
      setGithubUrl(project.githubUrl);
      setLiveUrl(project.liveUrl);
      setSavedNotice(false);
    }
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose]);

  if (!project) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveLinks(project.id, githubUrl.trim(), liveUrl.trim());
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-xl border border-white/[0.1] bg-[#101219] text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-white/[0.08] bg-[#101219]/95 px-5 sm:px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-medium text-blue-400">{project.status}</span>
            <span aria-hidden="true" className="text-slate-600">
              ·
            </span>
            <span className="text-slate-400">{project.category}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="rounded-lg border border-white/[0.1] p-2 text-slate-300 hover:bg-white/[0.05] hover:text-slate-50 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-5 sm:space-y-6">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-lg border border-white/[0.08] bg-[#090A0F]">
            <ResilientImage
              src={project.imageUrl}
              alt={project.imageAlt}
              fallbackTitle={project.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div>
            <h2 id="project-modal-title" className="font-display text-2xl font-bold text-slate-50 mb-2">
              {project.title}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">{project.longDescription}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-slate-300 mb-2.5">
              Scope &amp; Implementation Notes
            </h3>
            <ul className="space-y-2">
              {project.highlights.map((note) => (
                <li key={note} className="flex items-start gap-2.5 text-sm text-slate-400">
                  <span className="mt-2 h-1 w-1 rounded-full bg-blue-400 shrink-0" aria-hidden="true" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-white/[0.08] pt-4">
            <p className="text-xs text-slate-400 mb-1.5">Technologies</p>
            <p className="font-mono text-xs text-slate-200">{project.technologies.join(' · ')}</p>
          </div>

          {/* Transparent Repository / Live Link Configuration */}
          <form onSubmit={handleSave} className="rounded-lg border border-white/[0.08] bg-[#090A0F] p-4 space-y-3">
            <p className="text-xs font-medium text-slate-300">
              Project Links (Placeholder until you attach your repository)
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="modal-github-url" className="block text-[11px] text-slate-400 mb-1">
                  GitHub Repository URL
                </label>
                <input
                  id="modal-github-url"
                  type="url"
                  placeholder="https://github.com/username/repo"
                  value={githubUrl}
                  onChange={(e) => setGithubUrl(e.target.value)}
                  className="w-full rounded-md border border-white/[0.1] bg-[#101219] px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="modal-live-url" className="block text-[11px] text-slate-400 mb-1">
                  Live Demo URL (optional)
                </label>
                <input
                  id="modal-live-url"
                  type="text"
                  placeholder="https://your-project.vercel.app"
                  value={liveUrl}
                  onChange={(e) => setLiveUrl(e.target.value)}
                  className="w-full rounded-md border border-white/[0.1] bg-[#101219] px-3 py-1.5 text-xs text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.12] px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/[0.05]"
                  >
                    <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Open GitHub</span>
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== '#home' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.12] px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/[0.05]"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Open Live Demo</span>
                  </a>
                )}
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-blue-500 transition-colors cursor-pointer"
              >
                {savedNotice ? (
                  <>
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Saved</span>
                  </>
                ) : (
                  <span>Save Links</span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
