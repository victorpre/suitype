import { useState, useEffect } from 'react';

const BACKSPACE = 8
const SPACEBAR = 32

const useKeyPress = callback => {

  const [keyPressed, setKeyPressed] = useState();
  useEffect(() => {
    const downHandler = (e) => {
      const {key, keyCode} = e;
      if (keyCode === BACKSPACE) {
        e.preventDefault();
      }
      if ((keyPressed !== key && key.length === 1) || keyCode === BACKSPACE || keyCode === SPACEBAR) {
        setKeyPressed(key);
        callback && callback(key);
      }
    };
    const upHandler = () => {
      setKeyPressed(null);
    };

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  });

  return keyPressed;
};

export default useKeyPress;
