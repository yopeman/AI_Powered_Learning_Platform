import AsyncStorage from '@react-native-async-storage/async-storage';
import {api, authApi} from './api';
import * as Device from 'expo-device';

// Function to retrieve the token from AsyncStorage
const getToken = async () => {
  const response = await AsyncStorage.getItem('response');
  // console.log('getToken', response);
  return response ? JSON.parse(response).token : null;
};

// Function to retrieve the user from AsyncStorage
const getUser = async () => {
  const response = await AsyncStorage.getItem('response');
  return response ? JSON.parse(response).user : null;
};

export const APP_ID = () => {
  const app_id = `
    ${Device.brand},
    ${Device.deviceName},
    ${Device.osBuildId},
    ${Device.osInternalBuildId},
    My Secret Here => {ksuygsuyfsegfisufgsfusgfsDIUFDHUFDFYSUDFDYUFodiufhdgfudfghyud67842645423642856364723546$#^#&%##$#$%$%*&^(&*&^*%$#$%^$&}
  `;
  return btoa(app_id);
}

// Centralized API response handling with caching
const handleApiResponse = async (apiCall, storageKey) => {
  try {
    const response = await apiCall();
    const data = response.data; // Accessing data directly from response
    await AsyncStorage.setItem(storageKey, JSON.stringify(data));
    return data;
  } catch (err) {
    console.log(err);
    const cachedData = await AsyncStorage.getItem(storageKey);
    
    if (cachedData) {
      return JSON.parse(cachedData);
    } else {
      throw err;
    }
  }
};

// Function to get all fields
export const get_all_fields = async () => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get('/fields'), '/fields');
};

// Function to get user's fields
export const get_my_fields = async () => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get('/subscriptions/me/fields'), '/subscriptions/me/fields');
};

// Function to get a field by its ID
export const get_field_by_id = async (id) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/fields/${id}`), `/fields/${id}`);
};

// Function to subscribe to a field
export const subscribe_field = async (fieldId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).post('/subscriptions', { fieldId }), `/subscriptions/${fieldId}`);
};

// Function to get courses for a field
export const get_courses = async (fieldId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/fields/${fieldId}/courses`), `/fields/${fieldId}/courses`);
};

// Function to get a course by its ID
export const get_course_by_id = async (id) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/courses/${id}`), `/courses/${id}`);
};

// Function to get chapters for a course
export const get_chapters = async (courseId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/courses/${courseId}/chapters`), `/courses/${courseId}/chapters`);
};

// Function to get a chapter by its ID
export const get_chapter_by_id = async (id) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/chapters/${id}`), `/chapters/${id}`);
};

// Function to get topics for a chapter
export const get_topics = async (chapterId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/chapters/${chapterId}/topics`), `/chapters/${chapterId}/topics`);
};

// Function to get content for a topic
export const get_topic_content = async (topicId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/topics/${topicId}/content`), `/topics/${topicId}/content`);
};

// Function to ask about a topic
export const ask_about_topic = async (topicId, question) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).post(`/topics/${topicId}/ask`, { question }), `/topics/${topicId}/ask/${question}`);
};

// Function to get interactions for a topic
export const get_topic_interactions = async (topicId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/topics/${topicId}/interactions/me`), `/topics/${topicId}/interactions/me`);
};

// Function to payment
export const payment_init = async ({fieldId, year, semester}) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).post(`/payments`, {fieldId, year, semester}), `/payments/${fieldId}/${year}/${semester}`);
};

// Function to get certification questions
export const get_certification_questions = async (fieldId) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).get(`/certifications/field/${fieldId}/questions`), `/field/${fieldId}/questions`);
};

// Function to get certification documents
export const get_certification_document = async (fieldId) => {
  const token = await getToken();
  const user = await getUser();
  const userId = user.id;
  try {
    const response = await authApi.get(`/certifications/field/${fieldId}/user/${userId}/doc`);
    if (response.status === 200) {
      return response.config.baseURL + response.config.url;
    }
  } catch (err) {
    return null;
  }
};

// Function to submit certification answer results
export const submit_certification_answer_results = async (fieldId, value) => {
  const token = await getToken();
  return handleApiResponse(() => api(token).post(`/certifications/results`, {value, fieldId}), `/certifications/results/${fieldId}/${value}`);
};

// Function to unsubscribe the fields
export const unsubscribe_fields = async (subscriptionId) => {
  const token = await getToken();
  const response = handleApiResponse(() => api(token).delete(`/subscriptions/${subscriptionId}`), `/subscriptions/${subscriptionId}`);
  await get_my_fields();
  return response;
};