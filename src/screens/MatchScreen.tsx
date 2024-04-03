import React, { memo } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Card, IconButton, Button, Text } from "react-native-paper";
import { Navigation } from "../types";
import Background from "../components/Background";
import Header from "../components/Header";

type Props = {
  navigation: Navigation;
};

const MatchScreen = ({ navigation }: Props) => {
  const candidateMatches = [
    { id: 1, companyName: "Company 1", jobRole: "Role 1" },
    { id: 2, companyName: "Company 2", jobRole: "Role 2" },
    { id: 3, companyName: "Company 3", jobRole: "Role 3" },
    { id: 4, companyName: "Company 4", jobRole: "Role 4" },
    { id: 5, companyName: "Company 5", jobRole: "Role 5" },
    { id: 6, companyName: "Company 6", jobRole: "Role 6" },
    { id: 7, companyName: "Company 7", jobRole: "Role 7" },
  ];
  const handleViewProfile = () => {
    console.log("View profile pressed");
  };
  const handleContact = () => {
    console.log("Contact pressed");
  };
  return (
    <View style={{ flex: 1, paddingTop:60}}>

    <ScrollView contentContainerStyle={styles.container}>
      {candidateMatches.map((value, index) => (
        <View key={index}>
          <Card mode="elevated" style={styles.card}>
            <Card.Content>
              <Text variant="titleLarge">{value.companyName}</Text>
              <Text variant="bodyMedium">{value.jobRole}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  style={styles.button}
                  icon="account-details"
                  mode="contained-tonal"
                  onPress={handleViewProfile}
                >
                  View Profile
                </Button>
                <Button
                  icon="email"
                  mode="contained-tonal"
                  onPress={handleContact}
                >
                  Contact
                </Button>
              </View>
            </Card.Content>
          </Card>
        </View>
      ))}
    </ScrollView>
    </View >
  );
}

export default memo(MatchScreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    backgroundColor: "#fff",
  },
  card: {
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end", // justifyContent: "space-between",
  },
  button: {
    marginRight: 5,
  },
});
