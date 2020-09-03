import React from 'react';
import Letter from './Letter';
import { map } from 'lodash'

function Word(props) {

  const {letters} = props;

  return(
    <div className="word">
      {
        map(letters, (v, i) => <Letter key={i} content={v.content} correct={v.correct} /> )
      }
    </div>
  )
}

export default Word
