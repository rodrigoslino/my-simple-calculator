export type State = {
  display?: string;
  operator: string | null;
  firstOperand: number | null;
  waitingForSecondOperand: boolean;
  memory: number;
  expression: string;
};

export enum ActionType {
  CLEAR = "CLEAR",
  CLEAR_ENTRY = "CLEAR_ENTRY",
  NUMBER = "NUMBER",
  DECIMAL = "DECIMAL",
  OPERATOR = "OPERATOR",
  SIGN = "SIGN",
  SQUARE_ROOT = "SQUARE_ROOT",
  PERCENTAGE = "PERCENTAGE",
}

export type Action = {
  type: ActionType | null;
  payload?: string;
};
