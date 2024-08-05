import { Document, Page, View, Text, StyleSheet, pdf } from '@react-pdf/renderer';
import { ResumeData } from '@/interface/ResumeData';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    fontSize: 12,

    color: '#333',
  },
  columns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  columnLeft: {
    width: '40%',
    backgroundColor: '#1E3A8A', // Blue background color
    padding: 4,
    color: 'white',
    borderRadius: 4,
  },
  columnRight: {
    width: '60%',
    paddingLeft: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {
    marginBottom: 8,
    borderRadius: 8, // Adjust radius as needed
    padding: 4, // Optional padding
  },
  card: {
    margin: 4,
    backgroundColor: '#f0f0f0', // Light gray background
    borderRadius: 8, // Adjust radius as needed
    padding: 12, // Optional padding
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', // Light shadow
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'semibold',
    marginBottom: 4,
  },
  subheading2: {
    fontSize: 12,
    fontWeight: 'normal',
    marginBottom: 3,
  },
  text: {
    marginBottom: 5,
    lineHeight: 1.5,
  },
  techL: {
    fontSize: 11,
    fontWeight: 'medium',
    color: '#ababab', // Lighter gray color
  },
  tech: {
    fontSize: 11,
    fontWeight: 'medium',
    color: '#6b6b6b', // Lighter gray color
  },
  list: {
    paddingLeft: 10,
    marginBottom: 4,
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
    fontSize: 10,
    backgroundColor: '#d1d1d1',
    color: 'black',
    padding: 5,
    borderRadius: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  workDates: {
    fontSize: 10,
    color: '#a8a8a8',

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
              <View style={styles.columnLeft}>
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
                      <Text style={styles.techL}>{add.technologies.join(', ')}</Text>
                    </View>
                  ))}
                </View>

              </View>


              {/* Col 2 */}
              <View style={styles.columnRight}>
                <View style={styles.section}>
                  <Text style={styles.heading}>Work Experience</Text>
                  {resumeData.workExperience.map((exp) => (
                    <View key={exp.company} style={styles.card}>
                      <Text style={styles.subheading}>{exp.company} <Text style={styles.workDates}>{`(${exp.startDate} - ${exp.endDate})`}</Text></Text>
                      <Text style={styles.text}>
                        {exp.title}
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
                    <View key={project.title} style={styles.card}>
                      <Text style={styles.subheading}>{project.title}</Text>
                      <Text style={styles.text}>{project.description}</Text>
                      <Text style={styles.tech}>{project.technologies.join(', ')}</Text>
                    </View>
                  ))}
                </View>

                <View style={styles.section}>
                  <Text style={styles.heading}>Volunteer Experience</Text>
                  {resumeData.volunteer.map((vol) => (
                    <View key={vol.organization} style={styles.card}>
                      <Text style={styles.subheading}>{vol.organization}</Text>
                      <Text style={styles.text}>{vol.role}</Text>
                      <Text style={styles.tech}>{vol.startDate} - {vol.endDate}</Text>
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



