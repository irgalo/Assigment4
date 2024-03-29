import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import GamePage from './game_page';
import HighScorePage from './highScore_page';
import ProfilePage from './profile_page';
import { styles } from './Styles/styles_page';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  return (
    <View style={styles.container}>
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
