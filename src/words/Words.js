import React, {useState, useEffect} from 'react';
import {map, last} from 'lodash';
import Word from './Word';
import useKeyPress from '../hooks/useKeyPress';
import {load} from '../utils/loader'


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

    if (k === currentChar.content) {
      updatedCurrentChar = {...currentChar,
        correct: true,
        current: false
      }
    } else {
      updatedCurrentChar = {...currentChar,
        correct: false,
        current: false
      }
    }

    // check if end of word
    if (currentChar.letter === words[currentChar.word].length - 1) {
      // END of word
      const newCurrent = {...words[currentChar.word+1][0], current: true};
      updatedWords[currentChar.word+1][0] = newCurrent;
      setCurrentChar(newCurrent)
    } else {
      // MIDDLE of word
      const newCurrent = {...words[currentChar.word][currentChar.letter+1], current: true};
      updatedWords[currentChar.word][currentChar.letter+1] = newCurrent;
      setCurrentChar(newCurrent)
    }

    updatedWords[currentChar.word][currentChar.letter] = updatedCurrentChar;
    setWords(updatedWords);
    console.log("new incoming", updatedWords)
  }

  function backspaceTyped() {
    if (currentChar.letter === 0 && currentChar.word === 0) {
      return
    }

    let updatedWords = words;
    let updatedCurrentChar = {...currentChar,
      correct: null,
      current: false
    };

    updatedWords[currentChar.word][currentChar.letter] = updatedCurrentChar;

    // check if beginning of word
    if (currentChar.letter === 0 ) {
      // beginning of word
      const previousWord = currentChar.word - 1;
      const lastLetterIndex = words[previousWord].length - 1;
      const previousChar = {...words[previousWord][lastLetterIndex], correct: null};
      updatedWords[previousWord][lastLetterIndex] = previousChar;
    console.log("new current", previousChar)
      setCurrentChar(previousChar);


    } else {
      // MIDDLE of word
       const previousChar = {...words[currentChar.word][currentChar.letter-1], correct: null};
      updatedWords[currentChar.word][currentChar.letter-1] = previousChar;
    console.log("new current", previousChar)
      setCurrentChar(previousChar);
    }

    console.log("new incoming",updatedWords)
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

  console.log(currentChar)
  return(
    <div className="wordsWrapper">
      <div className="words">
        {
          map(words, (letters, i) => {
            return <Word
              key={`word_${i}`}
              letters={letters}
            />
          })
        }
      </div>
    </div>
  )
}

export default Words
