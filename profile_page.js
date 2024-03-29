import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Image, Alert, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './Styles/styles_page';

const ProfilePage = ({ setCurrentPage }) => {
  const [username, setUsername] = useState('');
  const [profilePicUri, setProfilePicUri] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaStatus = await MediaLibrary.requestPermissionsAsync();
      if (cameraStatus.status !== 'granted' || mediaStatus.status !== 'granted') {
        Alert.alert('Sorry, we need camera and media permissions to make this work!');
      }
      // Load saved username and profile picture
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
      const asset = await MediaLibrary.createAssetAsync(result.uri); // Save the photo to the library
      setProfilePicUri(asset.uri);
    }
  };

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
