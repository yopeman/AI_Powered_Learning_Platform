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
      padding: 16,
      alignItems: 'center',
    },
    errorText: {
      color: colors.error,
    },
    title: {
      fontSize: textSize + 10,
      fontWeight: 'bold',
      marginBottom: 16,
      textAlign: 'center',
      color: colors.title,
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
    sectionTitle: {
      fontSize: textSize + 4,
      fontWeight: '600',
      marginBottom: 16,
      color: colors.title,
    },
    label: {
      fontSize: textSize + 2,
      color: colors.title,
      marginBottom: 8,
    },
    picker: {
      height: 50,
      borderRadius: 8,
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.text,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    half: {
      flex: 1,
      marginRight: 12,
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      height: 56,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
    },
    buttonText: {
      color: colors.btnText,
      fontSize: textSize + 2,
      fontWeight: '600',
      marginLeft: 12,
    },
  });
}