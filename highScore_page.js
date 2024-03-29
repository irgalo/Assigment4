
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { database } from './database'; // Make sure this path is correct
import { styles } from './Styles/styles_page';

const HighScorePage = ({ setCurrentPage }) => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    database.fetchScores(setHighScores);
  }, []);

  return (
    <View style={styles.HighScorecontainer}>
    <View style={styles.scoreText}>
      <Text>High Scores</Text>
      {highScores.map((score, index) => (
        <Text key={index}>
          Score: {score.score}, Time: {score.time}, Attempts: {score.attempts}
        </Text>
      
      ))}
     <Pressable onPress={() => setCurrentPage('Home')} style={styles.ScoreHomeBackButton}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </Pressable>
    </View>
    </View>
  );
};

export default HighScorePage;
