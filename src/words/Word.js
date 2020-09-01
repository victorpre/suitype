import React, {useState, useEffect} from 'react';
import Letter from './Letter';
import {find, map, isEqual, isNull} from 'lodash'

function isCorrect(keyPressed, letter, isActive) {
  if (isNull(keyPressed) || !isActive) {
    return null
  }

  return isEqual(keyPressed, letter)
}

function Word(props) {
  const {content, keyPressed, isActive} = props;
  const [history, setHistory] = useState([]);
  const [cursor, setCursor] = useState(0);

  const lettersObjects = map(content.split(""), (l, i) => {
    const correct = isCorrect(keyPressed, l, isActive);
    if (!isNull(keyPressed)) {
      if (cursor < i)  {
        return {
          content: l,
          correct: null
        }
      }
      const letterInHistory = find(history, {content: l}, i)
      if (letterInHistory) {
        return letterInHistory
      }

      if (isActive && i === cursor) {
        console.log(l, i, cursor)
        setHistory([...history, {content: l, correct: correct}])
        setCursor(cursor+1)
        // console.log(cursor)
      }
    }


    return {
      content: l,
      correct: correct
    }
  });

  console.log(history)
  return(
    <div className="word">
      {
        map(lettersObjects, (v, i) => <Letter key={i} content={v.content} correct={v.correct} /> )
      }
    </div>
  )
}

export default Word
