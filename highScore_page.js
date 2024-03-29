import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { database } from './database'; // Make sure this path is correct
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
        <View key={index} style={styles.highScoreEntry}>
          {score.pictureUri ? (
            <Image source={{ uri: score.pictureUri }} style={styles.profilePic} />
          ) : (
            <View style={styles.placeholderPic}></View> // Placeholder in case of no picture
          )}
          <Text>
            {score.username}: Score: {score.score}, Time: {score.time}, Attempts: {score.attempts}
          </Text>
        </View>
      ))}
      <Pressable onPress={() => setCurrentPage('Home')} style={styles.ScoreHomeBackButton}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
};

export default HighScorePage;
