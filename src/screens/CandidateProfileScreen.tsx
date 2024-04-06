import React, { memo, useState, useEffect } from "react";
import {
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    Linking,
    View,
} from "react-native";
import {
    Card,
    Text,
    Icon,
    Chip,
    Divider,
    Appbar,
} from "react-native-paper";
import Header from '../components/Header';
import { useLogin } from "../context/LoginProvider";
import axios from "axios";
import { fetchCandidateProfile } from "../core/utils";
const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;


const CandidateProfileScreen = () => {
    const { userId } = useLogin();
    // const userId = "e70c98c7-5cc8-4caf-a334-d3b20a47b73e"
    // const profileData = require("../assets/data.json");
    const [profileData, setProfileData] = useState([]);
    useEffect(() => {
        fetchCandidateProfile(userId).then((responseData: any) => {
            setProfileData(responseData);
        });
    }, []);

    let workExperience = [];
    let educationHistory = [];
    try {
        workExperience = profileData["workExperience"] ? JSON.parse(profileData["workExperience"].replace(/NaN/g, "null")) : [];
        educationHistory = profileData["educationHistory"] ? JSON.parse(profileData["educationHistory"].replace(/NaN/g, "null")) : [];
    } catch (error) {
        console.error("Error parsing work experience or education history:", error);
    }

    // fetchCandidateProfile(userId)
    //     .then((responseData: any) => {
    //         setProfileData(responseData);
    //     })
    //     .catch((error: any) => {
    //         console.error("Error:", error);
    //     });

    const openWebsite = () => {
        const website =
            profileData["website"];
        Linking.openURL(website).catch((error) =>
            console.error(
                profileData["Company Website"],
                "Error opening website:",
                error
            )
        );
    };

    return (
        <View style={styles.backgroundContainer}>
            <Header color='#000'>My Profile</Header>
            <ScrollView contentContainerStyle={styles.container}>
                <Card mode="elevated" style={styles.card}>
                    <Card.Content>
                        <Text variant="titleLarge" style={styles.infoCardText}>{`${profileData["firstName"]} ${profileData["lastName"]}`}</Text>
                        <Text variant="bodyLarge" style={styles.infoCardText}>{profileData["headline"]}</Text>
                        <Divider style={{ marginVertical: 10 }} />
                        <Text variant="bodyMedium" style={styles.infoCardText}>{profileData["about"]}</Text>
                        <Divider style={{ marginVertical: 10 }} />
                        <View style={styles.skillsContainer}>
                            {profileData["skills"] && profileData["skills"].slice(0, 5).map((skill, index) => (
                                <Chip key={index} style={styles.skillChip} textStyle={{ color: 'white' }}>{skill}</Chip>
                            ))}

                        </View>
                        {/* Render other profile details as needed */}
                    </Card.Content>
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
                                {`${"  "}${profileData["jobType"]
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
                                {`${"  "}${profileData["workMode"]
                                    }`}
                            </Text>
                        </View>
                        <Divider style={styles.horizontalDivider} />
                        <View style={{ flexDirection: "row" }}>
                            <Text variant="bodyMedium" style={styles.infoCardText}>
                                <Icon size={20} source="office-building" />
                                {`${"  "}${profileData["city"]
                                    }${", "}${profileData["country"]
                                    }`}
                            </Text>
                        </View>
                    </Card.Content>
                </Card>
                {workExperience && workExperience.length > 0 && (
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
                )}

                {educationHistory && educationHistory.length > 0 && (
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
                )}
                <View style={styles.bottomSpace} />
            </ScrollView>
        </View >
    );
};

export default memo(CandidateProfileScreen);

const styles = StyleSheet.create({
    backgroundContainer: {
        paddingTop: 40,
        backgroundColor: "#fff",
        color: "#fff",
    },
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
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
    // leftAlignedItems1: {
    //     alignSelf: "flex-start",
    //     fontFamily: "Helvetica",
    // },
    // leftAlignedItems2: {
    //     alignSelf: "flex-start",
    //     fontWeight: "bold",
    //     fontFamily: "Helvetica",
    // },
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
        height: 70,
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
    separator: {
        height: 1,
        backgroundColor: "#ccc",
        marginVertical: 10,
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
});
