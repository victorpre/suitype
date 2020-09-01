import React, {useState} from 'react';
import {isNull} from 'lodash';

function setColor(correct) {
  if (isNull(correct)) {
    return 'black'
  }

  return correct ? 'green' : 'red'
}

function Letter(props) {
  const {content, correct} = props;
  const style = {
    color: setColor(correct)
  };
  return(
    <span style={style}>
      {content}
    </span>
  )
}

export default Letter
