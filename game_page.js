import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, Vibration, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { styles } from './Styles/styles_page'; // Make sure this path is correct

const cardPairs = ['A', 'B', 'C', 'D', 'E', 'F'];
const generateCards = () => {
  const pairIds = cardPairs.flatMap((pair) => [pair, pair]);
  return pairIds.map((content, index) => ({
    id: `card-${index}`,
    content,
    isFlipped: false,
    isMatched: false,
    flipAnim: new Animated.Value(0), // Initialize flip animation value
  }));
};

const GamePage = ({ setCurrentPage }) => {
  const [cards, setCards] = useState(generateCards());
  const [selectedIds, setSelectedIds] = useState([]);
  const [canSelect, setCanSelect] = useState(true); // Control card selection
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    setCards(shuffleCards(generateCards()));
    const timerInterval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(timerInterval);
  }, []);

  const shuffleCards = (cardsArray) => cardsArray.sort(() => Math.random() - 0.5);

  const handleCardPress = (cardIndex) => {
    if (!canSelect || selectedIds.length === 2 || cards[cardIndex].isFlipped) return;

    const newCards = cards.map((card, index) =>
      index === cardIndex ? { ...card, isFlipped: true } : card
    );
    setSelectedIds([...selectedIds, cardIndex]);

    Animated.timing(newCards[cardIndex].flipAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (selectedIds.length === 1) {
      setCanSelect(false); // Prevent more selections
      setAttempts((a) => a + 1);
      setTimeout(() => processCardSelection(newCards, cardIndex), 300);
    } else {
      setCards(newCards);
    }
  };

  const processCardSelection = (newCards, cardIndex) => {
    const firstCardIndex = selectedIds[0];
    const secondCardIndex = cardIndex;
    const match = newCards[firstCardIndex].content === newCards[secondCardIndex].content;

    if (match) {
      playSound();
      setScore((s) => s + 1000);
      // Mark cards as matched and reset selected cards
      const updatedCards = newCards.map((card) =>
        selectedIds.includes(card.id) ? { ...card, isMatched: true } : card
      );
      setCards(updatedCards);
    } else {
      Vibration.vibrate();
      // Flip cards back over
      newCards.forEach((card, idx) => {
        if ([firstCardIndex, secondCardIndex].includes(idx)) {
          Animated.timing(card.flipAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            // After animation, set cards to unflipped state
            card.isFlipped = false;
          });
        }
      });
    }
    setSelectedIds([]);
    setCanSelect(true); // Allow new selections
  };

  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require('../Sounds/matched_sound.mp3')); // Ensure path is correct
      await sound.playAsync();
      // Optionally, unload the sound after playing to free resources
    } catch (error) {
      console.error("Couldn't play sound", error);
    }
  };

  useEffect(() => {
    if (cards.every((card) => card.isMatched)) {
      Alert.alert(`Game Completed!`, `Score: ${score}\nTime: ${timer} seconds\nAttempts: ${attempts}`);
      // Optionally, navigate to a score page or reset the game here
    }
  }, [cards, score, timer, attempts]);

    // Continuing inside GamePage component...

    return (
        <View style={styles.container}>
          <View style={styles.cardGrid}>
            {cards.map((card, index) => (
              <Pressable key={card.id} onPress={() => handleCardPress(index)} disabled={!canSelect || card.isMatched}>
                <Animated.View style={[
                    styles.card, 
                    card.isMatched ? styles.matchedCard : styles.unflippedCard,
                    { transform: [{ rotateY: card.flipAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'] }) 
                    }] }
                  ]}>
                  <Text style={styles.cardText}>
                    {card.isFlipped || card.isMatched ? card.content : ''}
                  </Text>
                </Animated.View>
              </Pressable>
            ))}
          </View>
          <Text style={styles.timer}>Time: {timer}s</Text>
          <Text style={styles.attempts}>Attempts: {attempts}</Text>
          <Text style={styles.score}>Score: {score}</Text>
          <Pressable style={styles.button} onPress={() => setCurrentPage('Home')}>
            <Text style={styles.buttonText}>Return to Home</Text>
          </Pressable>
        </View>
      );
    };
    
    export default GamePage;
    