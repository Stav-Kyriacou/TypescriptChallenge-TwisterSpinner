import { BodyParts } from './bodyParts.enum';
import { Colours } from './colours.enum';

export interface ISpin {
  colour: Colours;
  bodyPart: BodyParts;
}

// TODO: create a SpinRecord class which implements ISpin and adds a new attribute num:number
export class SpinRecord implements ISpin {
  colour: Colours;
  bodyPart: BodyParts;
  num: Number;

  constructor(colour: Colours, bodyPart: BodyParts, num: Number) {
    this.colour = colour;
    this.bodyPart = bodyPart;
    this.num = num;
  }
}
