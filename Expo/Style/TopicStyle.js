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
    contentCard: {
      backgroundColor: colors.mdBgColor,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      color: colors.text,
    },
    sectionHeader: {
      fontSize: textSize + 6,
      fontWeight: '600',
      color: colors.title,
      marginBottom: 16,
    },
    interactionCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
    },
    interactionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    questionText: {
      fontSize: textSize + 2,
      fontWeight: '600',
      color: colors.title,
      marginLeft: 8,
    },
    interactionResponse: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginTop: 8,
    },
    responseText: {
      fontSize: textSize,
      color: colors.subtitle,
      fontStyle: 'italic',
      marginLeft: 8,
    },
    emptyState: {
      alignItems: 'center',
      padding: 24,
    },
    emptyText: {
      fontSize: textSize + 2,
      color: colors.subtitle,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.card,
      borderRadius: 12,
      paddingHorizontal: 16,
      marginTop: 24,
    },
    input: {
      flex: 1,
      fontSize: textSize + 2,
      color: colors.title,
      paddingVertical: 16,
      paddingHorizontal: 8,
      minHeight: 64
    },
    sendButton: {
      padding: 10,
    },
  });
}