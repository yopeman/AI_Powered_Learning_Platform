import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthProvider, AuthContext } from './Utilities/AuthContext';

// Import screens
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import SubscriptionScreen from './Screens/SubscriptionScreen';
import ProfileScreen from './Screens/ProfileScreen';
import FieldScreen from './Screens/FieldScreen';
import CourseScreen from './Screens/CourseScreen';
import ChapterScreen from './Screens/ChapterScreen';
import TopicScreen from './Screens/TopicScreen';
import PaymentScreen from './Screens/PaymentScreen';
import SettingScreen from './Screens/SettingScreen';
import AboutScreen from './Screens/AboutScreen';
import CertificateScreen from './Screens/CertificateScreen';
import {ThemeProvider, useTheme} from "./Utilities/ThemeContext";
import {Text, View, StyleSheet} from "react-native";
import {usePreventScreenCapture} from "expo-screen-capture";

// Create navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function LearningNavigator() {
  const {colors, textSize} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: true, // false
        headerShown: false,
        headerTintColor: colors.text,
        headerStyle: {
          backgroundColor: colors.card,
        }
      }}
      initialRouteName='Field'
    >
      <Stack.Screen
        name="Field"
        component={FieldScreen}
        options={{ title: 'Field Overview' }}
      />
      <Stack.Screen
        name="Course"
        component={CourseScreen}
        options={{ title: 'Course Details' }}
      />
      <Stack.Screen
        name="Chapter"
        component={ChapterScreen}
        options={{ title: 'Chapter Content' }}
      />
      <Stack.Screen
        name="Topic"
        component={TopicScreen}
        options={{ title: 'Topic Discussion' }}
      />
      <Stack.Screen
        name="Certificate"
        component={CertificateScreen}
        options={{ title: 'Certificate' }}
      />
    </Stack.Navigator>
  );
}

function TabNavigator() {
  const {colors, textSize} = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Subscription') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
            return <MaterialIcons name={iconName} size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text + '80',
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopWidth: 0,
          paddingBottom: 4,
          paddingTop: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 4,
        },
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'My Learning',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Subscription"
        component={SubscriptionScreen}
        options={{
          title: 'Browse Fields',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'My Profile',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

function MainDrawer() {
  const {colors, textSize} = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        // headerShown: false,
        drawerStyle: {
          backgroundColor: colors.background,
          width: 280,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
        drawerActiveBackgroundColor: colors.primary + '20',
        drawerLabelStyle: {
          fontSize: textSize,
        }
      }}
    >
      <Drawer.Screen
        name="AiPLP"
        component={TabNavigator}
        options={{
          drawerLabel: 'Home',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text + '80',
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopWidth: 0,
            paddingBottom: 4,
            paddingTop: 4,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
          },
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
        }}
      />
      <Drawer.Screen
        name="Learn"
        component={LearningNavigator}
        options={{
          drawerLabel: 'Learning',
          title: 'Learning',
          drawerIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-page-variant" size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text + '80',
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopWidth: 0,
            paddingBottom: 4,
            paddingTop: 4,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
          },
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
        }}
      />
      <Drawer.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          drawerLabel: 'Settings',
          title: 'Settings',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text + '80',
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopWidth: 0,
            paddingBottom: 4,
            paddingTop: 4,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
          },
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
        }}
      />
      <Drawer.Screen
        name="Payment"
        component={PaymentScreen}
        options={{
          drawerLabel: 'Payment',
          title: 'Payment',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="payments" size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text + '80',
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopWidth: 0,
            paddingBottom: 4,
            paddingTop: 4,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
          },
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
        }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{
          drawerLabel: 'About Us',
          title: 'About Us',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="info" size={size} color={color} />
          ),
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text + '80',
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopWidth: 0,
            paddingBottom: 4,
            paddingTop: 4,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 4,
          },
          headerStyle: {
            backgroundColor: colors.card,
          },
          headerTintColor: colors.text,
        }}
      />
    </Drawer.Navigator>
  );
}

function RootNavigator() {
  const { isAuthenticated, signIn } = useContext(AuthContext);
  const {colors, textSize} = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.card,
        },
        headerTintColor: colors.text,
      }}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen
            name="MainApp"
            component={MainDrawer}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  usePreventScreenCapture();
  return (
    <View style={{ flex: 1, padding: 0, margin: 0, backgroundColor: '#000' }}>
      <ThemeProvider>
        <AuthProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ThemeProvider>
      <Text></Text>
    </View>
  );
}