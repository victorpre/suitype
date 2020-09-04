import React, {useState, useEffect} from 'react';
import { currentTime } from '../utils/time';

function Timer({startTime, wpm}) {
  const [clock, setClock] = useState("1 m");

  useEffect( () => {
    if (startTime) {
      var countDownDate = new Date();
      countDownDate.setSeconds(countDownDate.getSeconds() + 60);

      var x = setInterval(function() {
        var now = currentTime();
        var distance = countDownDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setClock(minutes + "m " + seconds + "s ");

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
        }
      }, 1000);
    }

  }, [startTime]);

  return(
    <div>
      <div>
        {clock}
      </div>
      <div>
        {wpm} WPM
      </div>
    </div>
  )
}

export default Timer
