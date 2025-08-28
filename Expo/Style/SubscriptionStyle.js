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
    header: {
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
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 4},
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    fieldTitle: {
      fontSize: textSize + 6,
      fontWeight: '600',
      color: colors.title,
      marginBottom: 8,
    },
    fieldDescription: {
      fontSize: textSize + 6,
      color: colors.subtitle,
      opacity: 0.8,
      marginBottom: 12,
    },
    metaContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    metaItem: {
      flex: 1,
    },
    metaLabel: {
      fontSize: textSize,
      color: colors.subtitle,
      opacity: 0.6,
    },
    metaValue: {
      fontSize: textSize + 2,
      color: colors.title,
      fontWeight: '500',
    },
    button: {
      backgroundColor: colors.primary,
      borderRadius: 12,
      padding: 16,
      alignItems: 'center',
    },
    buttonText: {
      color: colors.btnText,
      fontSize: textSize + 2,
      fontWeight: '600',
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
  });
}