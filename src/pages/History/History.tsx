import { HistoryContainer, HistoryList, Status } from "./styles";

export function History() {
  return (
    <HistoryContainer>
      <h1>Meu Histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Inicio</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>tarefa</td>
              <td>20 min</td>
              <td>há cerca de 2 meses</td>
              <Status statusColor="green">Concluído</Status>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 min</td>
              <td>há cerca de 2 meses</td>
              <Status statusColor="yellow">Em andamento</Status>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 min</td>
              <td>há cerca de 2 meses</td>
              <Status statusColor="red">Não concluido</Status>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 min</td>
              <td>há cerca de 2 meses</td>
              <Status statusColor="green">Concluído</Status>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 min</td>
              <td>há cerca de 2 meses</td>
              <Status statusColor="green">Concluído</Status>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20 min</td>
              <td>há cerca de 2 meses</td>
              <Status statusColor="green">Concluído</Status>
            </tr>
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}