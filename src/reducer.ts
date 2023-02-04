import { State, Action, ActionType } from "./types";

export const INITIAL_STATE: State = {
  display: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
  memory: 0,
  expression: "",
};

export default function reducer(state: State, action: Action): State {
  const { type, payload } = action;
  switch (type) {
    case ActionType.CLEAR: {
      return {
        ...state,
        display: "0",
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
        expression: "",
      };
    }

    case ActionType.CLEAR_ENTRY: {
      return {
        ...state,
        display: "0",
      };
    }

    case ActionType.NUMBER: {
      const number = payload;
      let { display, waitingForSecondOperand, expression } = state;

      if (state.waitingForSecondOperand) {
        display = number;
        waitingForSecondOperand = false;
      } else {
        display = display === "0" ? number : display! + number;
      }
      return {
        ...state,
        display,
        waitingForSecondOperand,
        expression: expression + number,
      };
    }

    case ActionType.DECIMAL: {
      let { display, waitingForSecondOperand, expression } = state;
      if (waitingForSecondOperand) return state;

      if (!display!.includes(".")) {
        display += ".";
      }
      return { ...state, display, expression: expression + "." };
    }

    case ActionType.OPERATOR: {
      const nextOperator = payload;
      let { firstOperand, display, operator, expression } = state;
      const inputValue = parseFloat(display!);

      if (operator && state.waitingForSecondOperand) {
        return {
          ...state,
          operator: nextOperator!,
          expression:
            nextOperator !== "=" ? expression + nextOperator : expression,
        };
      }

      if (firstOperand === null) {
        firstOperand = inputValue;
      } else if (operator) {
        display = performCalculation[operator](
          firstOperand,
          inputValue
        ).toString();
        firstOperand = parseFloat(display);
      }

      return {
        ...state,
        display,
        firstOperand,
        waitingForSecondOperand: true,
        operator: nextOperator!,
        expression:
          nextOperator !== "=" ? expression + nextOperator : expression,
      };
    }

    case ActionType.PERCENTAGE: {
      let { display, expression } = state;
      display = (parseFloat(display!) / 100).toString();
      return { ...state, display, expression: expression + "%" };
    }

    case ActionType.SIGN: {
      let { display, firstOperand, waitingForSecondOperand, expression } =
        state;
      display = (parseFloat(display!) * -1).toString();
      if (waitingForSecondOperand) {
        firstOperand = parseFloat(display);
      }
      return {
        ...state,
        display,
        firstOperand,
        expression: `(${expression})*-1`,
      };
    }

    default:
      return state;
  }
}

type Operations = {
  [operator: string]: (firstOperand: number, secondOperand: number) => number;
};

const performCalculation: Operations = {
  "/": (firstOperand, secondOperand) => firstOperand / secondOperand,

  "*": (firstOperand, secondOperand) => firstOperand * secondOperand,

  "+": (firstOperand, secondOperand) => firstOperand + secondOperand,

  "-": (firstOperand, secondOperand) => firstOperand - secondOperand,

  "=": (firstOperand, secondOperand) => secondOperand,
};
