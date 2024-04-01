import React, { memo, useState } from 'react';
import { View, StyleSheet, ScrollView,  KeyboardAvoidingView} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, Chip, HelperText, RadioButton, Menu, Divider } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import { Navigation } from '../types';
import TextInput from '../components/TextInput';
import Header from '../components/Header';
import Background from '../components/Background';


type Props = {
  navigation: Navigation;
};

const AddJob = ({ navigation }: Props) => {
  const { control, handleSubmit, formState: { errors }  } = useForm();
  const [enteredSkill, setEnteredSkill] = useState(''); // State to store entered skill
  const [skills, setSkills] = useState([]); // State to store list of skills

  // Dropdown
  // State dropdown
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Mumbai', value: 'Mumbai'},
    {label: 'Banglore', value: 'Banglore'}
  ]);
// City Dropdown
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    {label: 'Ap', value: 'ap'},
    {label: 'Ba', value: 'ba'}
  ]);

  // Work Mode Dropdown
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    {label: 'Work from Home', value: 'Work from Home'},
    {label: 'Hybrid', value: 'Hybrid'},
    {label: 'On-site', value: 'On-site'}
  ]);

  // Highest Qualification Dropdown
  const [open3, setOpen3] = useState(false);
  const [value3, setValue3] = useState(null);
  const [items3, setItems3] = useState([
    {label: 'Master of Management Studies (MMS)', value: 'Master of Management Studies (MMS)'},
    {label: 'Bachelor of Technology (BTech)', value: 'Bachelor of Technology (BTech)'},
  ]);

    // Job Type Dropdown
    const [open4, setOpen4] = useState(false);
    const [value4, setValue4] = useState(null);
    const [items4, setItems4] = useState([
      {label: 'Contract', value: 'Contract'},
      {label: 'Part Time', value: 'Part Time'},
      {label: 'Intern', value: 'Intern'},
      {label: 'Temporary', value: 'Temporary'},
      {label: 'Full Time', value: 'Full Time'},
    ]);
// Dropdown


  const onSubmit = (data) => {
    data['Skills'] = skills; // Add the list of skills to the form data
    console.log("Data:", data); // Log the form data
    
    // console.log("Skills:", skills); // Log the list of skills
  };

  const handleAddSkill = () => {
    if (enteredSkill.trim() !== '') {
      setSkills([...skills, enteredSkill]); // Add entered skill to the list
      setEnteredSkill(''); // Clear the input field
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  return (
    // <KeyboardAvoidingView behavior="padding">
    <Background>
    <Header>Add Job</Header>
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Controller 
            control={control}
            render={({ field }) => (
              <TextInput
                label="Company Name"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                error={errors.companyName ? true : false}
              />
            )}
            name="company Name"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.companyName && <HelperText type="error">Company Name is required</HelperText>}
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
                label="Company Size"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                error={errors.companySize ? true : false}
                keyboardType="numeric"
              />
            )}
            name="Company Size"
            defaultValue=""
          />
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field }) => (
              <TextInput
                label="Company Website"
                onChangeText={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                value={field.value}
                error={errors.companyWebsite ? true : false}
              />
            )}
            name="company Website"
            defaultValue=""
          />
        </View>

{/* City and Country */}
<View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
              label="Country"
              value={'India'}
              disabled
              />
            )}
            name="Country"
            rules={{ required: true }}
            defaultValue="India"
          />
          </View>

              
        <Controller
            control={control}
            render={({field }) => (
              <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              onChangeValue={field.onChange}
              searchable={true}
              zIndex={3000}
              zIndexInverse={1000}
              placeholder='Select State'
              listMode='SCROLLVIEW'
              style={{
                marginBottom: 20,
              }}
            />
            )}
            name="State"
            rules={{ required: true }}
            defaultValue=""
          />
           <Controller
            control={control}
            render={({field }) => (
              <DropDownPicker
              open={open1}
              value={value1}
              items={items1}
              setOpen={setOpen1}
              setValue={setValue1}
              setItems={setItems1}
              onChangeValue={field.onChange}
              searchable={true}
              zIndex={2000}
              zIndexInverse={2000}
              placeholder='Select City'
              listMode='SCROLLVIEW'
              style={{
                marginBottom: 20,
              }}
            />
            )}
            name="City"
            rules={{ required: true }}
            defaultValue=""
          />
       


{/* City and Country end */}
        
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
                label="Job Role"
                onChangeText={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                value={field.value}
                error={errors.jobRole ? true : false}
              />
            )}
            name="Job Role"
            rules={{ required: true }}
            defaultValue=""
          />
          {errors.jobRole && <HelperText type="error">Job Role is required</HelperText>}
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field }) => (
              <TextInput
                label="Job Title"
                onChangeText={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                value={field.value}
                error={errors.jobTitle ? true : false}
              />
            )}
            name="Job Title"
            defaultValue=""
          />
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field }) => (
              <TextInput
                label="Job Description"
                onChangeText={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                value={field.value}
                error={errors.jobDescription ? true : false}
                multiline
                numberOfLines={5}
              />
            )}
            name="Job Description"
            defaultValue=""
          />
        </View>

        {/* Number inputs for Lower Salary Range, Upper Salary Range, and Experience */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
                label="Lower Salary Range"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                error={errors.LowerSalaryRange ? true : false}
                keyboardType="numeric"
              />
            )}
            name="Lower Salary Range"
            defaultValue=""
          />
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
                label="Upper Salary Range"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                error={errors.UpperSalaryRange ? true : false}
                keyboardType="numeric"
              />
            )}
            name="Upper Salary Range"
            defaultValue=""
          />
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
                label="Years of Experience"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                value={field.value}
                error={errors.YearsOfExperience ? true : false}
                keyboardType="numeric"
              />
            )}
            name="Experience"
            defaultValue=""
          />
        </View>

        {/* Dropdowns for Highest Qualification and Work Type */}
        <Controller
            control={control}
            render={({field }) => (
              <DropDownPicker
              open={open3}
              value={value3}
              items={items3}
              setOpen={setOpen3}
              setValue={setValue3}
              setItems={setItems3}
              onChangeValue={field.onChange}
              searchable={true}
              zIndex={3000}
              zIndexInverse={1000}
              placeholder='Select Highest Qualification'
              listMode='SCROLLVIEW'
              style={{
                marginBottom: 20,
              }}
            />
            )}
            name="Highest Qualification"
            rules={{ required: true }}
            defaultValue=""
          />

          <Controller
            control={control}
            render={({field }) => (
              <DropDownPicker
              open={open4}
              value={value4}
              items={items4}
              setOpen={setOpen4}
              setValue={setValue4}
              setItems={setItems4}
              onChangeValue={field.onChange}
              searchable={true}
              zIndex={2000}
              zIndexInverse={2000}
              placeholder='Select Work Type'
              listMode='SCROLLVIEW'
              style={{
                marginBottom: 20,
              }}
            />
            )}
            name="Work Type"
            rules={{ required: true }}
            defaultValue=""
          />
{/* Number inputs for Lower Salary Range, Upper Salary Range, and Experience */}


        {/* Dropdowns for Highest Qualification and Work Type */}
        <Controller
          control={control}
          render={({ field }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Skills"
                onChangeText={(value) => setEnteredSkill(value)}
                value={enteredSkill}
              />
              <Button onPress={handleAddSkill}>Add</Button>
            </View>
          )}
          name="Skills"
          defaultValue=""
        />

        <View style={styles.skillContainer}>
            {skills.map((skill, index) => (
            <Chip
              key={index}
              style={styles.chip}
              onClose={() => handleRemoveSkill(skill)} // Call handleRemoveSkill with the skill to remove
            >
              {skill}
            </Chip>
          ))}
        </View>


        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ field }) => (
              <TextInput
                label="Responsibilities"
                onChangeText={(value) => field.onChange(value)}
                onBlur={field.onBlur}
                value={field.value}
                error={errors.responsibilities ? true : false}
                multiline
                numberOfLines={5}
              />
            )}
            name="Responsibilities"
            defaultValue=""
          />
        </View>

        {/* Dropdown for Mode */}
        <Controller
            control={control}
            render={({field }) => (
              <DropDownPicker
              open={open2}
              value={value2}
              items={items2}
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={setItems2}
              onChangeValue={field.onChange}
              searchable={true}
              zIndex={1000}
              zIndexInverse={3000}
              placeholder='Select Work Mode'
              style={{
                marginBottom: 20,
              }}
              listMode='SCROLLVIEW'
            />
            )}
            name="Mode"
            rules={{ required: true }}
            defaultValue=""
          />

        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
          Submit
        </Button>
      </ScrollView>
    </View>
    {/*  </KeyboardAvoidingView> */}
    </Background >
  );
};


export default memo(AddJob);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
    // paddingTop: 50,
  },
  formContainer: {
    flexGrow: 1,
  },
  inputContainer: {
    marginBottom: 20,
  },
  submitButton: {
    marginTop: 20,
  },
  skillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  chip: {
    marginRight: 10,
    marginBottom: 10,
  },
});


