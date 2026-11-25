import { useState, useEffect } from 'react';
import { Check, Pencil, X } from 'lucide-react';
import { AboutData } from '../types/portfolio';

interface AboutSectionProps {
  about: AboutData;
  onSaveAbout: (patch: Partial<AboutData>) => void;
}

export function AboutSection({ about, onSaveAbout }: AboutSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<AboutData>(about);

  useEffect(() => {
    setDraft(about);
  }, [about]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAbout(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(about);
    setIsEditing(false);
  };

  const detailItems: Array<{ key: keyof AboutData; label: string }> = [
    { key: 'currentEducation', label: 'Current Education' },
    { key: 'programmingInterests', label: 'Programming Interests' },
    { key: 'careerGoals', label: 'Career Goals' },
    { key: 'areasOfInterest', label: 'Areas of Interest' },
  ];

  return (
    <section id="about" className="border-b border-white/[0.06] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-xs font-medium text-blue-400 tracking-wide mb-2">About Me</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
              Background &amp; Engineering Direction
            </h2>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-[#101219] px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-slate-50 hover:border-white/[0.2] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            >
              <Pencil className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
              <span>Edit Section</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-transparent px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-slate-50 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Cancel</span>
              </button>
              <button
                type="submit"
                form="about-edit-form"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
              >
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <form
            id="about-edit-form"
            onSubmit={handleSave}
            className="rounded-xl border border-white/[0.08] bg-[#101219] p-5 sm:p-8 space-y-5 sm:space-y-6"
          >
            <div>
              <label
                htmlFor="about-introduction"
                className="block text-xs font-medium text-slate-300 mb-2"
              >
                Introduction
              </label>
              <textarea
                id="about-introduction"
                rows={3}
                value={draft.introduction}
                onChange={(e) => setDraft({ ...draft, introduction: e.target.value })}
                required
                className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {detailItems.map((item) => (
                <div key={item.key}>
                  <label
                    htmlFor={`about-${item.key}`}
                    className="block text-xs font-medium text-slate-300 mb-2"
                  >
                    {item.label}
                  </label>
                  <textarea
                    id={`about-${item.key}`}
                    rows={3}
                    value={draft[item.key]}
                    onChange={(e) => setDraft({ ...draft, [item.key]: e.target.value })}
                    required
                    className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Intro Prose */}
            <div className="lg:col-span-5">
              <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
                {about.introduction}
              </p>
              <p className="mt-4 text-sm text-slate-400 leading-relaxed">
                Every section on this page reflects my current stage transparently—highlighting the
                technologies I am actively learning and the systems I plan to build next.
              </p>
            </div>

            {/* Right 2x2 Structured Details */}
            <div className="lg:col-span-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {detailItems.map((item) => (
                <div
                  key={item.key}
                  className="rounded-xl border border-white/[0.08] bg-[#101219] p-5 hover:border-white/[0.14] transition-colors duration-150"
                >
                  <h3 className="font-display text-sm font-semibold text-slate-100 mb-2">
                    {item.label}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{about[item.key]}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
