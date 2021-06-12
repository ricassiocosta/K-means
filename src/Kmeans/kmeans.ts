import { Cluster } from "../Cluster"
import { Dot } from "../Dot"
import { sample, cloneDeep } from "lodash"

const generateRandomClusters = (dataset: Dot[], clustersAmount: number): Cluster[] => {
  const clusters: Cluster[] = []
  for (let index = 0; index < clustersAmount; index++) {
    // FIX: Este 'sample' pode retornar 2 valores iguais neste for.
    const dot = sample(dataset);
    if (!dot) {
      throw new Error('failed to get a random dot from dataset')
    }

    const newCluster = new Cluster(dot.x, dot.y);
    clusters.push(newCluster);
  }

  return clusters
}

interface IKmeans {
  iterations: number;
  history: [
    Cluster[]
  ]
}

const kmeans = (dataset: Dot[], clustersAmount: number): IKmeans => {
  const clusters: Cluster[] = generateRandomClusters(dataset, clustersAmount);

  const kmeans: IKmeans = {
    iterations: 0,
    history: [
      cloneDeep(clusters)
    ]
  }

  let hasChanges: boolean;
  do {
    hasChanges = false
    kmeans.iterations++
    // TODO: refatorar este trecho!!esta função precisa retornar dados
    // de forma a possibilitar uma visualização do histórico dos dados
    // durante as iterações.

    // TODO: extract this function
    for (const dot of dataset) {
      for (const currentCluster of clusters) {
        const dotDistanceToCurrentCluster = currentCluster.getDistance(dot);

        const dotCluster = dot.getCluster();
        if (!dotCluster) {
          dot.setCluster(currentCluster)
          hasChanges = true
        } else {
          const dotDistanceToItCluster = dotCluster.getDistance(dot);
          if(dotDistanceToCurrentCluster < dotDistanceToItCluster) {
            hasChanges = true
            dot.setCluster(currentCluster);
          }
        }
      }
    }

    kmeans.history.push(cloneDeep(clusters))

    if(!hasChanges) {
      return kmeans;
    }

    clusters.map(cluster => {
      return cluster.repositionCentroid()
    })
  } while (hasChanges);

  return kmeans;
}

export { kmeans }
