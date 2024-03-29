import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './Styles/styles_page'; // Ensure you have the appropriate path
import { database } from './database'; 

const ProfilePage = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [profilePicUri, setProfilePicUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProfilePicUri(result.uri);
    }
  };

  const saveProfile = () => {
    // Save username and profilePicUri to your database
    console.log('Saving Profile:', username, profilePicUri);
    // Add database logic here
    Alert.alert('Profile Saved', 'Your profile has been updated successfully.');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}
      />
      <Button title="Take Picture" onPress={takePicture} />
      {profilePicUri && <Image source={{ uri: profilePicUri }} style={styles.profilePic} />}
      <Button title="Save Profile" onPress={saveProfile} />

      <Pressable onPress={() => setCurrentPage('Home')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </Pressable>
    </View>

  );
};

export default ProfilePage;