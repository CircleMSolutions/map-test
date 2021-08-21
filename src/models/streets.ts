export interface Street {
  id: number;
  x: number;
  y: number;
  rotation: string;
  text: string;
}

export const DUMMY_STREETS = [
    {
      id: Math.random(),
      x: .4888103,
      y: .3369245,
      rotation: '-35deg',
      text: "Indian Hill Rd"
    },
    {
      id: Math.random(),
      x: .54000,
      y: .4980,
      rotation: '0deg',
      text: 'Highfield Dr'
    }
  ]