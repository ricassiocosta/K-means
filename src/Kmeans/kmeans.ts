import { Cluster } from "../Cluster"
import { Dot } from "../Dot"
import { sample } from "lodash"

const generateRandomClusters = (dataset: Dot[], clustersAmount: number): Cluster[] => {
  const clusters: Cluster[] = []
  for (let index = 0; index < clustersAmount; index++) {
    const dot = sample(dataset) as Dot;
    console.log("dot chosen: ", dot)
    const newCluster = new Cluster(dot.coordX, dot.coordY);
    clusters.push(newCluster);
  }

  return clusters
}

const kmeans = (dataset: Dot[], clustersAmount: number): Cluster[] => {
  const clusters: Cluster[] = generateRandomClusters(dataset, clustersAmount);

  let hasChanges: boolean;
  let iterationCount = 0;
  do {
    hasChanges = false
    iterationCount++
    // TODO: refatorar este trecho!!esta função precisa retornar dados
    // de forma a possibilitar uma visualização do histórico dos dados
    // durante as iterações.
    for (const dot of dataset) {
      // remover esta inferência de cluster, calcular baseado na posição
      // do dot
      if(!dot.getCluster()) dot.setCluster(clusters[0]);

      // remover este for dentro de for
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
      return clusters;
    }

    clusters.map(cluster => {
      return cluster.repositionCentroid()
    })
  } while (hasChanges);

  return clusters;
}

export { kmeans }
