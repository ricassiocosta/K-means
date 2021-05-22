import { Cluster } from "../Cluster";
import { IDot } from "./IDot";

class Dot implements IDot {
  coordX: number;
  coordY: number;
  private cluster?: Cluster;

  constructor(coordX: number, coordY: number) {
    this.coordX = coordX;
    this.coordY = coordY;
  }

  setCluster(cluster: Cluster) {
    this.cluster = cluster
  }

  getCluster() {
    return this.cluster
  }
}

export { Dot }
