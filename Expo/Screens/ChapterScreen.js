import React, {useCallback, useEffect, useState} from 'react';
import { 
  View, Text, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { get_chapter_by_id, get_topics } from '../Utilities/operations';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/ChapterStyle";
import {StatusBar} from "expo-status-bar";
import {useFocusEffect} from "@react-navigation/native";

const ChapterScreen = ({ navigation, route }) => {
  const { chapterId } = route.params;
  
  const [chapter, setChapter] = useState(null);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [chapterResponse, topicsResponse] = await Promise.all([
          get_chapter_by_id(chapterId),
          get_topics(chapterId),
        ]);
        if (!chapterResponse || !topicsResponse) {
          setError('Failed to fetch chapter and its topics');
          return;
        }
        setChapter(chapterResponse.data);
        setTopics(topicsResponse.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [chapterId, refreshing]);


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style={`${darkMode ? 'light' : 'dark'}`} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }


  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.chapterNumber}>Chapter {chapter.order}</Text>
        <Text style={styles.chapterTitle}>{chapter.title}</Text>
        <Text style={styles.description}>{chapter.description}</Text>
      </View>

      <Text style={styles.sectionTitle}>Topics in this Chapter</Text>

      {topics.map((topic, index) => (
        <TouchableOpacity
          key={topic.id}
          style={styles.topicCard}
          onPress={() => navigation.navigate('Topic', { topicId: topic.id })}
        >
          <View style={styles.topicIndex}>
            <Text style={styles.indexText}>{index + 1}</Text>
          </View>
          <View style={styles.topicContent}>
            <Text style={styles.topicTitle}>{topic.title}</Text>
            {/* <View style={styles.durationBadge}>
              <Text style={styles.durationText}>15 min read</Text>
            </View> */}
          </View>
          <MaterialCommunityIcons 
            name="chevron-right" 
            size={24} 
            color={colors.text + '80'} 
          />
        </TouchableOpacity>
      ))}
      <Text style={{ height: 50 }}></Text>
    </ScrollView>
  );
};

export default ChapterScreen;