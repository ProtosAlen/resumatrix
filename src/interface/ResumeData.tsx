export interface ResumeData {
    contact: {
      name: string;
      email: string;
      phone: string;
      linkedin: string;
    };
    summary: string;
    skills: string[];
    education: {
      degree: string;
      institution: string;
      year: string;
    }[];
    workExperience: {
      company: string;
      title: string;
      startDate: string;
      endDate: string;
      responsibilities: string[];
    }[];
    projects: {
      title: string;
      description: string;
      technologies: string[];
    }[];
    certifications: string[];
    awards: string[];
    volunteer: {
      organization: string;
      role: string;
      startDate: string;
      endDate: string;
      description: string;
    }[];
  }