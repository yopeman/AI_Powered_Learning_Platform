import React, {useCallback, useEffect, useState} from 'react';
import {
  View, Text, ScrollView, ActivityIndicator,
  StyleSheet, Button, Linking, TouchableOpacity, Alert
} from 'react-native';
import {
  get_certification_document,
  get_certification_questions,
  submit_certification_answer_results
} from "../Utilities/operations";
import CustomAlert from "../Components/CustomAlert";
import { RadioButton, Provider as PaperProvider } from 'react-native-paper';
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/CertificateStyle";
import {StatusBar} from "expo-status-bar";
import {useFocusEffect} from "@react-navigation/native";

const CertificateScreen = ({ navigation, route }) => {
  const { fieldId } = route.params;
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [docLink, setDocLink] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(null);
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
        const link = await get_certification_document(fieldId);
        if (link) {
          setDocLink(link);
          setModalVisible(true);
        } else {
          const response = await get_certification_questions(fieldId);
          if (!response) {
            setError('Failed to load data.');
            return;
          }
          setQuestions(response.data);
          setAnswers(Array(response.data.length).fill(null));
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fieldId, submitted, refreshing]);

  const handleRetry = () => {
    setError(null);
    fetchData();
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] && answers[index].split('.')[0] === question.correct) {
        score++;
      }
    });
    return (score / questions.length) * 100;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const calculatedScore = calculateScore().toFixed(2);
      await submit_certification_answer_results(fieldId, calculatedScore);
      setScore(calculatedScore);
      setSubmitted(true);
      
      const link = await get_certification_document(fieldId);
      if (link) {
        setDocLink(link);
        setModalVisible(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const renderScoreMessage = (score) => {
    if (score < 50) {
        return <Text style={styles.scoreErrorText}> Sorry, your result is below 50%. Please try again.</Text>;
    }
    return <Text style={styles.scoreSuccessText}> Congratulations, you passed the exam. Now you can get your certificates!</Text>;
  };


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
        <TouchableOpacity style={styles.button} onPress={handleRetry}>Retry</TouchableOpacity>
      </View>
    );
  }

  if (modalVisible) {
    return (
      <CustomAlert
        visible={modalVisible}
        onConfirm={() => {
          Linking.openURL(docLink);
          setModalVisible(false);
          navigation.goBack();
        }}
        onCancel={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      />
    );
  }

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Quiz</Text>
          {questions.map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={{ color: colors.text, fontWeight: 'bold' }}>{question.question}</Text>
              <RadioButton.Group
                onValueChange={value => handleAnswerChange(index, value)}
                value={answers[index]}
              >
                {question.options.map(option => (
                  <RadioButton.Item
                    label={option}
                    value={option}
                    key={option}
                  />
                ))}
              </RadioButton.Group>
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>Submit</TouchableOpacity>
          {submitted && (
            <Text style={styles.result}>Your Score: {score}%. {renderScoreMessage(score)}</Text>
          )}
        </View>
        <Text style={{ height: 50 }}></Text>
      </ScrollView>
    </PaperProvider>
  );
};

export default CertificateScreen;