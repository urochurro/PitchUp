import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../types';
import { View } from 'react-native';

type Props = {
  navigation: Navigation;
};

const HomeScreen = ({ navigation }: Props) => (
  <Background>
    <Logo />

    <Paragraph>
      Elevating Careers, One Pitch at a Time
    </Paragraph>
    <View style={{ height: 40 }} />
    <Button mode="outlined" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="contained"
      onPress={() => navigation.navigate('RecruiterOrCandidateScreen')}
    >
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
