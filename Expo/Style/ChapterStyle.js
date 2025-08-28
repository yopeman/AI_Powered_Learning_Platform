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
    header: {
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,
    },
    chapterNumber: {
      fontSize: textSize + 6,
      fontWeight: '600',
      color: colors.secondary,
      marginBottom: 8,
    },
    chapterTitle: {
      fontSize: textSize + 10,
      fontWeight: 'bold',
      color: colors.title,
      marginBottom: 12,
    },
    description: {
      fontSize: textSize + 2,
      color: colors.subtitle,
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: textSize + 4,
      fontWeight: '600',
      color: colors.title,
      marginBottom: 16,
    },
    topicCard: {
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      flexDirection: 'row',
      alignItems: 'center',
    },
    topicIndex: {
      width: 36,
      height: 36,
      borderRadius: 18,
      backgroundColor: colors.indexColor,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
    },
    indexText: {
      fontSize: textSize + 2,
      fontWeight: 'bold',
      color: colors.secondary,
    },
    topicContent: {
      flex: 1,
    },
    topicTitle: {
      fontSize: textSize + 4,
      fontWeight: '600',
      color: colors.title,
    },
    durationBadge: {
      backgroundColor: colors.indexColor,
      borderRadius: 20,
      paddingVertical: 4,
      paddingHorizontal: 12,
      marginTop: 8,
      alignSelf: 'flex-start',
    },
    durationText: {
      fontSize: textSize,
      color: colors.secondary,
    },
  });
}