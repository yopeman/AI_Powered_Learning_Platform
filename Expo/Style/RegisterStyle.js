import { StyleSheet } from 'react-native';

export const createStyles = (colors, textSize) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 24,
    },
    header: {
      alignItems: 'center',
      marginBottom: 32,
    },
    title: {
      fontSize: textSize + 10,
      fontWeight: 'bold',
      color: colors.title,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: textSize + 2,
      color: colors.subtitle,
      opacity: 0.8,
      textAlign: 'center',
    },
    inputContainer: {
      marginBottom: 20,
    },
    inputLabel: {
      fontSize: textSize + 2,
      color: colors.subtitle,
      marginBottom: 8,
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: 16,
    },
    input: {
      flex: 1,
      height: 56,
      fontSize: textSize + 2,
      color: colors.title,
      paddingVertical: 16,
    },
    icon: {
      marginRight: 12,
    },
    passwordToggle: {
      padding: 8,
    },
    messageContainer: {
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 12,
      marginBottom: 20,
    },
    messageText: {
      fontSize: textSize + 2,
      textAlign: 'center',
    },
    securityNote: {
      fontSize: textSize,
      color: colors.subtitle,
      opacity: 0.7,
      textAlign: 'center',
      marginBottom: 24,
      marginTop: 8,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 16,
    },
    buttonText: {
      color: colors.btnText,
      fontSize: textSize + 2,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: colors.border,
    },
    secondaryButtonText: {
      color: colors.title,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 32,
    },
    footerText: {
      fontSize: textSize + 2,
      color: colors.subtitle,
      opacity: 0.8,
    },
    footerLink: {
      color: colors.primary,
      fontSize: textSize + 2,
      fontWeight: '600',
      marginLeft: 8,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });
}