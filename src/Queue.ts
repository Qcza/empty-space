import Point, {IPoint} from './Point';

export interface IQueue {
  withdraw(): IPoint | undefined;
}

class Queue implements IQueue {
  constructor(private startPoint: Point, private endPoint: Point) {
    this.current.push(startPoint);
    this.served.push(startPoint.string);
  }

  private served: string[] = [];

  private current: IPoint[] = [];

  private queueNext(origin: IPoint) {
    const {nx, ny} = origin.neighbors;
    if (nx.isInRange(this.startPoint, this.endPoint) && !this.served.includes(nx.string)) {
      this.served.push(nx.string);
      this.current.push(nx);
    }
    if (ny.isInRange(this.startPoint, this.endPoint) && !this.served.includes(ny.string)) {
      this.served.push(ny.string);
      this.current.push(ny)
    }
  }

  public withdraw() {
    let point = this.current.pop();
    if (point && point !== this.endPoint) {
      this.queueNext(point)
    }
    return point;
  }
}

export default Queue;
