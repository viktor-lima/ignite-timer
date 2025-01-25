import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CountdownContainer, Separator } from "./styles";
import { CycleContext } from "../../../../context/CyclesContext";

export function Countdown(){
  const { activeCycle, activeCycleId, markCycleAsFinished, amountSecondspast, setSecondsPast } = useContext(CycleContext)
  
  const totalSeconds = activeCycle ? activeCycle.minutesAmount*60 : 0;

  

  useEffect(()=> {
    let interval: number;
    if(activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)
        if(secondsDifference >= totalSeconds){
          markCycleAsFinished()
          setSecondsPast(totalSeconds)
          clearInterval(interval);
        } else {
          setSecondsPast(secondsDifference)   
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId, markCycleAsFinished, setSecondsPast])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondspast : 0;
  
  const munitesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60;

  const minutes = String(munitesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => { 
    if(activeCycle){
      document.title = `${minutes}:${seconds}`
    }
  }, [minutes, seconds, activeCycle ])


  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}