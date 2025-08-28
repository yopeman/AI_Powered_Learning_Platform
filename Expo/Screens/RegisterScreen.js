import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {CommonActions, useNavigation} from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { authApi } from '../Utilities/api';
import { APP_ID } from "../Utilities/operations";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useTheme} from "../Utilities/ThemeContext";
import {createStyles} from "../Style/RegisterStyle";
import {AuthContext} from "../Utilities/AuthContext";
import {StatusBar} from "expo-status-bar";

export default function RegisterScreen({ setIsAuth }) {
  const navigation = useNavigation();
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    password: APP_ID(),
    confirm_password: APP_ID(),
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {colors, textSize, darkMode} = useTheme();
  const [styles, setStyles] = useState({});
  const { isAuthenticated, signIn } = useContext(AuthContext);

  useEffect(() => {
    setStyles(createStyles(colors, textSize));
  }, [colors, textSize, ]);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage({ text: '', type: '' });

    // Password confirmation check
    if (formData.password !== formData.confirm_password) {
      setMessage({ text: 'Passwords do not match', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const response = await authApi.post('/register', formData);
      if (!response.data) {
        setMessage({ text: 'Registration failed', type: 'error' });
        return;
      }
      const { success, data, message: responseMessage } = response.data;
      
      if (success) {
        if (data.user.role === 'student') {
          await AsyncStorage.setItem('response', JSON.stringify(data));
          signIn(data.token);
        } else {
          setMessage({ text: 'You need student privileges to access this app', type: 'error' });
        }
      } else {
        setMessage({ text: responseMessage, type: 'error' });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Registration failed';
      setMessage({ text: errorMessage, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      password: APP_ID(),
      confirm_password: APP_ID(),
    });
    setMessage({ text: '', type: '' });
  };

  const fields = [
    { name: 'first_name', label: 'First Name', icon: 'person' },
    { name: 'last_name', label: 'Last Name', icon: 'person' },
    { name: 'email', label: 'Email Address', icon: 'email', keyboardType: 'email-address' },
    { name: 'phone', label: 'Phone Number', icon: 'phone', keyboardType: 'phone-pad' },
    // { name: 'password', label: 'Password', icon: 'lock' },
    // { name: 'confirm_password', label: 'Confirm Password', icon: 'lock' },
  ];

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <StatusBar style={`${darkMode ? 'light' : 'dark'}`} />
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={{ height: 50 }}></Text>
      <ScrollView 
        style={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <MaterialIcons name="person-add" size={36} color={colors.primary} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us to start your learning journey</Text>
        </View>

        {message.text && (
          <View style={[styles.messageContainer, { backgroundColor: message.type === 'error' ? colors.error + '20' : colors.success + '20' }]}>
            <Text style={[styles.messageText, { color: message.type === 'error' ? colors.error : colors.success }]}>{message.text}</Text>
          </View>
        )}

        {fields.map((field) => (
          <View key={field.name} style={styles.inputContainer}>
            <Text style={styles.inputLabel}>{field.label}</Text>
            <View style={styles.inputWrapper}>
              <MaterialIcons 
                name={field.icon} 
                size={20} 
                color={colors.text + '80'} 
                style={styles.icon}
              />
              <TextInput
                style={styles.input}
                placeholder={`Enter your ${field.label.toLowerCase()}`}
                placeholderTextColor={colors.text + '80'}
                value={formData[field.name]}
                onChangeText={text => handleChange(field.name, text)}
                secureTextEntry={field.name.includes('password') && !showPassword}
                autoCapitalize={field.name === 'email' ? 'none' : 'words'}
                keyboardType={field.keyboardType || 'default'}
                autoCorrect={false}
              />
              {field.name.includes('password') && (
                <TouchableOpacity 
                  style={styles.passwordToggle}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <MaterialIcons 
                    name={showPassword ? "visibility-off" : "visibility"} 
                    size={20} 
                    color={colors.text + '80'} 
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}

        <Text style={styles.securityNote}>
          Passwords are securely generated and managed by the app.
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <>
            <TouchableOpacity 
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.secondaryButton]}
              onPress={resetForm}
            >
              <Text style={styles.secondaryButtonText}>Clear Form</Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ height: 50 }}></Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
