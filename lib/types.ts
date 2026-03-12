export interface Profile {
  name: string;
  title: string;
  description: string;
  location: string;
  resumeUrl: string;
  image: string;
}

export interface Socials {
  github: string;
  linkedin: string;
  instagram: string;
  twitter: string;
  email: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  period: string;
  description: string;
  image: string;
  tech: string[];
  links: { label: string; url: string }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
}

export interface PortfolioData {
  profile: Profile;
  socials: Socials;
  skills: string[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: ProjectItem[];
  achievements: AchievementItem[];
}
