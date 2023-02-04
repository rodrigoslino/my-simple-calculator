import React from "react";
import { State, Action } from "./types";
import reducer, { INITIAL_STATE } from "./reducer";

export const Context = React.createContext<
  [State, React.Dispatch<Action>] | [null, null]
>([null, null]);

function ContextProvider(props: React.PropsWithChildren<{}>) {
  const value = React.useReducer<React.Reducer<State, Action>>(
    reducer,
    INITIAL_STATE
  );
  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}

export default ContextProvider;
