import React, { memo, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
  View,
  Animated,
} from "react-native";
import {
  FAB,
  Card,
  Text,
  Icon,
  Chip,
  Divider,
  Appbar,
} from "react-native-paper";

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;
const candidateHomeScreenData = [
  {
    "User Id": 1,
    "Company Name": "Kolkata Knight Riders",
    "Company Size": 48199,
    "Company Website": "https://www.kkr.in/",
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
    "Company Name": "Mumbai Indians",
    "Company Size": 55000,
    "Company Website": "www.yahoo.com",
    City: "Mumbai",
    Country: "India",
    "Job Role": "Marketing Manager",
    "Job Title": "Digital Marketing Specialist",
    "Job Description":
      "Digital Marketing Specialists are responsible for developing, implementing, and managing marketing campaigns that promote a company's products and services. They play a major role in enhancing brand awareness within the digital space as well as driving website traffic and acquiring leads/customers.",
    "Lower Salary Range": 700000,
    "Upper Salary Range": 1100000,
    Experience: "2-5 years",
    "Highest Qualification": "Bachelor's Degree",
    "Work Type": "Full-time",
    Skills:
      "SEO, SEM, social media marketing, content marketing, email marketing, Google Analytics, PPC advertising, digital strategy",
    Responsibilities:
      "Develop and implement digital marketing campaigns across various channels. Analyze and report on the performance of campaigns. Optimize website content and user experience. Stay up-to-date with digital marketing trends and best practices.",
    Mode: "Remote",
  },
  {
    "User Id": 3,
    "Company Name": "Chennai Super Kings",
    "Company Size": 50000,
    "Company Website": "www.bing.com",
    City: "Chennai",
    Country: "India",
    "Job Role": "Software Engineer",
    "Job Title": "Full Stack Developer",
    "Job Description":
      "Full Stack Developers are responsible for designing, developing, and maintaining both the front-end and back-end of web applications. They work with various programming languages, frameworks, and databases to create scalable and responsive software solutions.",
    "Lower Salary Range": 800000,
    "Upper Salary Range": 1200000,
    Experience: "3-7 years",
    "Highest Qualification": "Master's Degree",
    "Work Type": "Permanent",
    Skills:
      "JavaScript, HTML/CSS, Node.js, React, Angular, Python, SQL, MongoDB, RESTful APIs",
    Responsibilities:
      "Develop and maintain web applications. Collaborate with cross-functional teams to define, design, and ship new features. Write clean, reusable, and efficient code. Troubleshoot and debug applications.",
    Mode: "On-site",
  },
];

const CandidateHomeScreen = () => {
  const openWebsite = () => {
    const website =
      candidateHomeScreenData[currentCandidateIndex]["Company Website"];
    Linking.openURL(website).catch((error) =>
      console.error(
        candidateHomeScreenData[currentCandidateIndex]["Company Website"],
        "Error opening website:",
        error
      )
    );
  };
  const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

  const skills =
    candidateHomeScreenData[currentCandidateIndex]["Skills"].split(", ");

  const [likeIsVisible, setLikeIsVisible] = useState(false);
  const [dislikeIsVisible, setDislikeIsVisible] = useState(false);

  const [animation] = useState(new Animated.Value(1));

  const flashStyle = {
    opacity: animation.interpolate({
      inputRange: [0, 0.5, 1],
      outputRange: [0, 0, 1],
    }),
  };

  const handleLike = () => {
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

    setCurrentCandidateIndex(
      (prevIndex) => (prevIndex + 1) % candidateHomeScreenData.length
    );
    console.log("Liked", currentCandidateIndex);
  };

  const handleDislike = () => {
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

    setCurrentCandidateIndex(
      (prevIndex) => (prevIndex + 1) % candidateHomeScreenData.length
    );
    console.log("Disliked", currentCandidateIndex);
  };

  return (
    <View style={styles.backgroundContainer}>
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
      <Animated.View style={[flashStyle]}>
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
          </Card>

          <Card mode="elevated" style={styles.segmentedCard}>
            <Card.Content>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text variant="bodyMedium" style={styles.title}>
                  <Icon size={20} source="clock" />
                  {`${"  "}${
                    candidateHomeScreenData[currentCandidateIndex]["Work Type"]
                  }`}
                </Text>
                <Divider style={styles.verticalDivider} />
                <TouchableOpacity onPress={openWebsite}>
                  <Text variant="bodyMedium" style={styles.title}>
                    <Icon size={20} source="web" /> Website
                  </Text>
                </TouchableOpacity>
                <Divider style={styles.verticalDivider} />
                <Text variant="bodyMedium" style={styles.infoCardText}>
                  <Icon size={20} source="map-marker" />
                  {`${"  "}${
                    candidateHomeScreenData[currentCandidateIndex]["Mode"]
                  }`}
                </Text>
              </View>
              <Divider style={styles.horizontalDivider} />
              <View style={{ flexDirection: "row" }}>
                <Text variant="bodyMedium" style={styles.infoCardText}>
                  <Icon size={20} source="office-building" />
                  {`${"  "}${
                    candidateHomeScreenData[currentCandidateIndex]["City"]
                  }${", "}${
                    candidateHomeScreenData[currentCandidateIndex]["Country"]
                  }`}
                </Text>
              </View>
            </Card.Content>
          </Card>

          <Card mode="elevated" style={styles.infoCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.infoCardText}>
                {candidateHomeScreenData[currentCandidateIndex]["Job Title"]}
              </Text>
              <Divider style={styles.horizontalDivider} />
              <Text variant="bodyMedium" style={styles.infoCardText}>
                {
                  candidateHomeScreenData[currentCandidateIndex][
                    "Job Description"
                  ]
                }
              </Text>
            </Card.Content>
          </Card>

          <Card mode="elevated" style={styles.infoCard}>
            <Card.Content>
              <Text variant="titleLarge" style={styles.infoCardText}>
                Responsibilties & Skills
              </Text>
              <Divider style={styles.horizontalDivider} />
              <Text variant="bodyMedium" style={styles.infoCardText}>
                {
                  candidateHomeScreenData[currentCandidateIndex][
                    "Responsibilities"
                  ]
                }
              </Text>
              <Divider style={styles.horizontalDivider} />
              <View style={styles.chipContainer}>
                {skills.map((value, index) => (
                  <Chip
                    compact={true}
                    key={index}
                    style={styles.chip}
                    textStyle={{ color: "white" }}
                  >
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
      </Animated.View>
    </View>
  );
};

export default memo(CandidateHomeScreen);

const styles = StyleSheet.create({
  flashIconContainer: {
    alignItems: "center",
    paddingVertical: "100%",
    backgroundColor: "#fff",
  },
  header: {
    height: 50,
    backgroundColor: "white",
  },
  backgroundContainer: {
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    paddingTop: 50,
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
  horizontalDivider: {
    marginVertical: 10,
  },
  verticalDivider: {
    height: "100%",
    width: 1,
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
    position: "absolute",
    margin: 16,
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
    borderRadius: 30,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  chip: {
    margin: 2,
    backgroundColor: "#083767",
  },
  bottomSpace: {
    height: 40,
  },
});
