import React, { memo, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { Card, Button } from 'react-native-paper';
// import { Navigation } from '../types';
import Header from '../components/Header';
import Background from '../components/Background';
import axios, { AxiosResponse } from "axios";
import { useRoute } from '@react-navigation/native';  
import { useLogin } from "../context/LoginProvider";


// type Props = {
//   navigation: Navigation;
// };

// const user_id = "Jb8810c9d-f94b-4f85-98ee-9d82b0160aa1t"
// const jobdata = []
function fetchJobData(userId): Promise<any> {
  return axios
    .get("http://10.0.0.10:3000/allJobs/" + userId)
    .then((response: AxiosResponse) => {
      const responseData = response.data;
      return responseData;
    })
    .catch((error: any) => {
      console.error("Error fetching data:", error);
      return {};
    });
}
  
const JobList = ({ navigation }) => {
  console.log("JobList re re re re r e re  r e");
  
  const { userId } = useLogin();
  const [jobslist, setJobslist] = useState([]);

  fetchJobData(userId).then((responseData: any) => {
    console.log(responseData.jobs);
    setJobslist(responseData.jobs);
  });
  
  const editPage = (jobId) => {
    axios.get('http://10.0.0.10:3000/jobInfo/'+jobId)
    .then(function (response) {
      // handle success
      navigation.navigate('EditJob', {jobData: response.data})
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    
  };

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
            axios.delete('http://10.0.0.10:3000/deleteJob/'+ jobId)
            .then(response => {
              // Handle success (status code 2xx)
              console.log('DELETE request successful:', response.data);
            })
            .catch(error => {
              // Handle error (non-2xx status codes)
              if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Request failed with status code:', error.response.status);
                console.error('Response data:', error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
              } else {
                // Something else went wrong
                console.error('Error:', error.message);
              }
            });
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
      
      {jobslist.map(job => (
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
              onPress={() => editPage(job.jobId)}
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

