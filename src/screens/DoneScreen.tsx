import React, { memo, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, Button, ScrollView} from 'react-native'
import { Navigation } from '../types';

type Props = {
    navigation: Navigation;
};

const DoneScreen = ({ navigation }: Props) => {
    return(
        <View>
        <Text>All Videos Done!!!</Text>
        </View>
    )
}

export default memo(DoneScreen);
