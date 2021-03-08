export interface PointNeighbors {
  nx: Point;
  ny: Point;
}

export interface IPoint {
  x: number;
  y: number;
  string: string;
  neighbors: PointNeighbors;
  isEqual(point: Point): boolean;
}

export class Point implements IPoint {
  public constructor(private pointX: number, private pointY: number) {
    this.stringified = `${pointX},${pointY}`
  }

  private readonly stringified: string;

  public get x() {
    return this.pointX;
  }

  public get y() {
    return this.pointY;
  }

  public get string() {
    return this.stringified
  }

  public get neighbors() {
    const nx = new Point(this.x + 1, this.y);
    const ny = new Point(this.x, this.y + 1);
    return {
      nx,
      ny,
    };
  }

  public isEqual(point: Point) {
    return this.stringified === point.string;
  }

  public isInRange(start: Point, end: Point) {
    return this.pointX >= start.x && this.pointY <= end.x && this.pointY >= start.y && this.pointY <= end.y;
  }

}

export default Point;
