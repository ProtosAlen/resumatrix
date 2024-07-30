import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ResumeState {
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

const initialState: ResumeState = {
  // Replace with your initial resume data
  contact: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
  },
  summary: '',
  skills: [],
  education: [],
  workExperience: [],
  projects: [],
  certifications: [],
  awards: [],
  volunteer: [],
};

const resumeSlice = createSlice({
  name: 'resumeData',
  initialState,
  reducers: {
    updateContactName(state: { contact: { name: any; }; }, action: PayloadAction<string>) {
      state.contact.name = action.payload;
    },
    updateContactEmail(state: { contact: { email: any; }; }, action: PayloadAction<string>) {
      state.contact.email = action.payload;
    },
    // ... other contact update actions
    updateSummary(state: { summary: any; }, action: PayloadAction<string>) {
      state.summary = action.payload;
    },
    addSkill(state: { skills: any[]; }, action: PayloadAction<string>) {
      state.skills.push(action.payload);
    },
    removeSkill(state: { skills: any[]; }, action: PayloadAction<number>) {
      state.skills.splice(action.payload, 1);
    },
    // ... other skills actions
    addEducation(state: { education: any[]; }, action: PayloadAction<{ degree: string; institution: string; year: string }>) {
      state.education.push(action.payload);
    },
    updateEducation(state: { education: { [x: string]: any; }; }, action: PayloadAction<{ index: number; updatedEducation: { degree: string; institution: string; year: string } }>) {
      state.education[action.payload.index] = action.payload.updatedEducation;
    },
    removeEducation(state: { education: any[]; }, action: PayloadAction<number>) {
      state.education.splice(action.payload, 1);
    },
    // ... other education actions
    // ... other reducers for workExperience, projects, certifications, awards, volunteer
  },
});

export const {
  updateContactName,
  updateContactEmail,
  // ... other contact action creators
  updateSummary,
  addSkill,
  removeSkill,
  // ... other skills action creators
  addEducation,
  updateEducation,
  removeEducation,
  // ... other action creators
} = resumeSlice.actions;

export default resumeSlice.reducer;
