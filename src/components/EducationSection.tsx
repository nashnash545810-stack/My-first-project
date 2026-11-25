import { useState, useEffect } from 'react';
import { Check, GraduationCap, Pencil, Plus, Trash2, X } from 'lucide-react';
import { EducationItem } from '../types/portfolio';

interface EducationSectionProps {
  education: EducationItem[];
  onSaveEducation: (items: EducationItem[]) => void;
}

const STATUS_OPTIONS: EducationItem['status'][] = ['Completed', 'In Progress', 'Planned'];

export function EducationSection({ education, onSaveEducation }: EducationSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState<EducationItem[]>(education);

  useEffect(() => {
    setDraft(education);
  }, [education]);

  const handleFieldChange = (
    id: string,
    field: keyof EducationItem,
    value: string
  ) => {
    setDraft((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleAddEntry = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      levelLabel: 'Additional Coursework',
      title: '[Course / Certification Name]',
      institution: '[Institution / Platform]',
      timeframe: 'Planned',
      status: 'Planned',
      details: 'Describe key coursework or focus areas.',
    };
    setDraft((prev) => [...prev, newItem]);
  };

  const handleRemoveEntry = (id: string) => {
    setDraft((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveEducation(draft);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDraft(education);
    setIsEditing(false);
  };

  return (
    <section id="education" className="border-b border-white/[0.06] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <p className="text-xs font-medium text-blue-400 tracking-wide mb-2">Education</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
              Academic Path &amp; Planned Degree
            </h2>
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-2 rounded-lg border border-white/[0.1] bg-[#101219] px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-slate-50 hover:border-white/[0.2] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
            >
              <Pencil className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
              <span>Edit Education</span>
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleAddEntry}
                className="inline-flex items-center gap-1.5 rounded-lg border border-white/[0.1] bg-[#101219] px-3 py-2 text-xs font-medium text-slate-200 hover:border-white/[0.2] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
              >
                <Plus className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                <span>Add Entry</span>
              </button>
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
                form="education-edit-form"
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
              >
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Save Changes</span>
              </button>
            </div>
          )}
        </div>

        {isEditing ? (
          <form id="education-edit-form" onSubmit={handleSave} className="space-y-5">
            {draft.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-white/[0.08] bg-[#101219] p-5 sm:p-6 space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs font-medium text-blue-400">Education Entry</span>
                  {draft.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveEntry(item.id)}
                      className="inline-flex items-center gap-1 text-xs text-rose-400 hover:text-rose-300 cursor-pointer"
                    >
                      <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Level Label</label>
                    <input
                      type="text"
                      value={item.levelLabel}
                      onChange={(e) => handleFieldChange(item.id, 'levelLabel', e.target.value)}
                      required
                      className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Program / Stream</label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => handleFieldChange(item.id, 'title', e.target.value)}
                      required
                      className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1.5">Institution</label>
                    <input
                      type="text"
                      value={item.institution}
                      onChange={(e) => handleFieldChange(item.id, 'institution', e.target.value)}
                      required
                      className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Timeframe</label>
                      <input
                        type="text"
                        value={item.timeframe}
                        onChange={(e) => handleFieldChange(item.id, 'timeframe', e.target.value)}
                        required
                        className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 mb-1.5">Status</label>
                      <select
                        value={item.status}
                        onChange={(e) =>
                          handleFieldChange(
                            item.id,
                            'status',
                            e.target.value as EducationItem['status']
                          )
                        }
                        className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-2.5 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Details</label>
                  <textarea
                    rows={2}
                    value={item.details}
                    onChange={(e) => handleFieldChange(item.id, 'details', e.target.value)}
                    required
                    className="w-full rounded-lg border border-white/[0.1] bg-[#090A0F] px-3 py-2 text-sm text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            ))}
          </form>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {education.map((item) => {
              const statusColor =
                item.status === 'Completed'
                  ? 'text-blue-400'
                  : item.status === 'In Progress'
                    ? 'text-violet-300'
                    : 'text-slate-400';

              return (
                <article
                  key={item.id}
                  className="rounded-xl border border-white/[0.08] bg-[#101219] p-5 sm:p-6 hover:border-white/[0.14] transition-colors duration-150"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 sm:gap-4 mb-4">
                    <div className="flex items-center gap-2.5 text-xs text-slate-400">
                      <GraduationCap className="h-4 w-4 text-blue-400 shrink-0" aria-hidden="true" />
                      <span>{item.levelLabel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs tabular-nums">
                      <span className={`font-medium ${statusColor}`}>{item.status}</span>
                      <span aria-hidden="true" className="text-slate-600">
                        ·
                      </span>
                      <span className="text-slate-400">{item.timeframe}</span>
                    </div>
                  </div>

                  <h3 className="font-display text-lg sm:text-xl font-semibold text-slate-50 mb-1.5">
                    {item.title}
                  </h3>

                  <p className="text-sm font-medium text-slate-300 mb-3">{item.institution}</p>

                  <p className="text-sm text-slate-400 leading-relaxed">{item.details}</p>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
