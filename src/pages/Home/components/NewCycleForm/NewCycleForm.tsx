import { FormContainer, MinutesAmmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext } from "react-hook-form";
import { CycleContext } from "../../../../context/CyclesContext";


export function NewCycleForm(){
  const { activeCycle} = useContext(CycleContext); 
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="">Vou trabalhar em</label>
      <TaskInput 
        id="task"
        placeholder="De um nome para o seu projeto" 
        list="task-suggestions"
        disabled= {!!activeCycle}
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
        disabled= {!!activeCycle}
        {...register('minutesAmmount', { valueAsNumber: true})}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}