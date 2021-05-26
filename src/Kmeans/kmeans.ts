import { Cluster } from "../Cluster"
import { Dot } from "../Dot"
import { sample } from "lodash"

const kmeans = (dataset: Dot[], clustersAmount: number): Dot[] => {
  const clusters: Cluster[] = [];

  for (let index = 0; index < clustersAmount; index++) {
    const dot = sample(dataset) as Dot;
    console.log("dot chosen: ", dot)
    const newCluster = new Cluster(dot.coordX, dot.coordY);
    clusters.push(newCluster);
  }

  let hasChanges: boolean;
  let iterationCount = 0;
  do {
    hasChanges = false
    iterationCount++
    for (const dot of dataset) {
      if(!dot.getCluster()) dot.setCluster(clusters[0]);

      for (const cluster of clusters) {
        const distance = cluster.getDistance(dot);

        const currentCluster = dot.getCluster() as Cluster;
        const currentClusterDistance = currentCluster.getDistance(dot);

        if(currentClusterDistance && distance < currentClusterDistance) {
          hasChanges = true
          dot.setCluster(cluster);
        }
      }
    }

    if(!hasChanges) {
      console.log("number of iterations: ", iterationCount)
      console.log("clusters: ", clusters)

      return dataset;
    }

    clusters.map(cluster => {
      return cluster.repositionCentroid()
    })
  } while (hasChanges);

  return dataset;
}

export { kmeans }
