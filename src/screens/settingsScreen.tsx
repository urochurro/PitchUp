import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { List, Switch, Text, Divider } from 'react-native-paper';
import { Navigation } from '../types';
import Button from '../components/Button';
import { useLogin } from '../context/LoginProvider';

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
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

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
      <Button mode={'contained'} onPress={() => {setIsLoggedIn(false); setIsRecruiter(false);}}>Log out</Button>
    </View>
  );
};

export default memo(SettingsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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


