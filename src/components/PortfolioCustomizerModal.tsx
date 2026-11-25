import { useState, useEffect } from 'react';
import { Check, SlidersHorizontal, X } from 'lucide-react';
import { ProfileIdentity } from '../types/portfolio';

interface PortfolioCustomizerModalProps {
  isOpen: boolean;
  identity: ProfileIdentity;
  onClose: () => void;
  onSaveIdentity: (patch: Partial<ProfileIdentity>) => void;
}

export function PortfolioCustomizerModal({
  isOpen,
  identity,
  onClose,
  onSaveIdentity,
}: PortfolioCustomizerModalProps) {
  const [draft, setDraft] = useState<ProfileIdentity>(identity);

  useEffect(() => {
    setDraft(identity);
  }, [identity, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveIdentity(draft);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="customizer-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl max-h-[90dvh] overflow-y-auto rounded-xl border border-white/[0.1] bg-[#101219] text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/[0.08] bg-[#101219]/95 px-5 sm:px-6 py-4 backdrop-blur-sm">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="h-4 w-4 text-blue-400" aria-hidden="true" />
            <h2 id="customizer-modal-title" className="font-display text-base font-semibold">
              Customize Identity &amp; Links
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close identity customizer"
            className="rounded-lg border border-white/[0.1] p-2 text-slate-300 hover:bg-white/[0.05] hover:text-slate-50 transition-colors cursor-pointer min-h-[40px] min-w-[40px] flex items-center justify-center"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="id-name" className="block text-xs font-medium text-slate-300 mb-1.5">
                Full Name
              </label>
              <input
                id="id-name"
                type="text"
                value={draft.name}
                onChange={(e) => setDraft({ ...draft, name: e.target.value })}
                required
                className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="id-location" className="block text-xs font-medium text-slate-300 mb-1.5">
                Location
              </label>
              <input
                id="id-location"
                type="text"
                value={draft.location}
                onChange={(e) => setDraft({ ...draft, location: e.target.value })}
                className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="id-headline" className="block text-xs font-medium text-slate-300 mb-1.5">
              Headline
            </label>
            <input
              id="id-headline"
              type="text"
              value={draft.headline}
              onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
              required
              className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="id-subheadline" className="block text-xs font-medium text-slate-300 mb-1.5">
              Subheadline
            </label>
            <input
              id="id-subheadline"
              type="text"
              value={draft.subheadline}
              onChange={(e) => setDraft({ ...draft, subheadline: e.target.value })}
              required
              className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="id-summary" className="block text-xs font-medium text-slate-300 mb-1.5">
              Hero Introduction
            </label>
            <textarea
              id="id-summary"
              rows={3}
              value={draft.heroSummary}
              onChange={(e) => setDraft({ ...draft, heroSummary: e.target.value })}
              required
              className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="border-t border-white/[0.08] pt-4 space-y-4">
            <div>
              <label htmlFor="id-email" className="block text-xs font-medium text-slate-300 mb-1.5">
                Contact Email
              </label>
              <input
                id="id-email"
                type="text"
                placeholder="you@example.com"
                value={draft.email}
                onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="id-github" className="block text-xs font-medium text-slate-300 mb-1.5">
                  GitHub URL
                </label>
                <input
                  id="id-github"
                  type="url"
                  placeholder="https://github.com/username"
                  value={draft.githubUrl}
                  onChange={(e) => setDraft({ ...draft, githubUrl: e.target.value })}
                  className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="id-linkedin" className="block text-xs font-medium text-slate-300 mb-1.5">
                  LinkedIn URL
                </label>
                <input
                  id="id-linkedin"
                  type="url"
                  placeholder="https://linkedin.com/in/username"
                  value={draft.linkedinUrl}
                  onChange={(e) => setDraft({ ...draft, linkedinUrl: e.target.value })}
                  className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/[0.1] px-4 py-2 text-xs font-medium text-slate-300 hover:text-slate-50 transition-colors cursor-pointer min-h-[40px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors cursor-pointer min-h-[40px]"
            >
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Save Identity</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
