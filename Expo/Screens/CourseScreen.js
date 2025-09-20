import React, {useCallback, useEffect, useState} from 'react';
import { 
  View, Text, TouchableOpacity, 
  ActivityIndicator, ScrollView, StyleSheet 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { get_chapters, get_course_by_id } from '../Utilities/operations';
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/CourseStyle";
import {StatusBar} from "expo-status-bar";
import {useFocusEffect} from "@react-navigation/native";

export default function CourseScreen({ navigation, route }) {
  const { courseId } = route.params;
  const [course, setCourse] = React.useState(null);
  const [chapters, setChapters] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
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
    const fetchCourseAndChapters = async () => {
      setLoading(true);
      setError(null);
      try {
        const [courseResponse, chapterResponse] = await Promise.all([
          get_course_by_id(courseId),
          get_chapters(courseId)
        ]);
        if (!courseResponse || !chapterResponse) {
          setError('Failed to fetch Courses and its Chapters');
          return;
        }
        setCourse(courseResponse.data);
        const sortedChapters = chapterResponse.data.sort((a, b) => a.order - b.order);
        setChapters(sortedChapters);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAndChapters();
  }, [courseId, refreshing]);

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
        <Text style={styles.title}>{course?.title}</Text>
        <Text style={styles.subtitle}>{course?.description}</Text>
        
        <View style={styles.courseInfo}>
          <Text style={styles.subtitle}>Year: {course?.year}</Text>
          <Text style={styles.subtitle}>Semester: {course?.semester}</Text>
          <Text style={styles.subtitle}>Chapters: {course?.chapters_length}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Course Content</Text>

      {chapters.map((chapter) => (
        <TouchableOpacity
          key={chapter.id}
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Chapter', { chapterId: chapter.id })}
        >
          <MaterialCommunityIcons 
            name="book-variant" 
            size={32} 
            color={colors.primary} 
          />
          <View style={styles.chapterText}>
            <Text style={styles.chapterTitle}>
              Chapter {chapter.order}: {chapter.title}
            </Text>
            <Text style={styles.chapterDesc}>
              {chapter.description}
            </Text>
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
}
