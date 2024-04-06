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
    "Company Name": "Digital Solutions India",
    "Company Size": 200,
    "Company Website": "https://www.digitalsolutions.in/",
    City: "Mumbai",
    Country: "India",
    "Job Role": "Digital Marketing Specialist",
    "Job Title": "SEO Analyst",
    "Job Description":
      "SEO Analysts are responsible for optimizing website content and structure to improve organic search visibility and rankings. They conduct keyword research, analyze website performance metrics, and implement SEO strategies to increase traffic, engagement, and conversions.",
    "Lower Salary Range": 500000,
    "Upper Salary Range": 800000,
    Experience: "1-3 years",
    "Highest Qualification": "Bachelor's Degree",
    "Work Type": "Full-time",
    Skills:
      "SEO, keyword research, on-page optimization, off-page optimization, Google Analytics, SEMrush, Moz, content strategy",
    Responsibilities:
      "Conduct keyword research and analysis. Optimize website content and meta tags. Monitor search engine rankings and performance metrics. Develop and implement link building strategies.",
    Mode: "Remote",
  },
  {
    "User Id": 2,
    "Company Name": "Social Media Experts India",
    "Company Size": 150,
    "Company Website": "https://www.socialmediaexperts.in/",
    City: "Bangalore",
    Country: "India",
    "Job Role": "Digital Marketing Manager",
    "Job Title": "Social Media Strategist",
    "Job Description":
      "Social Media Strategists are responsible for developing and executing social media marketing strategies to increase brand awareness, engagement, and conversions. They analyze social media trends, create compelling content, and manage social media platforms to drive business objectives.",
    "Lower Salary Range": 600000,
    "Upper Salary Range": 1000000,
    Experience: "3-5 years",
    "Highest Qualification": "Bachelor's Degree",
    "Work Type": "Full-time",
    Skills:
      "Social media marketing, content creation, community management, social media analytics, paid social advertising, influencer marketing",
    Responsibilities:
      "Develop social media marketing strategies. Create and curate engaging content for social media platforms. Monitor social media channels and engage with followers. Analyze performance metrics and optimize campaigns.",
    Mode: "On-site",
  },
  {
    "User Id": 3,
    "Company Name": "Email Marketing India",
    "Company Size": 100,
    "Company Website": "https://www.emailmarketingindia.com/",
    City: "New Delhi",
    Country: "India",
    "Job Role": "Digital Marketing Specialist",
    "Job Title": "Email Marketing Manager",
    "Job Description":
      "Email Marketing Managers are responsible for developing and implementing email marketing campaigns to drive customer acquisition, retention, and engagement. They segment email lists, create personalized content, and analyze campaign performance to optimize results.",
    "Lower Salary Range": 450000,
    "Upper Salary Range": 750000,
    Experience: "2-4 years",
    "Highest Qualification": "Bachelor's Degree",
    "Work Type": "Full-time",
    Skills:
      "Email marketing, marketing automation, segmentation, A/B testing, HTML/CSS, email deliverability, CRM integration",
    Responsibilities:
      "Develop email marketing campaigns and workflows. Segment email lists and personalize content. Monitor email deliverability and engagement metrics. Analyze campaign performance and make data-driven decisions.",
    Mode: "Remote",
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
                uri: "https://img.freepik.com/premium-vector/swan-color-gradient-logo-design_93835-1644.jpg",
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
                  {`${"  "}${candidateHomeScreenData[currentCandidateIndex]["Work Type"]
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
                  {`${"  "}${candidateHomeScreenData[currentCandidateIndex]["Mode"]
                    }`}
                </Text>
              </View>
              <Divider style={styles.horizontalDivider} />
              <View style={{ flexDirection: "row" }}>
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
