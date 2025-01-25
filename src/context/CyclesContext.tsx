import { createContext, ReactNode, useState } from "react";


interface createCycleData {
  task: string
  minutesAmmount: number
}
export interface Cycle {
  id: string,
  task: string,
  minutesAmount: number,
  startDate: Date,
  interruptDate?: Date,
  finishedDate?: Date
}
 
//context
export interface CyclesContextType {
  cycles: Cycle[],
  activeCycle: Cycle | undefined,
  activeCycleId: string | null,
  amountSecondspast: number,
  markCycleAsFinished: () => void,
  setSecondsPast: (seconds: number) => void,
  createNewCycle: (data: createCycleData) => void,
  interruptCurrentCycle: () => void
}
 
 export const CycleContext = createContext({} as CyclesContextType)

 interface CyclesContextProvaiderPops{
  children: ReactNode
 }

export function CyclesContextProvider({ children}: CyclesContextProvaiderPops) {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondspast, setAmountSecondspast] = useState(0);

  const activeCycle = cycles.find( (cycle) => cycle.id === activeCycleId )
  
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

  function createNewCycle(data: createCycleData) {
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
    // reset() 
    setAmountSecondspast(0)
  }

  function interruptCurrentCycle() {
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
    <CycleContext.Provider 
      value={{
        cycles,
        activeCycle, 
        activeCycleId, 
        amountSecondspast, 
        markCycleAsFinished, 
        setSecondsPast, 
        createNewCycle, 
        interruptCurrentCycle
      }}
    >
      { children }
    </CycleContext.Provider>
  )
}
