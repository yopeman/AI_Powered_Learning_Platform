import React, { useEffect, useState } from 'react';
import { View, Text, Switch, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/SettingStyle";

export default function SettingScreen() {
  const [darkMode, setDarkModeState] = useState(false);
  const [currentSize, setCurrentSize] = useState('small');
  const {colors, textSize, darkMode: mode, size, toggleTheme, setSize} = useTheme();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setStyles(createStyles(colors, textSize));

    setDarkModeState(mode);
    setCurrentSize(size);
  }, [colors, textSize, mode, size]);

  const textSizeOptions = [
    { label: 'Small', value: 'small', v: 14 },
    { label: 'Medium', value: 'medium', v: 16 },
    { label: 'Large', value: 'large', v: 18 },
    { label: 'X-Large', value: 'xlarge', v: 20 },
    { label: 'XX-Large', value: 'xxlarge', v: 22 },
    { label: 'XXX-Large', value: 'xxxlarge', v: 24 }
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Settings</Text>

      <View style={[styles.card, { backgroundColor: colors.card }]}>
        {/* Dark Mode */}
        <View style={styles.settingRow}>
          <MaterialIcons name="dark-mode" size={24} color={colors.primary} />
          <Text style={[styles.settingText, { color: colors.text }]}>Dark Mode</Text>
          <Switch
            value={darkMode}
            onValueChange={async (value) => {
              setDarkModeState(value);
              await toggleTheme();
            }}
            thumbColor={darkMode ? colors.primary : colors.background}
            trackColor={{ false: colors.text, true: colors.primary + '80' }}
          />
        </View>

        {/* Text Size */}
        <View style={styles.settingRow}>
          <MaterialIcons name="text-fields" size={24} color={colors.primary} />
          <Text style={[styles.settingText, { color: colors.text }]}>Text Size</Text>
          <View style={styles.sizeOptions}>
            {textSizeOptions.map(option => (
              <Text
                key={option.value}
                style={[
                  styles.sizeOption,
                  currentSize === option.value && styles.selectedSize,
                  { color: colors.text, fontSize: option.v }
                ]}
                onPress={async () => {
                  setCurrentSize(option.value);
                  await setSize(option.value);
                }}
              >
                {option.label}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <Text style={{ height: 50 }}></Text>
    </ScrollView>
  );
}
