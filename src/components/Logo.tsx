import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/logo1.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 250,
    height: 120,
    marginBottom: 15,

  },
});

export default memo(Logo);
