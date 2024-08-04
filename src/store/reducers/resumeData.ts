import { ResumeData } from '@/interface/ResumeData';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import resumeData from '@/data/resume.json';

const initialState: ResumeData = resumeData;

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
    addEducation(state, action: PayloadAction<{ degree: string; institution: string; year: string }>) {
      state.education.push(action.payload);
    },
    updateEducation(state, action: PayloadAction<{ index: number; field: 'degree' | 'institution' | 'year'; value: string }>) {
      const { index, field, value } = action.payload;
      state.education[index][field] = value;
    },
    removeEducation(state, action: PayloadAction<number>) {
      state.education.splice(action.payload, 1);
    },
    addWorkExperience(state, action: PayloadAction<{ company: string; title: string; startDate: string; endDate: string; responsibilities: string[] }>) {
      state.workExperience.push(action.payload);
    },
    updateWorkExperience(state, action: PayloadAction<{ index: number; field: 'company' | 'title' | 'startDate' | 'endDate' | 'responsibilities'; value: string | string[] }>) {
      const { index, field, value } = action.payload;
      if (field === 'responsibilities') {
        // Ensure value is an array and split if necessary
        const responsibilitiesArray = Array.isArray(value) ? value : value.split(',').map(item => item.trim());
        state.workExperience[index].responsibilities = responsibilitiesArray;
        console.log('log workEx ', responsibilitiesArray)
      } else {
        state.workExperience[index][field] = value as string;
      }
    },

    removeWorkExperience(state, action: PayloadAction<number>) {
      state.workExperience.splice(action.payload, 1);
    },
    addProject(state, action: PayloadAction<{ title: string; description: string; technologies: string[] }>) {
      state.projects.push(action.payload);
    },
    updateProject(state, action: PayloadAction<{ index: number; field: 'title' | 'description' | 'technologies'; value: string | string[] }>) {
      const { index, field, value } = action.payload;
      if (field === 'technologies') {
        state.projects[index].technologies = value as string[];
      } else {
        state.projects[index][field] = value as string;
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
    addAdditional(state, action: PayloadAction<{ category: string; details: string; technologies: string[] }>) {
      state.additional.push(action.payload);
    },
    updateAdditional(state, action: PayloadAction<{ index: number; field: 'category' | 'details' | 'technologies'; value: string | string[] }>) {
      const { index, field, value } = action.payload;
      if (field === 'technologies') {
        state.additional[index].technologies = value as string[];
      } else {
        state.additional[index][field] = value as string;
      }
    },
    removeAdditional(state, action: PayloadAction<number>) {
      state.additional.splice(action.payload, 1);
    },
    addVolunteerExperience(state, action: PayloadAction<{ organization: string; role: string; startDate: string; endDate: string; description: string }>) {
      state.volunteer.push(action.payload);
    },
    updateVolunteerExperience(state, action: PayloadAction<{ index: number; field: 'organization' | 'role' | 'startDate' | 'endDate' | 'description'; value: string }>) {
      const { index, field, value } = action.payload;
      state.volunteer[index][field] = value;
    },
    removeVolunteerExperience(state, action: PayloadAction<number>) {
      state.volunteer.splice(action.payload, 1);
    },
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
