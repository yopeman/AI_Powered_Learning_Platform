import React, {useCallback, useEffect, useState} from 'react';
import { 
  View, Text, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { get_all_fields, subscribe_field } from "../Utilities/operations";
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/SubscriptionStyle";
import {useFocusEffect} from "@react-navigation/native";
import {StatusBar} from "expo-status-bar";

const SubscriptionScreen = ({ navigation }) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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
      try {
        const response = await get_all_fields();
        if (!response) {
          setError('Failed to fetch available fields');
          return;
        }
        setFields(response.data);
        setError(null);
        setSuccess(response.data.message);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setSuccess(null);
      } finally {
        setLoading(false);
      }
    };
    fetchFields();
  }, [refreshing]);

  const handleSubscribe = async (fieldId) => {
    setLoading(true);
    try {
      const result = await subscribe_field(fieldId);
      if (!result) {
        setError('Failed field subscription');
        return;
      }
      setSuccess(result.message);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setSuccess(null);
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
      <View style={styles.header}>
        <Text style={styles.title}>Explore Fields</Text>
        <Text style={styles.subtitle}>Subscribe to new learning paths</Text>
      </View>

      {error && <Text style={styles.errorText}>{error}</Text>}
      {success && <Text style={styles.successText}>{success}</Text>}

      {fields.map((field) => (
        <View key={field.id} style={styles.card}>
          <Text style={styles.fieldTitle}>{field.title}</Text>
          <Text style={styles.fieldDescription}>{field.description}</Text>
          
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Duration</Text>
              <Text style={styles.metaValue}>{field.years_length} years</Text>
            </View>
            <View style={styles.metaItem}>
              <Text style={styles.metaLabel}>Free Content</Text>
              <Text style={styles.metaValue}>
                {field.isFree ? 'Full access' : `${field.number_of_free_topics} topics`}
              </Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => handleSubscribe(field.id)}
          >
            <Text style={styles.buttonText}>
              {field.isFree ? 'Get Started' : 'Subscribe Now'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
      <Text style={{ height: 50 }}></Text>
    </ScrollView>
  );
};

export default SubscriptionScreen;