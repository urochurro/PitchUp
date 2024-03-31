import React from 'react';
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
} from './screens';

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="CandidateInfoScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecruiterOrCandidateScreen" component={RecruiterOrCandidateScreen} options={{ headerShown: false }} />
        <Stack.Screen name="RecruiterRegisterScreen" component={RecruiterRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CandidateRegisterScreen" component={CandidateRegisterScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="CandidateInfoScreen" component={CandidateInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
