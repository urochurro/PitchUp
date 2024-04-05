import React, { memo, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { Navigation } from '../types';
import { useLogin } from '../context/LoginProvider';
import axios from "axios";


type Props = {
  navigation: Navigation;
};

const LoginScreen = ({ navigation }: Props) => {
  const { setIsLoggedIn, setIsRecruiter, setUserId } = useLogin();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }

    // #IMP: API call to login
    const data = { 'email': email.value, 'password': password.value };
    
    axios
      .post("http://10.0.0.10:3000/login/", data)
      .then(function (response) {
        // handle success
        console.log(response.data);

        response.data["recruiter"]
          ? setIsRecruiter(true)
          : setIsRecruiter(false);
        // #IMP: set to true if recruiter
        setUserId(response.data["user_id"]);
        // #IMP: set to true if recruiter
        setIsLoggedIn(true);

        // console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate("HomeScreen")} />

      <Logo />
      <View style={{ height: 40 }} />

      <Header>Welcome back.</Header>

      <TextInput
        label="Email"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        textContentType="password"
        right={<PaperInput.Icon icon="eye" onPress={toggleShowPassword} />}
        secureTextEntry={!showPassword}
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPasswordScreen")}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      <Button mode="contained" onPress={_onLoginPressed}>
        Login
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("RecruiterOrCandidateScreen")}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.secondary,
    // textDecorationLine: 'underline',
  },
});

export default memo(LoginScreen);
