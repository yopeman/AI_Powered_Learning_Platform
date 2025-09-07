import React, {useCallback, useEffect, useState} from 'react';
import { 
  View, Text, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { get_my_fields, unsubscribe_fields } from "../Utilities/operations";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/HomeStyle";
import {StatusBar} from "expo-status-bar";
import {useFocusEffect} from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [fields, setFields] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progressData, setProgressData] = useState({});
  const {colors, textSize, darkMode} = useTheme();
  const [styles, setStyles] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setStyles(createStyles(colors, textSize));
  }, [colors, textSize, ]);

  useFocusEffect(
    useCallback(() => {
      setRefreshing(true);
      return () => {
        setRefreshing(false);
      };
    }, [])
  );

  useEffect(() => {
    const fetchFields = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await get_my_fields();
        if (!response) {
          // setError('Failed to fetch subscribed fields');
          return;
        }
        setFields(response.data.fields);
        setSubscriptions(response.data.subscriptions);
        
        // Build progress data for each field
        const progress = {};
        response.data.fields.forEach(field => {
          const sub = response.data.subscriptions.find(sub => sub.fieldId === field.id);
          progress[field.id] = {
            completed: sub?.learned_topic_numbers ?? 0,
            total: field.number_of_free_topics ?? 1
          };
        });  
        setProgressData(progress);
      } catch (err) {
        if (err.status !== 404) {
          setError(err.response?.data?.message || err.message); 
        }
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, [refreshing]);

  const handleLearn = (fieldId) => {
    navigation.navigate('Learn', { screen: 'Field', params: { fieldId } });
  };

  const handleUnsubscribe = async (fieldId) => {
    setLoading(true);
    setError(null);
    try {
      const subsToUnsubscribe = subscriptions.filter(sub => sub.fieldId === fieldId);
      await Promise.all(subsToUnsubscribe.map(s => unsubscribe_fields(s.id))); // Unsubscribe all at once
      setFields(fields.filter(field => field.id !== fieldId)); // Remove field from state
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
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
      <StatusBar style={`${darkMode ? 'light' : 'dark'}`} />
      <View style={styles.header}>
        <Text style={styles.title}>My Learning</Text>
        <Text style={styles.subtitle}>Continue your educational journey</Text>
      </View>

      {error && (
        <View style={styles.card}>
          <Text style={{ color: colors.error, textAlign: 'center' }}>{error}</Text>
        </View>
      )}

      {fields.length > 0 ? (
        fields.map(field => {
          const progress = progressData[field.id] || { completed: 0, total: 1 };
          const progressPercent = (progress.completed / progress.total) * 100;
          
          return (
            <View key={field.id} style={styles.card}>
              <View style={styles.fieldHeader}>
                <View style={styles.fieldIcon}>
                  <MaterialCommunityIcons 
                    name="book-open-page-variant" 
                    size={24} 
                    color={colors.primary} 
                  />
                </View>
                <Text style={styles.fieldTitle}>{field.title}</Text>
              </View>
              
              <View style={styles.progressContainer}>
                <Text style={styles.progressText}>Your progress: {progress.completed}/{progress.total} topics</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
                </View>
              </View>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.primaryButton]}
                  onPress={() => handleLearn(field.id)}
                >
                  <Text style={[styles.buttonText, styles.primaryButtonText]}>
                    {progressPercent > 0 ? 'Continue' : 'Start Learning'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => handleUnsubscribe(field.id)}
                >
                  <Text style={[styles.buttonText, styles.secondaryButtonText]}>Unsubscribe</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons 
            name="book-open-blank-variant" 
            size={64} 
            color={colors.text + '30'} 
            style={styles.emptyIcon}
          />
          <Text style={styles.emptyText}>
            You haven't subscribed to any fields yet. Explore our catalog to find courses that interest you.
          </Text>
          <TouchableOpacity 
            style={[styles.button, styles.primaryButton]}
            onPress={() => navigation.navigate('Subscription')}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>Browse Fields</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={{ height: 50 }}></Text>
    </ScrollView>
  );
};

export default HomeScreen;