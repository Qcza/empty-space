import Point, { IPoint } from './Point';

export interface IShape extends IPoint {
  width: number;
  height: number;
  checkIfContains(point: Point): boolean;
}

class Shape extends Point implements IShape {
  public constructor(shapeX: number, shapeY: number, private shapeWidth: number, private shapeHeight: number) {
    super(shapeX, shapeY);
  }

  public get width() {
    return this.shapeWidth;
  }

  public get height() {
    return this.shapeHeight;
  }

  public checkIfContains(point: Point) {
    return point.x >= this.x && point.x <= this.x + this.shapeWidth && point.y >= this.y && point.y <= this.y + this.shapeHeight;
  }

}

export default Shape;
