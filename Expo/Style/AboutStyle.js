import { StyleSheet } from 'react-native';

export const createStyles = (colors, textSize) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: colors.background,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
    },
    logo: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: colors.indexColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    title: {
      fontSize: textSize + 10,
      fontWeight: 'bold',
      color: colors.title,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: textSize + 2,
      color: colors.subtitle,
      textAlign: 'center',
      maxWidth: '80%',
      lineHeight: 24,
    },
    section: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: textSize + 6,
      fontWeight: '600',
      color: colors.title,
      marginBottom: 16,
    },
    feedbackInput: {
      backgroundColor: colors.inputText,
      borderRadius: 12,
      padding: 16,
      minHeight: 120,
      fontSize: textSize + 2,
      color: colors.title,
      textAlignVertical: 'top',
      marginBottom: 16,
    },
    ratingContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
    },
    starButton: {
      padding: 8,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
      marginBottom: 16,
    },
    buttonText: {
      color: colors.btnText,
      fontSize: textSize + 2,
      fontWeight: '600',
    },
    resetButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
    resetText: {
      color: colors.title,
    },
    errorText: {
      color: colors.error,
      textAlign: 'center',
      marginVertical: 16,
    },
    successText: {
      color: colors.success,
      textAlign: 'center',
      marginVertical: 16,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });
}