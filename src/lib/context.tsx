import { createContext, Dispatch, PropsWithChildren } from "react";
import { useReducer } from "react";
import { initialState, reducer } from "./reducer";

export type ContextType = {
  state: GlobalState;
  dispatch: Dispatch<ActionType>;
};

export const ContextProvider = createContext<ContextType>({
  state: initialState,
  dispatch: (): void => {},
});

const Context = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </ContextProvider.Provider>
  );
};

export default Context;
