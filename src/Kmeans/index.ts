import { Dot } from "../Dot";
import { kmeans } from "./kmeans";
import dataset from './dataset2.json';

const dots: Dot[] = [];

for (const data of dataset) {
  dots.push(new Dot(data.x, data.y));
}

const clusteredData = kmeans(dots, 4);

export { clusteredData as kmeans }
