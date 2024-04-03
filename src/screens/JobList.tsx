import React, { memo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Card, Button } from 'react-native-paper';
import { Navigation } from '../types';
import Header from '../components/Header';
import Background from '../components/Background';

type Props = {
  navigation: Navigation;
};


const JobList = ({ navigation }: Props) => {
  const [jobs, setJobs] = useState([
    {
      jobId: "7",
      jobTitle: "Teacher",
      companyName: "Ernst & Young"
    },
    {
        jobId: "8",
        jobTitle: "Spy Agent",
        companyName: "Ernst & Young"
      }
  ]);

  const handleDelete = (jobId) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this job?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: () => {
            console.log("Deleted job with ID:", jobId);
            // setJobs(jobs.filter(job => job.jobId !== jobId));
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (

    <View style={styles.container}>
      <Text style={styles.title}>Job List</Text>
      
      {jobs.map(job => (
        <Card key={job.jobId} style={styles.card}>
          <Card.Content>
            <Text style={styles.jobTitle}>{job.jobTitle}</Text>
            <Text style={styles.companyName}>{job.companyName}</Text>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              icon="delete"
              onPress={() => handleDelete(job.jobId)}
            >
              Delete
            </Button>
            <Button
              icon="pencil"
              onPress={() => navigation.navigate('EditJob')}
            >
              Edit
            </Button>
          </Card.Actions>
        </Card>
      ))}
      {/* add spacing */}
      <View style={{ marginBottom: 30 }} />
      <Button
        icon="plus"
        mode='contained'
        style={styles.addButton}
        onPress={() => navigation.navigate('AddJob')}
      >
        Add Job
      </Button>
    </View>
  );
};
export default memo(JobList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 25,
    textAlign: 'center',
  },
  card: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 16,
    color: 'gray',
  },
  cardActions: {
    justifyContent: 'flex-end',
  },
  addButton: {
    marginBottom: 10,
  },
});

