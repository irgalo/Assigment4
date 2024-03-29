import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { database } from './database'; // Adjust path as needed
import { styles } from './Styles/styles_page'; // Adjust path as needed

const HighScorePage = ({ setCurrentPage }) => {
  const [highScores, setHighScores] = useState([]);

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
