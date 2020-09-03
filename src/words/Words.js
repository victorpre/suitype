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




  render() {
    const {keyPressed, cursor, words} = this.state;
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
