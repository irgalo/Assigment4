import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Alert, Animated, StyleSheet } from 'react-native';
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
    const [canSelect, setCanSelect] = useState(true);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(0);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        const timerInterval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);
        return () => clearInterval(timerInterval);
    }, []);

    const handleCardPress = (index) => {
        if (!canSelect || selectedIds.length === 2 || cards[index].flipAnim._value > 0) return;
        let newSelectedIds = [...selectedIds, index];
        setSelectedIds(newSelectedIds);
        Animated.timing(cards[index].flipAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start(() => {
            if (newSelectedIds.length === 2) {
                checkForMatch(newSelectedIds);
            }
        });
    };

    const checkForMatch = (indices) => {
        setCanSelect(false);
        setTimeout(() => {
            const [firstIndex, secondIndex] = indices;
            if (cards[firstIndex].color === cards[secondIndex].color) {
                setScore(prevScore => prevScore + 100);
                let updatedCards = cards.map((card, idx) => {
                    if (indices.includes(idx)) {
                        return { ...card, isMatched: true };
                    }
                    return card;
                });
                setCards(updatedCards);
            } else {
                indices.forEach(idx => {
                    Animated.timing(cards[idx].flipAnim, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: false,
                    }).start();
                });
            }
            setSelectedIds([]);
            setCanSelect(true);
            setAttempts(prevAttempts => prevAttempts + 1);
        }, 1000);
    };

    useEffect(() => {
        if (cards.every(card => card.isMatched)) {
            Alert.alert('Congratulations!', `You've completed the game in ${attempts} attempts and ${timer} seconds.`);
        }
    }, [cards, attempts, timer]);

    return (
        <View style={styles.container}>
            <View style={styles.cardGrid}>
                {cards.map((card, index) => (
                    <Pressable key={card.id} onPress={() => handleCardPress(index)} disabled={!canSelect || card.isMatched}>
                        <Animated.View style={[styles.card, {
                            backgroundColor: card.flipAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: ['#ecf0f1', card.color] // Color shows upon flipping
                            }),
                            transform: [{ scale: card.flipAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }] // Optional: Scale effect for feedback
                        }]} />
                    </Pressable>
                ))}
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Time: {timer}s</Text>
                <Text style={styles.infoText}>Attempts: {attempts}</Text>
            </View>
            <View style={styles.scoreContainer}>
                <Text style={styles.scoreText}>Score: {score}</Text>
            </View>
        </View>
    );
};

export default GamePage;

