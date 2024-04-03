import React, { memo, useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Navigation } from '../types';
import TextInput from '../components/TextInput';
import Background from '../components/Background';
import Header from '../components/Header';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import Button from '../components/Button';
import DropDownPicker from 'react-native-dropdown-picker';
import { useLogin } from '../context/LoginProvider';

type Props = {
    navigation: Navigation;
};

const CandidateInfoScreen = ({ navigation }: Props) => {
    const { setIsLoggedIn, setIsRecruiter } = useLogin();
    const { control, handleSubmit } = useForm();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Mumbai', value: 'mumbai' },
        { label: 'Delhi', value: 'delhi' }
    ]);
    const onOpen = useCallback(() => {
        setOpen0(false);
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
    }, []);

    const [open0, setOpen0] = useState(false);
    const [value0, setValue0] = useState(null);
    const [items0, setItems0] = useState([
        { label: 'India', value: 'india' },
        { label: 'USA', value: 'usa' }
    ]);
    const onOpen0 = useCallback(() => {
        setOpen(false);
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
    }, []);

    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState(null);
    const [items1, setItems1] = useState([
        { label: 'English', value: 'english' },
        { label: 'Hindi', value: 'hindi' }
    ]);
    const onOpen1 = useCallback(() => {
        setOpen(false);
        setOpen0(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
    }, []);

    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
        { label: 'Software Engineer', value: 'software_engineer' },
        { label: 'Accountant', value: 'accountant' }
    ]);
    const onOpen2 = useCallback(() => {
        setOpen(false);
        setOpen0(false);
        setOpen1(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
    }, []);

    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [items3, setItems3] = useState([
        { label: 'Part Time', value: 'part_time' },
        { label: 'Full Time', value: 'full_time' },
        { label: 'Intern', value: 'intern' },
        { label: 'Temporary', value: 'temporary' }
    ]);
    const onOpen3 = useCallback(() => {
        setOpen(false);
        setOpen0(false);
        setOpen1(false);
        setOpen2(false);
        setOpen4(false);
        setOpen5(false);
        setOpen6(false);
    }, []);

    const [open4, setOpen4] = useState(false);
    const [value4, setValue4] = useState(null);
    const [items4, setItems4] = useState([
        { label: 'Master of Science (MS)', value: 'ms' },
        { label: 'Bachelor of Technology (BTech)', value: 'btech' },
        { label: 'Bachelor of Arts (BA)', value: 'ba' }
    ]);
    const onOpen4 = useCallback(() => {
        setOpen(false);
        setOpen0(false);
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setOpen5(false);
        setOpen6(false);
    }, []);

    const [open5, setOpen5] = useState(false);
    const [value5, setValue5] = useState(null);
    const [items5, setItems5] = useState([
        { label: 'Work from Home', value: 'wfh' },
        { label: 'On-site', value: 'onSite' },
        { label: 'Hybrid', value: 'hybrid' },
    ]);
    const onOpen5 = useCallback(() => {
        setOpen(false);
        setOpen0(false);
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen6(false);
    }, []);

    const [open6, setOpen6] = useState(false);
    const [value6, setValue6] = useState([]);
    const [items6, setItems6] = useState([
        { label: 'Problem Solving', value: 'problem-solving' },
        { label: 'CSS', value: 'css' },
        { label: 'Branding', value: 'branding' },
    ]);
    const onOpen6 = useCallback(() => {
        setOpen(false);
        setOpen0(false);
        setOpen1(false);
        setOpen2(false);
        setOpen3(false);
        setOpen4(false);
        setOpen5(false);
    }, []);


    // experience
    const [experiences, setExperiences] = useState([{ id: 0, value: '' }]);
    const addExperienceField = () => {
        const newId = experiences.length;
        setExperiences([...experiences, { id: newId, value: '' }]);
    };

    const handleExperienceChange = (id, text) => {
        const updatedExperiences = experiences.map((exp) =>
            exp.id === id ? { ...exp, value: text } : exp
        );
        setExperiences(updatedExperiences);
    };
    //experience end

    const onSubmit = (data) => {
        // Handle form submission (e.g., send data to server)
        console.log(data);
        setIsLoggedIn(true);
        setIsRecruiter(false);
    };

    return (
        <Background>
            <View style={{ flex: 1 }}>
                <ScrollView style={{ flexGrow: 1 }} nestedScrollEnabled={true}>
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
            {experiences.map((experience) => (
                <Controller
                    key={experience.id}
                    control={control}
                    render={({ field }) => (
                        <TextInput
                            placeholder="Experience"
                            onChangeText={(text) => {
                                field.onChange(text);
                                handleExperienceChange(experience.id, text);
                            }}
                            value={experience.value}
                        />
                    )}
                    name={`experience${experience.id}`}
                    defaultValue=""
                />
                    
            ))}
            <Button mode={'contained'} onPress={addExperienceField} >Add Experience</Button>

            <Controller
                control={control}
                render={({ field }) => (
                    <DropDownPicker
                        open={open0}
                        value={value0}
                        items={items0}
                        setOpen={setOpen0}
                        setValue={setValue0}
                        setItems={setItems0}
                        onChangeValue={field.onChange}
                        searchable={true}
                        addCustomItem={true}
                        listMode="SCROLLVIEW"
                        placeholder='Select Country'
                        zIndex={8000}
                        zIndexInverse={1000}
                        onOpen={onOpen0}
                    />
                )}
                name="country"
                defaultValue=""
            />
            {/* add spacer */}
            <View style={{ height: 20 }}></View>
            
            <Controller
                control={control}
                render={({ field }) => (
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}
                        onChangeValue={field.onChange}
                        searchable={true}
                        addCustomItem={true}
                        listMode="SCROLLVIEW"
                        placeholder='Select City'
                        zIndex={7000}
                        zIndexInverse={2000}
                        onOpen={onOpen}
                    />
                )}
                name="city"
                defaultValue=""
            />

                    {/* add spacer */}
                    <View style={{ height: 20 }}></View>
            <Controller
                control={control}
                render={({ field }) => (
                    <DropDownPicker
                        open={open1}
                        value={value1}
                        items={items1}
                        setOpen={setOpen1}
                        setValue={setValue1}
                        setItems={setItems1}
                        onChangeValue={field.onChange}
                        searchable={true}
                        addCustomItem={true}
                        listMode="SCROLLVIEW"
                        placeholder='Select Language'
                        zIndex={6000}
                        zIndexInverse={3000}
                        onOpen={onOpen1}
                    />
                )}
                name="languages"
                defaultValue=""
            />

                    {/* add spacer */}
                    <View style={{ height: 20 }}></View>
            <Controller
                control={control}
                render={({ field }) => (
                    <DropDownPicker
                        open={open2}
                        value={value2}
                        items={items2}
                        setOpen={setOpen2}
                        setValue={setValue2}
                        setItems={setItems2}
                        onChangeValue={field.onChange}
                        searchable={true}
                        addCustomItem={true}
                        listMode="SCROLLVIEW"
                        placeholder='Select Job Role'
                        zIndex={5000}
                        zIndexInverse={4000}
                        onOpen={onOpen2}
                    />
                )}
                name="role"
                defaultValue=""
            />

                    {/* add spacer */}
                    <View style={{ height: 20 }}></View>
            <Controller
                control={control}
                render={({ field }) => (
                    <DropDownPicker
                        open={open3}
                        value={value3}
                        items={items3}
                        setOpen={setOpen3}
                        setValue={setValue3}
                        setItems={setItems3}
                        onChangeValue={field.onChange}
                        searchable={true}
                        listMode="SCROLLVIEW"
                        placeholder='Select Job Type'
                        zIndex={4000}
                        zIndexInverse={5000}
                        onOpen={onOpen3}
                    />
                )}
                name="jobType"
                defaultValue=""
            />

                    {/* add spacer */}
                    <View style={{ height: 20 }}></View>

            <Controller
                control={control}
                render={({ field }) => (
                    <DropDownPicker
                        open={open4}
                        value={value4}
                        items={items4}
                        setOpen={setOpen4}
                        setValue={setValue4}
                        setItems={setItems4}
                        onChangeValue={field.onChange}
                        searchable={true}
                        addCustomItem={true}
                        listMode="SCROLLVIEW"
                        placeholder='Select Highest Qualification'
                        zIndex={3000}
                        zIndexInverse={6000}
                        onOpen={onOpen4}
                    />
                )}
                name="highestQualification"
                defaultValue=""
            />

                    {/* add spacer */}
                    <View style={{ height: 20 }}></View>

            <Controller
                control={control}
                render={({ field }) => (
                    <DropDownPicker
                        open={open5}
                        value={value5}
                        items={items5}
                        setOpen={setOpen5}
                        setValue={setValue5}
                        setItems={setItems5}
                        onChangeValue={field.onChange}
                        searchable={true}
                        listMode="SCROLLVIEW"
                        placeholder='Select Work Mode'
                        zIndex={2000}
                        zIndexInverse={7000}
                        onOpen={onOpen5}
                    />
                )}
                name="workMode"
                defaultValue=""
            />

                    {/* add spacer */}
                    <View style={{ height: 20 }}></View>

            <Controller
                control={control}
                render={({ field }) => (
                    <DropDownPicker
                        open={open6}
                        value={value6}
                        items={items6}
                        setOpen={setOpen6}
                        setValue={setValue6}
                        setItems={setItems6}
                        onChangeValue={field.onChange}
                        searchable={true}
                        addCustomItem={true}
                        listMode="SCROLLVIEW"
                        placeholder='Select Skills'
                        multiple={true}
                        min={1}
                        zIndex={1000}
                        zIndexInverse={8000}
                        onOpen={onOpen6}
                        mode="BADGE"
                    />
                )}
                name="skills"
                defaultValue=""
            />

                    {/* add spacer */}
                    <View style={{ height: 20 }}></View>
            
            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        placeholder="Salary lower range"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                    />
                )}
                name="salaryLowerRange"
                rules={{ required: true }}
                defaultValue=""
            />

            <Controller
                control={control}
                render={({ field }) => (
                    <TextInput
                        placeholder="Salary upper range"
                        onChangeText={field.onChange}
                        value={field.value}
                        keyboardType="numeric"
                    />
                )}
                name="salaryUpperRange"
                rules={{ required: true }}
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
                name="test"
                defaultValue=""
            />

            <Button mode={'outlined'} onPress={handleSubmit(onSubmit)} style={styles.button} >Submit</Button>
            </ScrollView>
            </View>
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

export default memo(CandidateInfoScreen);


