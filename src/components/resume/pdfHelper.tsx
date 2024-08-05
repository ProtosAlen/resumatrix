import { Document, Page, View, Text, StyleSheet, renderToBuffer } from '@react-pdf/renderer';
import { RootState } from '@/store/store';
import { ResumeData } from '@/interface/ResumeData';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    fontSize: 12,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 14,
    fontWeight: 'semibold',
    marginBottom: 5,
  },
  listItem: {
    marginBottom: 5,
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactIcon: {
    marginRight: 5,
    fontSize: 18,
    color: '#ccc',
  },
});


const resumeData = useSelector((state: RootState) => state.resumeData);

export default async function generateResumePDF(): Promise<Uint8Array> {


  try {
    console.log('resumeData:', resumeData); // Check if resumeData is available

    const doc = (
      <Document>
        <Page size="A4" style={styles.container}>
          {/* Your PDF content here, using resumeData */}
          <Text>This is a test</Text> // Temporary test content
        </Page>
      </Document>
    );

    console.log('doc:', doc); // Check if doc is created correctly


    const doc2 = (
      <Document>
        <Page size="A4" style={styles.container}>
          <View>
            {/* Contact Information */}
            <View style={styles.contactInfo}>
              <Text style={styles.contactIcon}>✉️</Text>
              <Text>{resumeData.contact.email}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactIcon}>📞</Text>
              <Text>{resumeData.contact.phone}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactIcon}>linkedin</Text>
              <Text>
                <a href={resumeData.contact.linkedin} target="_blank" rel="noreferrer">
                  {resumeData.contact.linkedin}
                </a>
              </Text>
            </View>

            {/* Name */}
            <Text style={styles.heading}>{resumeData.contact.name}</Text>

            {/* Summary */}
            <Text style={styles.subheading}>Summary</Text>
            <Text>{resumeData.summary}</Text>

            {/* Skills */}
            <Text style={styles.subheading}>Skills</Text>
            <View style={{ display: 'flex', flexWrap: 'wrap' }}>
              {resumeData.skills.map((skill) => (
                <Text key={skill} style={{ marginRight: 10, backgroundColor: '#eee', padding: 5, borderRadius: 5 }}>
                  {skill}
                </Text>
              ))}
            </View>

            {/* Education */}
            <Text style={styles.subheading}>Education</Text>
            {resumeData.education.map((edu) => (
              <View key={edu.degree} style={{ marginBottom: 10 }}>
                <Text style={styles.subheading}>{edu.degree}</Text>
                <Text>{edu.institution}</Text>
                <Text>{edu.year}</Text>
              </View>
            ))}

            {/* Additional Sections */}
            {['Additional', 'Work Experience', 'Projects', 'Volunteer Experience'].map((section) => (
              resumeData[section.toLowerCase()]?.length > 0 && (
                <>
                  <Text style={styles.subheading}>{section}</Text>
                  {resumeData[section.toLowerCase()]?.map((item: ResumeData[keyof ResumeData][number]) => (
                    <View key={item.title || item.organization} style={{ marginBottom: 10 }}>
                      {section === 'Work Experience' && (
                        <Text>
                          {item.company}
                          <Text style={{ color: '#ccc' }}>{` (${item.startDate} - ${item.endDate}) `}</Text>
                        </Text>
                      )}
                      {section !== 'Work Experience' && <Text>{item.title}</Text>}
                      {item.description && <Text>{item.description}</Text>}
                      {section === 'Additional' && item.technologies && (
                        <Text>Technologies: {item.technologies.join(', ')}</Text>
                      )}
                      {section === 'Work Experience' && item.responsibilities && (
                        <ul style={{ paddingLeft: 20 }}>
                          {item.responsibilities.map((responsibility: string) => (
                            <li key={responsibility}>{responsibility}</li>
                          ))}
                        </ul>
                      )}
                      {section === 'Certifications' || section === 'Awards' ? (
                        <ul style={{ paddingLeft: 20 }}>
                          {item.map((certOrAward: string) => (
                            <li key={certOrAward}>{certOrAward}</li>
                          ))}
                        </ul>
                      ) : null}
                    </View>
                  ))}
                </>
              )
            ))}
          </View>
        </Page>
      </Document>
    );

    const buffer = await renderToBuffer(doc);
    return buffer;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error; // Re-throw the error for proper handling
  }
}
