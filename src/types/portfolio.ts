export type SkillLevel = 'Developing' | 'Foundational' | 'Intermediate' | 'Proficient';

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
  developing: boolean;
  note?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export type ProjectCategory =
  | 'All'
  | 'Web Development'
  | 'Artificial Intelligence'
  | 'Software Systems'
  | 'Cybersecurity';

export type ProjectStatus = 'Completed' | 'Active Build' | 'In Development' | 'Planned';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  category: Exclude<ProjectCategory, 'All'>;
  status: ProjectStatus;
  technologies: string[];
  imageUrl: string;
  imageAlt: string;
  liveUrl: string;
  githubUrl: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  levelLabel: string;
  title: string;
  institution: string;
  timeframe: string;
  status: 'Completed' | 'Planned' | 'In Progress';
  details: string;
}

export interface AboutData {
  introduction: string;
  currentEducation: string;
  programmingInterests: string;
  careerGoals: string;
  areasOfInterest: string;
}

export interface ProfileIdentity {
  name: string;
  headline: string;
  subheadline: string;
  heroSummary: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  location: string;
  resumeFileName: string | null;
  resumeDataUrl: string | null;
}

export interface PortfolioState {
  identity: ProfileIdentity;
  about: AboutData;
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
  education: EducationItem[];
}

export interface ContactFormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}
