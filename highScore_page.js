import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { styles } from './Styles/styles_page'; // Adjust the import path as necessary

const HighScorePage = ({ setCurrentPage }) => {
  const navigation = useNavigation(); // Access navigation object

  const handleHomePress = () => {
    setCurrentPage('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.homeTitle}>High Scores</Text>
      {/* Display high scores here */}
      <Pressable style={styles.backButton} onPress={handleHomePress}>
        <Text style={styles.backButtonText}>Back to Home</Text>
      </Pressable>
    </View>
  );
};

export default HighScorePage;
