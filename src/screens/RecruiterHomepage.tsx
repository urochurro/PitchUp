import React, { memo, useRef, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal, ScrollView} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Card, Title, Paragraph, Chip, PaperProvider, Menu, Button, Divider} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for button icons
// import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
// import { DoneScreen } from './DoneScreen';
import { Navigation } from '../types';

type Props = {
  navigation: Navigation;
};


// Define videos and profile data
const videos = [
  require("../assets/video1.mp4"),
  require("../assets/video2.mp4")  // Add more videos as needed
];

const profiles = [
  require("../assets/data.json"),
  require("../assets/data2.json"),
  // Add more profile data as needed
];


const BasicInfoCard = ({ profileData }) => {
  return (
    <Card style={styles.card}>
      <Card.Content>
        <Title>{`${profileData.first_name} ${profileData.last_name}`}</Title>
        <Text style={styles.cardtextmedium}>{profileData.headline}</Text>
        <Text></Text>
        <Text style={{textAlign: 'justify'}}>{profileData.about}</Text>
        <View style={styles.skillsContainer}>
          {profileData.skills.slice(0, 5).map((skill, index) => (
            <Chip key={index} style={styles.skillChip}>{skill}</Chip>
          ))}
        </View>
        {/* Render other profile details as needed */}
      </Card.Content>
    </Card>
  );
};

// Work Experience Card Component
const WorkExperienceCard = ({ profileData }) => {
  let workExperience = [];
  try {
    workExperience = JSON.parse(profileData.work_experience.replace(/NaN/g, "null"))
  } catch (error) {
    console.error("Error parsing work experience:", error);
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
      <Title>Work Experience</Title>
      <Text></Text>
      {workExperience.map((job, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={styles.cardtextlarge}>{job.company}</Text>
          <Text style={styles.cardtextmedium}>{job.jobTitle}</Text>
          <Text style={styles.cardtextsmall}>{job.jobLocation}</Text>
          <Text style={styles.cardtextsmall}>{job.jobDateRange}</Text>
          {index !== workExperience.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
      </Card.Content>
    </Card>
  );
};

// Education History Card Component
const EducationHistoryCard = ({ profileData }) => {
  let educationHistory = [];
  try {
    educationHistory = JSON.parse(profileData.education_history.replace(/NaN/g, "null"));
  } catch (error) {
    console.error("Error parsing education history:", error);
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
      <Title>Education History</Title>
      <Text></Text>
      {educationHistory.map((education, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={styles.cardtextlarge}>{education.school}</Text>
          <Text style={styles.cardtextmedium}>Degree: {education.schoolDegree}</Text>
          <Text style={styles.cardtextsmall}>Date Range: {education.schoolDateRange}</Text>
          <Text style={styles.cardtextsmall}>Description: {education.schoolDescription}</Text>
          {index !== educationHistory.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
      </Card.Content>
    </Card>
  );
};


const RecruiterHomepage = ({ navigation }: Props) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const [profileIndex, setProfileIndex] = useState(0);
  // const navigation = useNavigation(); // Get navigation object

  const profileData = profiles[profileIndex];

    const handleHeartPress = () => {
    console.log('Heart button pressed');
    // Move to the next video and profile data
    if (videoIndex < videos.length - 1 && profileIndex < profiles.length - 1) {
      setVideoIndex(videoIndex + 1);
      setProfileIndex(profileIndex + 1);
    } else {
      navigation.navigate('DoneScreen')
      // return (
      //   <PaperProvider>
      //     <DoneScreen />
      //   </PaperProvider>
      // );// Navigate to the "DoneScreen" when all data has been shown
    }
  };

  const handleCancelPress = () => {
    console.log('Cancel button pressed');
    // Move to the next video and profile data
    if (videoIndex < videos.length - 1 && profileIndex < profiles.length - 1) {
      setVideoIndex(videoIndex + 1);
      setProfileIndex(profileIndex + 1);
    } else {
      console.log('You are done!');
      // navigation.navigate('DoneScreen' as never); // Navigate to the "DoneScreen" when all data has been shown
    }
  };


  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const handlePlaybackStatusUpdate = (status) => {
    if (!status.isPlaying && status.didJustFinish) {
      // Ensure video replays from the start
      videoRef.current.replayAsync();
    }
  };

  const [visible, setVisible] = useState(false); // State to manage menu visibility
  // const [selectedFilter, setSelectedFilter] = useState(null); // State to store the selected filter value

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  // const handleFilterSelect = (filter) => {
  //   setSelectedFilter(filter);
  //   closeMenu();
  // };

  return (
    <View style={styles.container}>
      
      <Video
        ref={videoRef}
        source={videos[videoIndex]} // Update the path as per your project structure
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isPlaying}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      <TouchableOpacity style={styles.overlay} onPress={togglePlay} activeOpacity={1}>
        {/* Empty view to overlay */}
      </TouchableOpacity>
      <View style={styles.filterIcon}>
      <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={<Button onPress={openMenu} style={{backgroundColor: 'rgba(0, 0, 0, 0.5)',borderRadius: 10}}><Ionicons name="funnel" size={30} color="white" /></Button>}>
          <Menu.Item onPress={() => {}} title="Item 1" />
          <Menu.Item onPress={() => {}} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Item 3" />
        </Menu>
        
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{`${profileData.first_name} ${profileData.last_name}`}</Text>
        <Text style={styles.text}>{profileData.headline}</Text>
      </View>

      <View style={styles.bottomButtonContainer}>
      <TouchableOpacity style={styles.bottomButton} onPress={handleCancelPress}>
        <Ionicons name="close" size={24} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="arrow-down" size={24} color="white" />
        <Text style={styles.bottomButtonText}>Know More</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bottomButton} onPress={handleHeartPress}>
        <Ionicons name="heart" size={24} color="red" />
      </TouchableOpacity>
    </View>

      {/* <Button title="Open Profile" onPress={() => setModalVisible(true)} /> */}
      <Modal visible={modalVisible} animationType="slide">
      <ScrollView contentContainerStyle={styles.modalContainer}>
          {profileData && (
            <>
              <BasicInfoCard profileData={profileData} />
              {profileData.work_experience.length > 0 && <WorkExperienceCard profileData={profileData} />}
              {profileData.education_history.length > 0 && <EducationHistoryCard profileData={profileData} />}
              {/* Add more cards for other information */}
              <Button onPress={() => setModalVisible(false)} >Close</Button>
            </>
          )}
        </ScrollView>
      </Modal>

    </View>
  );
};

export default memo(RecruiterHomepage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
  },
  textContainer: {
    position: 'absolute',
    bottom: 70,
    left: 20,
  },
  name: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  modalContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  // card: {
  //   marginVertical: 10,
  //   width: '90%',
  // },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  skillChip: {
    margin: 2,
  },
  
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
  cardtextlarge: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cardtextmedium: {
    fontSize: 16,
  },
  cardtextsmall: {
    fontSize: 12,
    color: '#666',
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  bottomButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 25,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomButtonText: {
    color: 'white',
    marginLeft: 5,
  },
  filterIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingLeft:310,
    position: 'absolute',
    width: '100%',
  },
});
