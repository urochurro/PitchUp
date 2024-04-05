import React, { memo } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { List, Switch, Text, Divider } from 'react-native-paper';
import { Navigation } from '../types';
import Button from '../components/Button';
import { useLogin } from '../context/LoginProvider';
import Header from '../components/Header';

type Props = {
  navigation: Navigation;
};
const SettingsScreen = ({ navigation }: Props) => {
  const { setIsLoggedIn, setIsRecruiter } = useLogin();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const toggleDarkMode = () => {
    setDarkModeEnabled((prev) => !prev);
  };

  return (
    <ScrollView style={styles.container}>
      <Header color='#000'>Settings</Header>
      <List.Section>
        <List.Subheader>Account</List.Subheader>
        <List.Item
          title="Account Preferences"
          left={() => <List.Icon icon="account" />}
        />
        <List.Item
          title="Sign In & Security"
          left={() => <List.Icon icon="lock" />}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Profile</List.Subheader>
        <List.Item
          title="Visibility"
          left={() => <List.Icon icon="eye" />}
        />
        <List.Item
          title="Data Privacy"
          left={() => <List.Icon icon="shield" />}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Notifications</List.Subheader>
        <List.Item
          title="Notifications"
          left={() => <List.Icon icon="bell" />}
          right={() => (
            <Switch
              value={notificationsEnabled}
              onValueChange={toggleNotifications}
            />
          )}
        />
      </List.Section>

      <Divider />

      <List.Section>
        <List.Subheader>Screen Mode</List.Subheader>
        <List.Item
          title="Dark Mode"
          left={() => <List.Icon icon="brightness-4" />}
          right={() => (
            <Switch
              value={darkModeEnabled}
              onValueChange={toggleDarkMode}
            />
          )}
        />
      </List.Section>

      <Divider />

      <View style={styles.bottomText}>
        <Text>Help Center</Text>
        <Text>Data Privacy Policy</Text>
      </View>
      <View style={{ height: 20 }} />
      <Button mode={'contained'} onPress={() => { setIsLoggedIn(false); setIsRecruiter(false); }}>Log out</Button>
      <View style={{ height: 70 }} />
    </ScrollView>
  );
};

export default memo(SettingsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 25,
    textAlign: 'center',
  },
  bottomText: {
    marginHorizontal: 16,
    marginTop: 16,
  },
});


