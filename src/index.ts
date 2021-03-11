import Space from './Space';
import Shape from './Shape';

const space = new Space(0, 0, 500000, 500000);

// const shape = new Shape(0, 0, 10000, 2000);
// const shape1 = new Shape(0, 8000, 10000, 2000);
// const shape2 = new Shape(0, 2000, 2000, 6000);
// const shape3 = new Shape(8000, 2000, 2000, 6000);

for(let i = 0, y = 1; i<300000; i = i + y, y++) {
  const shape = new Shape(i, i, y, y);
  space.addShape(shape);
}
console.log("Number of shapes: " + space.shapes.length);

// space.addShape(shape);
// space.addShape(shape1);
// space.addShape(shape2);
// space.addShape(shape3);

console.time("findEmptyLeftBound")

let result = space.findEmptyLeftBound(600, 800);

console.timeEnd("findEmptyLeftBound")

console.log("Found shape x=%d, y=%d, width=%d, height=%d", result.x, result.y, result.width, result.height);
