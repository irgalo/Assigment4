import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, Animated, Vibration, Button } from 'react-native';
import { styles } from './Styles/styles_page'; // Ensure this path is correctly pointed to your styles file

const cardColors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3', '#F3FF33'];

const generateCards = () => {
    return cardColors.flatMap((color, index) => [
        { id: `card-${index * 2}`, color, isMatched: false, flipAnim: new Animated.Value(0) },
        { id: `card-${index * 2 + 1}`, color, isMatched: false, flipAnim: new Animated.Value(0) },
    ]).sort(() => Math.random() - 0.5);
};

const GamePage = () => {
    const [cards, setCards] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [canSelect, setCanSelect] = useState(false);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const [gameCompleted, setGameCompleted] = useState(false);

    useEffect(() => {
        // Reset timer only when the game starts
        if (canSelect) {
            const timerInterval = setInterval(() => {
                setTimer(prevTimer => prevTimer + 1);
            }, 1000);
            return () => clearInterval(timerInterval);
        }
    }, [canSelect]);

    const handleCardPress = (index) => {
        if (!canSelect || selectedIds.length === 2 || cards[index].flipAnim._value > 0) return;
        const newSelectedIds = [...selectedIds, index];
        setSelectedIds(newSelectedIds);
        Animated.timing(cards[index].flipAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
        if (newSelectedIds.length === 2) {
            checkForMatch(newSelectedIds);
        }
    };

    const checkForMatch = (indices) => {
        // Logic remains similar; ensure to reset selectedIds and allow card selection
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
        setCanSelect(false);
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
