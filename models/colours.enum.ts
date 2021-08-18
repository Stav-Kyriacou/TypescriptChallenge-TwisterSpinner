export enum Colours {
  Red,
  Blue,
  Yellow,
  Green
}

// TODO: implement a ColoursHelper class as shown in BodyParts
export class ColoursHelper {
  static colours: Colours[] = [
    Colours.Red,
    Colours.Blue,
    Colours.Yellow,
    Colours.Green
  ];

  constructor() {}

  static get(key: string): Colours {
    switch (key) {
      case 'LeftHand':
        return Colours.Red;
      case 'RightHand':
        return Colours.Blue;
      case 'LeftFoot':
        return Colours.Yellow;
      case 'RightFoot':
        return Colours.Green;
    }
  }
}
