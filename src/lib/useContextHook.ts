import { useContext } from "react";
import { ContextProvider } from "./context";

const useContextHook = () => {
  const useContextGen = useContext(ContextProvider);
  return { useContextGen };
};

export default useContextHook;
