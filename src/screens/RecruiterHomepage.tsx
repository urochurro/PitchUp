import React, { memo, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Animated,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import {
  Card,
  Chip,
  Menu,
  Button,
  Divider,
  FAB,
  Text,
  Icon,
} from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { Navigation } from "../types";

type Props = {
  navigation: Navigation;
};

// Define videos and profile data
const videos = [
  require("../assets/video1.mp4"),
  require("../assets/video2.mp4"),
  require("../assets/video2.mp4"),
  require("../assets/video1.mp4"),
  require("../assets/video2.mp4"),
  require("../assets/video2.mp4"), // Add more videos as needed
  // Add more videos as needed
];

const profiles = [
  require("../assets/data.json"),
  require("../assets/data2.json"),
  require("../assets/data.json"),
  require("../assets/data2.json"),
  require("../assets/data.json"),
  require("../assets/data2.json"),
  // Add more profile data as needed
];

const BasicInfoCard = ({ profileData }) => {
  return (
    <Card mode="elevated" style={styles.card}>
      <Card.Content>
        <Text
          variant="titleLarge"
          style={styles.infoCardText}
        >{`${profileData.first_name} ${profileData.last_name}`}</Text>
        <Text variant="bodyLarge" style={styles.infoCardText}>
          {profileData.headline}
        </Text>
        <Divider style={{ marginVertical: 10 }} />
        <Text variant="bodyMedium" style={styles.infoCardText}>
          {profileData.about}
        </Text>
        <Divider style={{ marginVertical: 10 }} />
        <View style={styles.skillsContainer}>
          {profileData.skills.slice(0, 5).map((skill, index) => (
            <Chip
              key={index}
              style={styles.skillChip}
              textStyle={{ color: "white" }}
            >
              {skill}
            </Chip>
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
    workExperience = JSON.parse(
      profileData.work_experience.replace(/NaN/g, "null")
    );
  } catch (error) {
    console.error("Error parsing work experience:", error);
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.infoCardText}>
          Work Experience
        </Text>
        <Divider style={{ marginVertical: 20 }} />
        {workExperience.map((job, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.cardtextlarge}>{job.company}</Text>
            <Text style={styles.cardtextmedium}>{job.jobTitle}</Text>
            <Text style={styles.cardtextsmall}>{job.jobLocation}</Text>
            <Text style={styles.cardtextsmall}>{job.jobDateRange}</Text>
            {index !== workExperience.length - 1 && (
              <View style={styles.separator} />
            )}
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
    educationHistory = JSON.parse(
      profileData.education_history.replace(/NaN/g, "null")
    );
  } catch (error) {
    console.error("Error parsing education history:", error);
  }

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text variant="titleLarge" style={styles.infoCardText}>
          Education History
        </Text>
        <Divider style={{ marginVertical: 20 }} />
        {educationHistory.map((education, index) => (
          <View key={index} style={{ marginBottom: 10 }}>
            <Text style={styles.cardtextlarge}>{education.school}</Text>
            <Text style={styles.cardtextmedium}>
              Degree: {education.schoolDegree}
            </Text>
            <Text style={styles.cardtextsmall}>
              Date Range: {education.schoolDateRange}
            </Text>
            <Text style={styles.cardtextsmall}>
              Description: {education.schoolDescription}
            </Text>
            {index !== educationHistory.length - 1 && (
              <View style={styles.separator} />
            )}
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

  const profileData = profiles[profileIndex];

  const [likeIsVisible, setLikeIsVisible] = useState(false);
  const [dislikeIsVisible, setDislikeIsVisible] = useState(false);

  const [animation] = useState(new Animated.Value(0));

  const flashStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  const handleHeartPress = () => {
    console.log("Heart button pressed");

    animation.setValue(0);

    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();

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

    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    setDislikeIsVisible(true);

    setTimeout(() => {
      setDislikeIsVisible(false);
    }, 1000);

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
          <Menu.Item onPress={() => { }} title="Item 1" />
          <Menu.Item onPress={() => { }} title="Item 2" />
          <Divider />
          <Menu.Item onPress={() => { }} title="Item 3" />
        </Menu>
      </View>
      <View style={styles.textContainer}>
        <Text
          variant="headlineLarge"
          style={styles.videotext}
        >{`${profileData.first_name} ${profileData.last_name}`}</Text>
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
              {profileData.work_experience.length > 0 && (
                <WorkExperienceCard profileData={profileData} />
              )}
              {profileData.education_history.length > 0 && (
                <EducationHistoryCard profileData={profileData} />
              )}
              {/* Add more cards for other information */}
            </>
          )}
        </ScrollView>
      </Modal>
    </View >
  );
};

export default memo(RecruiterHomepage);

const styles = StyleSheet.create({
  flashIconContainer: {
    alignItems: "center",
    paddingVertical: "89%",
    backgroundColor: "#fff",
    zIndex: 2000,
  },
  container: {
    flex: 1,
  },
  video: {
    flex: 1,
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
