export interface CalcStateInterface {
  prop: boolean;
  calcs: {};
  key: {};
  titel: string,
  kaufpreis: number,
  mietflaeche: number,
  kaltmieteY: number
}

const state: CalcStateInterface = {
  prop: false,
  calcs: {
    'ID1':{
      titel: 'Some Real Estate Object',
      kaufpreis: 120000,
      mietflaeche: 30,
      kaltmieteY: 5400
    }
  }
}

export default state
