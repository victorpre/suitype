import React from 'react';
import {isNull} from 'lodash';

function Letter({content, isCorrect}) {
  function setColor(isCorrect) {
    if (isNull(isCorrect)) {
      return 'black'
    }

    return isCorrect ? 'green' : 'red'
  }

  const style = {
    color: setColor(isCorrect)
  };

  return(
    <span style={style}>
      {content}
    </span>
  )
}

export default Letter
