import Space from './Space';
import Shape from './Shape';

const space = new Space(0, 0, 10000, 10000);

const shape = new Shape(0, 0, 8000, 8000);

space.addShape(shape);

console.log(space.findEmpty());
