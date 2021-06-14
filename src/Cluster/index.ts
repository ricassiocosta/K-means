import { Dot } from "../Dot";
import { IDot } from "../Dot/IDot";

class Cluster {
  private centroid: IDot;
  private dots: Dot[] = [];

  constructor(x: number, y: number) {
    const centroid: IDot = {
      x,
      y
    };

    this.centroid = centroid;
  }

  getCentroid (): IDot {
    return this.centroid;
  }

  addDot(dot: Dot) {
    this.dots.push(dot);
  }

  removeDot(dot: Dot) {
    const dotIndex = this.dots.indexOf(dot);
    this.dots.splice(dotIndex, 1);
  }

  getDots(): IDot[] {
    return this.dots;
  }

  getDistance(dot: Dot): number {
    return Math.sqrt(
        Math.pow(this.centroid.x-dot.x, 2) +
        Math.pow(this.centroid.y-dot.y, 2)
    );
  }

  repositionCentroid(): void {
    const dots = this.getDots();

    const dot = dots.reduce((previousValue: IDot, currentValue: IDot): IDot => {
        const sumCoordX = previousValue.x + currentValue.x;
        const sumCoordY = previousValue.y + currentValue.y;

        return { x: sumCoordX, y: sumCoordY };
    })

    dot.x /= dots.length;
    dot.y /= dots.length;

    this.centroid = dot;
	}
}

export { Cluster }
