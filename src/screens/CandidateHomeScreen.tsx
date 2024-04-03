import React, { memo, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
  View
}
  from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, Card, Text, Icon, Chip, Divider, BottomNavigation } from "react-native-paper";



const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;
const candidateHomeScreenData = [
  {
    "User Id": 1,
    "Company Name": "Kolkata Knight Riders",
    "Company Size": 48199,
    "Company Website": "www.google.com",
    City: "Mumbai",
    Country: "India",
    "Job Role": "HR Generalist",
    "Job Title": "HR Coordinator",
    "Job Description":
      "HR Coordinators assist in HR functions such as recruitment, onboarding, and employee record maintenance. They often handle administrative tasks, organize training programs, and provide support to the HR department in various ways.",
    "Lower Salary Range": 650000,
    "Upper Salary Range": 920000,
    Experience: "",
    "Highest Qualification": "PhD",
    "Work Type": "Temporary",
    Skills:
      "Recruitment, onboarding, employee relations, HRIS, performance management, organizational development, conflict resolution, labor law",
    Responsibilities:
      "Assist with recruitment activities, including posting job openings, coordinating interviews, and managing applicant data. Ensure a positive candidate experience. Maintain recruitment records and metrics.",
    Mode: "On-site",
  },
  {
    "User Id": 2,
    "Company Name": "dddddd",
    "Company Size": 48199,
    "Company Website": "www.google.com",
    City: "fffff",
    Country: "India",
    "Job Role": "HR Generalist",
    "Job Title": "HR Coordinator",
    "Job Description":
      "HR Coordinators assist in HR functions such as recruitment, onboarding, and employee record maintenance. They often handle administrative tasks, organize training programs, and provide support to the HR department in various ways.",
    "Lower Salary Range": 650000,
    "Upper Salary Range": 920000,
    Experience: "",
    "Highest Qualification": "PhD",
    "Work Type": "Temporary",
    Skills: "Recruitment, conflict resolution, labor law",
    Responsibilities:
      "Assist with recruitment activities, including posting job openings, coordinating interviews, and managing applicant data. Ensure a positive candidate experience. Maintain recruitment records and metrics.",
    Mode: "On-site",
  },
  {
    "User Id": 3,
    "Company Name": "heebie",
    "Company Size": 48199,
    "Company Website": "www.google.com",
    City: "fffff",
    Country: "India",
    "Job Role": "HR Generalist",
    "Job Title": "HR Coordinator",
    "Job Description":
      "HR Coordinators assist in HR functions such as recruitment, onboarding, and employee record maintenance. They often handle administrative tasks, organize training programs, and provide support to the HR department in various ways.",
    "Lower Salary Range": 650000,
    "Upper Salary Range": 920000,
    Experience: "",
    "Highest Qualification": "PhD",
    "Work Type": "Temporary",
    Skills:
      "Recruitment, onboarding, employee relations, HRIS, performance management, organizational development, conflict resolution, labor law",
    Responsibilities:
      "Assist with recruitment activities, including posting job openings, coordinating interviews, and managing applicant data. Ensure a positive candidate experience. Maintain recruitment records and metrics.",
    Mode: "On-site",
  },
];

export const CandidateHomeScreen = () => {

  //Dummy Navbar
  const MusicRoute = () => <Text>Music</Text>;

  const AlbumsRoute = () => <Text>Albums</Text>;

  const RecentsRoute = () => <Text>Recents</Text>;

  const NotificationsRoute = () => <Text>Notifications</Text>;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'music', focusedIcon: 'heart', unfocusedIcon: 'heart-outline' },
    { key: 'albums', focusedIcon: 'album' },
    { key: 'recents', focusedIcon: 'history' },
    { key: 'notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    notifications: NotificationsRoute,
  });


  // Dummy navbar
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);


  const openWebsite = () => {
    Linking.openURL(
      candidateHomeScreenData[currentCandidateIndex]["Company Website"]
    );
  };

  const InfoCardComponent = ({ title, content }) => {
    return (
      <Card mode="elevated" style={styles.infoCard}>
        <Card.Content>
          <Text variant="headlineLarge">{title}</Text>
          <Text variant="bodyMedium">{content}</Text>
        </Card.Content>
      </Card>
    );
  };

  const skills =
    candidateHomeScreenData[currentCandidateIndex]["Skills"].split(", ");

  const handleLike = () => {
    setCurrentCandidateIndex(
      (prevIndex) => (prevIndex + 1) % candidateHomeScreenData.length
    );
    console.log("Liked", currentCandidateIndex);
  };

  const handleDislike = () => {
    setCurrentCandidateIndex(
      (prevIndex) => (prevIndex + 1) % candidateHomeScreenData.length
    );
    console.log("Disliked", currentCandidateIndex);
  };

  return (
    <SafeAreaView>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.leftAlignedItems1} variant="headlineSmall">
          {candidateHomeScreenData[currentCandidateIndex]["Company Name"]}
        </Text>
        <Text style={styles.leftAlignedItems2} variant="titleMedium">
          {candidateHomeScreenData[currentCandidateIndex]["Job Role"]}
        </Text>
        <Card mode="elevated" style={styles.logoCard}>
          <Card.Cover
            style={styles.logoImage}
            resizeMode="cover"
            source={{
              uri: "https://i.pinimg.com/originals/c8/e9/e6/c8e9e65d1d2f9d2472dd64a875c5c238.jpg",
            }}
          />
          {/* <Card.Content style={styles.logoCardTitle}>
            <Text variant="bodyMedium" style={styles.title}>
              {candidateHomeScreenData[currentCandidateIndex]["Job Role"]}
            </Text>
            <TouchableOpacity onPress={openWebsite}>
              <Text variant="bodyMedium" style={styles.title}>
                <Icon size={20} source="web" />
                {`${""} ${candidateHomeScreenData[currentCandidateIndex][
                  "Company Website"
                ]
                  }`}
              </Text>
            </TouchableOpacity>
          </Card.Content> */}
        </Card>

        <Card mode="elevated" style={styles.segmentedCard}>
          <Card.Content>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text variant="bodyMedium" style={styles.title}>
                <Icon size={20} source="clock" />{`${"  "}${candidateHomeScreenData[currentCandidateIndex]["Work Type"]
                  }`}
              </Text>
              <Divider style={{ height: '100%', width: 1 }} />
              <TouchableOpacity onPress={openWebsite}>
                <Text variant="bodyMedium" style={styles.title} >
                  <Icon size={20} source="web" />  Website
                </Text>
              </TouchableOpacity>
              <Divider style={{ height: '100%', width: 1 }} />
              <Text variant="bodyMedium" style={styles.infoCardText}>
                <Icon size={20} source="map-marker" />
                {`${"  "}${candidateHomeScreenData[currentCandidateIndex]["Mode"]
                  }`}
              </Text>
            </View>
            <Divider style={{ marginVertical: 10 }} />
            <View style={{ flexDirection: 'row' }}>
              <Text variant="bodyMedium" style={styles.infoCardText}>
                <Icon size={20} source="office-building" />
                {`${"  "}${candidateHomeScreenData[currentCandidateIndex]["City"]
                  }${", "}${candidateHomeScreenData[currentCandidateIndex]["Country"]
                  }`}
              </Text>
            </View>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.infoCardText}>{candidateHomeScreenData[currentCandidateIndex]["Job Title"]}</Text>
            <Divider style={{ marginVertical: 10 }} />
            <Text variant="bodyMedium" style={styles.infoCardText}>{candidateHomeScreenData[currentCandidateIndex]["Job Description"]}</Text>
          </Card.Content>
        </Card>

        <Card mode="elevated" style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.infoCardText}>Responsibilties & Skills</Text>
            <Divider style={{ marginVertical: 10 }} />
            <Text variant="bodyMedium" style={styles.infoCardText}>{candidateHomeScreenData[currentCandidateIndex]["Responsibilities"]}</Text>
            <Divider style={{ marginVertical: 10, borderColor: 'transparent' }} />
            <View style={styles.chipContainer}>
              {skills.map((value, index) => (
                <Chip compact={true} key={index} style={styles.chip} textStyle={{ color: 'white' }}>
                  {value}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>


        <View style={styles.bottomSpace}></View>
      </ScrollView>
      <FAB
        color="black"
        mode="elevated"
        style={styles.fabLike}
        icon="thumb-up"
        onPress={handleLike}
      />
      <FAB
        color="black"
        mode="elevated"
        style={styles.fabDislike}
        icon="close-thick"
        onPress={handleDislike}
      />
      {/* Navbar */}
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        style={styles.navbar}
        barStyle={{ backgroundColor: '#141414', height: 80 }}
        activeIndicatorStyle={{ backgroundColor: 'transparent' }}

        activeColor="white"

      />
      {/* Navbar */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "white",
  },
  logoCard: {
    height: cardWidth,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 10,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  segmentedCard: {
    backgroundColor: "white",
    width: "100%",
    marginVertical: 10,
  },
  title: {
    color: "black",
  },
  infoCard: {
    backgroundColor: "white",
    width: "100%",
    marginVertical: 10,
    paddingVertical: 20,
    fontFamily: "Helvetica",
  },
  infoCardText: {
    fontFamily: "Helvetica",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  leftAlignedItems1: {
    alignSelf: "flex-start",
    fontFamily: "Helvetica",
  },
  leftAlignedItems2: {
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontFamily: "Helvetica",
  },
  fabLike: {
    color: "white",
    position: "absolute",
    margin: 16,
    marginBottom: 110,
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
    marginBottom: 110,
    borderRadius: 30,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  chip: {
    margin: 2,
    paddingVertical: 0,
    backgroundColor: "#083767",
    color: "white",
  },
  bottomSpace: {
    height: 40,
  },
  navbar: {
    backgroundColor: " #141414",
    zIndex: 1000,
    position: "absolute",
    bottom: 0,
    width: "100%"
  },
});
