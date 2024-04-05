import React, { memo, useRef, useState, useEffect, useReducer } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, ScrollView} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Card, Chip, Menu, Button, Divider, FAB, Text, Icon} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Navigation } from '../types';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import axios from 'axios';
import { fetchJobs, fetchCandidateInfo} from "../core/utils";

type Props = {
  navigation: Navigation;
};
const user_id = "e70c98c7-5cc8-4caf-a334-d3b20a47b73e"

// Define videos and profile data
const videos = [
  require("../assets/video1.mp4"),
  require("../assets/video2.mp4"),
  require("../assets/video1.mp4"),
  require("../assets/video2.mp4"),
  require("../assets/video1.mp4"),
  require("../assets/video2.mp4"),
  require("../assets/video1.mp4"),
  require("../assets/video2.mp4"),
  require("../assets/video1.mp4"),
  require("../assets/video2.mp4"),
  require("../assets/video1.mp4"),
  require("../assets/video2.mp4")  // Add more videos as needed
];




const BasicInfoCard = ({ profileData }) => {
  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.infoCardText}>{`${profileData.firstName} ${profileData.lastName}`}</Text>
        <Text variant="bodyLarge" style={styles.infoCardText}>{profileData.headline}</Text>
        <Divider style={{ marginVertical: 10 }} />
        <Text variant="bodyMedium" style={styles.infoCardText}>{profileData.about}</Text>
        <Divider style={{ marginVertical: 10 }} />
        <View style={styles.skillsContainer}>
          {profileData.skills.slice(0, 5).map((skill, index) => (
            <Chip key={index} style={styles.skillChip} textStyle={{ color: 'white' }}>{skill}</Chip>
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
    workExperience = JSON.parse(profileData.workExperience.replace(/NaN/g, "null"))
  } catch (error) {
    console.error("Error parsing work experience:", error);
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
      <Text variant="titleLarge" style={styles.infoCardText}>Work Experience</Text>
      <Divider style={{ marginVertical: 20 }} />
      {workExperience.map((job, index) => (
        <View key={index} style={{ marginBottom: 10 }}>
          <Text style={styles.cardtextlarge} >{job.company}</Text>
          <Text style={styles.cardtextmedium} >{job.jobTitle}</Text>
          <Text style={styles.cardtextsmall} >{job.jobLocation}</Text>
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
    educationHistory = JSON.parse(profileData.educationHistory.replace(/NaN/g, "null"));
  } catch (error) {
    console.error("Error parsing education history:", error);
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
      <Text variant="titleLarge" style={styles.infoCardText}>Education History</Text>
      <Divider style={{ marginVertical: 20 }} />
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
  // const [profiles, setprofiles] = useState([
  //   require("../assets/data.json"),
  //   require("../assets/data2.json"),
  // ]);

  const [profiles, setProfiles] = useState([
    {
      birthday: null,
      country: "India",
      lastName: "Sanghvi",
      projects: null,
      highestQualification: "Bachelor of Technology (BTech)",
      workMode: "Hybrid",
      city: "Mumbai",
      about:
        "As an Engineering Undergrad , I am a visionary and highly motivated individual who continuously strives to add value in everything I do. With a passion for Business and Finance, I am determined to forge a successful career in this dynamic field. Solving business problems and strategizing effective solutions excites me, as I enjoy delving into market analysis and identifying potential gaps. Moreover, I believe in the prowess of technology to optimize operations and make them more efficient. \n\nWith a keen eye for detail and a drive for innovation, I am ready to bring my analytical skills and creative thinking to contribute to the success of any organization in the business and finance domain.",
      workExperience:
        '[{"company": "Deloitte", "jobTitle": "Summer Intern", "jobLocation": "Mumbai, Maharashtra, India \\u00b7 On-site", "jobDateRange": "Jun 2023 - Jul 2023", "jobDuration": "2 mos", "jobDescription": "\\u2022\\tStrategized for the on-rolling of a new service within the Cyber Security Domain, as part of a project at Deloitte\\n\\u2022\\tConducted Market Research to identify potential opportunities and gaps in the market\\n\\u2022\\tStitched together various components of the service to ensure seamless integration\\n\\u2022\\tCreated a compelling Elevator Pitch to effectively communicate the key features of the service"}, {"company": "Amazon", "jobTitle": "Operations Manager Intern", "jobLocation": "Thane, Maharashtra, India \\u00b7 On-site", "jobDateRange": "Jan 2024 - Present", "jobDuration": "2 mos", "jobDescription": NaN}]',
      upperSalaryRange: 1700000,
      educationHistory:
        '[{"school": "SVKM\'s NMIMS Mukesh Patel School of Technology Management & Engineering", "schoolDegree": "Bachelor of Technology - BTech, Mechatronics, Robotics, and Automation Engineering", "schoolDateRange": "Jun 2020 - Apr 2024", "schoolDescription": NaN}]',
      skills: [
        "python (programming language)",
        "microsoft excel",
        "analytical skills",
        "machine learning",
        "data analysis",
      ],
      yearsOfExperience: 0,
      jobRole: "Network Engineer",
      jobType: "Contract",
      headline:
        "Operations Manager Intern @Amazon | Engineering Undergrad Student | Former RA Intern @Deloitte",
      website: null,
      languages: ["English,Punjabi"],
      volunteerExperience: null,
      certifications: null,
      userId: "Ddd69432e-2e57-4527-8764-9b4f9a620521i",
      firstName: "Divyanshu",
      honorsAwards: null,
      lowerSalaryRange: 1200000,
      publications: null,
    },
    {
      birthday: null,
      country: "India",
      lastName: "Sanghvi",
      projects: null,
      highestQualification: "Bachelor of Technology (BTech)",
      workMode: "Hybrid",
      city: "Mumbai",
      about:
        "As an Engineering Undergrad , I am a visionary and highly motivated individual who continuously strives to add value in everything I do. With a passion for Business and Finance, I am determined to forge a successful career in this dynamic field. Solving business problems and strategizing effective solutions excites me, as I enjoy delving into market analysis and identifying potential gaps. Moreover, I believe in the prowess of technology to optimize operations and make them more efficient. \n\nWith a keen eye for detail and a drive for innovation, I am ready to bring my analytical skills and creative thinking to contribute to the success of any organization in the business and finance domain.",
      workExperience:
        '[{"company": "Deloitte", "jobTitle": "Summer Intern", "jobLocation": "Mumbai, Maharashtra, India \\u00b7 On-site", "jobDateRange": "Jun 2023 - Jul 2023", "jobDuration": "2 mos", "jobDescription": "\\u2022\\tStrategized for the on-rolling of a new service within the Cyber Security Domain, as part of a project at Deloitte\\n\\u2022\\tConducted Market Research to identify potential opportunities and gaps in the market\\n\\u2022\\tStitched together various components of the service to ensure seamless integration\\n\\u2022\\tCreated a compelling Elevator Pitch to effectively communicate the key features of the service"}, {"company": "Amazon", "jobTitle": "Operations Manager Intern", "jobLocation": "Thane, Maharashtra, India \\u00b7 On-site", "jobDateRange": "Jan 2024 - Present", "jobDuration": "2 mos", "jobDescription": NaN}]',
      upperSalaryRange: 1700000,
      educationHistory:
        '[{"school": "SVKM\'s NMIMS Mukesh Patel School of Technology Management & Engineering", "schoolDegree": "Bachelor of Technology - BTech, Mechatronics, Robotics, and Automation Engineering", "schoolDateRange": "Jun 2020 - Apr 2024", "schoolDescription": NaN}]',
      skills: [
        "python (programming language)",
        "microsoft excel",
        "analytical skills",
        "machine learning",
        "data analysis",
      ],
      yearsOfExperience: 0,
      jobRole: "Network Engineer",
      jobType: "Contract",
      headline:
        "Operations Manager Intern @Amazon | Engineering Undergrad Student | Former RA Intern @Deloitte",
      website: null,
      languages: ["English,Punjabi"],
      volunteerExperience: null,
      certifications: null,
      userId: "Ddd69432e-2e57-4527-8764-9b4f9a620521i",
      firstName: "Divyanshu",
      honorsAwards: null,
      lowerSalaryRange: 1200000,
      publications: null,
    },
    {
      birthday: null,
      country: "India",
      lastName: "Sanghvi",
      projects: null,
      highestQualification: "Bachelor of Technology (BTech)",
      workMode: "Hybrid",
      city: "Mumbai",
      about:
        "As an Engineering Undergrad , I am a visionary and highly motivated individual who continuously strives to add value in everything I do. With a passion for Business and Finance, I am determined to forge a successful career in this dynamic field. Solving business problems and strategizing effective solutions excites me, as I enjoy delving into market analysis and identifying potential gaps. Moreover, I believe in the prowess of technology to optimize operations and make them more efficient. \n\nWith a keen eye for detail and a drive for innovation, I am ready to bring my analytical skills and creative thinking to contribute to the success of any organization in the business and finance domain.",
      workExperience:
        '[{"company": "Deloitte", "jobTitle": "Summer Intern", "jobLocation": "Mumbai, Maharashtra, India \\u00b7 On-site", "jobDateRange": "Jun 2023 - Jul 2023", "jobDuration": "2 mos", "jobDescription": "\\u2022\\tStrategized for the on-rolling of a new service within the Cyber Security Domain, as part of a project at Deloitte\\n\\u2022\\tConducted Market Research to identify potential opportunities and gaps in the market\\n\\u2022\\tStitched together various components of the service to ensure seamless integration\\n\\u2022\\tCreated a compelling Elevator Pitch to effectively communicate the key features of the service"}, {"company": "Amazon", "jobTitle": "Operations Manager Intern", "jobLocation": "Thane, Maharashtra, India \\u00b7 On-site", "jobDateRange": "Jan 2024 - Present", "jobDuration": "2 mos", "jobDescription": NaN}]',
      upperSalaryRange: 1700000,
      educationHistory:
        '[{"school": "SVKM\'s NMIMS Mukesh Patel School of Technology Management & Engineering", "schoolDegree": "Bachelor of Technology - BTech, Mechatronics, Robotics, and Automation Engineering", "schoolDateRange": "Jun 2020 - Apr 2024", "schoolDescription": NaN}]',
      skills: [
        "python (programming language)",
        "microsoft excel",
        "analytical skills",
        "machine learning",
        "data analysis",
      ],
      yearsOfExperience: 0,
      jobRole: "Network Engineer",
      jobType: "Contract",
      headline:
        "Operations Manager Intern @Amazon | Engineering Undergrad Student | Former RA Intern @Deloitte",
      website: null,
      languages: ["English,Punjabi"],
      volunteerExperience: null,
      certifications: null,
      userId: "Ddd69432e-2e57-4527-8764-9b4f9a620521i",
      firstName: "Divyanshu",
      honorsAwards: null,
      lowerSalaryRange: 1200000,
      publications: null,
    },
  ]);

  const [joblist, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs(user_id).then((responseData: any) => {
      setJobs(responseData["jobs"]);
    });
  }, []);
 

  const filterJob = (jobId) => {
    fetchCandidateInfo(jobId)
      .then((responseData: any) => {
        console.log("Profiles before: ", responseData);
        setProfiles(responseData);
        console.log("profiles aftr: ", profiles);
        setVideoIndex(0);
        setProfileIndex(0);
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  };
  const profileData = profiles[profileIndex];
  const [likeIsVisible, setLikeIsVisible] = useState(false);
  const [dislikeIsVisible, setDislikeIsVisible] = useState(false);

  const handleHeartPress = () => {
    console.log("Heart button pressed");
    setLikeIsVisible(true);
    setTimeout(() => {
      setLikeIsVisible(false);
    }, 1000);
    // Move to the next video and profile data
    if (videoIndex < videos.length - 1 && profileIndex < profiles.length - 1) {
      setVideoIndex(videoIndex + 1);
      setProfileIndex(profileIndex + 1);
    } else {
      console.log("You are done!");
      navigation.navigate("DoneScreen");
      // navigation.navigate('DoneScreen' as never); // Navigate to the "DoneScreen" when all data has been shown
    }
  };

  const handleCancelPress = () => {
    console.log("Cancel button pressed");
    setDislikeIsVisible(true);

    setTimeout(() => {
      setDislikeIsVisible(false);
    }, 1000);
    // Move to the next video and profile data
    if (videoIndex < videos.length - 1 && profileIndex < profiles.length - 1) {
      setVideoIndex(videoIndex + 1);
      setProfileIndex(profileIndex + 1);
    } else {
      console.log("You are done!");
      navigation.navigate("DoneScreen");
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
      {likeIsVisible && (
        <View style={styles.flashIconContainer}>
          <Icon source="thumb-up" size={80} color="#083767" />
        </View>
      )}
      {dislikeIsVisible && (
        <View style={styles.flashIconContainer}>
          <Icon source="close-thick" size={100} color="#083767" />
        </View>
      )}
      <Video
        ref={videoRef}
        source={videos[videoIndex]} // Update the path as per your project structure
        style={styles.video}
        resizeMode={ResizeMode.COVER}
        shouldPlay={isPlaying}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />

      <TouchableOpacity
        style={styles.overlay}
        onPress={togglePlay}
        activeOpacity={1}
      >
        {/* Empty view to overlay */}
      </TouchableOpacity>
      <View style={styles.filterIcon}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              onPress={openMenu}
              style={{
                backgroundColor: "transparent",
                borderRadius: 100,
                borderColor: "white",
                borderWidth: 1,
              }}
            >
              <Ionicons name="funnel" size={30} color="white" />
            </Button>
          }
        >
          {joblist.length > 0 && (
            <>
              {joblist.map((job, index) => (
                <React.Fragment key={job.jobId}>
                  <Menu.Item
                    onPress={() => {
                      filterJob(job.jobId);
                    }}
                    title={`${job.jobTitle}`}
                  />
                  {index < joblist.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </>
          )}
        </Menu>
      </View>
      <View style={styles.textContainer}>
        <Text
          variant="headlineLarge"
          style={styles.videotext}
        >{`${profileData.firstName} ${profileData.lastName}`}</Text>
        <Text variant="bodyMedium" style={styles.videotext}>
          {profileData.headline}
        </Text>
      </View>

      <FAB
        color="black"
        mode="elevated"
        style={styles.fabLike}
        icon="thumb-up"
        onPress={handleHeartPress}
      />
      <FAB
        color="white"
        mode="elevated"
        style={styles.fabKnowMore}
        icon="arrow-down"
        onPress={() => setModalVisible(true)}
        label="Know More"
      />
      <FAB
        color="black"
        mode="elevated"
        style={styles.fabDislike}
        icon="close-thick"
        onPress={handleCancelPress}
      />

      {/* <Button title="Open Profile" onPress={() => setModalVisible(true)} /> */}
      <Modal visible={modalVisible} animationType="slide">
        <ScrollView contentContainerStyle={styles.modalContainer}>
          {profileData && (
            <>
              <Button
                onPress={() => setModalVisible(false)}
                style={{ alignSelf: "flex-start", paddingVertical: 10 }}
                icon={"close"}
              >
                Close
              </Button>
              <BasicInfoCard profileData={profileData} />
              {profileData.workExperience.length > 0 && (
                <WorkExperienceCard profileData={profileData} />
              )}
              {profileData.educationHistory.length > 0 && (
                <EducationHistoryCard profileData={profileData} />
              )}
              {/* Add more cards for other information */}
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
  flashIconContainer: {
    alignItems: "center",
    paddingVertical: "89%",
    backgroundColor: "#fff",
    zIndex: 2000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
  },
  textContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
  },
  name: {
    fontSize: 25,
    color: "white",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "white",
  },
  modalContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    marginTop: 20,
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  // card: {
  //   marginVertical: 10,
  //   width: '90%',
  // },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  skillChip: {
    margin: 2,
    paddingVertical: 0,
    backgroundColor: "#083767",
    color: "white",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: "100%",
    alignSelf: "center",
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  cardtextlarge: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Helvetica",
  },
  cardtextmedium: {
    fontSize: 16,
    fontFamily: "Helvetica",
  },
  cardtextsmall: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Helvetica",
  },
  bottomButtonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  bottomButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 25,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  bottomButtonText: {
    color: "white",
    marginLeft: 3,
  },
  filterIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingLeft: 310,
    position: "absolute",
    width: "100%",
  },
  fabKnowMore: {
    color: "transparent",
    borderWidth: 1,
    borderColor: "white",
    position: "absolute",
    margin: 16,
    marginBottom: 30,
    right: "28%",
    bottom: 0,
    backgroundColor: "transparent",
    borderRadius: 30,
  },
  fabLike: {
    color: "white",
    position: "absolute",
    margin: 16,
    marginBottom: 30,
    right: 0,
    bottom: 0,
    backgroundColor: "white",
    borderRadius: 30,
  },
  fabDislike: {
    position: "absolute",
    margin: 16,
    left: 0,
    bottom: 0,
    backgroundColor: "white",
    marginBottom: 30,
    borderRadius: 30,
    zIndex: 1000,
  },
  videotext: {
    color: "white",
    fontFamily: "Helvetica",
  },
  infoCardText: {
    textAlign: "justify",
    fontFamily: "Helvetica",
  },
});
