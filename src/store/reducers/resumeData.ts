// @/store/reducers/resumeData.ts
import { ResumeData } from '@/interface/ResumeData'; // Correctly importing your defined interface
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Assuming your JSON initial data also matches the ResumeData structure
import resumeDataEN from '@/data/resume_en.json';

const initialState: ResumeData = resumeDataEN as ResumeData; // Assert for strong initial typing

// Async Thunk for loading resume data based on language (if you're using it)
export const loadResume = createAsyncThunk(
  'resumeData/loadResume',
  async (selectedLanguage: 'en' | 'sl') => { // Explicitly define possible languages
    try {
      const response = await fetch(`/data/resume_${selectedLanguage}.json`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: ResumeData = await response.json(); // Type the fetched data
      return data;
    } catch (error) {
      console.error("Failed to load resume data:", error);
      throw error;
    }
  }
);

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
    updateSkill(state, action: PayloadAction<{ index: number; value: string }>) {
      state.skills[action.payload.index] = action.payload.value;
    },
    // Use the nested types directly for 'add' actions
    addEducation(state, action: PayloadAction<ResumeData['education'][number]>) {
      state.education.push(action.payload);
    },
    updateEducation(state, action: PayloadAction<{ index: number; field: keyof ResumeData['education'][number]; value: string }>) {
      const { index, field, value } = action.payload;
      if (state.education[index]) {
        state.education[index][field] = value;
      }
    },
    removeEducation(state, action: PayloadAction<number>) {
      state.education.splice(action.payload, 1);
    },
    addWorkExperience(state, action: PayloadAction<ResumeData['workExperience'][number]>) {
      state.workExperience.push(action.payload);
    },
    updateWorkExperience(state, action: PayloadAction<{ index: number; field: keyof ResumeData['workExperience'][number]; value: string | string[] }>) {
      const { index, field, value } = action.payload;
      if (state.workExperience[index]) {
        if (field === 'responsibilities') {
          state.workExperience[index].responsibilities = value as string[];
        } else {
          // Type assertion needed here because `value` could be `string[]`
          (state.workExperience[index] as any)[field] = value;
        }
      }
    },
    removeWorkExperience(state, action: PayloadAction<number>) {
      state.workExperience.splice(action.payload, 1);
    },
    addProject(state, action: PayloadAction<ResumeData['projects'][number]>) {
      state.projects.push(action.payload);
    },
    updateProject(state, action: PayloadAction<{ index: number; field: keyof ResumeData['projects'][number]; value: string | string[] }>) {
      const { index, field, value } = action.payload;
      if (state.projects[index]) {
        if (field === 'technologies') {
          state.projects[index].technologies = value as string[];
        } else {
          // Type assertion needed here
          (state.projects[index] as any)[field] = value;
        }
      }
    },
    removeProject(state, action: PayloadAction<number>) {
      state.projects.splice(action.payload, 1);
    },
    addCertification(state, action: PayloadAction<string>) {
      state.certifications.push(action.payload);
    },
    updateCertification(state, action: PayloadAction<{ index: number; value: string }>) {
      state.certifications[action.payload.index] = action.payload.value;
    },
    removeCertification(state, action: PayloadAction<number>) {
      state.certifications.splice(action.payload, 1);
    },
    addAward(state, action: PayloadAction<string>) {
      state.awards.push(action.payload);
    },
    updateAward(state, action: PayloadAction<{ index: number; value: string }>) {
      state.awards[action.payload.index] = action.payload.value;
    },
    removeAward(state, action: PayloadAction<number>) {
      state.awards.splice(action.payload, 1);
    },
    addAdditional(state, action: PayloadAction<ResumeData['additional'][number]>) {
      state.additional.push(action.payload);
    },
    updateAdditional(state, action: PayloadAction<{ index: number; field: keyof ResumeData['additional'][number]; value: string | string[] }>) {
      const { index, field, value } = action.payload;
      if (state.additional[index]) {
        if (field === 'technologies') {
          state.additional[index].technologies = value as string[];
        } else {
          // Type assertion needed here
          (state.additional[index] as any)[field] = value;
        }
      }
    },
    removeAdditional(state, action: PayloadAction<number>) {
      state.additional.splice(action.payload, 1);
    },
    addVolunteerExperience(state, action: PayloadAction<ResumeData['volunteer'][number]>) {
      state.volunteer.push(action.payload);
    },
    updateVolunteerExperience(state, action: PayloadAction<{ index: number; field: keyof ResumeData['volunteer'][number]; value: string }>) {
      const { index, field, value } = action.payload;
      if (state.volunteer[index]) {
        state.volunteer[index][field] = value;
      }
    },
    removeVolunteerExperience(state, action: PayloadAction<number>) {
      state.volunteer.splice(action.payload, 1);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadResume.fulfilled, (state, action: PayloadAction<ResumeData>) => {
      return action.payload;
    });
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
  addWorkExperience,
  updateWorkExperience,
  removeWorkExperience,
  addProject,
  updateProject,
  removeProject,
  addCertification,
  updateCertification,
  removeCertification,
  addAward,
  updateAward,
  removeAward,
  addAdditional,
  updateAdditional,
  removeAdditional,
  addVolunteerExperience,
  updateVolunteerExperience,
  removeVolunteerExperience,
} = resumeSlice.actions;

export default resumeSlice.reducer;