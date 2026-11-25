import { ArrowRight, Download, FileText, Mail, MapPin, SlidersHorizontal } from 'lucide-react';
import { HERO_VISUAL_PATH } from '../data/defaultPortfolio';
import { ProfileIdentity } from '../types/portfolio';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  identity: ProfileIdentity;
  hasResumeAvailable: boolean;
  onViewProjects: () => void;
  onContactMe: () => void;
  onDownloadResume: () => void;
  onManageResume: () => void;
  onOpenCustomize: () => void;
}

export function HeroSection({
  identity,
  hasResumeAvailable,
  onViewProjects,
  onContactMe,
  onDownloadResume,
  onManageResume,
  onOpenCustomize,
}: HeroSectionProps) {
  return (
    <section id="home" className="border-b border-white/[0.06] py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          {/* Left Column: Primary Identity & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs sm:text-sm font-medium text-blue-400 tracking-wide mb-2.5 sm:mb-3">
              {identity.headline}
            </p>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.1rem] font-bold tracking-tight text-slate-50 leading-[1.14] mb-3.5 sm:mb-4">
              Hello, I’m {identity.name}.
            </h1>

            <p className="text-base sm:text-lg font-medium text-slate-200 leading-relaxed mb-3.5 sm:mb-4 max-w-2xl">
              {identity.subheadline}
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-7 sm:mb-8 max-w-xl">
              {identity.heroSummary}
            </p>

            <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-3">
              <button
                type="button"
                onClick={onViewProjects}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white whitespace-nowrap shrink-0 hover:bg-blue-500 transition-colors duration-150 min-h-[44px] cursor-pointer"
              >
                <span>View My Projects</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={onContactMe}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-[#101219] px-5 py-2.5 text-sm font-medium text-slate-100 whitespace-nowrap shrink-0 hover:bg-[#171A24] hover:border-white/[0.2] transition-colors duration-150 min-h-[44px] cursor-pointer"
              >
                <Mail className="h-4 w-4 text-slate-300" aria-hidden="true" />
                <span>Contact Me</span>
              </button>

              <button
                type="button"
                onClick={onDownloadResume}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-white/[0.12] bg-transparent px-5 py-2.5 text-sm font-medium text-slate-300 whitespace-nowrap shrink-0 hover:text-slate-50 hover:border-white/[0.22] hover:bg-white/[0.03] transition-colors duration-150 min-h-[44px] cursor-pointer"
              >
                <Download className="h-4 w-4 text-violet-400" aria-hidden="true" />
                <span>
                  {hasResumeAvailable ? 'Download Resume' : 'Download Resume'}
                </span>
              </button>
            </div>

            <div className="mt-7 pt-5 sm:pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row sm:flex-wrap sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-slate-400">
                <span className="inline-flex items-center gap-1.5 text-slate-300">
                  <MapPin className="h-3.5 w-3.5 text-blue-400 shrink-0" aria-hidden="true" />
                  <span>{identity.location}</span>
                </span>
                <span aria-hidden="true" className="text-slate-600">
                  ·
                </span>
                <span>Open to internships &amp; collaborative learning projects</span>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onManageResume}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer py-1.5 min-h-[36px]"
                >
                  <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{identity.resumeFileName ? 'Manage Resume PDF' : 'Upload Resume PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenCustomize}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-blue-400 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer py-1.5 min-h-[36px]"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Customize Identity &amp; Links</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Developer Workspace Visual */}
          <div className="lg:col-span-5 flex">
            <div className="relative w-full overflow-hidden rounded-xl border border-white/[0.08] bg-[#101219] flex flex-col">
              <div className="relative flex-1 min-h-[220px] sm:min-h-[300px] lg:min-h-0">
                <ResilientImage
                  src={HERO_VISUAL_PATH}
                  alt="Minimalist dark software engineering workstation"
                  fallbackTitle="Developer Workspace"
                  className="h-full w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090A0F]/80 via-transparent to-transparent"
                />
              </div>

              <div className="border-t border-white/[0.08] bg-[#0D0F16] px-4 sm:px-5 py-3.5 sm:py-4">
                <div className="font-mono text-xs text-slate-300 space-y-1">
                  <div className="flex items-center justify-between gap-2 text-slate-400">
                    <span>Focus Areas</span>
                    <span className="text-blue-400">CSE Foundations</span>
                  </div>
                  <p className="text-slate-200 truncate">
                    Software Engineering · Artificial Intelligence · Cybersecurity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
