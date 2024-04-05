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
const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;

const CandidateProfileScreen = () => {
    // const profileData = require("../assets/data.json");
    let profileData = {};
    const { userId } = useLogin()
    useEffect(() => {
        fetch('http://192.168.29.167:5000/getCandidateProfile/Mdfa765cb-a2b3-4757-9417-e00982945f53h')
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                
                // Handle the retrieved data here
                profileData = data
                // You can directly use the data here for rendering or other purposes
            })
            .catch(error => {
                // Handle errors here
                console.error('Error fetching data:', error);
            });
    }, []);
    let workExperience = [];
    // try {
    //     workExperience = JSON.parse(
    //         profileData.work_experience.replace(/NaN/g, "null")
    //     );
    // } catch (error) {
    //     console.error("Error parsing work experience:", error);
    // }
    let educationHistory = [];
    // try {
    //     educationHistory = JSON.parse(
    //         profileData.education_history.replace(/NaN/g, "null")
    //     );
    // } catch (error) {
    //     console.error("Error parsing education history:", error);
    // }
    const openWebsite = () => {
        const website =
            profileData["Company Website"];
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
            </ScrollView>
        </View >
    );
};

export default memo(CandidateProfileScreen);

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: "white",
    },
    backgroundContainer: {
        paddingTop: 40,
        backgroundColor: "#fff",
        color: "#fff",
    },
    container: {
        paddingHorizontal: 20,
        backgroundColor: "#fff",
    },
    // logoCard: {
    //     height: cardWidth,
    //     width: "100%",
    //     justifyContent: "center",
    //     backgroundColor: "white",
    //     marginVertical: 10,
    // },
    // logoImage: {
    //     width: "100%",
    //     height: "100%",
    // },
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
        height: 40,
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
