export interface Block {
    id: number
    x: number
    y: number
    rotation: string
    text: string
}

export const DUMMY_BLOCKS = [
    {
      id: Math.random(),
      x: .4500,
      y: .4980,
      rotation: '0deg',
      text: "1800"
    },
    {
      id: Math.random(),
      x: .8500,
      y: .5160,
      rotation: '0deg',
      text: "1900"
    }
  ]