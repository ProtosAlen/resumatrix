import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';
import { ResumeData } from '@/interface/ResumeData';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#333',
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    width: '48%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'semibold',
    marginBottom: 3,
  },
  text: {
    marginBottom: 5,
    lineHeight: 1.5,
  },
  list: {
    paddingLeft: 10,
    marginBottom: 10,
  },
  listItem: {
    marginBottom: 3,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  contactIcon: {
    marginRight: 5,
    fontSize: 14,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  skill: {
    backgroundColor: '#eee',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
});

export default function GenerateResumePDF(resumeData: ResumeData) {



  const handleGeneratePDF = async () => {
    try {
      const doc = (
        <Document>
          <Page size="A4" style={styles.container}>
            <View style={styles.columns}>

              {/* Col 1 */}
              <View style={styles.column}>
                <View style={styles.section}>
                  <Text style={styles.header}>{resumeData.contact.name}</Text>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactIcon}>✉️</Text>
                    <Text>{resumeData.contact.email}</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactIcon}>📞</Text>
                    <Text>{resumeData.contact.phone}</Text>
                  </View>
                  <View style={styles.contactInfo}>
                    <Text style={styles.contactIcon}>🔗</Text>
                    <Text style={styles.contactIcon}>
                      {resumeData.contact.linkedin}
                    </Text>
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.heading}>Summary</Text>
                  <Text style={styles.text}>{resumeData.summary}</Text>
                </View>

                <View style={styles.section}>
                  <Text style={styles.heading}>Skills</Text>
                  <View style={styles.skillsContainer}>
                    {resumeData.skills.map((skill) => (
                      <Text key={skill} style={styles.skill}>{skill}</Text>
                    ))}
                  </View>
                </View>

                <View style={styles.section}>
                  <Text style={styles.heading}>Education</Text>
                  {resumeData.education.map((edu) => (
                    <View key={edu.degree} style={styles.section}>
                      <Text style={styles.subheading}>{edu.degree}</Text>
                      <Text style={styles.text}>{edu.institution}</Text>
                      <Text style={styles.text}>{edu.year}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.heading}>Additional</Text>
                  {resumeData.additional.map((add) => (
                    <View key={add.category} style={styles.section}>
                      <Text style={styles.subheading}>{add.category}</Text>
                      <Text style={styles.text}>{add.details}</Text>
                      <Text style={styles.text}>{add.technologies}</Text>
                    </View>
                  ))}
                </View>

              </View>


              {/* Col 2 */}
              <View style={styles.column}>
                <View style={styles.section}>
                  <Text style={styles.heading}>Work Experience</Text>
                  {resumeData.workExperience.map((exp) => (
                    <View key={exp.company} style={styles.section}>
                      <Text style={styles.subheading}>{exp.company}</Text>
                      <Text style={styles.text}>
                        {exp.title} <Text style={{ color: '#ccc' }}>{`(${exp.startDate} - ${exp.endDate})`}</Text>
                      </Text>
                      <View style={styles.list}>
                        {exp.responsibilities.map((responsibility, index) => (
                          <Text key={index} style={styles.listItem}>• {responsibility}</Text>
                        ))}
                      </View>
                    </View>
                  ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.heading}>Projects</Text>
                  {resumeData.projects.map((project) => (
                    <View key={project.title} style={styles.section}>
                      <Text style={styles.subheading}>{project.title}</Text>
                      <Text style={styles.text}>{project.description}</Text>
                      <Text style={styles.text}>Technologies: {project.technologies.join(', ')}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.heading}>Volunteer Experience</Text>
                  {resumeData.volunteer.map((vol) => (
                    <View key={vol.organization} style={styles.section}>
                      <Text style={styles.subheading}>{vol.organization}</Text>
                      <Text style={styles.text}>{vol.role}</Text>
                      <Text style={styles.text}>{vol.startDate} - {vol.endDate}</Text>
                      <Text style={styles.text}>{vol.description}</Text>
                    </View>
                  ))}
                </View>

                {resumeData.certifications && resumeData.certifications.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.heading}>Certifications</Text>
                    <View style={styles.list}>
                      {resumeData.certifications.map((cert) => (
                        <Text key={cert} style={styles.listItem}>• {cert}</Text>
                      ))}
                    </View>
                  </View>
                )}

                {resumeData.awards && resumeData.awards.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.heading}>Awards</Text>
                    <View style={styles.list}>
                      {resumeData.awards.map((award) => (
                        <Text key={award} style={styles.listItem}>• {award}</Text>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Page>
        </Document>
      );
      const pdfBlob = await pdf(doc).toBlob();
      return pdfBlob;
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw error;
    }
  };

  return handleGeneratePDF();
}



