/**
 * Author: Irah Loreto
 * Purpose - Displays the high scores from all players. It showcases rankings, allowing users to see their performance.
 * Errors - Unfortunately, there is an error displaying the username. I have no clue how to fix that. But the other scores should display.
 * highScore_page.js
 */

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { database } from './database'; // Importing database functions
import { styles } from './Styles/styles_page'; // Importing styles

// HighScorePage component
const HighScorePage = ({ setCurrentPage }) => {
  const [highScores, setHighScores] = useState([]); // State variable to store high scores

  // Effect hook to fetch high scores from the database
  useEffect(() => {
    database.fetchScores()
      .then(scores => {
        console.log("Fetched scores:", scores);
        setHighScores(scores);
      })
      .catch(error => console.error("Failed to fetch scores:", error));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.HighScorecontainer}>
      <Text style={styles.scoreText}>High Scores</Text>
      {highScores.map((score, index) => (
        <Text key={index} style={styles.highScoreEntry}>
          {score.username}: Score: {score.score}, Time: {score.time}s, Attempts: {score.attempts}
        </Text>
      ))}
      <Pressable onPress={() => setCurrentPage('Home')} style={styles.ScoreHomeBackButton}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </Pressable>
    </ScrollView>
  );
};

export default HighScorePage;
