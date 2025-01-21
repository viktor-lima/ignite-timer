import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import { useEffect, useState } from "react";
import { differenceInSeconds } from 'date-fns'
 
const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod.number().min(5).max(60)
})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
 id: string,
 task: string,
 minutesAmount: number,
 startDate: Date
}
export function Home() {
  
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondspast, setAmountSecondspast] = useState(0);
  

  const {
    register,
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

  useEffect(()=> {
    let interval: number;
    if(activeCycle) {
      interval = setInterval(() => {
        setAmountSecondspast(differenceInSeconds(new Date(), activeCycle.startDate))
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activeCycle])

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

  const totalSeconds = activeCycle ? activeCycle.minutesAmount*60 : 0;
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
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput 
            id="task"
            placeholder="De um nome para o seu projeto" 
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="project 1" />
            <option value="project 2" />
            <option value="project 3" />
            <option value="banana 3" />
          </datalist>

          <label htmlFor="">Durante</label>
          <MinutesAmmountInput 
            type="number" 
            id="minutesAmmount" 
            placeholder="00" 
            step={5}
            min={5}
            max={60}
            {...register('minutesAmmount', { valueAsNumber: true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountDownButton disabled={isCubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}