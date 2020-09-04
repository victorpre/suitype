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
    // end of words
    if (currentChar.word + 1 === words.length && currentChar.letter === last(words).length - 1 ) {
      return
    }

    let updatedWords = words;
    let updatedCurrentChar = currentChar;
    const { word, letter, content } = currentChar;

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
