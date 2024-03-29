import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MediaLibrary from 'expo-media-library'; // Import MediaLibrary from Expo
import { styles } from './Styles/styles_page'; // Ensure you have the appropriate path

const ProfilePage = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [profilePicUri, setProfilePicUri] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sorry, we need camera permissions to make this work!');
      }
      // Load saved profile data
      const savedUsername = await AsyncStorage.getItem('username');
      const savedProfilePicUri = await AsyncStorage.getItem('profilePicUri');
      if (savedUsername) setUsername(savedUsername);
      if (savedProfilePicUri) setProfilePicUri(savedProfilePicUri);
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

  const saveProfile = async () => {
    // Save the image to the device's gallery
    await MediaLibrary.saveToLibraryAsync(profilePicUri);
    Alert.alert('Image saved to gallery!');
    
    // Save profilePicUri to AsyncStorage
    await AsyncStorage.setItem('profilePicUri', profilePicUri);
    Alert.alert('Profile Picture Saved', 'Your profile picture has been updated successfully.');
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
