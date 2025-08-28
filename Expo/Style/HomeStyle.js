import { StyleSheet } from 'react-native';

export const createStyles = (colors, textSize) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: colors.background,
    },
    header: {
      marginBottom: 24,
    },
    title: {
      fontSize: textSize + 10,
      fontWeight: 'bold',
      color: colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: textSize,
      color: colors.text,
      opacity: 0.8,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 20,
      shadowColor: colors.shadow,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    fieldHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    fieldIcon: {
      backgroundColor: colors.primary + '20',
      borderRadius: 12,
      padding: 8,
      marginRight: 16,
    },
    fieldTitle: {
      fontSize: textSize + 4,
      fontWeight: '600',
      color: colors.text,
      flex: 1,
    },
    progressContainer: {
      marginBottom: 16,
    },
    progressText: {
      fontSize: textSize - 2,
      color: colors.text,
      opacity: 0.8,
    },
    progressBar: {
      height: 8,
      backgroundColor: colors.background,
      borderRadius: 4,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      backgroundColor: colors.primary,
      borderRadius: 4,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
      flex: 1,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 4,
    },
    primaryButton: {
      backgroundColor: colors.primary,
    },
    secondaryButton: {
      backgroundColor: colors.card,
      borderWidth: 1,
      borderColor: colors.border,
    },
    buttonText: {
      fontSize: textSize,
    },
    primaryButtonText: {
      color: colors.btnText,
      fontWeight: 'bold',
    },
    secondaryButtonText: {
      color: colors.text,
      fontWeight: '500',
    },
    emptyState: {
      alignItems: 'center',
      padding: 40,
    },
    emptyIcon: {
      marginBottom: 24,
    },
    emptyText: {
      fontSize: textSize,
      color: colors.text,
      opacity: 0.7,
      textAlign: 'center',
      marginBottom: 24,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });
}
