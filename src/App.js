import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Figure from './Components/Figure';
import WrongLetters from './Components/WrongLetters';
import Word from './Components/Word';
import PopUp from './Components/PopUp';
import Notification from './Components/Notification';
import {showNotification as show} from './Helpers/helpers'

const words = ['love', 'happy', 'charlie', 'loki', 'dad', 'mom', 'kaiden', 'makensie', 'cat', 'dog', 'hike', 'woods', 'rocks', 'camp', 'game', 'play', 'purple', 'blue', 'green', 'pink', 'sunny', 'rain', 'about', 'after', 'again', 'all', 'also', 'always', 'and', 'another', 'any', 'are', 'around', 'ask', 'ate', 'away', 'back', 'because', 'been', 'before', 'best', 'better', 'big', 'black', 'blue', 'both', 'bring', 'brown', 'but', 'buy', 'call', 'called', 'came', 'can', 'carry', 'clean', 'cold', 'come', 'could', 'cut', 'day', 'did', 'different', 'do', 'does', "don't", 'done', 'down', 'draw', 'drink', 'each', 'eat', 'eight', 'even', 'every', 'fall', 'far', 'fast', 'find', 'first', 'five', 'fly', 'for', 'found', 'four', 'from', 'full', 'funny', 'gave', 'get', 'give', 'goes', 'going', 'good', 'got', 'green', 'grow', 'had', 'has', 'have', 'help', 'her', 'here', 'him', 'his', 'hold', 'hot', 'how', 'hurt', 'into', 'its', 'jump', 'just', 'keep', 'kind', 'know', 'laugh', 'let', 'light', 'like', 'little', 'live', 'long', 'look', 'made', 'make', 'man', 'many', 'may', 'more', 'most', 'much', 'must', 'myself', 'never', 'new', 'not', 'now', 'number', 'of', 'off', 'old', 'once', 'one', 'only', 'open', 'other', 'our', 'out', 'over', 'own', 'part', 'people', 'pick', 'place', 'play', 'please', 'pretty', 'pull', 'put', 'ran', 'read', 'red', 'ride', 'right', 'round', 'run', 'said', 'same', 'saw', 'say', 'see', 'seven', 'shall', 'she', 'show', 'sing', 'sit', 'six', 'sleep', 'small', 'some', 'soon', 'start', 'stop', 'such', 'take', 'tell', 'ten', 'than', 'thank', 'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'things', 'think', 'this', 'those', 'three', 'through', 'time', 'to', 'today', 'together', 'too', 'try', 'two', 'under', 'upon', 'use', 'used', 'very', 'want', 'walk', 'warm', 'was', 'wash', 'water', 'way', 'well', 'went', 'were', 'what', 'when', 'where', 'which', 'white', 'who', 'why', 'will', 'wish', 'with', 'word', 'words', 'work', 'would', 'write', 'years', 'yellow', 'yes', 'you', 'your'];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setshowNotification] = useState(false);


  useEffect(() => {
    const handleKeyDown = event => {
      const { key, keyCode } = event;
        if (playable && keyCode >= 65 && keyCode <= 90) {
          const letter = key.toLowerCase();
    
          if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
              setCorrectLetters(currentLetters => [...currentLetters, letter]);
            } else {
              show(setshowNotification);
            }
          } else {
            if (!wrongLetters.includes(letter)) {
              setWrongLetters(wrongLetters => [...wrongLetters, letter]);
            } else {
              show(setshowNotification);
            }
          }
        }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [correctLetters, wrongLetters, playable]);

  function playAgain() {
    setPlayable(true);

    //Empty arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = [Math.floor(Math.random() * words.length)];
    selectedWord = words[random];
  }

  return (
    <div>
      <Header />
      <div className='game-container'>
        <Figure wrongLetters={wrongLetters} />
        <WrongLetters wrongLetters={wrongLetters} />
        <Word selectedWord={selectedWord} correctLetters={correctLetters } />
      </div>
        <PopUp correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord}  setPlayable={setPlayable} playAgain={playAgain} />
        <Notification showNotification={showNotification} />
    </div>
  );
}

export default App;
