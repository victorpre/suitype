import React from 'react';
import Word from './Word';
import {map, sampleSize} from 'lodash'

class Words extends React.Component {
  state = {words: null, keyPressed: null, cursor: {word: 0}};
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch('js/english_10k.json')
      .then((r) => r.json())
      .then((data) => {
        this.setState({ words: sampleSize(data, 10) });
      })

    window.addEventListener('keydown', ({key}) => {
      this.setState(
        {
          keyPressed: key,
        });
    })
  }




  render() {
    const {keyPressed, cursor, words} = this.state;
    return(
    <div className="wordsWrapper">
      <div className="words">
        {
          map(words, (w, i) =>
            <Word
              key={`word_${i}`}
              content={w}
              keyPressed={keyPressed}
              isActive={cursor.word === i}
            />
          )
        }
      </div>
    </div>
    )
  }
}

export default Words
