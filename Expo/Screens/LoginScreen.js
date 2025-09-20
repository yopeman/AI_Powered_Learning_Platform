import React, {useContext, useEffect, useState} from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, 
  StyleSheet, ActivityIndicator, Keyboard, 
  Alert, ScrollView 
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import { authApi } from '../Utilities/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_ID } from "../Utilities/operations";
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/LoginStyle";
import {AuthContext} from "../Utilities/AuthContext";
import {StatusBar} from "expo-status-bar";

export default function LoginScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({email: '', password: APP_ID()});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({text: '', type: ''});
  const {colors, textSize, darkMode} = useTheme();
  const [styles, setStyles] = useState({});
  const { isAuthenticated, signIn } = useContext(AuthContext);

  useEffect(() => {
    setStyles(createStyles(colors, textSize));
  }, [colors, textSize, ]);

  const handleChange = (name, value) => {
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.post('/login', formData);
      if (!response.data) {
        setMessage({text: 'Login failed', type: 'error'});
        return;
      }
      const {success, data, message: responseMessage} = response.data;

      if (success) {
        if (data.user.role === 'student') {
          await AsyncStorage.setItem('response', JSON.stringify(data));
          signIn(data.token);
        } else {
          setMessage({text: 'You need student privileges to access this app', type: 'error'});
        }
      } else {
        setMessage({text: responseMessage, type: 'error'});
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setMessage({text: errorMessage, type: 'error'});
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({email: '', password: APP_ID()});
    setMessage({text: '', type: ''});
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      {message.text && (
        <Text style={message.type === 'error' ? styles.errorText : styles.successText}>
          {message.text}
        </Text>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor={colors.text + '80'}
          value={formData.email}
          onChangeText={text => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <Text style={styles.footerText}>
        Password is securely managed by the app
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary}/>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={!formData.email.trim()}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[{
              borderRadius: 12,
              height: 56,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
              marginTop: 16,
            }, {
              backgroundColor: 'transparent',
              borderWidth: 1,
              borderColor: colors.border,
            }]}
            onPress={resetForm}
          >
            <Text style={styles.secondaryButtonText}>Clear Form</Text>
          </TouchableOpacity>
        </>
      )}

      <View style={styles.registerContainer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.linkText}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <Text style={{ height: 50 }}></Text>
    </ScrollView>
  );
}