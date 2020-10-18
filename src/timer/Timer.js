import React, {useState, useEffect} from 'react';
import { currentTime } from '../utils/time';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
} from "@chakra-ui/core";

let TIME_LIMIT = 60;

function Timer({startTime, wpm}) {
  const [clock, setClock] = useState("1 m");
  const [intervalId, setIntervalId] = useState(null);

  useEffect( () => {
    if (startTime) {
      var countDownDate = new Date();
      countDownDate.setSeconds(countDownDate.getSeconds() + TIME_LIMIT);
      var inter = setInterval(function() {
        setIntervalId(inter);
        var now = currentTime();
        var distance = countDownDate - now;

        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setClock(minutes + "m " + seconds + "s ");

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(inter);
        }
      }, 1000)
    } else {
      setClock("1 m")
      clearInterval(intervalId);
    }

  }, [startTime]);

  return(
    <StatGroup textAlign="center">
      <Stat minWidth="120px">
        <StatLabel>Time</StatLabel>
        <StatNumber>{clock}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>WPM</StatLabel>
        <StatNumber>{wpm}</StatNumber>
      </Stat>
    </StatGroup>
  )
}

export default Timer
