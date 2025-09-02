import { StyleSheet } from 'react-native';

export const createStyles = (colors, textSize) => {

  return StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: colors.background,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 24,
      marginBottom: 24,
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    title: {
      fontSize: textSize + 10,
      fontWeight: 'bold',
      marginBottom: 20,
      color: colors.title,
    },
    questionContainer: {
      marginBottom: 15,
      backgroundColor: colors.subBgTitle,
      padding: 20,
      borderRadius: 12,
    },
    result: {
      marginTop: 20,
      fontSize: textSize + 4,
      color: colors.text
    },
    errorContainer: {
      padding: 20,
      alignItems: 'center',
    },
    errorText: {
      color: colors.error,
      marginBottom: 10,
    },
    button: {
      borderRadius: 12,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
      backgroundColor: colors.primary,
      color: colors.btnText,
      fontWeight: 'bold',
    },
    scoreErrorText: {
      color: colors.error,
      textAlign: 'center',
      marginVertical: 16,
    },
    scoreSuccessText: {
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