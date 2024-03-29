// Example modification for HighScorePage to include username and picture
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { database } from './database';
import { styles } from './Styles/styles_page';

const HighScorePage = ({ setCurrentPage }) => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    database.fetchScores(setHighScores);
  }, []);

  return (
    <View style={styles.HighScorecontainer}>
      <Text style={styles.scoreText}>High Scores</Text>
      {highScores.map((score, index) => (
        <View key={index} style={{ alignItems: 'center' }}>
          <Text>Username: {score.username}</Text>
          <Text>Score: {score.score}, Time: {score.time}, Attempts: {score.attempts}</Text>
        </View>
      ))}
      <Pressable onPress={() => setCurrentPage('Home')} style={styles.ScoreHomeBackButton}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
};

export default HighScorePage;
