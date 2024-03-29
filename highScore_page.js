// HighScorePage component
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { database } from './database'; // Make sure this path is correct

const HighScorePage = ({ setCurrentPage }) => {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    database.fetchScores(setHighScores);
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>High Scores</Text>
      {highScores.map((score, index) => (
        <Text key={index}>
          Score: {score.score}, Time: {score.time}, Attempts: {score.attempts}
        </Text>
      ))}
      <Pressable onPress={() => setCurrentPage('Home')}>
        <Text>Back to Home</Text>
      </Pressable>
    </View>
  );
};

export default HighScorePage;
