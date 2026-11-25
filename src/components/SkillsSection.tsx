import { useState } from 'react';
import { Check, Pencil } from 'lucide-react';
import { SkillCategory, SkillLevel } from '../types/portfolio';

interface SkillsSectionProps {
  categories: SkillCategory[];
  onUpdateSkill: (
    categoryId: string,
    skillId: string,
    level: SkillLevel,
    developing: boolean
  ) => void;
}

const LEVEL_WIDTH: Record<SkillLevel, string> = {
  Foundational: 'w-[30%]',
  Developing: 'w-[50%]',
  Intermediate: 'w-[72%]',
  Proficient: 'w-[90%]',
};

const SKILL_LEVELS: SkillLevel[] = ['Foundational', 'Developing', 'Intermediate', 'Proficient'];

export function SkillsSection({ categories, onUpdateSkill }: SkillsSectionProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <section id="skills" className="border-b border-white/[0.06] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-blue-400 tracking-wide mb-2">Skills</p>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-slate-50 mb-2">
              Technical Foundations &amp; Developing Areas
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              Proficiency levels reflect my current learning stage honestly. Skills marked as
              developing are areas I am actively studying and practicing.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className={`inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px] ${
              isEditing
                ? 'bg-blue-600 text-white hover:bg-blue-500'
                : 'border border-white/[0.1] bg-[#101219] text-slate-300 hover:text-slate-50 hover:border-white/[0.2]'
            }`}
          >
            {isEditing ? (
              <>
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Done Editing</span>
              </>
            ) : (
              <>
                <Pencil className="h-3.5 w-3.5 text-blue-400" aria-hidden="true" />
                <span>Edit Skill Levels</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-xl border border-white/[0.08] bg-[#101219] p-5 sm:p-6 hover:border-white/[0.14] transition-colors duration-150"
            >
              <div className="mb-5 pb-4 border-b border-white/[0.06]">
                <h3 className="font-display text-lg font-semibold text-slate-100">
                  {category.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                  {category.description}
                </p>
              </div>

              <ul className="space-y-4">
                {category.skills.map((skill) => (
                  <li key={skill.id} className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-sm font-medium text-slate-100">{skill.name}</span>

                      {isEditing ? (
                        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                          <label className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={skill.developing}
                              onChange={(e) =>
                                onUpdateSkill(category.id, skill.id, skill.level, e.target.checked)
                              }
                              className="h-3.5 w-3.5 rounded border-white/20 bg-[#090A0F] accent-blue-500"
                            />
                            <span>Developing</span>
                          </label>

                          <select
                            aria-label={`${skill.name} proficiency level`}
                            value={skill.level}
                            onChange={(e) =>
                              onUpdateSkill(
                                category.id,
                                skill.id,
                                e.target.value as SkillLevel,
                                skill.developing
                              )
                            }
                            className="rounded-md border border-white/[0.12] bg-[#090A0F] px-2.5 py-1 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
                          >
                            {SKILL_LEVELS.map((lvl) => (
                              <option key={lvl} value={lvl}>
                                {lvl}
                              </option>
                            ))}
                          </select>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <span className="text-slate-300">{skill.level}</span>
                          {skill.developing && (
                            <>
                              <span aria-hidden="true" className="text-slate-600">
                                ·
                              </span>
                              <span className="text-violet-300">Developing</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div
                      className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]"
                      aria-hidden="true"
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-200 ${
                          skill.developing
                            ? 'bg-gradient-to-r from-blue-500/80 to-violet-500/80'
                            : 'bg-blue-500'
                        } ${LEVEL_WIDTH[skill.level]}`}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
