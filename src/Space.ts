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

  public static findCloserShape(source: Shape, a: Shape, b: Shape) {
    const aDistance = Space.distance(a, source);
    const bDistance = Space.distance(b, source);

    return aDistance > bDistance ? b : a;
  }

  public static shapeInBounds(shape: Shape, left: number, right: number): boolean {
    return shape.x < right && shape.x + shape.width > left;
  }

  public static distance(a: Point, source: Point) {
    return Math.sqrt(Math.pow(a.x - source.x, 2) + Math.pow(a.y - source.y, 2));
  }

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

  private findFreePatches(yBeginSortedShapes: Shape[], height: number) : [number,number][] {
    let result: [number, number][] = [];

    let currentRange: [number, number] = [this.y, this.y];
    for(let i = 0; i < yBeginSortedShapes.length; i++) {
      const currentShape = yBeginSortedShapes[i];
      const currentShapeEnd = currentShape.y + currentShape.height;
      if(currentShape.y <= currentRange[1]) {
        if(currentShapeEnd > currentRange[1]) {
          currentRange[1] = currentShapeEnd;
        }
      } else {
        if(currentShape.y - currentRange[1] >= height) {
          result.push([currentRange[1], currentShape.y]);
        }
        currentRange = [currentShape.y, currentShape.y + currentShape.height];
      }
    }
    if(this.y + this.height >= currentRange[1] + height) {
      result.push([currentRange[1], this.y + this.height]);
    }

    return result;
  }

  public findEmptyLeftBound(width: number, height: number) {
    let best: Shape = new Shape(this.x + this.width, this.y + this.height, 0, 0);
    let xBeginSorted = [...new Set(this.shapes.map(shape => shape.x)), this.x + this.width]
      .sort((a, b) => a - b);
    let xEndSorted = [...new Set(this.shapes.map(shape => shape.x + shape.width)), this.x]
      .sort((a, b) => a - b);
    let yBeginSorted = [...this.shapes]
      .sort((a, b) => a.y - b.y);

    for(let leftBound of xEndSorted) {
      for (let i = xBeginSorted.length - 1; i >= 0 && xBeginSorted[i] >= leftBound + width; i--) {
        const rightBound = xBeginSorted[i];
        const potentialYBounds = [...yBeginSorted]
          .filter(shape => Space.shapeInBounds(shape, leftBound, rightBound));

        const patches = this.findFreePatches(potentialYBounds, height);

        for (let patch of patches) {
          best = Space.findCloserShape(this, best, new Shape(leftBound, patch[0], rightBound - leftBound, patch[1] - patch[0]));
        }
      }
    }
    return best;
  }
}

export default Space;
