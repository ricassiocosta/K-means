import { Dot } from "../Dot";
import { kmeans } from "./kmeans";

import dataset from './dataset.json'

const dots: Dot[] = []

/*
  Lista de pendências:
  [ ] - Bug na seleção dos primeiros centroides
  [ ] - Refatorar loop de cálculo da distância dos pontos
  [ ] - Armazenar o histórico de iterações
  [ ] - Implementar gráfico, mostrando o histórico de iterações
  [ ] - Testar e ajustar generalização dos casos de usos
*/

for (const data of dataset) {
  dots.push(new Dot(data.x, data.y))
}

const clusteredData = kmeans(dots, 2)

export { clusteredData }
