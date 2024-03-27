import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, Vibration } from 'react-native';
import { Audio } from 'expo-av';
import { styles } from './Styles/styles_page'; // Adjust the path as necessary

const cardPairs = ['A', 'B', 'C', 'D', 'E', 'F'];
const generateCards = () => {
  const pairIds = cardPairs.flatMap(pair => [pair, pair]);
  return pairIds.map((content, index) => ({
    id: `card-${index}`,
    content: content,
    isFlipped: false,
    isMatched: false,
  }));
};

const GamePage = ({ setCurrentPage }) => {
  const [cards, setCards] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const shuffledCards = shuffleCards(generateCards());
    setCards(shuffledCards);

    const timerInterval = setInterval(() => {
      setTimer(t => t + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const shuffleCards = cardsArray => cardsArray.sort(() => Math.random() - 0.5);

  const handleCardPress = async cardIndex => {
    const card = cards[cardIndex];

    if (selectedIds.length === 2 || card.isFlipped) return;

    const newCards = cards.map((c, index) =>
      index === cardIndex ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newSelectedIds = [...selectedIds, cardIndex];
    setSelectedIds(newSelectedIds);

    if (newSelectedIds.length === 2) {
      setAttempts(a => a + 1);
      const firstCard = cards[newSelectedIds[0]];
      const secondCard = cards[newSelectedIds[1]];

      if (firstCard.content === secondCard.content) {
        playSound();
        setScore(s => s + 1000);
        const matchedCards = newCards.map(card =>
          newSelectedIds.includes(card.id) ? { ...card, isMatched: true } : card
        );
        setCards(matchedCards);
        setSelectedIds([]);
      } else {
        Vibration.vibrate();
        setTimeout(() => {
          const resetCards = newCards.map(card =>
            newSelectedIds.includes(card.id) ? { ...card, isFlipped: false } : card
          );
          setCards(resetCards);
          setSelectedIds([]);
        }, 1000);
      }
    }
  };

  const playSound = async () => {
    const sound = new Audio.Sound();
    try {
      await sound.loadAsync(require('../Sounds/matched_sound.mp3')); // Make sure this path is correct
      await sound.playAsync();
    } catch (error) {
      console.error("Couldn't play sound", error);
    }
  };

  useEffect(() => {
    if (cards.every(card => card.isMatched)) {
      Alert.alert(`Game Completed!`, `Score: ${score}\nTime: ${timer} seconds\nAttempts: ${attempts}`);
    }
  }, [cards, score, timer, attempts]);

  return (
    <View style={styles.container}>
      <View style={styles.cardGrid}>
        {cards.map((card, index) => (
          <Pressable
            key={card.id}
            style={[styles.card, card.isMatched ? styles.matchedCard : (card.isFlipped ? styles.flippedCard : styles.unflippedCard)]}
            onPress={() => handleCardPress(index)}
            disabled={card.isMatched}>
            <Text style={styles.cardText}>
              {card.isFlipped || card.isMatched ? card.content : ''}
            </Text>
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
