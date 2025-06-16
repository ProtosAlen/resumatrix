import { Document, Page, View, Text, StyleSheet, pdf } from "@react-pdf/renderer";
import { ResumeData } from "@/interface/ResumeData";

const colors = {
  primary: "#f8f8f8",       // Light background for columns (instead of blue)
  secondary: "#e0e0e0",     // Soft divider color (used in borderBottom)
  textDark: "#333333",
  textGray: "#6b6b6b",
  textLightGray: "#a8a8a8",
  cardBg: "white",
  shadowColor: "rgba(0, 0, 0, 0.05)",
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    fontSize: 12,
    color: colors.textDark,
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnLeft: {
    width: "40%",
    backgroundColor: colors.primary,
    padding: 24,
    borderRadius: 12,
    // subtle shadow
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  columnRight: {
    width: "58%",
    padding: 24,
    backgroundColor: colors.primary,
    borderRadius: 12,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
    color: colors.textDark,
  },
  contactInfo: {
    marginBottom: 24,
  },
  contactLine: {
    flexDirection: "row",
    marginBottom: 8,
    fontSize: 12,
    color: colors.textDark,
  },
  contactIcon: {
    marginRight: 6,
    fontSize: 14,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 12,
    marginBottom: 24,
  },
  skill: {
    fontSize: 10,
    backgroundColor: "#d1d1d1",
    color: "black",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 6,
  },
  cardSpacing: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: colors.cardBg,
    borderRadius: 12,
    shadowColor: colors.shadowColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },
  subheading: {
    fontSize: 14,
    fontWeight: "semibold",
    marginBottom: 6,
    color: colors.textDark,
  },
  subheading2: {
    fontSize: 12,
    marginBottom: 4,
    color: colors.textLightGray,
  },
  text: {
    fontSize: 12,
    lineHeight: 1.5,
    color: colors.textDark,
  },
  tech: {
    fontSize: 11,
    fontWeight: "medium",
    color: colors.textGray,
  },
  workDates: {
    fontSize: 10,
    color: colors.textLightGray,
  },
  list: {
    paddingLeft: 14,
    marginTop: 6,
  },
  listItem: {
    marginBottom: 4,
    fontSize: 12,
  },
});

export default async function GenerateResumePDF(resumeData: ResumeData) {
  try {
    const doc = (
      <Document>
        <Page size="A4" style={styles.container}>
          <View style={styles.columns}>
            {/* Left Column */}
            <View style={styles.columnLeft}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{resumeData.contact.name}</Text>
                <View style={styles.contactInfo}>
                  <View style={styles.contactLine}>
                    <Text style={styles.contactIcon}>✉️</Text>
                    <Text>{resumeData.contact.email}</Text>
                  </View>
                  <View style={styles.contactLine}>
                    <Text style={styles.contactIcon}>📞</Text>
                    <Text>{resumeData.contact.phone}</Text>
                  </View>
                  <View style={styles.contactLine}>
                    <Text style={styles.contactIcon}>🔗</Text>
                    <Text>{resumeData.contact.linkedin}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Summary</Text>
                <Text style={styles.text}>{resumeData.summary}</Text>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Skills</Text>
                <View style={styles.skillsContainer}>
                  {resumeData.skills.map((skill) => (
                    <Text key={skill} style={styles.skill}>
                      {skill}
                    </Text>
                  ))}
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Education</Text>
                {resumeData.education.map((edu) => (
                  <View key={edu.degree} style={styles.cardSpacing}>
                    <Text style={styles.subheading}>{edu.degree}</Text>
                    <Text style={styles.subheading2}>{edu.institution}</Text>
                    <Text style={styles.tech}>{edu.year}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Additional</Text>
                {resumeData.additional.map((add) => (
                  <View key={add.category} style={styles.cardSpacing}>
                    <Text style={styles.subheading}>{add.category}</Text>
                    <Text style={styles.text}>{add.details}</Text>
                    <Text style={styles.tech}>{add.technologies.join(", ")}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Right Column */}
            <View style={styles.columnRight}>
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Work Experience</Text>
                {resumeData.workExperience.map((exp) => (
                  <View key={exp.company} style={styles.cardSpacing}>
                    <Text style={styles.subheading}>
                      {exp.company}{" "}
                      <Text style={styles.workDates}>
                        ({exp.startDate} - {exp.endDate})
                      </Text>
                    </Text>
                    <Text style={styles.text}>{exp.title}</Text>
                    <View style={styles.list}>
                      {exp.responsibilities.map((resp, i) => (
                        <Text key={i} style={styles.listItem}>
                          • {resp}
                        </Text>
                      ))}
                    </View>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projects</Text>
                {resumeData.projects.map((project) => (
                  <View key={project.title} style={styles.cardSpacing}>
                    <Text style={styles.subheading}>{project.title}</Text>
                    <Text style={styles.text}>{project.description}</Text>
                    <Text style={styles.tech}>{project.technologies.join(", ")}</Text>
                  </View>
                ))}
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Volunteer Experience</Text>
                {resumeData.volunteer.map((vol) => (
                  <View key={vol.organization} style={styles.cardSpacing}>
                    <Text style={styles.subheading}>{vol.organization}</Text>
                    <Text style={styles.text}>{vol.role}</Text>
                    <Text style={styles.tech}>
                      {vol.startDate} - {vol.endDate}
                    </Text>
                    <Text style={styles.text}>{vol.description}</Text>
                  </View>
                ))}
              </View>

              {resumeData.certifications?.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Certifications</Text>
                  <View style={styles.list}>
                    {resumeData.certifications.map((cert) => (
                      <Text key={cert} style={styles.listItem}>
                        • {cert}
                      </Text>
                    ))}
                  </View>
                </View>
              )}

              {resumeData.awards?.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Awards</Text>
                  <View style={styles.list}>
                    {resumeData.awards.map((award) => (
                      <Text key={award} style={styles.listItem}>
                        • {award}
                      </Text>
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
    console.error("Error generating PDF:", error);
    throw error;
  }
}
