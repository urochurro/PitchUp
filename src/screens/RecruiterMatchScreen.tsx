import React, { memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, IconButton, Button, Text, Appbar } from "react-native-paper";
import { Navigation } from "../types";
import Background from "../components/Background";
import Header from "../components/Header";
import { fetchJobData } from "../core/utils";

type Props = {
  navigation: Navigation;
};

const MatchScreen = ({ navigation }: Props) => {
  const candidateMatches = [
    { "id": 1, "candidateName": "Vivek Patel", "jobRole": "Network Engineer" },
    { "id": 2, "candidateName": "Priya Sharma", "jobRole": "Network Engineer" },
    { "id": 3, "candidateName": "Rahul Desai", "jobRole": "Network Engineer" },
    { "id": 4, "candidateName": "Neha Gupta", "jobRole": "Network Engineer" },
    { "id": 5, "candidateName": "Ajay Singh", "jobRole": "Network Engineer" },
    { "id": 6, "candidateName": "Sneha Joshi", "jobRole": "Network Engineer" },
    { "id": 7, "candidateName": "Anita Kumar", "jobRole": "Network Engineer" }
  ];

  const handleViewProfile = () => {
    console.log("View profile pressed");
  };
  const handleContact = () => {
    console.log("Contact pressed");
  };

  return (
    <View style={styles.backgroundContainer}>
      <Header color='#000'>Matches</Header>
      <ScrollView contentContainerStyle={styles.container}>
        {candidateMatches.map((value, index) => (
          <View key={index}>
            <Card mode="elevated" style={styles.card}>
              <Card.Content>
                <Text style={{ fontWeight: "800" }} variant="titleMedium">{value.candidateName}</Text>
                <Text variant="bodyMedium">{value.jobRole}</Text>
                <View style={styles.buttonContainer}>
                  <Button
                    style={styles.button}
                    icon="account-details"
                    mode="outlined"
                    textColor="#083767"
                    onPress={handleViewProfile}
                  >
                    View Profile
                  </Button>
                  <Button
                    mode="contained"
                    icon="email"
                    onPress={handleContact}
                    textColor="#fff"
                  >
                    Contact
                  </Button>
                </View>
              </Card.Content>
            </Card>
          </View>
        ))}
        <View style={styles.bottomSpace}></View>
      </ScrollView>
    </View>
  );
};

export default memo(MatchScreen);

const styles = StyleSheet.create({
  backgroundContainer: {
    paddingTop: 40,
    backgroundColor: "#fff",
    color: "#fff",
  },
  container: {
    paddingHorizontal: 40,
    backgroundColor: "#fff",
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#fff",
    padding: 10,
    elevation: 5,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  button: {
    marginRight: 5,
  },
  bottomSpace: {
    height: 150,
  },
});
