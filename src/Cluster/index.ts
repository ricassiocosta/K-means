import { Dot } from "../Dot";
import { IDot } from "../Dot/IDot";

class Cluster {
  private centroid: IDot;

  constructor(coordX: number, coordY: number) {
    const centroid: IDot = {
      coordX,
      coordY
    }

    this.centroid = centroid
  }

  getCentroid (): IDot {
    return this.centroid
  }

  getDistance(dot: Dot): number {
    return Math.sqrt(
        Math.pow(this.centroid.coordX-dot.coordX, 2) +
        Math.pow(this.centroid.coordY-dot.coordY, 2)
    )
  }

  repositionCentroid(dots: IDot[]): IDot {
    const dot = dots.reduce((previousValue: IDot, currentValue: IDot): IDot => {
        const sumCoordX = previousValue.coordX + currentValue.coordX;
        const sumCoordY = previousValue.coordY + currentValue.coordY;

        return { coordX: sumCoordX, coordY: sumCoordY }
    })

    dot.coordX /= dots.length;
    dot.coordY /= dots.length;

    this.centroid = dot;

		return dot;
	}
}

export { Cluster }
