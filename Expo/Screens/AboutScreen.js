import React, {useEffect, useState} from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { api } from '../Utilities/api';
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/AboutStyle";
import {StatusBar} from "expo-status-bar";

export default function About() {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(3); // Default rating
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const {colors, textSize, darkMode} = useTheme();
  const [styles, setStyles] = useState({});

  useEffect(() => {
    setStyles(createStyles(colors, textSize));
  }, [colors, textSize, ]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const rsp = await AsyncStorage.getItem('response');
      const response = await api(JSON.parse(rsp).token).post('/feedbacks', { content, rating });
      if (!response.data) {
        setError('Feedback submission failed');
        return;
      }
      setSuccess(response.data.message);
      setContent('');
      setRating(3); // Reset to default rating
    } catch (err) {
      setError(err.response?.data?.message || 'Feedback submission failed');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setContent('');
    setRating(3);
    setError('');
    setSuccess('');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style={`${darkMode ? 'light' : 'dark'}`} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logo}>
          <MaterialIcons name="school" size={48} color={colors.primary} />
        </View>
        <Text style={styles.title}>AiPLP Learning</Text>
        <Text style={styles.subtitle}>
          Empowering students with accessible, high-quality education through AI-powered learning
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={[styles.subtitle, { textAlign: 'left', maxWidth: '100%' }]}>
          We're dedicated to making education accessible to everyone, everywhere. 
          Our AI-powered platform personalizes learning experiences to help you 
          achieve your academic goals at your own pace.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Share Your Feedback</Text>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}
        
        <TextInput
          style={styles.feedbackInput}
          placeholder="What do you think about our app?"
          placeholderTextColor={colors.text + '80'}
          value={content}
          onChangeText={setContent}
          multiline
        />
        
        <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>Rate Your Experience</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity
              key={star}
              style={styles.starButton}
              onPress={() => setRating(star)}
            >
              <MaterialIcons 
                name={star <= rating ? "star" : "star-outline"} 
                size={32} 
                color={star <= rating ? "#FFD700" : colors.text + '80'} 
              />
            </TouchableOpacity>
          ))}
        </View>
        
        <TouchableOpacity 
          style={styles.button}
          onPress={handleSubmit}
          disabled={!content.trim()}
        >
          <Text style={styles.buttonText}>Submit Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, styles.resetButton]}
          onPress={handleReset}
        >
          <Text style={[styles.buttonText, styles.resetText]}>Reset Form</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ height: 50 }}></Text>
    </ScrollView>
  );
}
