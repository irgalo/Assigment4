/**
 * Author: Irah Loreto
 * Purpose - Allows users to create and edit their profile, including setting a username and choosing a profile picture.
 * Errors - Unfortunately, this page did not work well with the database in displaying the username and profile name on other pages. I had to omit that feature.
 * profile_page.js
 */

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Styles/styles_page'; // Importing styles

// ProfilePage components
const ProfilePage = ({ setCurrentPage }) => {
  // State variables
  const [username, setUsername] = useState(''); // Username input field
  const [profilePicUri, setProfilePicUri] = useState(null); // Profile picture URI

  // Effect hook to request camera and media permissions and load saved username and profile picture
  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      if (cameraStatus.status !== 'granted' || mediaStatus.status !== 'granted') {
        Alert.alert('Sorry, we need camera and media permissions to make this work!');
      }
      // Loads saved username and profile picture from AsyncStorage
      const savedUsername = await AsyncStorage.getItem('username');
      const savedProfilePicUri = await AsyncStorage.getItem('profilePicUri');
      if (savedUsername) setUsername(savedUsername);
      if (savedProfilePicUri) setProfilePicUri(savedProfilePicUri);
    })();
  }, []);

  // Function to take a picture using the device's camera
  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      const asset = await MediaLibrary.createAssetAsync(result.uri); // Saves the photo to the Phone Library / allows acces to upload from Phone Library
      setProfilePicUri(asset.uri);
    }
  };

  // Function to save profile information to AsyncStorage - This is not working idk why
  const saveProfile = async () => {
    await AsyncStorage.setItem('username', username);
    await AsyncStorage.setItem('profilePicUri', profilePicUri);
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
