import { Dot } from "../Dot";
import { kmeans } from "./kmeans";
import dataset from './dataset.json';

const dots: Dot[] = [];
const clustersAmount = 2

for (const data of dataset) {
  const dot = new Dot(data.x, data.y)
  dots.push(dot);
}

const clusteredData = kmeans(dots, clustersAmount);

export { clusteredData as kmeans }
