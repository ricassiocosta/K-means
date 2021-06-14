import { Cluster } from "../Cluster";
import { IDot } from "./IDot";

class Dot implements IDot {
  x: number;
  y: number;
  private cluster?: Cluster;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  setCluster(cluster: Cluster) {
    if(this.cluster) this.cluster.removeDot(this);

    this.cluster = cluster;
    cluster.addDot(this);
  }

  getCluster() {
    return this.cluster;
  }
}

export { Dot }
