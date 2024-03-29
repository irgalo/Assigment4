/**
 * Author: Irah Loreto
 * Purpouse - This is my main game page. Conatins the memory game and saves score and sends it to score page.
 * game_page.js
 */

import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, Animated, Vibration, Button, Dimensions } from 'react-native';
import { styles } from './Styles/styles_page';
import { database } from './database';

const cardColors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3', '#F3FF33'];

const generateCards = () => {
  return cardColors.flatMap((color, index) => [
    { id: `card-${index * 2}`, color, isMatched: false, flipAnim: new Animated.Value(0) },
    { id: `card-${index * 2 + 1}`, color, isMatched: false, flipAnim: new Animated.Value(0) },
  ]).sort(() => Math.random() - 0.5);
};

const GamePage = ({ setCurrentPage }) => {
  const [cards, setCards] = useState(generateCards());
  const [selectedIds, setSelectedIds] = useState([]);
  const [canSelect, setCanSelect] = useState(true);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [orientation, setOrientation] = useState(getOrientation());

  function getOrientation() {
    const dim = Dimensions.get('screen');
    return dim.height >= dim.width ? 'portrait' : 'landscape';
  }

  useEffect(() => {
    const orientationChangeHandler = () => {
      setOrientation(getOrientation());
    };

    Dimensions.addEventListener('change', orientationChangeHandler);

    return () => {
      Dimensions.removeEventListener('change', orientationChangeHandler);
    };
  }, []);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer(prevTimer => prevTimer + 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    if (matchedPairs === cardColors.length) {
      setTimeout(() => {
        saveGameData();
        Alert.alert('Congratulations!', `You've matched all ${cardColors.length} pairs in ${attempts} attempts and ${timer} seconds.`, [
          { text: "OK", onPress: () => {
            resetGame();
            setCurrentPage('HighScores');
          }}
        ]);
      }, 100);
    }
  }, [matchedPairs]);

  const handleCardPress = (index) => {
    if (!canSelect || selectedIds.includes(index) || cards[index].flipAnim._value > 0) return;
  
    const newSelectedIds = [...selectedIds, index];
    setSelectedIds(newSelectedIds);
    setAttempts(prevAttempts => prevAttempts + 1); // Increment attempts
    Animated.timing(cards[index].flipAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (newSelectedIds.length === 2) {
        setTimeout(() => {
          checkForMatch(newSelectedIds);
        }, 500);
      }
    });
  };
  

  const checkForMatch = (indices) => {
    const [firstIndex, secondIndex] = indices;
    const match = cards[firstIndex].color === cards[secondIndex].color;
  
    if (match) {
      handleMatch(indices);
    } else {
      handleMismatch(indices);
    }
  
    setCanSelect(true);
    setSelectedIds([]);
  };
  
  const handleMatch = (indices) => {
    console.log("Handling match...");
    setScore(prevScore => prevScore + 100);
    const newCards = cards.map((card, idx) => indices.includes(idx) ? { ...card, isMatched: true } : card);
    setCards(newCards);
    setMatchedPairs(prevPairs => prevPairs + 1);
  };

  const handleMismatch = (indices) => {
    console.log("Handling mismatch...");
    Vibration.vibrate();
    setTimeout(() => {
      indices.forEach(idx => {
        Animated.timing(cards[idx].flipAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start();
      });
    }, 1000);
  };

  const startGame = () => {
    console.log("Starting game...");
    setCards(generateCards());
    setCanSelect(true);
    setSelectedIds([]);
    setScore(0);
    setTimer(0);
    setAttempts(0);
    setMatchedPairs(0);
  };

  const resetGame = () => {
    console.log("Resetting game...");
    setCards(generateCards());
    setCanSelect(true);
    setSelectedIds([]);
    setScore(0);
    setTimer(0);
    setAttempts(0);
    setMatchedPairs(0);
  };

  const saveGameData = () => {
    console.log("Saving game data...");
    database.insertScore(score, timer, attempts, (success, result) => {
      if (success) {
        console.log('Game data saved successfully:', result);
      } else {
        console.error('Failed to save game data:', result);
      }
    });
  };
  
  return (
    <View style={orientation === 'portrait' ? styles.container : styles.containerLandscape}>
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button title="Start Game" onPress={startGame} color="#00C851" />
          <Button title="Reset Game" onPress={resetGame} color="#ff4444" />
        </View>
        <View style={styles.infoContainerLeft}>
          <Text style={styles.infoText}>Time: {timer}s</Text>
          <Text style={styles.infoText}>Attempts: {attempts}</Text>
        </View>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>Score: {score}</Text>
        </View>
        <View style={styles.cardGrid}>
          {cards.map((card, index) => (
            <Pressable key={card.id} onPress={() => handleCardPress(index)} disabled={!canSelect || card.isMatched}>
              <Animated.View style={[styles.card, {
                  backgroundColor: card.flipAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['#ecf0f1', card.color]
                  }),
                  transform: [{ scale: card.flipAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }]
              }]} />
            </Pressable>
          ))}
        </View>
        <View style={styles.gamePage_buttonContainer}>
        <Pressable onPress={() => setCurrentPage('Home')} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to Home</Text>
        </Pressable>
        <Pressable
          style={styles.Homepage2Button}
          onPress={() => setCurrentPage('HighScores')}
        >
          <Text style={styles.backButtonText}>High Scores</Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
};

export default GamePage;
