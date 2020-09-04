import React, {useState, useEffect} from 'react';
import {map, last, isEqual} from 'lodash';
import Word from './Word';
import useKeyPress from '../hooks/useKeyPress';
import load from '../utils/loader'


function Words() {
  const [currentChar, setCurrentChar] = useState({});
  const [words, setWords] = useState([]);

  function getInitialChar(initialWords) {
    return {
      content: initialWords[0].charAt(0),
      word: 0,
      current: true,
      letter: 0,
      correct: null
    }
  }

  function getCharObjects(initialWords) {
    return map(initialWords, (w, i) => {
      return map(w.split(''), (l, j) => {
        return {
          content: l,
          current: false,
          word: i,
          letter: j,
          correct: null
        }
      })
    })
  }

  function newCharTyped(k) {
    const { word, letter, content } = currentChar;
    // end of words
    if (word + 1 === words.length && letter === last(words).length - 1 ) {
      return
    }

    let updatedWords = words;
    let updatedCurrentChar = currentChar;

    updatedCurrentChar = {...currentChar,
      correct: isEqual(k, content),
      current: false
    }

    // check if end of word
    const isEndOfWord = letter === words[word].length - 1;
    const wordIndex = isEndOfWord ? word + 1 : word;
    const letterIndex = isEndOfWord ? 0 : letter + 1;
    const newCurrent = {...words[wordIndex][letterIndex], current: true};
    updatedWords[wordIndex][letterIndex] = newCurrent;
    setCurrentChar(newCurrent)

    updatedWords[word][letter] = updatedCurrentChar;
    setWords(updatedWords);
  }

  function backspaceTyped() {
    if (currentChar.letter === 0 && currentChar.word === 0) {
      return
    }

    const { word, letter } = currentChar;
    let updatedWords = words;
    let updatedCurrentChar = {...currentChar,
      correct: null,
      current: false
    };

    updatedWords[word][letter] = updatedCurrentChar;

    // // check if beginning or middle of word
    const isFirstLetter = letter === 0;
    const wordIndex = isFirstLetter ? word - 1 : word;
    const letterIndex = isFirstLetter ? words[wordIndex].length - 1 : letter - 1;
    const previousChar = {...words[wordIndex][letterIndex], correct: null};

    updatedWords[wordIndex][letterIndex] = previousChar;
    setCurrentChar(previousChar);

    setWords(updatedWords);
  }

  function spacebarTyped() {
    const { word, letter } = currentChar;
    if (letter === 0) {
      return
    }

    // go to next word
    let updatedWords = words;

    // if middle of word
    if (letter !== words[word].length - 1) {
      const wordIndex = word + 1;
      const letterIndex = 0;
      const newCurrent = {...words[wordIndex][letterIndex], current: true};
      updatedWords[wordIndex][letterIndex] = newCurrent;

      // mark all remaining non-typed chars as incorrect
      for (var i = letter; i < words[word].length; i++) {
        updatedWords[word][i] = {...updatedWords[word][i], current: false, correct: false};
      }
      setCurrentChar(newCurrent)
      setWords(updatedWords);
    }

  }

  useEffect( () => {
    async function loadWords() {
      const words = await load();
      console.log(words);
      setCurrentChar(getInitialChar(words));
      setWords(getCharObjects(words));
    }
    loadWords();
  }, []);


  useKeyPress( k => {
    if (k === "Backspace") {
      backspaceTyped();
    } else if (k === " ") {
      spacebarTyped();
    } else {
      newCharTyped(k);
    }

    // update words
    // if (updatedWords.length < 10) {
    //   // load more words
    // }
  })

  return(
    <div className="wordsWrapper">
      <div className="words">
        {
          map(words, (letters, i) => <Word key={`word_${i}`} letters={letters} />)
        }
      </div>
    </div>
  )
}

export default Words
