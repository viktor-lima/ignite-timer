import { HandPalm, Play } from "phosphor-react";
import { HomeContainer, StartCountDownButton, StopCountDownButton } from "./styles";
import { NewCycleForm } from "./components/NewCycleForm/NewCycleForm";
import { Countdown } from "./components/Countdown/Countdown";
import * as zod from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider } from "react-hook-form";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { CycleContext } from "../../context/CyclesContext";
 

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmmount: zod.number().min(5).max(60)
})

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } = useContext(CycleContext); 
  
  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmmount: 0
    }
  })
  
  const { handleSubmit, watch, /*reset*/} = newCycleForm;
  const task = watch('task');
  const isCubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(createNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {
          activeCycle ? (
            <StopCountDownButton  onClick={interruptCurrentCycle} type="button">
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