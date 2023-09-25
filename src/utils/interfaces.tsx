export interface Guest {
  id?: number;
  name?: string;
  code?: string
}

export interface Gift {
  id?: number;
  name?: string;
  choseBy?: string
}

export interface Input {
  text?: string;
  type?: string;
  id?: string;
  name?: string;
  value?: any;
  onChange?: any
}

export interface Buttons {
  text?: string;
  type?: any
}

export interface Tables {
  titles?: any[];
  contents?: any[];
  codes?: any[];
  onDelete?: any;
}