import { createContext, ReactNode, useReducer, useState } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/actions";


interface createCycleData {
  task: string
  minutesAmmount: number
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

  const [cyclesState, dispatch] = useReducer(cyclesReducer,{
    cycles: [],
    activeCycleId: null
  });
  const [amountSecondspast, setAmountSecondspast] = useState(0);

  const { cycles, activeCycleId } = cyclesState

  const activeCycle = cycles.find( (cycle) => cycle.id === activeCycleId )
  
  function setSecondsPast(seconds: number){
    setAmountSecondspast(seconds)
  }
  
  function markCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: createCycleData) {
    const id = String(new Date().getTime());
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmmount,
      startDate: new Date(),
    } 

    dispatch(addNewCycleAction(newCycle))
    setAmountSecondspast(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
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
