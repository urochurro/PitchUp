import React, { memo } from 'react';
import {
  ImageBackground,
  StyleSheet,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const Background = ({ children }: Props) => (
  // <ImageBackground
  //   source={require('../assets/background_dot.png')}
  //   resizeMode="repeat"
  //   style={styles.background}
  // >
  <View style={styles.background}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      {children}
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  </View>
  // </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: '#083767',
  },
  container: {
    
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    width: '100%',
    maxWidth: 340,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(Background);
