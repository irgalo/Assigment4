import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardMargin = 10;
const cardsPerRow = 4;
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
    width: 75, 
    height: 75, 
    justifyContent: 'center',
    alignItems: 'center',
    margin: cardMargin,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    elevation: 4,
  },
  infoContainerLeft: {
    position: 'absolute',
    top: 50,
    left: 10,
    alignItems: 'flex-start',
  },
  scoreContainer: {
    position: 'absolute',
    top: 680,
    alignSelf: 'center',
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 5,
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
    width: "100%",
    height:200
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 20,
  },
  startButton: {
    padding: 10,
    backgroundColor: '#00C851',
    borderRadius: 5,
  },
  resetButton: {
    padding: 10,
    backgroundColor: '#ff4444',
    borderRadius: 5,
  },
  homepageButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    position: 'absolute',
    bottom: 50, 
    width: '100%',
  },
  homepageButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3498db', 
    borderRadius: 5,
    marginHorizontal: 10, 
  },
  homepageButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  backButtonContainer: {
    marginTop: 20,
  },
  gamePage_buttonContainer: {
    flexDirection: 'row',
      justifyContent: 'space-between',
      width: '150%',
      paddingHorizontal: 120,
      position: 'absolute',
      top: 240, // Adjust the position from the bottom
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3498db', 
    borderRadius: 5,
    marginHorizontal: 10, 
  },
  Homepage2Button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3498db', 
    borderRadius: 5,
    marginHorizontal: 10, 
  },
  HighScorecontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreText: {
    fontSize: 28,
    marginBottom: 40,
    alignItems: 'center',
  },
  ScoreHomeBackButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3498db', 
    borderRadius: 5,
    marginHorizontal: 10, 
    top:300,
  },
});
