import { Cluster } from "../Cluster"
import { Dot } from "../Dot"
import { sample } from "lodash"

const kmeans = (dataset: Dot[], clustersAmount: number): Dot[] => {
  const clusters: Cluster[] = [];

  /* for (let index = 0; index < clustersAmount; index++) {
    const dot = sample(dataset) as Dot;
    const newCluster = new Cluster(dot.coordX, dot.coordY);

    clusters.push(newCluster);
  } */

  const newCluster1 = new Cluster(2.5, 2.1)
  const newCluster2 = new Cluster(2.8, 0.8)
  clusters.push(newCluster1)
  clusters.push(newCluster2)

  let hasChanges: boolean;
  do {
    hasChanges = false
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
      return dataset;
    }

    clusters.map(cluster => {
      return cluster.repositionCentroid()
    })
  } while (hasChanges);

  return dataset;
}

export { kmeans }
