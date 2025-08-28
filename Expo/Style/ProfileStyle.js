import {Dimensions, StyleSheet} from 'react-native';
const { height } = Dimensions.get('window');

export const createStyles = (colors, textSize) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      padding: 20,
    },
    title: {
      fontSize: textSize + 10,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: colors.title,
    },
    inputContainer: {
      marginBottom: 16,
    },
    label: {
      fontSize: textSize + 2,
      color: colors.subtitle,
      marginBottom: 8,
    },
    input: {
      height: 50,
      borderColor: colors.inputText,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      fontSize: textSize + 2,
      color: colors.text,
    },
    error: {
      color: colors.error,
      textAlign: 'center',
      marginBottom: 15,
    },
    success: {
      color: colors.success,
      textAlign: 'center',
      marginBottom: 15,
    },
    buttonSpacer: {
      height: 15,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      marginVertical: 8,
    },
    buttonText: {
      color: colors.btnText,
      fontSize: textSize + 2,
      fontWeight: '600',
    },
    section: {
      marginVertical: 32,
    },
    sectionTitle: {
      fontSize: textSize + 6,
      fontWeight: '600',
      marginBottom: 16,
      color: colors.title,
    },
    securityCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    securityText: {
      fontSize: textSize + 2,
      color: colors.title,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });
}