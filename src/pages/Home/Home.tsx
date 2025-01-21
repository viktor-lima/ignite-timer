import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from "./components/NewCycleForm/NewCycleForm";
import { Countdown } from "./components/Countdown/Countdown";
 
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod.number().min(1).max(60)
})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
 id: string,
 task: string,
 minutesAmount: number,
 startDate: Date,
 interruptDate?: Date,
 finishedDate?: Date
}
export function Home() {
  
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondspast, setAmountSecondspast] = useState(0);
  

  const {
    handleSubmit,
    watch,
    reset
  } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmmount: 0
    }
  })
  
  const activeCycle = cycles.find( (cycle) => cycle.id === activeCycleId )
  const totalSeconds = activeCycle ? activeCycle.minutesAmount*60 : 0;

  useEffect(()=> {
    let interval: number;
    if(activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(new Date(), activeCycle.startDate)
        if(secondsDifference >= totalSeconds){
          setCycles((state) => 
            state.map( cycle => {
              if(cycle.id === activeCycleId){
                return {... cycle, finishedDate: new Date()}
              }else {
                return cycle
              }
            }),
          )
          setAmountSecondspast(totalSeconds)

          clearInterval(interval);
        } else {
          setAmountSecondspast(secondsDifference)   
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmmount,
      startDate: new Date(),
    } 

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    reset() 
    setAmountSecondspast(0)
  }

  function handleInterruptCycle() {
    setCycles(
        cycles.map( cycle => {
        if(cycle.id === activeCycleId){
          return {... cycle, interruptDate: new Date()}
        }else {
          return cycle
        }
      })
    )
    setActiveCycleId(null)
  }

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

  
  const task = watch('task');
  const isCubmitDisabled = !task;
  

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <NewCycleForm />
        <Countdown />

        {
          activeCycle ? (
            <StopCountDownButton  onClick={handleInterruptCycle} type="button">
              <HandPalm size={24}/>
              Interromper
            </StopCountDownButton>
          ): (
            <StartCountDownButton disabled={isCubmitDisabled} type="submit">
              <Play size={24}/>
              Começar
            </StartCountDownButton>
          )
        }
      </form>
    </HomeContainer>
  )
}