import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesAmmountInput, Separator, StartCountDownButton, TaskInput } from "./styles";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
 
// controlled / uncontrolled


const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod.number().min(5).max(60)
})


type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home() {
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

  function handleCreateNewCycle(data: NewCycleFormData) {
    console.log(data);  
    reset() 
  }
  
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
            {...register('minutesAmmountInput', { valueAsNumber: true})}
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

        <StartCountDownButton disabled={isCubmitDisabled} type="submit">
          <Play size={24}/>
          Começar
        </StartCountDownButton>
      </form>
    </HomeContainer>
  )
}