import {Dimensions, StyleSheet} from 'react-native';

export const createStyles = (colors, textSize) => {

  return StyleSheet.create({
    container: {
      // flex: 1,
      height: Dimensions.get('window').height,
      padding: 24,
      backgroundColor: colors.background,
      justifyContent: 'center',
    },
    title: {
      fontSize: textSize + 8,
      fontWeight: 'bold',
      marginBottom: 24,
      color: colors.primary,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 20,
    },
    input: {
      height: 56,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 12,
      paddingHorizontal: 16,
      fontSize: textSize,
      backgroundColor: colors.card,
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 16,
    },
    buttonText: {
      color: colors.btnText,
      fontSize: textSize + 2,
      fontWeight: '600',
    },
    secondaryButtonText: {
      color: colors.title,
    },
    clearText: {
      color: colors.secondary,
      textAlign: 'center',
      marginTop: 8,
    },
    footerText: {
      fontSize: textSize + 2,
      color: colors.subtitle,
      opacity: 0.8,
    },
    linkText: {
      color: colors.primary,
      fontSize: textSize + 2,
      fontWeight: '600',
      marginLeft: 8,
    },
    errorText: {
      color: colors.error,
      textAlign: 'center',
      marginBottom: 16,
      fontSize: textSize,
    },
    successText: {
      color: colors.success,
      textAlign: 'center',
      marginBottom: 16,
      fontSize: textSize,
    },
    registerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 32,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });
}