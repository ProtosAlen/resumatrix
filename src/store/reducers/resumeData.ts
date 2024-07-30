import { ResumeData } from '@/interface/ResumeData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import resumeData from '@/data/resume.json'; 

const initialState: ResumeData = resumeData; // Use imported data

const resumeSlice = createSlice({
  name: 'resumeData',
  initialState,
  reducers: {
    updateContactName(state, action: PayloadAction<string>) {
      state.contact.name = action.payload;
    },
    updateContactEmail(state, action: PayloadAction<string>) {
      state.contact.email = action.payload;
    },
    updateContactPhone(state, action: PayloadAction<string>) {
      state.contact.phone = action.payload;
    },
    updateContactLinkedin(state, action: PayloadAction<string>) {
      state.contact.linkedin = action.payload;
    },
    updateSummary(state, action: PayloadAction<string>) {
      state.summary = action.payload;
    },
    addSkill(state, action: PayloadAction<string>) {
      state.skills.push(action.payload);
    },
    removeSkill(state, action: PayloadAction<number>) {
      state.skills.splice(action.payload, 1);
    },
    updateSkill(state, action: PayloadAction<{ index: number; newSkill: string }>) {
      state.skills[action.payload.index] = action.payload.newSkill;
    },
    addEducation(state, action: PayloadAction<{ degree: string; institution: string; year: string }>) {
      state.education.push(action.payload);
    },
    updateEducation(state, action: PayloadAction<{ index: number; updatedEducation: { degree: string; institution: string; year: string } }>) {
      state.education[action.payload.index] = action.payload.updatedEducation;
    },
    removeEducation(state, action: PayloadAction<number>) {
      state.education.splice(action.payload, 1);
    },

    removeWorkExperience(state, action: PayloadAction<number>) {
      state.workExperience.splice(action.payload, 1);
    },
    // Add similar reducers for projects, certifications, awards, and volunteer
  },
});

export const {
  updateContactName,
  updateContactEmail,
  updateContactPhone,
  updateContactLinkedin,
  updateSummary,
  addSkill,
  removeSkill,
  updateSkill,
  addEducation,
  updateEducation,
  removeEducation,
 
  removeWorkExperience,
  // Add similar action creators for other sections
} = resumeSlice.actions;

export default resumeSlice.reducer;
