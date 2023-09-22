export interface Guest {
  id?: number;
  name?: string;
  code?: string;
}

export interface Gift {
  id?: number;
  name?: string;
  chooseBy?: string;
}

export interface Input {
  text?: string;
}

export interface Buttons {
  text?: string;
}

export interface Tables {
  titles?: any[];
  contents?: any[];
  codes?: any[]
}