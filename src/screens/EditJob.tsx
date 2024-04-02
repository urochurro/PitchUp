import React, {memo, useState} from 'react';
import { View, StyleSheet, ScrollView,  KeyboardAvoidingView} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Button, Chip, HelperText, RadioButton, Menu, Divider, Card, Title } from 'react-native-paper';
import { Navigation } from '../types';
import TextInput from '../components/TextInput';


type Props = {
  navigation: Navigation;
};


const EditJob = ({ navigation }: Props) => {
    const jobdata = require('../assets/jobdata.json')
  const { control, handleSubmit, formState: { errors }  } = useForm();
  const [enteredSkill, setEnteredSkill] = useState(''); // State to store entered skill
  const [skills, setSkills] = useState([]); // State to store list of skills

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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.formContainer}>
      <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
              label="Company Name"
              value={`${jobdata.companyName}`}
              disabled
              />
            )}
            name="Company Name"
            rules={{ required: true }}
            defaultValue={`${jobdata.companyName}`}
          />
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
            defaultValue={`${jobdata.companySize}`}
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
            defaultValue={`${jobdata.companyWebsite}`}
          />
        </View>

{/* City and Country */}
<View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
              label="Country"
              value={`${jobdata.Located_in_city.country}`}
              disabled
              />
            )}
            name="Country"
            rules={{ required: true }}
            defaultValue={`${jobdata.Located_in_city.country}`}
          />
          </View>

              
          <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
              label="City"
              value={`${jobdata.Located_in_city.name}`}
              disabled
              />
            )}
            name="City"
            rules={{ required: true }}
            defaultValue={`${jobdata.Located_in_city.name}`}
          />
          </View>
       


{/* City and Country end */}
        
<View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
              label="Job Role"
              value={`${jobdata.Offers_job_role.name}`}
              disabled
              />
            )}
            name="Job Role"
            rules={{ required: true }}
            defaultValue={`${jobdata.Offers_job_role.name}`}
          />
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
            defaultValue={`${jobdata.jobTitle}`}
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
            defaultValue={`${jobdata.jobDescription}`} />
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
            defaultValue={`${jobdata.lowerSalaryRange}`}
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
            defaultValue={`${jobdata.upperSalaryRange}`}
          />
        </View>

        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
              label="Years of Experience"
              value={`${jobdata.Requires_experience.name}`}
              disabled
              />
            )}
            name="Experience"
            rules={{ required: true }}
            defaultValue={`${jobdata.Requires_experience.name}`}
          />
          </View>

        {/* Dropdowns for Highest Qualification and Work Type */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
              label="Highest Qualification"
              value={`${jobdata.Requires_qualification.name}`}
              disabled
              />
            )}
            name="Highest Qualification"
            rules={{ required: true }}
            defaultValue={`${jobdata.Requires_qualification.name}`}
          />
          </View>

          <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
              label="Work Type"
              value={`${jobdata.Requires_job_type.name}`}
              disabled
              />
            )}
            name="Work Type"
            rules={{ required: true }}
            defaultValue={`${jobdata.Requires_job_type.name}`}
          />
          </View>
{/* Number inputs for Lower Salary Range, Upper Salary Range, and Experience */}

<Card style={styles.card}>
      <Card.Content>
      <Title>Current Skills Required</Title>
        <Divider style={{ marginBottom: 10 }} />
        <View style={styles.skillsContainer}>
          {jobdata.Requires_skill.map((skill, index) => (
            <Chip key={index} style={styles.skillChip}>{skill}</Chip>
          ))}
        </View>
        {/* Render other profile details as needed */}
      </Card.Content>
    </Card>

        <Controller
          control={control}
          render={({ field }) => (
            <View style={styles.inputContainer}>
              <TextInput
                label="Add New Skills"
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
            defaultValue={`${jobdata.responsibilities}`}
          />
        </View>

        {/* Dropdown for Mode */}
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({field }) => (
              <TextInput
              label="Work Mode"
              value={`${jobdata.mode}`}
              disabled
              />
            )}
            name="Mode"
            rules={{ required: true }}
            defaultValue={`${jobdata.mode}`}
          />
          </View>

        <Button mode="contained" onPress={handleSubmit(onSubmit)} style={styles.submitButton}>
          Submit
        </Button>
      </ScrollView>
    </View>
  );
};

export default memo(EditJob);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
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
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
  },
  skillChip: {
    margin: 2,
  },
  
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    width: '95%',
    alignSelf: 'center',
    elevation: 3,
  },
});


