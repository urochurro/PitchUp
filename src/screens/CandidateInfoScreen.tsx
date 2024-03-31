import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Navigation } from '../types';
import { Menu, TextInput as textinput } from 'react-native-paper';
import TextInput from '../components/TextInput';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import Button from '../components/Button';
import DropDown from "react-native-paper-dropdown";


type Props = {
    navigation: Navigation;
};

const UserRegistrationForm = ({ navigation }: Props) => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [gender, setGender] = useState("");
    const { control, handleSubmit } = useForm();

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log(data);
    };
    const genderList = [
        {
            label: "Male",
            value: "male",
        },
        {
            label: "Female",
            value: "female",
        },
        {
            label: "Others",
            value: "others",
        },
    ];

    return (
        <Background>
            <BackButton goBack={() => navigation.navigate('HomeScreen')} />

            <Header>Profile information</Header>
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        placeholder="Name"
                        onChangeText={field.onChange}
                        value={field.value}
                    />
                )}
                name="name"
                rules={{ required: true }}
                defaultValue=""
            />

            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        placeholder="About / Summary"
                        onChangeText={field.onChange}
                        value={field.value}
                        multiline
                    />
                )}
                name="summary"
                defaultValue=""
            />

            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        placeholder="Years of Experience"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                    />
                )}
                name="yoe"
                defaultValue=""
            />
            {/* <Controller
                control={control}
                render={({ field }) => (
                    <DropDown
                        label={"Gender"}
                        mode={"outlined"}
                        visible={showDropDown}
                        showDropDown={() => setShowDropDown(true)}
                        onDismiss={() => setShowDropDown(false)}
                        value={gender}
                        setValue={setGender}
                        list={genderList}
                    />
                )}
                name="gender"
                defaultValue=""
            /> */}
            {/* <SafeAreaView> */}
                <DropDown
                    label={"Gender"}
                    mode={"outlined"}
                    visible={showDropDown}
                    showDropDown={() => setShowDropDown(true)}
                    onDismiss={() => setShowDropDown(false)}
                    value={gender}
                    setValue={setGender}
                    list={genderList}
                />
                {/* </SafeAreaView> */}

            {/* Repeat similar Controller components for other fields */}
            

            <Button onPress={handleSubmit(onSubmit)} style={styles.button} >Submit</Button>
        </Background>
    );
};

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary,
    },
    button: {
        marginTop: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    link: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
});

export default UserRegistrationForm;





{/* Location Dropdown 
            <Menu
                visible={locationMenuVisible}
                onDismiss={() => setLocationMenuVisible(false)}
                anchor={<TextInput
                    label="Location"
                    value={selectedLocation}
                    right={<textinput.Icon icon="eye" onTouchStart={() => setLocationMenuVisible(true)} />}
                    onTouchStart={() => setLocationMenuVisible(true)}
                    editable={false}
                />}
            >
                <Menu.Item onPress={() => { setSelectedLocation('New York'); setLocationMenuVisible(false); }} title="New York" />
                <Menu.Item onPress={() => { setSelectedLocation('Los Angeles'); setLocationMenuVisible(false); }} title="Los Angeles" />
                <Menu.Item onPress={() => { setSelectedLocation('Chicago'); setLocationMenuVisible(false); }} title="Chicago" />
            </Menu>
             End Location Dropdown */}