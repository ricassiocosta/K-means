import { Cluster } from "../Cluster"
import { Dot } from "../Dot"
import { sample } from "lodash"

const kmeans = (dataset: Dot[], clustersAmount: number): Dot[] => {
  const clusters: Cluster[] = [];

  for (let index = 0; index < clustersAmount; index++) {
    const dot = sample(dataset) as Dot;
    const newCluster = new Cluster(dot.coordX, dot.coordY);

    clusters.push(newCluster);
  }

  for (const dot of dataset) {
    dot.setCluster(clusters[0])
    for (const cluster of clusters) {
      const distance = cluster.getDistance(dot)

      const currentCluster = dot.getCluster();
      const currentClusterDistance = currentCluster?.getDistance(dot);

      if(currentClusterDistance && distance < currentClusterDistance)
        dot.setCluster(cluster)
    }
  }

  return dataset
}

export { kmeans }
