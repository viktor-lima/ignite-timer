import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { createContext, useState } from "react";
import { NewCycleForm } from "./components/NewCycleForm/NewCycleForm";
import { Countdown } from "./components/Countdown/Countdown";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
 

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod.number().min(5).max(60)
})


interface Cycle {
 id: string,
 task: string,
 minutesAmount: number,
 startDate: Date,
 interruptDate?: Date,
 finishedDate?: Date
}

//context
interface CyclesContextType {
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  amountSecondspast: number
  markCycleAsFinished: () => void,
  setSecondsPast: (seconds: number) => void
}
export const CycleConstext = createContext({} as CyclesContextType)

export function Home() {
  
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondspast, setAmountSecondspast] = useState(0);

  const activeCycle = cycles.find( (cycle) => cycle.id === activeCycleId )
  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmmount: 0
    }
  })
  
  const { handleSubmit, watch, reset} = newCycleForm;
  const task = watch('task');
  const isCubmitDisabled = !task;

  function setSecondsPast(seconds: number){
    setAmountSecondspast(seconds)
  }
  
  function markCycleAsFinished() {
    setCycles((state) => 
      state.map( cycle => {
        if(cycle.id === activeCycleId){
          return {... cycle, finishedDate: new Date()}
        }else {
          return cycle
        }
      }),
    )
  }

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
 
  
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <CycleConstext.Provider 
          value={{activeCycle, activeCycleId, markCycleAsFinished, amountSecondspast, setSecondsPast}}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CycleConstext.Provider>

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