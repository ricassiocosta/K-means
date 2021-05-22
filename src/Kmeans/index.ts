import { Dot } from "../Dot";
import { kmeans } from "./kmeans";

const dots: Dot[] = [
  new Dot(1, 1),
  new Dot(9.4, 6.4),
  new Dot(2.5, 2.1),
  new Dot(8, 7.7),
  new Dot(0.5, 2.2),
  new Dot(7.9, 8.4),
  new Dot(7, 7),
  new Dot(2.8, 0.8),
  new Dot(1.2, 3),
  new Dot(7.8, 6.1),
]

const data = kmeans(dots, 3)

export { data }
