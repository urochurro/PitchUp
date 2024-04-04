import React, { memo, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Button, ScrollView} from 'react-native'
import { Navigation } from '../types';

type Props = {
    navigation: Navigation;
};

const DoneScreen = ({ navigation }: Props) => {
    return (
        <View style={styles.container}>
          <Text style={styles.message}>All candidates are over!</Text>
          <Text style={styles.subMessage}>Please come back again later.</Text>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
      },
      message: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      subMessage: {
        fontSize: 18,
        textAlign: 'center',
      },
    });

export default memo(DoneScreen);
