import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import GamePage from './game_page';
import HighScorePage from './highScore_page';
import ProfilePage from './profile_page';
import { database } from './database';
import { styles } from './Styles/styles_page';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');
  
  const [username, setUsername] = useState('User123');
  const [profilePicUri, setProfilePicUri] = useState('https://example.com/profile-pic.jpg');

  useEffect(() => {
    database.init();
  }, []);

  // Corrected renderHeader function
  const renderHeader = () => {
    if (currentPage === 'Game' || currentPage === 'Home') {
      return (
        <View style={styles.profileHeaderContainer}>
          <Text style={styles.profileHeaderText}>{username}</Text>
          <Image source={{ uri: profilePicUri }} style={styles.profileHeaderImage} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {currentPage === 'Home' && (
        <View style={styles.homeContainer}>
          <Text style={styles.homeTitle}>Welcome to the Memory Game</Text>
          <View style={styles.homepageButtonContainer}>
            <Pressable
              style={styles.playButton}
              onPress={() => setCurrentPage('Game')}>
              <Text style={styles.playButtonText}>Play Game</Text>
            </Pressable>
            <Pressable
              style={styles.playButton}
              onPress={() => setCurrentPage('HighScores')}>
              <Text style={styles.playButtonText}>High Scores</Text>
            </Pressable>
            <Pressable
              style={styles.playButton}
              onPress={() => setCurrentPage('Profile')}>
              <Text style={styles.playButtonText}>Profile</Text>
            </Pressable>
          </View>
        </View>
      )}
      {currentPage === 'Game' && <GamePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'HighScores' && <HighScorePage setCurrentPage={setCurrentPage} />}
      {currentPage === 'Profile' && <ProfilePage setCurrentPage={setCurrentPage} />}
    </View>
  );
};

export default App;
