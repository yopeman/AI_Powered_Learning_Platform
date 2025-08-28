import { StyleSheet } from 'react-native';

export const createStyles = (colors, textSize) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    errorContainer: {
      padding: 20,
      alignItems: 'center',
    },
    errorText: {
      color: colors.error,
    },
    header: {
      marginBottom: 32,
    },
    title: {
      fontSize: textSize + 10,
      fontWeight: 'bold',
      color: colors.title,
      marginBottom: 8,
    },
    description: {
      fontSize: textSize + 2,
      color: colors.subtitle,
      opacity: 0.8,
      marginBottom: 12,
    },
    metaContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 12,
    },
    metaPill: {
      backgroundColor: colors.inputText,
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 12,
      marginRight: 8,
      marginBottom: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    metaText: {
      fontSize: textSize,
      color: colors.title,
      marginLeft: 4,
    },
    sectionTitle: {
      fontSize: textSize + 6,
      fontWeight: '600',
      color: colors.title,
      marginBottom: 16,
    },
    yearContainer: {
      marginBottom: 32,
    },
    yearHeader: {
      fontSize: textSize + 4,
      fontWeight: '600',
      color: colors.title,
      marginBottom: 8,
    },
    semesterContainer: {
      marginBottom: 24,
    },
    semesterHeader: {
      fontSize: textSize + 2,
      fontWeight: '500',
      color: colors.subtitle,
      marginBottom: 12,
    },
    courseCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 12,
      flexDirection: 'row',
      alignItems: 'center',
    },
    courseText: {
      flex: 1,
      marginLeft: 16,
    },
    courseTitle: {
      fontSize: textSize + 2,
      fontWeight: '600',
      color: colors.title,
    },
    courseDesc: {
      fontSize: textSize,
      color: colors.subtitle,
      opacity: 0.7,
      marginTop: 4,
    },
    certificateCard: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
      marginTop: 24,
    },
    certificateText: {
      fontSize: textSize + 2,
      fontWeight: '600',
      color: colors.title,
      textAlign: 'center',
      marginBottom: 16,
    },
    certificateButton: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    certificateButtonText: {
      color: colors.btnText,
      fontWeight: '600',
    },
  });
}