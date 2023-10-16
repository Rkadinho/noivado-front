export interface Guest {
  id?: number;
  name?: string;
  code?: string;
  status?: string
}

export interface Gift {
  id?: number;
  name?: string;
  choseBy?: string;
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
  type?: any;
  click?: () => void;
}

export interface Tables {
  titles?: any[];
  contents?: any[];
  codes?: any[];
  onDelete?: any;
}

export interface Modals {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ModalOpen {
  open: boolean;
  close: () => void;
  click: () => void;
}

export interface Pagination {
  props: any[];
  click: () => void
}