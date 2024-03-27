import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import GamePage from './game_page'; // Make sure the import path matches the location of your game_page.js file
import { styles } from './Styles/styles_page'; // Adjust the import path as necessary

const App = () => {
  const [currentPage, setCurrentPage] = useState('Home');

  return (
    <View style={styles.container}>
      {currentPage === 'Home' ? (
        <View style={styles.homeContainer}>
          <Text style={styles.homeTitle}>Welcome to the Memory Game</Text>
          <Pressable
            style={styles.playButton}
            onPress={() => setCurrentPage('GamePage')}
          >
            <Text style={styles.playButtonText}>Play</Text>
          </Pressable>
        </View>
      ) : (
        <GamePage setCurrentPage={setCurrentPage} />
      )}
    </View>
  );
};

export default App;
