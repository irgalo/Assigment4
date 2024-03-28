import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardMargin = 10;
const cardsPerRow = 4; // Adjust based on your layout preference
const cardWidth = (width - cardMargin * 2 * cardsPerRow) / cardsPerRow;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  card: {
    width: cardWidth,
    height: cardWidth,
    justifyContent: 'center',
    alignItems: 'center',
    margin: cardMargin,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    elevation: 4,
  },
  // Adjusted to position Time and Attempts at the top right
  infoContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    alignItems: 'flex-end',
  },
  // Adjusted for Score at the top center
  scoreContainer: {
    position: 'absolute',
    top: 10,
    left: width / 2,
    transform: [{ translateX: -50 }], // Centers the score based on its width
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 5, // Space between Time and Attempts for clarity
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    padding: 10,
    marginTop: 20,
    backgroundColor: '#3498db',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  homeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  playButton: {
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  playButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  backButton: {
    padding: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    margin: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
