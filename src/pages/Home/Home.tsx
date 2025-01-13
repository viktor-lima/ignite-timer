import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em</label>
          <TaskInput 
            id="task" 
            placeholder="De um nome para o seu projeto" 
            list="task-suggestions"
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
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountDownButton disabled type="submit">
          <Play size={24}/>
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}