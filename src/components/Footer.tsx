import { Github, Linkedin, Mail, RotateCcw } from 'lucide-react';
import { ProfileIdentity } from '../types/portfolio';

interface FooterProps {
  identity: ProfileIdentity;
  onOpenCustomize: () => void;
  onResetDefaults: () => void;
}

export function Footer({ identity, onOpenCustomize, onResetDefaults }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const hasValidEmail =
    Boolean(identity.email) &&
    !identity.email.includes('[') &&
    !identity.email.toLowerCase().includes('example.com');

  return (
    <footer className="border-t border-white/[0.08] bg-[#07080C] py-8 sm:py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-display text-base font-semibold text-slate-100">My Portfolio</p>
            <p className="mt-1 text-xs text-slate-400 tabular-nums">
              © {currentYear} {identity.name}. Built with React, TypeScript &amp; Tailwind CSS.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
            {identity.githubUrl ? (
              <a
                href={identity.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors py-1.5"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>GitHub</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={onOpenCustomize}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors py-1.5 cursor-pointer"
                title="Configure your GitHub profile URL"
              >
                <Github className="h-4 w-4" aria-hidden="true" />
                <span>[GitHub Placeholder]</span>
              </button>
            )}

            {identity.linkedinUrl ? (
              <a
                href={identity.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors py-1.5"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                <span>LinkedIn</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={onOpenCustomize}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors py-1.5 cursor-pointer"
                title="Configure your LinkedIn profile URL"
              >
                <Linkedin className="h-4 w-4" aria-hidden="true" />
                <span>[LinkedIn Placeholder]</span>
              </button>
            )}

            {hasValidEmail ? (
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex items-center gap-1.5 text-slate-300 hover:text-blue-400 transition-colors py-1.5"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{identity.email}</span>
              </a>
            ) : (
              <button
                type="button"
                onClick={onOpenCustomize}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors py-1.5 cursor-pointer"
                title="Configure your contact email"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span>{identity.email || '[Email Placeholder]'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onResetDefaults}
              className="inline-flex items-center gap-1.5 text-slate-500 hover:text-slate-300 transition-colors py-1.5 cursor-pointer"
              title="Reset saved local edits back to default placeholders"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Reset Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
