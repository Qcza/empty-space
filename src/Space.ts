import Shape, {IShape} from './Shape';
import Point from './Point';
import Queue from './Queue';

export interface ISpace extends IShape {
  shapes: IShape[];
  addShape(shape: IShape): void;
  findEmpty(queue?: Queue): void;
}

class Space extends Shape implements ISpace {
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
  }

  private startPoint = new Point(this.x, this.y);

  private endPoint = new Point(this.x + this.width, this.y + this.height);

  private spaceShapes: Shape[] = [];

  public get shapes() {
    return this.spaceShapes;
  }

  public addShape(shape: Shape) {
    this.spaceShapes.push(shape);
  }

  private prepareQueue() {
    return new Queue(this.startPoint, this.endPoint);
  }

  public findEmpty(queue?: Queue): void {
    const q = queue ?? this.prepareQueue();
    const point = q.withdraw();
    if (point) {
      const {nx, ny} = point.neighbors;
      if (this.spaceShapes.every((shape) => !shape.checkIfContains(nx)) ||
        this.spaceShapes.every((shape) => !shape.checkIfContains(ny))) {
          return console.log('[F]: ', point);
      }
      return this.findEmpty(q);
    }
    return;
  }

}

export default Space;
