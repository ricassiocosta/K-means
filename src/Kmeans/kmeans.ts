import { Cluster } from "../Cluster"
import { Dot } from "../Dot"
import { sample, cloneDeep } from "lodash"

interface IKmeans {
  iterations: number;
  history?: [
    Cluster[]
  ]
}

const generateRandomClusters = (dataset: Dot[], clustersAmount: number): Cluster[] => {
  const clusters: Cluster[] = [];
  const possibleChoices = [...dataset];
  for (let index = 0; index < clustersAmount; index++) {
    const chosenDot = sample(possibleChoices);
    if (!chosenDot) {
      throw new Error('failed to get a random dot from dataset');
    }

    const dotIndex = possibleChoices.indexOf(chosenDot);
    possibleChoices.splice(dotIndex, 1);

    const newCluster = new Cluster(chosenDot.x, chosenDot.y);
    clusters.push(newCluster);
  }

  return clusters;
}

const kmeans = (dataset: Dot[], clustersAmount: number): IKmeans => {
  const clusters: Cluster[] = generateRandomClusters(dataset, clustersAmount);

  const kmeans: IKmeans = {
    iterations: 0
  };

  let hasChanges: boolean;
  do {
    hasChanges = false;
    kmeans.iterations++;
    for (const dot of dataset) {
      for (const currentCluster of clusters) {
        const dotDistanceToCurrentCluster = currentCluster.getDistance(dot);

        const dotCluster = dot.getCluster();
        if (!dotCluster) {
          dot.setCluster(currentCluster);
          hasChanges = true;
        } else {
          const dotDistanceToItCluster = dotCluster.getDistance(dot);
          if(dotDistanceToCurrentCluster < dotDistanceToItCluster) {
            hasChanges = true;
            dot.setCluster(currentCluster);
          }
        }
      }
    }

    if(kmeans.history) {
      kmeans.history.push(cloneDeep(clusters));
    } else {
      kmeans.history = [cloneDeep(clusters)];
    }

    if(!hasChanges) {
      return kmeans;
    }

    clusters.map(cluster => {
      return cluster.repositionCentroid();
    })
  } while (hasChanges);

  return kmeans;
}

export { kmeans }
