import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardMargin = 10;
const cardWidth = (width - cardMargin * 8) / 3;

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
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
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
  flippedCard: {
    backgroundColor: '#2ecc71',
  },
  unflippedCard: {
    backgroundColor: '#95a5a6',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#34495e',
  },
  timer: {
    fontSize: 20,
    position: 'absolute',
    top: 20,
    right: 20,
  },
  attempts: {
    fontSize: 20,
    position: 'absolute',
    top: 50,
    right: 20,
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
  // Additional styles for navigation buttons, if needed
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
