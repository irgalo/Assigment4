import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import GamePage from './game_page';
import HighScorePage from './highScore_page';
import { database } from './database';
import { styles } from './Styles/styles_page';

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  useEffect(() => {
    // Initializes the database when the app starts
    database.init();
  }, []);

  return (
    <View style={styles.container}>
      {currentPage === 'Home' && (
        <View style={styles.homeContainer}>
          <Text style={styles.homeTitle}>Welcome to the Memory Game</Text>
          <View style={styles.homepageButtonContainer}>
            <Pressable
              style={styles.homepageButton}
              onPress={() => setCurrentPage('Game')}
            >
              <Text style={styles.homepageButtonText}>Play Game</Text>
            </Pressable>
            <Pressable
              style={styles.homepageButton}
              onPress={() => setCurrentPage('HighScores')}
            >
              <Text style={styles.homepageButtonText}>High Scores</Text>
            </Pressable>
          </View>
        </View>
      )}
      {currentPage === 'Game' && (
        <GamePage setCurrentPage={setCurrentPage} />
      )}
      {currentPage === 'HighScores' && (
        <HighScorePage setCurrentPage={setCurrentPage} />
      )}
    </View>
  );
};

export default App;
