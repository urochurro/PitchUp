import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  HomeScreen,
  LoginScreen,
  ForgotPasswordScreen,
  Dashboard,
  RecruiterOrCandidateScreen,
  RecruiterRegisterScreen,
  CandidateRegisterScreen,
  CandidateInfoScreen,
  AddJob,
  DoneScreen,
  EditJob,
  JobList,
  RecruiterHomepage,
  SettingsScreen,
  CandidateHomeScreen,
  MatchScreen,
} from './screens';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="RecruiterHomepage" component={RecruiterHomepage} options={{ headerShown: false }} />
    <Stack.Screen name="DoneScreen" component={DoneScreen} options={{ headerShown: false }} />
    {/* Add more screens specific to HomeStack if needed */}
  </Stack.Navigator>
);

const MatchScreen1 = () => (
  <Stack.Navigator>
    <Stack.Screen name="MatchScreen" component={MatchScreen} options={{ headerShown: false }} />
    {/* Add match related screens */}
  </Stack.Navigator>
);

const ProfileScreen = () => (
  <Stack.Navigator>
    <Stack.Screen name="JobList" component={JobList} options={{ headerShown: false }} />
    <Stack.Screen name="AddJob" component={AddJob} options={{ headerShown: false }} />
    <Stack.Screen name="EditJob" component={EditJob} options={{ headerShown: false }} />

    {/* Add profile related screens */}
  </Stack.Navigator>
);

const SettingsScreen1 = () => (
  <Stack.Navigator>
    <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
    {/* Add settings related screens */}
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RecruiterOrCandidateScreen" component={RecruiterOrCandidateScreen} options={{ headerShown: false }} />
    <Stack.Screen name="RecruiterRegisterScreen" component={RecruiterRegisterScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CandidateRegisterScreen" component={CandidateRegisterScreen} options={{ headerShown: false }} />
    <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
    <Stack.Screen name="CandidateInfoScreen" component={CandidateInfoScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
    {/* Add other authentication related screens like SignUp, ForgotPassword, etc. */}
  </Stack.Navigator>
);


const App = () => {
  const [userAuthenticated, setUserAuthenticated] = useState(true);

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecruiterOrCandidateScreen" component={RecruiterOrCandidateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecruiterRegisterScreen" component={RecruiterRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CandidateRegisterScreen" component={CandidateRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CandidateInfoScreen" component={CandidateInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
        <Stack.Screen name="AddJob" component={AddJob} options={{ headerShown: false }} />
        <Stack.Screen name="DoneScreen" component={DoneScreen} options={{ headerShown: false }} />
        <Stack.Screen name="EditJob" component={EditJob} options={{ headerShown: false }} />
        <Stack.Screen name="JobList" component={JobList} options={{ headerShown: false }} />
        <Stack.Screen name="RecruiterHomepage" component={RecruiterHomepage} options={{ headerShown: false }} />
      </Stack.Navigator> */}

      {userAuthenticated ? (
        <Tab.Navigator initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Match') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'Jobs') {
                iconName = focused ? 'person' : 'person-outline';
              } else if (route.name === 'Settings') {
                iconName = focused ? 'settings' : 'settings-outline';
              }

              // You can return any component here that you want to appear as the icon.
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Match" component={MatchScreen1} options={{ headerShown: false, tabBarBadge: 3 }} />
          <Tab.Screen name="Jobs" component={ProfileScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Settings" component={SettingsScreen1} options={{ headerShown: false }} />
        </Tab.Navigator>
      ) : (
        <AuthStack />
      )}
      
    </NavigationContainer>
  );
};

export default App;
