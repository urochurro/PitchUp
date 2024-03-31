import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import BackButton from '../components/BackButton';
import { Navigation } from '../types';

type Props = {
    navigation: Navigation;
};

const RecruiterOrCandidateScreen = ({ navigation }: Props) => (
    <Background>
        <BackButton goBack={() => navigation.navigate('HomeScreen')} />
        <Logo />
        <Header>Sign Up</Header>

        <Paragraph>
            Are you a recruiter or a candidate?
        </Paragraph>
        <Button mode="contained" onPress={() => navigation.navigate('RecruiterRegisterScreen')}>
            Recruiter
        </Button>
        <Button
            mode="outlined"
            onPress={() => navigation.navigate('CandidateRegisterScreen')}
        >
            Candidate
        </Button>
    </Background>
);

export default memo(RecruiterOrCandidateScreen);
