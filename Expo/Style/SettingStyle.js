import { StyleSheet } from 'react-native';

export const createStyles = (colors, textSize) => {

  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16
    },
    title: {
      fontSize: textSize + 10,
      fontWeight: 'bold',
      marginBottom: 20
    },
    card: {
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
      shadowColor: colors.shadow,
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.shadow
    },
    settingText: {
      flex: 1,
      marginLeft: 12,
      fontSize: textSize + 2
    },
    sizeOptions: {
      // flexDirection: 'row',
      gap: 10
    },
    sizeOption: {
      padding: 6,
      borderRadius: 6
    },
    selectedSize: {
      fontWeight: 'bold',
      backgroundColor: colors.indexColor
    },
    sectionTitle: {
      fontSize: textSize + 4,
      fontWeight: '600',
      marginBottom: 8
    },
    description: {
      fontSize: textSize,
      opacity: 0.8
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.background,
    },
  });
}