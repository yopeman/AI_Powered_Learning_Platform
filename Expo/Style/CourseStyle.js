import { StyleSheet } from 'react-native';

export const createStyles = (colors, textSize) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: colors.background,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    errorText: {
      color: colors.error,
      textAlign: 'center',
    },
    header: {
      padding: 16,
      borderRadius: 16,
      backgroundColor: colors.card,
      marginBottom: 24,
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    title: {
      fontSize: textSize + 6,
      fontWeight: 'bold',
      marginBottom: 8,
      color: colors.text,
    },
    subtitle: {
      fontSize: textSize,
      color: colors.text,
      opacity: 0.8,
      marginBottom: 4,
    },
    courseInfo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    sectionTitle: {
      fontSize: textSize + 4,
      fontWeight: '600',
      marginBottom: 16,
      color: colors.text,
    },
    chapterCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    chapterText: {
      flex: 1,
      marginLeft: 16,
    },
    chapterTitle: {
      fontSize: textSize + 2,
      fontWeight: '600',
      color: colors.text,
    },
    chapterDesc: {
      fontSize: textSize - 2,
      color: colors.text,
      opacity: 0.7,
      marginTop: 4,
    },
  });
}