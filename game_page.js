import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, Animated, Vibration, Button } from 'react-native';
import { styles } from './Styles/styles_page';

const cardColors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3', '#F3FF33'];

const generateCards = () => {
    return cardColors.flatMap((color, index) => [
        { id: `card-${index * 2}`, color, isMatched: false, flipAnim: new Animated.Value(0) },
        { id: `card-${index * 2 + 1}`, color, isMatched: false, flipAnim: new Animated.Value(0) },
    ]).sort(() => Math.random() - 0.5);
};

const GamePage = () => {
    const [cards, setCards] = useState(generateCards());
    const [selectedIds, setSelectedIds] = useState([]);
    const [canSelect, setCanSelect] = useState(true); // Changed to true for initial game state
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);
        return () => clearInterval(timerInterval);
    }, []);

    const handleCardPress = async (index) => {
      // Check if the card is already in the process of being flipped or matched
      if (!canSelect || selectedIds.includes(index) || cards[index].flipAnim._value > 0 || gameCompleted) return;
  
      const newSelectedIds = [...selectedIds, index];
      setSelectedIds(newSelectedIds); // Immediately update the selected indices
  
      // Prevent double tapping the same card by disabling it temporarily
      Animated.timing(cards[index].flipAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
      }).start(({ finished }) => {
          // Only proceed if the animation finished successfully
          if (finished && newSelectedIds.length === 2) {
              setCanSelect(false); // Temporarily prevent further selections
              // Add a slight delay before checking for a match to allow the user to view the second card
              setTimeout(() => {
                  checkForMatch(newSelectedIds);
                  setSelectedIds([]); // Clear the array of selected IDs for the next selection
                  setCanSelect(true); // Allow selections again
              }, 500); // Adjust timing as necessary for a better user experience
          }
      });
  };
  
  const checkForMatch = (indices) => {
      const [firstIndex, secondIndex] = indices;
      const match = cards[firstIndex].color === cards[secondIndex].color;
  
      if (match) {
          // Handle a match
          handleMatch(indices);
      } else {
          // Handle a mismatch
          handleMismatch(indices);
      }
  };
    
  // Handle the case where two cards match
  const handleMatch = (indices) => {
      setScore(prevScore => prevScore + 100);
      let newCards = cards.map((card, idx) =>
          indices.includes(idx) ? { ...card, isMatched: true } : card);
      setCards(newCards);
  };
  
  // Handle the case where two cards do not match
  const handleMismatch = (indices) => {
      Vibration.vibrate();
      indices.forEach(idx => {
          Animated.timing(cards[idx].flipAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
          }).start();
      });
  };
  
    const startGame = () => {
        setCards(generateCards());
        setCanSelect(true);
        setSelectedIds([]);
        setScore(0);
        setTimer(0);
        setAttempts(0);
        setGameCompleted(false);
    };

    const resetGame = () => {
        setCards(generateCards());
        setCanSelect(false); // Disable selection until game starts again
        setSelectedIds([]);
        setScore(0);
        setTimer(0);
        setAttempts(0);
        setGameCompleted(false);
    };

    return (
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
        </View>
    );
};

export default GamePage;
