// import React, { memo, useState } from "react";
// import {
//   StyleSheet,
//   Dimensions,
//   ScrollView,
//   TouchableOpacity,
//   Linking,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { FAB, Card, Text, Icon, Chip } from "react-native-paper";
// import { Navigation } from "../types";

// type Props = {
//   navigation: Navigation;
// };

// const { width } = Dimensions.get("window");
// const cardWidth = width * 0.8;
// const candidateHomeScreenData = [
//   {
//     "User Id": 1,
//     "Company Name": "KKR",
//     "Company Size": 48199,
//     "Company Website": "www.google.com",
//     City: "Mumbai",
//     Country: "India",
//     "Job Role": "HR Generalist",
//     "Job Title": "HR Coordinator",
//     "Job Description":
//       "HR Coordinators assist in HR functions such as recruitment, onboarding, and employee record maintenance. They often handle administrative tasks, organize training programs, and provide support to the HR department in various ways.",
//     "Lower Salary Range": 650000,
//     "Upper Salary Range": 920000,
//     Experience: "",
//     "Highest Qualification": "PhD",
//     "Work Type": "Temporary",
//     Skills:
//       "Recruitment, onboarding, employee relations, HRIS, performance management, organizational development, conflict resolution, labor law",
//     Responsibilities:
//       "Assist with recruitment activities, including posting job openings, coordinating interviews, and managing applicant data. Ensure a positive candidate experience. Maintain recruitment records and metrics.",
//     Mode: "On-site",
//   },
//   {
//     "User Id": 2,
//     "Company Name": "dddddd",
//     "Company Size": 48199,
//     "Company Website": "www.google.com",
//     City: "fffff",
//     Country: "India",
//     "Job Role": "HR Generalist",
//     "Job Title": "HR Coordinator",
//     "Job Description":
//       "HR Coordinators assist in HR functions such as recruitment, onboarding, and employee record maintenance. They often handle administrative tasks, organize training programs, and provide support to the HR department in various ways.",
//     "Lower Salary Range": 650000,
//     "Upper Salary Range": 920000,
//     Experience: "",
//     "Highest Qualification": "PhD",
//     "Work Type": "Temporary",
//     Skills: "Recruitment, conflict resolution, labor law",
//     Responsibilities:
//       "Assist with recruitment activities, including posting job openings, coordinating interviews, and managing applicant data. Ensure a positive candidate experience. Maintain recruitment records and metrics.",
//     Mode: "On-site",
//   },
//   {
//     "User Id": 3,
//     "Company Name": "heebie",
//     "Company Size": 48199,
//     "Company Website": "www.google.com",
//     City: "fffff",
//     Country: "India",
//     "Job Role": "HR Generalist",
//     "Job Title": "HR Coordinator",
//     "Job Description":
//       "HR Coordinators assist in HR functions such as recruitment, onboarding, and employee record maintenance. They often handle administrative tasks, organize training programs, and provide support to the HR department in various ways.",
//     "Lower Salary Range": 650000,
//     "Upper Salary Range": 920000,
//     Experience: "",
//     "Highest Qualification": "PhD",
//     "Work Type": "Temporary",
//     Skills:
//       "Recruitment, onboarding, employee relations, HRIS, performance management, organizational development, conflict resolution, labor law",
//     Responsibilities:
//       "Assist with recruitment activities, including posting job openings, coordinating interviews, and managing applicant data. Ensure a positive candidate experience. Maintain recruitment records and metrics.",
//     Mode: "On-site",
//   },
// ];

// const CandidateHomeScreen = ({ navigation }: Props) => {
//   const [currentCandidateIndex, setCurrentCandidateIndex] = useState(0);

//   const openWebsite = () => {
//     Linking.openURL(
//       candidateHomeScreenData[currentCandidateIndex]["Company Website"]
//     );
//   };

//   const InfoCardComponent = ({ title, content }) => {
//     return (
//       <Card mode="elevated" style={styles.infoCard}>
//         <Card.Content>
//           <Text variant="titleLarge">{title}</Text>
//           <Text variant="bodyMedium">{content}</Text>
//         </Card.Content>
//       </Card>
//     );
//   };

//   const skills =
//     candidateHomeScreenData[currentCandidateIndex]["Skills"].split(", ");

//   const handleLike = () => {
//     setCurrentCandidateIndex(
//       (prevIndex) => (prevIndex + 1) % candidateHomeScreenData.length
//     );
//     console.log("Liked", currentCandidateIndex);
//   };

//   const handleDislike = () => {
//     setCurrentCandidateIndex(
//       (prevIndex) => (prevIndex + 1) % candidateHomeScreenData.length
//     );
//     console.log("Disliked", currentCandidateIndex);
//   };

//   return (
//     <SafeAreaView>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Card mode="elevated" style={styles.logoCard}>
//           <Card.Cover
//             style={styles.logoImage}
//             resizeMode="contain"
//             source={{
//               uri: "https://picsum.photos/700",
//             }}
//           />
//           <Card.Content style={styles.logoCardTitle}>
//             <Text variant="titleLarge" style={styles.title}>
//               {candidateHomeScreenData[currentCandidateIndex]["Company Name"]}
//             </Text>
//             <Text variant="bodyMedium" style={styles.title}>
//               {candidateHomeScreenData[currentCandidateIndex]["Job Role"]}
//             </Text>
//             <TouchableOpacity onPress={openWebsite}>
//               <Text variant="bodyMedium" style={styles.title}>
//                 <Icon size={20} source="web" />
//                 {`${""} ${
//                   candidateHomeScreenData[currentCandidateIndex][
//                     "Company Website"
//                   ]
//                 }`}
//               </Text>
//             </TouchableOpacity>
//           </Card.Content>
//         </Card>

//         <Card mode="elevated" style={styles.infoCard}>
//           <Card.Content>
//             <Text variant="titleLarge">Job Location</Text>
//             <Text variant="bodyMedium">
//               <Icon size={20} source="office-building" />
//               {`${" "}${
//                 candidateHomeScreenData[currentCandidateIndex]["City"]
//               }${", "}${
//                 candidateHomeScreenData[currentCandidateIndex]["Country"]
//               }`}
//             </Text>
//             <Text variant="bodyMedium">
//               <Icon size={20} source="map-marker" />
//               {`${" "}${
//                 candidateHomeScreenData[currentCandidateIndex]["Mode"]
//               }`}
//             </Text>
//           </Card.Content>
//         </Card>

//         <InfoCardComponent
//           title="Job Title"
//           content={candidateHomeScreenData[currentCandidateIndex]["Job Title"]}
//         />
//         <InfoCardComponent
//           title="Job Type"
//           content={candidateHomeScreenData[currentCandidateIndex]["Work Type"]}
//         />
//         <InfoCardComponent
//           title="Job Description"
//           content={
//             candidateHomeScreenData[currentCandidateIndex]["Job Description"]
//           }
//         />
//         <InfoCardComponent
//           title="Responsibilities"
//           content={
//             candidateHomeScreenData[currentCandidateIndex]["Responsibilities"]
//           }
//         />

//         <Card mode="elevated" style={styles.infoCard}>
//           <Card.Content>
//             <Text variant="titleLarge">Skills Required</Text>
//             <View style={styles.chipContainer}>
//               {skills.map((value, index) => (
//                 <Chip compact={true} key={index} style={styles.chip}>
//                   {value}
//                 </Chip>
//               ))}
//             </View>
//           </Card.Content>
//         </Card>

//         <InfoCardComponent
//           title="Qualification Required"
//           content={
//             candidateHomeScreenData[currentCandidateIndex][
//               "Highest Qualification"
//             ]
//           }
//         />
//         <View style={styles.bottomSpace}></View>
//       </ScrollView>
//       <FAB
//         color="black"
//         mode="elevated"
//         style={styles.fabLike}
//         icon="thumb-up"
//         onPress={handleLike}
//       />
//       <FAB
//         color="black"
//         mode="elevated"
//         style={styles.fabDislike}
//         icon="thumb-down"
//         onPress={handleDislike}
//       />
//     </SafeAreaView>
//   );
// }

// export default memo(CandidateHomeScreen);

// const styles = StyleSheet.create({
//   container: {
//     // flexGrow : 1,
//     alignItems: "center",
//     paddingHorizontal: 40,
//     backgroundColor: "black",
//   },
//   logoCard: {
//     height: cardWidth,
//     width: cardWidth,
//     justifyContent: "center",
//     backgroundColor: "white",
//     marginVertical: 10,
//   },
//   logoImage: {
//     width: "100%",
//     height: "100%",
//   },
//   logoCardTitle: {
//     position: "absolute",
//     bottom: 0,
//     left: 0,
//     right: 0,
//     backgroundColor: "white",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderBottomStartRadius: 10,
//     borderBottomEndRadius: 10,
//   },
//   title: {
//     color: "black",
//   },
//   infoCard: {
//     backgroundColor: "white",
//     width: cardWidth,
//     marginVertical: 10,
//   },
//   text: {
//     textAlign: "center",
//     fontSize: 50,
//     backgroundColor: "transparent",
//   },
//   leftAlignedItems: {
//     alignSelf: "flex-start",
//   },
//   fabLike: {
//     color: "white",
//     position: "absolute",
//     margin: 16,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "white",
//     borderRadius: 30,
//   },
//   fabDislike: {
//     position: "absolute",
//     margin: 16,
//     left: 0,
//     bottom: 0,
//     backgroundColor: "white",
//     borderRadius: 30,
//   },
//   chipContainer: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     alignItems: "center",
//   },
//   chip: {
//     margin: 2,
//     paddingVertical: 0,
//   },
//   bottomSpace: {
//     height: 40,
//   },
// });

import React, { memo, useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Linking,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB, Card, Text, Icon, Chip } from "react-native-paper";
import { Navigation } from "../types";

type Props = {
  navigation: Navigation;
};

const { width } = Dimensions.get("window");
const cardWidth = width * 0.8;
const candidateHomeScreenData = [
  {
    "User Id": 1,
    "Company Name": "KKR",
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

const CandidateHomeScreen = ({ navigation }: Props) => {
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
          <Text variant="titleLarge">{title}</Text>
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
        <Card mode="elevated" style={styles.logoCard}>
          <Card.Cover
            style={styles.logoImage}
            resizeMode="contain"
            source={{
              uri: "https://picsum.photos/700",
            }}
          />
          <Card.Content style={styles.logoCardTitle}>
            <Text variant="titleLarge" style={styles.title}>
              {candidateHomeScreenData[currentCandidateIndex]["Company Name"]}
            </Text>
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
          </Card.Content>
        </Card>

        <Card mode="elevated" style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleLarge">Job Location</Text>
            <Text variant="bodyMedium">
              <Icon size={20} source="office-building" />
              {`${" "}${candidateHomeScreenData[currentCandidateIndex]["City"]
                }${", "}${candidateHomeScreenData[currentCandidateIndex]["Country"]
                }`}
            </Text>
            <Text variant="bodyMedium">
              <Icon size={20} source="map-marker" />
              {`${" "}${candidateHomeScreenData[currentCandidateIndex]["Mode"]
                }`}
            </Text>
          </Card.Content>
        </Card>

        <InfoCardComponent
          title="Job Title"
          content={candidateHomeScreenData[currentCandidateIndex]["Job Title"]}
        />
        <InfoCardComponent
          title="Job Type"
          content={candidateHomeScreenData[currentCandidateIndex]["Work Type"]}
        />
        <InfoCardComponent
          title="Job Description"
          content={
            candidateHomeScreenData[currentCandidateIndex]["Job Description"]
          }
        />
        <InfoCardComponent
          title="Responsibilities"
          content={
            candidateHomeScreenData[currentCandidateIndex]["Responsibilities"]
          }
        />

        <Card mode="elevated" style={styles.infoCard}>
          <Card.Content>
            <Text variant="titleLarge">Skills Required</Text>
            <View style={styles.chipContainer}>
              {skills.map((value, index) => (
                <Chip compact={true} key={index} style={styles.chip}>
                  {value}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        <InfoCardComponent
          title="Qualification Required"
          content={
            candidateHomeScreenData[currentCandidateIndex][
            "Highest Qualification"
            ]
          }
        />
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
        icon="thumb-down"
        onPress={handleDislike}
      />
    </SafeAreaView>
  );
}

export default memo(CandidateHomeScreen);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: 40,
    backgroundColor: "black",
  },
  logoCard: {
    height: cardWidth,
    width: cardWidth,
    justifyContent: "center",
    backgroundColor: "white",
    marginVertical: 10,
  },
  logoImage: {
    width: "100%",
    height: "100%",
  },
  logoCardTitle: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomStartRadius: 10,
    borderBottomEndRadius: 10,
  },
  title: {
    color: "black",
  },
  infoCard: {
    backgroundColor: "white",
    width: cardWidth,
    marginVertical: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
  leftAlignedItems: {
    alignSelf: "flex-start",
  },
  fabLike: {
    color: "white",
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
    paddingVertical: 0,
  },
  bottomSpace: {
    height: 40,
  },
});
