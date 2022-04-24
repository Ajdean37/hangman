import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Figure from './Components/Figure';
import WrongLetters from './Components/WrongLetters';
import Word from './Components/Word';
import PopUp from './Components/PopUp';
import Notification from './Components/Notification';
import {showNotification as show} from './Helpers/helpers'

const words = ['application', 'programming', 'interface', 'wizard', 'family', 'construction', 'animals', 'children', 'birthday', 'holiday', 'wood', 'nails', 'annoying', 'beautiful', 'sunshine', 'laughter', 'handsome', 'smarty', 'vacation', 'travel'];

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
